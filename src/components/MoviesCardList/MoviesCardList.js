import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import initialMovies from '../../constants/initialMovies';

function MoviesCardList({isSaved, isEmpty}) {
  const moviesArray = isSaved ? initialMovies.slice(0, 3) : initialMovies;

  return(
    <section className='movies-card-list__container content-container'>
      <ul className='movies-card-list list'>
        {moviesArray.map((movie, index) =>
          <MoviesCard
          key={index}
          src={movie.src}
          name={movie.name}
          time={movie.time}
          isSaved={isSaved}
          />
        )}       
      </ul>
      <button
        className='movies-card-list__add-button button_type_common'
        type='button'
        style={{display: isEmpty ? 'none' : 'block'}}
      >Ещё</button>
    </section>
  )
}

export default MoviesCardList;