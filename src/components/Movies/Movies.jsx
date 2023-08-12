import './Movies.css';
import MoviesCardList from './MoviesCardList/MoviesCardList';
// import Preloader from './Preloader/Preloader';
import SearchForm from './SearchForm/SearchForm';

function Movies() {
  return <main className='movies'>
    
    <SearchForm/>
    <MoviesCardList/>

    {/* <Preloader/> */}
   
  </main>;
}

export default Movies;