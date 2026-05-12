import { createContext } from 'react'
import type { LanguageCode } from '../types/settings'

export const I18nLanguageContext = createContext<(lang: LanguageCode) => void>(() => {})
