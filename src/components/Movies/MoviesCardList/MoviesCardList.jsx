import MoviesCard from '../MoviesCard/Movies.Card';
import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';

function MoviesCardList() {
  const location = useLocation();
  return (
    <section className='moviescardlist'>
      <ul className='moviescardlist__list'>
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />

        {/* {props.cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={props.onCardClick}
            onCardLike={props.handleCardLike}
            onCardDelete={props.handleCardDelete}
          />
        ))} */}
      </ul>
      <button type='button' className={location.pathname === '/movies' ? 'moviescardlist__more-button link-button' : 'moviescardlist__more-button moviescardlist__more-button_hidden link-button'}>
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
