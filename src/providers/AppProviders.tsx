import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { ThemeProvider } from './ThemeProvider'
import { I18nProvider } from './I18nProvider'
import { migrateStorage } from '../services/storage/migrateStorage'

export function AppProviders({ children }: { children: ReactNode }) {
  useEffect(() => {
    migrateStorage()
  }, [])

  return (
    <ThemeProvider>
      <I18nProvider>{children}</I18nProvider>
    </ThemeProvider>
  )
}
