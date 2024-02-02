import './Navigation.css';

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import Button from '../Button/Button';
import MobileMenu from '../MobileMenu/MobileMenu';

export default function Navigation({ isLoggedIn }) {
  const navigate = useNavigate();
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const toggleOpenMenu = () => {
    document.body.style.overflow = `${isMenuOpened ? 'hidden' : ''}`;
    setIsMenuOpened(!isMenuOpened);
  };

  return isLoggedIn ? (
    <>
      {isMenuOpened && <MobileMenu onClose={toggleOpenMenu} />}
      <Button type="burger" onClick={toggleOpenMenu}></Button>
      <nav className="navigation__movies">
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
      </nav>
      <div className="navigation__user-buttons">
        <Button type="gray" text="Аккаунт" onClick={() => navigate('/profile')} />
      </div>
    </>
  ) : (
    <>
      <div></div>
      <div className="navigation__auth-buttons">
        <Button type="transparent" text="Регистрация" onClick={() => navigate('/signup')} />
        <Button type="green" text="Войти" onClick={() => navigate('/signin')} />
      </div>
    </>
  );
}
