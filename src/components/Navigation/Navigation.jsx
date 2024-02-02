import './Navigation.css';

import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import Button from '../Button/Button';
import MobileMenu from '../MobileMenu/MobileMenu';

export default function Navigation({ isLoggedIn }) {
  const navigate = useNavigate();

  // if change isMenuOpened to 'true', then make overflow hidden for document
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const toggleOpenMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };
  useEffect(() => {
    document.body.style.overflow = `${isMenuOpened ? 'hidden' : ''}`;
  }, [isMenuOpened]);

  return (
    <>
      {isMenuOpened && <MobileMenu onClose={toggleOpenMenu} />}
      <div className="MOVIES_DIV">
        {isLoggedIn ? (
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
        ) : (
          <div></div>
        )}
      </div>
      <div className="USER_DIV">
        {isLoggedIn ? (
          <>
            <div className="navigation__user-button">
              <Button type="gray" text="Аккаунт" onClick={() => navigate('/profile')} />
            </div>
            <div className="navigation__mobile-menu-button">
              <Button type="burger" onClick={toggleOpenMenu}></Button>
            </div>
          </>
        ) : (
          <div className="navigation__auth-buttons">
            <Button type="transparent" text="Регистрация" onClick={() => navigate('/signup')} />
            <Button type="green" text="Войти" onClick={() => navigate('/signin')} />
          </div>
        )}
      </div>
    </>
  );

  // return isLoggedIn ? (
  //   <>
  //     {isMenuOpened && <MobileMenu onClose={toggleOpenMenu} />}
  //     <Button type="burger" onClick={toggleOpenMenu}></Button>
  //
  //
  //   </>
  // ) : (
  //   <>
  //     <div></div>
  //
  //   </>
  // );

  // return isLoggedIn ? (
  //   <>
  //     {isMenuOpened && <MobileMenu onClose={toggleOpenMenu} />}
  //     <Button type="burger" onClick={toggleOpenMenu}></Button>
  //     <nav className="navigation__movies">
  //       <NavLink
  //         className={({ isActive }) =>
  //           `navigation__navlink ${isActive ? 'navigation__navlink_active' : ''}`
  //         }
  //         to="/movies"
  //       >
  //         Фильмы
  //       </NavLink>

  //       <NavLink
  //         className={({ isActive }) =>
  //           `navigation__navlink ${isActive ? 'navigation__navlink_active' : ''}`
  //         }
  //         to="/saved-movies"
  //       >
  //         Сохранённые фильмы
  //       </NavLink>
  //     </nav>
  //     <div className="navigation__user-buttons">
  //       <Button type="gray" text="Аккаунт" onClick={() => navigate('/profile')} />
  //     </div>
  //   </>
  // ) : (
  //   <>
  //     <div></div>
  //     <div className="navigation__auth-buttons">
  //       <Button type="transparent" text="Регистрация" onClick={() => navigate('/signup')} />
  //       <Button type="green" text="Войти" onClick={() => navigate('/signin')} />
  //     </div>
  //   </>
  // );
}
