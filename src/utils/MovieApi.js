import { MOVIES_URL, IMAGE_URL } from '../variables/variables';

const getMovies = () => {
  return fetch(MOVIES_URL, {
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
    const absoluteImagePath = `${IMAGE_URL}${movie.image.url}`;
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
