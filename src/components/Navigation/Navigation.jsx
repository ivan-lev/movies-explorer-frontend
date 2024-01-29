import './Navigation.css';

import React from 'react';
import Button from '../Button/Button';

export default function Navigation({ isLoggedIn }) {
  return (
    <>
      {isLoggedIn ? (
        <span className="navigation">
          <span className="navigation__films">
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
        <span className="navigation__auth">
          <Button type="transparent" text="Регистрация" onClick={() => console.log('click')} />
          <Button type="green" text="Войти" onClick={() => console.log('click')} />
        </span>
      )}
    </>
  );
}
