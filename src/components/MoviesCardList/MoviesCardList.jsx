import './MoviesCardList.css';

import React from 'react';
import MovieCard from '../MoviesCard/MovieCard';

export default function MoviesCardList({ moviesList, userId }) {
  return (
    <ul className="movies-card-list">
      {moviesList.map(movie => (
        <li className="movies-card-list__item" key={movie.movieId}>
          <MovieCard
            country={movie.country}
            director={movie.director}
            duration={movie.duration}
            year={movie.year}
            description={movie.description}
            image={movie.image}
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
  );
}
