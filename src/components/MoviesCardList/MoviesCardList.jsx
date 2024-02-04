import './MoviesCardList.css';

import React from 'react';
import MovieCard from '../MoviesCard/MovieCard';

export default function MoviesCardList({ moviesList, userId }) {
  return (
    <div className="movies-card-list">
      {moviesList.map(movie => (
        <MovieCard
          key={movie.movieId}
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
      ))}
    </div>
  );
}
