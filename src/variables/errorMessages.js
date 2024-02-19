export const ERROR_MESSAGES = {
  SERVER_ERROR: 'На сервере произошла ошибка.',
  PAGE_NOT_FOUND: 'Страница по указанному маршруту не найдена.'
};

export const SEARCH_ERRORS = {
  REQUEST_ERROR:
    'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
  NOTHING_FOUND: 'Ничего не найдено'
};

export const REGISTER_ERRORS = {
  USER_EXISTS: 'Пользователь с таким email уже существует.',
  COULD_NOT_REGISTER: 'При регистрации пользователя произошла ошибка.'
};

export const LOGIN_ERRORS = {
  WRONG_CREDEINTIALS: 'Вы ввели неправильный логин или пароль.',
  LOGIN_ERROR: 'Ошибка логина...'
};

export const PROFILE_ERRORS = {
  EMAIL_EXISTS: 'Пользователь с таким email уже существует.',
  PROFILE_UPDATE: 'При обновлении профиля произошла ошибка'
};

export const VALIDATION_ERRORS = {
  NAME_EMPTY: 'Необходимо заполнить имя',
  NAME_INVALID: 'Поле имя содержит недопустимые символы',
  NAME_SHORT: 'Имя слишком короткое',
  NAME_LONG: 'Имя слишком длинное',
  EMAIL_EMPTY: 'Необходимо заполнить почту',
  EMAIL_INVALID: 'Почта заполнена неправильно',
  PASSWORD_EMPTY: 'Необходимо заполнить поле с паролем',
  MOVIE_QUERY_EMPTY: 'Нужно ввести ключевое слово'
};
