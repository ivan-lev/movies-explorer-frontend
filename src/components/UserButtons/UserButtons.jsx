import './UserButtons.css';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MobileMenu from '../MobileMenu/MobileMenu';
import Button from '../Button/Button';

export default function UserButtons({ isLoggedIn }) {
  const navigate = useNavigate();

  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const toggleOpenMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };
  useEffect(() => {
    document.body.style.overflow = `${isMenuOpened ? 'hidden' : ''}`;
  }, [isMenuOpened]);

  return isLoggedIn ? (
    /* this code renders elemets which will be placed in right part of header */
    <div className="user-buttons">
      <div className="user-buttons__account-button">
        <Button type="gray" text="Аккаунт" onClick={() => navigate('/profile')} />
      </div>
      {isMenuOpened && <MobileMenu onClose={toggleOpenMenu} />}
      <Button type="burger" onClick={toggleOpenMenu}></Button>
    </div>
  ) : (
    <div className="auth-buttons">
      <Button type="transparent" text="Регистрация" onClick={() => navigate('/signup')} />
      <Button type="green" text="Войти" onClick={() => navigate('/signin')} />
    </div>
  );
}
