import './App.css';

import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

import SearchForm from '../SearchForm/SearchForm';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="App">
      <Header>
        <Logo />
        <Navigation isLoggedIn={isLoggedIn} />
      </Header>

      <Routes>
        <Route
          path="/"
          element={
            <>
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
              <Main>
                <SearchForm />
                <Movies />
              </Main>
              <Footer />
            </>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <>
              <Main>
                <SearchForm />
                <SavedMovies />
              </Main>
              <Footer />
            </>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element="<div></div>" />
        <Route path="/signup" element="<div></div>" />
        <Route path="*" element="<div></div>" />
      </Routes>
    </div>
  );
}

export default App;
