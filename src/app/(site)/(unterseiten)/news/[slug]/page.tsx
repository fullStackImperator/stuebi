import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { RichContent } from "@/components/rich-content";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { getPayloadClient } from "@/lib/get-payload";
import { mediaUrl } from "@/lib/media-url";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "news",
    where: { slug: { equals: slug }, status: { equals: "published" } },
    limit: 1,
    overrideAccess: true,
  });
  const doc = res.docs[0];
  if (!doc) return { title: "Nicht gefunden" };
  return {
    title: doc.title,
    description: doc.excerpt || undefined,
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "news",
    where: { slug: { equals: slug }, status: { equals: "published" } },
    limit: 1,
    depth: 1,
    overrideAccess: true,
  });
  const doc = res.docs[0];
  if (!doc) notFound();

  const img =
    typeof doc.featuredImage === "object" && doc.featuredImage
      ? mediaUrl(doc.featuredImage)
      : null;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href="/news"
        className={cn(buttonVariants({ variant: "ghost" }), "mb-6 inline-flex px-0")}
      >
        ← Zur Übersicht
      </Link>
      {doc.publishedAt && (
        <Badge variant="outline" className="mb-4">
          {new Date(doc.publishedAt).toLocaleDateString("de-DE", {
            dateStyle: "long",
          })}
        </Badge>
      )}
      <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground">
        {doc.title}
      </h1>
      {doc.excerpt && (
        <p className="mt-4 text-lg text-muted-foreground">{doc.excerpt}</p>
      )}
      {img && (
        <div
          className="mt-8 aspect-video w-full rounded-lg border bg-muted bg-cover bg-center"
          style={{ backgroundImage: `url(${img})` }}
        />
      )}
      <div className="mt-10">
        <RichContent data={doc.content} />
      </div>
    </article>
  );
}
