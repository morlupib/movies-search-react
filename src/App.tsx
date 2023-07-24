import { useCallback } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import './App.css'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App() {
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search })

  const debouncedGetMovies = useCallback(
    debounce((search: string) => {
      getMovies({ search }).catch(console.error)
    }, 300),
    [getMovies, search]
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    getMovies({ search }).catch(console.error)
  }

  const handleChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <>
      <header>
        <h1>Movies search</h1>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Avengers, Star Wars, The Matrix...'
            value={search}
            onChange={handleChage}
          />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
    </>
  )
}

export default App
