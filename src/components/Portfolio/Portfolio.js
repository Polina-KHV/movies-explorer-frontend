import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio content-container'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__list list'>
        <li className='portfolio__item-container'>
        <a className='portfolio__item link' href='https://github.com/Polina-KHV/russian-travel' target='_blank' rel='noreferrer'><span>Статичный сайт</span><span>↗</span></a>
        </li>
        <li className='portfolio__item-container'>
        <a className='portfolio__item link' href='https://github.com/Polina-KHV/mesto' target='_blank' rel='noreferrer'><span>Адаптивный сайт</span><span>↗</span></a>
        </li>
        <li className='portfolio__item-container'>
        <a className='portfolio__item link' href='https://github.com/Polina-KHV/react-mesto-api-full-gha' target='_blank' rel='noreferrer'><span>Одностраничное приложение</span><span>↗</span></a>
        </li> 
      </ul>
    </section>
  )
}

export default Portfolio;
