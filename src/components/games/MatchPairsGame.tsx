import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { LanguageCode } from '../../types/settings'
import { pickLocalized } from '../../i18n/pickLocalized'
import { matchPairImages } from '../../data/matchGameMedia'
import { loadMatchGameProgress, saveMatchGameProgress, submitLeaderboardEntry } from '../../services/storage/interactiveStorage'
import { LEADERBOARD_KEYS } from '../../constants/leaderboards'
import { syncBadges } from '../../services/badgeSync'

import type { LocalizedString } from '../../types/museum'

type Card = {
  key: string
  pairId: string
  image: string
  caption: LocalizedString
}

const deckSeed: readonly Card[] = [
  {
    key: 'a1',
    pairId: 'piazza',
    image: matchPairImages.marketSquare,
    caption: { ro: 'Piața din Bălți', ru: 'Площадь в Бельцах', en: 'Square in Bălți' },
  },
  {
    key: 'a2',
    pairId: 'piazza',
    image: matchPairImages.marketSquare,
    caption: { ro: 'Piața din Bălți', ru: 'Площадь в Бельцах', en: 'Square in Bălți' },
  },
  {
    key: 'b1',
    pairId: 'facade',
    image: matchPairImages.streetFacade,
    caption: { ro: 'Fațada Băncii Românești', ru: 'Фасад «Banca Românească»', en: 'Banca Românească façade' },
  },
  {
    key: 'b2',
    pairId: 'facade',
    image: matchPairImages.streetFacade,
    caption: { ro: 'Fațada Băncii Românești', ru: 'Фасад «Banca Românească»', en: 'Banca Românească façade' },
  },
  {
    key: 'c1',
    pairId: 'courtyard',
    image: matchPairImages.courtyardWell,
    caption: { ro: 'Curtea catedralei', ru: 'Двор собора', en: 'Cathedral yard' },
  },
  {
    key: 'c2',
    pairId: 'courtyard',
    image: matchPairImages.courtyardWell,
    caption: { ro: 'Curtea catedralei', ru: 'Двор собора', en: 'Cathedral yard' },
  },
  {
    key: 'd1',
    pairId: 'loom',
    image: matchPairImages.weaverLoom,
    caption: { ro: 'Război de țesut', ru: 'Ткацкий станок', en: 'Weaving loom' },
  },
  {
    key: 'd2',
    pairId: 'loom',
    image: matchPairImages.weaverLoom,
    caption: { ro: 'Război de țesut', ru: 'Ткацкий станок', en: 'Weaving loom' },
  },
]

const PAIRS_TOTAL = 4

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

type Props = { language: LanguageCode }

export function MatchPairsGame({ language }: Props) {
  const { t } = useTranslation()
  const [cards] = useState(() => shuffle([...deckSeed]))
  const [flipped, setFlipped] = useState<string[]>([])
  const [matched, setMatched] = useState<Set<string>>(() => new Set())
  const [moves, setMoves] = useState(0)
  const [lock, setLock] = useState(false)
  const [won, setWon] = useState(false)
  const [pseudo, setPseudo] = useState('')
  const [lbSaved, setLbSaved] = useState(false)

  const onPick = useCallback(
    (key: string, pairId: string) => {
      if (lock || won || matched.has(pairId)) return
      if (flipped.includes(key)) return
      if (flipped.length === 0) {
        setFlipped([key])
        return
      }
      if (flipped.length !== 1) return
      const firstKey = flipped[0]
      const first = cards.find((c) => c.key === firstKey)
      const second = cards.find((c) => c.key === key)
      if (!first || !second) return
      const nextMoves = moves + 1
      setMoves(nextMoves)
      setLock(true)
      if (first.pairId === second.pairId) {
        window.setTimeout(() => {
          setMatched((prev) => {
            const next = new Set(prev).add(pairId)
            if (next.size >= PAIRS_TOTAL) {
              setWon(true)
              const prevProg = loadMatchGameProgress()
              const best =
                prevProg.bestMoves === Number.POSITIVE_INFINITY ? nextMoves : Math.min(prevProg.bestMoves, nextMoves)
              saveMatchGameProgress({
                bestMoves: best,
                completedCount: prevProg.completedCount + 1,
                lastPlayedAt: new Date().toISOString(),
              })
              syncBadges()
            }
            return next
          })
          setFlipped([])
          setLock(false)
        }, 400)
      } else {
        setFlipped([firstKey, key])
        window.setTimeout(() => {
          setFlipped([])
          setLock(false)
        }, 900)
      }
    },
    [cards, flipped, lock, matched, moves, won],
  )

  const saveLb = useCallback(() => {
    const name = pseudo.trim().slice(0, 24)
    if (name.length < 2) return
    const pts = Math.max(0, 500 - moves * 8)
    submitLeaderboardEntry(LEADERBOARD_KEYS.matchPairs, { pseudonym: name, score: pts, at: new Date().toISOString() })
    setLbSaved(true)
  }, [moves, pseudo])

  return (
    <div className="match-game">
      <div className="match-game__head">
        <p className="match-game__stat">{t('games.match.moves', { count: moves })}</p>
        {won ? <p className="match-game__win chip chip--success">{t('games.match.win')}</p> : null}
      </div>
      <div className="match-grid" role="grid" aria-label={t('games.match.gridLabel')}>
        {cards.map((c) => {
          const show = flipped.includes(c.key) || matched.has(c.pairId)
          return (
            <button
              key={c.key}
              type="button"
              className={['match-card', show ? 'match-card--open' : ''].filter(Boolean).join(' ')}
              onClick={() => onPick(c.key, c.pairId)}
              disabled={lock || matched.has(c.pairId)}
            >
              {show ? (
                <>
                  <img
                    src={c.image}
                    alt=""
                    className="match-card__img"
                    width={160}
                    height={110}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="match-card__cap">{pickLocalized(language, c.caption)}</span>
                </>
              ) : (
                <span className="match-card__back" aria-hidden>
                  ?
                </span>
              )}
            </button>
          )
        })}
      </div>
      {won ? (
        <div className="match-game__lb card-surface">
          <label htmlFor="match-pseudo">{t('leaderboard.pseudonymLabel')}</label>
          <input id="match-pseudo" className="quiz-result__input" value={pseudo} maxLength={24} onChange={(e) => setPseudo(e.target.value)} />
          <button type="button" className="btn btn--primary" onClick={saveLb} disabled={lbSaved || pseudo.trim().length < 2}>
            {lbSaved ? t('leaderboard.saved') : t('leaderboard.save')}
          </button>
        </div>
      ) : null}
    </div>
  )
}
