import React, { useState } from "react";
import "./Navbar.css";
import logo from "./images/nav-logo.svg";

export default function Navbar() {
  // handleClick is defined BEFORE the JSX return (per your instruction)
  const [menuOpen, setMenuOpen] = useState(false);

  function handleClick() {
    setMenuOpen((prev) => !prev);
  }

  return (
    <div>
      <nav className="navbar">
        <div className="header-logo">
          <a href="/">
            <div className="header-logo-lockup">
              <div>
                <img src={logo} alt="RMG Health Advocates Group" />
              </div>
              <div className="header-logo-label">RMG Health Advocates Group</div>
            </div>
          </a>
        </div>

        <div
          className="nav-toggle"
          id="navToggle"
          onClick={handleClick}
          role="button"
          aria-label="Toggle navigation"
        >
          <i className={menuOpen ? "fa fa-times" : "fa fa-bars"} aria-hidden="true" />
        </div>

        <ul className={`nav_links ${menuOpen ? "active" : ""}`} id="navLinks">
          <li className="navlink"><a href="/">Home</a></li>
          <li className="link"><a href="#">Appointments</a></li>
          <li className="link">
            <a href="../Sign_Up/Sign_Up.html"><button className="nav-btn">Sign Up</button></a>
          </li>
          <li className="link">
            <a href="../Login/Login.html"><button className="nav-btn">Log In</button></a>
          </li>
        </ul>
      </nav>
    </div>
  );
}