import './MovieCard.css';

// React and hooks
import React from 'react';
import { useState } from 'react';
import { useMatch } from 'react-router-dom';

// utils
import { mainApi } from '../../utils/MainApi';

export default function MovieCard({
  movie,
  onSave,
  onDelete,
  searchResults,
  setSearchResults,
  token
}) {
  const [isSaveButtonShown, setIsSaveButtonShown] = useState(false);
  const [isSaved, setIsSaved] = useState(movie.isSaved);
  const hours = Math.trunc(movie.duration / 60);
  const minutes = movie.duration % 60;

  const pathMatchedMovies = useMatch('/movies');

  const handleSaveMovie = () => {
    mainApi
      .saveMovie(movie, token)
      .then(savedCard => {
        savedCard.isSaved = true;
        setIsSaved(true);
        movie._id = savedCard._id;
        onSave({ ...savedCard });

        // update state of card in searchResults
        const updatedResultsList = searchResults.map(movieInResults => {
          if (movie.id === movieInResults.id) {
            movieInResults.isSaved = true;
          }
          return movieInResults;
        });
        setSearchResults(updatedResultsList);
      })
      .catch(error => console.log(error));
  };

  const handleDeleteMovie = () => {
    setIsSaved(false);
    onDelete(movie);
    // // update state of card in searchResults
    // const updatedResultsList = searchResults.map(movieInResults => {
    //   if (movie.movieId === movieInResults.id) {
    //     console.log('удалить!!!', movieInResults.nameRU);
    //     movieInResults.isSaved = false;
    //   }
    //   return movieInResults;
    // });
    // console.log(updatedResultsList);
    // setSearchResults(updatedResultsList);
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
        onClick={handleDeleteMovie}
      ></button>
    );
  };
  const grayButton = () => {
    return (
      <button
        className="movie-card__button movie-card__button_gray"
        onMouseEnter={() => setIsSaveButtonShown(true)}
        onClick={handleDeleteMovie}
      ></button>
    );
  };

  return (
    <div className="movie-card">
      <a href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img
          className="movie-card__cover"
          src={movie.image}
          alt={`${movie.nameRU} movie cover`}
          onMouseEnter={() => setIsSaveButtonShown(true)}
          onMouseLeave={() => setIsSaveButtonShown(false)}
        />
      </a>

      {
        // below are one of the save/unsave buttons rendered
        !isSaved
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
        <span className="movie-card__title">{movie.nameRU}</span>
        <span className="movie-card__duration">{`${hours ? hours + 'ч' : ''} ${minutes}м`}</span>
      </div>
    </div>
  );
}
