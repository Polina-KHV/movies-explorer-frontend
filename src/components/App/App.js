import { useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import MainPage from '../MainPage/MainPage.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import PageNotFound from '../PageNotFound/PageNotFound.js';
import Preloader from '../Preloader/Preloader.js';

function App() {
  // Объявляем переменные и стейты
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMovieListEmpty, setIsMovieListEmpty] = useState(false);


  function handleOpenSideNav() {
    setIsSideNavOpen(true)
  };

  function handleCloseSideNav() {
    setIsSideNavOpen(false)
  };

  useEffect(() => {
    setLoading(true);
    document.querySelectorAll('.movies-card').length === 0
    ? setIsMovieListEmpty(true)
    : setIsMovieListEmpty(false);
    setLoading(false);
  }, []);

  return (
    <div className='page'>
      {loading ? <Preloader /> :
      <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route path='/signin' element={<Login />}></Route>
        <Route path='/signup' element={<Register />}></Route>
        <Route path='/movies' element={<Movies
          onOpenSideNav={handleOpenSideNav}
          isSideNavOpen={isSideNavOpen}
          onCloseSideNav={handleCloseSideNav}
          onMoviesListContent={isMovieListEmpty}
        />}></Route>
        <Route path='/saved-movies' element={<SavedMovies
          onOpenSideNav={handleOpenSideNav}
          isSideNavOpen={isSideNavOpen}
          onCloseSideNav={handleCloseSideNav}
          onMoviesListContent={isMovieListEmpty}
        />}></Route>
        <Route path='/profile' element={<Profile
          onOpenSideNav={handleOpenSideNav}
          isSideNavOpen={isSideNavOpen}
          onCloseSideNav={handleCloseSideNav}
        />}></Route>
        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>}
    </div>
  );
}

export default App;
