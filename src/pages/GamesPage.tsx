import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { LanguageCode } from '../types/settings'
import { MatchPairsGame } from '../components/games/MatchPairsGame'
import { HiddenRelicGame } from '../components/games/HiddenRelicGame'

export function GamesPage() {
  const { i18n, t } = useTranslation()
  const language = i18n.language as LanguageCode
  const [tab, setTab] = useState<'match' | 'relic'>('match')

  return (
    <section className="section--cream games-page">
      <div className="container games-page__inner">
        <header className="games-page__header">
          <p className="halls-page__eyebrow">{t('games.eyebrow')}</p>
          <h1 className="halls-page__title">{t('games.title')}</h1>
          <p className="halls-page__intro">{t('games.intro')}</p>
        </header>
        <div className="games-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'match'}
            className={['games-tabs__btn', tab === 'match' ? 'games-tabs__btn--active' : ''].filter(Boolean).join(' ')}
            onClick={() => setTab('match')}
          >
            {t('games.tabMatch')}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'relic'}
            className={['games-tabs__btn', tab === 'relic' ? 'games-tabs__btn--active' : ''].filter(Boolean).join(' ')}
            onClick={() => setTab('relic')}
          >
            {t('games.tabRelic')}
          </button>
        </div>
        {tab === 'match' ? <MatchPairsGame language={language} /> : <HiddenRelicGame />}
      </div>
    </section>
  )
}
