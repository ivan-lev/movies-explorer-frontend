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
    <label className="filter-checkbox" onClick={toggleIsChecked}>
      <input type="checkbox" className="filter-checkbox__input"></input>
      <span
        className={`filter-checkbox__visible ${
          isChecked ? 'filter-checkbox__visible_checked' : 'filter-checkbox__visible_unchecked'
        }`}
      ></span>
    </label>
  );
}
