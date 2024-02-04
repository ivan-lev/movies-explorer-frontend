import './Footer.css';

import React from 'react';
import CurrentYear from '../CurrentYear/CurrentYear';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__info">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__copyright">
        <div className="footer__links">
          <a
            className="footer__link"
            target="_blank"
            rel="noreferrer"
            href="https://practicum.yandex.ru/"
          >
            Яндекс.Практикум
          </a>
          <a
            className="footer__link"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/ivan-lev"
          >
            Github
          </a>
        </div>
        <span className="footer__current-year">
          &copy;&nbsp;
          <CurrentYear />
        </span>
      </div>
    </footer>
  );
}
