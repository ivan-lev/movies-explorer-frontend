import './NotFound.css';

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  function handleGoBack(event) {
    event.preventDefault();
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  }

  return (
    <section className="not-found">
      <div className="not-found__content">
        <h2 className="not-found__title">404</h2>
        <p className="not-found__subtitle">Страница не найдена</p>
      </div>
      <Link className="not-found__return-link" to={'..'} onClick={handleGoBack}>
        Назад
      </Link>
    </section>
  );
}
