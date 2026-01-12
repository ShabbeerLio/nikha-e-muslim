import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import imag1 from "../../Assets/login.png";
import Host from "../../Host/Host";
import Loading from "../../Components/Loading/Loading";
import { Eye, EyeOff } from "lucide-react";
import img1 from "../../Assets/register.png";
import logo from "../../Assets/Logo/logo.png";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const googleToken = params.get("token");
    const googleError = params.get("google");

    if (googleError === "not_registered") {
      setErrorMessage("Google account not registered. Please signup first.");
    }

    if (googleToken !== null) {
      console.log(googleToken, "token")
      localStorage.setItem("token", googleToken);
    }
    // localStorage.setItem("token", token);
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

  const handleGoogle = () => {
    window.location.href = `${Host}/api/auth/google`;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="page">
      <div className={`signup-top ${loading ? "loading" : ""}`}>
        <span>Find exactly the</span>
        <h5>Right Partner for you!</h5>
        <img className="signup-logo" src={logo} alt="" />
        {!loading ? (
          <>
            <h2>Let's Get Started!</h2>
            <p>Create your account</p>
          </>
        ) : (
          <div className="signup-loading-text">
            <h2>Getting Things Ready</h2>
            <DotLottieReact
              src="https://lottie.host/fb3a7cfa-4d6c-4829-a42e-2aadb2742424/seUY29Eqkz.lottie"
              loop
              autoplay
            />
          </div>
        )}

        <img className="therm_img" src={img1} alt="" />
      </div>
      <div className="page-box login">
        {/* <img className="page-image" src={imag1} alt="" /> */}
        <form >
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
          <span className="forgot-password" onClick={() => navigate("/app/forgot-password")}>Forgot Password?</span>
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
        <p className="google-signup" onClick={() => handleGoogle()}>
          <FcGoogle /> Sign in with Google
        </p>
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
