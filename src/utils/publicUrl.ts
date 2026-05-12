/** Asset under `public/` (no leading slash), e.g. `images/logo.svg`. Absolute `http(s)` URLs pass through. */
export function publicUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path
  const base = import.meta.env.BASE_URL
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  const p = path.startsWith('/') ? path.slice(1) : path
  return `${normalizedBase}${p}`
}
