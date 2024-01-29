import './App.css';

import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Header>
        <Logo />
        <Navigation isLoggedIn={isLoggedIn} />
      </Header>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
