import './Register.css';

import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';
import Button from '../Button/Button';

export default function Register({ onSubmit }) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    name: ''
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
    <section className="register">
      <Logo />
      <p className="register__title">Добро пожаловать!</p>
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
              type="text"
              autoComplete="on"
              placeholder=""
              id="name"
              name="name"
              className="register__input"
              required
              onChange={handleChange}
            />
          </label>
        </fieldset>

        <fieldset className="register__fieldset">
          <label className="register__input-label">
            E-mail
            <input
              type="email"
              autoComplete="on"
              placeholder=""
              id="email"
              name="email"
              className="register__input"
              required
              onChange={handleChange}
            />
          </label>
        </fieldset>

        <fieldset className="register__fieldset">
          <label className="register__input-label">
            Пароль
            <input
              type="password"
              autoComplete="on"
              placeholder=""
              id="password"
              name="password"
              className="register__input"
              required
              onChange={handleChange}
            />
          </label>
        </fieldset>

        <div className="register__error-wrapper">
          <span className="register__error register__error_shown">Что-то пошло не так...</span>
        </div>

        <Button type="blue" text="Зарегистрироваться" />
      </form>
      <span className="register__already-registered-wrapper">
        <span className="register__already-registered-text">Уже зарегистрированы?</span>
        <Link className="register__login-link" to="/signin">
          Войти
        </Link>
      </span>
    </section>
  );
}
