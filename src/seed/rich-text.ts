import type { Department } from "../payload-types";

export type RichText = NonNullable<NonNullable<Department["registration"]>["info"]>;

const text = (value: string) => ({
  type: "text",
  text: value,
  format: 0,
  detail: 0,
  mode: "normal",
  style: "",
  version: 1,
});

const node = { direction: "ltr" as const, format: "" as const, indent: 0, version: 1 };

const block = (type: "paragraph" | "heading", value: string) => ({
  type,
  ...(type === "heading" ? { tag: "h3" } : { textFormat: 0, textStyle: "" }),
  children: [text(value)],
  ...node,
});

export const h = (value: string) => block("heading", value);
export const p = (value: string) => block("paragraph", value);

/** A bullet list, one item per string. */
export const ul = (...items: string[]) => ({
  type: "list",
  listType: "bullet",
  tag: "ul",
  start: 1,
  children: items.map((value, i) => ({ type: "listitem", value: i + 1, children: [text(value)], ...node })),
  ...node,
});

export const richText = (...nodes: Array<ReturnType<typeof block> | ReturnType<typeof ul>>): RichText => ({
  root: { type: "root", children: nodes, ...node },
});

// Dates at noon UTC so they stay on the same calendar day in Europe/Berlin.
export const day = (iso: string) => `${iso}T12:00:00.000Z`;
