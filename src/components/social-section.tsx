import Image from "next/image";
import Link from "next/link";

import { fetchFacebookGraphPosts, fetchInstagramGraphPosts } from "@/lib/social";
import { getPayloadClient } from "@/lib/get-payload";
import { mediaUrl } from "@/lib/media-url";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export async function SocialSection() {
  const [fbGraph, igGraph, payload] = await Promise.all([
    fetchFacebookGraphPosts(),
    fetchInstagramGraphPosts(),
    getPayloadClient(),
  ]);

  const highlights = await payload.find({
    collection: "social-highlights",
    sort: "sortOrder",
    limit: 8,
    overrideAccess: true,
  });

  const fbPage = process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL;
  const igUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
        Social Media
      </h2>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Folgen Sie uns auf Facebook und Instagram. Wenn noch keine
        Meta-Tokens hinterlegt sind, sehen Sie hier den Page-Plugin-Feed und
        manuelle Highlights aus dem CMS.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="font-heading">Facebook</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fbPage ? (
              <div className="overflow-hidden rounded-md border bg-background">
                <iframe
                  title="Facebook Page"
                  src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(fbPage)}&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
                  width="100%"
                  height={500}
                  style={{ border: "none", overflow: "hidden" }}
                  scrolling="no"
                  frameBorder={0}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Setzen Sie{" "}
                <code className="rounded bg-muted px-1">NEXT_PUBLIC_FACEBOOK_PAGE_URL</code>{" "}
                auf die vollständige URL Ihrer Facebook-Seite.
              </p>
            )}
            {fbGraph.length > 0 && (
              <>
                <Separator />
                <ul className="space-y-3 text-sm">
                  {fbGraph.slice(0, 3).map((p) => (
                    <li key={p.id}>
                      <a
                        href={p.permalink}
                        className="font-medium text-primary hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Beitrag
                      </a>
                      {p.caption && (
                        <p className="mt-1 line-clamp-2 text-muted-foreground">
                          {p.caption}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="font-heading">Instagram</CardTitle>
            {igUrl && igUrl !== "#" && (
              <Link
                href={igUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Profil öffnen
              </Link>
            )}
          </CardHeader>
          <CardContent>
            {igGraph.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {igGraph.slice(0, 6).map((p) => (
                  <a
                    key={p.id}
                    href={p.permalink}
                    target="_blank"
                    rel="noreferrer"
                    className="relative aspect-square overflow-hidden rounded-md border bg-muted"
                  >
                    {p.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.imageUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="flex h-full items-center justify-center text-xs text-muted-foreground">
                        Post
                      </span>
                    )}
                  </a>
                ))}
              </div>
            ) : highlights.docs.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {highlights.docs.map((doc) => {
                  const img =
                    typeof doc.image === "object" && doc.image
                      ? mediaUrl(doc.image)
                      : null;
                  return (
                    <Link
                      key={doc.id}
                      href={doc.link || igUrl || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="group overflow-hidden rounded-md border bg-background"
                    >
                      <div className="relative aspect-square bg-muted">
                        {img ? (
                          <Image
                            src={img}
                            alt={doc.caption}
                            fill
                            className="object-cover transition group-hover:opacity-95"
                            sizes="(max-width: 768px) 50vw, 200px"
                          />
                        ) : null}
                      </div>
                      <p className="line-clamp-2 p-2 text-xs text-muted-foreground">
                        {doc.caption}
                      </p>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Hinterlegen Sie{" "}
                <code className="rounded bg-muted px-1">
                  FACEBOOK_PAGE_ACCESS_TOKEN
                </code>{" "}
                und{" "}
                <code className="rounded bg-muted px-1">
                  INSTAGRAM_BUSINESS_ACCOUNT_ID
                </code>
                , oder pflegen Sie Highlights im CMS (Collection „Social
                highlights“).
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
