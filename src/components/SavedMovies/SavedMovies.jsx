import './SavedMovies.css';

import React, { useEffect } from 'react';

import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({ moviesList, userId }) {
  const savedMoviesList = moviesList.filter(movie => {
    return movie.owner === userId;
  });

  return (
    <section className="main__section saved-movies">
      <MoviesCardList moviesList={savedMoviesList} userId={userId} />
    </section>
  );
}
