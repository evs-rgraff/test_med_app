import React, { useState } from "react";
import "./Sign_Up.css";

const Sign_Up = () => {
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear phone error as user types
    if (name === "phone") setErrors({ ...errors, phone: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate phone number length (10 digits)
    if (!/^\d{10}$/.test(formData.phone)) {
      setErrors({ ...errors, phone: "Phone number must contain ten digits" });
      return;
    }

    // Submit form data here (e.g., send to API)
    console.log("Form submitted:", formData);
  };

  return (
    <div className="container">
      <div className="signup-grid">
        <div className="signup-header">
          <h1>Sign Up</h1>
        </div>

        <div className="existing-member">
          Already a member? <span><a href="/login" style={{ color: "#2190FF" }}> Login</a></span>
        </div>

        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                name="role"
                id="role"
                required
                className="form-control"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="" disabled>Select your role</option>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="form-control"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                className="form-control"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <div className="err">{errors.phone}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="button-group">
              <button type="submit" className="btn-primary">Submit</button>
              <button type="reset" className="btn-secondary" onClick={() => setFormData({ role: "", name: "", phone: "", email: "", password: "" })}>Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;