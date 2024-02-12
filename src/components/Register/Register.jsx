import './Register.css';

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useFormWithValidation } from '../../hooks/useFormWithValidation';

import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import { errorMessages } from '../../variables/errorMessages';

export default function Register({ onSubmit, onRegister }) {
  const navigate = useNavigate();
  const { values, setValuesValidity, errorToShow, handleChange, isValid, resetForm } =
    useFormWithValidation();
  const [registrationError, setRegistrationError] = useState('');

  // set values validity to false as we have blank inputs at start
  useEffect(() => {
    setValuesValidity({ name: false, email: false, password: false });
  }, []);

  const handleSubmit = () => {
    if (!isValid) {
      return;
    }
    if (registrationError) {
      setRegistrationError('');
    }
    const { name, email, password } = values;
    onSubmit(name, email, password)
      .then(response => {
        resetForm();
        // need to add code here for save user data
        onRegister(response);
        navigate('/movies');
      })
      .catch(error => {
        switch (error.status) {
          case 409:
            setRegistrationError(errorMessages.userExist);
            break;
          case 500:
            setRegistrationError(errorMessages.couldNotRegister);
        }
      });
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
          <span className="register__registration-error">{registrationError}</span>
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
