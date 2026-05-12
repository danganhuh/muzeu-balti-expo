import { useCallback, useMemo, useState } from 'react'
import type { ExhibitCategoryKey, ExhibitEraKey, HallExhibitFiltersState } from '../types/museum'
import { loadExhibitFiltersByHall, saveHallExhibitFilters, type StoredHallFilters } from '../services/storage/userCollectionsStorage'

const defaultState: HallExhibitFiltersState = {
  era: 'all',
  category: 'all',
  collection: 'all',
}

function isEra(v: string): v is ExhibitEraKey | 'all' {
  return (
    v === 'all' ||
    v === 'antiquity' ||
    v === 'medieval' ||
    v === 'early_modern' ||
    v === 'modern' ||
    v === 'contemporary'
  )
}

function isCategory(v: string): v is ExhibitCategoryKey | 'all' {
  return (
    v === 'all' ||
    v === 'architecture' ||
    v === 'numismatics' ||
    v === 'crafts' ||
    v === 'daily_life' ||
    v === 'urbanism' ||
    v === 'personalities'
  )
}

function isCollection(v: string): v is HallExhibitFiltersState['collection'] {
  return v === 'all' || v === 'favorites' || v === 'unstudied'
}

function storedToState(s: StoredHallFilters): HallExhibitFiltersState {
  return {
    era: isEra(s.era) ? s.era : 'all',
    category: isCategory(s.category) ? s.category : 'all',
    collection: isCollection(s.collection) ? s.collection : 'all',
  }
}

function stateToStored(s: HallExhibitFiltersState): StoredHallFilters {
  return {
    era: s.era,
    category: s.category,
    collection: s.collection,
  }
}

export function useHallExhibitFilters(hallSlug: string) {
  const [filters, setFilters] = useState<HallExhibitFiltersState>(() => {
    const map = loadExhibitFiltersByHall()
    const raw = map[hallSlug]
    return raw ? storedToState(raw) : defaultState
  })

  const persist = useCallback(
    (next: HallExhibitFiltersState) => {
      saveHallExhibitFilters(hallSlug, stateToStored(next))
    },
    [hallSlug],
  )

  const setEra = useCallback(
    (era: HallExhibitFiltersState['era']) => {
      setFilters((prev) => {
        const next = { ...prev, era }
        persist(next)
        return next
      })
    },
    [persist],
  )

  const setCategory = useCallback(
    (category: HallExhibitFiltersState['category']) => {
      setFilters((prev) => {
        const next = { ...prev, category }
        persist(next)
        return next
      })
    },
    [persist],
  )

  const setCollection = useCallback(
    (collection: HallExhibitFiltersState['collection']) => {
      setFilters((prev) => {
        const next = { ...prev, collection }
        persist(next)
        return next
      })
    },
    [persist],
  )

  return useMemo(
    () => ({
      filters,
      setEra,
      setCategory,
      setCollection,
    }),
    [filters, setEra, setCategory, setCollection],
  )
}
