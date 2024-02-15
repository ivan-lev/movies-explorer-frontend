import './SavedMovies.css';

import React, { useEffect, useState } from 'react';

import { ERROR_MESSAGES } from '../../variables/errorMessages';

import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({ moviesList, userId }) {
  // const token = JSON.parse(localStorage.getItem('token'));
  // const [savedMoviesList, setSavedMoviesList] = useState([]);

  // useEffect(() => {
  //   handleSavedMovieslist();
  // }, []);

  // const handleSavedMovieslist = () => {
  //   mainApi
  //     .getMovies(token)
  //     .then(result => setSavedMoviesList(result))
  //     .catch(error => console.log(error));
  // };

  return (
    <section className="main__section saved-movies">
      {moviesList.length === 0 ? (
        <p className="movies__nothing-found">{ERROR_MESSAGES.NOTHING_FOUND}</p>
      ) : (
        <MoviesCardList moviesList={moviesList} userId={userId} keyFieldName="movieId" />
      )}
    </section>
  );
}
