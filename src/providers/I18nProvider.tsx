import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import type { AppSettings, LanguageCode } from '../types/settings'
import { loadSettings, saveSettings } from '../services/storage/settingsStorage'
import en from '../locales/en.json'
import ro from '../locales/ro.json'
import ru from '../locales/ru.json'
import { I18nLanguageContext } from '../i18n/i18nLanguageContext'

const resources = {
  ro: { translation: ro },
  ru: { translation: ru },
  en: { translation: en },
} as const

void i18n.use(initReactI18next).init({
  resources,
  lng: loadSettings().language,
  fallbackLng: 'ro',
  interpolation: { escapeValue: false },
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(() => loadSettings().language)

  useEffect(() => {
    void i18n.changeLanguage(language)
    document.documentElement.lang = language
  }, [language])

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang)
    setSettingsLanguage(lang)
  }, [])

  const setLanguageStable = useMemo(() => setLanguage, [setLanguage])

  return (
    <I18nextProvider i18n={i18n}>
      <I18nLanguageContext.Provider value={setLanguageStable}>{children}</I18nLanguageContext.Provider>
    </I18nextProvider>
  )
}

function setSettingsLanguage(language: LanguageCode) {
  const prev = loadSettings()
  const next: AppSettings = { ...prev, language }
  saveSettings(next)
}
