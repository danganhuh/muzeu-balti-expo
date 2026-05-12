import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getExhibitsForHall, getHallBySlug } from '../data/catalog'
import { sortCategoriesPresent, sortErasPresent } from '../data/displayOrder'
import { ExhibitCard } from '../components/exhibits/ExhibitCard'
import { ExhibitFilterBar } from '../components/exhibits/ExhibitFilterBar'
import { useHallExhibitFilters } from '../hooks/useHallExhibitFilters'
import { useUserExhibitCollections } from '../hooks/useUserExhibitCollections'
import type { LanguageCode } from '../types/settings'
import { pickLocalized } from '../i18n/pickLocalized'

export function HallDetailPage() {
  const { hallSlug = '' } = useParams()
  const { t, i18n } = useTranslation()
  const lang = i18n.language as LanguageCode

  const { filters, setEra, setCategory, setCollection } = useHallExhibitFilters(hallSlug)
  const collections = useUserExhibitCollections()

  const hall = hallSlug ? getHallBySlug(hallSlug) : undefined

  const exhibitList = useMemo(() => (hall ? [...getExhibitsForHall(hall.id)] : []), [hall])

  const eraOptions = useMemo(() => ['all' as const, ...sortErasPresent(exhibitList.map((e) => e.era))], [exhibitList])
  const categoryOptions = useMemo(
    () => ['all' as const, ...sortCategoriesPresent(exhibitList.map((e) => e.category))],
    [exhibitList],
  )

  const filtered = useMemo(() => {
    return exhibitList.filter((e) => {
      if (filters.era !== 'all' && e.era !== filters.era) return false
      if (filters.category !== 'all' && e.category !== filters.category) return false
      if (filters.collection === 'favorites' && !collections.isFavorite(e.id)) return false
      if (filters.collection === 'unstudied' && collections.isStudied(e.id)) return false
      return true
    })
  }, [exhibitList, filters, collections])

  if (!hallSlug || !hall) return <Navigate to="/halls" replace />

  return (
    <section className="hall-detail section--cream" aria-labelledby="hall-title">
      <div className="container hall-detail__inner">
        <nav className="hall-detail__crumbs" aria-label={t('halls.crumbsLabel')}>
          <Link to="/halls">{t('nav.halls')}</Link>
          <span aria-hidden> / </span>
          <span className="hall-detail__crumbs-current">{pickLocalized(lang, hall.title)}</span>
        </nav>
        <header className="hall-detail__header">
          <h1 id="hall-title" className="hall-detail__title">
            {pickLocalized(lang, hall.title)}
          </h1>
          <p className="hall-detail__subtitle">{t('halls.detail.subtitle')}</p>
        </header>

        <ExhibitFilterBar
          filters={filters}
          onEra={setEra}
          onCategory={setCategory}
          onCollection={setCollection}
          eras={eraOptions}
          categories={categoryOptions}
        />

        {filtered.length === 0 ? (
          <p className="hall-detail__empty" role="status">
            {t('exhibit.filters.empty')}
          </p>
        ) : (
          <div className="exhibitions__grid hall-detail__grid" role="list">
            {filtered.map((exhibit) => (
              <div key={exhibit.id} role="listitem">
                <ExhibitCard
                  exhibit={exhibit}
                  hallSlug={hall.slug}
                  isFavorite={collections.isFavorite(exhibit.id)}
                  inAlbum={collections.inAlbum(exhibit.id)}
                  isStudied={collections.isStudied(exhibit.id)}
                  onToggleFavorite={() => collections.toggleFavorite(exhibit.id)}
                  onToggleAlbum={() => collections.toggleAlbum(exhibit.id)}
                  onToggleStudied={() => collections.toggleStudied(exhibit.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
