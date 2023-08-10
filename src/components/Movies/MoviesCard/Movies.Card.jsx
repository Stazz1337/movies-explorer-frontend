import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import image from '../../../images/moviesCard.png';
import saveButton from '../../../images/movies-gray-button.svg';

import crossButton from '../../../images/movies-cross-button.svg';

import savedButton from '../../../images/movies-green-button.svg';

function MoviesCard() {
  const location = useLocation();
  const [imgSrc, setImgSrc] = useState(saveButton);
  const handleClick = () => {
    setImgSrc(imgSrc => imgSrc === savedButton ? saveButton : savedButton);
  };
  return (
    <section className='moviescard'>
      <li>
        <figure className='moviescard__item'>
          <img
            src={image}
            alt='картинка фильма'
            className='moviescard__image'
          />

          <figcaption className='moviescard__text-area'>
            <div className='moviescard__title-wrapper'>
              <h2 className='moviescard__title'>33 слова о дизайне</h2>

              <button
                className='moviescard__save-button link_button'
                type='button'
                onClick={handleClick}
              >
                <img
                  src={
                    location.pathname === '/movies'
                      ? imgSrc
                      : crossButton
                  }
                  alt='кпопка сохранить'
                  className='moviescard__save-button-image'
                />
              </button>
            </div>

            <p className='moviescard__duration'>1ч42м</p>
          </figcaption>
        </figure>
      </li>
    </section>
  );
}

export default MoviesCard;
