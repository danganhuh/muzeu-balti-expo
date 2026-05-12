import type { Hall } from '../types/museum'

export const halls: readonly Hall[] = [
  {
    id: 'hall-old-balti',
    slug: 'old-balti',
    order: 1,
    title: {
      ro: 'Bălțiul vechi: străzi și piețe',
      ru: 'Старый Бельцы: улицы и рынки',
      en: 'Old Bălți: streets and markets',
    },
    coverImage: 'images/placeholders/hall.svg',
  },
  {
    id: 'hall-crafts',
    slug: 'crafts-workshops',
    order: 2,
    title: {
      ro: 'Meșteșuguri și ateliere',
      ru: 'Ремёсла и мастерские',
      en: 'Crafts and workshops',
    },
    coverImage: 'images/placeholders/hall.svg',
  },
  {
    id: 'hall-coins',
    slug: 'coins-trade',
    order: 3,
    title: {
      ro: 'Monede și comerț pe Prut',
      ru: 'Монеты и торговля на Пруте',
      en: 'Coins and trade on the Prut',
    },
    coverImage: 'images/placeholders/hall.svg',
  },
  {
    id: 'hall-faces',
    slug: 'faces-of-the-city',
    order: 4,
    title: {
      ro: 'Chipurile orașului',
      ru: 'Лица города',
      en: 'Faces of the city',
    },
    coverImage: 'images/placeholders/hall.svg',
  },
]
