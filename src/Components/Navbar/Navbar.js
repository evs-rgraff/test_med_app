import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav>
      <div className="header-logo">
        <Link to="/">
          <div className="header-logo-lockup">
            <div>
              <img
                src="images/nav-logo.png"
                alt="RMG Health Advocates Group"
              />
            </div>
            <div className="header-logo-label">
              RMG Health Advocates Group
            </div>
          </div>
        </Link>
      </div>

      <ul className="nav_links">
        <li className="navlink">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/appointments">Appointments</Link>
        </li>

        {/* Link with button for Sign Up */}
        <li className="link">
          <Link to="/signup">
            <button className="nav-btn">Sign Up</button>
          </Link>
        </li>

        {/* Link with button for Log In */}
        <li className="link">
          <Link to="/login">
            <button className="nav-btn">Log In</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
