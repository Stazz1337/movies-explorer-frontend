import './Portfolio.css';
import arrow from '../../../images/aboutme-arrow.svg';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>

      <ul className='portfolio__list'>
        <li className='portfolio__list-item '>
          <a
            href='https://stazz1337.github.io/how-to-learn/index.html'
            className='portfolio__list-link link link'
          >
            Статичный сайт
          </a>
          <a
            href='https://stazz1337.github.io/how-to-learn/index.html'
            className='portfolio__arrow-link link'
          >
            <img src={arrow} alt='стрелка ссылка' />
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a
            href='https://stazz1337.github.io/russian-travel/index.html'
            className='portfolio__list-link link'
          >
            Адаптивный сайт
          </a>
          <a
            href='https://stazz1337.github.io/russian-travel/index.html'
            className='portfolio__arrow-link link'
          >
            <img src={arrow} alt='стрелка ссылка' />
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a
            href='https://Stazz1337.github.io/react-mesto-auth/index.html'
            className='portfolio__list-link link'
          >
            Одностраничное приложение
          </a>
          <a
            href='https://Stazz1337.github.io/react-mesto-auth/index.html'
            className='portfolio__arrow-link link'
          >
            <img src={arrow} alt='стрелка ссылка' />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
