import './SearchForm.css';

//React and components
import React, { useState } from 'react';
import FilterCheckBox from '../FilterCheckbox/FilterCheckBox';

// utils
import { validateSearch } from '../../utils/formValidator';

export default function SearchForm({
  inputValue,
  onType,
  onSearch,
  isShortMeter,
  toggleIsShortMeter,
  isSearchInputDisabled
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
      setSearchPlaceholder('Фильм');
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
            disabled={isSearchInputDisabled}
            autoFocus
          ></input>
          <button
            type="submit"
            className={`search-form__button ${
              isSearchInputDisabled ? 'search-form__button_disabled' : ''
            }`}
            onClick={handleSearch}
            disabled={isSearchInputDisabled}
          ></button>
        </div>
        <FilterCheckBox isShortMeter={isShortMeter} toggleIsShortMeter={toggleIsShortMeter} />
      </form>
    </section>
  );
}
