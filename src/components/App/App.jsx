import './App.css';

import { useState } from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
