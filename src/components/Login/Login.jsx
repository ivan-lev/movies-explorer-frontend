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
      <p className="login__title">Добро пожаловать!</p>
      <form id="login__form" name="login__form" className="login__form" onSubmit={handleSubmit}>
        <fieldset className="login__fieldset">
          <label className="login__input-label">
            Имя
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
            E-mail
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

        <span className="login__input-error login__input-error_shown">Ошибка логина...</span>

        <Button type="blue" text="Зарегистрироваться" />
      </form>
      <span className="login__already-registered-wrapper">
        <span className="login__already-registered-text">Уже зарегистрированы?</span>
        <Link className="login__register-link" to="/signup">
          Войти
        </Link>
      </span>
    </section>
  );
}
