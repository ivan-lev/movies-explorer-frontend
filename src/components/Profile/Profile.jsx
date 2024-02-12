import './Profile.css';

import React from 'react';
import { useState, useEffect } from 'react';

import { useFormWithValidation } from '../../hooks/useFormWithValidation';

import Button from '../Button/Button';
import { errorMessages } from '../../variables/errorMessages';

export default function Profile({ currentUser, onSubmit, onLogout }) {
  const {
    values,
    setValues,
    valuesValidity,
    setValuesValidity,
    errorToShow,
    handleChange,
    isValid,
    resetForm
  } = useFormWithValidation();
  const [greetingName, setGreetingName] = useState(currentUser.name);
  const [isUserDataUpdating, setIsUserDataUpdating] = useState(false);
  const [isValuesDiffers, setIsValuesDiffers] = useState(true);

  const [errorMessage, setErrorMessage] = useState('При обновлении профиля произошла ошибка');

  // set current user input values and make them valid as they valid
  useEffect(() => {
    setValues({ name: currentUser.name, email: currentUser.email });
    setValuesValidity({ name: true, email: true });
  }, []);

  // check if inputs' values different from current user data
  useEffect(() => {
    if (values.name === currentUser.name && values.email === currentUser.email) {
      setIsValuesDiffers(false);
    } else {
      setIsValuesDiffers(true);
    }
  }, [values]);

  // if esc pressed, hide edit form and set initial name and email values
  // useEffect(() => {
  //   const handleCloseEditingByEsc = event => {
  //     const key = event.key;

  //     if (key === 'Escape') {
  //       setValues(currentUser);
  //       setIsUserDataUpdating(false);
  //     }
  //   };
  //   document.addEventListener('keydown', handleCloseEditingByEsc);

  //   return () => {
  //     document.removeEventListener('keydown', handleCloseEditingByEsc);
  //   };
  // }, [isUserDataUpdating, currentUser, setValues]);

  useEffect(() => setGreetingName(currentUser.name), [currentUser]);

  const handleEditData = event => {
    event.preventDefault();

    if (!isUserDataUpdating) {
      setIsUserDataUpdating(true);
    }
  };

  const handleSubmitData = () => {
    const { name, email } = values;
    // if data in inputs is the same - do nothing
    if (name === currentUser.name && email === currentUser.email) {
      setIsUserDataUpdating(false);
      return;
    }

    onSubmit(values);
    setIsUserDataUpdating(false);
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
                <p className="profile__updating-error">{errorToShow}</p>
              </div>
              <Button
                type={`blue ${!isValid ? 'button_disabled' : ''}`}
                text={isValuesDiffers ? 'Сохранить' : 'Закрыть'}
                onClick={handleSubmitData}
              />
            </>
          )}
        </div>
      </section>
    </main>
  );
}
