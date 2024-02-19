import './SavedMovies.css';

// React and hooks
import React, { useEffect, useState, useContext } from 'react';

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
  const [isNothingFound, setIsNothingFound] = useState(false);
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
    setIsNothingFound(false);
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
      shortMoviesList.length === 0 ? setIsNothingFound(true) : setIsNothingFound(false);
      listSetter(shortMoviesList);
    } else {
      list.length === 0 ? setIsNothingFound(true) : setIsNothingFound(false);

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
        {savedMovies.length === 0 && (
          <p className="movies__nothing-found">У вас нет сохранённых фильмов</p>
        )}
        {isNothingFound ? (
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
