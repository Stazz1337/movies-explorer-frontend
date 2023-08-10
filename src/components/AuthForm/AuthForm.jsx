import './AuthForm.css';
import logo from '../../images/header-logo.svg';
import { Link, useLocation } from 'react-router-dom';

function AuthForm(props) {
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleAuth();
  };

  return (
    <div className='authForm'>
      <form onSubmit={handleSubmit} className='authForm__form' noValidate>
        <Link to='/' className='authForm__logo link'>
          <img src={logo} alt='лого' className='authForm__logo' />
        </Link>

        <p className='authForm__welcome'>{props.welcomeText}</p>

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
              // value={values.name || ""}
              // onChange={handleChange}
              required
              minLength={2}
              maxLength={30}
              // onBlur={() => setIsNameTouched(true)}
            />

            <span className={'authForm__input-error'}></span>

            {/* <span
        className={`authForm__input-error ${
          isNameTouched && errors.name ? "authForm__input-error_active" : ""      
        }`}
      >
        {errors.name}
      </span> */}
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
          // value={values.email || ""}
          // onChange={handleChange}
          required
          minLength={2}
          maxLength={30}
          // onBlur={() => setIsEmailTouched(true)}
        />

        <span className={'authForm__input-error'}></span>

        {/* <span
        className={`authForm__input-error ${
          isEmailTouched && errors.email ? "authForm__input-error_active" : ""
        }`}
      >
        {errors.email}
      </span> */}

        <label htmlFor='password' className='authForm__label'>
          Password
        </label>

        <input
          className='authForm__input'
          id='password'
          name='password'
          type='password'
          // value={values.password || ""}
          // onChange={handleChange}
          required
          minLength={2}
          maxLength={30}
          // onBlur={() => setIsPasswordTouched(true)}
        />

        <span className={'authForm__input-error'}></span>

        {/* <span
            className={`authForm__input-error 
        ${
          isPasswordTouched && errors.password
            ? 'authForm__input-error_active'
            : ''
        }
        `}
          >
            {errors.password}
          </span> */}

        <button
          type='submit'
          // onSubmit={handleSubmit}
          className='authForm__button link_button'
          // disabled={!isValid}
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
