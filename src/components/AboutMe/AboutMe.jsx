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
          Я родился и живу в Екатеринбурге, в своё время закончил факультет Экономики и управления в
          МГТУ. Я люблю слушать музыку, фотографировать, а ещё увлекаюсь китайским чаем. В 2023 году
          начал кодить и настолько загорелся этим делом, что прошёл курс по веб-разработке в
          Практикуме, дошел до и пишу дипломную.
        </p>
        <a
          className="about-me__github-link"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/ivan-lev"
        >
          Github
        </a>
        <img className="about-me__avatar" src={avatar} alt="Фото автора"></img>
      </div>
    </section>
  );
}
