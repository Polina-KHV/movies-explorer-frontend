import Header from '../Header/Header.js';
import MainNav from '../MainNav/MainNav';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import SideNav from '../SideNav/SideNav.js';

function SavedMovies({
  savedMovies,
  onOpenSideNav,
  onFormSubmit,
  isSideNavOpen,
  onCloseSideNav,
  onSavedMoviesListContent,
  onNoSavedMovies,
  onMoviesLoading,
  onDeleteButtonClick
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
          onSavedMoviesPage={true}
          onFormSubmit={onFormSubmit}
          savedMovies={savedMovies}
        />
        <MoviesCardList
          movies={savedMovies}
          onSavedMoviesPage={true}
          isEmpty={onSavedMoviesListContent}
          noSavedMovies={onNoSavedMovies}
          onDeleteButtonClick={
            function(movie) {onDeleteButtonClick(movie)}
          }
          onMoviesLoading={onMoviesLoading}
        />
      </main>
      <Footer
        isSticky={onMoviesLoading || onSavedMoviesListContent || onNoSavedMovies}
      />
      <SideNav
        isOpen={isSideNavOpen}
        onCloseSideNav={onCloseSideNav}
      />
    </>
  )
}

export default SavedMovies;