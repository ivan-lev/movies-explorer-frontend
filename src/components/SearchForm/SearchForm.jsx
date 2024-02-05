import './SearchForm.css';

import React, { useState } from 'react';
import FilterCheckBox from '../FilterCheckbox/FilterCheckBox';

import { validateSearch } from '../../utils/formValidator';

export default function SearchForm({
  inputValue,
  onType,
  onSearch,
  isShortMeter,
  toggleIsShortMeter
}) {
  const [searchPlaceholder, setSearchPlaceholder] = useState('Фильм');

  const handleSetFilmToSearch = event => {
    onType(event.target.value);
  };

  const handleSearch = event => {
    event.preventDefault();
    const isDataValid = validateSearch(inputValue, setSearchPlaceholder);
    if (isDataValid) {
      onSearch(inputValue);
    }
  };

  return (
    <section className="main__section search-form">
      <form className="search-form__form" onSubmit={handleSearch}>
        <div className="search-form__input-line">
          <input
            className="search-form__input"
            type="text"
            name="movie"
            placeholder={searchPlaceholder}
            onChange={handleSetFilmToSearch}
            value={inputValue}
          ></input>
          <button type="submit" className="search-form__button"></button>
        </div>
        <FilterCheckBox isShortMeter={isShortMeter} toggleIsShortMeter={toggleIsShortMeter} />
      </form>
    </section>
  );
}
