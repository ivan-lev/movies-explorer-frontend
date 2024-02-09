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
    const relativeImageUrl = movie.image.url;
    const relativeImagePreviewUrl = movie.image.previewUrl;
    movie.image.url = `${movieImageUrl}${relativeImageUrl}`;
    movie.image.previewUrl = `${movieImageUrl}${relativeImagePreviewUrl}`;
  });
};

const checkResponseStatus = res => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

export const movieApi = {
  getMovies
};
