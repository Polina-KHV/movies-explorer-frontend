import './SearchForm.css';

function SearchForm() {
  return (
    <section className='search-form__container content-container'>
      <form className='search-form'>
        <div className='search-form__search-icon search-icon'></div>
        <input className='search-form__input' type='search' name='search' id='search-input' autoComplete='off' placeholder='Фильм' required></input>
        <button className='search-form__submit-button button_type_common' type='submit'>Найти</button>
        <label className='search-form__filter'>
          <input className='search-form__checkbox' type='checkbox' name='short-film' id='short-film-checkbox'></input>
          <div className='search-form__slider'></div>
          Короткометражки
        </label>
      </form>
    </section>
  )
}

export default SearchForm;
