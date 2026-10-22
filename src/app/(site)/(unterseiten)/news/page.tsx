import Link from "next/link";
import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPayloadClient } from "@/lib/get-payload";
import { mediaUrl } from "@/lib/media-url";

export const metadata: Metadata = {
  title: "Aktuelles",
};

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function NewsIndexPage({ searchParams }: Props) {
  const { page: pageStr } = await searchParams;
  const page = Math.max(1, parseInt(pageStr || "1", 10) || 1);
  const limit = 10;

  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "news",
    where: { status: { equals: "published" } },
    sort: "-publishedAt",
    page,
    limit,
    depth: 1,
    overrideAccess: true,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold text-foreground">
        Aktuelles
      </h1>
      <p className="mt-2 text-muted-foreground">
        Nachrichten und Hinweise für Schulfamilien.
      </p>
      <ul className="mt-10 space-y-6">
        {result.docs.map((item) => {
          const img =
            typeof item.featuredImage === "object" && item.featuredImage
              ? mediaUrl(item.featuredImage)
              : null;
          return (
            <li key={item.id}>
              <Card className="overflow-hidden transition hover:border-primary/30 sm:flex">
                {img && (
                  <div
                    className="h-40 shrink-0 bg-muted bg-cover bg-center sm:h-auto sm:w-52"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                )}
                <div className="flex-1">
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-2">
                      {item.publishedAt && (
                        <Badge variant="outline">
                          {new Date(item.publishedAt).toLocaleDateString(
                            "de-DE",
                          )}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="font-heading text-xl">
                      <Link
                        href={`/news/${item.slug}`}
                        className="hover:text-primary hover:underline"
                      >
                        {item.title}
                      </Link>
                    </CardTitle>
                    {item.excerpt && (
                      <CardDescription>{item.excerpt}</CardDescription>
                    )}
                  </CardHeader>
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
      {result.totalPages > 1 && (
        <nav className="mt-10 flex justify-center gap-4 text-sm">
          {page > 1 && (
            <Link
              href={`/news?page=${page - 1}`}
              className="text-primary hover:underline"
            >
              Zurück
            </Link>
          )}
          <span className="text-muted-foreground">
            Seite {page} von {result.totalPages}
          </span>
          {page < result.totalPages && (
            <Link
              href={`/news?page=${page + 1}`}
              className="text-primary hover:underline"
            >
              Weiter
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
