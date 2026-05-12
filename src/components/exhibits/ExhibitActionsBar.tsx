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

function IconHeart({ filled }: { filled: boolean }) {
  return (
    <svg className="exhibit-actions__svg" viewBox="0 0 24 24" width="22" height="22" aria-hidden>
      <path
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
        d="M12 20s-7-4.35-7-9.5A4.5 4.5 0 0 1 12 5.5a4.5 4.5 0 0 1 7 5c0 5.15-7 9.5-7 9.5Z"
      />
    </svg>
  )
}

function IconBookmark({ filled }: { filled: boolean }) {
  return (
    <svg className="exhibit-actions__svg" viewBox="0 0 24 24" width="22" height="22" aria-hidden>
      <path
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
        d="M7 4h10a1 1 0 0 1 1 1v15l-6-4-6 4V5a1 1 0 0 1 1-1Z"
      />
    </svg>
  )
}

function IconLearned({ on }: { on: boolean }) {
  return (
    <svg className="exhibit-actions__svg" viewBox="0 0 24 24" width="22" height="22" aria-hidden>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.75" />
      {on ? <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M8 12.5l2.5 2.5L16 9.5" /> : null}
    </svg>
  )
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
        className={['exhibit-actions__btn', 'exhibit-actions__btn--iconic', isFavorite ? 'exhibit-actions__btn--on' : '']
          .filter(Boolean)
          .join(' ')}
        aria-pressed={isFavorite}
        title={t('exhibit.actions.tooltipFavorite')}
        aria-label={isFavorite ? t('exhibit.actions.favoriteOn') : t('exhibit.actions.favoriteOff')}
        onClick={onToggleFavorite}
      >
        <IconHeart filled={isFavorite} />
      </button>
      <button
        type="button"
        className={['exhibit-actions__btn', 'exhibit-actions__btn--iconic', inAlbum ? 'exhibit-actions__btn--on' : '']
          .filter(Boolean)
          .join(' ')}
        aria-pressed={inAlbum}
        title={t('exhibit.actions.tooltipAlbum')}
        aria-label={inAlbum ? t('exhibit.actions.albumRemove') : t('exhibit.actions.albumAdd')}
        onClick={onToggleAlbum}
      >
        <IconBookmark filled={inAlbum} />
      </button>
      <button
        type="button"
        className={['exhibit-actions__btn', 'exhibit-actions__btn--iconic', isStudied ? 'exhibit-actions__btn--on' : '']
          .filter(Boolean)
          .join(' ')}
        aria-pressed={isStudied}
        title={t('exhibit.actions.tooltipStudied')}
        aria-label={isStudied ? t('exhibit.actions.studiedOn') : t('exhibit.actions.studiedOff')}
        onClick={onToggleStudied}
      >
        <IconLearned on={isStudied} />
      </button>
    </div>
  )
}
