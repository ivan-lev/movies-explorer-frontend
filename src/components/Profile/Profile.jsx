import './Profile.css';

import React from 'react';
import { useState, useEffect } from 'react';

import Button from '../Button/Button';

export default function Profile({ user, onSubmit }) {
  const [formValues, setFormValues] = useState(user);
  const [greetingName, setGreetingName] = useState(user.name);
  const [isUserDataUpdating, setIsUserDataUpdating] = useState(false);

  // if esc pressed, hide edit form and set initial name and email values
  useEffect(() => {
    const handleKeyDown = event => {
      const key = event.key;

      if (key === 'Escape') {
        setFormValues(user);
        setIsUserDataUpdating(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isUserDataUpdating, user]);

  useEffect(() => setGreetingName(user.name), [user]);

  const handleChange = event => {
    const { name, value } = event.target;

    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleEditData = event => {
    event.preventDefault();

    if (!isUserDataUpdating) {
      setIsUserDataUpdating(true);
    }
  };

  const handleSubmitData = () => {
    if (user.name === formValues.name && user.email === formValues.email) {
      alert('Данные не поменялись');
      setIsUserDataUpdating(false);
      return;
    }
    onSubmit(formValues);
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
              value={formValues.name}
              onChange={handleChange}
            ></input>
          </div>
          <div className="profile__divider"></div>
          <div className="profile__row">
            <span className="profile__field">E-mail</span>
            <input
              className="profile__field profile__input-field"
              name="email"
              value={formValues.email}
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
