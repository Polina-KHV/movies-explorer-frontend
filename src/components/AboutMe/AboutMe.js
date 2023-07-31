import './AboutMe.css';

function AboutMe() {
  return (
    <section className='about-me content-container'>
      <h3 className='title_type_main-page-sections'>Студент</h3>
      <div className='about-me__info-container'>
        <div className='about-me__image'></div>
        <div className='about-me__info'>
          <article>
            <h2 className='title_type_main'>Полина</h2>
            <h3 className='about-me__subtitle'>Фронтенд-разработчик, 28 лет</h3>
            <div className='about-me__text'>
              <p className='text_type_main'>
                Родилась и&nbsp;выросла в&nbsp;Москве, закончила Московский Архитектурный Институт.&nbsp;5&nbsp;лет работала архитектором в&nbsp;проектном бюро. Затем решила уйти с&nbsp;головой в&nbsp;разработку.
              </p>
              <p className='text_type_main'>
                Во&nbsp;время прохождения курса по&nbsp;веб-разработке начала делать небольшие сайты для друзей. Сейчас нахожусь в&nbsp;поиске постоянной работы веб-разработчиком.
              </p>
              <p className='text_type_main'>
                В&nbsp;свободное время предпочитаю активный отдых, занимаюсь серфингом и&nbsp;бегом. Недавно увлеклась корейской культурой, начала изучать корейский язык.
              </p>
            </div>
          </article>
          <a className='about-me__info-link link' href='https://github.com/Polina-KHV' target='_blank' rel='noreferrer'>Github</a>
        </div>
      </div>
    </section>
  )
}

export default AboutMe;
