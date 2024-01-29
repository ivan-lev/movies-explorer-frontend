import './Movies.css';

import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Button from '../Button/Button';

import { movies } from '../../variables/movieList';

export default function Movies() {
  return (
    <section className="main__section movies">
      <MoviesCardList list={movies} />
      <Button type="bordered" text="Ещё" onClick={() => console.log('Expand page!')} />
    </section>
  );
}
