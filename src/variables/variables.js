export const EMAIL_REGEXP =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const NAME_REGEXP = /^[a-zA-Zа-яА-Я -]+$/i;

export const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const IMAGE_URL = 'https://api.nomoreparties.co';

export const BASE_URL = 'https://api.moviesearch.nomoredomainsmonster.ru';

export const SHORTMETER_DURATION = 40;

export const LAYOUTS = {
  WIDE: {
    DESCRIPTION: 'wide',
    ROWS: 4,
    ITEMS: 3
  },
  MEDIUM: {
    DESCRIPTION: 'medium',
    ROWS: 4,
    ITEMS: 2
  },
  NARROW: {
    DESCRIPTION: 'narrow',
    ROWS: 5,
    ITEMS: 2
  }
};
