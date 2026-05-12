import type { LanguageCode } from '../types/settings'
import type { LocalizedString, LocalizedStringList } from '../types/museum'

export function pickLocalized<T extends LanguageCode>(lang: T, map: LocalizedString): string {
  return map[lang] ?? map.ro
}

export function pickLocalizedList<T extends LanguageCode>(lang: T, map: LocalizedStringList): string[] {
  const list = map[lang] ?? map.ro
  return [...list]
}
