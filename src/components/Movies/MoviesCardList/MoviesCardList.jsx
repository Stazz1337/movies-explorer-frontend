import MoviesCard from '../MoviesCard/Movies.Card';
import './MoviesCardList.css';

function MoviesCardList() {
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
      <button type='button' className='moviescardlist__more-button link_button'>
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
