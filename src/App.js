import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import LandingPage from "./Components/Landing_Page/LandingPage";
import SignUp from "./Components/Sign_Up/Sign_Up";
import Login from "./Components/Login/Login";

function App() {
  // State for auth
  const [auth, setAuth] = useState({
    isLoggedIn: !!sessionStorage.getItem("auth-token"),
    name: sessionStorage.getItem("name") || "",
    email: sessionStorage.getItem("email") || "",
  });

  // Function to handle logout
  const handleLogout = () => {
    sessionStorage.clear();
    setAuth({ isLoggedIn: false, name: "", email: "" });
  };

  // Function to handle login/signup success
  const handleLogin = (userData) => {
    setAuth({
      isLoggedIn: true,
      name: userData.name,
      email: userData.email,
    });
  };

  return (
    <div className="App">
      {/* BrowserRouter should be in index.js — keep App focused on routes */}
      <Navbar auth={auth} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp onLogin={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;