import './AboutProject.css';

function AboutProject() {
  return (
    <section className='aboutproject' id="aboutproject">
      <h2 className='aboutproject__title'>О проекте</h2>

      <div className='aboutproject__info-wrapper'>
        <p className='aboutproject__info-subtitle'>
          Дипломный проект включал 5 этапов
        </p>

        <p className='aboutproject__info-text'>
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        
        <p className='aboutproject__info-subtitle'>
          На выполнение диплома ушло 5 недель
        </p>
       

        <p className='aboutproject__info-text'>
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>

      <div className='aboutproject__duration-wrapper'>
        <p className='aboutproject__duration-subtitle aboutproject__duration-subtitle_checked'>
          1 неделя
        </p>
        <p className='aboutproject__duration-subtitle'>4 недели</p>
        <p className='aboutproject__duration-text'>Back-end</p>
        <p className='aboutproject__duration-text'>Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
