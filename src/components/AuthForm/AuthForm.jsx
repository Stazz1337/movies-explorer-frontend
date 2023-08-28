import './AuthForm.css';
import logo from '../../images/header-logo.svg';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function AuthForm(props) {
  const location = useLocation();

  const [isNameTouched, setIsNameTouched] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

    
  useEffect(() => {
    resetForm();
  }, [resetForm]);


  const handleSubmit = (e) => {
    e.preventDefault();
    props.setIsSubmitButtonDisabled(true);
    if (location.pathname === '/signup') {
      props.handleAuth(values.name, values.email, values.password);
    } else {
      props.handleAuth(values.email, values.password);
    }
  };

  return (
    <div className='authForm'>
      <form onSubmit={handleSubmit} className='authForm__form' noValidate>
        <Link to='/' className='authForm__logo link'>
          <img src={logo} alt='лого' className='authForm__logo' />
        </Link>

        <h1 className='authForm__welcome'>{props.welcomeText}</h1>

        {location.pathname === '/signup' && (
          <>
            <label htmlFor='name' className='authForm__label'>
              Имя
            </label>
            <input
              className='authForm__input'
              id='name'
              name='name'
              type='name'
              value={values.name || ''}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={30}
              onBlur={() => setIsNameTouched(true)}
              placeholder='Виталий'
            />

            <span
              className={`authForm__input-error ${
                isNameTouched && errors.name
                  ? 'authForm__input-error_active'
                  : ''
              }`}
            >
              {errors.name}
            </span>
          </>
        )}

        <label htmlFor='email' className='authForm__label'>
          Email
        </label>

        <input
          className='authForm__input'
          id='email'
          name='email'
          type='email'
          value={values.email || ''}
          onChange={handleChange}
          required
          minLength={2}
          maxLength={30}
          onBlur={() => setIsEmailTouched(true)}
          placeholder='pochta@yandex.ru'
        />

        <span
          className={`authForm__input-error ${
            isEmailTouched && errors.email ? 'authForm__input-error_active' : ''
          }`}
        >
          {errors.email}
        </span>

        <label htmlFor='password' className='authForm__label'>
          Password
        </label>

        <input
          className='authForm__input'
          id='password'
          name='password'
          type='password'
          value={values.password || ''}
          onChange={handleChange}
          required
          minLength={2}
          maxLength={30}
          onBlur={() => setIsPasswordTouched(true)}
          placeholder='password'
        />

        <span
          className={`authForm__input-error 
        ${
          isPasswordTouched && errors.password
            ? 'authForm__input-error_active'
            : ''
        }
        `}
        >
          {errors.password}
        </span>

        {props.apiError && <span className="authForm__api-error">{props.apiError}</span>}

        <button
          type='submit'
          onSubmit={handleSubmit}
          className='authForm__button link-button'
          disabled={!isValid || props.isSubmitButtonDisabled}
        >
          {props.buttonText}
        </button>

        <div className='authForm__signin'>
          <p className='authForm__signin-label'> {props.linkTitle} &nbsp; </p>
          <Link to={props.link} className='authForm__signin-link link'>
            {props.linkText}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
