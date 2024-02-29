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
import { filterMovies } from '../../utils/utils';
import { layoutConfig } from '../../utils/utils.js';
import { SEARCH_MESSAGES } from '../../variables/messages.js';

export default function Movies({
  allMovies,
  setAllMovies,
  searchResults,
  setSearchResults,
  savedMovies,
  onSave,
  onDelete,
  token,
  handleShowTrailer
}) {
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
  const [isShortMeter, setIsShortMeter] = useLocalStorageState('isShortMeter', false);
  const [isShortMeterClicked, setIsShortMeterClicked] = useState(false);
  const [isNothingFound, setIsNothingFound] = useState(false);
  const [isPreloaderShown, setIsPreloaderShown] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [isSearchInputDisabled, setIsSearchInputDisabled] = useState(false);

  const toggleIsShortMeter = event => {
    event.preventDefault();
    setIsShortMeter(!isShortMeter);
    setIsShortMeterClicked(true);
  };

  const handleShowMore = () => {
    setDisplayedMoviesCount(displayedMoviesCount + cardsInRow);
  };

  useEffect(() => {
    if (isShortMeterClicked) {
      handleSearchMovies();
      setIsShortMeterClicked(false);
    }
  }, [isShortMeterClicked]);

  const handleSearchMovies = () => {
    setDisplayedMoviesCount(config.initialAmount);
    setIsSearchInputDisabled(true);
    setIsNothingFound(false);
    setIsPreloaderShown(true);
    setSearchError(false);

    // if all movies list is not empty - seach there
    // else download fresh movies list, search there, and save it
    if (allMovies.length !== 0) {
      const filteredResults = filterMovies(searchQuery, allMovies, isShortMeter);
      setSearchResults(filteredResults);
      if (filteredResults.length === 0) {
        setIsNothingFound(true);
      }
      setIsPreloaderShown(false);
      setIsSearchInputDisabled(false);
    } else {
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
          setAllMovies(allMoviesList);
          const filteredResults = filterMovies(searchQuery, allMoviesList, isShortMeter);
          setSearchResults(filteredResults);
          if (filteredResults.length === 0) {
            setIsNothingFound(true);
          }
          setIsPreloaderShown(false);
        })
        .catch(error => {
          console.log(error);
          setSearchError(true);
          setIsPreloaderShown(false);
        })
        .finally(() => {
          setIsSearchInputDisabled(false);
        });
    }
  };

  return (
    <>
      <SearchForm
        inputValue={searchQuery}
        onType={setSearchQuery}
        onSearch={handleSearchMovies}
        isShortMeter={isShortMeter}
        toggleIsShortMeter={toggleIsShortMeter}
        isSearchInputDisabled={isSearchInputDisabled}
      />
      <section className="main__section movies">
        {isPreloaderShown ? (
          <Preloader />
        ) : (
          <>
            {isNothingFound && (
              <p className="movies__nothing-found">{SEARCH_MESSAGES.NOTHING_FOUND}</p>
            )}
            {searchError && <p className="movies__search-error">{SEARCH_MESSAGES.REQUEST_ERROR}</p>}
            {searchResults.length > 0 && (
              <MoviesCardList
                moviesList={searchResults.slice(0, displayedMoviesCount)}
                keyFieldName="id"
                onSave={onSave}
                onDelete={onDelete}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                token={token}
                handleShowTrailer={handleShowTrailer}
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
