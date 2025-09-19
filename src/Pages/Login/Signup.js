import React, { useEffect, useRef, useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import img1 from "../../Assets/register.png"
import logo from "../../Assets/Logo/logo.png"

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // console.log(overed,"overed")
  return (
    <div className="sign-page">
      <div className="signup-top">
        <span>Find exactly the</span>
        <h5>Right Partner for you!</h5>
        <img className="signup-logo" src={logo} alt="" />
        <h2>Let's Get Started!</h2>
        <p>Create your account</p>
        <img className="therm_img" src={img1} alt="" />
      </div>
      <div className="sign-page-box">
        <form className="sign-form">
          <h2>Register</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="form-input"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-input"
            value={form.email}
            onChange={handleChange}
          />
          <select name="gender"
            className="form-input" value={form.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-input"
            value={form.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="btn primary"
            onClick={() => navigate("/congrats")}
          >
            Register
          </button>
        </form>
        <span className="or">OR</span>
        <p className="login-register">
          Already user?{" "}
          <span className="link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
