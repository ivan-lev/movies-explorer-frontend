import './MobileMenu.css';

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import Button from '../Button/Button';

export default function MobileMenu({ onClose }) {
  const navigate = useNavigate();
  return (
    <div className="mobile-menu">
      <div className="mobile-menu__overlay"></div>
      <div className="mobile-menu__content">
        <Button type="cross" onClick={onClose} />
        <nav className="mobile-menu__nav-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `mobile-menu__link ${isActive && 'mobile-menu__link_active'}`
            }
          >
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `mobile-menu__link ${isActive && 'mobile-menu__link_active'}`
            }
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className={({ isActive }) =>
              `mobile-menu__link ${isActive && 'mobile-menu__link_active'}`
            }
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
        <Button type="gray" text="Аккаунт" onClick={() => navigate('/profile')} />
      </div>
    </div>
  );
}
