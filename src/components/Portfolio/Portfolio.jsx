import './Portfolio.css';

import React from 'react';

export default function Portfolio() {
  return (
    <section className="main__section portfolio" id="student">
      <h2 className="portfolio__title">Портфолио</h2>
      <a className="portfolio__link" href="https://ivan-lev.github.io/how-to-learn/">
        Статичный сайт
      </a>
      <div className="portfolio__separator"></div>
      <a className="portfolio__link" href="https://ivan-lev.github.io/russian-travel/">
        Адаптивный сайт
      </a>
      <div className="portfolio__separator"></div>
      <a className="portfolio__link" href="https://quietplace.nomoredomainsmonster.ru/">
        Одностраничное приложение
      </a>
    </section>
  );
}
