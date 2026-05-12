import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { remoteExhibitHeroes } from '../../data/remoteMedia'
import { loadHiddenRelicProgress, saveHiddenRelicProgress, submitLeaderboardEntry } from '../../services/storage/interactiveStorage'
import { LEADERBOARD_KEYS } from '../../constants/leaderboards'
import { syncBadges } from '../../services/badgeSync'

/** Normalized hit boxes (left, top, width, height) in fractions of the image. */
const HOTSPOTS: readonly { id: string; l: number; t: number; w: number; h: number }[] = [
  { id: 'h1', l: 0.12, t: 0.38, w: 0.14, h: 0.12 },
  { id: 'h2', l: 0.55, t: 0.22, w: 0.12, h: 0.14 },
  { id: 'h3', l: 0.38, t: 0.62, w: 0.16, h: 0.14 },
]

const TIME_MS = 45000

export function HiddenRelicGame() {
  const { t } = useTranslation()
  const [found, setFound] = useState<Set<string>>(() => new Set())
  const [deadline, setDeadline] = useState<number | null>(null)
  const [remaining, setRemaining] = useState(TIME_MS)
  const [phase, setPhase] = useState<'idle' | 'play' | 'won' | 'lost'>('idle')
  const [pseudo, setPseudo] = useState('')
  const [lbSaved, setLbSaved] = useState(false)
  const [winPts, setWinPts] = useState(0)

  useEffect(() => {
    if (phase !== 'play' || deadline == null) return
    const id = window.setInterval(() => {
      const left = Math.max(0, deadline - Date.now())
      setRemaining(left)
      if (left <= 0) {
        setPhase('lost')
      }
    }, 200)
    return () => window.clearInterval(id)
  }, [deadline, phase])

  const start = useCallback(() => {
    setFound(new Set())
    setPhase('play')
    setDeadline(Date.now() + TIME_MS)
    setRemaining(TIME_MS)
  }, [])

  const onHotspot = useCallback(
    (hid: string) => {
      if (phase !== 'play' || found.has(hid)) return
      const next = new Set(found).add(hid)
      if (next.size >= HOTSPOTS.length) {
        const elapsed = deadline != null ? TIME_MS - Math.max(0, deadline - Date.now()) : TIME_MS
        setWinPts(Math.max(120, 900 - Math.floor(elapsed / 30)))
        const prog = loadHiddenRelicProgress()
        const best =
          prog.bestTimeMs === Number.POSITIVE_INFINITY ? elapsed : Math.min(prog.bestTimeMs, elapsed)
        saveHiddenRelicProgress({
          bestTimeMs: best,
          wins: prog.wins + 1,
          lastPlayedAt: new Date().toISOString(),
        })
        syncBadges()
        setFound(next)
        setPhase('won')
      } else {
        setFound(next)
      }
    },
    [deadline, found, phase],
  )

  const saveLb = useCallback(() => {
    const name = pseudo.trim().slice(0, 24)
    if (name.length < 2) return
    submitLeaderboardEntry(LEADERBOARD_KEYS.hiddenRelic, { pseudonym: name, score: winPts, at: new Date().toISOString() })
    setLbSaved(true)
  }, [pseudo, winPts])

  return (
    <div className="relic-game card-surface">
      <p className="relic-game__lede">{t('games.relic.lede')}</p>
      {phase === 'idle' || phase === 'lost' ? (
        <button type="button" className="btn btn--primary" onClick={start}>
          {phase === 'lost' ? t('games.relic.tryAgain') : t('games.relic.start')}
        </button>
      ) : null}
      {phase === 'play' || phase === 'won' ? (
        <div className="relic-game__board-wrap">
          <div className="relic-game__timer" aria-live="polite">
            {phase === 'play' ? t('games.relic.timer', { s: Math.ceil(remaining / 1000) }) : null}
            {phase === 'won' ? <span className="chip chip--success">{t('games.relic.win')}</span> : null}
          </div>
          <div className="relic-game__board">
            <img src={remoteExhibitHeroes.marketSquare} alt="" className="relic-game__img" width={900} height={600} />
            {HOTSPOTS.map((h) => {
              const done = found.has(h.id)
              return (
                <button
                  key={h.id}
                  type="button"
                  className={['relic-hotspot', done ? 'relic-hotspot--found' : ''].filter(Boolean).join(' ')}
                  style={{ left: `${h.l * 100}%`, top: `${h.t * 100}%`, width: `${h.w * 100}%`, height: `${h.h * 100}%` }}
                  onClick={() => onHotspot(h.id)}
                  disabled={phase !== 'play' || done}
                  aria-label={t('games.relic.hotspot')}
                />
              )
            })}
          </div>
        </div>
      ) : null}
      {phase === 'won' ? (
        <div className="relic-game__lb">
          <label htmlFor="relic-pseudo">{t('leaderboard.pseudonymLabel')}</label>
          <input id="relic-pseudo" className="quiz-result__input" value={pseudo} maxLength={24} onChange={(e) => setPseudo(e.target.value)} />
          <button type="button" className="btn btn--primary" onClick={saveLb} disabled={lbSaved || pseudo.trim().length < 2}>
            {lbSaved ? t('leaderboard.saved') : t('leaderboard.save')}
          </button>
        </div>
      ) : null}
    </div>
  )
}
