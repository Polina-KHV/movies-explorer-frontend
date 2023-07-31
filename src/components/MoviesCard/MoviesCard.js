import './MoviesCard.css';

function MoviesCard({src, name, time, isSaved}) {
  return(
    <li
      className='movies-card'
    >
      <img
        className='movies-card__image'
        src={src}
        alt={`${name}`}
      />
      <div className='movies-card__info'>
        <div>
          <h3 className='movies-card__title'>{name}</h3>
          <span className='movies-card__text'>{time}</span>
        </div>
        {isSaved ?
        <button
        className='movies-card__trash-button button_type_common'
        type='button'
        ></button>
        :
        <button
        className='movies-card__like-button movies-card__like-button_active button_type_common'
        type='button'
        ></button>
        }
        
      </div>
    </li>
  )
}

export default MoviesCard;