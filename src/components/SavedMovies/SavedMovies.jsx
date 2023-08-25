import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({
  savedMovies,
  deleteMovie,
  searchQuery,
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
        isShortFilm={isShortFilm}
      />
    </main>
  );
}

export default SavedMovies;
