import React, { useState } from 'react';
import './Sign_Up.css';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Sign_Up = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showerr, setShowerr] = useState('');
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }),
      });
      const json = await res.json();

      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("phone", phone);
        sessionStorage.setItem("email", email);

        onLogin({ name, email });
        navigate('/');
      } else if (json.errors) {
        const messages = json.errors.map(err => err.msg).join(", ");
        setShowerr(messages);
      } else {
        setShowerr(json.error);
      }
    } catch (err) {
      setShowerr("Unexpected error occurred.");
    }
  };

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="signup-grid">
        <div className="signup-form">
          <form onSubmit={register}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input value={name} onChange={e => setName(e.target.value)} type="text" name="name" id="name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" name="phone" id="phone" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" required />
            </div>

            {showerr && <div style={{ color: 'red', marginTop: '10px' }}>{showerr}</div>}

            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;
