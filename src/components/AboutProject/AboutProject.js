import './AboutProject.css';

function AboutProject() {
  return(
    <section className='about-project content-container' id='about-project'>
      <h3 className='title_type_main-page-sections'>О проекте</h3>
      <ul className='about-project__info list'>
        <li>
          <article>
            <h3 className='about-project__info-title'>Дипломный проект включал 5&nbsp;этапов</h3>
            <p className='text_type_main'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</p>
          </article>
        </li>
        <li>
          <article>
            <h3 className='about-project__info-title'>На&nbsp;выполнение диплома ушло 5&nbsp;недель</h3>
            <p className='text_type_main'>У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </article>
        </li>
      </ul>
      <div className='about-project__scheme'>
        <div className='about-project__scheme-first-cell'><span>1 неделя</span></div>
        <div className='about-project__scheme-second-cell'><span>4 недели</span></div>
        <div className='about-project__scheme-caption'>Back-end</div>
        <div className='about-project__scheme-caption'>Front-end</div>
      </div>
    </section>
  )
}

export default AboutProject;
