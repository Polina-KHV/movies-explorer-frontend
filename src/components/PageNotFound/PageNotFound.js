import './PageNotFound.css';

function PageNotFound() {
  return (
    <>
      <div className='not-found__info'>
        <span className='not-found__title'>404</span>
        <p className='not-found__text'>Страница не&nbsp;найдена</p>
      </div>
      <a className='not-found__link link' href='https://github.com/Polina-KHV'>Назад</a>
    </>
  )
}

export default PageNotFound;