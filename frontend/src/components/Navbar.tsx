import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../css/navbar.css';

const Navbar: React.FC = () => {
  // Toggle mobile navigation with state
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavOpen((prev) => !prev);
  };

  return (
    <nav className="navigation">
      <h2>Online Learning Platform</h2>

      <ul className="navigation__ul">
        <li><Link to='/' className="hideOnMobile">Home</Link></li>
        <li><a href="#about" className="hideOnMobile">About</a></li>
        <li><a href="#services" className="hideOnMobile">Services</a></li>
        <li><a href="#projects" className="hideOnMobile">Projects</a></li>
      </ul>

      <div className="navigation__social-media">
        <div className="social-media__icons">
          <a href="https://github.com/Ratified" className="hideOnMobile"><i className="fab fa-github"></i></a>
          <a href="https://www.linkedin.com/in/george-kamunge-2a30a5233" className="hideOnMobile"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>

      {/* Responsive */}
      <div className="navigation__hamburger" onClick={toggleMobileNav}>
        <i className="fas fa-bars"></i>
      </div>

      <div className={`mobile-navigation ${isMobileNavOpen ? 'active' : ''}`}>
        <div className="mobile-navigation__close" onClick={toggleMobileNav}>
          <i className="fas fa-times"></i>
        </div>
        <ul className="mobile-navigation__ul">
          <li><Link to='/' onClick={toggleMobileNav}>Home</Link></li>
          <li><a href="#about" onClick={toggleMobileNav}>About</a></li>
          <li><a href="#services" onClick={toggleMobileNav}>Services</a></li>
          <li><a href="#projects" onClick={toggleMobileNav}>Projects</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;