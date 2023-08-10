import './SearchForm.css';

import icon from '../../../images/search-icon.svg';
import buttonIcon from '../../../images/search-button-icon.svg';
import switcher from '../../../images/search-switcher.svg';

function SearchForm() {
  return (
    <section className='searchform'>
      <div className='searchform__wrapper'>
        <form className='searchform__form'>
          <img src={icon} alt='иконка поиска' className='searchform__icon link_button' />
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
          <button className='searchform__button'>
            <img
              src={buttonIcon}
              alt='кнопка поиска'
              className='searchform__button-icon link_button'
            />
          </button>
        </form>
        <div className='searchform__switcher-area'>
          <img
            src={switcher}
            alt='переключатель фильмов'
            className='searchform__switcher'
          />
          <p className='searchform__text'>Короткометражки</p>
        </div>
      </div>
    </section>
  );
}

export default SearchForm;
