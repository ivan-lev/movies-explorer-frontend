import './Header.css';

import React from 'react';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';

export default function Header({ ...props }) {
  return <header className="header">{props.children}</header>;
}
