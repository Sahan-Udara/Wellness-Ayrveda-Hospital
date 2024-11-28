import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' instead of 'react-dom'
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Create a root using the new API
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component inside the root
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
