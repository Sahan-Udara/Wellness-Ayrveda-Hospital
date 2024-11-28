

import React, { useEffect, useState,useRef } from "react";
import DNav from "../DNav/DNav";
import axios from "axios";
import DoctorDetail from "../DoctorDetails/DoctorDetail"; // Import the correct component
import {useReactToPrint} from "react-to-print";
import "./DoctorDetails.css";


const URL = "http://localhost:5000/doctors"; // Make sure the URL is correct

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
}

function DoctorDetails() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setDoctors(data.doctors)); // Make sure `data.doctors` exists in response
  }, []);

  //pdf download function start
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({

    content: () => ComponentsRef.current,
    DocumnetTitle : "Doctors Report",
    onafterprint:()=>alert("Doctors report Successfully Download!")

  })//pdf download function end

  //Search function Start
  const [SearchQuery,setSearchQuery] = useState("");
  const [noResults,setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredDoctors = data.doctors.filter((doctor) => Object.values(doctor).some((field)=> field.toString().toLowerCase().includes(SearchQuery.toLowerCase())))
      setDoctors(filteredDoctors);
      setNoResults(filteredDoctors.length===0);

    });
  }//Search function End

  return (
    <div className="container">
    <DNav />
    <h1>Doctor Details Display Page</h1>
    <form className="search-form">
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="Search"
        placeholder="Search Doctors Details"
        className="search-input"
      />
      <button type="button" onClick={handleSearch} className="btn btn-primary">
        Search
      </button>
    </form>

    {noResults ? (
      <div className="no-results">
        <p>No Doctors Found</p>
      </div>
    ) : (
      <div ref={ComponentsRef} className="doctor-list">
        {doctors &&
          doctors.map((doctor, i) => (
            <div key={i} className="doctor-card">
              <DoctorDetail doctor={doctor} />
            </div>
          ))}
      </div>
    )}
    <button className="btn btn-success print-button" onClick={handlePrint}>
      Download Report
    </button>
  </div>
  );
}

export default DoctorDetails;
