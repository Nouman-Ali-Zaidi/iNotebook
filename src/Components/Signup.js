import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", passward: "", cpassward: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.passward !== credentials.cpassward) {
            props.showAlert("Please enter a correct passward", "danger")
            return
        }
        try {
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, passward: credentials.passward })
            });
            const json = await response.json();

            if (json.success) {
                // Save the auth token and redirect to home page
                props.showAlert("Sign Up Sucessfully", "success")
                localStorage.setItem("token", json.authToken);
                navigate("/");
            } else {
                props.showAlert("This email address already exits", "danger")
            }

        } catch (error) {
            props.showAlert("Can't Signup", "danger")
        }
    }

    // onchange handler
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="col-12 col-sm-8 col-md-6 m-auto">
                    <div className="card border shadow mb-4">
                        <div className="card-body ">
                            <form onSubmit={handleSubmit}>
                                <div className="text-center my-2 ">
                                    <h2>Signup Form</h2>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-circle text-primary my-2" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                    </svg>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="name" className="form-label">Name </label>
                                    <input type="text" className="form-control shadow" id="name" name='name' required minLength={4} onChange={onChange} />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control shadow" id="email" name='email' required minLength={4} onChange={onChange} />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="passward" className="form-label">Password</label>
                                    <input type="password" className="form-control shadow" id="passward" name='passward' required minLength={4} onChange={onChange} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="cpassward" className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control shadow" id="cpassward" name='cpassward' required minLength={4} onChange={onChange} />
                                </div>
                                <div className="text-center d-grid mt-1 mx-auto">
                                    <button type="submit" className="btn btn-primary shadow">Signup</button>
                                    <p className='mt-3'>Already have an account:  <Link to="/signup">Login</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;
