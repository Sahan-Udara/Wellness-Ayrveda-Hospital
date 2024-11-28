import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
// import logo from './Assets/logo.png'; // Adjust the path as necessary

function Header() {
  const navigate = useNavigate(); // Initialize navigate hook

  const handleLoginClick = () => {
    navigate('/admin-login'); // Redirect to admin login page
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          {/* Logo Section */}
          <a className="navbar-brand" href="#">
            <img
              // src={logo}
              alt="Hospital Logo"
              style={{
                height: '50px', // Adjust size as needed
                marginRight: '20px', // Space between logo and title
              }}
            />
            WELLNESS AYURWEDA HOSPITAL
          </a>

          {/* Navbar Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Treatments
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Foods
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Find Doctor
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pharmacy
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact
                </a>
              </li>
            </ul>

            {/* Login Button */}
            <button className="btn btn-outline-success" type="button" onClick={handleLoginClick}>
              Login
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
