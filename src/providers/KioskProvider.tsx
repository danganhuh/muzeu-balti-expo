import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { loadSettings, saveSettings } from '../services/storage/settingsStorage'

type KioskContextValue = {
  kioskLayout: boolean
  setKioskLayout: (value: boolean) => void
}

const KioskContext = createContext<KioskContextValue | null>(null)

/** Reads `?kiosk=1|true|yes|on` or `?kiosk=0|false|no|off`, persists, strips param from URL. */
function consumeKioskQueryParam(): boolean | null {
  const params = new URLSearchParams(window.location.search)
  if (!params.has('kiosk')) return null
  const raw = (params.get('kiosk') ?? '').toLowerCase().trim()
  params.delete('kiosk')
  const qs = params.toString()
  const nextUrl = `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`
  window.history.replaceState(null, '', nextUrl)

  if (['1', 'true', 'yes', 'on'].includes(raw)) return true
  if (['0', 'false', 'no', 'off'].includes(raw)) return false
  return null
}

export function KioskProvider({ children }: { children: ReactNode }) {
  const [kioskLayout, setKioskState] = useState(() => loadSettings().kioskLayout === true)

  useEffect(() => {
    const fromUrl = consumeKioskQueryParam()
    if (fromUrl === null) return
    setKioskState(fromUrl)
    const prev = loadSettings()
    saveSettings({ ...prev, kioskLayout: fromUrl })
  }, [])

  useEffect(() => {
    if (kioskLayout) document.documentElement.dataset.kiosk = 'true'
    else delete document.documentElement.dataset.kiosk
  }, [kioskLayout])

  const setKioskLayout = useCallback((value: boolean) => {
    setKioskState(value)
    const prev = loadSettings()
    saveSettings({ ...prev, kioskLayout: value })
  }, [])

  const value = useMemo(() => ({ kioskLayout, setKioskLayout }), [kioskLayout, setKioskLayout])

  return <KioskContext.Provider value={value}>{children}</KioskContext.Provider>
}

export function useKiosk(): KioskContextValue {
  const ctx = useContext(KioskContext)
  if (!ctx) throw new Error('useKiosk must be used within KioskProvider')
  return ctx
}
