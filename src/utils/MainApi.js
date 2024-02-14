import { baseUrl } from '../variables/variables';

const createUser = (name, email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  }).then(response => checkResponseStatus(response));
};

const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(response => checkResponseStatus(response));
};

const getUserInfo = token => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }).then(response => checkResponseStatus(response));
};

const setUserInfo = (name, email, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name, email })
  }).then(response => checkResponseStatus(response));
};

const saveMovie = (card, token) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    id,
    nameRU,
    nameEN
  } = card;
  console.log(image);
  const imageUrl = image.url;
  const movieId = id;
  return fetch(`${baseUrl}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      country,
      director,
      duration,
      year,
      description,
      image: imageUrl,
      trailerLink,
      thumbnail: imageUrl,
      owner,
      movieId,
      nameRU,
      nameEN
    })
  }).then(response => checkResponseStatus(response));
};

const deleteMovie = (id, token) => {
  return fetch(`${baseUrl}/movies/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }).then(response => checkResponseStatus(response));
};

const getMovies = token => {
  return fetch(`${baseUrl}/movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }).then(response => checkResponseStatus(response));
};

const checkResponseStatus = res => {
  if (!res.ok) {
    console.log(`Ошибка: ${res.status}`);
    return Promise.reject(res);
  }
  return res.json();
};

export const mainApi = {
  createUser,
  authorize,
  getUserInfo,
  setUserInfo,
  saveMovie,
  deleteMovie,
  getMovies
};
