/**
 * Payload Local API — same instance as the admin UI and REST routes.
 * @see https://payloadcms.com/docs/local-api/overview
 *
 * Use `getPayload` in Server Components, Route Handlers, and Server Actions
 * to call `payload.find`, `payload.create`, etc. without HTTP.
 *
 * @example
 * ```ts
 * import { getPayload } from "payload";
 * import config from "@payload-config";
 *
 * const payload = await getPayload({ config });
 * const posts = await payload.find({ collection: "news", limit: 10 });
 * ```
 */
import config from "@payload-config";
import { getPayload } from "payload";

/** Cached Payload singleton (see Payload `getPayload` docs). */
export async function getPayloadLocal() {
  return getPayload({ config });
}
