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

// import SearchForm from '../SearchForm/SearchForm';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import NotFound from '../NotFound/NotFound';

import { mainApi } from '../../utils/MainApi';
import { useLocalStorageState as useStorage } from '../../hooks/useLocalStoredState';
import { ERROR_MESSAGES } from '../../variables/errorMessages';
import CurrentUserContext from '../../contexts/currentUserContext.js';

function App() {
  const navigate = useNavigate();

  const [token, setToken] = useStorage('token', '');
  const [isLoggedIn, setIsLoggedIn] = useStorage('isLoggedIn', false);
  const [currentUser, setCurrentUser] = useState({});

  const [registerError, setRegisterError] = useState('');
  const [loginError, setLoginError] = useState('');
  // const [searchError, setSearchError] = useState(false);

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

  // if email and password are correct,
  // the token will be recieved and saved in local storage
  const handleLogin = (email, password) => {
    setLoginError('');
    mainApi
      .authorize(email, password)
      .then(response => {
        setToken(response.token);
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

  // when token is received - it checked on server
  // and then user is logging in

  const handleGetUserInfo = () => {
    mainApi
      .checkToken(token)
      .then(result => {
        setCurrentUser(result);
        if (!isLoggedIn) {
          setIsLoggedIn(true);
        }
        navigate('/movies');
      })
      .catch(error => {
        console.log('Ошибка проверки токена:', error);
        // handleLogout();
      });
  };

  // this hook is checked if some token was saved in local storage
  useEffect(() => {
    if (token !== '' && token !== undefined && token !== null) {
      handleGetUserInfo();
    }
  }, [token]);

  const handleLogout = () => {
    setToken('');
    localStorage.setItem('searchQuery', JSON.stringify(''));
    localStorage.setItem('searchResults', JSON.stringify([]));
    localStorage.setItem('isShortMeter', JSON.stringify(false));
    localStorage.setItem('searchQueryInSaved', JSON.stringify(''));
    localStorage.setItem('isShortMeterInSaved', JSON.stringify(false));
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate('/');
  };

  // MOVIES LOGIC
  const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const loadSavedMovies = () => {
    mainApi
      .getMovies(token)
      .then(savedMovies => {
        const savedMoviesList = savedMovies.map(movie => {
          return { ...movie, isSaved: true };
        });
        // console.log(savedMoviesList);
        setSavedMovies(savedMoviesList);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadSavedMovies();
    }
  }, [isLoggedIn]);

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
                  <Movies
                    allMovies={allMovies}
                    setAllMovies={setAllMovies}
                    savedMovies={savedMovies}
                    setSavedMovies={setSavedMovies}
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
                  <SavedMovies
                    allMovies={allMovies}
                    setAllMovies={setAllMovies}
                    savedMovies={savedMovies}
                    setSavedMovies={setSavedMovies}
                  />
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
