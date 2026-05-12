import { exhibits } from './exhibits'
import { halls } from './halls'
import { historicalPeople } from './people'
import type { Exhibit, ExhibitCategoryKey, ExhibitEraKey, Hall, HistoricalPerson } from '../types/museum'

const hallsById = new Map(halls.map((h) => [h.id, h]))
const hallsBySlug = new Map(halls.map((h) => [h.slug, h]))
const exhibitsById = new Map(exhibits.map((e) => [e.id, e]))
const exhibitsBySlug = new Map(exhibits.map((e) => [e.slug, e]))
const peopleById = new Map(historicalPeople.map((p) => [p.id, p]))

export function getOrderedHalls(): readonly Hall[] {
  return [...halls].sort((a, b) => a.order - b.order)
}

export function getHallBySlug(slug: string): Hall | undefined {
  return hallsBySlug.get(slug)
}

export function getHallById(id: string): Hall | undefined {
  return hallsById.get(id)
}

export function getExhibitsForHall(hallId: string): readonly Exhibit[] {
  return exhibits.filter((e) => e.hallId === hallId)
}

export function getExhibitById(id: string): Exhibit | undefined {
  return exhibitsById.get(id)
}

export function getExhibitBySlug(slug: string): Exhibit | undefined {
  return exhibitsBySlug.get(slug)
}

export function getExhibitInHall(hallSlug: string, exhibitId: string): Exhibit | undefined {
  const hall = getHallBySlug(hallSlug)
  if (!hall) return undefined
  const ex = getExhibitById(exhibitId)
  if (!ex || ex.hallId !== hall.id) return undefined
  return ex
}

export function getPersonById(id: string): HistoricalPerson | undefined {
  return peopleById.get(id)
}

export function getKnownExhibitIds(): Set<string> {
  return new Set(exhibits.map((e) => e.id))
}

export function getDistinctEras(): ExhibitEraKey[] {
  const s = new Set<ExhibitEraKey>()
  for (const e of exhibits) s.add(e.era)
  return Array.from(s)
}

export function getDistinctCategories(): ExhibitCategoryKey[] {
  const s = new Set<ExhibitCategoryKey>()
  for (const e of exhibits) s.add(e.category)
  return Array.from(s)
}

export { exhibits, halls, historicalPeople }
