import type { ExhibitCategoryKey, ExhibitEraKey } from '../types/museum'

export const ERA_DISPLAY_ORDER: readonly ExhibitEraKey[] = [
  'antiquity',
  'medieval',
  'early_modern',
  'modern',
  'contemporary',
] as const

export const CATEGORY_DISPLAY_ORDER: readonly ExhibitCategoryKey[] = [
  'architecture',
  'urbanism',
  'crafts',
  'daily_life',
  'numismatics',
  'personalities',
] as const

export function sortErasPresent(eras: Iterable<ExhibitEraKey>): ExhibitEraKey[] {
  const set = new Set(eras)
  return ERA_DISPLAY_ORDER.filter((e) => set.has(e))
}

export function sortCategoriesPresent(cats: Iterable<ExhibitCategoryKey>): ExhibitCategoryKey[] {
  const set = new Set(cats)
  return CATEGORY_DISPLAY_ORDER.filter((c) => set.has(c))
}
