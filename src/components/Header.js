import React from 'react';
import headerLogo from '../images/mesto.svg';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
    </header>
  )
}

export default Header;