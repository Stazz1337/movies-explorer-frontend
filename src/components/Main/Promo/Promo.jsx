import './Promo.css';
import promoPicture from '../../../images/promo-logo.svg';


function Promo() {
  return (
    <section className='promo'>
      <img src={promoPicture} alt="Логотип Практикум" className='promo__picture' />
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки</h1>
    </section>
  );
}

export default Promo;