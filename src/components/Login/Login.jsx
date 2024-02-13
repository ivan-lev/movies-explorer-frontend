import './Login.css';

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useFormWithValidation } from '../../hooks/useFormWithValidation';

import Logo from '../Logo/Logo';
import Button from '../Button/Button';

export default function Login({ onLogin, error }) {
  const { values, setValuesValidity, errorToShow, handleChange, isValid, resetForm } =
    useFormWithValidation();

  // set values validity to false as we have blank inputs at start
  useEffect(() => {
    setValuesValidity({ email: false, password: false });
  }, []);

  const handleLogin = () => {
    const { email, password } = values;
    if (isValid) {
      onLogin(email, password);
    }
  };

  return (
    <main className="main">
      <section className="login">
        <Logo />
        <h1 className="login__title">Рады видеть!</h1>
        <form id="login__form" name="login__form" className="login__form" onSubmit={handleLogin}>
          <fieldset className="login__fieldset">
            <label className="login__input-label">
              Email
              <input
                className="login__input"
                type="email"
                name="email"
                id="email"
                placeholder="Введите email"
                autoComplete="on"
                required
                value={values.email}
                onChange={handleChange}
                onKeyDown={event => {
                  event.key === 'Enter' && onLogin();
                }}
              />
            </label>
          </fieldset>

          <fieldset className="login__fieldset">
            <label className="login__input-label">
              Пароль
              <input
                className="login__input"
                type="password"
                name="password"
                id="password"
                placeholder="Введите пароль"
                autoComplete="on"
                required
                value={values.password}
                onChange={handleChange}
                onKeyDown={event => {
                  event.key === 'Enter' && handleLogin();
                }}
              />
            </label>
          </fieldset>

          <div className="login__validation-error-wrapper">
            <span className="login__validation-error">{errorToShow}</span>
          </div>
        </form>

        <div className="login__bottom">
          <span className="login__request-error">{error}</span>
          <Button
            type={`blue ${!isValid ? 'button_disabled' : ''}`}
            text="Войти"
            onClick={handleLogin}
          />
          <div className="login__not-registered-wrapper">
            <span className="login__not-registered-text">Ещё не зарегистрированы?</span>
            <Link className="login__register-link" to="/signup">
              Регистрация
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
