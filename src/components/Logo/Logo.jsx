import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';
import logo from '../../images/icons/logo.svg';

export default function Logo() {
  return (
    <Link to="/">
      <img className="logo" alt="logo" src={logo}></img>
    </Link>
  );
}
