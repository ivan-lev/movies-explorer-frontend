import './Profile.css';

import React from 'react';
import { useState, useEffect, useContext } from 'react';

import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import CurrentUserContext from '../../contexts/currentUserContext';

import Button from '../Button/Button';

export default function Profile({ token, onUpdate, onLogout, error }) {
  const currentUser = useContext(CurrentUserContext);

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
  const [isUserDataUpdating, setIsUserDataUpdating] = useState(false);
  const [isValuesDiffers, setIsValuesDiffers] = useState(true);

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

  const handleEditData = event => {
    event.preventDefault();

    if (!isUserDataUpdating) {
      setIsUserDataUpdating(true);
    }
  };

  const handleSubmitUserInfo = () => {
    const { name, email } = values;
    // if data in inputs is the same - do nothing
    if (name === currentUser.name && email === currentUser.email) {
      setIsUserDataUpdating(false);
      return;
    }

    onUpdate(name, email, token);
    setIsUserDataUpdating(false);
  };

  return (
    <main className="main">
      <section className="profile">
        <h1 className="profile__greeting">Привет, {currentUser.name}!</h1>
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
          <form className="profile__data" onSubmit={handleSubmitUserInfo}>
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

            <div className="profile__validation-error-wrapper">
              <span className="profile__validation-error">{errorToShow}</span>
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
                <p className="profile__updating-error">{error}</p>
              </div>
              <Button
                type={`blue ${!isValid ? 'button_disabled' : ''}`}
                text={isValuesDiffers ? 'Сохранить' : 'Закрыть'}
                onClick={handleSubmitUserInfo}
              />
            </>
          )}
        </div>
      </section>
    </main>
  );
}
