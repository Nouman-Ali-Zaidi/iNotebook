import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


const Login = () => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", passward: "" });
    // Handle Submit Function
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, passward: credentials.passward })
        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            // Save the auth token and redirect to Home page
            localStorage.setItem("token", json.authToken);
            navigate("/")
        } else {
            alert("invalid Credentials");

        }
    }

    // OnChange handler
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="emal" name='email' value={credentials.email} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="passward" className="form-label">Password</label>
                    <input type="password" className="form-control" id="passward" name='passward' value={credentials.passward} onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
