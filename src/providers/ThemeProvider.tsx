import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { AppSettings, ThemeChoice } from '../types/settings'
import { loadSettings, saveSettings } from '../services/storage/settingsStorage'

type ThemeContextValue = {
  theme: ThemeChoice
  resolved: 'light' | 'dark'
  setTheme: (t: ThemeChoice) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getSystemDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function resolveTheme(theme: ThemeChoice): 'light' | 'dark' {
  if (theme === 'system') return getSystemDark() ? 'dark' : 'light'
  return theme
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings())
  const [systemTick, setSystemTick] = useState(0)

  const resolved = useMemo(
    () => resolveTheme(settings.theme),
    [settings.theme, systemTick]
  )

  useEffect(() => {
    document.documentElement.dataset.theme = resolved
  }, [resolved])

  useEffect(() => {
    if (settings.theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setSystemTick((n) => n + 1)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [settings.theme])

  const setTheme = useCallback((theme: ThemeChoice) => {
    setSettings((prev) => {
      const next = { ...prev, theme }
      saveSettings(next)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({
      theme: settings.theme,
      resolved,
      setTheme,
    }),
    [settings.theme, resolved, setTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
