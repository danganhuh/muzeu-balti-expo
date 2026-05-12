import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import QRCode from 'qrcode'

function buildPhoneJoinUrl(sessionId: string): string {
  const rawBase = `${window.location.origin}${import.meta.env.BASE_URL}`
  const base = rawBase.endsWith('/') ? rawBase.slice(0, -1) : rawBase
  const params = new URLSearchParams()
  params.set('from', 'kiosk')
  params.set('sid', sessionId)
  return `${base}/?${params.toString()}`
}

export function KioskJoinQr() {
  const { t } = useTranslation()
  const sessionId = useMemo(() => crypto.randomUUID(), [])
  const joinUrl = useMemo(() => buildPhoneJoinUrl(sessionId), [sessionId])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [qrError, setQrError] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let cancelled = false
    setQrError(false)
    QRCode.toCanvas(canvas, joinUrl, {
      width: 168,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: { dark: '#1f1a15ff', light: '#ffffffff' },
    })
      .then(() => {
        if (cancelled) return
      })
      .catch(() => {
        if (!cancelled) setQrError(true)
      })
    return () => {
      cancelled = true
    }
  }, [joinUrl])

  return (
    <aside className="kiosk-join-qr" aria-label={t('kiosk.panelLabel')}>
      <div className="kiosk-join-qr__text">
        <p className="kiosk-join-qr__title">{t('kiosk.joinTitle')}</p>
        <p className="kiosk-join-qr__intro">{t('kiosk.joinIntro')}</p>
        <p className="kiosk-join-qr__hint">{t('kiosk.joinHint')}</p>
      </div>
      <div className="kiosk-join-qr__canvas-wrap">
        <canvas ref={canvasRef} className="kiosk-join-qr__canvas" role="img" aria-label={t('kiosk.qrAlt')} />
        {qrError ? <p className="kiosk-join-qr__fallback">{joinUrl}</p> : null}
      </div>
    </aside>
  )
}
