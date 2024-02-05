import './Portfolio.css';

import React from 'react';

export default function Portfolio() {
  return (
    <section className="main__section portfolio" id="student">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
            href="https://ivan-lev.github.io/how-to-learn/"
          >
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
            href="https://ivan-lev.github.io/russian-travel/"
          >
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
            href="https://quietplace.nomoredomainsmonster.ru/"
          >
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
}
