import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { LanguageCode } from '../../types/settings'
import { pickLocalized } from '../../i18n/pickLocalized'
import type { TimelineEvent } from '../../types/interactive'
import { markEventSeen } from '../../services/storage/interactiveStorage'
import { syncBadges } from '../../services/badgeSync'

type Props = {
  events: readonly TimelineEvent[]
  selectedId: string | null
  onSelect: (id: string) => void
  language: LanguageCode
}

export function TimelineRail({ events, selectedId, onSelect, language }: Props) {
  const { t } = useTranslation()

  const handlePick = useCallback(
    (id: string) => {
      markEventSeen(id)
      syncBadges()
      onSelect(id)
    },
    [onSelect],
  )

  return (
    <div className="timeline-rail-wrap">
      <p className="timeline-rail__hint">{t('timeline.rail.hint')}</p>
      <ul className="timeline-rail" role="list">
        {events.map((ev) => {
          const active = ev.id === selectedId
          return (
            <li key={ev.id} className="timeline-rail__cell">
              <button
                type="button"
                className={['timeline-node', active ? 'timeline-node--active' : ''].filter(Boolean).join(' ')}
                onClick={() => handlePick(ev.id)}
                aria-pressed={active}
              >
                {ev.image ? (
                  <span className="timeline-node__media">
                    <img src={ev.image} alt="" className="timeline-node__img" loading="lazy" width={120} height={80} />
                  </span>
                ) : null}
                <span className="timeline-node__year">{ev.year}</span>
                <span className="timeline-node__title">{pickLocalized(language, ev.title)}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
