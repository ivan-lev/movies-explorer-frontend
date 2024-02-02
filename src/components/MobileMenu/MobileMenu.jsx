import './MobileMenu.css';

import React from 'react';

export default function MobileMenu({ onClose }) {
  return (
    <div className="mobile-menu">
      <button onClick={onClose}>X</button>
    </div>
  );
}
