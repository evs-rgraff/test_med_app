import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "./images/nav-logo.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!sessionStorage.getItem("auth-token");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
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

      <div className="nav-toggle" id="navToggle">
        <i className="fa-solid fa-bars"></i>
      </div>

      <ul className="nav_links" id="navLinks">
        <li className="navlink"><Link to="/">Home</Link></li>
        <li className="link"><Link to="/Appointments">Appointments</Link></li>

        {isLoggedIn ? (
          <li className="link">
            <button className="nav-btn" onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <>
            <li className="link">
              <Link to="/Sign_Up"><button className="nav-btn">Sign Up</button></Link>
            </li>
            <li className="link">
              <Link to="/Login"><button className="nav-btn">Log In</button></Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
