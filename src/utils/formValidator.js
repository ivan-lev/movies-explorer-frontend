import { nameRegexp, emailRegExp } from '../variables/variables';
import { errors } from '../variables/errors';

const nameValidator = name => {
  if (!name) {
    return 'Необходимо заполнить имя';
  }

  if (!name.match(nameRegexp)) {
    return 'Поле имя содержит недопустимые символы';
  }

  if (name.length < 2) {
    return 'Имя слишком короткое';
  }

  if (!name.length > 30) {
    return 'Имя слишком длинное';
  }

  return '';
};

const emailValidator = email => {
  if (!email) {
    return 'Необходимо заполнить почту';
  }

  if (!email.match(emailRegExp)) {
    return 'Почта заполнена неправильно';
  }

  return '';
};

const passwordValidator = password => {
  if (!password) {
    return 'Необходимо заполнить поле с паролем';
  }

  return '';
};

export const validateProfileUpdate = (name, email, setMessage) => {
  const validateName = nameValidator(name);
  const validateEmail = emailValidator(email);

  if (!name || !email) {
    setMessage('Необходимо заполнить все поля');
    return false;
  }

  if (validateName) {
    setMessage(validateName);
    return false;
  }

  if (validateEmail) {
    setMessage(validateEmail);
    return false;
  }

  setMessage('');
  return true;
};

export const validateLogin = (email, password, setMessage) => {
  const validateEmail = emailValidator(email);
  const validatePassword = passwordValidator(password);

  if (!email && !password) {
    setMessage('Необходимо заполнить все поля');
    return false;
  }

  if (validateEmail) {
    setMessage(validateEmail);
    return false;
  }

  if (validatePassword) {
    setMessage(validatePassword);
    return false;
  }

  setMessage('');
  return true;
};

export const validateRegistration = (name, email, password, setMessage) => {
  const validateName = nameValidator(name);
  const validateEmail = emailValidator(email);
  const validatePassword = passwordValidator(password);

  if (!name && !email && !password) {
    setMessage('Необходимо заполнить все поля');
    return false;
  }

  if (validateName) {
    setMessage(validateName);
    return false;
  }

  if (validateEmail) {
    setMessage(validateEmail);
    return false;
  }

  if (validatePassword) {
    setMessage(validatePassword);
    return false;
  }

  setMessage('');
  return true;
};

export const validateSearch = (value, setMessage) => {
  if (!value) {
    setMessage(errors.emptySearchInput);
    return false;
  }

  setMessage('Фильм');
  return true;
};
