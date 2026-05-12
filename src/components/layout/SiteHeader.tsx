import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { logoUrl } from '../../constants/branding'
import { ThemeToggle } from '../theme/ThemeToggle'
import { LanguageSwitcher } from '../i18n/LanguageSwitcher'
import { useKiosk } from '../../providers/KioskProvider'

const navClass = ({ isActive }: { isActive: boolean }) =>
  ['nav__link', isActive ? 'nav__link--active' : ''].filter(Boolean).join(' ')

export function SiteHeader() {
  const { t } = useTranslation()
  const { kioskLayout } = useKiosk()

  return (
    <header className="site-header">
      <div className="container header__inner">
        <NavLink to="/" className="logo" end>
          <img className="logo__img" src={logoUrl} alt={t('app.logoAlt')} width={40} height={40} />
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
              <NavLink to="/games" className={navClass}>
                {t('nav.games')}
              </NavLink>
            </li>
            {!kioskLayout ? (
              <li>
                <NavLink to="/cabinet" className={navClass}>
                  {t('nav.cabinet')}
                </NavLink>
              </li>
            ) : null}
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
