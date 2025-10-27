import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Landing_page from './Components/Landing_Page/Landing_page';

// Temporary placeholder components (so your app compiles)
function Appointments() {
  return <div style={{ padding: 20 }}>Appointments Page</div>;
}

function SignUp() {
  return <div style={{ padding: 20 }}>Sign Up Page</div>;
}

function Login() {
  return <div style={{ padding: 20 }}>Login Page</div>;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing_page />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
