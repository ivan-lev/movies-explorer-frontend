import './Movies.css';

import React from 'react';

import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import { errors } from '../../variables/errors';

export default function Movies({
  moviesList,
  isPreloaderShown,
  isSearchSuccessful,
  isNothingFound,
  userId
}) {
  return (
    <section className="main__section movies">
      {isPreloaderShown ? (
        <Preloader />
      ) : (
        <>
          {isNothingFound && <p className="movies__nothing-found">{errors.nothingFound}</p>}
          {!isSearchSuccessful && <p className="movies__search-error">{errors.requestError}</p>}
          {moviesList.length > 0 && <MoviesCardList moviesList={moviesList} userId={userId} />}
        </>
      )}
    </section>
  );
}
