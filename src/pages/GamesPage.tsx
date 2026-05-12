import { useTranslation } from 'react-i18next'
import type { LanguageCode } from '../types/settings'
import { MatchPairsGame } from '../components/games/MatchPairsGame'

export function GamesPage() {
  const { i18n, t } = useTranslation()
  const language = i18n.language as LanguageCode

  return (
    <section className="section--cream games-page">
      <div className="container games-page__inner">
        <header className="games-page__header">
          <p className="halls-page__eyebrow">{t('games.eyebrow')}</p>
          <h1 className="halls-page__title">{t('games.title')}</h1>
          <p className="halls-page__intro">{t('games.intro')}</p>
        </header>
        <MatchPairsGame language={language} />
      </div>
    </section>
  )
}
