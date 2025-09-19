import React from "react";
import "./navbar.css";

function Navbar() {
    function handleClick() {
      console.log("Button clicked");
    }
  
    return (
      <div>
        <nav>
          <div className="header-logo">
            <a href="/">
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
            </a>
          </div>
  
          <ul className="nav_links">
            <li className="navlink">
              <a href="/">Home</a>
            </li>
            <li className="link">
              <a href="#">Appointments</a>
            </li>
  
            {/* Link with button for Sign Up */}
            <li className="link">
              <a href="../Sign_up/sign_up.html">
                <button className="nav-btn" onClick={handleClick}>
                  Sign Up
                </button>
              </a>
            </li>
  
            {/* Link with button for Log In */}
            <li className="link">
              <a href="../Login/login.html">
                <button className="nav-btn" onClick={handleClick}>
                  Log In
                </button>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
  
  export default Navbar;  