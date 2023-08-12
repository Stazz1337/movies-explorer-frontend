import './SavedMovies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

function SavedMovies() {
  return <main className='savedmovies'>
    <SearchForm/>
    <MoviesCardList/>
  </main>;
}

export default SavedMovies;