import './SearchForm.css';

import React from 'react';
import FilterCheckBox from '../FilterCheckbox/FilterCheckBox';

export default function SearchForm({
  inputValue,
  onType,
  onSearch,
  isShortMeter,
  toggleIsShortMeter
}) {
  return (
    <section className="main__section search-form">
      <form className="search-form__form" onSubmit={onSearch}>
        <div className="search-form__input-line">
          <input
            className="search-form__input"
            placeholder="Фильм"
            onChange={onType}
            value={inputValue}
          ></input>
          <button type="submit" className="search-form__button"></button>
        </div>
        <FilterCheckBox isShortMeter={isShortMeter} toggleIsShortMeter={toggleIsShortMeter} />
      </form>
    </section>
  );
}
