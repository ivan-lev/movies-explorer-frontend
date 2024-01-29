import './SearchForm.css';

import React from 'react';
import FilterCheckBox from '../FilterCheckbox/FilterCheckBox';

export default function SearchForm() {
  return (
    <section className="main__section search-form">
      <form className="search-form__form">
        <div className="search-form__input-line">
          <input className="search-form__input" placeholder="Фильм"></input>
          <button type="submit" className="search-form__button"></button>
        </div>
        <div className="search-form__checkbox-line">
          <FilterCheckBox />
          <span className="search-form__short_meter">Короткометражки</span>
        </div>
      </form>
    </section>
  );
}
