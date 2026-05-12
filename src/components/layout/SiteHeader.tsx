import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ThemeToggle } from '../theme/ThemeToggle'
import { LanguageSwitcher } from '../i18n/LanguageSwitcher'

const navClass = ({ isActive }: { isActive: boolean }) =>
  ['nav__link', isActive ? 'nav__link--active' : ''].filter(Boolean).join(' ')

export function SiteHeader() {
  const { t } = useTranslation()

  return (
    <header className="site-header">
      <div className="container header__inner">
        <NavLink to="/" className="logo" end>
          <img className="logo__img" src="/vite.svg" alt="" width={32} height={32} />
          <span className="logo__text">{t('app.shortName')}</span>
        </NavLink>
        <nav className="nav-main" aria-label={t('nav.mainLabel')}>
          <ul className="nav__list">
            <li>
              <NavLink to="/" className={navClass} end>
                {t('nav.home')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/halls" className={navClass}>
                {t('nav.halls')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/timeline" className={navClass}>
                {t('nav.timeline')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/quiz" className={navClass}>
                {t('nav.quiz')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/cabinet" className={navClass}>
                {t('nav.cabinet')}
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="header-toolbar">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
