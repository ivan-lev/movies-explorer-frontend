import './Register.css';

// React and hooks
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

//components
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import ButtonShowPassword from '../ButtonShowPassword/ButtonShowPassword';

export default function Register({ register, error, setError, isInputsDisabled }) {
  const { values, setValuesValidity, errorToShow, handleChange, isValid } = useFormWithValidation();
  const [isPasswordShowed, setIsPasswordShowed] = useState(false);

  // set values validity to false as we have blank inputs at start
  useEffect(() => {
    setValuesValidity({ name: false, email: false, password: false });
  }, []);

  const handleSubmit = () => {
    // check if all inputs filled and valid
    if (!isValid || Object.values(values).some(value => value.length === 0)) {
      return;
    }
    const { name, email, password } = values;
    register(name, email, password);
  };

  const handleHideErrorOnType = event => {
    error !== '' && setError('');
    handleChange(event);
  };

  return (
    <main className="main">
      <section className="register">
        <Logo />
        <h1 className="register__title">Добро пожаловать!</h1>
        <form
          id="register__form"
          name="register__form"
          className="register__form"
          onSubmit={handleSubmit}
        >
          <fieldset className="register__fieldset">
            <label className="register__input-label">
              Имя
              <input
                className="register__input"
                type="text"
                name="name"
                id="name"
                placeholder="Введите имя"
                autoComplete="on"
                required
                value={values?.name || ''}
                onChange={handleHideErrorOnType}
                onKeyDown={event => {
                  event.key === 'Enter' && handleSubmit();
                }}
                disabled={isInputsDisabled}
                autoFocus
              />
            </label>
          </fieldset>

          <fieldset className="register__fieldset">
            <label className="register__input-label">
              E-mail
              <input
                className="register__input"
                type="email"
                name="email"
                id="email"
                placeholder="Введите email"
                autoComplete="on"
                required
                value={values?.email || ''}
                onChange={handleHideErrorOnType}
                onKeyDown={event => {
                  event.key === 'Enter' && handleSubmit();
                }}
                disabled={isInputsDisabled}
              />
            </label>
          </fieldset>

          <fieldset className="register__fieldset">
            <label className="register__input-label register__password-label">
              Пароль
              <input
                className="register__input"
                type={!isPasswordShowed ? 'password' : 'text'}
                name="password"
                id="password"
                placeholder="Введите пароль"
                autoComplete="on"
                required
                value={values?.password || ''}
                onChange={handleHideErrorOnType}
                onKeyDown={event => {
                  event.key === 'Enter' && handleSubmit();
                }}
                disabled={isInputsDisabled}
              />
              <ButtonShowPassword currentState={isPasswordShowed} onChange={setIsPasswordShowed} />
            </label>
          </fieldset>

          <div className="register__validation-error-wrapper">
            <span className="register__validation-error">{errorToShow}</span>
          </div>
        </form>

        <div className="register__bottom">
          <span className="register__registration-error">{error}</span>
          <Button
            type={`blue ${!isValid || isInputsDisabled ? 'button_disabled' : ''}`}
            text="Зарегистрироваться"
            onClick={handleSubmit}
            disabled={isInputsDisabled}
          />
          <div className="register__already-registered-wrapper">
            <span className="register__already-registered-text">Уже зарегистрированы?</span>
            <Link className="register__login-link" to="/signin">
              Войти
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
