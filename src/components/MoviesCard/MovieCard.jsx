import './MovieCard.css';

import React from 'react';
import { useState } from 'react';

export default function MovieCard({ cover, preview, title, duration, isSaved }) {
  const [isShown, setIsShown] = useState(false);

  const image = require(`../../images/movie-covers/${preview}`);
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;

  return (
    <div className="movie-card">
      <img
        className="movie-card__cover"
        src={image}
        alt={`${title} movie cover`}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      />
      {!isSaved ? (
        <button
          className={`movie-card__button movie-card__button_not-saved ${
            isShown ? 'movie-card__button_shown' : ''
          }`}
          onMouseEnter={() => setIsShown(true)}
          onClick={() => console.log('save film callback')}
        >
          Cохранить
        </button>
      ) : (
        <button
          className="movie-card__button movie-card__button_saved"
          onClick={() => console.log('remove from saved films callback')}
        ></button>
      )}
      <div className="movie-card__info">
        <span className="movie-card__title">{title}</span>
        <span className="movie-card__duration">{`${hours}ч ${minutes}м`}</span>
      </div>
    </div>
  );
}
