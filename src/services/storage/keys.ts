/** Prefix and keys aligned with BAZA-LABORATOR.md §9 */
export const STORAGE_PREFIX = 'vitrina:' as const

export const STORAGE_KEYS = {
  schemaVersion: `${STORAGE_PREFIX}schemaVersion`,
  settings: `${STORAGE_PREFIX}settings`,
  favorites: `${STORAGE_PREFIX}favorites`,
  album: `${STORAGE_PREFIX}album`,
  studiedExhibits: `${STORAGE_PREFIX}studiedExhibits`,
  exhibitFilters: `${STORAGE_PREFIX}exhibitFilters`,
} as const

/** Bump when persisted shape changes; handled in migrateStorage(). */
export const CURRENT_SCHEMA_VERSION = 1
