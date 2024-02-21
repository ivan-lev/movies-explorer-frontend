import { NAME_REGEXP, EMAIL_REGEXP } from '../variables/variables';
import { VALIDATION_ERRORS } from '../variables/messages';

const nameValidator = name => {
  if (!name) {
    return { isValid: false, errorMessage: VALIDATION_ERRORS.NAME_EMPTY };
  }

  if (!name.match(NAME_REGEXP)) {
    return { isValid: false, errorMessage: VALIDATION_ERRORS.NAME_INVALID };
  }

  if (name.length < 2) {
    return { isValid: false, errorMessage: VALIDATION_ERRORS.NAME_SHORT };
  }

  if (!name.length > 30) {
    return { isValid: false, errorMessage: VALIDATION_ERRORS.NAME_LONG };
  }

  return { isValid: true, errorMessage: '' };
};

const emailValidator = email => {
  if (!email) {
    return { isValid: false, errorMessage: VALIDATION_ERRORS.EMAIL_EMPTY };
  }

  if (!email.match(EMAIL_REGEXP)) {
    return { isValid: false, errorMessage: VALIDATION_ERRORS.EMAIL_INVALID };
  }

  return { isValid: true, errorMessage: '' };
};

const passwordValidator = password => {
  if (!password) {
    return { isValid: false, errorMessage: VALIDATION_ERRORS.PASSWORD_EMPTY };
  }

  return { isValid: true, errorMessage: '' };
};

export const validateSearch = (value, setMessage) => {
  if (!value) {
    setMessage(VALIDATION_ERRORS.MOVIE_QUERY_EMPTY);
    return false;
  }

  return true;
};

export const validators = {
  nameValidator,
  emailValidator,
  passwordValidator
};
