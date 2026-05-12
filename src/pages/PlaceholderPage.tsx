import { useTranslation } from 'react-i18next'

const titles = {
  halls: 'placeholder.titleHalls',
  timeline: 'placeholder.titleTimeline',
  quiz: 'placeholder.titleQuiz',
  cabinet: 'placeholder.titleCabinet',
} as const

type PageKey = keyof typeof titles

export function PlaceholderPage({ pageKey }: { pageKey: PageKey }) {
  const { t } = useTranslation()

  return (
    <section className="placeholder-page container">
      <h1 className="placeholder-page__title exhibition-card__title">{t(titles[pageKey])}</h1>
      <p className="placeholder-page__text">{t('placeholder.body')}</p>
    </section>
  )
}
