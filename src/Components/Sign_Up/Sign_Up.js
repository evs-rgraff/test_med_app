import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sign_Up.css";
import { API_URL } from "../../config";

function Sign_Up() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (/[^a-zA-Z\s]/.test(formData.name))
      newErrors.name = "Name contains invalid characters";

    // Email validation
    if (!formData.email) newErrors.email = "Email is required";
    else if (/[^a-zA-Z0-9@._-]/.test(formData.email))
      newErrors.email = "Email contains invalid characters";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email format is invalid";

    // Phone validation
    if (!formData.phone) newErrors.phone = "Phone is required";
    else if (/[^0-9]/.test(formData.phone))
      newErrors.phone = "Phone must contain only numbers";

    // Password validation
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClear = () => {
    setFormData({ name: "", email: "", phone: "", password: "" });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await response.json();

      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("name", formData.name);
        sessionStorage.setItem("phone", formData.phone);
        sessionStorage.setItem("email", formData.email);
        navigate("/");
        window.location.reload();
      } else {
        // Show API errors
        if (json.errors) {
          setErrors(
            json.errors.reduce(
              (acc, err) => ({ ...acc, [err.param]: err.msg }),
              {}
            )
          );
        } else {
          alert(json.error || "Registration failed");
        }
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <div className="form-title">
          <h1>Sign Up</h1>
          <div className="form-description">
            Already a Member? <a href="/login">Login</a>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <div className="err">{errors.name}</div>}
          </div>

          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="err">{errors.email}</div>}
          </div>

          <div className="input-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <div className="err">{errors.phone}</div>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <div className="err">{errors.password}</div>}
          </div>

          <div className="button-group">
            <button className="button-primary" type="submit">
              Submit
            </button>
            <button
              className="button-secondary"
              type="button"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Sign_Up;
