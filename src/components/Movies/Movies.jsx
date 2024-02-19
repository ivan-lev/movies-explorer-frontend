import './Movies.css';

//React and hooks
import React, { useEffect, useState } from 'react';
import { useLocalStorageState } from '../../hooks/useLocalStoredState';
import { useWindowSize } from '../../hooks/useWindowSize.jsx';

// components
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Button from '../Button/Button';

// utils and variables
import { movieApi } from '../../utils/MovieApi';
import { shortMeterDuration } from '../../variables/variables';
import { filterMovies } from '../../utils/utils';
import { layoutConfig } from '../../utils/utils.js';
import { ERROR_MESSAGES } from '../../variables/errorMessages';

export default function Movies({ searchResults, setSearchResults, savedMovies, onSave, onDelete }) {
  // logic for displaying movies count
  const width = useWindowSize();
  const config = layoutConfig(width);
  const [layout, setLayout] = useState(config.layout);
  const [displayedMoviesCount, setDisplayedMoviesCount] = useState(config.initialAmount);
  const [cardsInRow, setCardsInRow] = useState(config.cardsInRow);

  useEffect(() => {
    // check if layout should to be changed and set new parameters
    const newConfig = layoutConfig(width);
    if (newConfig.layout !== layout) {
      setLayout(newConfig.layout);
      setDisplayedMoviesCount(newConfig.initialAmount);
      setCardsInRow(newConfig.cardsInRow);
    }
  }, [width]);
  // end of logic for displaying movies count

  const [searchQuery, setSearchQuery] = useLocalStorageState('searchQuery', '');
  const [moviesToDisplay, setMoviesToDisplay] = useState([]);
  const [isShortMeter, setIsShortMeter] = useLocalStorageState('isShortMeter', false);

  const [isPreloaderShown, setIsPreloaderShown] = useState(false);
  const [isNothingFound, setIsNothingFound] = useState(false);
  const [searchError, setSearchError] = useState('');

  const toggleIsShortMeter = event => {
    event.preventDefault();
    setIsShortMeter(!isShortMeter);
  };

  const handleShowMore = () => {
    setDisplayedMoviesCount(displayedMoviesCount + cardsInRow);
  };

  // on mount check if some stored results was added to saved films
  // and fulfill them with _id fileds and thruthy 'isSaved' states
  useEffect(() => {
    const updatedSearchResults = searchResults.map(movie => {
      savedMovies.forEach(savedMovie => {
        if (savedMovie.movieId === movie.id) {
          movie.isSaved = true;
          movie._id = savedMovie._id;
        }
      });
      return movie;
    });
    setSearchResults(updatedSearchResults);
  }, []);

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
      // searchResults.length !== 0 && setIsNothingFound(false);
      // searchResults.length === 0 ? setIsNothingFound(true) : setIsNothingFound(false);
      setMoviesToDisplay(searchResults.slice(0, displayedMoviesCount));
      searchResults.length !== 0 && setIsNothingFound(false);
    }
  };

  const handleSearchMovie = () => {
    setIsNothingFound(false);
    setIsPreloaderShown(true);
    setSearchError('');
    movieApi
      .getMovies()
      // find movies, compare them with saved, and fullfill with _id's and isSaved properties
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
        searchMoviesResults.length === 0 && setIsNothingFound(true);
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
                onSave={onSave}
                onDelete={onDelete}
              />
            )}
          </>
        )}
      </section>
      {searchResults.length > displayedMoviesCount && (
        <Button type="bordered" text="Ещё" onClick={handleShowMore} />
      )}
    </>
  );
}
