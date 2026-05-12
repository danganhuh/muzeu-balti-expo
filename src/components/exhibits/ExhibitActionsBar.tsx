import { useTranslation } from 'react-i18next'

type Props = {
  variant?: 'compact' | 'full'
  isFavorite: boolean
  inAlbum: boolean
  isStudied: boolean
  onToggleFavorite: () => void
  onToggleAlbum: () => void
  onToggleStudied: () => void
}

export function ExhibitActionsBar({
  variant = 'full',
  isFavorite,
  inAlbum,
  isStudied,
  onToggleFavorite,
  onToggleAlbum,
  onToggleStudied,
}: Props) {
  const { t } = useTranslation()
  const cls = variant === 'compact' ? 'exhibit-actions exhibit-actions--compact' : 'exhibit-actions'

  return (
    <div className={cls} role="group" aria-label={t('exhibit.actions.groupLabel')}>
      <button
        type="button"
        className={[
          'exhibit-actions__btn',
          'exhibit-actions__btn--like',
          isFavorite ? 'exhibit-actions__btn--on' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-pressed={isFavorite}
        title={t('exhibit.actions.tooltipFavorite')}
        onClick={onToggleFavorite}
      >
        <span className="exhibit-actions__label">
          {isFavorite ? t('exhibit.actions.favoriteOn') : t('exhibit.actions.favoriteOff')}
        </span>
      </button>
      <button
        type="button"
        className={[
          'exhibit-actions__btn',
          'exhibit-actions__btn--album',
          inAlbum ? 'exhibit-actions__btn--on' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-pressed={inAlbum}
        title={t('exhibit.actions.tooltipAlbum')}
        onClick={onToggleAlbum}
      >
        <span className="exhibit-actions__label">
          {inAlbum ? t('exhibit.actions.albumRemove') : t('exhibit.actions.albumAdd')}
        </span>
      </button>
      <button
        type="button"
        className={[
          'exhibit-actions__btn',
          'exhibit-actions__btn--studied',
          isStudied ? 'exhibit-actions__btn--on' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-pressed={isStudied}
        title={t('exhibit.actions.tooltipStudied')}
        onClick={onToggleStudied}
      >
        <span className="exhibit-actions__label">
          {isStudied ? t('exhibit.actions.studiedOn') : t('exhibit.actions.studiedOff')}
        </span>
      </button>
    </div>
  )
}
