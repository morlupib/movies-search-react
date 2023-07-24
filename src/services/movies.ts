import { Movie, ResponseMoviesAPI, MovieFromApi } from '../types.d'

const API_KEY = ''

export interface SearchParams {
  search: string
}

export async function searchMovies({ search }: SearchParams) {
  if (search === '') {
    return []
  }

  try {
    const response = await fetch(
      `https://omdbapi.com/?apikey=${API_KEY}&s=${search}`
    )

    const json = (await response.json()) as ResponseMoviesAPI

    if (json.Response === 'False') {
      throw new Error('Error fetching movies')
    }

    const movies: Movie[] = json.Search?.map((movie: MovieFromApi) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      image: movie.Poster
    }))

    return movies
  } catch (error) {
    throw new Error('Hubo un error')
  }
}
