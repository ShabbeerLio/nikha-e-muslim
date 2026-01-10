import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import imag1 from "../../Assets/login.png";
import Host from "../../Host/Host";
import Loading from "../../Components/Loading/Loading";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/app/");
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
        navigate("/app/");
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
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="password-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </span>
          </div>
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
          <span className="link" onClick={() => navigate("/app/signup")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
