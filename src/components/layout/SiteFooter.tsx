import { useTranslation } from 'react-i18next'

export function SiteFooter() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container">
        <p className="footer-tagline">{t('footer.tagline')}</p>
        <p className="footer-copy">
          © {year} {t('app.name')} — {t('footer.demo')}
        </p>
      </div>
    </footer>
  )
}
