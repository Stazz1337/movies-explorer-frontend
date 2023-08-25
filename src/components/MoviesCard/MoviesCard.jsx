import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

import saveButton from '../../images/movies-gray-button.svg';

import crossButton from '../../images/movies-cross-button.svg';

import savedButton from '../../images/movies-green-button.svg';

function MoviesCard({
  nameRU,
  image,
  trailerLink,
  duration,
  saveMovie,
  deleteMovie,
  card,
  savedMovies,
}) {
  const location = useLocation();

  // проверить сохранение карточки

  const isSaved = savedMovies.some((movie) => movie.nameRU === card.nameRU);

  //  сохранение / удаление с главной страницы

  const handleSaveClick = () => {
    const isCardSaved = savedMovies.some(
      (movie) => movie.nameRU === card.nameRU
    );
    if (!isCardSaved) {
      saveMovie(card);
    } else {
      const savedCard = savedMovies.find(
        (movie) => movie.nameRU === card.nameRU
      );
      deleteMovie(savedCard._id);
    }
  };

  //  удаление со страницы сохраненных

  const handleDeleteClick = () => {
    deleteMovie(card._id);
  };

  // конвертер времени

  function convert(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainMin = minutes % 60;
    return `${hours}h ${remainMin}m`;
  }

  const durationMinHours = convert(duration);

  return (
    <section className='moviescard'>
      <li>
        <figure className='moviescard__item'>
          <a href={trailerLink} target='blank'>
            <img
              src={image}
              alt='постер фильма Война искусств '
              className='moviescard__image'
            />
          </a>

          <figcaption className='moviescard__text-area'>
            <div className='moviescard__title-wrapper'>
              <h2 className='moviescard__title'>{nameRU}</h2>

              {location.pathname === '/movies' ? (
                <button
                  className='moviescard__save-button link-button'
                  type='button'
                  onClick={handleSaveClick}
                >
                  <img
                    src={isSaved ? savedButton : saveButton}
                    alt='кпопка сохранить'
                    className='moviescard__save-button-image'
                  />
                </button>
              ) : (
                <button
                  className='moviescard__save-button link-button'
                  type='button'
                  onClick={handleDeleteClick}
                >
                  <img
                    src={crossButton}
                    alt='кпопка сохранить'
                    className='moviescard__save-button-image'
                  />
                </button>
              )}
            </div>

            <p className='moviescard__duration'>{durationMinHours}</p>
          </figcaption>
        </figure>
      </li>
    </section>
  );
}

export default MoviesCard;
