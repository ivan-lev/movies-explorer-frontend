import './Movies.css';

import React from 'react';

import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies({ moviesList, isPreloaderShown, userId }) {
  return (
    <section className="main__section movies">
      {isPreloaderShown ? (
        <Preloader />
      ) : moviesList === null ? (
        <p>Ничего не найдено</p>
      ) : (
        <MoviesCardList moviesList={moviesList} userId={userId} />
      )}
    </section>
  );
}
