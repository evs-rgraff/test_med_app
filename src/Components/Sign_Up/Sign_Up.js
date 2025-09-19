import React, { useRef } from "react";
import "./Sign_Up.css";

function SignUp() {
  const formRef = useRef(null);

  const handleClear = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <div className="form-title">
          <h1>Sign Up</h1>
          <div className="form-description">
            Already a Member? <a href="#">Login</a>
          </div>
        </div>

        <form id="registrationForm" ref={formRef}>
          <div className="input-group">
            <label htmlFor="role">Role:</label>
            <select id="role" name="role" required defaultValue="">
              <option value="" disabled>
                Select your role
              </option>
              <option value="Doctor">Doctor</option>
              <option value="Patient">Patient</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>

          <div className="input-group">
            <label htmlFor="phone">Phone Number:</label>
            <input type="text" id="phone" name="phone" required />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
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

export default SignUp;
