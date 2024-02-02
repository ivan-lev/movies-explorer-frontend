import './App.css';

import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

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
  const [moviesList, setMoviesList] = useState([]);
  const [isPreloaderShown, setIsPreloaderShown] = useState(false);

  const handleLoadAllMoviesList = () => {
    if (moviesList.length === 0) {
      setIsPreloaderShown(true);
    }
    setTimeout(() => {
      setIsPreloaderShown(false);
      setMoviesList(testMovies);
    }, 1500);
  };

  const handleSearch = () => {};

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
                <SearchForm onSearch={handleSearch} />
                {isPreloaderShown && <Preloader />}
                <Movies onLoad={handleLoadAllMoviesList} moviesList={moviesList} />
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
                <SearchForm onSearch={handleSearch} />
                {isPreloaderShown && <Preloader />}
                <SavedMovies onLoad={handleLoadAllMoviesList} moviesList={moviesList} />
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
              <Profile />
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
