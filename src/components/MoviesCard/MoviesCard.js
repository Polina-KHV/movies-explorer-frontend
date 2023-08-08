import './MoviesCard.css';

function MoviesCard({
  movie,
  name,
  image,
  link,
  duration,
  owner,
  onSavedMoviesPage,
  onDeleteButtonClick,
  onLikeButtonClick
}) {
  function toHoursAndMinutes(time) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return hours === 0 ? `${minutes}м` : `${hours}ч ${minutes}м`
  }

  function handleButtonClick(evt) {
    if(evt.target.classList.contains('button_type_common')) {
      evt.preventDefault();
    }
  }

  return(
    <li>
      <a
        className='movies-card'
        href={`${link}`}
        target='_blank'
        rel='noreferrer'
        onClick={handleButtonClick}
      >
        <img
          className='movies-card__image'
          src={image}
          alt={`${name}`}
        />
        <div className='movies-card__info'>
          <div>
            <h3 className='movies-card__title'>{name}</h3>
            <span className='movies-card__text'>{toHoursAndMinutes(duration)}</span>
          </div>
          {onSavedMoviesPage ?
          <button
          className='movies-card__trash-button button_type_common'
          type='button'
          onClick={
            function() {onDeleteButtonClick(movie)}
          }
          ></button>
          :
          <button
          className={`${owner ? 'movies-card__like-button_active' : ''} movies-card__like-button button_type_common`}
          type='button'
          onClick={
            function() {onLikeButtonClick(movie)}
          }
          ></button>
          }
        </div>
      </a>
    </li>
  )
}

export default MoviesCard;