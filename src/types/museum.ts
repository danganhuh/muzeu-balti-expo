import type { LanguageCode } from './settings'

export type LocalizedString = Record<LanguageCode, string>

export type LocalizedStringList = Record<LanguageCode, readonly string[]>

export type ExhibitEraKey =
  | 'antiquity'
  | 'medieval'
  | 'early_modern'
  | 'modern'
  | 'contemporary'

export type ExhibitCategoryKey =
  | 'architecture'
  | 'numismatics'
  | 'crafts'
  | 'daily_life'
  | 'urbanism'
  | 'personalities'

export type Hall = {
  id: string
  slug: string
  title: LocalizedString
  coverImage: string
  order: number
}

export type Exhibit = {
  id: string
  hallId: string
  slug: string
  title: LocalizedString
  shortDescription: LocalizedString
  longDescription: LocalizedString
  era: ExhibitEraKey
  category: ExhibitCategoryKey
  heroImage: string
  relatedPersonIds: readonly string[]
  relatedArtifactIds: readonly string[]
  relatedEventIds: readonly string[]
  funFacts: LocalizedStringList
}

export type HistoricalPerson = {
  id: string
  slug: string
  name: LocalizedString
  role: LocalizedString
  birthYear?: number
  deathYear?: number
  bioShort: LocalizedString
  portraitImage: string
  exhibitIds: readonly string[]
}

export type HallExhibitFiltersState = {
  era: ExhibitEraKey | 'all'
  category: ExhibitCategoryKey | 'all'
  collection: 'all' | 'favorites' | 'unstudied'
}
