import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../images/header-logo.svg';
import profileIcon from '../../images/header-icon.svg';
import { useState } from 'react';
import burger from '../../images/header-burger.svg';
import Sidebar from './Sidebar/Sidebar';

function Header() {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  function closeSidebar() {
    setIsOpen(false);
  }

  return (
    <>
      {location.pathname === '/' && (
        <header className='header'>
          <Link to='/'>
            <img
              src={logo}
              alt='Логотип'
              className='header__logo link_button'
            />
          </Link>

          <ul className='header__list'>
            <li>
              <Link to='/signup' className='header__link link_button'>
                Регистрация
              </Link>
            </li>
            <li>
              <Link
                to='/signin'
                className='header__link link_button header__link_signin'
              >
                Войти
              </Link>
            </li>
          </ul>
        </header>
      )}

      {(location.pathname === '/movies' ||
        location.pathname === '/saved-movies' ||
        location.pathname === '/profile') && (
        <header className='header_logged'>
          <Link to='/'>
            <img
              src={logo}
              alt='Логотип'
              className='header__logo link_button'
            />
          </Link>

          <nav className='header__nav header__nav_hidden'>
            <ul className='header__list_logged'>
              <li>
                <Link to='/movies' className='header__link_logged link_button'>
                  Фильмы
                </Link>
              </li>
              <li>
                <Link
                  to='/saved-movies'
                  className='header__link_logged link_button '
                >
                  Сохранённые фильмы
                </Link>
              </li>
            </ul>
          </nav>

          <Link
            to='/profile'
            className='header__profile-link header__profile-link_hidden link_button '
          >
            {' '}
            <img src={profileIcon} alt='иконка профиля' />
            &nbsp;Аккаунт
          </Link>

          <button
            className='header__burger link_button'
            onClick={() => setIsOpen(true)}
            style={{
              backgroundImage: `url(${burger})`,
            }}
          ></button>

          <Sidebar isOpen={isOpen} onClose={closeSidebar} />
        </header>
      )}
    </>
  );
}

export default Header;
