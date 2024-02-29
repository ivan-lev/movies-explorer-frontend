export const ERROR_MESSAGES = {
  SERVER_ERROR: 'На сервере произошла ошибка.',
  PAGE_NOT_FOUND: 'Страница по указанному маршруту не найдена.'
};

export const SEARCH_MESSAGES = {
  REQUEST_ERROR:
    'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
  NOTHING_FOUND: 'Ничего не найдено'
};

export const REGISTER_MESSAGES = {
  USER_EXISTS: 'Пользователь с таким email уже существует.',
  COULD_NOT_REGISTER: 'При регистрации пользователя произошла ошибка.'
};

export const LOGIN_MESSAGES = {
  WRONG_CREDEINTIALS: 'Вы ввели неправильный логин или пароль.',
  LOGIN_ERROR: 'Ошибка логина...',
  TOKEN_ERROR: 'Ошибка проверки токена.'
};

export const PROFILE_MESSAGES = {
  UPDATE_SUCCESS: 'Данные успешно сохранены!',
  UPDATE_ERROR: 'При обновлении профиля произошла ошибка',
  EMAIL_EXISTS: 'Пользователь с таким email уже существует.'
};

export const VALIDATION_ERRORS = {
  NAME_EMPTY: 'Необходимо заполнить имя',
  NAME_INVALID: 'Поле имя содержит недопустимые символы',
  NAME_SHORT: 'Имя слишком короткое',
  NAME_LONG: 'Имя слишком длинное',
  EMAIL_EMPTY: 'Необходимо заполнить почту',
  EMAIL_INVALID: 'Почта заполнена неправильно',
  PASSWORD_EMPTY: 'Необходимо заполнить поле с паролем',
  SECOND_PASSWORD_EMPTY: 'Необходимо повторить пароль',
  PASSWORDS_DIFFERS: 'Пароли не совпадают',
  MOVIE_QUERY_EMPTY: 'Нужно ввести ключевое слово'
};
