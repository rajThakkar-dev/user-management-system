import { useState } from "react";
import api from "../api/axios";

export default function Signup() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);

    // Calculate password strength
    const getPasswordStrength = (pwd) => {
        let strength = 0;
        if (pwd.length >= 8) strength++;
        if (pwd.length >= 12) strength++;
        if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
        if (/[0-9]/.test(pwd)) strength++;
        if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
        return strength;
    };

    // Client-side validation
    const validateForm = () => {
        const newErrors = {};

        if (!fullName.trim()) {
            newErrors.fullName = "Full name is required";
        } else if (fullName.trim().length < 2) {
            newErrors.fullName = "Full name must be at least 2 characters";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        } else if (getPasswordStrength(password) < 3) {
            newErrors.password =
                "Password must contain uppercase, lowercase, and numbers";
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        return newErrors;
    };

    const submit = async (e) => {
        e.preventDefault();
        setGeneralError("");

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setLoading(true);

        try {
            await api.post("/auth/signup", {
                fullName,
                email,
                password,
            });
            window.location.href = "/login";
        } catch (error) {
            setLoading(false);
            setGeneralError(
                error.response?.data?.message || "Signup failed. Please try again."
            );
        }
    };

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
        if (errors.fullName) setErrors({ ...errors, fullName: "" });
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (errors.email) setErrors({ ...errors, email: "" });
    };

    const handlePasswordChange = (e) => {
        const pwd = e.target.value;
        setPassword(pwd);
        setPasswordStrength(getPasswordStrength(pwd));
        if (errors.password) setErrors({ ...errors, password: "" });
        if (confirmPassword && pwd !== confirmPassword) {
            setErrors((prev) => ({
                ...prev,
                confirmPassword: "Passwords do not match",
            }));
        } else {
            setErrors((prev) => ({ ...prev, confirmPassword: "" }));
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" });
    };

    const getStrengthColor = () => {
        if (passwordStrength <= 2) return "#ef4444";
        if (passwordStrength <= 3) return "#f97316";
        if (passwordStrength <= 4) return "#eab308";
        return "#22c55e";
    };

    const getStrengthText = () => {
        if (passwordStrength === 0) return "";
        if (passwordStrength <= 2) return "Weak";
        if (passwordStrength <= 3) return "Fair";
        if (passwordStrength <= 4) return "Good";
        return "Strong";
    };

    const styles = {
        container: {
            minHeight: "100vh",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            position: "relative",
            overflow: "hidden",
        },
        backgroundDecoration: {
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
        },
        blob1: {
            position: "absolute",
            top: "80px",
            left: "40px",
            width: "288px",
            height: "288px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            filter: "blur(60px)",
        },
        blob2: {
            position: "absolute",
            bottom: "80px",
            right: "40px",
            width: "288px",
            height: "288px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            filter: "blur(60px)",
        },
        card: {
            position: "relative",
            width: "100%",
            maxWidth: "480px",
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            padding: "40px",
            zIndex: 10,
        },
        cardMobile: {
            padding: "32px 24px",
        },
        header: {
            textAlign: "center",
            marginBottom: "32px",
        },
        icon: {
            width: "56px",
            height: "56px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: "28px",
        },
        title: {
            fontSize: "32px",
            fontWeight: "700",
            color: "#1a1a1a",
            marginBottom: "8px",
        },
        subtitle: {
            fontSize: "14px",
            color: "#666",
        },
        errorBox: {
            marginBottom: "24px",
            padding: "12px 16px",
            background: "#fee2e2",
            border: "1px solid #fecaca",
            borderRadius: "8px",
        },
        errorText: {
            color: "#dc2626",
            fontSize: "14px",
        },
        inputGroup: {
            marginBottom: "20px",
        },
        inputWrapper: {
            position: "relative",
            display: "flex",
            alignItems: "center",
        },
        inputIcon: {
            position: "absolute",
            left: "16px",
            fontSize: "18px",
            color: "#667eea",
            pointerEvents: "none",
        },
        input: {
            width: "100%",
            paddingLeft: "44px",
            paddingRight: "16px",
            paddingTop: "12px",
            paddingBottom: "12px",
            border: "2px solid #e5e7eb",
            borderRadius: "10px",
            fontSize: "14px",
            fontFamily: "inherit",
            transition: "all 0.3s ease",
            outline: "none",
            boxSizing: "border-box",
        },
        inputError: {
            borderColor: "#fca5a5",
        },
        toggleButton: {
            position: "absolute",
            right: "12px",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
            color: "#667eea",
            padding: "0 4px",
        },
        fieldError: {
            marginTop: "8px",
            fontSize: "13px",
            color: "#dc2626",
        },
        strengthMeter: {
            marginTop: "8px",
            height: "6px",
            background: "#e5e7eb",
            borderRadius: "3px",
            overflow: "hidden",
        },
        strengthFill: {
            height: "100%",
            transition: "all 0.3s ease",
            borderRadius: "3px",
        },
        strengthText: {
            marginTop: "4px",
            fontSize: "12px",
            fontWeight: "600",
        },
        button: {
            width: "100%",
            marginTop: "28px",
            paddingTop: "12px",
            paddingBottom: "12px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
        },
        buttonDisabled: {
            opacity: 0.7,
            cursor: "not-allowed",
        },
        divider: {
            position: "relative",
            margin: "24px 0",
        },
        dividerLine: {
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
        },
        dividerLineElement: {
            width: "100%",
            height: "1px",
            background: "#e5e7eb",
        },
        dividerText: {
            position: "relative",
            display: "flex",
            justifyContent: "center",
            fontSize: "12px",
        },
        dividerSpan: {
            paddingLeft: "8px",
            paddingRight: "8px",
            background: "white",
            color: "#999",
        },
        loginText: {
            textAlign: "center",
            fontSize: "14px",
            color: "#666",
        },
        loginLink: {
            color: "#667eea",
            textDecoration: "none",
            fontWeight: "600",
            cursor: "pointer",
            transition: "color 0.3s ease",
        },
        footerText: {
            textAlign: "center",
            fontSize: "12px",
            color: "rgba(255, 255, 255, 0.7)",
            marginTop: "24px",
        },
        spinner: {
            width: "18px",
            height: "18px",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            borderTop: "2px solid white",
            borderRadius: "50%",
            animation: "spin 0.6s linear infinite",
        },
    };

    const cardStyle =
        window.innerWidth < 768 ? { ...styles.card, ...styles.cardMobile } : styles.card;

    return (
        <div style={styles.container}>
            <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input:focus {
          border-color: #667eea !important;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
        }
          body{
          margin: 0;
          }
        button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }
        button:active:not(:disabled) {
          transform: translateY(0);
        }
        a:hover {
          color: #5568d3 !important;
        }
      `}</style>

            <div style={styles.backgroundDecoration}>
                <div style={styles.blob1}></div>
                <div style={styles.blob2}></div>
            </div>

            <div style={cardStyle}>
                <div style={styles.header}>
                    <div style={styles.icon}>✨</div>
                    <h1 style={styles.title}>Create Account</h1>
                    <p style={styles.subtitle}>Join us today</p>
                </div>

                {generalError && (
                    <div style={styles.errorBox}>
                        <p style={styles.errorText}>{generalError}</p>
                    </div>
                )}

                <div>
                    {/* Full Name Input */}
                    <div style={styles.inputGroup}>
                        <div style={styles.inputWrapper}>
                            <span style={styles.inputIcon}>👤</span>
                            <input
                                type="text"
                                value={fullName}
                                onChange={handleFullNameChange}
                                placeholder="Enter your full name"
                                style={{
                                    ...styles.input,
                                    ...(errors.fullName ? styles.inputError : {}),
                                }}
                            />
                        </div>
                        {errors.fullName && (
                            <p style={styles.fieldError}>{errors.fullName}</p>
                        )}
                    </div>

                    {/* Email Input */}
                    <div style={styles.inputGroup}>
                        <div style={styles.inputWrapper}>
                            <span style={styles.inputIcon}>✉️</span>
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Enter your email"
                                style={{
                                    ...styles.input,
                                    ...(errors.email ? styles.inputError : {}),
                                }}
                            />
                        </div>
                        {errors.email && (
                            <p style={styles.fieldError}>{errors.email}</p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div style={styles.inputGroup}>
                        <div style={styles.inputWrapper}>
                            <span style={styles.inputIcon}>🔑</span>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Create a password"
                                style={{
                                    ...styles.input,
                                    ...(errors.password ? styles.inputError : {}),
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={styles.toggleButton}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                        {password && (
                            <div>
                                <div style={styles.strengthMeter}>
                                    <div
                                        style={{
                                            ...styles.strengthFill,
                                            width: `${(passwordStrength / 5) * 100}%`,
                                            background: getStrengthColor(),
                                        }}
                                    ></div>
                                </div>
                                <div
                                    style={{
                                        ...styles.strengthText,
                                        color: getStrengthColor(),
                                    }}
                                >
                                    {getStrengthText()}
                                </div>
                            </div>
                        )}
                        {errors.password && (
                            <p style={styles.fieldError}>{errors.password}</p>
                        )}
                    </div>

                    {/* Confirm Password Input */}
                    <div style={styles.inputGroup}>
                        <div style={styles.inputWrapper}>
                            <span style={styles.inputIcon}>🔒</span>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                placeholder="Confirm your password"
                                style={{
                                    ...styles.input,
                                    ...(errors.confirmPassword ? styles.inputError : {}),
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={styles.toggleButton}
                            >
                                {showConfirmPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p style={styles.fieldError}>{errors.confirmPassword}</p>
                        )}
                    </div>

                    {/* Signup Button */}
                    <button
                        onClick={submit}
                        disabled={loading}
                        style={{
                            ...styles.button,
                            ...(loading ? styles.buttonDisabled : {}),
                        }}
                    >
                        {loading ? (
                            <>
                                <div style={styles.spinner}></div>
                                Creating account...
                            </>
                        ) : (
                            "Create Account"
                        )}
                    </button>
                </div>

                <div style={styles.divider}>
                    <div style={styles.dividerLine}>
                        <div style={styles.dividerLineElement}></div>
                    </div>
                    <div style={styles.dividerText}>
                        <span style={styles.dividerSpan}>Already have one?</span>
                    </div>
                </div>

                <p style={styles.loginText}>
                    Already have an account?{" "}
                    <a href="/login" style={styles.loginLink}>
                        Log in here
                    </a>
                </p>
            </div>
        </div>
    );
}