import './Header.css';

import React from 'react';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';

export default function Header({ isLoggedIn }) {
  return (
    <header className="header">
      <Logo />
      {isLoggedIn ? (
        <span className="header__links-panel">
          <span className="header__links-films">
            <Button type="transparent" text="Фильмы" onClick={() => console.log('click')} />
            <Button
              type="transparent"
              text="Сохранённые фильмы"
              onClick={() => console.log('click')}
            />
          </span>
          <Button type="gray" text="Аккаунт" onClick={() => console.log('click')} />
        </span>
      ) : (
        <span className="header__links-auth">
          <Button type="transparent" text="Регистрация" onClick={() => console.log('click')} />
          <Button type="green" text="Войти" onClick={() => console.log('click')} />
        </span>
      )}
    </header>
  );
}
