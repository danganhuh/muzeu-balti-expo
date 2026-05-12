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
        className={['exhibit-actions__btn', isFavorite ? 'exhibit-actions__btn--on' : ''].join(' ')}
        aria-pressed={isFavorite}
        onClick={onToggleFavorite}
      >
        {isFavorite ? t('exhibit.actions.favoriteOn') : t('exhibit.actions.favoriteOff')}
      </button>
      <button
        type="button"
        className={['exhibit-actions__btn', inAlbum ? 'exhibit-actions__btn--on' : ''].join(' ')}
        aria-pressed={inAlbum}
        onClick={onToggleAlbum}
      >
        {inAlbum ? t('exhibit.actions.albumRemove') : t('exhibit.actions.albumAdd')}
      </button>
      <button
        type="button"
        className={['exhibit-actions__btn', isStudied ? 'exhibit-actions__btn--on' : ''].join(' ')}
        aria-pressed={isStudied}
        onClick={onToggleStudied}
      >
        {isStudied ? t('exhibit.actions.studiedOn') : t('exhibit.actions.studiedOff')}
      </button>
    </div>
  )
}
