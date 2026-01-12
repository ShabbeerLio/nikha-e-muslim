import React, { useState } from "react";
import "./Forgot.css";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, CircleCheckBig, Eye, EyeOff, KeyRound, LockKeyhole, Mail } from "lucide-react";
import Host from "../../Host/Host";

const Forgot = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const clearMsg = () => {
        setError("");
        setSuccess("");
    };

    // 🔹 Step 1: Send OTP
    const sendOtp = async () => {
        clearMsg();

        if (!email) {
            setError("Email is required");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        try {
            setLoading(true);
            const res = await fetch(`${Host}/api/auth/forgot-send-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Failed to send OTP");
            } else {
            setSuccess("OTP sent to your email");
            setTimeout(() => setSuccess(""), 1500);
            setStep(2);
            }
        } catch (err) {
            setError("Server not responding");
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Step 2: Verify OTP
    const verifyOtp = async () => {
        clearMsg();

        if (!otp) {
            setError("OTP is required");
            return;
        }

        try {
            setLoading(true);
            const res = await fetch(`${Host}/api/auth/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp , type: "forgot" }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Invalid OTP");
            } else {
            setSuccess("OTP verified successfully");
            setTimeout(() => setSuccess(""), 1500);
            setStep(3);
            }
        } catch (err) {
            setError("Server error");
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Password validation
    const validatePassword = (pass) => {
        return (
            pass.length >= 8 &&
            /[A-Z]/.test(pass) &&
            /[a-z]/.test(pass) &&
            /[0-9]/.test(pass) &&
            /[!@#$%^&*]/.test(pass)
        );
    };

    // 🔹 Step 3: Reset Password
    const resetPassword = async () => {
        clearMsg();

        if (!password || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!validatePassword(password)) {
            setError("Password does not meet security requirements");
            return;
        }

        try {
            setLoading(true);
            const res = await fetch(`${Host}/api/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp, newPassword: password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Password reset failed");
            } else {
            setSuccess("Password reset successfully");
            setStep(4);
                // setTimeout(() => navigate("/app/login"), 1500);
            }
        } catch (err) {
            setError("Network error");
        } finally {
            setLoading(false);
        }
    };
    const passwordChecks = {
        length: password.length >= 8,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*]/.test(password),
    };

    return (
        <div className="sign-page page">
            <div className="page-box registration">

                {/* STEP 1 */}
                {step === 1 && (
                    <>
                        <KeyRound className="page-icon" />
                        <div className="form">
                            <h2>Forgot password?</h2>
                            <p>Enter your email to receive OTP.</p>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="form-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            {error && <p className="msg error">{error}</p>}
                            {success && <p className="msg success">{success}</p>}

                            <button className="btn primary" onClick={sendOtp}>
                                {loading ? "Sending..." : "Send OTP"}
                            </button>
                        </div>
                    </>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <>
                        <Mail  className="page-icon" />
                        <div className="form">
                            <h2><ChevronLeft onClick={() => setStep(step-1)}/>Verify OTP</h2>
                            <p>Enter the OTP sent to your email.</p>

                            <input
                                type="text"
                                placeholder="Enter OTP"
                                className="form-input"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />

                            {error && <p className="msg error">{error}</p>}
                            {success && <p className="msg success">{success}</p>}

                            <button className="btn primary" onClick={verifyOtp}>
                                {loading ? "Verifying..." : "Verify OTP"}
                            </button>
                        </div>
                    </>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                    <>
                        <LockKeyhole className="page-icon" />
                        <div className="form">
                            <h2>Set New Password</h2>
                            <div className="password-field">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="New password"
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

                            <div className="password-field">
                                <input
                                    type={showCPassword ? "text" : "password"}
                                    placeholder="Confirm password"
                                    className="form-input"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <span
                                    className="password-eye"
                                    onClick={() => setShowCPassword(!showCPassword)}
                                >
                                    {showCPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                </span>
                            </div>

                            <div className="password-rules">
                                <p>Password must contain:</p>
                                <ul>
                                    <li className={passwordChecks.length ? "rule ok" : "rule"}>
                                        8+ characters
                                    </li>
                                    <li className={passwordChecks.upper ? "rule ok" : "rule"}>
                                        Uppercase letter
                                    </li>
                                    <li className={passwordChecks.lower ? "rule ok" : "rule"}>
                                        Lowercase letter
                                    </li>
                                    <li className={passwordChecks.number ? "rule ok" : "rule"}>
                                        Number
                                    </li>
                                    <li className={passwordChecks.special ? "rule ok" : "rule"}>
                                        Special character
                                    </li>
                                </ul>
                            </div>

                            {error && <p className="msg error">{error}</p>}
                            {success && <p className="msg success">{success}</p>}

                            <button className="btn primary" onClick={resetPassword}>
                                {loading ? "Resetting..." : "Reset Password"}
                            </button>
                        </div>
                    </>
                )}
                {step === 4 && (
                    <>
                        <CircleCheckBig className="page-icon" />
                        <div className="form">
                            <h2>Password reset</h2>
                            <p>
                                Your password has been successfully reset. <br />
                                Click below to log in magically.
                            </p>

                            {error && <p className="msg error">{error}</p>}
                            {success && <p className="msg success">{success}</p>}

                            <button className="btn primary" onClick={() => navigate("/app/login")}>
                                {loading ? "Resetting..." : "Continue"}
                            </button>
                        </div>
                    </>
                )}

                <span className="or">OR</span>

                <p className="login-register">
                    <span className="link" onClick={() => navigate("/app/login")}>
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Forgot;