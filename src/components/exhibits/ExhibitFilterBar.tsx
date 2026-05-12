import { useTranslation } from 'react-i18next'
import type { LanguageCode } from '../../types/settings'
import type { ExhibitCategoryKey, ExhibitEraKey, HallExhibitFiltersState } from '../../types/museum'

type Props = {
  filters: HallExhibitFiltersState
  onEra: (v: ExhibitEraKey | 'all') => void
  onCategory: (v: ExhibitCategoryKey | 'all') => void
  onCollection: (v: HallExhibitFiltersState['collection']) => void
  eras: readonly (ExhibitEraKey | 'all')[]
  categories: readonly (ExhibitCategoryKey | 'all')[]
}

export function ExhibitFilterBar({ filters, onEra, onCategory, onCollection, eras, categories }: Props) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as LanguageCode

  return (
    <div className="exhibit-filters" aria-label={t('exhibit.filters.ariaLabel')}>
      <div className="exhibit-filters__group">
        <span className="exhibit-filters__label" id="filter-era-label">
          {t('exhibit.filters.era')}
        </span>
        <div className="exhibit-filters__scroller" role="toolbar" aria-labelledby="filter-era-label">
          {eras.map((era) => (
            <button
              key={era}
              type="button"
              className={['filter-chip', filters.era === era ? 'filter-chip--active' : ''].join(' ')}
              onClick={() => onEra(era)}
            >
              {era === 'all' ? t('exhibit.filters.all') : t(`exhibit.era.${era}`, { lng: lang })}
            </button>
          ))}
        </div>
      </div>
      <div className="exhibit-filters__group">
        <span className="exhibit-filters__label" id="filter-cat-label">
          {t('exhibit.filters.category')}
        </span>
        <div className="exhibit-filters__scroller" role="toolbar" aria-labelledby="filter-cat-label">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={['filter-chip', filters.category === cat ? 'filter-chip--active' : ''].join(' ')}
              onClick={() => onCategory(cat)}
            >
              {cat === 'all' ? t('exhibit.filters.all') : t(`exhibit.category.${cat}`, { lng: lang })}
            </button>
          ))}
        </div>
      </div>
      <div className="exhibit-filters__group">
        <span className="exhibit-filters__label" id="filter-coll-label">
          {t('exhibit.filters.collection')}
        </span>
        <div className="exhibit-filters__scroller" role="toolbar" aria-labelledby="filter-coll-label">
          {(['all', 'favorites', 'unstudied'] as const).map((c) => (
            <button
              key={c}
              type="button"
              className={['filter-chip', filters.collection === c ? 'filter-chip--active' : ''].join(' ')}
              onClick={() => onCollection(c)}
            >
              {t(`exhibit.filters.collection.${c}`)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
