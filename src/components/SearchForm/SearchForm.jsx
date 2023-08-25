import './SearchForm.css';

import icon from '../../images/search-icon.svg';
import buttonIcon from '../../images/search-button-icon.svg';

function SearchForm({
  handleSubmit,
  handleChange,
  searchQuery,
  handleSwitcher,
  isShortFilm,
  errorMessage,
}) {
  return (
    <section className='searchform'>
      <form className='searchform__wrapper' onSubmit={handleSubmit} noValidate>
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
            value={searchQuery}
            onChange={(event) => handleChange(event.target.value)}
          />
          {errorMessage && <p className='searchform__error'>{errorMessage}</p>}

          <button
            className='searchform__button'
            onSubmit={handleSubmit}
            type='submit'
          >
            <img
              src={buttonIcon}
              alt='кнопка поиска'
              className='searchform__button-icon link-button'
            />
          </button>
        </div>

        <div className='searchform__switcher-area'>
          <label htmlFor='switcher' className='searchform__text-label'>
            <input
              type='checkbox'
              id='switcher'
              className='searchform__switcher link-button'
              checked={isShortFilm}
              onChange={(e) => handleSwitcher(e.target.checked)}
            />
            <p className='searchform__switcher-text'>Короткометражки</p>
          </label>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
