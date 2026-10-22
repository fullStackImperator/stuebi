import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { RichContent } from "@/components/rich-content";
import { getPayloadClient } from "@/lib/get-payload";
import { mediaUrl } from "@/lib/media-url";

const RESERVED = new Set(["news", "admin", "api", "graphql", "graphql-playground"]);

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (RESERVED.has(slug)) return {};
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: true,
  });
  const doc = res.docs[0];
  if (!doc) return { title: "Nicht gefunden" };
  return { title: doc.title };
}

export default async function CmsPage({ params }: Props) {
  const { slug } = await params;
  if (RESERVED.has(slug)) notFound();

  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
    overrideAccess: true,
  });
  const doc = res.docs[0];
  if (!doc) notFound();

  const img =
    typeof doc.heroImage === "object" && doc.heroImage
      ? mediaUrl(doc.heroImage)
      : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground">
        {doc.title}
      </h1>
      {img && (
        <div
          className="mt-8 aspect-video w-full rounded-lg border bg-muted bg-cover bg-center"
          style={{ backgroundImage: `url(${img})` }}
        />
      )}
      <div className="mt-10">
        <RichContent data={doc.content} />
      </div>
    </div>
  );
}
