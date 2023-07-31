import { NavLink } from 'react-router-dom';
import './EnterNav.css';

function EnterNav({onClick}) {
  return(
    <ul className='header__nav_type_enter list'>
      <li>
        <NavLink
          className='header__link_active link'
          to='/signup'
        >
          Регистрация
        </NavLink>
      </li>
      <li>
        <button
          type='button'
          className='header__enter-button button_type_main'
          onClick={onClick}
        >
          Войти
        </button>
      </li>
    </ul>
  )
}

export default EnterNav;