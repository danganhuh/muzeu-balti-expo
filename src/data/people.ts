import type { HistoricalPerson } from '../types/museum'

export const historicalPeople: readonly HistoricalPerson[] = [
  {
    id: 'person-alecsandri',
    slug: 'vasile-alecsandri',
    name: {
      ro: 'Vasile Alecsandri',
      ru: 'Василе Александри',
      en: 'Vasile Alecsandri',
    },
    role: {
      ro: 'Poet și dramaturg; legături cu spațiul basarabean',
      ru: 'Поэт и драматург; связи с Бессарабским краем',
      en: 'Poet and playwright; ties to Bessarabian culture',
    },
    birthYear: 1821,
    deathYear: 1890,
    bioShort: {
      ro: 'Figură centrală a literaturii române din secolul XIX, cu răsunet în teatrul și folclorul studiat în regiune.',
      ru: 'Центральная фигура румынской литературы XIX века; влияние на театр и фольклор региона.',
      en: 'A central figure of 19th-century Romanian literature with influence on theatre and regional folklore.',
    },
    portraitImage: '/images/placeholders/portrait.svg',
    exhibitIds: ['exhibit-letters-stage'],
  },
  {
    id: 'person-architect-anon',
    slug: 'eclectic-balti',
    name: {
      ro: 'Arhitectura eclectică locală',
      ru: 'Местная эклектичная архитектура',
      en: 'Local eclectic architecture',
    },
    role: {
      ro: 'Colectiv de meșteri și arhitecți (anonimizat în expoziție)',
      ru: 'Коллектив мастеров и архитекторов (обобщённо)',
      en: 'Collective of builders and architects (generalized)',
    },
    birthYear: 1880,
    deathYear: 1940,
    bioShort: {
      ro: 'Fațade cu ornamente din ceramică, aticuri și frontoane care definesc peisajul urban al Bălților de la începutul secolului XX.',
      ru: 'Фасады с керамическими деталями, аттики и фронтоны, формирующие городской облик начала XX века.',
      en: 'Facades with ceramic ornament, attics, and pediments that shaped early 20th-century urban Bălți.',
    },
    portraitImage: '/images/placeholders/portrait.svg',
    exhibitIds: ['exhibit-street-facade', 'exhibit-market-square'],
  },
  {
    id: 'person-numismatist',
    slug: 'prut-trade',
    name: {
      ro: 'Negustori și monetării',
      ru: 'Купцы и монетчики',
      en: 'Merchants and moneyers',
    },
    role: {
      ro: 'Rețea comercială pe coridorul Prut–Nistru',
      ru: 'Торговая сеть в коридоре Прут–Днестр',
      en: 'Trade network along the Prut–Dniester corridor',
    },
    bioShort: {
      ro: 'Monedele și ponderile din expoziție ilustrează încrederea reciprocă dintre comunități și autoritățile locale.',
      ru: 'Монеты и гири в экспозиции показывают взаимное доверие между общинами и властью.',
      en: 'Coins and weights in the show illustrate trust between communities and local authorities.',
    },
    portraitImage: '/images/placeholders/portrait.svg',
    exhibitIds: ['exhibit-prut-coins', 'exhibit-market-square'],
  },
]
