import './Movies.css';

import React, { useState } from 'react';
import { showMoreCoef } from '../../utils/showMoreCoef';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Button from '../Button/Button';

export default function Movies({ moviesList }) {
  const coefficient = showMoreCoef();
  const [showMoviesCount, setShowMoviesCount] = useState(coefficient);

  const handleShowMore = () => {
    setShowMoviesCount(showMoviesCount + coefficient);
  };

  return (
    <section className="main__section movies">
      <MoviesCardList list={moviesList.slice(0, showMoviesCount)} />
      {moviesList.length !== 0 && moviesList.length > showMoviesCount && (
        <Button type="bordered" text="Ещё" onClick={handleShowMore} />
      )}
    </section>
  );
}
