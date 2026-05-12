import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { LanguageCode } from '../../types/settings'
import { pickLocalized } from '../../i18n/pickLocalized'
import type { QuizSet } from '../../types/interactive'
import { loadQuizProgress, saveQuizProgress, submitLeaderboardEntry } from '../../services/storage/interactiveStorage'
import { syncBadges } from '../../services/badgeSync'
import { LEADERBOARD_KEYS } from '../../constants/leaderboards'

type Props = {
  quiz: QuizSet
  language: LanguageCode
  onFinished?: (score: number) => void
}

export function QuizRunner({ quiz, language, onFinished }: Props) {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [complete, setComplete] = useState(false)
  const [pseudonym, setPseudonym] = useState('')
  const [savedLb, setSavedLb] = useState(false)

  const q = quiz.questions[index]
  const isLast = index >= quiz.questions.length - 1

  const progressLabel = useMemo(() => t('quiz.progress', { current: index + 1, total: quiz.questions.length }), [index, quiz.questions.length, t])

  const persistAttempt = useCallback(
    (finalScore: number) => {
      const prev = loadQuizProgress()
      const prevEntry = prev[quiz.id]
      const bestScore = Math.max(prevEntry?.bestScore ?? 0, finalScore)
      const next: typeof prev = {
        ...prev,
        [quiz.id]: {
          bestScore,
          attempts: (prevEntry?.attempts ?? 0) + 1,
          lastPlayedAt: new Date().toISOString(),
        },
      }
      saveQuizProgress(next)
      syncBadges()
    },
    [quiz.id],
  )

  const finish = useCallback(
    (finalScore: number) => {
      setComplete(true)
      persistAttempt(finalScore)
      onFinished?.(finalScore)
    },
    [onFinished, persistAttempt],
  )

  const choose = useCallback(
    (choiceIndex: number) => {
      if (revealed || complete) return
      setPicked(choiceIndex)
      setRevealed(true)
      const correct = choiceIndex === q.correctIndex
      const nextScore = score + (correct ? 1 : 0)
      setScore(nextScore)
      window.setTimeout(() => {
        if (isLast) {
          finish(nextScore)
        } else {
          setIndex((i) => i + 1)
          setPicked(null)
          setRevealed(false)
        }
      }, 1100)
    },
    [complete, finish, isLast, q, revealed, score],
  )

  const submitLb = useCallback(() => {
    const name = pseudonym.trim().slice(0, 24)
    if (name.length < 2) return
    const key = quiz.id === 'quiz-balti-urban' ? LEADERBOARD_KEYS.quizUrban : LEADERBOARD_KEYS.quizRegion
    submitLeaderboardEntry(key, {
      pseudonym: name,
      score: score * 100,
      at: new Date().toISOString(),
    })
    setSavedLb(true)
  }, [pseudonym, quiz.id, score])

  if (complete) {
    return (
      <div className="quiz-result card-surface">
        <h2 className="quiz-result__title">{t('quiz.doneTitle')}</h2>
        <p className="quiz-result__score" aria-live="polite">
          {t('quiz.scoreLine', { score, total: quiz.questions.length })}
        </p>
        <p className="quiz-result__threshold">
          {score >= quiz.passThreshold ? t('quiz.passed') : t('quiz.retryHint')}
        </p>
        <div className="quiz-result__lb">
          <label className="quiz-result__label" htmlFor="quiz-pseudo">
            {t('leaderboard.pseudonymLabel')}
          </label>
          <input
            id="quiz-pseudo"
            className="quiz-result__input"
            maxLength={24}
            value={pseudonym}
            onChange={(e) => setPseudonym(e.target.value)}
            placeholder={t('leaderboard.pseudonymPlaceholder')}
          />
          <button type="button" className="btn btn--primary" onClick={submitLb} disabled={savedLb || pseudonym.trim().length < 2}>
            {savedLb ? t('leaderboard.saved') : t('leaderboard.save')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz-runner card-surface">
      <p className="quiz-runner__meta">{progressLabel}</p>
      <h2 className="quiz-runner__question">{pickLocalized(language, q.prompt)}</h2>
      <ul className="quiz-runner__choices">
        {q.choices.map((c, i) => {
          const wrong = revealed && picked === i && i !== q.correctIndex
          const right = revealed && i === q.correctIndex
          return (
            <li key={i}>
              <button
                type="button"
                className={['quiz-choice', wrong ? 'quiz-choice--wrong' : '', right ? 'quiz-choice--right' : '']
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => choose(i)}
                disabled={revealed}
              >
                {pickLocalized(language, c)}
              </button>
            </li>
          )
        })}
      </ul>
      <div className="quiz-runner__explain" role="region" aria-live="polite">
        {revealed ? <p>{pickLocalized(language, q.explanation)}</p> : null}
      </div>
    </div>
  )
}
