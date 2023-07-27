import Header from '../Header/Header.js';
import MainNav from '../MainNav/MainNav.js';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import SideNav from '../SideNav/SideNav.js';

function Movies({onOpenSideNav, isSideNavOpen, onCloseSideNav, onMoviesListContent}) {
  return (
    <>
    <Header>
      <MainNav
        onClick={onOpenSideNav}
      />
    </Header>
    <main>
      <SearchForm />
      <MoviesCardList
        isSaved={false}
        isEmpty={onMoviesListContent}
      />
    </main>
    <Footer
      isSticky={onMoviesListContent}
    />
    <SideNav
      isOpen={isSideNavOpen}
      onCloseSideNav={onCloseSideNav}
    />
    </>
  )
}

export default Movies;