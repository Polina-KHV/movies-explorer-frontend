import { useState, useEffect } from "react";
import './SearchForm.css';

function SearchForm({
  onSavedMoviesPage,
  onFormSubmit,
  savedMovies
}) {
  const [search, setSearch] = useState('');
  const [isShort, setIsShort] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    if(!onSavedMoviesPage && localStorage.getItem('searchData')) {
      setSearch(JSON.parse(localStorage.getItem('searchData')).search);
      setIsShort(JSON.parse(localStorage.getItem('searchData')).isShort);
    } 
    else if(onSavedMoviesPage && localStorage.getItem('searchSavedData')) {
      setSearch(JSON.parse(localStorage.getItem('searchSavedData')).search);
      setIsShort(JSON.parse(localStorage.getItem('searchSavedData')).isShort);
      localStorage.removeItem('searchSavedData');
    }
    // eslint-disable-next-line
  }, []);

  function handleInputChange(evt) {
    setSearch(evt.target.value)
    setIsInvalid(false);
  };

  function handleShortMovieFilter(evt) {
    const allSavedMovies = localStorage.getItem('savedMovies')
    if(!onSavedMoviesPage && !search) {
      setIsInvalid(true);
      return
    } else if(!onSavedMoviesPage && search) {
      onFormSubmit(search, evt.target.checked);
      setIsShort(evt.target.checked);
    } else if(onSavedMoviesPage && !search && allSavedMovies.length > 0) {
      setIsInvalid(false);
      onFormSubmit(search, evt.target.checked);
      setIsShort(!isShort);
    } else if(onSavedMoviesPage && search && allSavedMovies.length > 0) {
      onFormSubmit(search, evt.target.checked);
      setIsShort(evt.target.checked);
    } else {
      setIsShort(evt.target.checked);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onFormSubmit(search, isShort);
    if(onSavedMoviesPage && localStorage.getItem('searchSavedData')) {
      setSearch('');
      setIsShort(false);
    }
  };

  function setCustomValidation(evt) {
    evt.preventDefault();
    setIsInvalid(true);
  }

  return (
    <section className='search-form__container content-container'>
      <form
        className='search-form'
        name='search'
        onSubmit={handleSubmit}
      >
        <div className='search-form__search-icon search-icon'></div>
        <input
          className='search-form__input'
          type='search'
          name='search'
          id='search-input'
          autoComplete='off'
          placeholder='Фильм'
          required={!onSavedMoviesPage}
          value={search || ''}
          onInvalid={setCustomValidation}
          onChange={handleInputChange}
        ></input>
        <button className='search-form__submit-button button_type_common' type='submit'>Найти</button>
        <label className='search-form__filter'>
          <input
            className='search-form__checkbox'
            type='checkbox'
            name='short'
            id='short-film-checkbox'
            checked={isShort || false}
            onChange={handleShortMovieFilter}
          >
          </input>
          <div className='search-form__slider'></div>
          Короткометражки
        </label>
        {isInvalid &&
        <span className='search-form__input-error input-error'>
          Нужно ввести ключевое слово
        </span>}
      </form>
    </section>
  )
}

export default SearchForm;
