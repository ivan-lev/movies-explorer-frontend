import './SavedMovies.css';

// React and hooks
import React, { useEffect, useState, useContext } from 'react';

// components and contexts
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import CurrentUserContext from '../../contexts/currentUserContext';

// utils and variables
import { filterMovies } from '../../utils/utils';
import { SHORTMETER_DURATION } from '../../variables/variables';
import { SEARCH_MESSAGES } from '../../variables/messages';

export default function SavedMovies({ savedMovies, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNothingFound, setIsNothingFound] = useState(false);
  const [isShortMeter, setIsShortMeter] = useState(false);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState(savedMovies);
  const [moviesToDisplay, setMoviesToDisplay] = useState([]);
  const [isSearchInputDisabled, setIsSearchInputDisabled] = useState(false);

  // set movies to be shown
  useEffect(() => {
    setFilteredSavedMovies(savedMovies);
  }, [savedMovies]);

  // show all films if input is empty
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredSavedMovies(savedMovies);
    }
  }, [searchQuery, savedMovies]);

  const toggleIsShortMeter = event => {
    event.preventDefault();
    setIsShortMeter(!isShortMeter);
  };

  const handleSearchMovie = () => {
    setIsSearchInputDisabled(true);
    setIsNothingFound(false);
    const filteredByQueryMovies = filterMovies(searchQuery, savedMovies);
    setFilteredSavedMovies(filteredByQueryMovies);
    setIsSearchInputDisabled(false);
  };

  // check if something ready to be displayed in searchResults
  // after search or shortmeter clicked
  useEffect(() => {
    handleMoviesToDisplay();
  }, [filteredSavedMovies, isShortMeter]);

  const handleMoviesToDisplay = () => {
    if (isShortMeter) {
      const shortMoviesList = filteredSavedMovies.filter(
        movie => movie.duration < SHORTMETER_DURATION
      );
      shortMoviesList.length === 0 ? setIsNothingFound(true) : setIsNothingFound(false);
      setMoviesToDisplay(shortMoviesList);
    } else {
      setMoviesToDisplay(filteredSavedMovies);
      filteredSavedMovies.length !== 0 && setIsNothingFound(false);
    }
  };

  return (
    <>
      <SearchForm
        inputValue={searchQuery}
        onType={setSearchQuery}
        onSearch={handleSearchMovie}
        isShortMeter={isShortMeter}
        toggleIsShortMeter={toggleIsShortMeter}
        isSearchInputDisabled={isSearchInputDisabled}
      />
      <section className="main__section saved-movies">
        {savedMovies.length === 0 && (
          <p className="movies__nothing-found">У вас нет сохранённых фильмов</p>
        )}
        {isNothingFound ? (
          <p className="movies__nothing-found">{SEARCH_MESSAGES.NOTHING_FOUND}</p>
        ) : (
          <MoviesCardList
            moviesList={moviesToDisplay}
            userId={currentUser._id}
            keyFieldName="movieId"
            onDelete={onDelete}
          />
        )}
      </section>
    </>
  );
}
