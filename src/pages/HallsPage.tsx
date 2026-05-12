import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { getOrderedHalls } from '../data/catalog'
import { HallCard } from '../components/exhibits/HallCard'

export function HallsPage() {
  const { t } = useTranslation()
  const list = useMemo(() => getOrderedHalls(), [])

  return (
    <section className="halls-page section--cream" aria-labelledby="halls-title">
      <div className="container halls-page__inner">
        <header className="halls-page__header">
          <p className="halls-page__eyebrow">{t('halls.eyebrow')}</p>
          <h1 id="halls-title" className="halls-page__title">
            {t('halls.title')}
          </h1>
          <p className="halls-page__intro">{t('halls.intro')}</p>
        </header>
        <div className="exhibitions__grid halls-page__grid" role="list">
          {list.map((hall) => (
            <div key={hall.id} className="halls-page__cell" role="listitem">
              <HallCard hall={hall} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
