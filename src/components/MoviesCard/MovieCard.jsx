import './MovieCard.css';

import React, { useContext } from 'react';
import { useState } from 'react';
import { useMatch } from 'react-router-dom';

import { mainApi } from '../../utils/MainApi';

export default function MovieCard({ card, userId }) {
  const owner = '123';
  const token = JSON.parse(localStorage.getItem('token'));
  const [isSaveButtonShown, setIsSaveButtonShown] = useState(false);
  const [isMovieSaved, setIsMovieSaved] = useState(userId === owner);
  const hours = Math.trunc(card.duration / 60);
  const minutes = card.duration % 60;

  const pathMatchedMovies = useMatch('/movies');

  const handleSaveMovie = () => {
    mainApi
      .saveMovie(card, token)
      .then(setIsMovieSaved(true))
      .catch(error => console.log(error));
  };

  const handleRemoveFromSavedMovies = () => {
    alert('Удалить фильм из сохранённых');
    setIsMovieSaved(false);
  };

  //buttons
  const saveButton = () => {
    return (
      <button
        className="movie-card__button movie-card__button_save"
        onMouseEnter={() => setIsSaveButtonShown(true)}
        onClick={handleSaveMovie}
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

  return (
    <div className="movie-card">
      <img
        className="movie-card__cover"
        src={card.image.url}
        alt={`${card.nameRU} movie cover`}
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
        <span className="movie-card__title">{card.nameRU}</span>
        <span className="movie-card__duration">{`${hours ? hours + 'ч' : ''} ${minutes}м`}</span>
      </div>
    </div>
  );
}
