import './Movies.css';

import React, { useEffect, useState } from 'react';
import { useLocalStorageState } from '../../hooks/useLocalStoredState';
import { movieApi } from '../../utils/MovieApi';
import { shortMeterDuration } from '../../variables/variables';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { searchMovies } from '../../utils/utils';

import { ERROR_MESSAGES } from '../../variables/errorMessages';

export default function Movies({ savedMovies }) {
  const [searchQuery, setSearchQuery] = useLocalStorageState('searchQuery', '');
  const [allMovies, setAllMovies] = useState([]);
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
  // after search or shortmeter clicked
  useEffect(() => {
    handleMoviesToDisplay();
  }, [searchResults, isShortMeter]);

  const handleMoviesToDisplay = () => {
    if (isShortMeter) {
      const shortMoviesList = [];
      searchResults.forEach(movie => {
        if (movie.duration <= shortMeterDuration) {
          shortMoviesList.push(movie);
        }
      });
      shortMoviesList.length === 0 ? setIsNothingFound(true) : setIsNothingFound(false);
      setMoviesToDisplay(shortMoviesList);
    } else {
      searchResults.length === 0 ? setIsNothingFound(true) : setIsNothingFound(false);
      setMoviesToDisplay(searchResults);
    }
  };

  const handleSearchMovie = () => {
    setIsNothingFound(false);
    setIsPreloaderShown(true);
    setAllMovies([]);
    setSearchError('');
    movieApi
      .getMovies()
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
        // console.log(allMoviesList);
        setAllMovies(allMoviesList);
        const searchMoviesResults = searchMovies(searchQuery, allMovies);
        setSearchResults(searchMoviesResults);
        setIsPreloaderShown(false);
      })
      .catch(error => {
        console.log(error);
        setSearchError(ERROR_MESSAGES.REQUEST_ERROR);
        setIsPreloaderShown(false);
      });
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
              <MoviesCardList moviesList={moviesToDisplay} keyFieldName="id" />
            )}
          </>
        )}
      </section>
    </>
  );
}
