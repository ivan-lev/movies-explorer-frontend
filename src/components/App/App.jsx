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

function App() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isPreloaderShown, setIsPreloaderShown] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: 'Иван',
    email: 'ivanlev@mail.com',
    _id: '12345'
  });

  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isSearchSuccessful, setIsSearchSuccessful] = useState(true);
  const [isNothingFound, setIsNothingFound] = useState(false);

  const [filmToSearch, setFilmToSearch] = useState('');
  const [isShortMeter, setIsShortMeter] = useState(false);

  const handleSetUserData = data => {
    alert('Отправляем свежие данные: ' + data.name + ', ' + data.email);
    setCurrentUser(data);
  };

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

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate('/');
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
        <Route path="/signin" element={<Login />} />
        <Route
          path="/signup"
          element={<Register onSubmit={mainApi.createUser} onRegister={setCurrentUser} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
