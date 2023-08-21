import './Profile.css';
import { useContext, useEffect, useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useNavigate } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function Profile({ handleUpdateUser, setIsLoggedIn, apiError }) {
  const currentUser = useContext(CurrentUserContext);

  const navigate = useNavigate();

  const [isNameTouched, setIsNameTouched] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  function signOut() {
    localStorage.removeItem('jwt');

    localStorage.removeItem('searchQuery');
    localStorage.removeItem('results');
    localStorage.removeItem('isShortFilm');

    setIsLoggedIn(false);

    navigate('/');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser(values.name, values.email);
  };
  return (
    <main>
      <section className='profile'>
        <form onSubmit={handleSubmit} className='profile__form' noValidate>
          <h1 className='profile__welcome'>Привет, {currentUser.name}!</h1>

          <div className='profile__input-wrapper'>
            <label htmlFor='name' className='profile__label'>
              Имя
              <input
                className='profile__input'
                id='name'
                name='name'
                type='name'
                required
                minLength={2}
                maxLength={30}
                placeholder={currentUser.name}
                value={values.name || ''}
                onChange={handleChange}
                onBlur={() => setIsNameTouched(true)}
              
              />
            </label>

            <span
              className={`profile__input-error ${
                isNameTouched && errors.name
                  ? 'profile__input-error_active'
                  : ''
              }`}
            >
              {errors.name}
            </span>
          </div>

          <div className='profile__input-wrapper'>
            <label htmlFor='email' className='profile__label'>
              Email
              <input
                className='profile__input'
                id='email'
                name='email'
                type='email'
                required
                minLength={2}
                maxLength={30}
                placeholder={currentUser.email}
                onChange={handleChange}
                onBlur={() => setIsEmailTouched(true)}
                value={values.email || ''}
        
              />
            </label>

            <span
              className={`profile__input-error ${
                isEmailTouched && errors.email
                  ? 'profile__input-error_active'
                  : ''
              }`}
            >
              {errors.email}
            </span>
          </div>
          {apiError && <span className="profile__api-error">{apiError}</span>}
          <button
            type='submit'
            onSubmit={handleSubmit}
            className='profile__button link-button'
            disabled={!isValid}
          >
            Редактировать
          </button>

          <button onClick={signOut} className='profile__signin-link link'>
            Выйти из аккаунта
          </button>
        </form>
      </section>
    </main>
  );
}

export default Profile;
