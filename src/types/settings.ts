export type ThemeChoice = 'light' | 'dark' | 'system'

export type LanguageCode = 'ro' | 'ru' | 'en'

export type AppSettings = {
  theme: ThemeChoice
  language: LanguageCode
  /** Touch TV / kiosk: hide cabinet nav and block `/cabinet`. Enable with `?kiosk=1` (persisted). */
  kioskLayout?: boolean
}
