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
      <Main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Promo />
                <AboutProject />
                <Techs />
                <AboutMe />
              </>
            }
          />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element="<div></div>" />
          <Route path="/signup" element="<div></div>" />
          <Route path="*" element="<div></div>" />
        </Routes>
      </Main>

      <Footer />
    </div>
  );
}

export default App;
