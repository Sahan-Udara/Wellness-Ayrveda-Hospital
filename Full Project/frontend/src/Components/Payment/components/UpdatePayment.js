import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdatePayment() {
    const [formData, setFormData] = useState({
        UserName: '',
        methodType: '',
        cardNumber: '',
        date: '',
        cvc: '',
        description: ''
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        async function fetchPayment() {
            try {
                const res = await axios.get(`http://localhost:5000/payment/${id}`);
                setFormData(res.data);
            } catch (err) {
                alert("Error fetching payment data: " + err.message);
            }
        }
        fetchPayment();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:5000/payment/update/${id}`, formData);
            console.log('Update response:', res.data); // Debug info
            navigate('/allPayment');
        } catch (err) {
            console.error("Error updating payment:", err); // Debug info
            alert("Error updating payment: " + err.message);
        }
    };

    const maskCardNumber = (cardNumber) => {
        if (cardNumber.length >= 16) {
            return `**** **** **** ${cardNumber.slice(-4)}`;
        }
        return cardNumber;
    };

    const maskedCvc = '***';

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#f9f9f9' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Update Payment</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="UserName" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>User Name</label>
                    <input
                        type="text"
                        id="UserName"
                        name="UserName"
                        value={formData.UserName}
                        readOnly
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="methodType" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Method Type</label>
                    <input
                        type="text"
                        id="methodType"
                        name="methodType"
                        value={formData.methodType}
                        readOnly
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="cardNumber" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Card Number</label>
                    <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={maskCardNumber(formData.cardNumber)}
                        readOnly
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="date" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Expiry Date (mm/yy)</label>
                    <input
                        type="text"
                        id="date"
                        name="date"
                        value={formData.date}
                        readOnly
                        placeholder="MM/YY"
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="cvc" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>CVC</label>
                    <input
                        type="text"
                        id="cvc"
                        name="cvc"
                        value={maskedCvc}
                        readOnly
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="description" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                </div>
                <button
                    type="submit"
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: '#fff', fontSize: '16px', cursor: 'pointer' }}
                >
                    Approve
                </button>
            </form>
        </div>
    );
}

export default UpdatePayment;
