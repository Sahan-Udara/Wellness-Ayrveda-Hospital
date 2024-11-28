import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Treatment.css';

function Treatment({ treatment }) {
    const { _id, name, description, benefit, duration } = treatment || {};

    // Delete function
    const navigate = useNavigate();

    const deleteHandler = async () => {
        try {
            await axios.delete(`http://localhost:5000/treatments/delete/${_id}`);
            alert("Treatment Deleted"); // Show the alert message
            navigate("/viewtreatment", { replace: true, state: { refresh: true } });
        } catch (error) {
            console.error("Error deleting treatment:", error);
            alert("Failed to delete treatment"); // Optionally handle the error
        }
    };

    return (
        <div className="treatment-container">
            <h2>Treatment Details</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Benefit</th>
                        <th>Duration</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{_id || "N/A"}</td>
                        <td>{name || "N/A"}</td>
                        <td>{description || "N/A"}</td>
                        <td>{benefit || "N/A"}</td>
                        <td>{duration || "N/A"}</td>
                        <td>
                            <Link to={`/viewtreatment/${_id}`} className="update-link">Update</Link>
                            <button onClick={deleteHandler} className="delete-button">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Treatment;
