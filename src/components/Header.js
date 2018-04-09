import React from 'react';
import logo from './home.svg';
import { Link } from 'react-router-dom';

export {
  logo
};

const Header = () => {
  return (
    <header className="main-header">
      <div className="container">
        <Link to='/'><img src={logo} alt="A house" />
        <p className="heading">Rates Rebates</p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
