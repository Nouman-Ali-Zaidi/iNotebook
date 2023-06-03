import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


const Login = (props) => {
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
            props.showAlert("Logged in successfully", "success");
            localStorage.setItem("token", json.authToken);
            navigate("/")
        } else {
            props.showAlert("Invalid Credentials", "danger");

        }
    }

    // OnChange handler
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div className='container mt-2 pt-2'>
            <div className="row">
                <div className="col-12 col-sm-8 col-md-6 m-auto">
                    <div className="card border shadow">
                        <div className="card-body ">
                            <form onSubmit={handleSubmit}>
                                <div className="text-center my-3 ">
                                    <h2>Login Form</h2>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-circle text-primary my-2" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                    </svg>
                                </div>
                                <div className="my-3 py2">
                                    <label htmlFor="email" className="form-label ">Email address</label>
                                    <input type="email" className="form-control shadow" id="emal" name='email' value={credentials.email} onChange={onChange} size="10" />
                                </div>
                                <div className="my-3 py-2">
                                    <label htmlFor="passward" className="form-label ">Password</label>
                                    <input type="password" className="form-control shadow" id="passward" name='passward' value={credentials.passward} onChange={onChange} />
                                </div>
                                <div className="text-center d-grid mt-3 mx-auto">
                                    <button type="submit" className="btn btn-primary shadow">Login</button>
                                    <p className='mt-3'>Don't have an account:  <Link to="/signup">Register</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Login
