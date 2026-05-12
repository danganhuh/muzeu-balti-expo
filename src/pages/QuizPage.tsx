import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { LanguageCode } from '../types/settings'
import { quizSets } from '../data/quizzes'
import { QuizRunner } from '../components/quiz/QuizRunner'

export function QuizPage() {
  const { i18n, t } = useTranslation()
  const language = i18n.language as LanguageCode
  const [active, setActive] = useState(0)
  const quiz = quizSets[active]

  const tabs = useMemo(
    () =>
      quizSets.map((q, i) => ({
        id: q.id,
        label: q.title[language] ?? q.title.ro,
        index: i,
      })),
    [language],
  )

  return (
    <section className="section--cream quiz-page">
      <div className="container quiz-page__inner">
        <header className="quiz-page__header">
          <p className="halls-page__eyebrow">{t('quiz.eyebrow')}</p>
          <h1 className="halls-page__title">{t('quiz.title')}</h1>
          <p className="halls-page__intro">{t('quiz.intro')}</p>
        </header>
        <div className="quiz-tabs" role="tablist" aria-label={t('quiz.tablistLabel')}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === tab.index}
              className={['quiz-tabs__btn', active === tab.index ? 'quiz-tabs__btn--active' : ''].filter(Boolean).join(' ')}
              onClick={() => setActive(tab.index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <QuizRunner key={quiz.id} quiz={quiz} language={language} />
      </div>
    </section>
  )
}
