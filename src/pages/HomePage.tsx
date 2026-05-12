import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function HomePage() {
  const { t } = useTranslation()

  return (
    <section className="hero hero--app" aria-labelledby="hero-title">
      <div className="hero__overlay" aria-hidden />
      <div className="hero__content container">
        <p className="hero__eyebrow">{t('home.eyebrow')}</p>
        <h1 id="hero-title" className="hero__title">
          <span className="hero__title--decor">{t('home.titleLine1')}</span>
          <span className="hero__title--place">{t('home.titleLine2')}</span>
        </h1>
        <p className="hero__subtitle">{t('home.subtitle')}</p>
        <div className="hero__featured">
          <span className="featured__label">{t('home.featuredLabel')}</span>
          <span className="featured__title">{t('home.featuredTitle')}</span>
        </div>
        <div className="hero__actions">
          <Link className="btn btn--primary" to="/halls">
            {t('home.ctaHalls')}
          </Link>
          <Link className="btn btn--ghost" to="/timeline">
            {t('home.ctaTimeline')}
          </Link>
        </div>
      </div>
    </section>
  )
}
