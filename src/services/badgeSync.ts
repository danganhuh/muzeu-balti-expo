import { listEarnedBadgeIds, readBadgeSnapshot } from './badgeRules'
import { awardBadgeIfNew } from './storage/interactiveStorage'

/** Awards any newly earned badges; returns ids unlocked in this call. */
export function syncBadges(): string[] {
  const snap = readBadgeSnapshot()
  const earned = listEarnedBadgeIds(snap)
  const fresh: string[] = []
  for (const id of earned) {
    if (awardBadgeIfNew(id)) fresh.push(id)
  }
  return fresh
}
