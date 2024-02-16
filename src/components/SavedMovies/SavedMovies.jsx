import './SavedMovies.css';

import React, { useEffect, useState, useContext } from 'react';
import { useLocalStorageState as useStorage } from '../../hooks/useLocalStoredState';
import { mainApi } from '../../utils/MainApi';
import { shortMeterDuration } from '../../variables/variables';
import { ERROR_MESSAGES } from '../../variables/errorMessages';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import CurrentUserContext from '../../contexts/currentUserContext';

export default function SavedMovies({ savedMovies, setSavedMovies }) {
  const token = JSON.parse(localStorage.getItem('token'));
  const currentUser = useContext(CurrentUserContext);
  const [searchQueryInSaved, setSearchQueryInSaved] = useStorage('searchQueryInSaved', '');
  const [isNothingFoundInSaved, setIsNothingFoundInSaved] = useState(false);
  const [isShortMeterInSaved, setIsShortMeterInSaved] = useStorage('isShortMeterInSaved', false);
  // const [savedMovies, setSavedMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState(savedMovies);
  const [moviesToShow, setMoviesToShow] = useState([]);

  useEffect(() => {
    setSavedMovies(savedMovies);
  }, [savedMovies]);

  // set movies to be shown
  useEffect(() => {
    setFilteredSavedMovies(savedMovies);
  }, [savedMovies]);

  // show all films if input is empty
  useEffect(() => {
    if (searchQueryInSaved === '') {
      setFilteredSavedMovies(savedMovies);
    }
  }, [searchQueryInSaved, savedMovies]);

  const toggleIsShortMeter = event => {
    event.preventDefault();
    setIsShortMeterInSaved(!isShortMeterInSaved);
  };

  const updateSavedMovies = _id => {
    const newList = savedMovies.filter(movie => {
      return movie._id !== _id;
    });
    setSavedMovies(newList);
  };

  const handleSearchMovie = () => {
    setIsNothingFoundInSaved(false);
    const filteredByQueryMovies = savedMovies.filter(movie => {
      const searchQueryWords = [];
      searchQueryWords.push(...searchQueryInSaved.toLowerCase().split(' '));
      const movieTitleWords = [];
      movieTitleWords.push(
        ...movie.nameRU.toLowerCase().split(' '),
        ...movie.nameEN.toLowerCase().split(' ')
      );
      if (movieTitleWords.some(word => searchQueryWords.includes(word))) {
        return movie;
      }
    });
    setFilteredSavedMovies(filteredByQueryMovies);
  };

  // check if something ready to be displayed in searchResults
  // after search or shortmeter clicked
  useEffect(() => {
    handleMoviesToShow(filteredSavedMovies, setMoviesToShow);
  }, [filteredSavedMovies, isShortMeterInSaved]);

  const handleMoviesToShow = (list, listSetter) => {
    if (isShortMeterInSaved) {
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
        inputValue={searchQueryInSaved}
        onType={setSearchQueryInSaved}
        onSearch={handleSearchMovie}
        isShortMeter={isShortMeterInSaved}
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
            onDelete={updateSavedMovies}
          />
        )}
      </section>
    </>
  );
}
