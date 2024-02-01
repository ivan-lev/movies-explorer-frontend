import './FilterCheckBox.css';

import React from 'react';
import { useState } from 'react';

export default function FilterCheckBox() {
  const [isChecked, setIsChecked] = useState(true);

  const toggleIsChecked = e => {
    e.preventDefault();
    setIsChecked(!isChecked);
  };

  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__label" onClick={toggleIsChecked}>
        <input type="checkbox" className="filter-checkbox__input"></input>
        <span
          className={`filter-checkbox__visible ${
            isChecked ? 'filter-checkbox__visible_checked' : 'filter-checkbox__visible_unchecked'
          }`}
        ></span>
      </label>
      <span className="search-form__short_meter">Короткометражки</span>
    </div>
  );
}
