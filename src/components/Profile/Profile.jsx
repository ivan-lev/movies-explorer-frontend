import './Profile.css';

import React from 'react';
import { useState } from 'react';

import Button from '../Button/Button';

export default function Profile() {
  const [userName, setUserName] = useState('Иван');
  const [email, setEmail] = useState('ivan@mail.com');

  return (
    <section className="profile">
      <span className="profile__greeting">Привет, {userName}!</span>
      <div className="profile__data">
        <div className="profile__row">
          <span className="profile__field">Имя</span>
          <span className="profile__field">{userName}</span>
        </div>
        <div className="profile__divider"></div>
        <div className="profile__row">
          <span className="profile__field">E-mail</span>
          <span className="profile__field">{email}</span>
        </div>
      </div>
      <div className="profile__wrapper">
        <Button type="transparent button_bigger-font" text="Редактировать"></Button>
        <Button
          type="transparent button_bigger-font button_text-crimson"
          text="Выйти из аккаутна"
        ></Button>
      </div>
    </section>
  );
}
