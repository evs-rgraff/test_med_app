import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ auth, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate("/login"); // Redirect to login page
  };

  // Extract username from email (before @) if available
  const username =
    auth.email && auth.email.includes("@")
      ? auth.email.split("@")[0]
      : auth.name;

  return (
    <nav>
      <div className="header-logo">
        <Link to="/">
          <div className="header-logo-lockup">
            <div>
              <img src="images/nav-logo.png" alt="RMG Health Advocates Group" />
            </div>
            <div className="header-logo-label">RMG Health Advocates Group</div>
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

        {!auth.isLoggedIn ? (
          <>
            <li className="link">
              <Link to="/signup">
                <button className="nav-btn">Sign Up</button>
              </Link>
            </li>
            <li className="link">
              <Link to="/login">
                <button className="nav-btn">Log In</button>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="link">Hello, {username}</li>
            <li className="link">
              <button className="nav-btn" onClick={handleLogoutClick}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;