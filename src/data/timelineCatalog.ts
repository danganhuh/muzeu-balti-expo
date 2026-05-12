import { timelineEvents } from '../data/timelineEvents'

export function getTimelineEvents() {
  return timelineEvents
}

export function getTimelineEventById(id: string) {
  return timelineEvents.find((e) => e.id === id)
}
