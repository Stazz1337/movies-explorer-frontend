import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function MoviesCardList({
  cards,
  showError,
  saveMovie,
  deleteMovie,
  savedMovies,
  isShortFilm,
}) {
  const location = useLocation();

  const [numCards, setNumCards] = useState(0);

  // кнопка "ещё"

  let resizeTimeout;

  function getNumCardsToAdd() {
    if (window.innerWidth >= 1280) {
      return 16;
    } else if (window.innerWidth >= 990) {
      return 12;
    } else if (window.innerWidth >= 768) {
      return 8;
    } else {
      return 5;
    }
  }

  function handleResize() {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }

    resizeTimeout = setTimeout(() => {
      setNumCards(getNumCardsToAdd());
    }, 200);
  }

  useEffect(
    () => {
      setNumCards(getNumCardsToAdd());

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  function loadMoreCards() {
    if (window.innerWidth >= 1280) {
      setNumCards((prevNumCards) => prevNumCards + 4);
    } else if (window.innerWidth >= 990) {
      setNumCards((prevNumCards) => prevNumCards + 3);
    } else {
      setNumCards((prevNumCards) => prevNumCards + 2);
    }
  }

  if (showError) {
    return (
      <h2 className='moviescardlist__cards-not-found'>Ничего не найдено</h2>
    );
  }

  // изменение  состояния свитчера короткометражек

  if (isShortFilm) {
    cards = cards.filter((item) => item.duration <= 40);
  }

  return (
    <section className='moviescardlist'>
      <ul className='moviescardlist__list'>
        {(location.pathname === '/saved-movies'
          ? cards
          : cards.slice(0, numCards)
        ).map((card) => (
          <MoviesCard
            key={card._id || card.movieId}
            {...card}
            card={card}
            saveMovie={saveMovie}
            deleteMovie={deleteMovie}
            savedMovies={savedMovies}
          />
        ))}
      </ul>
      <button
        type='button'
        className={
          location.pathname === '/movies'
            ? 'moviescardlist__more-button link-button'
            : 'moviescardlist__more-button moviescardlist__more-button_hidden link-button'
        }
        onClick={loadMoreCards}
        style={{ display: numCards >= cards.length ? 'none' : 'block' }}
      >
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
