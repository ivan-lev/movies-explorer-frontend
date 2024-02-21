import './MoviesCardList.css';

import React from 'react';

import MovieCard from '../MoviesCard/MovieCard';

export default function MoviesCardList({
  moviesList,
  keyFieldName,
  onSave,
  onDelete,
  searchResults,
  setSearchResults
}) {
  return (
    <>
      <ul className="movies-card-list">
        {moviesList.map(movie => (
          <li className="movies-card-list__item" key={movie[keyFieldName]}>
            <MovieCard
              movie={movie}
              onSave={onSave}
              onDelete={onDelete}
              searchResults={searchResults}
              setSearchResults={setSearchResults}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
