import './Profile.css';

// React and hooks
import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

// components
import Button from '../Button/Button';

// utils and variables
import CurrentUserContext from '../../contexts/currentUserContext';
import { mainApi } from '../../utils/MainApi';
import { PROFILE_MESSAGES } from '../../variables/messages';

export default function Profile({ token, setCurrentUser, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  const {
    values,
    setValues,
    setValuesValidity,
    errorToShow,
    setErrorToShow,
    handleChange,
    isValid
  } = useFormWithValidation();
  const [isUserDataUpdating, setIsUserDataUpdating] = useState(false);
  const [isValuesDiffers, setIsValuesDiffers] = useState(true);
  const [profileUpdateError, setProfileUpdateError] = useState('');
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [isInputsDisabled, setIsInputsDisabled] = useState(false);

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
        setValuesValidity({ name: true, email: true });
        setErrorToShow('');
      }
    };
    document.addEventListener('keydown', handleCloseEditingByEsc);

    return () => {
      document.removeEventListener('keydown', handleCloseEditingByEsc);
    };
  }, [isUserDataUpdating, currentUser, setValues]);

  const handleIsDataEdited = event => {
    event.preventDefault();
    setIsSubmitSuccessful(false);
    setProfileUpdateError(false);
    setIsInputsDisabled(false);
    if (!isUserDataUpdating) {
      setIsUserDataUpdating(true);
    }
  };

  const handleSubmitUserInfo = () => {
    setIsInputsDisabled(true);
    const { name, email } = values;
    // if data in inputs is the same - do nothing
    if (!isValuesDiffers) {
      setIsUserDataUpdating(false);
      setIsInputsDisabled(false);
      return;
    }
    // check if all inputs filled and valid
    if (!isValid || Object.values(values).some(value => value.length === 0)) {
      setIsInputsDisabled(false);
      return;
    }

    mainApi
      .setUserInfo(name, email, token)
      .then(response => {
        setCurrentUser(response);
        setIsUserDataUpdating(false);
        setIsValuesDiffers(false);
        setIsSubmitSuccessful(true);
      })
      .catch(error => {
        console.log(error);

        const errorStatus = error.status;
        switch (errorStatus) {
          case 409:
            setProfileUpdateError(PROFILE_MESSAGES.EMAIL_EXISTS);
            break;
          case 500:
            setProfileUpdateError(PROFILE_MESSAGES.UPDATE_ERROR);
        }
      })
      .finally(() => {
        setIsInputsDisabled(false);
      });
  };

  const handleHideErrorOnType = event => {
    profileUpdateError && setProfileUpdateError(false);
    handleChange(event);
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
            {isSubmitSuccessful && (
              <span className="profile__data_updated">{PROFILE_MESSAGES.UPDATE_SUCCESS}</span>
            )}
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
                value={values?.name || ''}
                onChange={handleHideErrorOnType}
                required
                disabled={isInputsDisabled}
                autoFocus
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
                value={values?.email || ''}
                onChange={handleHideErrorOnType}
                required
                disabled={isInputsDisabled}
              ></input>
            </div>

            <div className="profile__validation-error-wrapper">
              <span className="profile__validation-error">{errorToShow}</span>
            </div>
          </form>
        )}

        <div className="profile__buttons-wrapper">
          {!isUserDataUpdating ? (
            <Button
              type="transparent button_bigger-font"
              text="Редактировать"
              onClick={handleIsDataEdited}
            />
          ) : (
            <>
              <div className="profile__updating-error-wrapper">
                <p className="profile__updating-error">{profileUpdateError}</p>
              </div>
              <Button
                type={`transparent button_bigger-font ${
                  !isValid || isInputsDisabled ? 'button_text-crimson' : ''
                }`}
                text={isValuesDiffers ? 'Сохранить' : 'Закрыть'}
                onClick={handleSubmitUserInfo}
                disabled={isInputsDisabled}
              />
            </>
          )}
          <Button
            type="transparent button_bigger-font button_text-crimson"
            text="Выйти из аккаутна"
            onClick={onLogout}
          />
        </div>
      </section>
    </main>
  );
}
