import type { QuizSet } from '../types/interactive'

export const quizSets: readonly QuizSet[] = [
  {
    id: 'quiz-balti-urban',
    passThreshold: 3,
    title: {
      ro: 'Bălți urban: piețe și străzi',
      ru: 'Бельцы: рынки и улицы',
      en: 'Bălți urban: markets and streets',
    },
    questions: [
      {
        id: 'q-b-1',
        prompt: {
          ro: 'Ce reper documentar timpuriu este frecvent citat pentru târgul de la Bălți?',
          ru: 'Какой ранний документальный ориентир часто приводят для ярмарки в Бельцах?',
          en: 'Which early documentary milestone is often cited for the Bălți fair?',
        },
        choices: [
          { ro: '1588', ru: '1588', en: '1588' },
          { ro: '1711', ru: '1711', en: '1711' },
          { ro: '1812', ru: '1812', en: '1812' },
          { ro: '1918', ru: '1918', en: '1918' },
        ],
        correctIndex: 0,
        explanation: {
          ro: 'În materialele municipale și în cronologii locale apare des anul 1588 ca primă atestare documentară a târgului — un reper al comerțului, nu neapărat al statutului juridic modern de oraș.',
          ru: 'В местных хронологиях часто указывают 1588 год как первое документальное упоминание ярмарки — веха торговли, а не обязательно «современного» городского статуса.',
          en: 'Local chronicles often cite 1588 as the first documentary mention of the fair—a trade milestone, not necessarily the same as modern city charters.',
        },
      },
      {
        id: 'q-b-2',
        prompt: {
          ro: 'Care râu străbate Bălțiul și este legat de hidrografia nordului Moldovei?',
          ru: 'Какая река протекает через Бельцы и важна для севера Молдовы?',
          en: 'Which river runs through Bălți and shapes northern Moldova’s hydrography?',
        },
        choices: [
          { ro: 'Nistrul', ru: 'Днестр', en: 'The Dniester' },
          { ro: 'Răut', ru: 'Реут', en: 'The Răut' },
          { ro: 'Prutul', ru: 'Прут', en: 'The Prut' },
          { ro: 'Dunărea', ru: 'Дунай', en: 'The Danube' },
        ],
        correctIndex: 1,
        explanation: {
          ro: 'Râul Răut traversează municipiul Bălți; Prutul și Nistrul sunt granițe naturale la vest și est ale Republicii Moldova, dar nu cursul principal al orașului.',
          ru: 'Река Реут протекает через Бельцы; Прут и Днестр — западная и восточная границы Молдовы, но не главная река города.',
          en: 'The Răut flows through Bălți; the Prut and Dniester are Moldova’s broader west/east border rivers, not the main stream of the city.',
        },
      },
      {
        id: 'q-b-3',
        prompt: {
          ro: 'Ce eveniment din 1812 a retras Basarabia în administrația imperiului țarist?',
          ru: 'Какое событие 1812 года включило Бессарабию в состав Российской империи?',
          en: 'Which 1812 outcome placed Bessarabia under tsarist administration?',
        },
        choices: [
          {
            ro: 'Tratatul de la București (Rusia–Imperiul Otoman)',
            ru: 'Бухарестский мир (Россия — Османская империя)',
            en: 'Treaty of Bucharest (Russia–Ottoman Empire)',
          },
          { ro: 'Pacea de la Paris (1814)', ru: 'Парижский мир (1814)', en: 'Peace of Paris (1814)' },
          { ro: 'Congresul de la Viena (1815)', ru: 'Венский конгресс (1815)', en: 'Congress of Vienna (1815)' },
          { ro: 'Unirea din 1859', ru: 'Объединение 1859', en: 'Union of 1859' },
        ],
        correctIndex: 0,
        explanation: {
          ro: 'Tratatul de la București din 1812 încheie faza respectivă a războiului ruso-turc și consfințește anexarea estului Moldovei dintre Prut și Nistru la Rusia.',
          ru: 'Бухарестский трактат 1812 года завершает этап русско-турецкой войны и закрепляет переход восточной части Молдавии между Прутом и Днестром к России.',
          en: 'The 1812 Treaty of Bucharest ends that phase of the Russo-Turkish War and confirms Russia’s annexation of Moldavia’s east between the Prut and Dniester.',
        },
      },
      {
        id: 'q-b-4',
        prompt: {
          ro: 'Unde se află Piața Independenței din Bălți din punct de vedere urbanistic?',
          ru: 'Каково положение площади Независимости в Бельцах?',
          en: 'Where is Independence Square located in Bălți’s urban layout?',
        },
        choices: [
          { ro: 'În centrul istoric al orașului', ru: 'В историческом центре', en: 'In the historic city centre' },
          { ro: 'La periferia de est', ru: 'На восточной окраине', en: 'On the eastern outskirts' },
          { ro: 'În afara orașului', ru: 'За городом', en: 'Outside the city' },
          { ro: 'Numai pe hărți vechi', ru: 'Только на старых картах', en: 'Only on old maps' },
        ],
        correctIndex: 0,
        explanation: {
          ro: 'Piața Independenței este nodul central al Bălților — loc de întâlnire, comerț și clădiri emblematice, reflectat și în fotografiile din exponatele despre piață.',
          ru: 'Площадь Независимости — центральный узел Бельц: торговля, встречи и знаковые здания, что видно на фото экспозиции.',
          en: 'Independence Square is Bălți’s central hub—markets, meetings, and landmark buildings, as shown in the square exhibit imagery.',
        },
      },
      {
        id: 'q-b-5',
        prompt: {
          ro: 'Catedrala Sf. Nicolae din Bălți aparține tradiției religioase majoritare din Moldova:',
          ru: 'Собор Св. Николая в Бельцах относится к преобладающей религиозной традиции Молдовы:',
          en: 'St. Nicholas Cathedral in Bălți belongs to Moldova’s majority Christian tradition:',
        },
        choices: [
          { ro: 'Ortodoxă', ru: 'Православие', en: 'Eastern Orthodox' },
          { ro: 'Catolicism latin', ru: 'Латинский католицизм', en: 'Latin Catholic' },
          { ro: 'Luterană', ru: 'Лютеранство', en: 'Lutheran' },
          { ro: 'Anglicană', ru: 'Англиканство', en: 'Anglican' },
        ],
        correctIndex: 0,
        explanation: {
          ro: 'În Republica Moldova majoritatea creștinilor aparține Bisericii Ortodoxe; catedrala din Bălți este un reper al acestui patrimoniu bisericesc local.',
          ru: 'В Молдове большинство христиан — православные; собор в Бельцах — часть этого местного наследия.',
          en: 'In Moldova the majority Christian community is Eastern Orthodox; Bălți’s cathedral is part of that local ecclesiastical heritage.',
        },
      },
    ],
  },
  {
    id: 'quiz-region',
    passThreshold: 3,
    title: {
      ro: 'Regiunea Prut–Nistru',
      ru: 'Регион между Прутом и Днестром',
      en: 'The Prut–Dniester region',
    },
    questions: [
      {
        id: 'q-r-1',
        prompt: {
          ro: 'Care este capitala Republicii Moldova?',
          ru: 'Какова столица Республики Молдова?',
          en: 'What is the capital of the Republic of Moldova?',
        },
        choices: [
          { ro: 'Chișinău', ru: 'Кишинёв', en: 'Chișinău' },
          { ro: 'Bălți', ru: 'Бельцы', en: 'Bălți' },
          { ro: 'Tiraspol', ru: 'Тирасполь', en: 'Tiraspol' },
          { ro: 'Iași', ru: 'Яссы', en: 'Iași' },
        ],
        correctIndex: 0,
        explanation: {
          ro: 'Chișinău este capitala politică și administrativă a Republicii Moldova; Bălți este al doilea centru urban ca mărime.',
          ru: 'Кишинёв — политическая и административная столица; Бельцы — второй по величине город.',
          en: 'Chișinău is Moldova’s political and administrative capital; Bălți is the country’s second-largest urban centre.',
        },
      },
      {
        id: 'q-r-2',
        prompt: {
          ro: 'Limba română face parte din familia:',
          ru: 'Румынский язык относится к семье:',
          en: 'Romanian belongs to which language family branch?',
        },
        choices: [
          { ro: 'Limbi romanice', ru: 'Романские языки', en: 'Romance languages' },
          { ro: 'Limbi slave', ru: 'Славянские языки', en: 'Slavic languages' },
          { ro: 'Limbi germanice', ru: 'Германские языки', en: 'Germanic languages' },
          { ro: 'Limbi semitice', ru: 'Семитские языки', en: 'Semitic languages' },
        ],
        correctIndex: 0,
        explanation: {
          ro: 'Româna evoluat din latina populară, ca și franceza, italiana sau spaniola — ramura romanică a limbilor indo-europene.',
          ru: 'Румынский язык развился из народной латыни, как и французский или итальянский.',
          en: 'Romanian evolved from Vulgar Latin, like French, Italian, and Spanish—the Romance branch of Indo-European languages.',
        },
      },
      {
        id: 'q-r-3',
        prompt: {
          ro: 'Moneda oficială a Republicii Moldova (cod ISO) este:',
          ru: 'Официальная валюта Молдовы (код ISO):',
          en: 'The Republic of Moldova’s official currency (ISO code) is:',
        },
        choices: [
          { ro: 'MDL (leul moldovenesc)', ru: 'MDL (молдавский лей)', en: 'MDL (Moldovan leu)' },
          { ro: 'RON (leul românesc)', ru: 'RON (румынский лей)', en: 'RON (Romanian leu)' },
          { ro: 'UAH (hrivna)', ru: 'UAH (гривна)', en: 'UAH (hryvnia)' },
          { ro: 'EUR (euro)', ru: 'EUR (евро)', en: 'EUR (euro)' },
        ],
        correctIndex: 0,
        explanation: {
          ro: 'Leul moldovenesc (MDL) este moneda emisă de Banca Națională a Moldovei pentru circulația internă.',
          ru: 'Молдавский лей (MDL) выпускается Национальным банком Молдовы.',
          en: 'The Moldovan leu (MDL) is issued by the National Bank of Moldova for domestic circulation.',
        },
      },
      {
        id: 'q-r-4',
        prompt: {
          ro: 'Republica Moldova este fără ieșire la mare; marea aflată cel mai aproape de sud-vestul țării (prin vecini) este:',
          ru: 'У Молдовы нет выхода к морю; ближайшее к юго-западу море (через соседей):',
          en: 'Moldova is landlocked; the sea closest to the country’s south-west (via neighbours) is:',
        },
        choices: [
          { ro: 'Marea Neagră', ru: 'Чёрное море', en: 'The Black Sea' },
          { ro: 'Marea Baltică', ru: 'Балтийское море', en: 'The Baltic Sea' },
          { ro: 'Marea Caspică', ru: 'Каспийское море', en: 'The Caspian Sea' },
          { ro: 'Marea Mediterană', ru: 'Средиземное море', en: 'The Mediterranean Sea' },
        ],
        correctIndex: 0,
        explanation: {
          ro: 'Moldova nu are litoral; spre sud-vest, prin România și Ucraina, cel mai apropiat bazin marin major este Marea Neagră.',
          ru: 'У Молдовы нет береговой линии; к юго-западу через соседей ближе всего бассейн Чёрного моря.',
          en: 'Moldova has no coastline; toward the south-west, the nearest major marine basin is the Black Sea through neighbouring states.',
        },
      },
      {
        id: 'q-r-5',
        prompt: {
          ro: 'Basarabia a făcut parte din Regatul României în principal între:',
          ru: 'Бессарабия входила в Королевство Румыния в основном между:',
          en: 'Bessarabia was part of the Kingdom of Romania mainly between:',
        },
        choices: [
          { ro: '1918 și 1940', ru: '1918 и 1940', en: '1918 and 1940' },
          { ro: '1812 și 1918', ru: '1812 и 1918', en: '1812 and 1918' },
          { ro: '1945 și 1991', ru: '1945 и 1991', en: '1945 and 1991' },
          { ro: '1588 și 1812', ru: '1588 и 1812', en: '1588 and 1812' },
        ],
        correctIndex: 0,
        explanation: {
          ro: 'După votul Sfatului Țării din 1918, Basarabia a fost integrată României până la cedarea teritoriului în urma ultimatumului din 1940.',
          ru: 'После 1918 года Бессарабия была в составе Румынии до событий 1940 года.',
          en: 'After the 1918 vote, Bessarabia was integrated into Romania until the events of 1940.',
        },
      },
    ],
  },
]

export function getQuizById(id: string): QuizSet | undefined {
  return quizSets.find((q) => q.id === id)
}
