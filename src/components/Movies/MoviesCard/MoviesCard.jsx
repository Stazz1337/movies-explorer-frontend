import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
// import image from '../../../images/moviesCard.png';
import saveButton from '../../../images/movies-gray-button.svg';

import crossButton from '../../../images/movies-cross-button.svg';

import savedButton from '../../../images/movies-green-button.svg';


function MoviesCard({
  _id,
  country,
  nameRU,
  image,
  trailerLink,
  duration,
  director,
  year,
  description,
  thumbnail,
  movieId,
  nameEN,
  saveMovie,
  deleteMovie,
  card,
  savedMovies,
}) {
  const location = useLocation();
  const [imgSrc, setImgSrc] = useState(saveButton);



  const [isSaved, setIsSaved] = useState(false);

  

  const handleSaveClick = () => {
  
    console.log(card);

    saveMovie(card);
    
    console.log(savedMovies);

    setImgSrc((imgSrc) => (imgSrc === savedButton ? saveButton : savedButton));
  };

  const handleDeleteClick = () => {

  
    deleteMovie(card._id);

    setImgSrc((imgSrc) => (imgSrc === savedButton ? saveButton : savedButton));
  };

  function convertMinutesToHours(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }

  const durationMinHours = convertMinutesToHours(duration);

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
                  onClick={isSaved ? handleDeleteClick : handleSaveClick}
                >
                  <img
                    src={imgSrc}
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
