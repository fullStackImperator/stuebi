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
