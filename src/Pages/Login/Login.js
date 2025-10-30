import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import imag1 from "../../Assets/login.png";
import Host from "../../Host/Host";
import Loading from "../../Components/Loading/Loading";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    try {
      const res = await fetch(`${Host}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await res.json();
      console.log(data, "data")

      if (data.success) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        setLoading(false);
        setErrorMessage(data.error);
      }
    } catch (err) {
      console.error("Login error:", err);
      setTimeout(() => {
        setLoading(false);
      }, 1100);
      setErrorMessage("Server error. Please try again later.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="page">
      <div className="page-box">
        <img className="page-image" src={imag1} alt="" />
        <form className="form">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>Forgot Password?</span>
          {errorMessage && (
            <p
              style={{
                color: "red",
                fontSize: "14px"
              }}
            >
              {errorMessage}
            </p>
          )}
          <button
            type="button"
            className="btn primary"
            onClick={handleLoginSubmit}
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
