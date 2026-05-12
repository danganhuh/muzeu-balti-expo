import { useContext } from 'react'
import { I18nLanguageContext } from './i18nLanguageContext'

export function useSetLanguage() {
  return useContext(I18nLanguageContext)
}
