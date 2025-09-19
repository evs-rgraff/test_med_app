import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (value) => {
    const invalidChars = /[^a-zA-Z0-9@._-]/;
    if (!value) return "Email is required";
    if (invalidChars.test(value)) return "Email contains invalid characters";
    if (!/\S+@\S+\.\S+/.test(value)) return "Email format is invalid";
    return "";
  };

  const validatePassword = (value) => {
    const invalidChars = /[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (!value) return "Password is required";
    if (invalidChars.test(value)) return "Password contains invalid characters";
    if (value.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    // Form is valid, do login logic here
    console.log("Form submitted:", { email, password });
  };

  const handleClear = () => {
    setEmail("");
    setPassword("");
    setErrors({});
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <div className="form-title">
          <h1>Login</h1>
          <div className="form-description">
            New Member? <a href="/signup">Sign Up Here</a>
          </div>
        </div>

        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
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

export default Login;
