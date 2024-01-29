import React from 'react';
import './Button.css';

export default function Button({ type, text, onClick }) {
  return (
    <button className={`button button_${type}`} onClick={onClick}>
      {text}
    </button>
  );
}
