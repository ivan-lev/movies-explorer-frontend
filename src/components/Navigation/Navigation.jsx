import './Navigation.css';

import { NavLink } from 'react-router-dom';

export default function Navigation({ isLoggedIn }) {
  return (
    <>
      {/* this code renders elemets which will be placed in middle part of header */}
      <div className="navigation">
        <nav className="navigation__movies">
          {isLoggedIn && (
            <>
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
            </>
          )}
        </nav>
      </div>
    </>
  );
}
