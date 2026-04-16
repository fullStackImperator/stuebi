export type SocialPost = {
  id: string;
  caption?: string;
  imageUrl?: string;
  permalink: string;
  source: "facebook" | "instagram";
};
