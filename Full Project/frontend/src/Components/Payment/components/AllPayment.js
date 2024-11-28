import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import { useReactToPrint } from "react-to-print";

export default function AllPayment() {
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);
    const navigate = useNavigate(); 

    useEffect(() => {
        fetchPayments();
    }, []);

    useEffect(() => {
        handleSearch();
    }, [searchQuery, payments]);

    const fetchPayments = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:5000/payment/");
            setPayments(res.data);
            setFilteredPayments(res.data);
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id) => {
        navigate(`/allPayment/${id}`); 
    };

    const handleDelete = async (id) => {
        if (window.confirm(`Are you sure you want to delete payment with ID: ${id}?`)) {
            try {
                const response = await axios.delete(`http://localhost:5000/payment/delete/${id}`);
                console.log('Delete response:', response.data); 
                alert(`Deleted payment with ID: ${id}`);
                fetchPayments(); 
            } catch (err) {
                console.error('Error deleting payment:', err.response ? err.response.data : err.message); 
                alert(`Failed to delete payment: ${err.message}`);
            }
        }
    };
    
    // Print details
    const ComponentsRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        documentTitle: "Payment Report",
        onAfterPrint: () => alert("Payment Report Successfully Downloaded!"),
    });

    // Search function
    const handleSearch = () => {
        if (searchQuery.trim() === "") {
            setFilteredPayments(payments);
            setNoResults(false);
            return;
        }

        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = payments.filter(payment => 
            Object.values(payment).some(value =>
                value.toString().toLowerCase().includes(lowercasedQuery)
            )
        );

        setFilteredPayments(filtered);
        setNoResults(filtered.length === 0);
    };

    const maskCardNumber = (cardNumber) => {
        if (cardNumber.length >= 16) {
            return `**** **** **** ${cardNumber.slice(-4)}`;
        }
        return cardNumber;
    };

    const maskCvc = (cvc) => {
        return '***';
    };

    // Inline styles
    const containerStyle = {
        padding: '30px',
        backgroundColor: '#f4f4f4',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '20px auto',
        maxWidth: '1200px',
        overflowX: 'auto'
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    };

    const thStyle = {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '12px 15px',
        textAlign: 'left',
        fontSize: '16px',
        fontWeight: '600'
    };

    const tdStyle = {
        padding: '12px 15px',
        borderBottom: '1px solid #ddd',
        fontSize: '14px'
    };

    const buttonStyle = {
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        fontSize: '16px',
        padding: '5px 10px',
        transition: 'background-color 0.3s, transform 0.3s'
    };

    const editButtonStyle = {
        ...buttonStyle,
        color: '#007bff',
        '&:hover': {
            backgroundColor: '#e6f0ff',
            transform: 'scale(1.05)'
        }
    };

    const deleteButtonStyle = {
        ...buttonStyle,
        color: '#dc3545',
        '&:hover': {
            backgroundColor: '#f8d7da',
            transform: 'scale(1.05)'
        }
    };

    const downloadButtonStyle = {
        backgroundColor: '#28a745',  
        color: '#fff',  
        border: 'none', 
        padding: '10px 20px', 
        fontSize: '16px', 
        borderRadius: '8px',  
        cursor: 'pointer',  
        transition: 'background-color 0.3s, transform 0.3s', 
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', 
        marginTop: '20px'  
    };

    const hoverEffect = {
        '&:hover': {
            backgroundColor: '#218838', 
            transform: 'scale(1.05)',  
        }
    };

    const clearButtonStyle = {
        backgroundColor: '#f0f0f0',
        color: '#333',
        border: '1px solid #ccc',
        padding: '5px 10px',
        fontSize: '12px',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '10px',
        transition: 'background-color 0.3s',
    };

    const clearButtonHoverEffect = {
        '&:hover': {
            backgroundColor: '#e0e0e0',
        }
    };

    return (
        <div style={containerStyle}>
            <h1 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '700', color: '#333' }}>All Payments Details</h1>
            
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Details..."
                    style={{ padding: '10px', width: '100%', boxSizing: 'border-box' }}
                />
                {searchQuery && (
                    <button 
                        onClick={() => {
                            setSearchQuery(""); 
                            setFilteredPayments(payments); 
                            setNoResults(false);
                        }}
                        style={{ ...clearButtonStyle, ...clearButtonHoverEffect }}
                    >
                        Clear
                    </button>
                )}
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table ref={ComponentsRef} style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>User Name</th>
                            <th style={thStyle}>Method Type</th>
                            <th style={thStyle}>Card Number</th>
                            <th style={thStyle}>Date</th>
                            <th style={thStyle}>CVC</th>
                            <th style={thStyle}>Description</th>
                            <th style={thStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayments.length === 0 && noResults && (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>No results found</td>
                            </tr>
                        )}
                        {filteredPayments.map((payment, index) => (
                            <tr key={index}>
                                <td style={tdStyle}>{payment.UserName}</td>
                                <td style={tdStyle}>{payment.methodType}</td>
                                <td style={tdStyle}>{maskCardNumber(payment.cardNumber)}</td>
                                <td style={tdStyle}>{payment.date}</td>
                                <td style={tdStyle}>{maskCvc(payment.cvc)}</td>
                                <td style={tdStyle}>{payment.description || 'N/A'}</td>
                                <td style={tdStyle}>
                                    <button onClick={() => handleEdit(payment._id)} style={editButtonStyle}>
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDelete(payment._id)} style={deleteButtonStyle}>
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <button 
                onClick={handlePrint} 
                style={{ ...downloadButtonStyle, ...hoverEffect }}
            >
                Download Report
            </button>
        </div>
    );
}
