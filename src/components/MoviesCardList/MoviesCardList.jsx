import './MoviesCardList.css';

import React from 'react';
import MovieCard from '../MoviesCard/MovieCard';

export default function MoviesCardList({ list }) {
  return (
    <div className="movies-card-list">
      {list.map(element => (
        <MovieCard
          key={element.title}
          preview={element.preview}
          title={element.title}
          duration={element.duration}
          isSaved={element.isSaved}
        />
      ))}
    </div>
  );
}
