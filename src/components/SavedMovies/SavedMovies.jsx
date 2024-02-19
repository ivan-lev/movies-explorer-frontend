import './SavedMovies.css';

// React and hooks
import React, { useEffect, useState, useContext } from 'react';
import { useLocalStorageState as useStorage } from '../../hooks/useLocalStoredState';

// components and contexts
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import CurrentUserContext from '../../contexts/currentUserContext';

// utils and variables
import { filterMovies } from '../../utils/utils';
import { shortMeterDuration } from '../../variables/variables';
import { ERROR_MESSAGES } from '../../variables/errorMessages';

export default function SavedMovies({ savedMovies, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNothingFoundInSaved, setIsNothingFoundInSaved] = useState(false);
  const [isShortMeter, setIsShortMeter] = useState(false);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState(savedMovies);
  const [moviesToShow, setMoviesToShow] = useState([]);

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
    setIsNothingFoundInSaved(false);
    const filteredByQueryMovies = filterMovies(searchQuery, savedMovies);
    setFilteredSavedMovies(filteredByQueryMovies);
  };

  // check if something ready to be displayed in searchResults
  // after search or shortmeter clicked
  useEffect(() => {
    handleMoviesToShow(filteredSavedMovies, setMoviesToShow);
  }, [filteredSavedMovies, isShortMeter]);

  const handleMoviesToShow = (list, listSetter) => {
    if (isShortMeter) {
      const shortMoviesList = [];
      list.forEach(movie => {
        if (movie.duration <= shortMeterDuration) {
          shortMoviesList.push(movie);
        }
      });
      shortMoviesList.length === 0
        ? setIsNothingFoundInSaved(true)
        : setIsNothingFoundInSaved(false);
      listSetter(shortMoviesList);
    } else {
      list.length !== 0 && setIsNothingFoundInSaved(false);

      listSetter(list);
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
      />
      <section className="main__section saved-movies">
        {isNothingFoundInSaved ? (
          <p className="movies__nothing-found">{ERROR_MESSAGES.NOTHING_FOUND}</p>
        ) : (
          <MoviesCardList
            moviesList={moviesToShow}
            userId={currentUser._id}
            keyFieldName="movieId"
            onDelete={onDelete}
          />
        )}
      </section>
    </>
  );
}
