import './SavedMovies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

function SavedMovies({
  savedMovies,
  deleteMovie,
  searchQuery,
  cards,
  isLoading,
  handleChange,
  handleSubmit,
  notFound,
  handleSwitcher,
  isShortFilm,
  saveMovie,
  errorMessage,
}) {
  return (
    <main className='savedmovies'>
      <SearchForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        searchQuery={searchQuery}
        isShortFilm={isShortFilm}
        handleSwitcher={handleSwitcher}
        errorMessage={errorMessage}
      />
      <MoviesCardList
        cards={savedMovies}
        deleteMovie={deleteMovie}
        showError={notFound}
        saveMovie={saveMovie}
        savedMovies={savedMovies}
      />
    </main>
  );
}

export default SavedMovies;
