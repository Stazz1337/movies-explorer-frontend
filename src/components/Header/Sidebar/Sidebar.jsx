import './Sidebar.css';
import { Link } from 'react-router-dom';
import profileIcon from '../../../images/header-icon.svg';

function Sidebar(props) {
  return (
    <section className={`sidebar ${props.isOpen ? 'sidebar_opened' : ''}`}>
      <button
        className='sidebar__close link_button'
        onClick={props.onClose}
        type='button'
      ></button>

      <nav className='sidebar__nav'>
        <ul className='sidebar__list'>
          <li>
            <Link to='/' className='sidebar__list-item link_button'>
              Главная
            </Link>
          </li>
          <li>
            <Link
              to='/movies'
              onClick={props.onClose}
              className='sidebar__list-item link_button'
            >
              Фильмы
            </Link>
          </li>
          <li>
            <Link
              to='/saved-movies'
              onClick={props.onClose}
              className='sidebar__list-item link_button'
            >
              Сохранённые фильмы
            </Link>
          </li>
        </ul>

        <Link to='/profile' className='sidebar__profile-link  link_button'>
          {' '}
          <img src={profileIcon} alt='иконка профиля' />
          &nbsp;Аккаунт
        </Link>
      </nav>
    </section>
  );
}

export default Sidebar;
