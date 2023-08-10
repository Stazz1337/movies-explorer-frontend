import './PageNotFound.css';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <section className='pagenotfound'>
      <p className='pagenotfound__error'>404</p>
      <h2 className='pagenotfound__title'>Страница не найдена</h2>
      <Link to='/' className='pagenotfound__link' >
        Назад
      </Link>
    </section>
  );
}

export default PageNotFound;
