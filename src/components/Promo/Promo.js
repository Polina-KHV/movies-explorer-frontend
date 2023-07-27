import './Promo.css';

function Promo({onClick}) {
  return (
    <section className='promo'>
      <div className='promo__container content-container'>
        <div className='promo__logo'></div>
        <div className='promo__info'>
          <h1 className='title_type_main'>Учебный проект студента факультета Веб-разработки.</h1>
          <p className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его создателя.</p>
          <button
            type='button'
            className='promo__button button_type_main'
            onClick={onClick}
          >Узнать больше</button>
        </div>
      </div>
    </section>
  )
}

export default Promo;
