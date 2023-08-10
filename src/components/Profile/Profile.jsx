import './Profile.css';
import { Link } from 'react-router-dom';

const handleSubmit = (e) => {
  e.preventDefault();
};

function Profile() {
  return (
    <section className='profile'>
      <form onSubmit={handleSubmit} className='profile__form'>
        <p className='profile__welcome'>Привет, Виталий!</p>

        <div className='profile__input-wrapper'>

          <label htmlFor='name' className='profile__label'>
            Имя
          </label>

          <input
            className='profile__input'
            id='name'
            name='name'
            type='name'
            required
            minLength={2}
            maxLength={30}
            placeholder='Виталий'
          />
        </div>

        <div className='profile__input-wrapper'>

          <label htmlFor='email' className='profile__label'>
            Email
          </label>

          <input
            className='profile__input'
            id='email'
            name='email'
            type='email'
            required
            minLength={2}
            maxLength={30}
            placeholder='pochta@yandex.ru'
          />
        </div>

        <button type='submit' className='profile__button link_button'>
          Редактировать
        </button>

        <Link to={'/signin'} className='profile__signin-link link'>
          Выйти из аккаунта
        </Link>
      </form>
    </section>
  );
}

export default Profile;
