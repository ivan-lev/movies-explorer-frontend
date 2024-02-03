import './Movies.css';

import React, { useEffect, useState } from 'react';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Button from '../Button/Button';

export default function Movies({ onLoad, moviesList }) {
  const windowInnerWidth = window.innerWidth;
  let coefficient = 12;
  if (windowInnerWidth <= 768) {
    coefficient = 8;
  }
  if (windowInnerWidth <= 320) {
    coefficient = 5;
  }
  const [showMoviesCount, setShowMoviesCount] = useState(coefficient);

  const handleShowMore = () => {
    setShowMoviesCount(showMoviesCount + coefficient);
  };

  useEffect(() => {
    onLoad();
  }, [onLoad]);

  return (
    <section className="main__section movies">
      <MoviesCardList list={moviesList.slice(0, showMoviesCount)} />
      {moviesList.length !== 0 && moviesList.length > showMoviesCount && (
        <Button type="bordered" text="Ещё" onClick={handleShowMore} />
      )}
    </section>
  );
}
