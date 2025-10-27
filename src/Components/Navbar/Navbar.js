import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "./images/nav-logo.svg";

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);

  const handleClick = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className="navbar">
      <div className="header-logo">
        <Link to="/">
          <div className="header-logo-lockup">
            <div>
            <img src={logo} alt="RMG Health Advocates Group" /> 
            </div>
            <div className="header-logo-label">RMG Health Advocates Group</div>
          </div>
        </Link>
      </div>

      {/* Hamburger button */}
      <div className="nav-toggle" onClick={handleClick}>
        <i className={`fa-solid ${menuActive ? "fa-times" : "fa-bars"}`}></i>
      </div>

      <ul className={`nav_links ${menuActive ? "active" : ""}`}>
        <li className="navlink">
          <Link to="/" onClick={() => setMenuActive(false)}>Home</Link>
        </li>
        <li className="link">
          <Link to="/appointments" onClick={() => setMenuActive(false)}>Appointments</Link>
        </li>
        <li className="link">
          <Link to="/Sign_Up" onClick={() => setMenuActive(false)}>
            <button className="nav-btn">Sign Up</button>
          </Link>
        </li>
        <li className="link">
          <Link to="/Login" onClick={() => setMenuActive(false)}>
            <button className="nav-btn">Log In</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
