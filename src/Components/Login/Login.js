import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Email validation
    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setErrors({ ...errors, email: "Please enter a valid email address" });
      } else {
        const { email, ...rest } = errors;
        setErrors(rest);
      }
    }

    // Password validation (minimum 8 characters)
    if (name === "password") {
      if (value.length < 8) {
        setErrors({ ...errors, password: "Password must be at least 8 characters" });
      } else {
        const { password, ...rest } = errors;
        setErrors(rest);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (errors.email || errors.password) {
      alert(errors.email || errors.password);
      return;
    }

    console.log("Login submitted:", formData);
  };

  return (
    <div className="container">
      <div className="login-grid">
        <div className="login-header">
          <h1>Log In</h1>
        </div>

        <div className="new-member">
          New member? <span><Link to="/signup">Sign Up</Link></span>
        </div>

        <div className="login-form">
          <form onSubmit={handleSubmit}>
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
              {errors.email && <div className="err">{errors.email}</div>}
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
              {errors.password && <div className="err">{errors.password}</div>}
            </div>

            <div className="button-group">
              <button type="submit" className="btn-primary">Submit</button>
              <button
                type="reset"
                className="btn-secondary"
                onClick={() => setFormData({ email: "", password: "" })}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;