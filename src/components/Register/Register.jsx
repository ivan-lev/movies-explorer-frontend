import './Register.css';

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useFormWithValidation } from '../../hooks/useFormWithValidation';

import Logo from '../Logo/Logo';
import Button from '../Button/Button';

export default function Register({ register, error }) {
  const { values, setValuesValidity, errorToShow, handleChange, isValid, resetForm } =
    useFormWithValidation();

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
                value={values.name ?? ''}
                onChange={handleChange}
                onKeyDown={event => {
                  event.key === 'Enter' && handleSubmit();
                }}
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
                value={values.email ?? ''}
                onChange={handleChange}
                onKeyDown={event => {
                  event.key === 'Enter' && handleSubmit();
                }}
              />
            </label>
          </fieldset>

          <fieldset className="register__fieldset">
            <label className="register__input-label">
              Пароль
              <input
                className="register__input"
                type="password"
                name="password"
                id="password"
                placeholder="Введите пароль"
                autoComplete="on"
                required
                value={values.password ?? ''}
                onChange={handleChange}
                onKeyDown={event => {
                  event.key === 'Enter' && handleSubmit();
                }}
              />
            </label>
          </fieldset>

          <div className="register__validation-error-wrapper">
            <span className="register__validation-error">{errorToShow}</span>
          </div>
        </form>

        <div className="register__bottom">
          <span className="register__registration-error">{error}</span>
          <Button
            type={`blue ${!isValid ? 'button_disabled' : ''}`}
            text="Зарегистрироваться"
            onClick={handleSubmit}
            disabled={false}
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
