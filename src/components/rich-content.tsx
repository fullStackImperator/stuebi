import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";
import type { SerializedEditorState } from "lexical";

type Props = {
  data: SerializedEditorState | null | undefined;
  className?: string;
};

export function RichContent({ data, className }: Props) {
  if (!data) return null;
  const html = convertLexicalToHTML({ data, disableContainer: false });
  return (
    <div
      className={
        className ??
        "prose prose-neutral max-w-none dark:prose-invert prose-headings:font-heading prose-a:text-primary"
      }
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
