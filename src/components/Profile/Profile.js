import Header from '../Header/Header.js';
import MainNav from '../MainNav/MainNav.js';
import ProfileForm from '../ProfileForm/ProfileForm.js';
import SideNav from '../SideNav/SideNav.js';

function Profile({onOpenSideNav, isSideNavOpen, onCloseSideNav}) {
  return (
    <>
      <Header>
        <MainNav
          onClick={onOpenSideNav}
        />
      </Header>
      <ProfileForm
        buttonText='Войти'
        captureText='Ещё не&nbsp;зарегистрированы?'
        navLink='/signup'
        linkText='Регистрация'
      />
      <SideNav
      isOpen={isSideNavOpen}
      onCloseSideNav={onCloseSideNav}
    />
    </>
    
  );
}

export default Profile;
