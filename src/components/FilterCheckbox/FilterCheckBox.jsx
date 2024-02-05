import './FilterCheckBox.css';

import React from 'react';

export default function FilterCheckBox({ isShortMeter, toggleIsShortMeter }) {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__label" onClick={toggleIsShortMeter}>
        <input type="checkbox" className="filter-checkbox__input"></input>
        <span
          className={`filter-checkbox__visible ${
            isShortMeter ? 'filter-checkbox__visible_checked' : 'filter-checkbox__visible_unchecked'
          }`}
        ></span>
      </label>
      <span className="filter-checkbox__caption">Короткометражки</span>
    </div>
  );
}
