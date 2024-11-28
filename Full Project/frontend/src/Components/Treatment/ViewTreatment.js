import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from "react-to-print";
import { useNavigate } from 'react-router-dom';
import './ViewTreatment.css'; // Import the CSS file
import Logo from "../Assets/HeroLogo.png";
import PieChart from '../Charts/PieChart'; // Import the PieChart component

const URL = "http://localhost:5000/treatments";

const fetchHandler = async () => {
    try {
        const res = await axios.get(URL);
        console.log("Fetched data:", res.data); // Debugging the response
        return res.data;
    } catch (err) {
        console.error("Error fetching treatments:", err);
    }
};

function ViewTreatment() {
    const navigate = useNavigate();
    const [treatments, setTreatments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        fetchHandler().then((data) => {
            console.log("Fetched data:", data); // Log the full data
            setTreatments(data || []);
        });
    }, []);

    // Download function
    const ComponentsRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        documentTitle: "Treatments Report",
        onAfterPrint: () => alert("Treatments Report Successfully Downloaded!"),
    });

    // End Download function

    // Search function
    const handleSearch = () => {
        fetchHandler().then((data) => {
            const filteredTreatments = data.filter((treatment) =>
                Object.values(treatment).some((field) =>
                    field.toString().toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
            setTreatments(filteredTreatments);
            setNoResults(filteredTreatments.length === 0);
        });
    };

    // Handle update and delete
    const handleUpdate = (id) => {
        navigate(`/viewtreatment/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${URL}/delete/${id}`);
            setTreatments(treatments.filter(treatment => treatment._id !== id));
            alert('Treatment Deleted');
        } catch (err) {
            console.error("Error deleting treatment:", err);
            alert('Error deleting treatment');
        }
    };

    return (
        <div className='home-back'>
            {/* Home Header */}
            <header className="header">
                <img alt="" className="logo-nav" src={Logo} /> 
                <div className="logo">W E L L N E S S 
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                A Y R V E D A
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                H O S P I T A L</div>
                <button className="login-btnAd" onClick={() => navigate('/AdminHome')}>Log Out</button>
            </header>
       {/* Home Header End */}

            <h1>View Treatments</h1>

            {/* Search container */}
            <div className="search-container">
                <input
                    id="search-bar"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="text"
                    name="search"
                    placeholder="Search Treatments"
                />
                <button id="search-button" onClick={handleSearch}>Search</button>
            </div>

            {noResults ? (
                <div>
                    <p>No Treatments Found</p>
                </div>
            ) : (
                <div ref={ComponentsRef}>
                    {treatments.length > 0 ? (
                        <>
                            <table className="treatments-table">
                                <thead>
                                    <tr>
                                        {/* <th>ID</th> */}
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Benefit</th>
                                        <th>Duration</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {treatments.map((treatment) => (
                                        <tr key={treatment._id}>
                                            {/* <td>{treatment._id}</td> */}
                                            <td>{treatment.name}</td>
                                            <td>{treatment.description}</td>
                                            <td>{treatment.benefit}</td>
                                            <td>{treatment.duration}</td>
                                            <td className="actions-cell">
                                                <button
                                                    className="update-button"
                                                    onClick={() => handleUpdate(treatment._id)}
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    id="delete-button"
                                                    className="delete-button"
                                                    onClick={() => handleDelete(treatment._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Pie Chart */}
                            <PieChart treatments={treatments} />
                        </>
                    ) : (
                        <p>No treatments found</p>
                    )}
                </div>
            )}
            <button id="download-report" onClick={handlePrint}>Download Report</button>
            <button onClick={() => navigate('/addtreatment')}>Add Treatment</button>
        </div>
    );
}

export default ViewTreatment;
