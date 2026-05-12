import { CURRENT_SCHEMA_VERSION, STORAGE_KEYS } from './keys'
import {
  coerceLegacyStringList,
  readRawJsonKey,
  saveAlbum,
  saveFavorites,
  saveStudied,
  writeRawJsonKey,
} from './userCollectionsStorage'

function readSchemaVersion(): number {
  const raw = localStorage.getItem(STORAGE_KEYS.schemaVersion)
  if (raw == null) return 0
  const n = Number.parseInt(raw, 10)
  return Number.isFinite(n) && n >= 0 ? n : 0
}

function writeSchemaVersion(v: number): void {
  try {
    localStorage.setItem(STORAGE_KEYS.schemaVersion, String(v))
  } catch {
    /* ignore */
  }
}

/**
 * Normalizes known keys and bumps schema version. Safe to call on every load.
 */
export function migrateStorage(): void {
  let version = readSchemaVersion()

  if (version < 1) {
    const favRaw = readRawJsonKey(STORAGE_KEYS.favorites)
    const albRaw = readRawJsonKey(STORAGE_KEYS.album)
    const studiedRaw = readRawJsonKey(STORAGE_KEYS.studiedExhibits)

    if (!Array.isArray(favRaw)) {
      saveFavorites(coerceLegacyStringList(favRaw))
    }
    if (!Array.isArray(albRaw)) {
      saveAlbum(coerceLegacyStringList(albRaw))
    }
    if (!Array.isArray(studiedRaw)) {
      saveStudied(coerceLegacyStringList(studiedRaw))
    }

    version = 1
  }

  if (version < 2) {
    if (localStorage.getItem(STORAGE_KEYS.seenEvents) == null) writeRawJsonKey(STORAGE_KEYS.seenEvents, [])
    if (localStorage.getItem(STORAGE_KEYS.quizProgress) == null) writeRawJsonKey(STORAGE_KEYS.quizProgress, {})
    if (localStorage.getItem(STORAGE_KEYS.badges) == null) writeRawJsonKey(STORAGE_KEYS.badges, [])
    if (localStorage.getItem(STORAGE_KEYS.leaderboard) == null) writeRawJsonKey(STORAGE_KEYS.leaderboard, {})
    if (localStorage.getItem(STORAGE_KEYS.gameChronology) == null) {
      writeRawJsonKey(STORAGE_KEYS.gameChronology, { completed: false, attempts: 0 })
    }
    if (localStorage.getItem(STORAGE_KEYS.gameMatch) == null) {
      writeRawJsonKey(STORAGE_KEYS.gameMatch, { bestMoves: null, completedCount: 0 })
    }
    if (localStorage.getItem(STORAGE_KEYS.gameHiddenRelic) == null) {
      writeRawJsonKey(STORAGE_KEYS.gameHiddenRelic, { bestTimeMs: null, wins: 0 })
    }
    version = 2
  }

  if (version < CURRENT_SCHEMA_VERSION) {
    version = CURRENT_SCHEMA_VERSION
  }

  writeSchemaVersion(version)

  // Re-save collections through filters so unknown exhibit ids drop after catalog changes.
  const fav = readRawJsonKey(STORAGE_KEYS.favorites)
  const alb = readRawJsonKey(STORAGE_KEYS.album)
  const st = readRawJsonKey(STORAGE_KEYS.studiedExhibits)
  if (Array.isArray(fav)) saveFavorites(fav.filter((x): x is string => typeof x === 'string'))
  if (Array.isArray(alb)) saveAlbum(alb.filter((x): x is string => typeof x === 'string'))
  if (Array.isArray(st)) saveStudied(st.filter((x): x is string => typeof x === 'string'))

  const filters = readRawJsonKey(STORAGE_KEYS.exhibitFilters)
  if (filters !== null && typeof filters !== 'object') {
    writeRawJsonKey(STORAGE_KEYS.exhibitFilters, {})
  }
}
