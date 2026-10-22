import { APIError } from "payload";
import type {
  CollectionAfterLoginHook,
  CollectionBeforeOperationHook,
  PayloadRequest,
} from "payload";

/**
 * In-memory rate limiting for Payload auth operations (login, forgot password).
 *
 * Runs inside Payload's `beforeOperation` hook, so it covers the admin UI, the
 * REST API and GraphQL alike. State lives in this Node process: fine for a
 * single server, but with several instances each one counts separately — then
 * rely on the reverse proxy limits described in docs/security.md.
 */

type Bucket = { count: number; resetAt: number };

type Rule = { limit: number; windowMs: number };

const MINUTE = 60 * 1000;

const RULES = {
  /** Failed and successful attempts per client IP. Successful login clears the counter. */
  loginPerIp: { limit: 10, windowMs: 15 * MINUTE },
  /** Password reset mails per IP and per address (prevents mail bombing). */
  forgotPerIp: { limit: 5, windowMs: 60 * MINUTE },
  forgotPerEmail: { limit: 3, windowMs: 60 * MINUTE },
} satisfies Record<string, Rule>;

const MAX_BUCKETS = 10_000;

const buckets = new Map<string, Bucket>();

function prune(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
  // Under a large distributed attack, drop the oldest keys instead of growing forever.
  while (buckets.size > MAX_BUCKETS) {
    const oldest = buckets.keys().next().value;
    if (oldest === undefined) break;
    buckets.delete(oldest);
  }
}

/** Counts one hit; returns the seconds to wait if the limit is exceeded, else 0. */
function hit(key: string, rule: Rule): number {
  const now = Date.now();
  if (buckets.size > MAX_BUCKETS / 2) prune(now);

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + rule.windowMs });
    return 0;
  }
  bucket.count += 1;
  if (bucket.count > rule.limit) {
    return Math.ceil((bucket.resetAt - now) / 1000);
  }
  return 0;
}

/**
 * Client IP as seen by the closest trusted proxy.
 *
 * - `AUTH_CLIENT_IP_HEADER` (e.g. `cf-connecting-ip`, `x-real-ip`) wins if set.
 * - Otherwise the right-most `X-Forwarded-For` entry, i.e. the address the
 *   reverse proxy itself saw. Clients can prepend fake entries but not this one.
 *
 * Only trustworthy if the Next.js server is reachable via the reverse proxy alone
 * (bind it to 127.0.0.1 / a private network).
 */
export function getClientIp(req: Pick<PayloadRequest, "headers">): string {
  const headers = req.headers;
  const customHeader = process.env.AUTH_CLIENT_IP_HEADER?.trim().toLowerCase();
  if (customHeader) {
    const value = headers.get(customHeader)?.trim();
    if (value) return value;
  }
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const parts = forwardedFor
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    const last = parts.at(-1);
    if (last) return last;
  }
  return headers.get("x-real-ip")?.trim() || "unknown";
}

function normalizeEmail(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim().toLowerCase() : null;
}

function tooManyRequests(req: PayloadRequest, retryAfter: number, what: string): never {
  const minutes = Math.max(1, Math.ceil(retryAfter / 60));
  req.payload.logger.warn(
    `Auth rate limit hit (${what}) from ${getClientIp(req)}; blocked for ${retryAfter}s`,
  );
  throw new APIError(
    `Zu viele Versuche. Bitte in ${minutes} Minute${minutes === 1 ? "" : "n"} erneut versuchen.`,
    429,
    null,
    true,
  );
}

export const rateLimitAuth: CollectionBeforeOperationHook = ({ args, operation, req }) => {
  if (process.env.AUTH_RATE_LIMIT_DISABLED === "true") return args;

  const ip = getClientIp(req);

  if (operation === "login") {
    const retryAfter = hit(`login:ip:${ip}`, RULES.loginPerIp);
    if (retryAfter) tooManyRequests(req, retryAfter, "login");
  }

  if (operation === "forgotPassword") {
    const email = normalizeEmail((args as { data?: { email?: unknown } }).data?.email);
    const retryAfter = Math.max(
      hit(`forgot:ip:${ip}`, RULES.forgotPerIp),
      email ? hit(`forgot:email:${email}`, RULES.forgotPerEmail) : 0,
    );
    if (retryAfter) tooManyRequests(req, retryAfter, "forgot-password");
  }

  return args;
};

/** A successful login clears the IP's counter so editors behind a shared school IP are not blocked. */
export const resetLoginRateLimit: CollectionAfterLoginHook = ({ req }) => {
  buckets.delete(`login:ip:${getClientIp(req)}`);
};

/** Test helper. */
export function resetAllAuthRateLimits() {
  buckets.clear();
}
