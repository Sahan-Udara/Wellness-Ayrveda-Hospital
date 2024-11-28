import React, { useState } from "react";
import DNav from "../DNav/DNav";
import { useNavigate } from "react-router-dom";
import "./AddDoctor.css";
import axios from "axios";

function AddDoctor() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    gmail: "",
    phone: "",
    Gender: "",
    age: "",
    Specialiation: "",
    Qualification: "",
    Experience: "",
    About: "",
  });

  const [isEmailValid, setIsEmailValid] = useState(false); // Track email validation
  const [ageError, setAgeError] = useState(""); // Track age validation error

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Real-time email validation
    if (name === "gmail") {
      const emailPattern = /^[\w.%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
      setIsEmailValid(emailPattern.test(value)); // Check if the email is valid
    }

    // Filter out special characters for the name input
    if (name === "name") {
      const namePattern = /^[A-Za-z\s]*$/; // Allows only letters and spaces
      if (!namePattern.test(value)) {
        return; // Prevent updating state if invalid characters are entered
      }
    }

    // Age validation
    if (name === "age") {
      const ageValue = Number(value);
      if (ageValue < 20 || ageValue > 70) {
        setAgeError("Age must be between 20 and 70."); // Set error message
      } else {
        setAgeError(""); // Clear error message if age is valid
      }
    }

    // Set input values based on user input
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history("/doctorDetails"));
  };

  const sendRequest = async () => {
    await axios
      .post("http://Localhost:5000/doctors", {
        name: String(inputs.name),
        gmail: String(inputs.gmail),
        phone: Number(inputs.phone),
        Gender: String(inputs.Gender),
        age: Number(inputs.age),
        Specialiation: String(inputs.Specialiation),
        Qualification: String(inputs.Qualification),
        Experience: String(inputs.Experience),
        About: String(inputs.About),
      })
      .then((res) => res.data);
  };

  return (
    <div>
      <DNav></DNav>
      <h1>Add Doctor</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={inputs.name || ""}
              required
            />
          </div>

          <div className="form-group">
            <label>Gmail</label>
            <input
              type="email"
              name="gmail"
              onChange={handleChange}
              value={inputs.gmail || ""}
              required
            />
            {/* Display a message if the email is invalid */}
            {!isEmailValid && inputs.gmail && (
              <p className="error">Please enter a valid email address.</p>
            )}
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              maxLength="10"
              onChange={handleChange}
              value={inputs.phone || ""}
              required
              disabled={!isEmailValid} // Disable phone field until valid email is provided
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select
              name="Gender"
              onChange={handleChange}
              value={inputs.Gender || ""}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              onChange={handleChange}
              value={inputs.age || ""}
              required
            />
            {/* Display age error message */}
            {ageError && <p className="error">{ageError}</p>}
          </div>

          <div className="form-group">
            <label>Specialization</label>
            <input
              type="text"
              name="Specialiation"
              onChange={handleChange}
              value={inputs.Specialiation || ""}
              required
            />
          </div>

          <div className="form-group">
            <label>Qualification</label>
            <input
              type="text"
              name="Qualification"
              onChange={handleChange}
              value={inputs.Qualification || ""}
              required
            />
          </div>

          <div className="form-group">
            <label>Experience</label>
            <input
              type="text"
              name="Experience"
              onChange={handleChange}
              value={inputs.Experience || ""}
              required
            />
          </div>

          <div className="form-group">
            <label>About</label>
            <input
              type="text"
              name="About"
              onChange={handleChange}
              value={inputs.About || ""}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDoctor;
