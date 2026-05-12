import type { BadgeDefinition } from '../types/interactive'

export const badgeCatalog: readonly BadgeDefinition[] = [
  {
    id: 'badge:time-rail',
    icon: '🛤️',
    title: {
      ro: 'Maestru al șinelului temporal',
      ru: 'Мастер временной ленты',
      en: 'Timeline rail master',
    },
    description: {
      ro: 'Ai deschis toate fișele evenimentelor din cronologia expoziției.',
      ru: 'Вы открыли все карточки событий на временной шкале.',
      en: 'You opened every timeline event card in the exhibit chronology.',
    },
  },
  {
    id: 'badge:chronologist',
    icon: '🧭',
    title: {
      ro: 'Cronolog',
      ru: 'Хронолог',
      en: 'Chronologist',
    },
    description: {
      ro: 'Ai ordonat corect misiunea „Anii în șir”.',
      ru: 'Вы правильно упорядочили миссию «Годы по порядку».',
      en: 'You correctly completed the “Years in order” mission.',
    },
  },
  {
    id: 'badge:urban-quiz',
    icon: '🏛️',
    title: {
      ro: 'Explorator urban',
      ru: 'Городской исследователь',
      en: 'Urban explorer',
    },
    description: {
      ro: 'Ai obținut cel puțin 3/5 la quiz-ul despre Bălți.',
      ru: 'Вы набрали минимум 3/5 в викторине о Бельцах.',
      en: 'You scored at least 3/5 on the Bălți urban quiz.',
    },
  },
  {
    id: 'badge:region-quiz',
    icon: '🌍',
    title: {
      ro: 'Cartograf al regiunii',
      ru: 'Картограф региона',
      en: 'Regional cartographer',
    },
    description: {
      ro: 'Ai obținut cel puțin 3/5 la quiz-ul regional.',
      ru: 'Вы набрали минимум 3/5 в региональной викторине.',
      en: 'You scored at least 3/5 on the regional quiz.',
    },
  },
  {
    id: 'badge:match-master',
    icon: '🎴',
    title: {
      ro: 'Memorie de muzeu',
      ru: 'Музейная память',
      en: 'Museum memory',
    },
    description: {
      ro: 'Ai potrivit toate perechile din jocul de memorie (Bălți & regiune).',
      ru: 'Вы собрали все пары в игре на память.',
      en: 'You matched every pair in the Bălți-themed memory game.',
    },
  },
  {
    id: 'badge:relic-hunter',
    icon: '🔎',
    title: {
      ro: 'Vânător de comori ascunse',
      ru: 'Охотник за сокровищами',
      en: 'Hidden relic hunter',
    },
    description: {
      ro: 'Ai descoperit toate punctele „comoară” pe harta pieței.',
      ru: 'Вы нашли все «сокровища» на карте площади.',
      en: 'You found every hidden relic hotspot on the square map.',
    },
  },
]

export function getBadgeById(id: string): BadgeDefinition | undefined {
  return badgeCatalog.find((b) => b.id === id)
}
