import './App.css';

import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

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

import { testMovies } from '../../variables/testMovies';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isPreloaderShown, setIsPreloaderShown] = useState(false);

  const [user, setUser] = useState({ name: 'Иван', email: 'ivanlev@mail.com', _id: '12345' });
  const handleSetUserData = data => {
    alert('Отправляем свежие данные: ' + data.name + ', ' + data.email);
    setUser(data);
  };

  const [filmToSearch, setFilmToSearch] = useState('');
  const [isShortMeter, setIsShortMeter] = useState(false);
  const handleSearch = () => {
    alert(`Давайте поищем ${isShortMeter ? 'короткометражный ' : ''}фильм ${filmToSearch}`);
  };
  const toggleIsShortMeter = event => {
    event.preventDefault();
    setIsShortMeter(!isShortMeter);
  };

  const [moviesList, setMoviesList] = useState([]);
  useEffect(() => {
    if (moviesList.length === 0) {
      setIsPreloaderShown(true);
    }
    setTimeout(() => {
      setIsPreloaderShown(false);
      if (isShortMeter) {
        const shortMovies = [];
        testMovies.forEach(movie => {
          if (movie.duration <= 50) {
            shortMovies.push(movie);
          }
        });

        setMoviesList(shortMovies);
        return;
      }
      setMoviesList(testMovies);
    }, 1500);
  }, [isShortMeter, moviesList]);

  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({});
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
                <Movies moviesList={moviesList} userId={user._id} />
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
                <SavedMovies moviesList={moviesList} userId={user._id} />
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
              </Header>
              <Profile user={user} onSubmit={handleSetUserData} onLogout={handleLogout} />
            </>
          }
        />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
