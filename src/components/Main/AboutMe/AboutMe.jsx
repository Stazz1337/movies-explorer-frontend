import './AboutMe.css';
import image from '../../../images/aboutme-pic.png';

function AboutMe() {
  return (
    <section className='aboutme' id="aboutme">
      <h2 className='aboutme__title'>Студент</h2>

      <div className='aboutme__wrapper'>
        <div className='aboutme__article'>
          <h3 className='aboutme__subtitle'>Виталий</h3>
          <p className='aboutme__job'>Фронтенд-разработчик, 30 лет</p>
          <p className='aboutme__description'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a href='https://github.com/Stazz1337' target="blank" className='aboutme__link link'>
            Github
          </a>
        </div>

        <img src={image} alt='Фото студента' className='aboutme__image' />
      </div>
    </section>
  );
}

export default AboutMe;
