import { useState } from "react";
import api from "../api/axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState("");

    // Client-side validation
    const validateForm = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
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
            const res = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            window.location.href = "/dashboard";
        } catch (error) {
            setLoading(false);
            setGeneralError(
                error.response?.data?.message || "Login failed. Please try again."
            );
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (errors.email) setErrors({ ...errors, email: "" });
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (errors.password) setErrors({ ...errors, password: "" });
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
            maxWidth: "420px",
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
        inputFocus: {
            borderColor: "#667eea",
            boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
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
        button: {
            width: "100%",
            marginTop: "24px",
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
        signupText: {
            textAlign: "center",
            fontSize: "14px",
            color: "#666",
        },
        signupLink: {
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

    const cardStyle = window.innerWidth < 768 ? { ...styles.card, ...styles.cardMobile } : styles.card;

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
                    <div style={styles.icon}>🔐</div>
                    <h1 style={styles.title}>Welcome Back</h1>
                    <p style={styles.subtitle}>Sign in to your account</p>
                </div>

                {generalError && (
                    <div style={styles.errorBox}>
                        <p style={styles.errorText}>{generalError}</p>
                    </div>
                )}

                <div>
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

                    <div style={styles.inputGroup}>
                        <div style={styles.inputWrapper}>
                            <span style={styles.inputIcon}>🔑</span>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Enter your password"
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
                        {errors.password && (
                            <p style={styles.fieldError}>{errors.password}</p>
                        )}
                    </div>

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
                                Logging in...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>
                </div>

                <div style={styles.divider}>
                    <div style={styles.dividerLine}>
                        <div style={styles.dividerLineElement}></div>
                    </div>
                    <div style={styles.dividerText}>
                        <span style={styles.dividerSpan}>Or</span>
                    </div>
                </div>

                <p style={styles.signupText}>
                    Don't have an account?{" "}
                    <a
                        href="/signup"
                        style={styles.signupLink}
                    >
                        Sign up here
                    </a>
                </p>
            </div>
        </div>
    );
}