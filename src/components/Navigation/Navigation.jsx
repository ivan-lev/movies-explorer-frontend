import './Navigation.css';

import React from 'react';
import Button from '../Button/Button';
import { useNavigate, NavLink } from 'react-router-dom';

export default function Navigation({ isLoggedIn }) {
  const navigate = useNavigate();

  return (
    <span className="navigation">
      {isLoggedIn ? (
        <>
          <span className="navigation__films">
            <NavLink
              className={({ isActive }) =>
                `navigation__navlink ${isActive ? 'navigation__navlink_active' : ''}`
              }
              //className="navigation__navlink"
              to="/movies"
            >
              Фильмы
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `navigation__navlink ${isActive ? 'navigation__navlink_active' : ''}`
              }
              to="/saved-movies"
            >
              Сохранённые фильмы
            </NavLink>
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
