import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className='footer__wrapper'>
        <p className='footer__copyright'>© 2023</p>
        <ul className='footer__list'>
          <li className='footer__list-item'>
            <a
              href='https://practicum.yandex.ru/'
              className='footer__link link'
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className='footer__list-item'>
            <a
              href='https://github.com/Stazz1337'
              className='footer__link link'
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
