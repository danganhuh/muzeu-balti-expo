import { getKnownExhibitIds } from '../../data/catalog'
import { STORAGE_KEYS } from './keys'

function safeParseRecord(raw: string | null): Record<string, unknown> | null {
  if (raw == null || raw === '') return null
  try {
    const v = JSON.parse(raw) as unknown
    return v !== null && typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, unknown>) : null
  } catch {
    return null
  }
}

function readStringArray(key: string): string[] {
  try {
    const raw = localStorage.getItem(key)
    if (raw == null) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter((x): x is string => typeof x === 'string')
  } catch {
    return []
  }
}

function writeStringArray(key: string, ids: readonly string[]): void {
  try {
    localStorage.setItem(key, JSON.stringify([...new Set(ids)]))
  } catch {
    /* quota / private mode */
  }
}

function filterToKnownExhibits(ids: readonly string[]): string[] {
  const known = getKnownExhibitIds()
  return [...new Set(ids.filter((id) => known.has(id)))]
}

export type UserExhibitCollections = {
  favorites: string[]
  album: string[]
  studied: string[]
}

export function loadUserExhibitCollections(): UserExhibitCollections {
  return {
    favorites: filterToKnownExhibits(readStringArray(STORAGE_KEYS.favorites)),
    album: filterToKnownExhibits(readStringArray(STORAGE_KEYS.album)),
    studied: filterToKnownExhibits(readStringArray(STORAGE_KEYS.studiedExhibits)),
  }
}

export function saveFavorites(ids: readonly string[]): void {
  writeStringArray(STORAGE_KEYS.favorites, filterToKnownExhibits(ids))
}

export function saveAlbum(ids: readonly string[]): void {
  writeStringArray(STORAGE_KEYS.album, filterToKnownExhibits(ids))
}

export function saveStudied(ids: readonly string[]): void {
  writeStringArray(STORAGE_KEYS.studiedExhibits, filterToKnownExhibits(ids))
}

/**
 * If legacy data stored favorites as a map or single string, coerce to string[].
 */
export function coerceLegacyStringList(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((x): x is string => typeof x === 'string')
  if (value && typeof value === 'object') {
    return Object.keys(value as Record<string, unknown>).filter((k) => typeof k === 'string')
  }
  if (typeof value === 'string' && value.trim() !== '') return [value]
  return []
}

export function readRawJsonKey(key: string): unknown {
  try {
    const raw = localStorage.getItem(key)
    if (raw == null) return null
    return JSON.parse(raw) as unknown
  } catch {
    return null
  }
}

export function writeRawJsonKey(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore */
  }
}

export type StoredHallFilters = {
  era: string
  category: string
  collection: string
}

const defaultFilters: StoredHallFilters = {
  era: 'all',
  category: 'all',
  collection: 'all',
}

export function loadExhibitFiltersByHall(): Record<string, StoredHallFilters> {
  const rec = safeParseRecord(localStorage.getItem(STORAGE_KEYS.exhibitFilters))
  if (!rec) return {}
  const out: Record<string, StoredHallFilters> = {}
  for (const [hallSlug, val] of Object.entries(rec)) {
    if (!val || typeof val !== 'object' || Array.isArray(val)) continue
    const o = val as Record<string, unknown>
    out[hallSlug] = {
      era: typeof o.era === 'string' ? o.era : defaultFilters.era,
      category: typeof o.category === 'string' ? o.category : defaultFilters.category,
      collection: typeof o.collection === 'string' ? o.collection : defaultFilters.collection,
    }
  }
  return out
}

export function saveHallExhibitFilters(hallSlug: string, filters: StoredHallFilters): void {
  const all = loadExhibitFiltersByHall()
  all[hallSlug] = filters
  writeRawJsonKey(STORAGE_KEYS.exhibitFilters, all)
}
