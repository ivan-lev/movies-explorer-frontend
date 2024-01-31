import './Profile.css';

import React from 'react';
import { useState, useEffect } from 'react';

import Button from '../Button/Button';

export default function Profile() {
  const [formValues, setFormValues] = useState({
    name: 'Иван',
    email: 'fanatos@mail.com'
  });
  const [initialFormValues, setInitialFormValues] = useState({
    name: '',
    email: ''
  });
  const [greetingName, setGreetingname] = useState(formValues.name);
  const [isUserDataUpdating, setIsUserDataUpdating] = useState(false);

  // if esc pressed, hide edit form and set initial name and email values
  useEffect(() => {
    const handleKeyDown = event => {
      const key = event.key;
      setInitialFormValues(formValues);

      if (key === 'Escape') {
        setFormValues(initialFormValues);
        setIsUserDataUpdating(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isUserDataUpdating]);

  const handleChange = event => {
    const { name, value } = event.target;

    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!isUserDataUpdating) {
      setIsUserDataUpdating(true);
      setInitialFormValues(formValues);
    }

    if (isUserDataUpdating) {
      if (
        initialFormValues.name === formValues.name &&
        initialFormValues.email === formValues.email
      ) {
        alert('Данные не поменялись');
        setIsUserDataUpdating(false);
        return;
      }
      const { name, email } = formValues;
      alert('Отправляем имя и мэйл: ' + name + ', ' + email);
      setGreetingname(formValues.name);
      setIsUserDataUpdating(false);
    }
  };

  return (
    <section className="profile">
      <span className="profile__greeting">Привет, {greetingName}!</span>
      {!isUserDataUpdating ? (
        <div className="profile__data">
          <div className="profile__row">
            <span className="profile__field">Имя</span>
            <span className="profile__field">{formValues.name}</span>
          </div>
          <div className="profile__divider"></div>
          <div className="profile__row">
            <span className="profile__field">E-mail</span>
            <span className="profile__field">{formValues.email}</span>
          </div>
        </div>
      ) : (
        <form className="profile__data" onSubmit={handleSubmit}>
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

      {!isUserDataUpdating ? (
        <div className="profile__wrapper">
          <Button
            type="transparent button_bigger-font"
            text="Редактировать"
            onClick={handleSubmit}
          />
          <Button
            type="transparent button_bigger-font button_text-crimson"
            text="Выйти из аккаутна"
          />
        </div>
      ) : (
        <div className="profile__wrapper">
          <div className="profile__updating-error-wrapper">
            <p className="profile__updating-error">При обновлении профиля произошла ошибка.</p>
          </div>
          <Button type="blue" text="Сохранить" onClick={handleSubmit} />
        </div>
      )}
    </section>
  );
}
