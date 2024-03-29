import './Techs.css';

import React from 'react';
import TechPlate from '../TechPlate/TechPlate';
import { techStack } from '../../variables/techStack';

export default function Techs() {
  return (
    <section className="main__section techs" id="techs">
      <h2 className="main__title">Технологии</h2>
      <p className="techs__title">7 технологий</p>
      <p className="techs__subtitle">
        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
      </p>

      <ul className="techs__list">
        {techStack.map(element => (
          <TechPlate key={element} tech={element} />
        ))}
      </ul>
    </section>
  );
}
