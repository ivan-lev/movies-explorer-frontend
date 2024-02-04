import './SavedMovies.css';

import React, { useEffect } from 'react';

import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({ moviesList }) {
  const savedMoviesList = moviesList.filter(movie => {
    return movie.isSaved;
  });

  return (
    <section className="main__section saved-movies">
      <MoviesCardList list={savedMoviesList} />
    </section>
  );
}
