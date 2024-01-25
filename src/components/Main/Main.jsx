import './Main.css';

import React from 'react';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';

export default function Main() {
  return (
    <main className="main">
      <Promo />
      <AboutProject />
    </main>
  );
}
