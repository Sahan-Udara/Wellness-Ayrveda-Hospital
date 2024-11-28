import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NurseLogin.css'; // Reusing the same styles for consistency
import Logo from "../Assets/HeroLogo.png"; // Import your logo

const DoctorLogin = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation logic (can be replaced with backend authentication)
    if (loginData.username === "admin" && loginData.password === "password") {
      navigate('/admin-home'); // Navigate to admin home if login is successful
    } else if (loginData.username === "doctoradmin" && loginData.password === "12345") {
      navigate('/addDoctor'); // Navigate to AddTreatment if treatmentadmin logs in
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="home-back">
      {/* Home Header */}
      <header className="header">
        <img alt="" className="logo-nav" src={Logo} /> 
        <div className="logo">W E L L N E S S &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; A Y U R V E D A &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; H O S P I T A L</div>
      </header>
      
      <div className="login-form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h1>Admin Doctor Login</h1>

          <label>Username</label>
          <input
            type="text"
            name="username"
            value={loginData.username}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" id="submit-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default DoctorLogin;
