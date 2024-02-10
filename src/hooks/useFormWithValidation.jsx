import { useState, useCallback, useEffect } from 'react';

export function useFormWithValidation(valuesFields, errorsFileds, validators) {
  const [values, setValues] = useState(valuesFields);
  const [errors, setErrors] = useState(errorsFileds);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    checkValidity();
  }, [errors, isValid]);

  const handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const validator = validators[`${name}Validator`];
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validator(value) });
  };

  // check if all error fields was filled (values !== null)
  // and all error fields has blank string values
  const checkValidity = () => {
    if (
      Object.values(errors).every(error => {
        return error !== null;
      }) &&
      Object.values(errors).every(error => {
        return error === '';
      })
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}
