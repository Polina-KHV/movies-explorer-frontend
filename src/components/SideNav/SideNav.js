import { NavLink, useLocation } from 'react-router-dom';
import './SideNav.css';

function SideNav({isOpen, onCloseSideNav}) {
  const location = useLocation();

  return(
    <section
      className='side-nav'
      style={{display: isOpen ? 'block' : 'none'}}
    >
      <div className='side-nav__mask'></div>
      <div className='side-nav__bar'>
        <button
          type='button'
          className='side-nav__close-button button_type_common'
          onClick={onCloseSideNav}
        ></button>
        <ul className='side-nav__content list'>
          <div>
            <li>
              <NavLink
                className={`${location.pathname==='/' && 'side-nav__link_active'} side-nav__link link`}
                to='/'
                onClick={onCloseSideNav}
              >
                Главная
              </NavLink>
              <NavLink
                className={`${location.pathname==='/movies' && 'side-nav__link_active'} side-nav__link link`}
                to='/movies'
                onClick={onCloseSideNav}
              >
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink
                className={`${location.pathname==='/saved-movies' && 'side-nav__link_active'} side-nav__link link`}
                to='/saved-movies'
                onClick={onCloseSideNav}
              >
                Сохранённые&nbsp;фильмы
              </NavLink>
            </li>
          </div>
          <li>
            <NavLink
              className='side-nav__link_type_account link'
              to='/profile'
              onClick={onCloseSideNav}
            >
              Аккаунт
              <div className='account-icon'></div>
            </NavLink>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default SideNav;