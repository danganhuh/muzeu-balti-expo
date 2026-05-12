import type { TimelineEvent } from '../types/interactive'
import {
  remoteExhibitHeroes,
  remoteTimelineIndependenceRally,
  remoteTimelineParliament,
  remoteTimelineRailMap,
  remoteTimelineSovietStamp,
  remoteTimelineStephen,
} from './remoteMedia'

/**
 * Years and political facts are aligned with mainstream histories of Bessarabia / Moldova.
 * First documentary mention of the Bălți fair: commonly cited as **1588** in Romanian municipal sources.
 */
export const timelineEvents: readonly TimelineEvent[] = [
  {
    id: 'evt-balti-fair-1588',
    year: 1588,
    era: 'early_modern',
    image: remoteExhibitHeroes.marketSquare,
    relatedExhibitIds: ['exhibit-market-square'],
    title: {
      ro: 'Atestarea târgului la Bălți',
      ru: 'Первое документальное упоминание ярмарки в Бельцах',
      en: 'First documentary mention of the Bălți fair',
    },
    summary: {
      ro: 'În surse scrise apare un târg pe locul așezării — începutul unei piețe stabile pentru regiune.',
      ru: 'В письменных источниках фиксируется ярмарка на месте поселения — задел постоянной торговой жизни.',
      en: 'Written sources record a fair at the settlement — the start of a stable marketplace for the region.',
    },
    detail: {
      ro: 'Cronologia urbană a Bălților folosește frecvent anul 1588 ca primă atestare documentară a târgului. Nu confundăm acest moment cu fondarea „orașului modern”: e un reper al comerțului și vieții publice locale, ancorat în epoca principatelor românești.',
      ru: 'Городская хронология Бельц часто отсчитывает от 1588 года как от первого документального упоминания ярмарки. Это не тождественно «основанию современного города»: это веха торговой и общественной жизни региона в эпоху княжеств.',
      en: 'Urban chronicles of Bălți often cite 1588 as the first documentary mention of the fair. This is not the same as the founding of the “modern city”: it marks trade and public life in the Romanian principalities era.',
    },
  },
  {
    id: 'evt-bessarabia-1812',
    year: 1812,
    era: 'early_modern',
    image: remoteTimelineRailMap,
    relatedExhibitIds: ['exhibit-prut-coins', 'exhibit-stamp-tax'],
    title: {
      ro: 'Basarabia în Imperiul Rus (1812)',
      ru: 'Бессарабия в составе Российской империи (1812)',
      en: 'Bessarabia under the Russian Empire (1812)',
    },
    summary: {
      ro: 'Tratatul de la București încheie un război ruso-turc; estul Principatului Moldovei este anexat Imperiului Rus.',
      ru: 'Бухарестский мир завершает русско-турецкую войну; восточная часть Молдавского княжества отходит России.',
      en: 'The Treaty of Bucharest ends a Russo-Turkish war; the eastern part of the Principality of Moldavia is annexed by the Russian Empire.',
    },
    detail: {
      ro: 'La 28 mai/9 iunie 1812, tratatul dintre Rusia și Imperiul Otoman consfințește trecerea teritoriului dintre Prut și Nistru (Basarabia) la Rusia. Acest cadru politic redefinește administrația, limba oficială în instituții și rețelele comerciale, inclusiv pentru orașele care vor deveni noduri urbane precum Bălți.',
      ru: '28 мая/9 июня 1812 года Бухарестский трактат между Россией и Османской империей закрепляет переход земель между Прутом и Днестром (Бессарабии) к России. Меняется административная система, язык делопроизводства и торговые связи, в том числе для городов вроде Бельц.',
      en: 'On 28 May / 9 June 1812, the treaty between Russia and the Ottoman Empire transfers the land between the Prut and the Dniester (Bessarabia) to Russia. Administration, official language use, and trade networks change—including for towns that would grow into hubs like Bălți.',
    },
  },
  {
    id: 'evt-union-1918',
    year: 1918,
    era: 'modern',
    image: remoteTimelineStephen,
    relatedExhibitIds: ['exhibit-street-facade', 'exhibit-letters-stage'],
    title: {
      ro: 'Unirea Basarabiei cu România',
      ru: 'Объединение Бессарабии с Румынией',
      en: 'Bessarabia votes to unite with Romania',
    },
    summary: {
      ro: 'Sfatul Țării hotărăște unirea cu Regatul României; Basarabia intră într-un stat național românesc până la 1940.',
      ru: 'Сфатул Цэрий принимает решение о соединении с Королевством Румыния; Бессарабия входит в румынское государство до 1940 года.',
      en: 'Sfatul Țării votes to join the Kingdom of Romania; Bessarabia is part of a Romanian national state until 1940.',
    },
    detail: {
      ro: 'La 27 martie/stil vechi (9 aprilie stil nou) 1918, deputații din Chișinău votează unirea. În practică, integrarea administrativă și culturală s-a făcut în timp; pentru Bălți, perioada interbelică înseamnă dezvoltare urbană și legături mai strânse cu rețeaua românească.',
      ru: '27 марта (9 апреля) 1918 года депутаты в Кишинёве голосуют за соединение. Для Бельц межвоенный период — это рост города и более тесные связи с румынской сетью.',
      en: 'On 27 March (Old Style) / 9 April (New Style) 1918, deputies in Chișinău vote for union. For Bălți, the interwar years mean urban growth and closer ties to the Romanian network.',
    },
  },
  {
    id: 'evt-soviet-1940',
    year: 1940,
    era: 'modern',
    image: remoteTimelineSovietStamp,
    relatedExhibitIds: ['exhibit-stamp-tax', 'exhibit-school-photo'],
    title: {
      ro: 'Ultimatumul sovietic și schimbarea statului (1940)',
      ru: 'Советский ультиматум и смена государственности (1940)',
      en: 'Soviet ultimatum and a change of state (1940)',
    },
    summary: {
      ro: 'În iunie 1940, URSS obligă România să evacueze Basarabia; începe perioada sovietică pentru regiune.',
      ru: 'В июне 1940 года СССР требует вывода румынских войск; для региона начинается советский период.',
      en: 'In June 1940, the USSR forces Romania to withdraw from Bessarabia; the Soviet period begins for the region.',
    },
    detail: {
      ro: 'După ultimatumul din 26–28 iunie 1940, trupele sovietice intră. Basarabia este reorganizată în cadrul URSS; ulterior, în RSS Moldovenească. Acest reper explică schimbări în școli, poștă, fiscalitate și arhitectură publică — teme vizibile în exponatele despre viața cotidiană și „epoca sovietică”.',
      ru: 'После ультиматума 26–28 июня 1940 года вводятся советские войска. Бессарабия включается в СССР, позже — в Молдавскую ССР. Это объясняет изменения в школе, почте, налогах и городской среде.',
      en: 'After the ultimatum of 26–28 June 1940, Soviet troops move in. Bessarabia is reorganized within the USSR, later the Moldavian SSR. This explains shifts in schools, mail, taxation, and public space visible in the exhibits.',
    },
  },
  {
    id: 'evt-moldova-independence-1991',
    year: 1991,
    era: 'contemporary',
    image: remoteTimelineIndependenceRally,
    relatedExhibitIds: ['exhibit-letters-stage'],
    title: {
      ro: 'Independența Republicii Moldova',
      ru: 'Независимость Республики Молдова',
      en: 'Independence of the Republic of Moldova',
    },
    summary: {
      ro: 'La 27 august 1991, Parlamentul adoptă Declarația de Independență față de URSS.',
      ru: '27 августа 1991 года парламент принимает Декларацию независимости от СССР.',
      en: 'On 27 August 1991, Parliament adopts the Declaration of Independence from the USSR.',
    },
    detail: {
      ro: 'Declarația consfințește numele oficial în limba română și limba rusă, și orientarea spre stat suveran. Pentru Bălți, a doua aglomerare urbană a țării, independența a însemnat continuarea vieții industriale și culturale, cu noi piețe și instituții locale.',
      ru: 'Декларация закрепляет официальные названия на румынском и русском и курс на суверенитет. Для Бельц — второго по величине города — это продолжение промышленной и культурной жизни в новых условиях.',
      en: 'The declaration affirms official Romanian and Russian names and a sovereign course. For Bălți, the country’s second city, independence meant continuing industrial and cultural life under new institutions.',
    },
  },
  {
    id: 'evt-constitution-1994',
    year: 1994,
    era: 'contemporary',
    image: remoteTimelineParliament,
    relatedExhibitIds: ['exhibit-stamp-tax'],
    title: {
      ro: 'Constituția Republicii Moldova',
      ru: 'Конституция Республики Молдова',
      en: 'Constitution of the Republic of Moldova',
    },
    summary: {
      ro: 'La 29 iulie 1994 intră în vigoare Constituția statului modern — cadru pentru instituții și drepturi.',
      ru: '29 июля 1994 года вступает в силу Конституция современного государства.',
      en: 'On 29 July 1994, the constitution of the modern state enters into force.',
    },
    detail: {
      ro: 'Adoptată prin referendum, Constituția din 1994 definește statul Republica Moldova, separația puterilor și drepturile fundamentale. Este punctul de referință juridic pentru viața politică post-sovietică, inclusiv pentru administrația locală a municipiilor precum Bălți.',
      ru: 'Принятая на референдуме Конституция 1994 года определяет Республику Молдова, разделение властей и права. Это базовый правовой ориентир для постсоветского периода, включая местное самоуправление в Бельцах.',
      en: 'Adopted by referendum, the 1994 constitution defines the Republic of Moldova, separation of powers, and fundamental rights. It is the legal backbone of post-Soviet politics, including local government in Bălți.',
    },
  },
]

/** Events used in the chronology mini-mission (subset of the rail, all distinct years). */
export const chronologyMissionEventIds: readonly string[] = timelineEvents.map((e) => e.id)
