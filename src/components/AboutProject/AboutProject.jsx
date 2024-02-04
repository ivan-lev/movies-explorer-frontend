import './AboutProject.css';

import React from 'react';

export default function AboutProject() {
  return (
    <section className="main__section about-project" id="project">
      <h2 className="main__title">О проекте</h2>
      <article className="about-project__content">
        <div className="about-project__column">
          <span className="about-project__title">Дипломный проект включал 5 этапов</span>
          <span className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
            доработки.
          </span>
        </div>
        <div className="about-project__column">
          <span className="about-project__title">На выполнение диплома ушло 5 недель</span>
          <span className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
            успешно защититься.
          </span>
        </div>
      </article>
      <div className="about-project__statistics">
        <span className="about-project__cell about-project__cell_green">1 неделя</span>
        <span className="about-project__cell about-project__cell_gray">4 недели</span>
        <span className="about-project__cell">Back-end</span>
        <span className="about-project__cell">Front-end</span>
      </div>
    </section>
  );
}
