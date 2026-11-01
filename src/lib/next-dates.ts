import type { Department } from "@/payload-types";

export type DateItem = NonNullable<NonNullable<Department["dates"]>["items"]>[number];

const TIME_ZONE = "Europe/Berlin";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: TIME_ZONE,
  });
}

export function dateText(item: DateItem) {
  if (item.dateLabel) return item.dateLabel;
  if (item.endDate) return `${formatDate(item.startDate)} – ${formatDate(item.endDate)}`;
  return formatDate(item.startDate);
}

/** Termine whose (end) date lies before today are hidden, sorted by start date. */
export function upcomingDates(items: DateItem[] | null | undefined, now = new Date()) {
  const today = new Date(now.toLocaleDateString("en-CA", { timeZone: TIME_ZONE }));
  return (items ?? [])
    .filter((item) => {
      const last = new Date(new Date(item.endDate ?? item.startDate).toLocaleDateString("en-CA", { timeZone: TIME_ZONE }));
      return last >= today;
    })
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
}

/** The next `limit` upcoming dates across all departments, each tagged with its department. */
export function nextDates(departments: Department[], limit = 3, now = new Date()) {
  return upcomingDates(
    departments.flatMap((d) => (d.dates?.items ?? []).map((item) => ({ ...item, department: d.title }))),
    now,
  ).slice(0, limit) as Array<DateItem & { department: string }>;
}

const OPEN_DAY = /offene[nr]? T(ü|ue)r/i;

/**
 * All upcoming dates of every department for /termine, by kind. A „Tag der offenen Tür“ is pulled
 * out of its kind, so the page can feature it on its own.
 */
export function datesByKind(departments: Department[], now = new Date()) {
  const all = nextDates(departments, Infinity, now);
  const rest = all.filter((d) => !OPEN_DAY.test(d.title));
  return {
    openDay: all.filter((d) => OPEN_DAY.test(d.title)),
    registration: rest.filter((d) => d.kind === "registration"),
    info: rest.filter((d) => d.kind === "info"),
    event: rest.filter((d) => d.kind === "event"),
  };
}

/**
 * Every department with its registration windows that are still open or ahead, the earliest
 * deadline first. Departments without windows stay in the list, so each Stufe gets a row.
 */
export function registrationDeadlines(departments: Department[], now = new Date()) {
  const end = (item: DateItem) => new Date(item.endDate ?? item.startDate).getTime();
  return departments.map((d) => ({
    slug: d.slug,
    title: d.title,
    grades: d.grades,
    windows: upcomingDates(d.dates?.items, now)
      .filter((item) => item.kind === "registration")
      .sort((a, b) => end(a) - end(b)),
  }));
}

// Fixed names, as Intl's German short months mix "Jan" and "Feb." depending on the format.
const MONTHS = ["Jan", "Feb", "März", "Apr", "Mai", "Juni", "Juli", "Aug", "Sep", "Okt", "Nov", "Dez"];

/** Calendar tile of a registration window: its last day, or its first day when it has no end. */
export function deadlineTile(item: DateItem) {
  const [, month, day] = new Date(item.endDate ?? item.startDate)
    .toLocaleDateString("en-CA", { timeZone: TIME_ZONE })
    .split("-")
    .map(Number);
  return { day: String(day), month: MONTHS[month - 1] };
}

/** The day a calendar tile shows: a registration window's deadline, otherwise the (start) date. */
export function tileDate(item: Pick<DateItem, "kind" | "startDate" | "endDate">) {
  return item.kind === "registration" && item.endDate ? item.endDate : item.startDate;
}
