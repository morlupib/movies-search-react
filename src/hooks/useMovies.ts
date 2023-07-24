import { useCallback, useRef, useState } from 'react'
import { Movie } from '../types.d'
import { SearchParams, searchMovies } from '../services/movies'

export function useMovies({ search }: SearchParams) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [, setError] = useState(false)
  const previousSearch = useRef(search)

  const getMovies = useCallback(async ({ search }: SearchParams) => {
    if (search === previousSearch.current) return
    try {
      setLoading(true)
      setError(false)
      previousSearch.current = search
      const movies = await searchMovies({ search })
      setMovies(movies)
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  return { movies, getMovies, loading }
}
