import './SavedMovies.css';

import React from 'react';

import MoviesCardList from '../MoviesCardList/MoviesCardList';

import { testMovies } from '../../variables/testMovies';

export default function SavedMovies({ moviesList }) {
  const savedMoviesList = testMovies.filter(movie => {
    return movie.isSaved;
  });

  return (
    <section className="main__section saved-movies">
      <MoviesCardList list={savedMoviesList} />
    </section>
  );
}
