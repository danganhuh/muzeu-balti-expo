import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { LanguageCode } from '../../types/settings'
import { pickLocalized } from '../../i18n/pickLocalized'
import type { TimelineEvent } from '../../types/interactive'
import { getAppPathForExhibitId, getExhibitById } from '../../data/catalog'

type Props = {
  event: TimelineEvent | null
  open: boolean
  onClose: () => void
  language: LanguageCode
}

export function TimelineEventSheet({ event, open, onClose, language }: Props) {
  const { t } = useTranslation()
  if (!open || !event) return null

  return (
    <div className="event-sheet-backdrop" role="presentation" onClick={onClose}>
      <aside
        className="event-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-sheet-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="event-sheet__close btn btn--ghost" onClick={onClose}>
          {t('timeline.sheet.close')}
        </button>
        {event.image ? (
          <div className="event-sheet__hero">
            <img src={event.image} alt="" className="event-sheet__hero-img" width={640} height={360} />
          </div>
        ) : null}
        <div className="event-sheet__body">
          <p className="event-sheet__eyebrow">
            {event.year} · {t(`exhibit.era.${event.era}`)}
          </p>
          <h2 id="event-sheet-title" className="event-sheet__title">
            {pickLocalized(language, event.title)}
          </h2>
          <p className="event-sheet__summary">{pickLocalized(language, event.summary)}</p>
          <p className="event-sheet__detail">{pickLocalized(language, event.detail)}</p>
          {event.relatedExhibitIds.length ? (
            <div className="event-sheet__related">
              <h3 className="event-sheet__related-title">{t('timeline.sheet.related')}</h3>
              <ul className="event-sheet__links">
                {event.relatedExhibitIds.map((id) => {
                  const path = getAppPathForExhibitId(id)
                  const ex = getExhibitById(id)
                  if (!path || !ex) return null
                  return (
                    <li key={id}>
                      <Link to={path} className="event-sheet__link">
                        {pickLocalized(language, ex.title)}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  )
}
