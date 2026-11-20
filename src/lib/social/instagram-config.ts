// Shared by the CMS global and the site; kept apart so the Payload config does not import the Local API.
export const INSTAGRAM_CACHE_TAG = "instagram";

export const INSTAGRAM_PROFILE_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/stuebibloggt/";
