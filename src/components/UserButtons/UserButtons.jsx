import './UserButtons.css';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../Button/Button';

export default function UserButtons({ isLoggedIn }) {
  const navigate = useNavigate();
  return (
    <span className="user-buttons">
      {isLoggedIn ? (
        <Button type="gray" text="Аккаунт" onClick={() => navigate('/profile')} />
      ) : (
        <span className="user-buttons__auth">
          <Button type="transparent" text="Регистрация" onClick={() => navigate('/signup')} />
          <Button type="green" text="Войти" onClick={() => navigate('/signin')} />
        </span>
      )}
    </span>
  );
}
