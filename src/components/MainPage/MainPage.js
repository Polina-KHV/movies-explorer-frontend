import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header.js';
import EnterNav from '../EnterNav/EnterNav.js';
import MainNav from '../MainNav/MainNav.js';
import Promo from '../Promo/Promo.js';
import AboutProject from '../AboutProject/AboutProject.js';
import Techs from '../Techs/Techs.js';
import AboutMe from '../AboutMe/AboutMe.js';
import Portfolio from '../Portfolio/Portfolio.js';
import Footer from '../Footer/Footer.js';
import SideNav from '../SideNav/SideNav.js';
import Preloader from '../Preloader/Preloader.js';

function MainPage({
  isLoggedIn,
  onOpenSideNav,
  isSideNavOpen,
  onCloseSideNav,
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    // eslint-disable-next-line
  }, [isLoggedIn]);

  function handleEnterButtonClick() {
    navigate('/signin')
  };

  function handleAboutProjectButtonClick() {
    document.getElementById('about-project').scrollIntoView()
  };

  return (
    loading ?
      <Preloader
        type='main'
      /> :
      <>
        <Header 
          headerType='header_type_main-page'
        >
          {isLoggedIn ?
          <MainNav
            onClick={onOpenSideNav}
          /> :
          <EnterNav
            onClick={handleEnterButtonClick}
          />
          }
        </Header>
        <main>
          <Promo
            onClick={handleAboutProjectButtonClick}
          />
          <AboutProject />
          <Techs />
          <AboutMe />
          <Portfolio />
        </main>
        <Footer />
        {isLoggedIn && <SideNav
          isOpen={isSideNavOpen}
          onCloseSideNav={onCloseSideNav}
        />}
      </>
  )
}

export default MainPage;
