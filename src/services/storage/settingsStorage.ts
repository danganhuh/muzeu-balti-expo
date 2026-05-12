import type { AppSettings, LanguageCode, ThemeChoice } from '../../types/settings'
import { STORAGE_KEYS } from './keys'

const STORAGE_KEY = STORAGE_KEYS.settings

const defaultSettings: AppSettings = {
  theme: 'system',
  language: 'ro',
}

function isThemeChoice(v: unknown): v is ThemeChoice {
  return v === 'light' || v === 'dark' || v === 'system'
}

function isLanguageCode(v: unknown): v is LanguageCode {
  return v === 'ro' || v === 'ru' || v === 'en'
}

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...defaultSettings }
    const parsed = JSON.parse(raw) as Record<string, unknown>
    return {
      theme: isThemeChoice(parsed.theme) ? parsed.theme : defaultSettings.theme,
      language: isLanguageCode(parsed.language) ? parsed.language : defaultSettings.language,
    }
  } catch {
    return { ...defaultSettings }
  }
}

export function saveSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch {
    /* ignore quota / private mode */
  }
}
