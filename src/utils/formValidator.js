import { nameRegexp, emailRegExp } from '../variables/variables';
import { errorMessages } from '../variables/errorMessages';

const nameValidator = name => {
  if (!name) {
    return { isValid: false, errorMessage: 'Необходимо заполнить имя' };
  }

  if (!name.match(nameRegexp)) {
    return { isValid: false, errorMessage: 'Поле имя содержит недопустимые символы' };
  }

  if (name.length < 2) {
    return { isValid: false, errorMessage: 'Имя слишком короткое' };
  }

  if (!name.length > 30) {
    return { isValid: false, errorMessage: 'Имя слишком длинное' };
  }

  return { isValid: true, errorMessage: '' };
};

const emailValidator = email => {
  if (!email) {
    return { isValid: false, errorMessage: 'Необходимо заполнить почту' };
  }

  if (!email.match(emailRegExp)) {
    return { isValid: false, errorMessage: 'Почта заполнена неправильно' };
  }

  return { isValid: true, errorMessage: '' };
};

const passwordValidator = password => {
  if (!password) {
    return { isValid: false, errorMessage: 'Необходимо заполнить поле с паролем' };
  }

  return { isValid: true, errorMessage: '' };
};

export const validateSearch = (value, setMessage) => {
  if (!value) {
    setMessage(errorMessages.emptySearchInput);
    return false;
  }

  setMessage('Фильм');
  return true;
};

// export const validateProfileUpdate = (name, email, setMessage) => {
//   const validateName = nameValidator(name);
//   const validateEmail = emailValidator(email);

//   if (!name || !email) {
//     setMessage('Необходимо заполнить все поля');
//     return false;
//   }

//   if (validateName) {
//     setMessage(validateName);
//     return false;
//   }

//   if (validateEmail) {
//     setMessage(validateEmail);
//     return false;
//   }

//   setMessage('');
//   return true;
// };

// export const validateLogin = (email, password, setMessage) => {
//   const validateEmail = emailValidator(email);
//   const validatePassword = passwordValidator(password);

//   if (!email && !password) {
//     setMessage('Необходимо заполнить все поля');
//     return false;
//   }

//   if (validateEmail) {
//     setMessage(validateEmail);
//     return false;
//   }

//   if (validatePassword) {
//     setMessage(validatePassword);
//     return false;
//   }

//   setMessage('');
//   return true;
// };

// export const validateRegistration = (name, email, password, setMessage) => {
//   const validateName = nameValidator(name);
//   const validateEmail = emailValidator(email);
//   const validatePassword = passwordValidator(password);

//   if (!name && !email && !password) {
//     setMessage('Необходимо заполнить все поля');
//     return false;
//   }

//   if (validateName) {
//     setMessage(validateName);
//     return false;
//   }

//   if (validateEmail) {
//     setMessage(validateEmail);
//     return false;
//   }

//   if (validatePassword) {
//     setMessage(validatePassword);
//     return false;
//   }

//   setMessage('');
//   return true;
// };

export const validators = {
  nameValidator,
  emailValidator,
  passwordValidator
};
