/**
 * Remote images: Wikimedia Commons only (stable upload.wikimedia.org URLs).
 * Check each file page on Commons for author and license before reusing commercially.
 */

/** Hall “Vechiul Bălți” — panorama over Bălți (southwest). File: Bălți-vedere dinspre sud-vest.jpg */
const hallOldBaltiCover =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/B%C4%83l%C8%9Bi-vedere_dinspre_sud-vest.jpg/960px-B%C4%83l%C8%9Bi-vedere_dinspre_sud-vest.jpg'

/** Meșteșuguri — Romanian woven wall carpet (Oltenia). File: Covor oltenesc.jpg */
const hallCraftsCover =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Covor_oltenesc.jpg/960px-Covor_oltenesc.jpg'

/** Monede — medieval English noble (example metal coin). File: Edward III noble.jpg */
const hallCoinsCover =
  'https://upload.wikimedia.org/wikipedia/commons/b/b5/Edward_III_noble.jpg'

/** Portrete — Ștefan cel Mare street, Bălți. File: Str. Ștefan cel Mare din Bălți.JPG */
const hallFacesCover =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Str._%C8%98tefan_cel_Mare_din_B%C4%83l%C8%9Bi.JPG/960px-Str._%C8%98tefan_cel_Mare_din_B%C4%83l%C8%9Bi.JPG'

export const remoteHallCovers = {
  oldBalti: hallOldBaltiCover,
  crafts: hallCraftsCover,
  coins: hallCoinsCover,
  faces: hallFacesCover,
} as const

/** Vasile Alecsandri — Wikimedia Commons (public domain). */
export const wikimediaAlecsandriPortrait =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Vasile_Alecsandri_-_Foto_02.jpg/440px-Vasile_Alecsandri_-_Foto_02.jpg'

/** Piața centrală — Independence Square, Bălți. File: Piața Independenței din Bălți 3.JPG */
const exhibitMarketSquare =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Pia%C8%9Ba_Independen%C8%9Bei_din_B%C4%83l%C8%9Bi_3.JPG/960px-Pia%C8%9Ba_Independen%C8%9Bei_din_B%C4%83l%C8%9Bi_3.JPG'

/** Fațadă — Banca Românească, Bălți. File: Banca romaneasca, Balti.jpg */
const exhibitStreetFacade =
  'https://upload.wikimedia.org/wikipedia/commons/d/d0/Banca_romaneasca%2C_Balti.jpg'

/** Curte — view from cathedral yard, Bălți. File: Colopotnița (Catd. Sf. Nicolae, BL).jpg */
const exhibitCourtyardWell =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Colopotni%C8%9Ba_%28Catd._Sf._Nicolae%2C_BL%29.jpg/960px-Colopotni%C8%9Ba_%28Catd._Sf._Nicolae%2C_BL%29.jpg'

/** Război de țesut — haute-lisse loom. File: Loom haute lisse DSC08774.jpg */
const exhibitWeaverLoom =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Loom_haute_lisse_DSC08774.jpg/960px-Loom_haute_lisse_DSC08774.jpg'

/** Olarie — ancient Greek potter’s kiln (museum). File: Pottery kiln archmus Eretria 19558.jpg */
const exhibitPotteryKiln =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Pottery_kiln_archmus_Eretria_19558.jpg/960px-Pottery_kiln_archmus_Eretria_19558.jpg'

/** Monedă — Edward III noble. File: Edward III noble.jpg */
const exhibitPrutCoins =
  'https://upload.wikimedia.org/wikipedia/commons/b/b5/Edward_III_noble.jpg'

/** Timbru / fiscal — USSR revenue stamps sheet. File: Stamp. USSR. Revenue stamps of the Soviet Union. img 02.jpg */
const exhibitStampTax =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Stamp._USSR._Revenue_stamps_of_the_Soviet_Union._img_02.jpg/960px-Stamp._USSR._Revenue_stamps_of_the_Soviet_Union._img_02.jpg'

/** Teatru — empty auditorium / stage view. File: Paramount Theatre Seating View (empty).jpg */
const exhibitLettersStage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Paramount_Theatre_Seating_View_%28empty%29.jpg/960px-Paramount_Theatre_Seating_View_%28empty%29.jpg'

/** Școală veche — open-air museum schoolroom. File: Hohenloher Freilandmuseum - Schulhaus aus Satteldorf - Studenti vintage (13604852043).jpg */
const exhibitSchoolPhoto =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Hohenloher_Freilandmuseum_-_Schulhaus_aus_Satteldorf_-_Studenti_vintage_%2813604852043%29.jpg/960px-Hohenloher_Freilandmuseum_-_Schulhaus_aus_Satteldorf_-_Studenti_vintage_%2813604852043%29.jpg'

export const remoteExhibitHeroes = {
  marketSquare: exhibitMarketSquare,
  streetFacade: exhibitStreetFacade,
  courtyardWell: exhibitCourtyardWell,
  weaverLoom: exhibitWeaverLoom,
  potteryKiln: exhibitPotteryKiln,
  prutCoins: exhibitPrutCoins,
  stampTax: exhibitStampTax,
  lettersStage: exhibitLettersStage,
  schoolPhoto: exhibitSchoolPhoto,
} as const

/** Chișinău central market (regional trade). File: Chisinau Piata Centrala.JPG */
const portraitMerchantTrade =
  'https://upload.wikimedia.org/wikipedia/commons/5/5e/Chisinau_Piata_Centrala.JPG'

export const remotePortrait = {
  /** Local façade — Banca Românească, Bălți (same hero as street-facade exhibit). */
  architectPlans: exhibitStreetFacade,
  merchantCoins: portraitMerchantTrade,
} as const
