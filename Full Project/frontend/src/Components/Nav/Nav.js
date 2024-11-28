import React from 'react'
import './Nav.css'; // Import the CSS file
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className='nav-container'>
        <ul className='home-ul'>
            <li className='home-li'>
                <Link to="/AdminHome" className='active home-a'>
                <h1>Home</h1></Link>
            </li>
            <li className='home-li'>
                <Link to="/addappoinment" className='active home-a'>
                <h1>Appoinment Shecdule</h1></Link>
            </li>
            <li className='home-li'>
                <Link to="/appoinmentdetails" className='active home-a'>
                
                <h1>AppoinmetDetails</h1>
                </Link>    
            </li>

        </ul>
    </div>
  )
}

export default Nav