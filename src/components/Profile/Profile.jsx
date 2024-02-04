import './Profile.css';

import React from 'react';
import { useState, useEffect } from 'react';

import { useForm } from '../../hooks/useForm';

import Button from '../Button/Button';

export default function Profile({ user, onSubmit }) {
  const { values, setValues, handleChange } = useForm(user);
  const [greetingName, setGreetingName] = useState(user.name);
  const [isUserDataUpdating, setIsUserDataUpdating] = useState(false);

  // if esc pressed, hide edit form and set initial name and email values
  useEffect(() => {
    const handleCloseEditingByEsc = event => {
      const key = event.key;

      if (key === 'Escape') {
        setValues(user);
        setIsUserDataUpdating(false);
      }
    };
    document.addEventListener('keydown', handleCloseEditingByEsc);

    return () => {
      document.removeEventListener('keydown', handleCloseEditingByEsc);
    };
  }, [isUserDataUpdating, user]);

  useEffect(() => setGreetingName(user.name), [user]);

  const handleEditData = event => {
    event.preventDefault();

    if (!isUserDataUpdating) {
      setIsUserDataUpdating(true);
    }
  };

  const handleSubmitData = () => {
    if (user.name === values.name && user.email === values.email) {
      alert('Данные не поменялись');
      setIsUserDataUpdating(false);
      return;
    }
    onSubmit(values);
    setIsUserDataUpdating(false);
  };

  return (
    <section className="profile">
      <span className="profile__greeting">Привет, {greetingName}!</span>
      {!isUserDataUpdating ? (
        <div className="profile__data">
          <div className="profile__row">
            <span className="profile__field">Имя</span>
            <span className="profile__field">{user.name}</span>
          </div>
          <div className="profile__divider"></div>
          <div className="profile__row">
            <span className="profile__field">E-mail</span>
            <span className="profile__field">{user.email}</span>
          </div>
        </div>
      ) : (
        <form className="profile__data" onSubmit={onSubmit}>
          <div className="profile__row">
            <span className="profile__field">Имя</span>
            <input
              className="profile__field profile__input-field"
              name="name"
              value={values.name}
              onChange={handleChange}
            ></input>
          </div>
          <div className="profile__divider"></div>
          <div className="profile__row">
            <span className="profile__field">E-mail</span>
            <input
              className="profile__field profile__input-field"
              name="email"
              value={values.email}
              onChange={handleChange}
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
            />
          </>
        ) : (
          <>
            <div className="profile__updating-error-wrapper">
              <p className="profile__updating-error">При обновлении профиля произошла ошибка.</p>
            </div>
            <Button type="blue" text="Сохранить" onClick={handleSubmitData} />
          </>
        )}
      </div>
    </section>
  );
}
