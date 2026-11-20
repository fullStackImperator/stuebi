// Shared by the CMS global and the site; kept apart so the Payload config does not import the Local API.
export const INSTAGRAM_CACHE_TAG = "instagram";

export const INSTAGRAM_PROFILE_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/stuebibloggt/";

// Instagram account id of @stuebibloggt (shown under the account name in the Meta dashboard).
// Only needed for system user tokens; can be overridden in the CMS.
export const INSTAGRAM_ACCOUNT_ID = "17841422499561838";
