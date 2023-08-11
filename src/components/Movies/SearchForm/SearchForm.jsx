import './SearchForm.css';

import icon from '../../../images/search-icon.svg';
import buttonIcon from '../../../images/search-button-icon.svg';

function SearchForm() {
  return (
    <section className='searchform'>
      <form className='searchform__wrapper'>
        <div className='searchform__form'>
          <img
            src={icon}
            alt='иконка поиска'
            className='searchform__icon link-button'
          />
          <input
            className='searchform__input'
            type='text'
            id='movie'
            name='movie'
            required
            minLength={2}
            maxLength={30}
            placeholder='Фильм'
          />
          <button className='searchform__button' type='submit'>
            <img
              src={buttonIcon}
              alt='кнопка поиска'
              className='searchform__button-icon link-button'
            />
          </button>
        </div>
        <div className='searchform__switcher-area'>
          {/* <img
            src={switcher}
            alt='переключатель фильмов'
            className='searchform__switcher link-button'
          />
          <p className='searchform__text'>Короткометражки</p> */}

          <label htmlFor='switcher' className='searchform__text'>
            <input
              type='checkbox'
              id='switcher'
              className='searchform__switcher link-button'
            />
            Короткометражки
          </label>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
