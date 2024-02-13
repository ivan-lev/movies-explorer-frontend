import './Movies.css';

import React from 'react';

import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import { ERROR_MESSAGES } from '../../variables/errorMessages';

export default function Movies({
  moviesList,
  isPreloaderShown,
  requestError,
  isNothingFound,
  userId
}) {
  return (
    <section className="main__section movies">
      {isPreloaderShown ? (
        <Preloader />
      ) : (
        <>
          {isNothingFound && (
            <p className="movies__nothing-found">{ERROR_MESSAGES.NOTHING_FOUND}</p>
          )}
          {requestError && <p className="movies__search-error">{ERROR_MESSAGES.REQUEST_ERROR}</p>}
          {moviesList.length > 0 && <MoviesCardList moviesList={moviesList} userId={userId} />}
        </>
      )}
    </section>
  );
}
