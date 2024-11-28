import React from "react";
import "./DNav.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";

function DNav() {
  return (
    <div className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/AdminHome" className="active home-a">
            <h1 className="nav-link">Home</h1>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/addDoctor" className="active home-a">
            <h1 className="nav-link">Add Doctor</h1>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/doctorDetails" className="active home-a">
            <h1 className="nav-link">Doctor Details</h1>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default DNav;
