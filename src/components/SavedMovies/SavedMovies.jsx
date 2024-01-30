import './SavedMovies.css';

import React from 'react';
import { useMatch } from 'react-router-dom';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Button from '../Button/Button';

import { movies } from '../../variables/movieList';

export default function SavedMovies() {
  const pathMatchedSavedMovies = useMatch('/saved-movies');

  const savedMoviesList = movies.filter(movie => {
    return movie.isSaved;
  });

  return (
    <section className="main__section saved-movies">
      <MoviesCardList list={savedMoviesList} />
      {!pathMatchedSavedMovies && (
        <Button type="bordered" text="Ещё" onClick={() => console.log('Expand page!')} />
      )}
    </section>
  );
}
