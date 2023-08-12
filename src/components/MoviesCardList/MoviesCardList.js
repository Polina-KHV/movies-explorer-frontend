import { useState, useLayoutEffect, useEffect } from 'react';
import './MoviesCardList.css';
import {
  LARGE_SCREEN_BREAKPOINT,
  MEDIUM_SCREEN_BREAKPOINT,
  LARGE_SCREEN_INITIAL_MOVIES_AMOUNT,
  MEDIUM_SCREEN_INITIAL_MOVIES_AMOUNT,
  SMALL_SCREEN_INITIAL_MOVIES_AMOUNT,
  LARGE_SCREEN_ADDITION_MOVIES_AMOUNT,
  MEDIUM_SCREEN_ADDITION_MOVIES_AMOUNT,
  SMALL_SCREEN_ADDITION_MOVIES_AMOUNT
} from '../../constants/config';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  movies,
  onSavedMoviesPage,
  isEmpty,
  isMovieApiError,
  noSavedMovies,
  onDeleteButtonClick,
  onLikeButtonClick
}) {
  const [width, setWidth] = useState('');
  const [initialNumber, setInitialNumber] = useState(0);
  const [additionNumber, setAdditionNumber] = useState(0);
  const [noMoreMovies, setNoMoreMovies] = useState(false);

  useLayoutEffect(() => {
    function updateWidth() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateWidth);
    updateWidth();
    return () => window.removeEventListener('resize', updateWidth);
  }, [width]);

  useEffect(() => {
    if(onSavedMoviesPage) {
      setInitialNumber(movies.length)
    } else {
      if(width > LARGE_SCREEN_BREAKPOINT) {
        setInitialNumber(
          LARGE_SCREEN_INITIAL_MOVIES_AMOUNT+(
            LARGE_SCREEN_ADDITION_MOVIES_AMOUNT*additionNumber
        ));
      } else if(width > MEDIUM_SCREEN_BREAKPOINT) {
        setInitialNumber(
          MEDIUM_SCREEN_INITIAL_MOVIES_AMOUNT+(
            MEDIUM_SCREEN_ADDITION_MOVIES_AMOUNT*additionNumber
          ));
      } else {
        setInitialNumber(
          SMALL_SCREEN_INITIAL_MOVIES_AMOUNT+(
            SMALL_SCREEN_ADDITION_MOVIES_AMOUNT*additionNumber
          ));
      }
    }
    // eslint-disable-next-line
  }, [width, additionNumber, initialNumber]);

  useEffect(() => {
    if(initialNumber >= movies.length) {
      setNoMoreMovies(true)
    }
    // eslint-disable-next-line
  }, [handleAddMovies])

  function handleAddMovies() {
      setAdditionNumber(additionNumber+1)
  }

  return(
    <section className='movies-card-list__container content-container'>
      {isMovieApiError && !onSavedMoviesPage ? 
      <>
        <p className='movies-card-list__error-message'>
          Во&nbsp;время запроса произошла ошибка.
        </p>
        <p className='movies-card-list__error-message'>
        Возможно, проблема с&nbsp;соединением или сервер недоступен.
        </p>
        <p className='movies-card-list__error-message'>
          Подождите немного и&nbsp;попробуйте ещё раз.
        </p>
      </>
       :
      (isEmpty && !onSavedMoviesPage) || (isEmpty && onSavedMoviesPage && !noSavedMovies) ? 
      <p className='movies-card-list__error-message'>Ничего не&nbsp;найдено</p> :
      noSavedMovies ? 
      <p className='movies-card-list__error-message'>У&nbsp;вас пока нет сохраненных фильмов</p> :
      <>
        <ul className='movies-card-list list'>
          {movies.slice(0, initialNumber).map((movie) =>
            <MoviesCard
            movie={movie}
            key={movie.movieId}
            name={movie.nameRU}
            image={movie.image}
            link={movie.trailerLink}
            duration={movie.duration}
            owner={movie.owner}
            onSavedMoviesPage={onSavedMoviesPage}
            onDeleteButtonClick={
            function(movie) {onDeleteButtonClick(movie)}
            }
            onLikeButtonClick={
              function(movie) {onLikeButtonClick(movie)}
            }
            />
          )}       
        </ul>
        <button
          className='movies-card-list__add-button button_type_common'
          type='button'
          style={{display: isEmpty || noMoreMovies ? 'none' : 'block'}}
          onClick={handleAddMovies}
        >Ещё</button>
      </>
      }
      
    </section>
  )
}

export default MoviesCardList;