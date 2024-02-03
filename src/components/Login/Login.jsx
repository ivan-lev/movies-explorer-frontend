import './Login.css';

import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';
import Button from '../Button/Button';

export default function Login({ onSubmit }) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });

  const handleChange = event => {
    const { name, value } = event.target;

    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const { name, email, password } = formValues;
    alert('Отправляем форму с параметрами: ' + name + ', ' + email + ', ' + password);
  };

  return (
    <section className="login">
      <Logo />
      <p className="login__title">Рады видеть!</p>
      <form id="login__form" name="login__form" className="login__form" onSubmit={handleSubmit}>
        <fieldset className="login__fieldset">
          <label className="login__input-label">
            Email
            <input
              type="text"
              autoComplete="on"
              placeholder=""
              id="name"
              name="name"
              className="login__input"
              required
              onChange={handleChange}
            />
          </label>
        </fieldset>

        <fieldset className="login__fieldset">
          <label className="login__input-label">
            Пароль
            <input
              type="email"
              autoComplete="on"
              placeholder=""
              id="email"
              name="email"
              className="login__input"
              required
              onChange={handleChange}
            />
          </label>
        </fieldset>

        <div className="login__error-wrapper">
          <span className="login__error login__error_shown">Ошибка логина...</span>
        </div>
      </form>

      <div className="login__bottom">
        <Button type="blue" text="Войти" />
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
