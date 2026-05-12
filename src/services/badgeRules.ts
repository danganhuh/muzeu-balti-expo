import { timelineEvents } from '../data/timelineEvents'
import {
  loadChronologyProgress,
  loadHiddenRelicProgress,
  loadMatchGameProgress,
  loadQuizProgress,
  loadSeenEventIds,
} from './storage/interactiveStorage'

export type BadgeSnapshot = {
  seenEventIds: readonly string[]
  chronologyCompleted: boolean
  quizUrbanBest: number
  quizRegionBest: number
  matchCompletedAtLeastOnce: boolean
  relicWins: number
}

export function readBadgeSnapshot(): BadgeSnapshot {
  const seen = loadSeenEventIds()
  const ch = loadChronologyProgress()
  const qp = loadQuizProgress()
  const match = loadMatchGameProgress()
  const relic = loadHiddenRelicProgress()
  return {
    seenEventIds: seen,
    chronologyCompleted: ch.completed,
    quizUrbanBest: qp['quiz-balti-urban']?.bestScore ?? 0,
    quizRegionBest: qp['quiz-region']?.bestScore ?? 0,
    matchCompletedAtLeastOnce: match.completedCount > 0,
    relicWins: relic.wins,
  }
}

export function listEarnedBadgeIds(s: BadgeSnapshot): string[] {
  const earned: string[] = []
  const allIds = new Set(timelineEvents.map((e) => e.id))
  const seenSet = new Set(s.seenEventIds)
  const allSeen = [...allIds].every((id) => seenSet.has(id))
  if (allSeen) earned.push('badge:time-rail')

  if (s.chronologyCompleted) earned.push('badge:chronologist')

  if (s.quizUrbanBest >= 3) earned.push('badge:urban-quiz')
  if (s.quizRegionBest >= 3) earned.push('badge:region-quiz')
  if (s.matchCompletedAtLeastOnce) earned.push('badge:match-master')
  if (s.relicWins >= 1) earned.push('badge:relic-hunter')

  return earned
}
