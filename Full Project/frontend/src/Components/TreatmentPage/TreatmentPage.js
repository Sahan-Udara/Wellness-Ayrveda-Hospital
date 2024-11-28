import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../Assets/HeroLogo.png";
import CardiacImage from "../../Components/Assets/CardiacDiseases.jpg";
import ArthritisImage from "../../Components/Assets/ArthritisOrthopaedic.jpg";
import LiverDisordersImage from "../../Components/Assets/LiverDisorders.jpg";
import NeurologicalDisordersImage from "../../Components/Assets/NeurologicalDisorders.jpg";
import DermatologicalImage from "../../Components/Assets/Dermatological.jpg";
import NirogaImage from "../../Components/Assets/Niroga.jpg";
import { FaInstagram, FaLinkedin, FaYoutube, FaFacebook } from 'react-icons/fa';
import Chatbox from '../Chatbox/Chatbox';
import './TreatmentPage.css';
import { useNavigate } from 'react-router-dom';


const treatments = [
  {
    id: 1,
    image: CardiacImage, // Use the imported image
    title: 'Cardiac Diseases',
    description: 'To address specific cardiac issues, the Doctor will recommend a combination of Ayurvedic treatments such as full body massage and herbal paste application.',
    benifit: 'Improve circulation',
    minDuration: '7 Days',
  },
  {
    id: 2,
    image: ArthritisImage,
    title: 'Arthritis and Orthopaedic Diseases',
    description: 'To treat arthritis and other orthopaedic diseases, guests will be recommended to undergo treatment such as full body massage and steam bath.',
    benifit: 'Relieve joint pain',
    minDuration: '7 Days',
  },
  {
    id: 3,
    image: LiverDisordersImage,
    title: 'Liver Diseases',
    description: 'To address specific cardiac issues, the Doctor will recommend a combination of Ayurvedic treatments such as full body massage and herbal paste application.',
    benifit: 'Support liver detoxification',
    minDuration: '5 Days',
  },

  {
    id: 4,
    image: NeurologicalDisordersImage,
    title: 'Neurological Diseases',
    description: 'From Parkinsons disease to paralysis and other neurological diseases that affect the brain and nervous system, we adopt a holistic treatment plan to help treat these issues.',
    benifit: 'Improve neurological function',
    minDuration: '7 Days',
  },
  {
    id: 5,
    image: DermatologicalImage,
    title: 'Dermatological Diseases',
    description: 'In Ayurveda the best way to treat dermatological diseases is with a healthy balanced diet and treatments such as medicated butter milk pouring.',
    benifit: 'Enhance skin health',
    minDuration: '7 Days',
  },
  {
    id: 6,
    image: NirogaImage,
    title: 'Niroga',
    description: 'This is perfect for guests experiencing prolonged stress and looking to refresh and rejuvenate their minds. Along with Ayurvedic treatments, you will also have daily yoga and meditation sessions.',
    benifit: 'Refresh and rejuvenate the mind',
    minDuration: '3 Days',
  },
  // Add more treatments here as needed
];

const TreatmentPage = () => {
  const navigate = useNavigate();

  return (
    
    <div className="homeTr-container">
      {/* Header Section */}
      <header className="header">
        <img alt="Logo" className="logo-nav" src={Logo} />
        <div className="logo">
          W E L L N E S S &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          A Y U R V E D A &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          H O S P I T A L
        </div>
        <button className="login-btnAd" onClick={() => navigate('/Header')}>Log Out</button>
        </header>

      {/* Navigation Section */}
      <nav className="navigation">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/treatmentpage">Treatments</Link></li>
          <li><a href="#">Foods</a></li>
          <li><a href="#">Find a Doctor</a></li>
          <li><a href="#">Pharmacy</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>

      <section className="TreatmentHome-section">
  <h2 className="section-title">Treatments</h2>
  <div className="TreatmentHome-content">
    {treatments.map(treatment => (
      <div key={treatment.id} className="treatment-card">
        <img src={treatment.image} alt={treatment.title} className="treatment-image" />
        <div className="treatment-info">
          <h3 className="treatment-title">{treatment.title}</h3>
          <p className="treatment-description">{treatment.description}</p>
          <ul className="treatment-details">
            <li>Benefit: {treatment.benifit}</li> {/* New benefit field */}
            <li>Minimum duration: {treatment.minDuration}</li>
            {/* Optionally include other fields if available */}
          </ul>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <img alt="Logo" className="logo-footer" src={Logo} />
          <div className="quick-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/treatmentpage">Treatments</Link></li>
              <li><a href="#">Foods</a></li>
              <li><a href="#">Pharmacy</a></li>
            </ul>
          </div>
          <div className="about">
            <h4>About</h4>
            <ul>
              <li><a href="#">Find a Doctor</a></li>
              <li><a href="#">Request an Appointment</a></li>
              <li><a href="#">Find a Location</a></li>
              <li><a href="#">Get an Opinion</a></li>
            </ul>
          </div>
          <div className="support">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Donate</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="logo-footer-Text">WELLNESS</div>
        <div className="social-media">
          <a href="#"><FaInstagram size={24} /></a>
          <a href="#"><FaLinkedin size={24} /></a>
          <a href="#"><FaYoutube size={24} /></a>
          <a href="#"><FaFacebook size={24} /></a>
        </div>
      </footer>

      <div className="copy-right">
        <p>© 2024. Designed by Sahan. All rights reserved.</p>
      </div>
      <Chatbox />
    </div>
    
  );
};

export default TreatmentPage;
