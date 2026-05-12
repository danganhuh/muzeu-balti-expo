import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import type { Hall } from '../../types/museum'
import type { LanguageCode } from '../../types/settings'
import { pickLocalized } from '../../i18n/pickLocalized'
import { publicUrl } from '../../utils/publicUrl'

export function HallCard({ hall }: { hall: Hall }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as LanguageCode

  return (
    <Link className="exhibition-card hall-card" to={`/halls/${hall.slug}`}>
      <img src={publicUrl(hall.coverImage)} alt="" width={360} height={192} loading="lazy" />
      <div className="exhibition-card__content">
        <span className="exhibition-card__status">{t('halls.card.badge')}</span>
        <h2 className="exhibition-card__title">{pickLocalized(lang, hall.title)}</h2>
        <p className="exhibition-card__desc hall-card__hint">{t('halls.card.hint')}</p>
        <span className="exhibition-card__more">{t('halls.card.enter')}</span>
      </div>
    </Link>
  )
}
