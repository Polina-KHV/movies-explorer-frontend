import Header from '../Header/Header.js';
import MainNav from '../MainNav/MainNav.js';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import SideNav from '../SideNav/SideNav.js';
import Preloader from '../Preloader/Preloader.js';

function Movies({
  movies,
  onOpenSideNav,
  onFormSubmit,
  isSideNavOpen,
  onCloseSideNav,
  onMoviesListContent,
  onMoviesLoading,
  onSearch,
  onMovieApiError,
  onLikeButtonClick
}) {

  return (
    <>
      <Header>
        <MainNav
          onClick={onOpenSideNav}
        />
      </Header>
      <main>
        <SearchForm
          onSavedMoviesPage={false}
          onFormSubmit={onFormSubmit}
        />
        {!onSearch ? '' :
        onMoviesLoading ?
        <Preloader
          type='movies'
        /> :
        <MoviesCardList
          movies={movies}
          onSavedMoviesPage={false}
          isEmpty={onMoviesListContent}
          isMovieApiError={onMovieApiError}
          onLikeButtonClick={
            function(movie) {onLikeButtonClick(movie)}
          }
        />}
      </main>
      <Footer
        isSticky={onMoviesLoading || onMoviesListContent}
      />
      <SideNav
        isOpen={isSideNavOpen}
        onCloseSideNav={onCloseSideNav}
      />
    </>
  )
}

export default Movies;