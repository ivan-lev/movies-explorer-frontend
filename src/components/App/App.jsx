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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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
              <Header>
                <Logo />
                <Navigation isLoggedIn={isLoggedIn} />
                <UserButtons isLoggedIn={isLoggedIn} />
              </Header>
              <Main>
                <SearchForm />
                <SavedMovies />
              </Main>
              <Footer />
            </>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element="<div></div>" />
      </Routes>
    </div>
  );
}

export default App;
