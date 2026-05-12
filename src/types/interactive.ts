import type { LocalizedString } from './museum'
import type { ExhibitEraKey } from './museum'

export type TimelineEvent = {
  id: string
  /** Gregorian year (negative for BCE if ever needed). */
  year: number
  title: LocalizedString
  summary: LocalizedString
  /** Longer copy for the detail sheet. */
  detail: LocalizedString
  era: ExhibitEraKey
  /** Optional hero for cards (Commons URL). */
  image?: string
  relatedExhibitIds: readonly string[]
}

export type QuizQuestion = {
  id: string
  prompt: LocalizedString
  choices: readonly LocalizedString[]
  /** Index of correct choice in `choices`. */
  correctIndex: number
  explanation: LocalizedString
}

export type QuizSet = {
  id: string
  title: LocalizedString
  /** Minimum correct answers (of 5) to award the quiz badge. */
  passThreshold: number
  questions: readonly QuizQuestion[]
}

export type QuizProgressEntry = {
  bestScore: number
  attempts: number
  lastPlayedAt: string
}

export type QuizProgressMap = Record<string, QuizProgressEntry>

export type BadgeDefinition = {
  id: string
  title: LocalizedString
  description: LocalizedString
  /** Optional image (emoji or short label in UI if missing). */
  icon?: string
}

export type LeaderboardEntry = {
  pseudonym: string
  score: number
  at: string
}

export type LeaderboardMap = Record<string, LeaderboardEntry[]>

export type ChronologyProgress = {
  completed: boolean
  attempts: number
  lastSolvedAt?: string
}

export type MatchGameProgress = {
  bestMoves: number
  completedCount: number
  lastPlayedAt?: string
}

export type HiddenRelicProgress = {
  bestTimeMs: number
  wins: number
  lastPlayedAt?: string
}
