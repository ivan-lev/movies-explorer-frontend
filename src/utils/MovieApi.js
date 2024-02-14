import { movieListUrl, movieImageUrl } from '../variables/variables';

const getMovies = () => {
  return fetch(movieListUrl, {
    method: 'GET'
  })
    .then(res => checkResponseStatus(res))
    .then(moviesList => {
      makeAbsoluteImagePaths(moviesList);
      return moviesList;
    });
};

const makeAbsoluteImagePaths = moviesList => {
  moviesList.forEach(movie => {
    const absoluteImagePath = `${movieImageUrl}${movie.image.url}`;
    movie.image = absoluteImagePath;
  });
};

const checkResponseStatus = response => {
  if (!response.ok) {
    return Promise.reject(`Ошибка: ${response.status}`);
  }
  return response.json();
};

export const movieApi = {
  getMovies
};
