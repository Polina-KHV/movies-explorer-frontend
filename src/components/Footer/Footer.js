import './Footer.css';

function Footer({isSticky}) {
  return (
    <footer className={`${isSticky && 'footer_type_sticky'} footer content-container`}>
      <h4 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h4>
      <div className='footer__info'>
        <ul className='footer__links list'>
          <li>
            <a className='footer__link link' href='https://practicum.yandex.ru/' target='_blank' rel='noreferrer'>Яндекс.Практикум</a>
          </li>
          <li>
            <a className='footer__link link' href='https://github.com/Polina-KHV' target='_blank' rel='noreferrer'>Github</a>
          </li>
        </ul>
        <span className='footer__copyright'>&#169;{new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}

export default Footer;
