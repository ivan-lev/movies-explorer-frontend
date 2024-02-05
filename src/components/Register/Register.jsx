import './Register.css';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { validateRegistration } from '../../utils/formValidator';

import Logo from '../Logo/Logo';
import Button from '../Button/Button';

export default function Register({ onSubmit }) {
  const { values, setValues, handleChange } = useForm({ name: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('Что-то пошло не так...');

  const handleSubmit = () => {
    const { name, email, password } = values;
    const isDataValid = validateRegistration(name, email, password, setErrorMessage);
    if (isDataValid) {
      alert('Регистрируем юзера: ' + name + ', ' + email + ', ' + password);
      setValues({ name: '', email: '', password: '' });
    }
  };

  return (
    <main className="register">
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
              type="name"
              autoComplete="on"
              placeholder=""
              id="name"
              name="name"
              className="register__input"
              required
              value={values.name}
              onChange={handleChange}
              onKeyDown={event => {
                event.key === 'Enter' && handleSubmit();
              }}
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
              value={values.email}
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
              type="password"
              autoComplete="on"
              placeholder=""
              id="password"
              name="password"
              className="register__input"
              required
              value={values.password}
              onChange={handleChange}
              onKeyDown={event => {
                event.key === 'Enter' && handleSubmit();
              }}
            />
          </label>
        </fieldset>

        <div className="register__error-wrapper">
          <span className="register__error register__error_shown">{errorMessage}</span>
        </div>
      </form>

      <div className="register__bottom">
        <Button type="blue" text="Зарегистрироваться" onClick={handleSubmit} />
        <div className="register__already-registered-wrapper">
          <span className="register__already-registered-text">Уже зарегистрированы?</span>
          <Link className="register__login-link" to="/signin">
            Войти
          </Link>
        </div>
      </div>
    </main>
  );
}
