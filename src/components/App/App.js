import { useState, useEffect } from 'react';
import {Routes, Route, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './App.css';
import { register, authorize, getContent, logout } from '../../utils/Auth';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi.js';
import { SHORT_MOVIES_LENGTH } from '../../constants/config';
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
  const [onMoviesData, setOnMoviesData] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [onSavedMovies, setOnSavedMovies] = useState(false);
  const [savedSearchedMovies, setSavedSearchedMovies] = useState([]);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [moviesLoading, setMoviesLoading] = useState(true);
  const [isSearched, setIsSearched] = useState(false);
  const [isMovieListEmpty, setIsMovieListEmpty] = useState(false);
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
    if(loggedIn && localStorage.getItem('savedMovies')) {
      setMoviesData(JSON.parse(localStorage.getItem('moviesData')));
      handleSearchSavedMovies();
      updateMoviesSearch();
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
      localStorage.clear();
      setMovies([]);
      setLoggedIn(false);
      navigate("/", {replace: true})
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`);
    });
  };

  useEffect(() => {
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
            owner: movie.owner._id,
            _id: movie._id            
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOnSavedMovies(true);
      })
    }
    // eslint-disable-next-line
  }, [loggedIn]);

  useEffect(() => {
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    setSavedSearchedMovies(savedMovies);
    setMoviesLoading(false);
    // eslint-disable-next-line
  }, [onSavedMovies]);

  useEffect(() => {
    if (loggedIn){
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
      .finally(() => {
        setOnMoviesData(true);
      })
    }
  }, [loggedIn]);

  useEffect(() => {
    moviesData.forEach(movie => {
      const savedMovie = savedMovies.find(i => i.movieId === movie.movieId);
      if(savedMovie) {
        movie.isLiked = true;
        movie._id = savedMovie._id
      } else {
        movie.isLiked = false;
      }
    });
    if(localStorage.getItem('searchData')) {
      handlePreviousSearch();
      setIsSearched(true);
    };
    localStorage.setItem('moviesData', JSON.stringify(moviesData));
    setMoviesLoading(false);
    // eslint-disable-next-line
  }, [onMoviesData]);

  function handleShortMovie(isShort, movie) {
    return isShort ?
    movie.duration <= SHORT_MOVIES_LENGTH :
    movie.duration !== undefined
  };

  function handleSearch(search, isShort, movies, saved) {
    if(saved && !search) {
      return movies.filter((movie) => handleShortMovie(isShort, movie))
    } else {
      return movies.filter((movie) => {
        return (movie.nameRU.toLowerCase().includes(search.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(search.toLowerCase())) &&
        handleShortMovie(isShort, movie)
      })
    }
  };

  function handleSearchSavedMovies(search, isShort) {
    if(!search && !isShort) {
      const newSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
      if(newSavedMovies.length !== 0) {
        setIsNoSavedMovies(false);
        setSavedMovies(newSavedMovies);
        setSavedSearchedMovies(newSavedMovies);
      } else {
        setIsNoSavedMovies(true);
      }
    } else {
      const saved = true;
      const searchMovies = handleSearch(search, isShort, savedMovies, saved);
      if(searchMovies.length === 0) {
        setIsSavedMovieListEmpty(true)
      } else {
        setIsSavedMovieListEmpty(false)
      }
      setSavedSearchedMovies(searchMovies);
    }
    localStorage.setItem('searchSavedData', JSON.stringify({
      search,
      isShort,
    }));
  };

  function handleSearchMovies(search, isShort) {
    const currentMoviesData = JSON.parse(localStorage.getItem('moviesData'));
    const searchMovies = handleSearch(search, isShort, currentMoviesData);
    if(searchMovies.length === 0) {
      setIsMovieListEmpty(true)
    } else {
      setIsMovieListEmpty(false)
    }
    setMovies(searchMovies);
    if(!isSearched){setIsSearched(true)};
    localStorage.setItem('searchData', JSON.stringify({
      search,
      isShort,
    }));
  };

  function updateMoviesSearch() {
    if(!localStorage.getItem('searchData')) {
      return
    }
    const currentMoviesData = JSON.parse(localStorage.getItem('moviesData'));
    const searchData = JSON.parse(localStorage.getItem('searchData'));
    const searchMovies = handleSearch(searchData.search, searchData.isShort, currentMoviesData);
    if(searchMovies.length === 0) {
      setIsMovieListEmpty(true)
    } else {
      setIsMovieListEmpty(false)
    };
    setMovies(searchMovies);
  }

  function handlePreviousSearch() {
    const searchData = JSON.parse(localStorage.getItem('searchData'));
    const searchMovies = handleSearch(searchData.search, searchData.isShort, moviesData);
    if(searchMovies.length === 0) {
      setIsMovieListEmpty(true)
    } else {
      setIsMovieListEmpty(false)
    };
    setMovies(searchMovies);
  };

  function handleLikeButtonClick(movie) {
    movie.isLiked ? deleteMovie(movie) : saveMovie(movie) 
  };

  function saveMovie(movie) {
    mainApi.addMovie(movie)
    .then((savedMovie) => {
      movie.isLiked = true;
      savedMovie.owner = savedMovie.owner._id;
      const oldSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
      const newSavedMovies = [savedMovie, ...oldSavedMovies];
      localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
      const newMoviesData = JSON.parse(localStorage.getItem('moviesData'))
      .map((m) => m.movieId === savedMovie.movieId ? movie : m);
      localStorage.setItem('moviesData', JSON.stringify(newMoviesData));
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`);
    })
  };

  function deleteMovie(movie) {
    mainApi.removeMovie(movie._id)
    .then((removedMovie) => {
      movie.isLiked = false;
      delete movie._id;
      const newSavedMovies = JSON.parse(localStorage.getItem('savedMovies'))
      .filter((m) => m._id !== removedMovie._id);
      localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
      const newMoviesData = JSON.parse(localStorage.getItem('moviesData'))
      .map((m) => m.movieId === removedMovie.movieId ? movie : m);
      localStorage.setItem('moviesData', JSON.stringify(newMoviesData));
      if(newSavedMovies.length === 0) {
        setIsNoSavedMovies(true)
      } else {
        setIsNoSavedMovies(false)
      }
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
  };

  function deleteSavedMovie(movie) {
    mainApi.removeMovie(movie._id)
    .then((removedMovie) => {
      setSavedMovies((state) =>
        state.filter((i) =>
          i._id !== removedMovie._id
      ));
      const newSavedMovies = JSON.parse(localStorage.getItem('savedMovies'))
      .filter((m) => m._id !== removedMovie._id);
      localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
      setSavedSearchedMovies((state) =>
        state.filter((i) =>
          i._id !== removedMovie._id
      ));
      const newMovieInData = JSON.parse(localStorage.getItem('moviesData'))
      .find((m) => m.movieId === removedMovie.movieId);
      newMovieInData.isLiked = false;
      delete newMovieInData._id;
      const newMoviesData = JSON.parse(localStorage.getItem('moviesData'))
      .map((m) => m.movieId === removedMovie.movieId ? newMovieInData : m);
      localStorage.setItem('moviesData', JSON.stringify(newMoviesData));
      if(newSavedMovies.length === 0) {
        setIsNoSavedMovies(true)
      } else {
        setIsNoSavedMovies(false)
      }
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
          function(movie) {deleteSavedMovie(movie)}
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