import './App.css';

// React and hooks
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useLocalStorageState as useStorage } from '../../hooks/useLocalStoredState';

// components
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
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import NotFound from '../NotFound/NotFound';

//utils and contexts
import CurrentUserContext from '../../contexts/currentUserContext.js';
import { mainApi } from '../../utils/MainApi';
import { LOGIN_ERRORS, REGISTER_ERRORS } from '../../variables/errorMessages';

function App() {
  const navigate = useNavigate();

  const [token, setToken] = useStorage('token', '');
  const [isLoggedIn, setIsLoggedIn] = useStorage('isLoggedIn', false);
  const [currentUser, setCurrentUser] = useState({});

  const [registerError, setRegisterError] = useState('');
  const [loginError, setLoginError] = useState('');

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
            setRegisterError(REGISTER_ERRORS.USER_EXISTS);
            break;
          case 500:
            setRegisterError(REGISTER_ERRORS.COULD_NOT_REGISTER);
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
            setLoginError(LOGIN_ERRORS.WRONG_CREDEINTIALS);
            break;
          case 500:
            setRegisterError(LOGIN_ERRORS.LOGIN_ERROR);
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
          navigate('/movies');
        }
      })
      .catch(error => {
        // switch (errorStatus) {
        //   case 401:
        //     setLoginError(LOGIN_ERRORS.WRONG_CREDEINTIALS);
        //     break;
        //   case 500:
        //     setRegisterError(LOGIN_ERRORS.LOGIN_ERROR);
        // }
        console.log('Ошибка проверки токена:', error);
        handleLogout();
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
    setCurrentUser({});
    setSearchResults([]);
    setIsLoggedIn(false);
    localStorage.removeItem('searchQuery');
    localStorage.removeItem('searchResults');
    localStorage.removeItem('isShortMeter');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    navigate('/');
  };

  // MOVIES LOGIC
  const [savedMovies, setSavedMovies] = useStorage('savedMovies', []);
  const [searchResults, setSearchResults] = useStorage('searchResults', []);

  const loadSavedMovies = () => {
    mainApi
      .getMovies(token)
      .then(savedMovies => {
        const savedMoviesList = savedMovies.map(movie => {
          return { ...movie, isSaved: true };
        });
        setSavedMovies(savedMoviesList);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadSavedMovies();
    }
  }, [isLoggedIn]);

  const saveMovie = movie => {
    setSavedMovies([...savedMovies, movie]);
  };

  const deleteMovie = movie => {
    mainApi
      .deleteMovie(movie._id)
      .then(result => {
        // if the movies was saved - update it's 'isSaved' state to false in searchResults
        const newSearchResults = searchResults.map(searchedMovie => {
          if (searchedMovie.id === movie.id) {
            searchedMovie.isSaved = false;
          }
          return searchedMovie;
        });
        setSearchResults([...newSearchResults]);
        // then remove movie from savedMovies
        setSavedMovies(savedMovies =>
          savedMovies.filter(savedMovie => savedMovie._id !== movie._id)
        );
      })
      .catch(error => console.error(error));
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
                  <Movies
                    searchResults={searchResults}
                    setSearchResults={setSearchResults}
                    savedMovies={savedMovies}
                    onSave={saveMovie}
                    onDelete={deleteMovie}
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
                  <SavedMovies savedMovies={savedMovies} onDelete={deleteMovie} />
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
