import { useNavigate } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <>
      <div className='not-found__info'>
        <span className='not-found__title'>404</span>
        <p className='not-found__text'>Страница не&nbsp;найдена</p>
      </div>
      <span
        className='not-found__link link'
        onClick={() => navigate(-1)}
      >Назад</span>
    </>
  )
}

export default PageNotFound;