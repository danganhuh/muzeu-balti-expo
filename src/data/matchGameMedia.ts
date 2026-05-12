import { publicUrl } from '../utils/publicUrl'

/**
 * Match-pairs deck uses assets under `public/images/match/` so paths respect
 * Vite `base` on GitHub Pages and avoid hotlink / referrer issues with remote thumbnails.
 */
export const matchPairImages = {
  marketSquare: publicUrl('images/match/market-square.jpg'),
  streetFacade: publicUrl('images/match/street-facade.jpg'),
  courtyardWell: publicUrl('images/match/courtyard.jpg'),
  weaverLoom: publicUrl('images/match/weaver-loom.jpg'),
} as const
