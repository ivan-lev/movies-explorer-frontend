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

import NotFound from '../NotFound/NotFound';
import Preloader from '../Preloader/Preloader';

import { movieApi } from '../../utils/MovieApi';
import { mainApi } from '../../utils/MainApi';
import { shortMeterDuration } from '../../variables/variables';
import { useLocalStorageState as useStorage } from '../../hooks/useLocalStoredState';

function App() {
  const navigate = useNavigate();

  const [token, setToken] = useStorage('token', '');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isPreloaderShown, setIsPreloaderShown] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  // try to get user data on mount if some token saved in local storage
  useEffect(() => {
    if (token !== '' && token !== undefined && token !== null) {
      getUserInfo();
    }
  }, []);

  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isSearchSuccessful, setIsSearchSuccessful] = useState(true);
  const [isNothingFound, setIsNothingFound] = useState(false);

  const [filmToSearch, setFilmToSearch] = useState('');
  const [isShortMeter, setIsShortMeter] = useState(false);

  const register = (name, email, password) => {
    mainApi
      .createUser(name, email, password)
      .then(response => {
        handleLogin(email, password);
      })
      .catch(error => {
        console.log(error);
        return error.status;
      });
  };

  // USER FUNCTIONS
  const getUserInfo = () => {
    mainApi
      .getUserInfo(token)
      .then(result => {
        setCurrentUser(result);
        setIsLoggedIn(true);
        navigate('/movies');
      })
      .catch(error => {
        console.log('Ошибка проверки токена:', error);
        handleLogout();
      });
  };

  const handleLogin = (email, password) => {
    mainApi
      .authorize(email, password)
      .then(response => {
        setToken(response.token);
        navigate('/movies');
        if (!isLoggedIn) {
          setIsLoggedIn(true);
        }
      })
      .catch(error => {
        console.log(error);
        return error.status;
      });
  };

  const handleSetUserData = data => {
    alert('Отправляем свежие данные: ' + data.name + ', ' + data.email);
    setCurrentUser(data);
  };

  const handleLogout = () => {
    setToken('');
    setIsLoggedIn(false);
    setCurrentUser({});
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
            <>
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
            </>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <>
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
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Header>
                <Logo />
                <Navigation isLoggedIn={isLoggedIn} />
                <UserButtons isLoggedIn={isLoggedIn} />
              </Header>
              <Profile
                currentUser={currentUser}
                onSubmit={handleSetUserData}
                onLogout={handleLogout}
              />
            </>
          }
        />
        <Route path="/signin" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/signup"
          element={
            <Register
              onSubmit={mainApi.createUser}
              onRegister={setCurrentUser}
              register={register}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
