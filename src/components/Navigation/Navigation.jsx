import './Navigation.css';

import React from 'react';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

export default function Navigation({ isLoggedIn }) {
  const navigate = useNavigate();

  return (
    <span className="navigation">
      {isLoggedIn ? (
        <>
          <span className="navigation__films">
            <Button type="transparent" text="Фильмы" onClick={() => navigate('/movies')} />

            <Button
              type="transparent"
              text="Сохранённые фильмы"
              onClick={() => navigate('/saved-movies')}
            />
          </span>

          <Button type="gray" text="Аккаунт" onClick={() => navigate('/profile')} />
        </>
      ) : (
        <span className="navigation__auth">
          <Button type="transparent" text="Регистрация" onClick={() => navigate('/signup')} />
          <Button type="green" text="Войти" onClick={() => navigate('/signin')} />
        </span>
      )}
    </span>
  );
}
