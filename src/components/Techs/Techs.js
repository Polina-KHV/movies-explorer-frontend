import './Techs.css';

function Techs() {
  return (
    <section className='techs'>
      <div className='content-container'>
        <h3 className='title_type_main-page-sections'>Технологии</h3>
        <div className='techs__info'>
          <h2 className='title_type_main'>7 технологий</h2>
          <p className='text_type_main'>На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном проекте.</p>
        </div>
        <ul className='techs__scheme list'>
          <li className='techs__scheme-cell'><span>HTML</span></li>
          <li className='techs__scheme-cell'><span>CSS</span></li>
          <li className='techs__scheme-cell'><span>JS</span></li>
          <li className='techs__scheme-cell'><span>React</span></li>
          <li className='techs__scheme-cell'><span>Git</span></li>
          <li className='techs__scheme-cell'><span>Express.js</span></li>
          <li className='techs__scheme-cell'><span>mongoDB</span></li>
        </ul>
      </div>
    </section>
  )
}

export default Techs;
