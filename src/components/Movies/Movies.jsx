import './Movies.css';

import React, { useEffect, useState } from 'react';
import { useLocalStorageState } from '../../hooks/useLocalStoredState';
import { movieApi } from '../../utils/MovieApi';
import { shortMeterDuration } from '../../variables/variables';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { filterMovies } from '../../utils/utils';

import { ERROR_MESSAGES } from '../../variables/errorMessages';

export default function Movies({ savedMovies, setSavedMovies }) {
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
  // after search or shortmeter clicked
  // useEffect(() => {
  //   handleMoviesToDisplay();
  // }, [searchResults, isShortMeter]);
  useEffect(() => {
    handleMoviesToDisplay();
  });

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
      searchResults.length !== 0 && setIsNothingFound(false);
      setMoviesToDisplay(searchResults);
    }
  };

  const handleSearchMovie = () => {
    setIsNothingFound(false);
    setIsPreloaderShown(true);
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
        const searchMoviesResults = filterMovies(searchQuery, allMoviesList);
        setSearchResults(searchMoviesResults);
        setIsPreloaderShown(false);
      })
      .catch(error => {
        console.log(error);
        setSearchError(ERROR_MESSAGES.REQUEST_ERROR);
        setIsPreloaderShown(false);
      });
  };

  const addMovieToSaved = movie => {
    setSavedMovies([...savedMovies, movie]);
  };

  // const addMovieToSaved = movie => {
  //   mainApi
  //     .saveMovie(movie)
  //     .then(savedCard => {
  //       // get card, set is as saved, and push to savedMovies array
  //       savedCard.isSaved = true;
  //       setSavedMovies([...savedMovies, savedCard]);
  //       // set new searchResults with updated card and set it
  //       const newMovieState = { ...movie, isSaved: true, _id: savedCard._id };
  //       const updatedSearchResults = searchResults.map(searchedElement => {
  //         if (searchedElement.id !== savedCard.movieId) {
  //           return searchedElement;
  //         }
  //       });
  //       console.log('updatedSearchResults:', updatedSearchResults);
  //       setSearchResults([updatedSearchResults, newMovieState]);
  //       console.log('searchResults:', searchResults);
  //       // movie.isSaved = true;
  //       // movie._id = savedCard._id;
  //     })
  //     .catch(error => console.log(error));
  // };

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
              />
            )}
          </>
        )}
      </section>
    </>
  );
}
