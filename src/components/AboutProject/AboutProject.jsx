import './AboutProject.css';

import React from 'react';

export default function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="main__title">О проекте</h2>
      <div className="about-project__content">
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
      </div>
      <table className="about-project__table">
        <thead>
          <tr className="about-project__row">
            <td className="about-project__cell_left about-project__cell_green">1 неделя</td>
            <td className="about-project__cell_right about-project__cell_gray">4 недели</td>
          </tr>
        </thead>
        <tbody>
          <tr className="about-project__row">
            <td className="about-project__cell_left about-project__cell">Back-end</td>
            <td className="about-project__cell_right about-project__cell">Front-end</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
