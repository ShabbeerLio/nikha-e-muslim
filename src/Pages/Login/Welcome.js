import React from 'react'
import { useNavigate } from 'react-router-dom';
import logo from "../../Assets/Logo/logo.png"
import welcome from "../../Assets/welcome.png"
import "./Welcome.css"

const Welcome = () => {
    const navigate = useNavigate();
    return (
        <div className="page">
            <div className="page-box">
                <div className="welcome-logo">
                    <img src={logo} alt="" />
                </div>
                <div className="illustration">
                    <img
                        src={welcome}
                        alt="welcome"
                    />
                </div>
                <h2>Welcome Back</h2>
                <p>For suggesting a life partner match anytime, anywhere</p>
                <button className="btn primary" onClick={() => navigate("/login")}>
                    Sign in
                </button>
                <button className="btn secondary" onClick={() => navigate("/signup")}>
                    Register
                </button>
            </div>

        </div>
    )
}

export default Welcome
