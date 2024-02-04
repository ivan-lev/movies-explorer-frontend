import './MovieCard.css';

import React from 'react';
import { useState } from 'react';
import { useMatch } from 'react-router-dom';

export default function MovieCard({ cover, preview, title, duration, isSaved }) {
  const [isSaveButtonShown, setIsSaveButtonShown] = useState(false);
  const [isMovieSaved, setIsMovieSaved] = useState(isSaved);

  const image = require(`../../images/movie-covers/${preview}`);
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;

  const pathMatchedMovies = useMatch('/movies');

  //buttons
  const saveButton = () => {
    return (
      <button
        className="movie-card__button movie-card__button_save"
        onMouseEnter={() => setIsSaveButtonShown(true)}
        onClick={handleAddToSavedMovies}
      >
        Сохранить
      </button>
    );
  };
  const crimsonButton = () => {
    return (
      <button
        className="movie-card__button movie-card__button_crimson"
        onClick={handleRemoveFromSavedMovies}
      ></button>
    );
  };
  const grayButton = () => {
    return (
      <button
        className="movie-card__button movie-card__button_gray"
        onMouseEnter={() => setIsSaveButtonShown(true)}
        onClick={handleRemoveFromSavedMovies}
      ></button>
    );
  };

  const handleAddToSavedMovies = () => {
    alert('Добавить фильм в сохранённые');
    setIsMovieSaved(true);
  };

  const handleRemoveFromSavedMovies = () => {
    alert('Удалить фильм из сохранённых');
    setIsMovieSaved(false);
  };

  return (
    <div className="movie-card">
      <img
        className="movie-card__cover"
        src={image}
        alt={`${title} movie cover`}
        onMouseEnter={() => setIsSaveButtonShown(true)}
        onMouseLeave={() => setIsSaveButtonShown(false)}
      />
      {
        // below are one of the save/unsave buttons rendered
        !isMovieSaved
          ? // if the movie is not saved - show button for saving film
            // when mouse enter the preview image
            isSaveButtonShown && saveButton()
          : // if the movie is saved and we are on '/movies' route - show crimson button,
          // and if we are on '/saved-movies' route - show gray button on cover image hover
          pathMatchedMovies
          ? crimsonButton()
          : isSaveButtonShown && grayButton()
      }

      <div className="movie-card__info">
        <span className="movie-card__title">{title}</span>
        <span className="movie-card__duration">{`${hours ? hours + 'ч' : ''} ${minutes}м`}</span>
      </div>
    </div>
  );
}
