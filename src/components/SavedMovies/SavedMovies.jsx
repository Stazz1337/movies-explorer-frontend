import './SavedMovies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

function SavedMovies() {
  return <section className='savedmovies'>
    <SearchForm/>
    <MoviesCardList/>
  </section>;
}

export default SavedMovies;