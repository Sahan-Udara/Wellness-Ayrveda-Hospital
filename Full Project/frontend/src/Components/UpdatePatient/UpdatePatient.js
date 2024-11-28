import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdatePatient.css'; // Import the CSS file for styling

const URL = "http://localhost:5000/Patient"; // Base URL for the backend API

function UpdatePatient() {
    const [patient, setPatient] = useState({
        nic: '',
        name: '',
        email: '',
        dob: '',
        gender: '',
        address: '',
        height: '',
        weight: '',
        number: '',
        patientCondition: '',
        doctorsNotes: ''
    });
    const [errors, setErrors] = useState({});
    const { id } = useParams(); // Get the patient ID from the URL parameters
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await axios.get(`${URL}/get/${id}`);
                if (response.data.status === 'user fetched') {
                    setPatient(response.data.user);
                } else {
                    alert('Error fetching patient data');
                }
            } catch (err) {
                console.error('Error fetching patient data:', err);
                alert("Error fetching patient data");
            }
        };
        fetchPatient();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient({
            ...patient,
            [name]: value
        });
    };

    const validate = () => {
        let inputErrors = {};

        // NIC validation
        if (!patient.nic) {
            inputErrors.nic = "NIC is required";
        } else if (!validateNIC(patient.nic)) {
            inputErrors.nic = "Invalid NIC format";
        }

        // Name validation
        if (!patient.name) {
            inputErrors.name = "Name is required";
        } else if (!/^[A-Za-z\s]+$/.test(patient.name)) {
            inputErrors.name = "Name can only contain letters and spaces";
        }

        // Email validation
        if (!patient.email || !/\S+@\S+\.\S+/.test(patient.email)) {
            inputErrors.email = "Valid email is required";
        }

        // Date of Birth validation
        if (!patient.dob) {
            inputErrors.dob = "Date of birth is required";
        } else if (!validateDOB(patient.dob)) {
            inputErrors.dob = "Invalid DOB (must be 10-100 years old)";
        }

        // Gender validation
        if (!patient.gender) {
            inputErrors.gender = "Gender is required";
        }

        // Address validation
        if (!patient.address) {
            inputErrors.address = "Address is required";
        }

        // Height validation
        if (!patient.height || isNaN(patient.height)) {
            inputErrors.height = "Valid height is required";
        } else if (patient.height <= 50 || patient.height > 250) {
            inputErrors.height = "Height must be between 50cm and 250cm";
        }

        // Weight validation
        if (!patient.weight || isNaN(patient.weight)) {
            inputErrors.weight = "Valid weight is required";
        } else if (patient.weight <= 3 || patient.weight > 300) {
            inputErrors.weight = "Weight must be between 3kg and 300kg";
        }

        // Phone Number validation
        if (!patient.number || !/^\d{10}$/.test(patient.number)) {
            inputErrors.number = "Valid phone number is required";
        }

        // Patient Condition validation
        if (!patient.patientCondition) {
            inputErrors.patientCondition = "Patient condition is required";
        }

        // Doctor's Notes validation
        if (!patient.doctorsNotes) {
            inputErrors.doctorsNotes = "Doctor's notes are required";
        }

        return inputErrors;
    };

    const validateNIC = (nic) => {
        const oldNicPattern = /^[0-9]{9}[vVxX]$/;
        const newNicPattern = /^[0-9]{12}$/;
        return oldNicPattern.test(nic) || newNicPattern.test(nic);
    };

    const validateDOB = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age >= 10 && age <= 100;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const inputErrors = validate();
        if (Object.keys(inputErrors).length === 0) {
            try {
                const response = await axios.put(`${URL}/update/${id}`, patient);
                if (response.data.message === 'Patient updated successfully') {
                    alert("Patient updated successfully");
                    navigate('/patientdetails');
                } else {
                    alert('Error updating patient data');
                }
            } catch (err) {
                console.error('Error updating patient data:', err);
                alert("Error updating patient data");
            }
        } else {
            setErrors(inputErrors);
        }
    };

    return (
        <div className="update-patient-container">
            <h1>Update Patient Details</h1>
            <form onSubmit={handleSubmit} className="patient-form">
                <div className="form-group">
                    <label>NIC</label>
                    <input
                        type="text"
                        name="nic"
                        value={patient.nic}
                        onChange={handleChange}
                        className={errors.nic ? 'input-error' : ''}
                    />
                    {errors.nic && <p className="error-text">{errors.nic}</p>}
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={patient.name}
                        onChange={handleChange}
                        className={errors.name ? 'input-error' : ''}
                    />
                    {errors.name && <p className="error-text">{errors.name}</p>}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={patient.email}
                        onChange={handleChange}
                        className={errors.email ? 'input-error' : ''}
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        name="dob"
                        value={patient.dob}
                        onChange={handleChange}
                        className={errors.dob ? 'input-error' : ''}
                    />
                    {errors.dob && <p className="error-text">{errors.dob}</p>}
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <select
                        name="gender"
                        value={patient.gender}
                        onChange={handleChange}
                        className={errors.gender ? 'input-error' : ''}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.gender && <p className="error-text">{errors.gender}</p>}
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={patient.address}
                        onChange={handleChange}
                        className={errors.address ? 'input-error' : ''}
                    />
                    {errors.address && <p className="error-text">{errors.address}</p>}
                </div>
                <div className="form-group">
                    <label>Height (cm)</label>
                    <input
                        type="number"
                        name="height"
                        value={patient.height}
                        onChange={handleChange}
                        className={errors.height ? 'input-error' : ''}
                    />
                    {errors.height && <p className="error-text">{errors.height}</p>}
                </div>
                <div className="form-group">
                    <label>Weight (kg)</label>
                    <input
                        type="number"
                        name="weight"
                        value={patient.weight}
                        onChange={handleChange}
                        className={errors.weight ? 'input-error' : ''}
                    />
                    {errors.weight && <p className="error-text">{errors.weight}</p>}
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        name="number"
                        value={patient.number}
                        onChange={handleChange}
                        className={errors.number ? 'input-error' : ''}
                    />
                    {errors.number && <p className="error-text">{errors.number}</p>}
                </div>
                <div className="form-group">
                    <label>Patient Condition</label>
                    <input
                        type="text"
                        name="patientCondition"
                        value={patient.patientCondition}
                        onChange={handleChange}
                        className={errors.patientCondition ? 'input-error' : ''}
                    />
                    {errors.patientCondition && <p className="error-text">{errors.patientCondition}</p>}
                </div>
                <div className="form-group">
                    <label>Doctor's Notes</label>
                    <textarea
                        name="doctorsNotes"
                        value={patient.doctorsNotes}
                        onChange={handleChange}
                        className={errors.doctorsNotes ? 'input-error' : ''}
                    ></textarea>
                    {errors.doctorsNotes && <p className="error-text">{errors.doctorsNotes}</p>}
                </div>
                <button type="submit" className="submit-button">Update Patient</button>
            </form>
        </div>
    );
}

export default UpdatePatient;
