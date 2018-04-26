import React from 'react';
// import logo from './home.png';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className="main-header">
      <div className="container">
        <Link to='/'><img src="footer-logo-govt.png" srcSet="home@2x.png 2x,home.png 1x" height="51" alt="Rates Rebates" />
          <p className="heading">Rates Rebates</p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
