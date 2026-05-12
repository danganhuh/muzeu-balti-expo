import { Link, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getExhibitInHall, getHallBySlug, getPersonById } from '../data/catalog'
import { pickLocalized, pickLocalizedList } from '../i18n/pickLocalized'
import type { LanguageCode } from '../types/settings'
import type { HistoricalPerson } from '../types/museum'
import { publicUrl } from '../utils/publicUrl'
import { ExhibitActionsBar } from '../components/exhibits/ExhibitActionsBar'
import { useUserExhibitCollections } from '../hooks/useUserExhibitCollections'

export function ExhibitDetailPage() {
  const { hallSlug = '', exhibitId = '' } = useParams()
  const { t, i18n } = useTranslation()
  const lang = i18n.language as LanguageCode
  const collections = useUserExhibitCollections()

  const exhibit = hallSlug && exhibitId ? getExhibitInHall(hallSlug, exhibitId) : undefined
  const hall = hallSlug ? getHallBySlug(hallSlug) : undefined

  if (!hallSlug || !exhibitId) return <Navigate to="/halls" replace />
  if (!hall || !exhibit) return <Navigate to="/halls" replace />

  const funFacts = pickLocalizedList(lang, exhibit.funFacts)
  const people: HistoricalPerson[] = exhibit.relatedPersonIds
    .map((id) => getPersonById(id))
    .filter((p): p is HistoricalPerson => p != null)

  return (
    <article className="exhibit-detail section--cream" aria-labelledby="exhibit-title">
      <div className="container exhibit-detail__inner">
        <nav className="exhibit-detail__crumbs" aria-label={t('halls.crumbsLabel')}>
          <Link to="/halls">{t('nav.halls')}</Link>
          <span aria-hidden> / </span>
          <Link to={`/halls/${hall.slug}`}>{pickLocalized(lang, hall.title)}</Link>
          <span aria-hidden> / </span>
          <span className="exhibit-detail__crumbs-current">{pickLocalized(lang, exhibit.title)}</span>
        </nav>

        <header className="exhibit-detail__hero">
          <div className="exhibit-detail__media">
            <img
              className="exhibit-detail__img"
              src={publicUrl(exhibit.heroImage)}
              alt=""
              width={960}
              height={540}
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="exhibit-detail__headline">
            <p className="exhibit-detail__meta">
              <span className="exhibit-detail__pill">{t(`exhibit.era.${exhibit.era}`, { lng: lang })}</span>
              <span className="exhibit-detail__pill exhibit-detail__pill--muted">
                {t(`exhibit.category.${exhibit.category}`, { lng: lang })}
              </span>
            </p>
            <h1 id="exhibit-title" className="exhibit-detail__title">
              {pickLocalized(lang, exhibit.title)}
            </h1>
            <p className="exhibit-detail__lead">{pickLocalized(lang, exhibit.shortDescription)}</p>
            <ExhibitActionsBar
              isFavorite={collections.isFavorite(exhibit.id)}
              inAlbum={collections.inAlbum(exhibit.id)}
              isStudied={collections.isStudied(exhibit.id)}
              onToggleFavorite={() => collections.toggleFavorite(exhibit.id)}
              onToggleAlbum={() => collections.toggleAlbum(exhibit.id)}
              onToggleStudied={() => collections.toggleStudied(exhibit.id)}
            />
          </div>
        </header>

        <section className="exhibit-detail__section" aria-labelledby="exhibit-story">
          <h2 id="exhibit-story" className="exhibit-detail__section-title">
            {t('exhibit.detail.story')}
          </h2>
          <div className="exhibit-detail__prose">
            <p>{pickLocalized(lang, exhibit.longDescription)}</p>
          </div>
        </section>

        <section className="exhibit-detail__section" aria-labelledby="exhibit-facts">
          <h2 id="exhibit-facts" className="exhibit-detail__section-title">
            {t('exhibit.detail.funFacts')}
          </h2>
          {funFacts.length === 0 ? (
            <p className="exhibit-detail__muted">{t('exhibit.detail.noFunFacts')}</p>
          ) : (
            <ul className="exhibit-detail__facts">
              {funFacts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          )}
        </section>

        {people.length > 0 ? (
          <section className="exhibit-detail__section" aria-labelledby="exhibit-people">
            <h2 id="exhibit-people" className="exhibit-detail__section-title">
              {t('exhibit.detail.relatedPeople')}
            </h2>
            <ul className="exhibit-detail__people">
              {people.map((p) => (
                <li key={p.id} className="exhibit-person-card">
                  <img
                    className="exhibit-person-card__img"
                    src={publicUrl(p.portraitImage)}
                    alt=""
                    width={120}
                    height={150}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div className="exhibit-person-card__body">
                    <h3 className="exhibit-person-card__name">{pickLocalized(lang, p.name)}</h3>
                    <p className="exhibit-person-card__role">{pickLocalized(lang, p.role)}</p>
                    <p className="exhibit-person-card__bio">{pickLocalized(lang, p.bioShort)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  )
}
