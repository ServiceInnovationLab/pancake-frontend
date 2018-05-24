import React from 'react';

const Footer = props => {
  return (
    <footer className="footer">
      <div className="container">
        <div>
          <img src="footer-logo-govt.png" srcSet="footer-logo-govt@2x.png 2x,footer-logo-govt.png 1x" width="240" height="46" alt="New Zealand Government" />
          <p>Alpha</p>
          <span onClick={props.showPrivacyStatement}>Privacy Statement</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
