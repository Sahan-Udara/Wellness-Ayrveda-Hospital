

// export default DoctorDetail;
import React from "react";
// import DNav from "../DNav/DNav";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DoctorDetail.css"; 

function DoctorDetail(props) {
  // Destructure the doctor object correctly
  const { _id, name, gmail, phone, Gender, age, Specialiation, Qualification, Experience, About } = props.doctor;

  //delete function start
  const history = useNavigate();

  const deleteHandler =  async () =>{
    await axios .delete(`http://localhost:5000/doctors/${_id}`)
    .then(res=>res.data)
    .then(()=>history("/"))
    .then(()=>history("/doctorDetails"));
  }//delete function End




  return (
    <div className="doctor-detail-container">
      <h1>Doctor Details</h1>
      <div className="doctor-detail-form">
        <div className="form-group">
          <label>ID:</label>
          <span>{_id}</span>
        </div>
        <div className="form-group">
          <label>Name:</label>
          <span>{name}</span>
        </div>
        <div className="form-group">
          <label>Email:</label>
          <span>{gmail}</span>
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <span>{phone}</span>
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <span>{Gender}</span>
        </div>
        <div className="form-group">
          <label>Age:</label>
          <span>{age}</span>
        </div>
        <div className="form-group">
          <label>Specialization:</label>
          <span>{Specialiation}</span>
        </div>
        <div className="form-group">
          <label>Qualification:</label>
          <span>{Qualification}</span>
        </div>
        <div className="form-group">
          <label>Experience:</label>
          <span>{Experience}</span>
        </div>
        <div className="form-group">
          <label>About:</label>
          <span>{About}</span>
        </div>

        <div className="form-actions">
          <Link to={`/doctorDetails/${_id}`} className="btn-update">
            Update
          </Link>
          <button onClick={deleteHandler} className="btn-delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetail;
