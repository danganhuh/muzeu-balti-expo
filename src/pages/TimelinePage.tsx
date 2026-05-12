import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { LanguageCode } from '../types/settings'
import { getTimelineEvents } from '../data/timelineCatalog'
import { TimelineRail } from '../components/timeline/TimelineRail'
import { TimelineEventSheet } from '../components/timeline/TimelineEventSheet'
import { ChronologyMission } from '../components/timeline/ChronologyMission'

export function TimelinePage() {
  const { i18n, t } = useTranslation()
  const language = i18n.language as LanguageCode
  const events = useMemo(() => getTimelineEvents(), [])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = useMemo(() => events.find((e) => e.id === selectedId) ?? null, [events, selectedId])

  return (
    <section className="section--cream timeline-page">
      <div className="container timeline-page__inner">
        <header className="timeline-page__header">
          <p className="halls-page__eyebrow">{t('timeline.eyebrow')}</p>
          <h1 className="halls-page__title">{t('timeline.title')}</h1>
          <p className="halls-page__intro">{t('timeline.intro')}</p>
        </header>
        <TimelineRail events={events} selectedId={selectedId} onSelect={setSelectedId} language={language} />
        <TimelineEventSheet
          event={selected}
          open={selectedId != null}
          onClose={() => setSelectedId(null)}
          language={language}
        />
        <ChronologyMission events={events} language={language} />
      </div>
    </section>
  )
}
