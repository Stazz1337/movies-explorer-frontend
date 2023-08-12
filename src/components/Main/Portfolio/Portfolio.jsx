import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>

      <ul className='portfolio__list'>
        <li className='portfolio__list-item '>
          <a
            href='https://stazz1337.github.io/how-to-learn/index.html'
            target='blank'
            className='portfolio__list-link link link'
          >
            <h3 className='portfolio__list-title'>Статичный сайт</h3>

            <div className='portfolio__arrow-link'></div>
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a
            href='https://stazz1337.github.io/russian-travel/index.html'
            target='blank'
            className='portfolio__list-link link'
          >
            <h3 className='portfolio__list-title'>Адаптивный сайт</h3>
            <div className='portfolio__arrow-link'></div>
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a
            href='https://Stazz1337.github.io/react-mesto-auth/index.html'
            target='blank'
            className='portfolio__list-link link'
          >
            <h3 className='portfolio__list-title'>
              {' '}
              Одностраничное приложение
            </h3>
            <div className='portfolio__arrow-link'></div>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
