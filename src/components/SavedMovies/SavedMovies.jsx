import './SavedMovies.css';

import React, { useEffect, useState } from 'react';

import { mainApi } from '../../utils/MainApi';

import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({ moviesList, userId }) {
  const token = JSON.parse(localStorage.getItem('token'));
  const [savedMoviesList, setSavedMoviesList] = useState([]);

  useEffect(() => {
    handleSavedMovieslist();
  }, []);

  const handleSavedMovieslist = () => {
    mainApi
      .getMovies(token)
      .then(result => setSavedMoviesList(result))
      .catch(error => console.log(error));
  };

  return (
    <section className="main__section saved-movies">
      <MoviesCardList moviesList={savedMoviesList} userId={userId} keyFieldName="movieId" />
    </section>
  );
}
