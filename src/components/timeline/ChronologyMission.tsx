import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { LanguageCode } from '../../types/settings'
import { pickLocalized } from '../../i18n/pickLocalized'
import { getTimelineEventById } from '../../data/timelineCatalog'
import type { TimelineEvent } from '../../types/interactive'
import {
  loadChronologyProgress,
  saveChronologyProgress,
  saveTimelineSolvedFlag,
} from '../../services/storage/interactiveStorage'
import { syncBadges } from '../../services/badgeSync'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function sortedIds(events: readonly TimelineEvent[]): string[] {
  return [...events].sort((a, b) => a.year - b.year).map((e) => e.id)
}

type Props = {
  events: readonly TimelineEvent[]
  language: LanguageCode
}

export function ChronologyMission({ events, language }: Props) {
  const { t } = useTranslation()
  const targetIds = useMemo(() => sortedIds(events), [events])
  const [order, setOrder] = useState<string[]>(() => shuffle(targetIds))
  const [status, setStatus] = useState<'idle' | 'success' | 'fail'>('idle')
  const [progress, setProgress] = useState(() => loadChronologyProgress())

  useEffect(() => {
    setProgress(loadChronologyProgress())
  }, [])

  const items = useMemo(
    () => order.map((id) => getTimelineEventById(id)).filter((e): e is TimelineEvent => Boolean(e)),
    [order],
  )

  const resetShuffle = useCallback(() => {
    setOrder(shuffle(targetIds))
    setStatus('idle')
  }, [targetIds])

  const move = useCallback((index: number, dir: -1 | 1) => {
    setStatus('idle')
    setOrder((prev) => {
      const j = index + dir
      if (j < 0 || j >= prev.length) return prev
      const next = [...prev]
      ;[next[index], next[j]] = [next[j], next[index]]
      return next
    })
  }, [])

  const checkOrder = useCallback(() => {
    const ok = order.every((id, i) => id === targetIds[i])
    const prev = loadChronologyProgress()
    if (ok) {
      setStatus('success')
      const next = {
        completed: true,
        attempts: prev.attempts + 1,
        lastSolvedAt: new Date().toISOString(),
      }
      saveChronologyProgress(next)
      saveTimelineSolvedFlag(true)
      setProgress(next)
      syncBadges()
    } else {
      setStatus('fail')
      saveChronologyProgress({
        completed: prev.completed,
        attempts: prev.attempts + 1,
        lastSolvedAt: prev.lastSolvedAt,
      })
      setProgress(loadChronologyProgress())
    }
  }, [order, targetIds])

  return (
    <section className="chronology card-surface" aria-labelledby="chronology-title">
      <div className="chronology__head">
        <h2 id="chronology-title" className="chronology__title">
          {t('timeline.chronology.title')}
        </h2>
        <p className="chronology__lede">{t('timeline.chronology.lede')}</p>
        {progress.completed ? (
          <p className="chronology__badge chip chip--success">{t('timeline.chronology.completed')}</p>
        ) : null}
      </div>
      <ol className="chronology__list">
        {items.map((ev, index) => (
          <li key={ev.id} className="chronology__row">
            <div className="chronology__card">
              <span className="chronology__year" aria-hidden>
                ?
              </span>
              <div className="chronology__body">
                <p className="chronology__event-title">{pickLocalized(language, ev.title)}</p>
                <p className="chronology__hint">{t('timeline.chronology.hiddenYear')}</p>
              </div>
            </div>
            <div className="chronology__controls">
              <button type="button" className="btn btn--ghost btn--icon" onClick={() => move(index, -1)} disabled={index === 0}>
                ↑
              </button>
              <button
                type="button"
                className="btn btn--ghost btn--icon"
                onClick={() => move(index, 1)}
                disabled={index === items.length - 1}
              >
                ↓
              </button>
            </div>
          </li>
        ))}
      </ol>
      <div className="chronology__actions">
        <button type="button" className="btn btn--primary" onClick={checkOrder}>
          {t('timeline.chronology.check')}
        </button>
        <button type="button" className="btn btn--ghost" onClick={resetShuffle}>
          {t('timeline.chronology.reshuffle')}
        </button>
      </div>
      <div role="status" aria-live="polite" className="chronology__live">
        {status === 'success' ? t('timeline.chronology.liveSuccess') : status === 'fail' ? t('timeline.chronology.liveFail') : '\u00a0'}
      </div>
      {status === 'success' ? (
        <p className="chronology__feedback chronology__feedback--ok">{t('timeline.chronology.feedbackOk')}</p>
      ) : null}
      {status === 'fail' ? (
        <p className="chronology__feedback chronology__feedback--bad">{t('timeline.chronology.feedbackBad')}</p>
      ) : null}
    </section>
  )
}
