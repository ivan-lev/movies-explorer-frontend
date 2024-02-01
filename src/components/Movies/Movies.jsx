import './Movies.css';

import React from 'react';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Button from '../Button/Button';

export default function Movies({ moviesList }) {
  return (
    <section className="main__section movies">
      <MoviesCardList list={moviesList} />
      {moviesList.length !== 0 && (
        <Button type="bordered" text="Ещё" onClick={() => console.log('Expand page!')} />
      )}
    </section>
  );
}
