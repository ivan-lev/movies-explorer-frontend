import { mainApi } from './MainApi';

// export const register = (name, email, password, errorSetter) => {
//   //errorSetter('');
//   mainApi.createUser(name, email, password).catch(error => {
//     console.log(error);
//     const errorStatus = error.status;
//     switch (errorStatus) {
//       case 409:
//         // errorSetter(ERROR_MESSAGES.USER_EXISTS);
//         break;
//       case 500:
//       // errorSetter(ERROR_MESSAGES.COULD_NOT_REGISTER);
//     }
//     return error.status;
//   });
// };

// export const login = (email, password, errorSetter) => {
//   //   errorSetter('');
//   mainApi
//     .authorize(email, password)
//     .then(response => {
//       setToken(response.token);
//       if (!isLoggedIn) {
//         setIsLoggedIn(true);
//       }
//       navigate('/movies');
//     })
//     .catch(error => {
//       console.log(error);
//       const errorStatus = error.status;
//       switch (errorStatus) {
//         case 401:
//           //   errorSetter(ERROR_MESSAGES.WRONG_CREDEINTIALS);
//           break;
//         case 500:
//         //   errorSetter(ERROR_MESSAGES.LOGIN_ERROR);
//       }
//       return error.status;
//     });
// };

// userFunctions = { handleRegister, handleLogin };

export const searchMovies = (searchQuery, movieList) => {
  const filteredByQueryMovies = movieList.filter(movie => {
    const searchQueryWords = [];
    searchQueryWords.push(...searchQuery.toLowerCase().split(' '));
    const movieTitleWords = [];
    movieTitleWords.push(
      ...movie.nameRU.toLowerCase().split(' '),
      ...movie.nameEN.toLowerCase().split(' ')
    );
    if (movieTitleWords.some(word => searchQueryWords.includes(word))) {
      return movie;
    }
  });
  return filteredByQueryMovies;
};
