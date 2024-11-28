import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import './Patientdetails.css';

const URL = "http://localhost:5000/Patient/";

function Patientdetails() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const componentRef = useRef();

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(URL);
                setPatients(response.data);
            } catch (err) {
                setError("Error fetching patient data");
                console.error("Fetch error: ", err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchHandler();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this patient?")) {
            try {
                await axios.delete(`${URL}delete/${id}`);
                setPatients(patients.filter((patient) => patient._id !== id));
                alert("Patient deleted successfully");
            } catch (err) {
                setError("Error deleting patient");
                console.error("Delete error: ", err.message);
            }
        }
    };

    const handleUpdate = (id) => {
        navigate(`/updatePatient/${id}`);
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'PatientDetails',
    });

    const filteredPatients = patients.filter(patient => {
        const query = searchQuery.toLowerCase();
        return (
            String(patient.nic).toLowerCase().includes(query) ||
            String(patient.name).toLowerCase().includes(query) ||
            String(patient.email).toLowerCase().includes(query) ||
            String(patient.gender).toLowerCase().includes(query) ||
            String(patient.number).toLowerCase().includes(query) ||
            String(patient.dob).toLowerCase().includes(query)
        );
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="patient-details-container">
            <h1>Patient Details</h1>
            <div className="action-buttons">
                <button className="download-button" onClick={handlePrint}>Print Report</button>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by NIC, Name, Email, Gender, Phone Number, DOB..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>
            <table className="patient-details-table" ref={componentRef}>
                <thead>
                    <tr>
                        <th>NIC</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>DOB</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Height</th>
                        <th>Weight</th>
                        <th>Phone Number</th>
                        <th>Patient Condition</th>
                        <th>Doctor's Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPatients.map((patient) => (
                        <tr key={patient._id}>
                            <td>{patient.nic}</td>
                            <td>{patient.name}</td>
                            <td>{patient.email}</td>
                            <td>{patient.dob}</td>
                            <td>{patient.gender}</td>
                            <td>{patient.address}</td>
                            <td>{patient.height}</td>
                            <td>{patient.weight}</td>
                            <td>{patient.number}</td>
                            <td>{patient.patientCondition}</td>
                            <td>{patient.doctorsNotes}</td>
                            <td className="actions-cell">
                                <button className="update-button" onClick={() => handleUpdate(patient._id)}>Update</button>
                                <button className="delete-button" onClick={() => handleDelete(patient._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Patientdetails;
