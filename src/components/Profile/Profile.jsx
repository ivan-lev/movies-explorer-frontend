import './Profile.css';

import React from 'react';
import { useState, useEffect } from 'react';

import { useForm } from '../../hooks/useForm';
import { validateProfileUpdate } from '../../utils/formValidator';

import Button from '../Button/Button';

export default function Profile({ currentUser, onSubmit, onLogout }) {
  const { values, setValues, handleChange } = useForm(currentUser);
  const [greetingName, setGreetingName] = useState(currentUser.name);
  const [isUserDataUpdating, setIsUserDataUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('При обновлении профиля произошла ошибка');

  // if esc pressed, hide edit form and set initial name and email values
  useEffect(() => {
    const handleCloseEditingByEsc = event => {
      const key = event.key;

      if (key === 'Escape') {
        setValues(currentUser);
        setIsUserDataUpdating(false);
      }
    };
    document.addEventListener('keydown', handleCloseEditingByEsc);

    return () => {
      document.removeEventListener('keydown', handleCloseEditingByEsc);
    };
  }, [isUserDataUpdating, currentUser, setValues]);

  useEffect(() => setGreetingName(currentUser.name), [currentUser]);

  const handleEditData = event => {
    event.preventDefault();

    if (!isUserDataUpdating) {
      setIsUserDataUpdating(true);
    }
  };

  const handleSubmitData = () => {
    const { name, email } = values;
    if (name === currentUser.name && email === currentUser.email) {
      setIsUserDataUpdating(false);
      return;
    }
    const isDataValid = validateProfileUpdate(name, email, setErrorMessage);

    if (isDataValid) {
      onSubmit(values);
      setIsUserDataUpdating(false);
    }
  };

  return (
    <main className="main">
      <section className="profile">
        <h1 className="profile__greeting">Привет, {greetingName}!</h1>
        {!isUserDataUpdating ? (
          <div className="profile__data">
            <div className="profile__row">
              <span className="profile__field">Имя</span>
              <span className="profile__field">{currentUser.name}</span>
            </div>
            <div className="profile__divider"></div>
            <div className="profile__row">
              <span className="profile__field">E-mail</span>
              <span className="profile__field">{currentUser.email}</span>
            </div>
          </div>
        ) : (
          <form className="profile__data" onSubmit={onSubmit}>
            <div className="profile__row">
              <span className="profile__field">Имя</span>
              <input
                className="profile__field profile__input-field"
                type="text"
                name="name"
                placeholder="Введите имя"
                value={values.name}
                onChange={handleChange}
                required
                validate="true"
              ></input>
            </div>
            <div className="profile__divider"></div>
            <div className="profile__row">
              <span className="profile__field">E-mail</span>
              <input
                className="profile__field profile__input-field"
                type="text"
                name="email"
                placeholder="Введите email"
                value={values.email}
                onChange={handleChange}
                required
                validate="true"
              ></input>
            </div>
          </form>
        )}
        <div className="profile__buttons-wrapper">
          {!isUserDataUpdating ? (
            <>
              <Button
                type="transparent button_bigger-font"
                text="Редактировать"
                onClick={handleEditData}
              />
              <Button
                type="transparent button_bigger-font button_text-crimson"
                text="Выйти из аккаутна"
                onClick={onLogout}
              />
            </>
          ) : (
            <>
              <div className="profile__updating-error-wrapper">
                <p className="profile__updating-error">{errorMessage}</p>
              </div>
              <Button type="blue" text="Сохранить" onClick={handleSubmitData} />
            </>
          )}
        </div>
      </section>
    </main>
  );
}
