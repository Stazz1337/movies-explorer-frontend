import './PageNotFound.css';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <main>
      <section className='pagenotfound'>
        <p className='pagenotfound__error'>404</p>
        <h1 className='pagenotfound__title'>Страница не найдена</h1>
        <button
          onClick={() => navigate(-1)}
          type='button'
          className='pagenotfound__link link-button'
        >
          Назад
        </button>
      </section>
    </main>
  );
}

export default PageNotFound;
