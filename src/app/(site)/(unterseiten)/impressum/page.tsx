import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold">Impressum</h1>
      <p className="mt-4 text-muted-foreground">
        Platzhalter — bitte tragen Sie hier die gesetzlichen Angaben ein oder
        legen Sie eine CMS-Seite mit dem Slug{" "}
        <code className="rounded bg-muted px-1">impressum</code> an und
        verlinken Sie darauf.
      </p>
    </div>
  );
}
