import { createContext } from 'react'
import type { ThemeChoice } from '../types/settings'

export type ThemeContextValue = {
  theme: ThemeChoice
  resolved: 'light' | 'dark'
  setTheme: (t: ThemeChoice) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
