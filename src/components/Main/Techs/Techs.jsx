import './Techs.css';

function Techs() {
  return (
    <section className='techs' id="techs">
      <h2 className='techs__title'>Технологии</h2>

      <div className='techs__wrapper'>
        <h3 className='techs__subtitle'>7 технологий</h3>

        <p className='techs__description'>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте
        </p>

        <ul className='techs__list'>
          <li>
            <p className='techs__list-text'>HTML</p>
          </li>
          <li>
            <p className='techs__list-text'>CSS</p>
          </li>
          <li>
            <p className='techs__list-text'>JS</p>
          </li>
          <li>
            <p className='techs__list-text'>React</p>
          </li>
          <li>
            <p className='techs__list-text'>Git</p>
          </li>
          <li>
            <p className='techs__list-text'>Express.js</p>
          </li>
          <li>
            <p className='techs__list-text'>mongoDB</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
