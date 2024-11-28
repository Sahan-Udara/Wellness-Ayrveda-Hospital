import React from 'react';
import './HomeNav.css';
import Logo from "../Assets/HeroLogo.png";
import { Link } from 'react-router-dom'; // Import Link for client-side routing


const HomeNav = () => {
  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="header">
        <img alt="Logo" className="logo-nav" src={Logo} />
        <div className="logo">
          W E L L N E S S &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          A Y U R V E D A &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          H O S P I T A L
        </div>
        <button className="login-btn">Login</button>
      </header>

      {/* Navigation Section */}
      <nav className="navigation">
        <ul>
        <li><Link to="/Home">Home</Link></li>
          <li><Link to="/treatmentpage">Treatments</Link></li>
          <li><a href="#">Foods</a></li>
          <li><a href="#">Find a Doctor</a></li>
          <li><a href="#">Pharmacy</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default HomeNav;
