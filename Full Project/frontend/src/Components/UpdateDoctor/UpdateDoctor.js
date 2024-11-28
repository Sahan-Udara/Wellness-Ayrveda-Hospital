import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
// import "./UpdateDoctor.css";

function UpdateDoctor() {
  const [inputs, setInputs] = useState({
    id: null,
    name: "",
    gmail: "",
    phone: "",
    Gender: "",
    age: "",
    Specialiation: "",
    Qualification: "",
    Experience: "",
    About: "",
  }); // Set initial state to null
  const history = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      await axios

        .get(`http://localhost:5000/doctors/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.doctor1 || {})); // Added
    };

    fetchHandler();
  }, [id]);


  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/doctors/${id}`, {
       name:inputs.name,
       gmail:inputs.gmail,
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

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history("/doctorDetails"));
  };

  return (
    <div>
      <h1>Update Doctor</h1>
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
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            onChange={handleChange}
            value={inputs.phone || ""}
            required
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <input
            type="text"
            name="Gender"
            onChange={handleChange}
            value={inputs.Gender || ""}
            required
          />
        </div>

        <div className="form-group">
          <label>age</label>
          <input
            type="Number"
            name="age"
            onChange={handleChange}
            value={inputs.age || ""}
            required
          />
        </div>

        <div className="form-group">
          <label>Specialiation</label>
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

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default UpdateDoctor;
