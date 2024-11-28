import React, { useState } from "react";
import axios from "axios";

function AddPayment() {
  const [formData, setFormData] = useState({
    UserName: "",
    methodType: "",
    firstName: "",
    lastName: "",
    cardNumber: "",
    date: "",
    cvc: "",
    description: "", // Added description field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateDate = (date) => {
    const [month, year] = date.split("/").map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    if (
      year < currentYear % 100 || // Ensure the year is not in the past
      (year === currentYear % 100 && month < currentMonth) || // Ensure the month is not in the past if the year is the same
      year > 32 // Ensure the year does not exceed 2032 (32 in mm/yy format)
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateDate(formData.date)) {
      alert("Invalid expiry date. Ensure it's in the format mm/yy and is in the future.");
      return;
    }

    // Send formData to the server
    axios
      .post("http://localhost:5000/payment/add", formData)
      .then(() => {
        alert("Payment Added");
      })
      .catch((err) => {
        alert("Error: " + err.message);
      });

    console.log("Form data submitted:", formData);
  };

  return (
    <div className="container">
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "600",
          color: "#333",
          textAlign: "center",
          marginBottom: "1.5rem",
          lineHeight: "1.6",
        }}
      >
        Let's Make Payment<br />
        To start your subscription, input your card details to make payment.<br />
        You will be redirected to your bank's authorization page.
      </h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto" }}>
        <div className="mb-3">
          <label htmlFor="UserName" className="form-label">User Name</label>
          <input
            type="text"
            className="form-control"
            id="UserName"
            name="UserName"
            value={formData.UserName}
            onChange={handleChange}
            required
            pattern="^[a-zA-Z\s]+$"
            title="User Name cannot contain numbers or special characters"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="methodType" className="form-label">Method Type</label>
          <select
            id="methodType"
            name="methodType"
            className="form-select"
            value={formData.methodType}
            onChange={handleChange}
            required
          >
            <option value="">Select Method</option>
            <option value="credit">Credit Card</option>
            <option value="debit">Debit Card</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            pattern="^[a-zA-Z\s]+$"
            title="First Name cannot contain numbers or special characters"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            pattern="^[a-zA-Z\s]+$"
            title="Last Name cannot contain numbers or special characters"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cardNumber" className="form-label">Card Number</label>
          <input
            type="text"
            className="form-control"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            required
            pattern="^\d{16}$"
            title="Card Number must contain exactly 16 digits"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">Expiry Date (mm/yy)</label>
          <input
            type="text"
            className="form-control"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            pattern="^(0[1-9]|1[0-2])\/(2[3-9]|3[0-2])$"
            title="Enter a valid expiry date in mm/yy format, year up to 2032."
            placeholder="MM/YY"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cvc" className="form-label">CVC</label>
          <input
            type="text"
            className="form-control"
            id="cvc"
            name="cvc"
            value={formData.cvc}
            onChange={handleChange}
            required
            pattern="^\d{3}$"
            title="CVC must contain exactly 3 digits"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description (optional)</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default AddPayment;
