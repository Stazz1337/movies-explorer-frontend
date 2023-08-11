import './PageNotFound.css';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <main>
      <section className='pagenotfound'>
        <p className='pagenotfound__error'>404</p>
        <h1 className='pagenotfound__title'>Страница не найдена</h1>
        <Link to='/' className='pagenotfound__link'>
          Назад
        </Link>
      </section>
    </main>
  );
}

export default PageNotFound;
