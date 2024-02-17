import './Movies.css';

import React, { useEffect, useState } from 'react';
import { useLocalStorageState } from '../../hooks/useLocalStoredState';
import { movieApi } from '../../utils/MovieApi';
import { shortMeterDuration } from '../../variables/variables';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Button from '../Button/Button';
import { filterMovies } from '../../utils/utils';
import { ERROR_MESSAGES } from '../../variables/errorMessages';

import { displayCardsUtil } from '../../utils/utils.js';

export default function Movies({ savedMovies, setSavedMovies, onDelete }) {
  // logic for displaying movies count
  const displayCards = displayCardsUtil();
  const [displayedMoviesCount, setDisplayedMoviesCount] = useState(displayCards.initialAmount);
  const handleShowMore = () => {
    const countForRowToBeFilled = displayedMoviesCount % displayCards.cardsInRow;
    setDisplayedMoviesCount(displayedMoviesCount + countForRowToBeFilled);
    console.log('countForRowToBeFilled:', countForRowToBeFilled);
    console.log('cardsInRow:', displayCards.cardsInRow);
    setDisplayedMoviesCount(displayedMoviesCount + displayCards.cardsInRow);
    console.log('displayCardsAmount', displayedMoviesCount);
  };

  const [searchQuery, setSearchQuery] = useLocalStorageState('searchQuery', '');
  const [searchResults, setSearchResults] = useLocalStorageState('searchResults', []);
  const [moviesToDisplay, setMoviesToDisplay] = useState([]);
  const [searchError, setSearchError] = useState('');

  const [isNothingFound, setIsNothingFound] = useState(false);
  const [isShortMeter, setIsShortMeter] = useLocalStorageState('isShortMeter', false);
  const [isPreloaderShown, setIsPreloaderShown] = useState(false);

  const toggleIsShortMeter = event => {
    event.preventDefault();
    setIsShortMeter(!isShortMeter);
  };

  // check if something ready to be displayed in searchResults
  // after search or shortmeter or More button clicked
  useEffect(() => {
    handleMoviesToDisplay();
  }, [searchResults, isShortMeter, displayedMoviesCount]);

  const handleMoviesToDisplay = () => {
    if (isShortMeter) {
      const shortMoviesList = [];
      searchResults.forEach(movie => {
        if (movie.duration <= shortMeterDuration) {
          shortMoviesList.push(movie);
        }
      });
      shortMoviesList.length === 0 ? setIsNothingFound(true) : setIsNothingFound(false);
      setMoviesToDisplay(shortMoviesList.slice(0, displayedMoviesCount));
    } else {
      searchResults.length !== 0 && setIsNothingFound(false);
      setMoviesToDisplay(searchResults.slice(0, displayedMoviesCount));
    }
  };

  const handleSearchMovie = () => {
    setIsNothingFound(false);
    setIsPreloaderShown(true);
    setSearchError('');
    movieApi
      .getMovies()
      // retrieve it when fix more button logic
      .then(result => {
        const allMoviesList = result.map(movie => {
          let isSaved = false;
          let _id = null;
          savedMovies.forEach(savedMovie => {
            if (savedMovie.movieId === movie.id) {
              isSaved = true;
              _id = savedMovie._id;
            }
          });
          return { ...movie, isSaved, _id };
        });
        const searchMoviesResults = filterMovies(searchQuery, allMoviesList);
        setSearchResults(searchMoviesResults);
        setIsPreloaderShown(false);
      })
      // in this 'then' we just put all movies in the list
      // to check 'more' button functionality
      // .then(result => {
      //   console.log(result);
      //   setSearchResults(result);
      //   setIsPreloaderShown(false);
      // })
      .catch(error => {
        console.log(error);
        setSearchError(ERROR_MESSAGES.REQUEST_ERROR);
        setIsPreloaderShown(false);
      });
  };

  const addMovieToSaved = movie => {
    setSavedMovies([...savedMovies, movie]);
  };

  const handleDeleteMovie = movie => {
    // find this movie in saved and delete from that list
    const savedMovie = savedMovies.find(savedMovie => savedMovie.movieId === movie.id);
    onDelete(savedMovie);
    // set new search result witn new movie state
    const movieWithNewState = { ...movie, isSaved: false };
    const newSearchResults = searchResults.filter(result => result.id !== movie.id);
    setSearchResults([...newSearchResults, movieWithNewState]);
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
      <section className="main__section movies">
        {isPreloaderShown ? (
          <Preloader />
        ) : (
          <>
            {isNothingFound && (
              <p className="movies__nothing-found">{ERROR_MESSAGES.NOTHING_FOUND}</p>
            )}
            {searchError && <p className="movies__search-error">{ERROR_MESSAGES.REQUEST_ERROR}</p>}
            {moviesToDisplay.length > 0 && (
              <MoviesCardList
                moviesList={moviesToDisplay}
                keyFieldName="id"
                onSave={addMovieToSaved}
                onDelete={handleDeleteMovie}
              />
            )}
          </>
        )}
      </section>
      {moviesToDisplay.length !== 0 && searchResults.length > moviesToDisplay.length && (
        <Button type="bordered" text="Ещё" onClick={handleShowMore} />
      )}
    </>
  );
}
