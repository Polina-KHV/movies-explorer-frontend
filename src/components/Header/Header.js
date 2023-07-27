import { NavLink } from 'react-router-dom';
import './Header.css';

function Header({headerType, children}) {
  return(
    <header className={`header ${headerType ? headerType : ''}`}>
      <div className='header__container content-container'>
        <NavLink
          className='header__logo logo'
          to='/'
        />
        <nav>
          {children}
        </nav>
      </div>
    </header>
  )
}

export default Header;