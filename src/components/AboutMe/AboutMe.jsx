import './AboutMe.css';

import React from 'react';

import avatar from '../../images/avatar.jpg';

export default function AboutMe() {
  return (
    <section className="main__section about-me" id="student">
      <h2 className="main__title">Студент</h2>
      <div className="about-me__info">
        <p className="about-me__name">Иван</p>
        <p className="about-me__job-age">Фронтенд-разработчик, 36 лет</p>
        <p className="about-me__description">
          Я родился и живу в Екатеринбурге, в своё время закончил факультет Экономики и
          предпринимательства в МГТУ. Я люблю слушать музыку, фотографировать, а ещё увлекаюсь
          китайским чаем. Недавно начал кодить и увлёкся настолько, что прошёл курс по
          веб-разработке.
        </p>
        <a href="https://github.com/ivan-lev" className="about-me__github-link">
          Github
        </a>
        <img className="about-me__avatar" src={avatar} alt="Фото автора"></img>
      </div>
      <p className="about-me__portfolio">Портфолио</p>
      <a className="about-me__link" href="https://ivan-lev.github.io/how-to-learn/">
        Статичный сайт
      </a>
      <div className="about-me__separator"></div>
      <a className="about-me__link" href="https://ivan-lev.github.io/russian-travel/">
        Адаптивный сайт
      </a>
      <div className="about-me__separator"></div>
      <a className="about-me__link" href="https://quietplace.nomoredomainsmonster.ru/">
        Одностраничное приложение
      </a>
    </section>
  );
}
