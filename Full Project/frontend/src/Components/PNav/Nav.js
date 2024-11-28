import React from 'react'
import "./nav.css"; 
import {Link} from "react-router-dom"


function Nav() {
  return (
    <div>
        <ul className="home-ul">
          <li className='home-li'>
            <Link to="/AdminHome" className="active home-a">
            <h1>Home</h1></Link></li>
          <li className='home-li'>
          <Link to="/AddPatient" className="active home-a"><h1>ADD Patient</h1></Link>
          </li>
          <li className='home-li'>
          <Link to="/Patientdetails" className="active home-a"><h1>Patient Details</h1></Link>
          </li>
        </ul>
         </div>
  )
}

export default Nav