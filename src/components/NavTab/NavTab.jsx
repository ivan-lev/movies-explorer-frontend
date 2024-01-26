import './NavTab.css';

import React from 'react';

export default function NavTab() {
  return (
    <menu className="nav-tab">
      <a className="nav-tab__link" href="#project">
        О проекте
      </a>
      <a className="nav-tab__link" href="#techs">
        Технологии
      </a>
      <a className="nav-tab__link" href="#student">
        Студент
      </a>
    </menu>
  );
}
