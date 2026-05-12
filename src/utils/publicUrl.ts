/** Asset under `public/` (no leading slash), e.g. `images/logo.svg`. */
export function publicUrl(path: string): string {
  const base = import.meta.env.BASE_URL
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  const p = path.startsWith('/') ? path.slice(1) : path
  return `${normalizedBase}${p}`
}
