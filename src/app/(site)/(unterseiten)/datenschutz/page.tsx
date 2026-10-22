import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz",
};

export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold">Datenschutz</h1>
      <p className="mt-4 text-muted-foreground">
        Platzhalter — ergänzen Sie die Datenschutzerklärung oder pflegen Sie
        sie als Seite im CMS.
      </p>
    </div>
  );
}
