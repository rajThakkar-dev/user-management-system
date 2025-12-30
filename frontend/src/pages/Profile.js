import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    // Edit form state
    const [editFullName, setEditFullName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editErrors, setEditErrors] = useState({});
    const [editLoading, setEditLoading] = useState(false);

    // Password form state
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordErrors, setPasswordErrors] = useState({});
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    // Notification state
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/users/me");
                setUser(res.data);
                setEditFullName(res.data.fullName);
                setEditEmail(res.data.email);
            } catch (error) {
                showNotification("Failed to load profile", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const showNotification = (message, type = "success") => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 4000);
    };

    // Validate edit form
    const validateEditForm = () => {
        const errors = {};

        if (!editFullName.trim()) {
            errors.fullName = "Full name is required";
        } else if (editFullName.trim().length < 2) {
            errors.fullName = "Full name must be at least 2 characters";
        }

        if (!editEmail.trim()) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editEmail)) {
            errors.email = "Please enter a valid email address";
        }

        return errors;
    };

    // Validate password form
    const validatePasswordForm = () => {
        const errors = {};

        if (!currentPassword) {
            errors.currentPassword = "Current password is required";
        }

        if (!newPassword) {
            errors.newPassword = "New password is required";
        } else if (newPassword.length < 8) {
            errors.newPassword = "Password must be at least 8 characters";
        }

        if (!confirmPassword) {
            errors.confirmPassword = "Please confirm your password";
        } else if (newPassword !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        return errors;
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setEditErrors({});

        const errors = validateEditForm();
        if (Object.keys(errors).length > 0) {
            setEditErrors(errors);
            return;
        }

        setEditLoading(true);

        try {
            const res = await api.put("/users/me", {
                fullName: editFullName,
                email: editEmail,
            });
            setUser(res.data);
            setIsEditing(false);
            showNotification("Profile updated successfully", "success");
        } catch (error) {
            showNotification(
                error.response?.data?.message || "Failed to update profile",
                "error"
            );
        } finally {
            setEditLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setPasswordErrors({});

        const errors = validatePasswordForm();
        if (Object.keys(errors).length > 0) {
            setPasswordErrors(errors);
            return;
        }

        setPasswordLoading(true);

        try {
            await api.put("/users/me/password", {
                currentPassword,
                newPassword,
            });
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setIsChangingPassword(false);
            showNotification("Password changed successfully", "success");
        } catch (error) {
            showNotification(
                error.response?.data?.message || "Failed to change password",
                "error"
            );
        } finally {
            setPasswordLoading(false);
        }
    };

    const handleCancel = () => {
        if (isEditing) {
            setEditFullName(user.fullName);
            setEditEmail(user.email);
            setEditErrors({});
            setIsEditing(false);
        }
        if (isChangingPassword) {
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setPasswordErrors({});
            setIsChangingPassword(false);
        }
    };

    const styles = {
        container: {
            minHeight: "100vh",
            background: "#f8fafc",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        content: {
            maxWidth: "900px",
            margin: "0 auto",
            padding: "40px 20px",
        },
        header: {
            marginBottom: "40px",
        },
        title: {
            fontSize: "36px",
            fontWeight: "700",
            color: "#1a1a1a",
            marginBottom: "8px",
        },
        subtitle: {
            fontSize: "16px",
            color: "#666",
        },
        card: {
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            padding: "32px",
            marginBottom: "24px",
        },
        cardHeader: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
        },
        cardTitle: {
            fontSize: "20px",
            fontWeight: "700",
            color: "#1a1a1a",
        },
        editBtn: {
            paddingTop: "8px",
            paddingBottom: "8px",
            paddingLeft: "16px",
            paddingRight: "16px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s ease",
        },
        infoSection: {
            marginBottom: "24px",
        },
        infoLabel: {
            fontSize: "14px",
            fontWeight: "600",
            color: "#666",
            marginBottom: "8px",
        },
        infoValue: {
            fontSize: "16px",
            color: "#1a1a1a",
            padding: "12px",
            background: "#f8fafc",
            borderRadius: "8px",
        },
        inputGroup: {
            marginBottom: "20px",
        },
        label: {
            display: "block",
            fontSize: "14px",
            fontWeight: "600",
            color: "#1a1a1a",
            marginBottom: "8px",
        },
        input: {
            width: "100%",
            paddingTop: "12px",
            paddingBottom: "12px",
            paddingLeft: "16px",
            paddingRight: "16px",
            border: "2px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "14px",
            fontFamily: "inherit",
            transition: "all 0.2s ease",
            outline: "none",
            boxSizing: "border-box",
        },
        inputFocus: {
            borderColor: "#667eea",
            boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
        },
        inputError: {
            borderColor: "#fca5a5",
        },
        error: {
            marginTop: "6px",
            fontSize: "13px",
            color: "#dc2626",
        },
        passwordInputWrapper: {
            position: "relative",
            display: "flex",
            alignItems: "center",
        },
        passwordIcon: {
            position: "absolute",
            right: "12px",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
            color: "#667eea",
        },
        passwordInput: {
            paddingRight: "44px",
        },
        formActions: {
            display: "flex",
            gap: "12px",
            justifyContent: "flex-end",
            marginTop: "28px",
        },
        button: {
            paddingTop: "10px",
            paddingBottom: "10px",
            paddingLeft: "20px",
            paddingRight: "20px",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s ease",
        },
        saveBtn: {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
        },
        cancelBtn: {
            background: "#e5e7eb",
            color: "#1a1a1a",
        },
        buttonDisabled: {
            opacity: 0.6,
            cursor: "not-allowed",
        },
        notification: {
            position: "fixed",
            top: "20px",
            right: "20px",
            paddingTop: "16px",
            paddingBottom: "16px",
            paddingLeft: "20px",
            paddingRight: "20px",
            borderRadius: "10px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            animation: "slideIn 0.3s ease",
        },
        notificationSuccess: {
            background: "#dcfce7",
            color: "#166534",
            border: "1px solid #86efac",
        },
        notificationError: {
            background: "#fee2e2",
            color: "#991b1b",
            border: "1px solid #fca5a5",
        },
        profileAvatar: {
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "48px",
            fontWeight: "700",
            color: "white",
            marginBottom: "24px",
        },
        roleSection: {
            marginTop: "12px",
            padding: "12px",
            background: "#e0e7ff",
            borderRadius: "8px",
            display: "inline-block",
        },
        roleBadge: {
            fontSize: "12px",
            fontWeight: "600",
            color: "#3730a3",
            textTransform: "capitalize",
        },
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <Navbar />
                <div style={styles.content}>
                    <div style={{ textAlign: "center", padding: "60px 20px" }}>
                        <div
                            style={{
                                fontSize: "48px",
                                marginBottom: "16px",
                            }}
                        >
                            ⏳
                        </div>
                        <p style={{ color: "#666" }}>Loading your profile...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div style={styles.container}>
                <Navbar />
                <div style={styles.content}>
                    <div style={{ textAlign: "center", padding: "60px 20px" }}>
                        <div style={{ fontSize: "48px", marginBottom: "16px" }}>❌</div>
                        <p style={{ color: "#666" }}>Failed to load profile</p>
                    </div>
                </div>
            </div>
        );
    }

    const getInitials = (name) => {
        if (!name) return "?";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div style={styles.container}>
            <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        input:focus {
          border-color: #667eea !important;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
        }
        button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
          body{
          margin: 0;
          }
      `}</style>

            <Navbar />

            <div style={styles.content}>
                {/* Header */}
                <div style={styles.header}>
                    <h1 style={styles.title}>Profile Settings</h1>
                    <p style={styles.subtitle}>Manage your account information and security</p>
                </div>

                {/* Profile Information Card */}
                <div style={styles.card}>
                    <div style={styles.cardHeader}>
                        <h2 style={styles.cardTitle}>Personal Information</h2>
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                style={styles.editBtn}
                            >
                                ✏️ Edit
                            </button>
                        )}
                    </div>

                    {/* Avatar */}
                    <div style={styles.profileAvatar}>{getInitials(user.fullName)}</div>

                    {!isEditing ? (
                        <>
                            {/* Display Mode */}
                            <div style={styles.infoSection}>
                                <div style={styles.infoLabel}>Full Name</div>
                                <div style={styles.infoValue}>{user.fullName}</div>
                            </div>

                            <div style={styles.infoSection}>
                                <div style={styles.infoLabel}>Email Address</div>
                                <div style={styles.infoValue}>{user.email}</div>
                            </div>

                            <div style={styles.roleSection}>
                                <div style={styles.roleBadge}>Role: {user.role || "user"}</div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Edit Mode */}
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Full Name</label>
                                <input
                                    type="text"
                                    value={editFullName}
                                    onChange={(e) => {
                                        setEditFullName(e.target.value);
                                        if (editErrors.fullName)
                                            setEditErrors({ ...editErrors, fullName: "" });
                                    }}
                                    style={{
                                        ...styles.input,
                                        ...(editErrors.fullName ? styles.inputError : {}),
                                    }}
                                    onFocus={(e) =>
                                        Object.assign(e.target.style, styles.inputFocus)
                                    }
                                />
                                {editErrors.fullName && (
                                    <div style={styles.error}>{editErrors.fullName}</div>
                                )}
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Email Address</label>
                                <input
                                    type="email"
                                    value={editEmail}
                                    onChange={(e) => {
                                        setEditEmail(e.target.value);
                                        if (editErrors.email)
                                            setEditErrors({ ...editErrors, email: "" });
                                    }}
                                    style={{
                                        ...styles.input,
                                        ...(editErrors.email ? styles.inputError : {}),
                                    }}
                                    onFocus={(e) =>
                                        Object.assign(e.target.style, styles.inputFocus)
                                    }
                                />
                                {editErrors.email && (
                                    <div style={styles.error}>{editErrors.email}</div>
                                )}
                            </div>

                            <div style={styles.formActions}>
                                <button
                                    onClick={handleCancel}
                                    style={{ ...styles.button, ...styles.cancelBtn }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveProfile}
                                    disabled={editLoading}
                                    style={{
                                        ...styles.button,
                                        ...styles.saveBtn,
                                        ...(editLoading ? styles.buttonDisabled : {}),
                                    }}
                                >
                                    {editLoading ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Change Password Card */}
                <div style={styles.card}>
                    <div style={styles.cardHeader}>
                        <h2 style={styles.cardTitle}>Security</h2>
                        {!isChangingPassword && (
                            <button
                                onClick={() => setIsChangingPassword(true)}
                                style={styles.editBtn}
                            >
                                🔐 Change Password
                            </button>
                        )}
                    </div>

                    {!isChangingPassword ? (
                        <div style={styles.infoSection}>
                            <div style={styles.infoLabel}>Password</div>
                            <div style={styles.infoValue}>••••••••</div>
                            <p style={{ fontSize: "12px", color: "#999", marginTop: "8px" }}>
                                Last changed: Recently
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Password Change Mode */}
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Current Password</label>
                                <div style={styles.passwordInputWrapper}>
                                    <input
                                        type={showPasswords.current ? "text" : "password"}
                                        value={currentPassword}
                                        onChange={(e) => {
                                            setCurrentPassword(e.target.value);
                                            if (passwordErrors.currentPassword)
                                                setPasswordErrors({
                                                    ...passwordErrors,
                                                    currentPassword: "",
                                                });
                                        }}
                                        placeholder="Enter your current password"
                                        style={{
                                            ...styles.input,
                                            ...styles.passwordInput,
                                            ...(passwordErrors.currentPassword
                                                ? styles.inputError
                                                : {}),
                                        }}
                                        onFocus={(e) =>
                                            Object.assign(e.target.style, styles.inputFocus)
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPasswords({
                                                ...showPasswords,
                                                current: !showPasswords.current,
                                            })
                                        }
                                        style={styles.passwordIcon}
                                    >
                                        {showPasswords.current ? "🙈" : "👁️"}
                                    </button>
                                </div>
                                {passwordErrors.currentPassword && (
                                    <div style={styles.error}>{passwordErrors.currentPassword}</div>
                                )}
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>New Password</label>
                                <div style={styles.passwordInputWrapper}>
                                    <input
                                        type={showPasswords.new ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => {
                                            setNewPassword(e.target.value);
                                            if (passwordErrors.newPassword)
                                                setPasswordErrors({
                                                    ...passwordErrors,
                                                    newPassword: "",
                                                });
                                        }}
                                        placeholder="Enter your new password"
                                        style={{
                                            ...styles.input,
                                            ...styles.passwordInput,
                                            ...(passwordErrors.newPassword ? styles.inputError : {}),
                                        }}
                                        onFocus={(e) =>
                                            Object.assign(e.target.style, styles.inputFocus)
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPasswords({
                                                ...showPasswords,
                                                new: !showPasswords.new,
                                            })
                                        }
                                        style={styles.passwordIcon}
                                    >
                                        {showPasswords.new ? "🙈" : "👁️"}
                                    </button>
                                </div>
                                {passwordErrors.newPassword && (
                                    <div style={styles.error}>{passwordErrors.newPassword}</div>
                                )}
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Confirm New Password</label>
                                <div style={styles.passwordInputWrapper}>
                                    <input
                                        type={showPasswords.confirm ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            if (passwordErrors.confirmPassword)
                                                setPasswordErrors({
                                                    ...passwordErrors,
                                                    confirmPassword: "",
                                                });
                                        }}
                                        placeholder="Confirm your new password"
                                        style={{
                                            ...styles.input,
                                            ...styles.passwordInput,
                                            ...(passwordErrors.confirmPassword
                                                ? styles.inputError
                                                : {}),
                                        }}
                                        onFocus={(e) =>
                                            Object.assign(e.target.style, styles.inputFocus)
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPasswords({
                                                ...showPasswords,
                                                confirm: !showPasswords.confirm,
                                            })
                                        }
                                        style={styles.passwordIcon}
                                    >
                                        {showPasswords.confirm ? "🙈" : "👁️"}
                                    </button>
                                </div>
                                {passwordErrors.confirmPassword && (
                                    <div style={styles.error}>{passwordErrors.confirmPassword}</div>
                                )}
                            </div>

                            <div style={styles.formActions}>
                                <button
                                    onClick={handleCancel}
                                    style={{ ...styles.button, ...styles.cancelBtn }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleChangePassword}
                                    disabled={passwordLoading}
                                    style={{
                                        ...styles.button,
                                        ...styles.saveBtn,
                                        ...(passwordLoading ? styles.buttonDisabled : {}),
                                    }}
                                >
                                    {passwordLoading ? "Changing..." : "Change Password"}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Notification */}
            {notification && (
                <div
                    style={{
                        ...styles.notification,
                        ...(notification.type === "success"
                            ? styles.notificationSuccess
                            : styles.notificationError),
                    }}
                >
                    <span>{notification.type === "success" ? "✓" : "✕"}</span>
                    <span>{notification.message}</span>
                </div>
            )}
        </div>
    );
}