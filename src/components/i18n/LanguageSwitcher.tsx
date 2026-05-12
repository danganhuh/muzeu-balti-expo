import { useTranslation } from 'react-i18next'
import type { LanguageCode } from '../../types/settings'
import { useSetLanguage } from '../../providers/I18nProvider'

const langs: LanguageCode[] = ['ro', 'ru', 'en']

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const setLanguage = useSetLanguage()
  const raw = i18n.resolvedLanguage ?? i18n.language ?? 'ro'
  const short = raw.slice(0, 2) as LanguageCode
  const current: LanguageCode = langs.includes(short) ? short : 'ro'

  return (
    <div className="lang-switcher" role="group" aria-label={t('lang.groupLabel')}>
      {langs.map((code) => (
        <button
          key={code}
          type="button"
          className={
            current === code ? 'lang-switcher__btn lang-switcher__btn--active' : 'lang-switcher__btn'
          }
          onClick={() => setLanguage(code)}
          lang={code}
        >
          {t(`lang.${code}`)}
        </button>
      ))}
    </div>
  )
}
