import { useState, useCallback, useEffect } from 'react';

import { validators } from '../utils/formValidator';

export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [errorToShow, setErrorToShow] = useState('');
  const [valuesValidity, setValuesValidity] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (
      Object.values(valuesValidity).every(value => {
        return value === true;
      })
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [valuesValidity]);

  useEffect(() => {
    handleErrorMessage();
  }, [errorMessages]);

  const handleErrorMessage = () => {
    let errorsList = Object.values(errorMessages);
    const errorMessage = errorsList
      .filter(error => {
        return error !== null && error !== '';
      })
      .join(', ')
      .toLocaleLowerCase();
    setErrorToShow(errorMessage);
  };

  const handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const validator = validators[`${name}Validator`];
    const validatorAnswer = validator(value);
    setValues({ ...values, [name]: value });
    setValuesValidity({ ...valuesValidity, [name]: validatorAnswer.isValid });
    setErrorMessages({ ...errorMessages, [name]: validatorAnswer.errorMessage });
  };

  const resetForm = useCallback(
    (
      newValues = {},
      newErrorMessages = {},
      newErrorToShow = '',
      newValuesValidity = {},
      newIsValid = false
    ) => {
      setValues(newValues);
      setErrorMessages(newErrorMessages);
      setErrorToShow(newErrorToShow);
      setValuesValidity(newValuesValidity);
      setIsValid(newIsValid);
    },
    [setValues, setErrorMessages, setValuesValidity, setErrorToShow, setIsValid]
  );

  return {
    values,
    setValues,
    valuesValidity,
    setValuesValidity,
    handleChange,
    errorToShow,
    isValid,
    resetForm
  };
}
