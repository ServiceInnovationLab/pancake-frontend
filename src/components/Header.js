import React from 'react';
import logo from './home.svg';

export {
  logo
};

const Header = () => {
  return (
    <header className="main-header">
      <img src={logo} alt="A house" />
      <p className="heading">Rates Rebates</p>
    </header>
  );
};

export default Header;
