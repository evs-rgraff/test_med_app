import React, { useState } from "react";
import "./Sign_Up.css";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

const Sign_Up = () => {
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone number must contain ten digits";
    if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // TEMPORARY mock
    const mockResponse = { authtoken: "mock-token" };

    if (mockResponse.authtoken) {
      sessionStorage.setItem("auth-token", mockResponse.authtoken);
      sessionStorage.setItem("name", formData.name);
      sessionStorage.setItem("phone", formData.phone);
      sessionStorage.setItem("email", formData.email);
      navigate("/");
      window.location.reload();
    } else {
      setErrors({ form: "Registration failed (mock)" });
    }
  };

  return (
    <div className="container" style={{ marginTop: "5%" }}>
      <div className="signup-grid">
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="form-control"
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
                value={formData.name}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Enter your phone number"
              />
              {errors.phone && <div className="err">{errors.phone}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Enter your email"
              />
              {errors.email && <div className="err">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Enter your password"
              />
              {errors.password && <div className="err">{errors.password}</div>}
            </div>

            {errors.form && <div className="err">{errors.form}</div>}

            <div className="button-group">
              <button type="submit" className="btn-primary">Submit</button>
              <button
                type="reset"
                className="btn-secondary"
                onClick={() =>
                  setFormData({ role: "", name: "", phone: "", email: "", password: "" })
                }
              >
                Reset
              </button>
            </div>
          </form>

          <div className="existing-member" style={{ marginTop: "10px" }}>
            Already a member? <Link to="/Login" style={{ color: "#2190FF" }}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;
