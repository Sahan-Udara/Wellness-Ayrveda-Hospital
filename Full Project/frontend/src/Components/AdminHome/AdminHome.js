import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminHome.css';
import Logo from "../Assets/HeroLogo.png";

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Home Header */}
      <header className="header">
        <img alt="" className="logo-nav" src={Logo} />
        <div className="logo">
          W E L L N E S S 
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          A Y R V E D A
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          H O S P I T A L
        </div>
        <button className="login-btnAd" onClick={() => navigate('/')}>Home</button>
        </header>
      
      <h1 className="admin-title">Admin Dashboard</h1>
      <div className="admin-center1">
      <div className="admin-buttons-container">
        <button className="admin-button" onClick={() => navigate('/NurseLogin')}>Appointment Scheduling</button>
        <button className="admin-button" onClick={() => navigate('/DoctorLogin')}>Manage Doctors</button>
        <button className="admin-button" onClick={() => navigate('/treatmentlogin')}>Treatment Specialist</button> {/* Link to AddTreatment */}
        <button className="admin-button" onClick={() => navigate('/addPayment')}>Payment Handling</button>
        <button className="admin-button">Staff Management</button>
        <button className="admin-button">Pharmacy Management</button>
        <button className="admin-button">Equipment Handling</button>
        <button className="admin-button" onClick={() => navigate('/FoodLogin')}>Healthy Food Coordinator</button>
      </div>
      </div>
    </div>
  );
};

export default AdminHome;
