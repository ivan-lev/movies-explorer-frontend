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
import { errorMessages } from '../../variables/errorMessages';
import CurrentUserContext from '../../contexts/currentUserContext.js';

function App() {
  const navigate = useNavigate();

  const [token, setToken] = useStorage('token', '');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPreloaderShown, setIsPreloaderShown] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [registerError, setRegisterError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [profileUpdateError, setProfileUpdateError] = useState('');

  // try to get user data on mount if some token saved in local storage
  useEffect(() => {
    if (token !== '' && token !== undefined && token !== null) {
      handleGetUserInfo();
    }
  }, [token]);

  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isSearchSuccessful, setIsSearchSuccessful] = useState(true);
  const [isNothingFound, setIsNothingFound] = useState(false);

  const [filmToSearch, setFilmToSearch] = useState('');
  const [isShortMeter, setIsShortMeter] = useState(false);

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
            setRegisterError(errorMessages.userExist);
            break;
          case 500:
            setRegisterError(errorMessages.couldNotRegister);
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
      })
      .catch(error => {
        console.log(error);
        const errorStatus = error.status;
        switch (errorStatus) {
          case 401:
            setLoginError(errorMessages.loginWrongCredentials);
            break;
          case 500:
            setRegisterError(errorMessages.loginError);
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
        navigate('/movies');
      })
      .catch(error => {
        console.log('Ошибка проверки токена:', error);
        handleLogout();
      });
  };

  const handleSetUserInfo = (name, email, token) => {
    setProfileUpdateError('');
    mainApi
      .setUserInfo(name, email, token)
      .then(response => setCurrentUser(response))
      .catch(error => {
        console.log(error);
        setProfileUpdateError(errorMessages.profileUpdateError);
      });
  };

  const handleLogout = () => {
    setToken('');
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate('/');
  };

  // MOVIES FUNCTIONS
  const handleSearch = () => {
    setIsPreloaderShown(true);
    setSearchResults([]);

    movieApi
      .getMovies()
      .then(result => {
        setSearchResults(result);
        setIsSearchSuccessful(true);
        if (result.length === 0) {
          setIsNothingFound(true);
        } else {
          setIsNothingFound(false);
        }
      })
      .catch(error => {
        console.log(error);
        setIsSearchSuccessful(false);
      });
  };

  const handleMoviesToShow = list => {
    if (isShortMeter) {
      const shortMoviesList = [];
      list.forEach(movie => {
        if (movie.duration <= shortMeterDuration) {
          shortMoviesList.push(movie);
        }
      });
      setFilteredResults(shortMoviesList);
    } else {
      setFilteredResults(list);
    }

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
                    inputValue={filmToSearch}
                    onType={setFilmToSearch}
                    onSearch={handleSearch}
                    isShortMeter={isShortMeter}
                    toggleIsShortMeter={toggleIsShortMeter}
                  />
                  <Movies
                    moviesList={filteredResults}
                    isPreloaderShown={isPreloaderShown}
                    isSearchSuccessful={isSearchSuccessful}
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
                    inputValue={filmToSearch}
                    onType={setFilmToSearch}
                    onSearch={handleSearch}
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
                <Profile
                  token={token}
                  onUpdate={handleSetUserInfo}
                  onLogout={handleLogout}
                  error={profileUpdateError}
                />
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
