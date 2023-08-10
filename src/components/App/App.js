import { useState, useEffect } from 'react';
import {Routes, Route, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './App.css';
import { register, authorize, getContent, logout } from '../../utils/Auth';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import MainPage from '../MainPage/MainPage.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import PageNotFound from '../PageNotFound/PageNotFound.js';
import Preloader from '../Preloader/Preloader.js';

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [moviesData, setMoviesData] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedSearchedMovies, setSavedSearchedMovies] = useState([]);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [isMovieListEmpty, setIsMovieListEmpty] = useState(true);
  const [isSavedMovieListEmpty, setIsSavedMovieListEmpty] = useState(false);
  const [isNoSavedMovies, setIsNoSavedMovies] = useState(true);
  const [movieApiError, setMovieApiError] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [onSubmitError, setOnSubmitError] = useState(false);
  const [onSuccessfulUpdate, setOnSuccessfulUpdate] = useState(false);

  function tokenCheck() {
    setLoading(true);
    const authorised = localStorage.getItem('authorised');
    if (authorised){
      getContent().then(() => setLoggedIn(true))
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      })
      .finally(() => setLoading(false))
    } else {setLoading(false)}
  };

  useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (loggedIn){
      mainApi.getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      });
    }
  }, [loggedIn]);
  
  useEffect(() => {
    if(submitError) {
      setSubmitError('');
    }
    if(onSuccessfulUpdate) {
      setOnSuccessfulUpdate(false);
    }
    // eslint-disable-next-line
  }, [navigate]);

  function handleRegistration({name, email, password}) {
    register(name, email, password)
    .then(() => {
      const userData = {email, password};
      handleAuthorization(userData);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`);
      if(err.status === 404) {
        setSubmitError('Страница по указанному маршруту не найдена')
      } else if(err.status === 409) {
        setSubmitError('Пользователь с таким email уже существует')
      } else if(err.status === 500) {
        setSubmitError('На сервере произошла ошибка')
      } else {
        setSubmitError('При регистрации пользователя произошла ошибка')
      }
    })
  };

  function handleAuthorization({email, password}) {
    if (!email || !password){
      return;
    }
    authorize(email, password)
    .then(() => {
      localStorage.setItem('authorised', 'true');
      setLoggedIn(true);
      navigate("/movies", {replace: true});
      setSubmitError('');
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`);
      if(err.status === 404) {
        setSubmitError('Страница по указанному маршруту не найдена')
      } else if(err.status === 401) {
        setSubmitError('Вы ввели неправильный логин или пароль')
      } else if(err.status === 500) {
        setSubmitError('На сервере произошла ошибка')
      } else {
        setSubmitError('При авторизации произошла ошибка')
      }
    })
  };
  
  function handleUpdateUser(user) {
    if(user.name === currentUser.name && user.email === currentUser.email) {
      
    }
    mainApi.setUserInfo(user)
    .then((user) => {
      setOnSuccessfulUpdate(true);
      setOnSubmitError(false);
      setSubmitError('');
      setCurrentUser(user);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`);
      setOnSubmitError(true);
      if(err.status === 404) {
        setSubmitError('Страница по указанному маршруту не найдена')
      } else if(err.status === 409) {
        setSubmitError('Пользователь с таким email уже существует')
      } else if(err.status === 500) {
        setSubmitError('На сервере произошла ошибка')
      } else {
        setSubmitError('При обновлении профиля произошла ошибка')
      }
    });
  };

  function handleExit() {
    logout()
    .then(() => {
      localStorage.removeItem('authorised');
      localStorage.removeItem('searchData');
      setMovies([]);
      setLoggedIn(false);
      navigate("/", {replace: true})
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`);
    });
  };

  useEffect(() => {
    setMoviesLoading(true);
    if (loggedIn){
      mainApi.getMovies()
      .then((movies) => {
        movies.length === 0 ?
        setIsNoSavedMovies(true) :
        setIsNoSavedMovies(false);
        setSavedMovies(
          movies.map((movie) => ({
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: movie.image,
            trailerLink: movie.trailerLink,
            thumbnail: movie.thumbnail,
            movieId: movie.movieId,
            owner: movie.owner,
            _id: movie._id            
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setMoviesLoading(false);
      })
    }
    // eslint-disable-next-line
  }, [currentUser]);

  useEffect(() => {
    if (loggedIn){
      setMoviesLoading(true);
      moviesApi.getMovies()
      .then((movies) => {
        setMoviesData(
          movies.map((movie) => ({
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: `https://api.nomoreparties.co${movie.image.url}`,
            trailerLink: movie.trailerLink,
            thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
            movieId: movie.id
          }))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
        setMovieApiError(true);
      })
      .finally(() => setMoviesLoading(false))
    }
  }, [loggedIn]);
  
  useEffect(() => {
    setSavedSearchedMovies(savedMovies)
    // eslint-disable-next-line
  }, [savedMovies]);

  useEffect(() => {
    if(localStorage.getItem('searchData')) {
      handlePreviousSearch();
    }
    // eslint-disable-next-line
  }, [moviesData]);

  function handleSearch(search, isShort, movies, saved) {
    if(saved && !search) {
      return movies.filter((movie) => {
        return isShort ? movie.duration <= 40 : movie.duration !== undefined
      })
    } else {
      return movies.filter((movie) => {
        return (movie.nameRU.toLowerCase().includes(search.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(search.toLowerCase())) &&
        (isShort ? movie.duration <= 40 : movie.duration !== undefined)
      })
    }
  };

  function handleSearchSavedMovies(search, isShort) {
    setMoviesLoading(true);
    const saved = true;
    const searchMovies = handleSearch(search, isShort, savedMovies, saved);
    if(searchMovies.length === 0) {
      setIsSavedMovieListEmpty(true)
    } else {
      setIsSavedMovieListEmpty(false)
    }
    setSavedSearchedMovies(searchMovies);
    setMoviesLoading(false);
  };

  function handleSearchMovies(search, isShort) {
    setMoviesLoading(true);
    let searchMovies = handleSearch(search, isShort, moviesData);
    if(searchMovies.length === 0) {
      setIsMovieListEmpty(true)
    } else {
      setIsMovieListEmpty(false)
    }
    searchMovies.forEach(movie => {
      const savedMovie = savedMovies.find(i => i.movieId === movie.movieId);
      if(savedMovie) {
        movie.owner = savedMovie.owner;
        movie._id = savedMovie._id;
      }
    })
    setMovies(searchMovies);
    setIsSearched(true);
    setMoviesLoading(false);
    localStorage.setItem('searchData', JSON.stringify({
      search,
      isShort,
      movies: searchMovies
    }));
  };

  function handlePreviousSearch() {
    setMoviesLoading(true);
    const searchData = JSON.parse(localStorage.getItem('searchData'));
    setMovies(searchData.movies);
    handleSearchMovies(searchData.search, searchData.isShort);
    setMoviesLoading(false);
  };

  function handleLikeButtonClick(movie) {
    movie.owner !== undefined ? deleteMovie(movie) : saveMovie(movie) 
  };

  function saveMovie(movie) {
    mainApi.addMovie(movie)
    .then((savedMovie) => {
      console.log(savedMovie);
      setSavedMovies.push([savedMovie, ...savedMovies])
      setMovies((state) =>
        state.map((i) => 
          i.movieId === savedMovie.movieId ? savedMovie : i
      ))
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`);
    })
  };

  function deleteMovie(movie) {
    mainApi.removeMovie(movie._id)
    .then((removedMovie) => {
      console.log(removedMovie);
      delete removedMovie.owner;
      delete removedMovie._id;
      setSavedMovies((state) =>
        state.filter((i) =>
          i._id !== removedMovie._id
      ));
      setMovies((state) =>
        state.map((i) =>
          i.movieId === removedMovie.movieId ? removedMovie : i
      ))
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
  };

  function handleOpenSideNav() {
    setIsSideNavOpen(true)
  };

  function handleCloseSideNav() {
    setIsSideNavOpen(false)
  };

  const MoviesPage = () => {
    return (
      <Movies
        movies={movies}
        onOpenSideNav={handleOpenSideNav}
        onFormSubmit={handleSearchMovies}
        isSideNavOpen={isSideNavOpen}
        onCloseSideNav={handleCloseSideNav}
        onMoviesListContent={isMovieListEmpty}
        onMoviesLoading={moviesLoading}
        onSearch={isSearched}
        onMovieApiError={movieApiError}
        onLikeButtonClick={
          function(movie) {handleLikeButtonClick(movie)}
        }
      />
    )
  };

  const SavedMoviesPage = () => {
    return (
      <SavedMovies
        savedMovies={savedSearchedMovies}
        onOpenSideNav={handleOpenSideNav}
        onFormSubmit={handleSearchSavedMovies}
        isSideNavOpen={isSideNavOpen}
        onCloseSideNav={handleCloseSideNav}
        onNoSavedMovies={isNoSavedMovies}
        onSavedMoviesListContent={isSavedMovieListEmpty}
        onMoviesLoading={moviesLoading}
        onDeleteButtonClick={
          function(movie) {deleteMovie(movie)}
        }
      />
    )
  };

  const ProfilePage = () => {
    return (
      <Profile
        onOpenSideNav={handleOpenSideNav}
        isSideNavOpen={isSideNavOpen}
        onCloseSideNav={handleCloseSideNav}
        onUpdateUser={handleUpdateUser}
        onSignout={handleExit}
        submitError={submitError}
        onSubmitError={onSubmitError}
        onSuccessfulUpdate={onSuccessfulUpdate}
      />
    )
  };

  return (
    <UserContext.Provider value={currentUser}>
      <div className='page'>
        {loading ?
        <Preloader
          type='main'
        /> :
        <Routes>
          <Route path='/' element={<MainPage
            isLoggedIn={loggedIn}
            onOpenSideNav={handleOpenSideNav}
            isSideNavOpen={isSideNavOpen}
            onCloseSideNav={handleCloseSideNav}
            loading={loading}
          />}/>
          <Route path='/signin' element={<Login
            onSignin={handleAuthorization}
            isLoggedIn={loggedIn}
            submitError={submitError}
          />}/>
          <Route path='/signup' element={<Register
            onSignup={handleRegistration}
            isLoggedIn={loggedIn}
            submitError={submitError}
          />}/>
          <Route path='/movies' element={
            <ProtectedRoute
              element={MoviesPage}
              loggedIn={loggedIn}
          />}/>
          <Route path='/saved-movies' element={
            <ProtectedRoute
              element={SavedMoviesPage}
              loggedIn={loggedIn}
          />}/>
          <Route path='/profile'element={
            <ProtectedRoute
              element={ProfilePage}
              loggedIn={loggedIn}
          />}/>
          <Route path='*' element={<PageNotFound />}/>
        </Routes>}
      </div>
    </UserContext.Provider>
  );
}

export default App;