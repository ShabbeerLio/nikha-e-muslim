import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import imag1 from "../../Assets/login.png"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="page-box">
        <img className="page-image" src={imag1} alt="" />
        <form className="form">
        <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>Forgot Password?</span>
          <button
            type="button"
            className="btn primary"
            onClick={() => navigate("/congrats")}
          >
            Sign in
          </button>
        </form>
        <span className="or">OR</span>
        <p className="login-register">
          New user?{" "}
          <span className="link" onClick={() => navigate("/signup")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
