import './MoviesCardList.css';

import React, { useState } from 'react';

import MovieCard from '../MoviesCard/MovieCard';
import Button from '../Button/Button';
import { displayCardsAmount } from '../../utils/displayCardsAmount';

export default function MoviesCardList({ moviesList, userId }) {
  const displayParameters = displayCardsAmount();
  const [showMoviesCount, setShowMoviesCount] = useState(displayParameters.initialAmount);

  const handleShowMore = () => {
    setShowMoviesCount(showMoviesCount + displayParameters.count);
  };

  return (
    <>
      <ul className="movies-card-list">
        {moviesList.slice(0, showMoviesCount).map(movie => (
          <li className="movies-card-list__item" key={movie.id}>
            <MovieCard
              country={movie.country}
              director={movie.director}
              duration={movie.duration}
              year={movie.year}
              description={movie.description}
              image={movie.image.url}
              trailerLink={movie.trailerLink}
              thumbnail={movie.thumbnail}
              owner={movie.owner}
              movieId={movie.movieId}
              nameRU={movie.nameRU}
              nameEN={movie.nameEN}
              userId={userId}
            />
          </li>
        ))}
      </ul>
      {moviesList.length !== 0 && moviesList.length > showMoviesCount && (
        <Button type="bordered" text="Ещё" onClick={handleShowMore} />
      )}
    </>
  );
}
