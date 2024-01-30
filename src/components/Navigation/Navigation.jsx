import './Navigation.css';

import React from 'react';
import Button from '../Button/Button';
import { useNavigate, NavLink } from 'react-router-dom';

export default function Navigation({ isLoggedIn }) {
  const navigate = useNavigate();

  return (
    <span>
      {isLoggedIn && (
        <span className="navigation">
          <NavLink
            className={({ isActive }) =>
              `navigation__navlink ${isActive ? 'navigation__navlink_active' : ''}`
            }
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
      )}
    </span>
  );
}
