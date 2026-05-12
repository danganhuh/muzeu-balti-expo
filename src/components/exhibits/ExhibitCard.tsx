import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import type { Exhibit } from '../../types/museum'
import type { LanguageCode } from '../../types/settings'
import { pickLocalized } from '../../i18n/pickLocalized'
import { publicUrl } from '../../utils/publicUrl'
import { ExhibitActionsBar } from './ExhibitActionsBar'

type Props = {
  exhibit: Exhibit
  hallSlug: string
  isFavorite: boolean
  inAlbum: boolean
  isStudied: boolean
  onToggleFavorite: () => void
  onToggleAlbum: () => void
  onToggleStudied: () => void
}

export function ExhibitCard({
  exhibit,
  hallSlug,
  isFavorite,
  inAlbum,
  isStudied,
  onToggleFavorite,
  onToggleAlbum,
  onToggleStudied,
}: Props) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as LanguageCode
  const to = `/halls/${hallSlug}/exhibit/${exhibit.id}`

  return (
    <div className="exhibit-card-stack">
      <div className="exhibition-card exhibition-card--compound">
        <Link className="exhibition-card__main" to={to}>
          <img
            src={publicUrl(exhibit.heroImage)}
            alt=""
            width={360}
            height={192}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
          <div className="exhibition-card__content">
            <span className="exhibition-card__status">{t(`exhibit.era.${exhibit.era}`, { lng: lang })}</span>
            <h2 className="exhibition-card__title">{pickLocalized(lang, exhibit.title)}</h2>
            <p className="exhibition-card__desc">{pickLocalized(lang, exhibit.shortDescription)}</p>
            <span className="exhibition-card__more">{t('exhibit.card.more')}</span>
          </div>
        </Link>
        <ExhibitActionsBar
          variant="inCard"
          isFavorite={isFavorite}
          inAlbum={inAlbum}
          isStudied={isStudied}
          onToggleFavorite={onToggleFavorite}
          onToggleAlbum={onToggleAlbum}
          onToggleStudied={onToggleStudied}
        />
      </div>
    </div>
  )
}
