import './Login.css';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { validateLogin } from '../../utils/formValidator';

import Logo from '../Logo/Logo';
import Button from '../Button/Button';

export default function Login({ onSubmit }) {
  const { values, setValues, handleChange } = useForm({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('Ошибка логина...');

  const handleSubmit = () => {
    const { email, password } = values;
    const isDataValid = validateLogin(email, password, setErrorMessage);
    if (isDataValid) {
      alert('Отправляем форму с параметрами: ' + email + ', ' + password);
      setValues({ email: '', password: '' });
    }
  };

  return (
    <section className="login">
      <Logo />
      <h2 className="login__title">Рады видеть!</h2>
      <form id="login__form" name="login__form" className="login__form" onSubmit={handleSubmit}>
        <fieldset className="login__fieldset">
          <label className="login__input-label">
            Email
            <input
              type="email"
              autoComplete="on"
              placeholder=""
              id="email"
              name="email"
              className="login__input"
              required
              value={values.email}
              onChange={handleChange}
              onKeyDown={event => {
                event.key === 'Enter' && handleSubmit();
              }}
            />
          </label>
        </fieldset>

        <fieldset className="login__fieldset">
          <label className="login__input-label">
            Пароль
            <input
              type="password"
              autoComplete="on"
              placeholder=""
              id="password"
              name="password"
              className="login__input"
              required
              value={values.password}
              onChange={handleChange}
              onKeyDown={event => {
                event.key === 'Enter' && handleSubmit();
              }}
            />
          </label>
        </fieldset>

        <div className="login__error-wrapper">
          <span className="login__error login__error_shown">{errorMessage}</span>
        </div>
      </form>

      <div className="login__bottom">
        <Button type="blue" text="Войти" onClick={handleSubmit} />
        <div className="login__not-registered-wrapper">
          <span className="login__not-registered-text">Ещё не зарегистрированы?</span>
          <Link className="login__register-link" to="/signup">
            Регистрация
          </Link>
        </div>
      </div>
    </section>
  );
}
