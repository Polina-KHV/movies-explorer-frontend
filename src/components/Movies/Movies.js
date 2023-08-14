import Header from '../Header/Header.js';
import MainNav from '../MainNav/MainNav.js';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import SideNav from '../SideNav/SideNav.js';

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
        <MoviesCardList
          movies={movies}
          onSavedMoviesPage={false}
          isEmpty={onMoviesListContent}
          onSearch={onSearch}
          isMovieApiError={onMovieApiError}
          onLikeButtonClick={
            function(movie) {onLikeButtonClick(movie)}
          }
          onMoviesLoading={onMoviesLoading}
        />
      </main>
      <Footer
        isSticky={onMoviesLoading || onMoviesListContent || !onSearch}
      />
      <SideNav
        isOpen={isSideNavOpen}
        onCloseSideNav={onCloseSideNav}
      />
    </>
  )
}

export default Movies;