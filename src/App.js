import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import Login from './Components/Login/Login';
// import Appointments from './Components/Appointments/Appointments';

// Temporary placeholder components (so your app compiles)
// function Appointments() {
//   return <div style={{ padding: 20 }}>Appointments Page</div>;
// }

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing_Page />} />
          {/* <Route path="/Appointments" element={<Appointments />} /> */}
          <Route path="/Sign_Up" element={<Sign_Up />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
