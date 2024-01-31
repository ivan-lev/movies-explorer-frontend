import './MovieCard.css';

import React from 'react';
import { useState } from 'react';
import { useMatch } from 'react-router-dom';

export default function MovieCard({ cover, preview, title, duration, isSaved }) {
  const [isShown, setIsShown] = useState(false);

  const image = require(`../../images/movie-covers/${preview}`);
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;

  const pathMatchedSavedMovies = useMatch('/saved-movies');

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
        // if the movie not saved - show button for saving film
        // which appears only on mouse enter the cover image
        <button
          className={`movie-card__button movie-card__button_not-saved ${
            isShown ? 'movie-card__button_shown' : ''
          }`}
          onMouseEnter={() => setIsShown(true)}
          onClick={() => alert('Добавить фильм в сохранённые')}
        >
          Cохранить
        </button>
      ) : (
        // if movie is saved and we are on Saved Movies route - show gray button,
        // and if we are not on Saved Movies route - change it's style to crimson
        <button
          className={`movie-card__button movie-card__button_saved-${
            pathMatchedSavedMovies ? 'gray' : 'crimson'
          }`}
          // when in Movies section change crimson button on gray on mouse hover
          onMouseEnter={event => {
            if (event.target.classList.contains('movie-card__button_saved-crimson')) {
              event.target.classList.replace(
                'movie-card__button_saved-crimson',
                'movie-card__button_saved-gray'
              );
            }
          }}
          //and return the crimson button back when mouse leave
          onMouseLeave={event => {
            if (event.target.classList.contains('movie-card__button_saved-gray')) {
              event.target.classList.replace(
                'movie-card__button_saved-gray',
                'movie-card__button_saved-crimson'
              );
            }
          }}
          onClick={() => alert('Удалить фильм из сохранённых')}
        ></button>
      )}
      <div className="movie-card__info">
        <span className="movie-card__title">{title}</span>
        <span className="movie-card__duration">{`${hours ? hours + 'ч' : ''} ${minutes}м`}</span>
      </div>
    </div>
  );
}
