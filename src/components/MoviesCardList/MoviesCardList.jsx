import './MoviesCardList.css';

import React from 'react';

import MovieCard from '../MoviesCard/MovieCard';

export default function MoviesCardList({ moviesList, keyFieldName, onDelete, onSave }) {
  return (
    <>
      <ul className="movies-card-list">
        {moviesList.map(movie => (
          <li className="movies-card-list__item" key={movie[keyFieldName]}>
            <MovieCard movie={movie} onDelete={onDelete} onSave={onSave} />
          </li>
        ))}
      </ul>
    </>
  );
}
