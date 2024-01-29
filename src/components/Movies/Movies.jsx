import './Movies.css';

import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import { movies } from '../../variables/movieList';

export default function Movies() {
  return (
    <section className="main__section movies">
      <MoviesCardList list={movies} />
    </section>
  );
}
