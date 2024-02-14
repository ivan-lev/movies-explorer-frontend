import './App.css';

import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import UserButtons from '../UserButtons/UserButtons';

import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

import SearchForm from '../SearchForm/SearchForm';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import NotFound from '../NotFound/NotFound';
import Preloader from '../Preloader/Preloader';

import { movieApi } from '../../utils/MovieApi';
import { mainApi } from '../../utils/MainApi';
import { shortMeterDuration } from '../../variables/variables';
import { useLocalStorageState as useStorage } from '../../hooks/useLocalStoredState';
import { ERROR_MESSAGES } from '../../variables/errorMessages';
import CurrentUserContext from '../../contexts/currentUserContext.js';

function App() {
  const navigate = useNavigate();

  const [token, setToken] = useStorage('token', '');
  const [isLoggedIn, setIsLoggedIn] = useStorage('isLoggedIn', false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [registerError, setRegisterError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [searchError, setSearchError] = useState(false);

  // try to get user data on mount if some token saved in local storage
  useEffect(() => {
    if (token !== '' && token !== undefined && token !== null) {
      handleGetUserInfo();
    }
  }, []);

  // USER FUNCTIONS
  const register = (name, email, password) => {
    setRegisterError('');
    mainApi
      .createUser(name, email, password)
      .then(response => {
        handleLogin(email, password);
      })
      .catch(error => {
        console.log(error);
        const errorStatus = error.status;
        switch (errorStatus) {
          case 409:
            setRegisterError(ERROR_MESSAGES.USER_EXISTS);
            break;
          case 500:
            setRegisterError(ERROR_MESSAGES.COULD_NOT_REGISTER);
        }
        return error.status;
      });
  };

  const handleLogin = (email, password) => {
    setLoginError('');
    mainApi
      .authorize(email, password)
      .then(response => {
        setToken(response.token);
        if (!isLoggedIn) {
          setIsLoggedIn(true);
        }
        navigate('/movies');
      })
      .catch(error => {
        console.log(error);
        const errorStatus = error.status;
        switch (errorStatus) {
          case 401:
            setLoginError(ERROR_MESSAGES.WRONG_CREDEINTIALS);
            break;
          case 500:
            setRegisterError(ERROR_MESSAGES.LOGIN_ERROR);
        }
        return error.status;
      });
  };

  const handleGetUserInfo = () => {
    mainApi
      .getUserInfo(token)
      .then(result => {
        setCurrentUser(result);
        if (!isLoggedIn) {
          setIsLoggedIn(true);
        }
      })
      .catch(error => {
        console.log('Ошибка проверки токена:', error);
        handleLogout();
      });
  };

  const handleLogout = () => {
    setToken('');
    setLastSearchQuery('');
    setLastSearchResults('');
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate('/');
  };

  // MOVIES FUNCTIONS AND VARIABLES

  const [lastSearchQuery, setLastSearchQuery] = useStorage('lastMovieQuery', '');
  const [lastSearchResults, setLastSearchResults] = useStorage('lastQueryResults', '');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isNothingFound, setIsNothingFound] = useState(false);
  const [isShortMeter, setIsShortMeter] = useState(false);
  const [isPreloaderShown, setIsPreloaderShown] = useState(false);

  const handleSearchMovie = () => {
    setIsPreloaderShown(true);
    setSearchResults([]);

    movieApi
      .getMovies()
      .then(allMovies => {
        const filteredByQueryMovies = allMovies.filter(movie => {
          const searchQueryWords = [];
          searchQueryWords.push(...searchQuery.toLowerCase().split(' '));
          const movieTitleWords = [];
          movieTitleWords.push(
            ...movie.nameRU.toLowerCase().split(' '),
            ...movie.nameEN.toLowerCase().split(' ')
          );
          if (movieTitleWords.some(word => searchQueryWords.includes(word))) {
            return movie;
          }
        });
        if (filteredByQueryMovies.length === 0) {
          setSearchResults([]);
          setIsNothingFound(true);
        } else {
          setSearchResults(filteredByQueryMovies);
          setIsNothingFound(false);
        }
        setSearchError(false);
      })
      .catch(error => {
        console.log(error);
        setSearchError(true);
      });
    setSearchQuery('');
  };

  const handleMoviesToShow = list => {
    if (isShortMeter) {
      const shortMoviesList = [];
      list.forEach(movie => {
        if (movie.duration <= shortMeterDuration) {
          shortMoviesList.push(movie);
        }
      });
      // shortMoviesList.length === 0 ? setIsNothingFound(true) : setIsNothingFound(false);
      shortMoviesList.length === 0 && setIsNothingFound(true);
      setFilteredResults(shortMoviesList);
    } else {
      //list.length === 0 ? setIsNothingFound(true) : setIsNothingFound(false);
      list.length !== 0 && setIsNothingFound(false);

      setFilteredResults(list);
    }
    // filteredResults.length === 0 ? setIsNothingFound(true) : setIsNothingFound(false);

    setIsPreloaderShown(false);
  };

  // check if something ready to be displayed in MoviesList
  useEffect(() => {
    handleMoviesToShow(searchResults);
  }, [searchResults, isShortMeter]);

  const toggleIsShortMeter = event => {
    event.preventDefault();
    setIsShortMeter(!isShortMeter);
  };

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header>
                  <Logo />
                  <Navigation isLoggedIn={isLoggedIn} />
                  <UserButtons isLoggedIn={isLoggedIn} />
                </Header>
                <Main>
                  <Promo />
                  <AboutProject />
                  <Techs />
                  <AboutMe />
                  <Portfolio />
                </Main>
                <Footer />
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Header>
                  <Logo />
                  <Navigation isLoggedIn={isLoggedIn} />
                  <UserButtons isLoggedIn={isLoggedIn} />
                </Header>
                <Main>
                  <SearchForm
                    inputValue={searchQuery}
                    onType={setSearchQuery}
                    onSearch={handleSearchMovie}
                    isShortMeter={isShortMeter}
                    toggleIsShortMeter={toggleIsShortMeter}
                  />
                  <Movies
                    moviesList={filteredResults}
                    isPreloaderShown={isPreloaderShown}
                    requestError={searchError}
                    isNothingFound={isNothingFound}
                    userId={currentUser._id}
                  />
                </Main>
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Header>
                  <Logo />
                  <Navigation isLoggedIn={isLoggedIn} />
                  <UserButtons isLoggedIn={isLoggedIn} />
                </Header>
                <Main>
                  <SearchForm
                    inputValue={searchQuery}
                    onType={setSearchQuery}
                    onSearch={handleSearchMovie}
                    isShortMeter={isShortMeter}
                    toggleIsShortMeter={toggleIsShortMeter}
                  />
                  {isPreloaderShown && <Preloader />}
                  <SavedMovies filteredResults={filteredResults} userId={currentUser._id} />
                </Main>
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Header>
                  <Logo />
                  <Navigation isLoggedIn={isLoggedIn} />
                  <UserButtons isLoggedIn={isLoggedIn} />
                </Header>
                <Profile token={token} setCurrentUser={setCurrentUser} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<Login onLogin={handleLogin} error={loginError} />} />
          <Route path="/signup" element={<Register register={register} error={registerError} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
