import { useCallback, useEffect, useMemo, useState, type DragEvent } from 'react'
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

function reorderDrag(order: readonly string[], id: string, toIndex: number): string[] {
  const from = order.indexOf(id)
  if (from === -1) return [...order]
  const next = [...order]
  next.splice(from, 1)
  next.splice(toIndex, 0, id)
  return next
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
  const [dragId, setDragId] = useState<string | null>(null)
  const [overIndex, setOverIndex] = useState<number | null>(null)

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
    setDragId(null)
    setOverIndex(null)
  }, [targetIds])

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

  const onDragStart = useCallback((e: DragEvent, id: string) => {
    setStatus('idle')
    setDragId(id)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', id)
  }, [])

  const onDragEnd = useCallback(() => {
    setDragId(null)
    setOverIndex(null)
  }, [])

  const onDragOver = useCallback((e: DragEvent, index: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setOverIndex(index)
  }, [])

  const onDrop = useCallback(
    (e: DragEvent, dropIndex: number) => {
      e.preventDefault()
      const id = e.dataTransfer.getData('text/plain') || dragId
      if (!id) return
      setOrder((prev) => reorderDrag(prev, id, dropIndex))
      setDragId(null)
      setOverIndex(null)
      setStatus('idle')
    },
    [dragId],
  )

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
      <ol className="chronology__list chronology__list--drag">
        {items.map((ev, index) => {
          const dragging = dragId === ev.id
          const over = overIndex === index && dragId !== ev.id
          return (
            <li
              key={ev.id}
              className={[
                'chronology__row',
                dragging ? 'chronology__row--dragging' : '',
                over ? 'chronology__row--drop-target' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onDragOver={(e) => onDragOver(e, index)}
              onDrop={(e) => onDrop(e, index)}
              onDragLeave={() => setOverIndex((o) => (o === index ? null : o))}
            >
              <div
                className="chronology__card"
                draggable
                onDragStart={(e) => onDragStart(e, ev.id)}
                onDragEnd={onDragEnd}
                tabIndex={0}
                aria-grabbed={dragging}
                aria-label={t('timeline.chronology.dragHandle', { title: pickLocalized(language, ev.title) })}
              >
                {ev.image ? (
                  <span className="chronology__thumb">
                    <img src={ev.image} alt="" width={88} height={66} loading="lazy" decoding="async" />
                  </span>
                ) : (
                  <span className="chronology__thumb chronology__thumb--empty" aria-hidden>
                    ·
                  </span>
                )}
                <span className="chronology__year" aria-hidden>
                  ?
                </span>
                <div className="chronology__body">
                  <p className="chronology__event-title">{pickLocalized(language, ev.title)}</p>
                  <p className="chronology__hint">{t('timeline.chronology.hiddenYear')}</p>
                </div>
                <span className="chronology__grip" aria-hidden>
                  ⋮⋮
                </span>
              </div>
            </li>
          )
        })}
      </ol>
      <div className="chronology__actions">
        <button type="button" className="btn btn--primary" onClick={checkOrder}>
          {t('timeline.chronology.check')}
        </button>
        <button type="button" className="btn btn--ghost" onClick={resetShuffle}>
          {t('timeline.chronology.reshuffle')}
        </button>
      </div>
      <div role="status" aria-live="polite" className="sr-only">
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
