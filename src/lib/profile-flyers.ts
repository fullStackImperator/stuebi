import type { ProfilFlyer, ProfilKey } from '@/content/profile'
import type { Department, Media } from '@/payload-types'

// Payload prefixes serverURL; keep only the path so next/image serves it as a local file (as in toPhoto).
const path = (url: string | null | undefined) => (url ? (/^https?:\/\//.test(url) ? new URL(url).pathname : url) : null)

const fileUrl = (m: number | Media | null | undefined) => (m && typeof m === 'object' ? path(m.url) : null)
// The small webp size is plenty for the thumbnail.
const previewUrl = (m: number | Media | null | undefined) => (m && typeof m === 'object' ? path(m.sizes?.small?.url ?? m.url) : null)

/**
 * Profile flyers set in the CMS (Abteilung Oberstufe → Profil-Flyer). Only profiles with an uploaded PDF
 * are returned; the others keep the flyer from src/content/profile.ts.
 */
export function profileFlyers(department: Department | null | undefined): Partial<Record<ProfilKey, ProfilFlyer>> {
  const out: Partial<Record<ProfilKey, ProfilFlyer>> = {}
  const set = department?.profileFlyers
  if (!set) return out
  for (const key of ['fairPlay', 'startUp'] as const) {
    const href = fileUrl(set[key]?.file)
    if (href) out[key] = { href, preview: previewUrl(set[key]?.preview) }
  }
  return out
}
