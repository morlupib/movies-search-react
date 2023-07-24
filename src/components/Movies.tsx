import { Movie } from '../types'

interface MoviesProps {
  movies: Movie[]
}

function MoviesList({ movies }: MoviesProps) {
  return (
    <ul className='movies-list'>
      {movies.map((movie: Movie) => (
        <li className='movie' key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.image} alt={movie.title} />
        </li>
      ))}
    </ul>
  )
}

function NoMoviesResults() {
  return <p>No se encontraron películas para esta búsqueda</p>
}

export function Movies({ movies }: MoviesProps) {
  // console.log('isFirstInput', isFirstInput)

  // if (isFirstInput.current) {
  //   return null
  // }

  const hasMovies = movies?.length > 0
  // console.log('hasMovies', hasMovies)

  return hasMovies ? <MoviesList movies={movies} /> : <NoMoviesResults />
}
