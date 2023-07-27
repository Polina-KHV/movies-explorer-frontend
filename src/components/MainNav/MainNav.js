import { NavLink, useLocation } from 'react-router-dom';
import './MainNav.css';

function MainNav({onClick}) {
  const location = useLocation();

  return(
    <>
      <ul className='header__nav_type_main list'>
        <li>
          <NavLink
            className={`${location.pathname==='/movies' ? 'header__link_active' : 'header__link'} link`}
            to='/movies'
          >
            Фильмы
          </NavLink>
        </li>
        <li>
          <NavLink
            className={`${location.pathname==='/saved-movies' ? 'header__link_active' : 'header__link'} link`}
            to='/saved-movies'
          >
            Сохранённые&nbsp;фильмы
          </NavLink>
        </li>
        <li>
          <NavLink
            className='header__link_active header__link_type_account link'
            to='/profile'
          >
            Аккаунт
            <div className='account-icon'></div>
          </NavLink>
        </li>
      </ul>
      <button
        type='button'
        className='header__navbar-button button_type_common'
        onClick={onClick}
      ></button>
    </>
  )
}

export default MainNav;