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
  return (fetch(`${baseUrl}/signin`),
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(response => checkResponseStatus(response));
};

// const checkTokenValidity = token => {
//   return fetch(`${baseUrl}/!!!!!!`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`
//     }
//   }).then(response => checkResponseStatus(response));
// };

const checkResponseStatus = res => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

export const mainApi = {
  createUser,
  authorize
};
