import './Movies.css';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from './Preloader/Preloader';
import SearchForm from './SearchForm/SearchForm';

function Movies({
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
  savedMovies,
  deleteMovie,
}) {
  return (
    <main className='movies'>
      <SearchForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        searchQuery={searchQuery}
        isShortFilm={isShortFilm}
        handleSwitcher={handleSwitcher}
        errorMessage={errorMessage}
      />

      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          cards={cards}
          showError={notFound}
          saveMovie={saveMovie}
          savedMovies={savedMovies}
          deleteMovie={deleteMovie}
          isShortFilm={isShortFilm}
        />
      )}
    </main>
  );
}

export default Movies;
