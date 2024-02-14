import './MoviesCardList.css';

import React, { useState } from 'react';

import MovieCard from '../MoviesCard/MovieCard';
import Button from '../Button/Button';
import { displayCardsAmount } from '../../utils/displayCardsAmount';

export default function MoviesCardList({ moviesList, userId, keyFieldName }) {
  const displayParameters = displayCardsAmount();
  const [showMoviesCount, setShowMoviesCount] = useState(displayParameters.initialAmount);

  const handleShowMore = () => {
    setShowMoviesCount(showMoviesCount + displayParameters.count);
  };

  return (
    <>
      <ul className="movies-card-list">
        {moviesList.slice(0, showMoviesCount).map(movie => (
          <li className="movies-card-list__item" key={movie[keyFieldName]}>
            <MovieCard card={movie} userId={userId} />
          </li>
        ))}
      </ul>
      {moviesList.length !== 0 && moviesList.length > showMoviesCount && (
        <Button type="bordered" text="Ещё" onClick={handleShowMore} />
      )}
    </>
  );
}
