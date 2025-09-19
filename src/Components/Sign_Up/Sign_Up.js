import React, { useState } from 'react';
import './Sign_Up.css';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Sign_Up = () => {
    // State variables using useState hook
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState(''); // State to show error messages
    const navigate = useNavigate(); // Navigation hook from react-router

    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            // API Call to register user
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const json = await response.json(); // Parse the response JSON

            if (json.authtoken) {
                // Store user data in session storage
                sessionStorage.setItem("auth-token", json.authtoken);
                sessionStorage.setItem("email", email);

                // Redirect user to home page
                navigate("/");
                window.location.reload(); // Refresh the page
            } else {
                // Handle errors safely
                if (json.errors) {
                    // Combine all error messages into a single string
                    setShowerr(json.errors.map(err => err.msg).join(', '));
                } else if (json.error) {
                    setShowerr(typeof json.error === 'string' ? json.error : JSON.stringify(json.error));
                }
            }
        } catch (error) {
            setShowerr("An unexpected error occurred. Please try again.");
            console.error(error);
        }
    };

    // JSX to render the Sign Up form
    return (
        <div className="container" style={{ marginTop: '5%' }}>
            <div className="signup-grid">
                <div className="signup-form">
                    <form method="POST" onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
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

                        <button type="submit" className="button-primary">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Sign_Up;
