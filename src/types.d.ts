export interface Movie {
  id: string
  title: string
  year: string
  image: string
}

export type ResponseMoviesAPI = {
  Search: MovieFromApi[]
  totalResults: string
  Response: string
}

export interface MovieFromApi {
  Title: string
  Year: string
  imdbID: string
  Type: Type
  Poster: string
}

export enum Type {
  Game = 'game',
  Movie = 'movie'
}
