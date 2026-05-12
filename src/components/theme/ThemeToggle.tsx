import { useTranslation } from 'react-i18next'
import { useTheme } from '../../theme/useTheme'

export function ThemeToggle() {
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme()

  const cycle = () => {
    const order = ['light', 'dark', 'system'] as const
    const i = order.indexOf(theme)
    setTheme(order[(i + 1) % order.length])
  }

  const label =
    theme === 'light' ? t('theme.light') : theme === 'dark' ? t('theme.dark') : t('theme.system')

  return (
    <button type="button" className="header-toolbar__btn" onClick={cycle} title={t('theme.cycle')}>
      <span className="header-toolbar__btn-label" aria-hidden>
        {theme === 'light' ? '☀' : theme === 'dark' ? '☾' : '◐'}
      </span>
      <span className="header-toolbar__btn-text">{label}</span>
    </button>
  )
}
