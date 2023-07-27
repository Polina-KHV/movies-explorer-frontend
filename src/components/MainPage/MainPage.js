import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header.js';
import EnterNav from '../EnterNav/EnterNav.js';
import Promo from '../Promo/Promo.js';
import AboutProject from '../AboutProject/AboutProject.js';
import Techs from '../Techs/Techs.js';
import AboutMe from '../AboutMe/AboutMe.js';
import Portfolio from '../Portfolio/Portfolio.js';
import Footer from '../Footer/Footer.js';

function MainPage() {
  const navigate = useNavigate();

  function handleEnterButtonClick() {
    navigate('/signin')
  };

  function handleAboutProjectButtonClick() {
    document.getElementById('about-project').scrollIntoView()
  };

  return (
    <>
    <Header 
      headerType='header_type_main-page'
    >
      <EnterNav
        onClick={handleEnterButtonClick}
      />
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
    </>
  )
}

export default MainPage;
