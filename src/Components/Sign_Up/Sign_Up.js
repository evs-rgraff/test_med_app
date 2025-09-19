import React, { useState } from 'react';
import './Sign_Up.css';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Sign_Up = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');
    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone, password }),
            });

            const json = await response.json();

            if (json.authtoken) {
                sessionStorage.setItem("auth-token", json.authtoken);
                sessionStorage.setItem("name", name);
                sessionStorage.setItem("phone", phone);
                sessionStorage.setItem("email", email);

                navigate("/");
                window.location.reload();
            } else {
                if (json.errors) {
                    const relevantErrors = json.errors
                        .filter(err => ['name', 'email', 'phone', 'password'].includes(err.param))
                        .map(err => err.msg)
                        .join(', ');
                    setShowerr(relevantErrors);
                } else if (json.error) {
                    setShowerr(typeof json.error === 'string' ? json.error : JSON.stringify(json.error));
                }
            }
        } catch (error) {
            setShowerr("An unexpected error occurred. Please try again.");
            console.error(error);
        }
    };

    const clearForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setShowerr('');
    };

    return (
        <div className="container" style={{ marginTop: '5%' }}>
            <div className="signup-grid">
                <div className="signup-form">
                    <form method="POST" onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                value={name}
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                name="name"
                                id="name"
                                className="form-control"
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                value={email}
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                value={phone}
                                type="tel"
                                onChange={(e) => setPhone(e.target.value)}
                                name="phone"
                                id="phone"
                                className="form-control"
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        {showerr && (
                            <div className="err" style={{ color: 'red', marginBottom: '10px' }}>
                                {showerr}
                            </div>
                        )}

                        <div className="button-group">
                            <button type="submit" className="button-primary">Sign Up</button>
                            <button type="button" className="button-secondary" onClick={clearForm}>Clear</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Sign_Up;
