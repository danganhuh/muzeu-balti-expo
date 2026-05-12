import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  loadUserExhibitCollections,
  saveAlbum,
  saveFavorites,
  saveStudied,
} from '../services/storage/userCollectionsStorage'

export function useUserExhibitCollections() {
  const [favorites, setFavorites] = useState<string[]>(() => loadUserExhibitCollections().favorites)
  const [album, setAlbum] = useState<string[]>(() => loadUserExhibitCollections().album)
  const [studied, setStudied] = useState<string[]>(() => loadUserExhibitCollections().studied)

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (!e.key || !e.key.startsWith('vitrina:')) return
      const next = loadUserExhibitCollections()
      setFavorites(next.favorites)
      setAlbum(next.album)
      setStudied(next.studied)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const sets = useMemo(
    () => ({
      favoriteSet: new Set(favorites),
      albumSet: new Set(album),
      studiedSet: new Set(studied),
    }),
    [favorites, album, studied],
  )

  const toggleFavorite = useCallback((exhibitId: string) => {
    setFavorites((prev) => {
      const s = new Set(prev)
      if (s.has(exhibitId)) s.delete(exhibitId)
      else s.add(exhibitId)
      const next = [...s]
      saveFavorites(next)
      return next
    })
  }, [])

  const toggleAlbum = useCallback((exhibitId: string) => {
    setAlbum((prev) => {
      const s = new Set(prev)
      if (s.has(exhibitId)) s.delete(exhibitId)
      else s.add(exhibitId)
      const next = [...s]
      saveAlbum(next)
      return next
    })
  }, [])

  const toggleStudied = useCallback((exhibitId: string) => {
    setStudied((prev) => {
      const s = new Set(prev)
      if (s.has(exhibitId)) s.delete(exhibitId)
      else s.add(exhibitId)
      const next = [...s]
      saveStudied(next)
      return next
    })
  }, [])

  return {
    favorites,
    album,
    studied,
    isFavorite: (id: string) => sets.favoriteSet.has(id),
    inAlbum: (id: string) => sets.albumSet.has(id),
    isStudied: (id: string) => sets.studiedSet.has(id),
    toggleFavorite,
    toggleAlbum,
    toggleStudied,
  }
}
