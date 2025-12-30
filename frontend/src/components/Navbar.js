import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Navbar() {
    const [user, setUser] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/users/me");
                setUser(res.data);
            } catch (error) {
                console.error("Failed to fetch user", error);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setDropdownOpen(false);
        setTimeout(() => {
            window.location.href = "/login";
        }, 200);
    };

    const handleNavigation = (path) => {
        window.location.href = path;
        setMobileMenuOpen(false);
    };

    const styles = {
        navbar: {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            position: "sticky",
            top: 0,
            zIndex: 40,
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        container: {
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "70px",
        },
        logo: {
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
            transition: "opacity 0.2s ease",
        },
        logoIcon: {
            fontSize: "32px",
            fontWeight: "700",
        },
        logoText: {
            fontSize: "20px",
            fontWeight: "700",
            color: "white",
        },
        navCenter: {
            display: "flex",
            gap: "32px",
            alignItems: "center",
        },
        navLink: {
            color: "white",
            textDecoration: "none",
            fontSize: "15px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s ease",
            padding: "8px 0",
            borderBottom: "2px solid transparent",
        },
        navLinkHover: {
            borderBottom: "2px solid rgba(255, 255, 255, 0.5)",
        },
        navRight: {
            display: "flex",
            alignItems: "center",
            gap: "20px",
        },
        notificationBell: {
            position: "relative",
            background: "rgba(255, 255, 255, 0.2)",
            border: "none",
            borderRadius: "8px",
            padding: "8px 12px",
            cursor: "pointer",
            fontSize: "18px",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            color: "white",
        },
        notificationBadge: {
            position: "absolute",
            top: "-8px",
            right: "-8px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            width: "24px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "700",
        },
        profileSection: {
            display: "flex",
            alignItems: "center",
            gap: "16px",
            position: "relative",
        },
        profileAvatar: {
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            fontWeight: "600",
            color: "white",
        },
        profileAvatarHover: {
            background: "rgba(255, 255, 255, 0.4)",
            border: "2px solid rgba(255, 255, 255, 0.4)",
        },
        profileInfo: {
            display: "flex",
            flexDirection: "column",
            color: "white",
        },
        profileName: {
            fontSize: "14px",
            fontWeight: "600",
        },
        profileRole: {
            fontSize: "12px",
            opacity: 0.8,
        },
        dropdown: {
            position: "absolute",
            top: "100%",
            right: 0,
            marginTop: "12px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
            minWidth: "200px",
            zIndex: 50,
        },
        dropdownItem: {
            padding: "12px 16px",
            fontSize: "14px",
            color: "#1a1a1a",
            cursor: "pointer",
            transition: "all 0.2s ease",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            gap: "10px",
        },
        dropdownItemHover: {
            background: "#f8fafc",
        },
        dropdownItemLast: {
            borderBottom: "none",
        },
        dropdownIcon: {
            fontSize: "16px",
        },
        logoutBtn: {
            color: "#dc2626",
            fontWeight: "600",
        },
        mobileMenuBtn: {
            display: "none",
            background: "rgba(255, 255, 255, 0.2)",
            border: "none",
            color: "white",
            fontSize: "24px",
            cursor: "pointer",
            padding: "8px 12px",
            borderRadius: "8px",
            transition: "all 0.2s ease",
        },
        mobileMenu: {
            position: "fixed",
            top: "70px",
            left: 0,
            right: 0,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            maxHeight: "0",
            overflow: "hidden",
            transition: "max-height 0.3s ease",
            zIndex: 30,
        },
        mobileMenuOpen: {
            maxHeight: "500px",
        },
        mobileMenuContent: {
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
        },
        mobileMenuLink: {
            color: "white",
            textDecoration: "none",
            fontSize: "15px",
            fontWeight: "500",
            padding: "12px 16px",
            borderRadius: "8px",
            background: "rgba(255, 255, 255, 0.1)",
            cursor: "pointer",
            transition: "all 0.2s ease",
        },
        mobileMenuLinkHover: {
            background: "rgba(255, 255, 255, 0.2)",
        },
        separator: {
            height: "1px",
            background: "rgba(255, 255, 255, 0.2)",
            margin: "8px 0",
        },
    };

    // Responsive styles
    const isSmallScreen = typeof window !== "undefined" && window.innerWidth < 768;

    if (isSmallScreen) {
        styles.mobileMenuBtn.display = "flex";
        styles.navCenter.display = "none";
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
        <nav style={styles.navbar}>
            <style>{`
        @media (max-width: 768px) {
          nav {
            padding: 0;
          }
        }
      `}</style>

            <div style={styles.container}>
                {/* Logo */}
                <div
                    style={styles.logo}
                    onClick={() => handleNavigation("/dashboard")}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                    <div style={styles.logoIcon}>🚀</div>
                    <div style={styles.logoText}>Dashboard</div>
                </div>

                {/* Center Navigation */}
                <div style={styles.navCenter}>
                    {user?.role === "admin" && (
                        <a
                            style={styles.navLink}
                            onClick={() => handleNavigation("/dashboard")}
                            onMouseEnter={(e) =>
                                Object.assign(e.currentTarget.style, styles.navLinkHover)
                            }
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderBottom = "2px solid transparent";
                            }}
                        >
                            👥 Users
                        </a>
                    )}
                    <a
                        style={styles.navLink}
                        onClick={() => handleNavigation("/profile")}
                        onMouseEnter={(e) =>
                            Object.assign(e.currentTarget.style, styles.navLinkHover)
                        }
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderBottom = "2px solid transparent";
                        }}
                    >
                        👤 Profile
                    </a>
                </div>

                {/* Right Section */}
                <div style={styles.navRight}>
                    {/* Notification Bell */}
                    <button
                        style={styles.notificationBell}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                        }}
                    >
                        🔔
                        {notificationCount > 0 && (
                            <div style={styles.notificationBadge}>{notificationCount}</div>
                        )}
                    </button>

                    {/* Profile Section */}
                    <div style={styles.profileSection}>
                        <div style={styles.profileInfo}>
                            <div style={styles.profileName}>{user?.fullName || "User"}</div>
                            <div style={styles.profileRole}>{user?.role || "user"}</div>
                        </div>

                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            style={styles.profileAvatar}
                            onMouseEnter={(e) =>
                                Object.assign(e.currentTarget.style, styles.profileAvatarHover)
                            }
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
                                e.currentTarget.style.border = "2px solid rgba(255, 255, 255, 0.2)";
                            }}
                        >
                            {getInitials(user?.fullName)}
                        </button>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div style={styles.dropdown}>
                                <div
                                    style={styles.dropdownItem}
                                    onMouseEnter={(e) =>
                                        Object.assign(e.currentTarget.style, styles.dropdownItemHover)
                                    }
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "transparent";
                                    }}
                                    onClick={() => handleNavigation("/profile")}
                                >
                                    <span style={styles.dropdownIcon}>👤</span>
                                    <span>View Profile</span>
                                </div>

                                <div style={styles.separator}></div>

                                <div
                                    style={{ ...styles.dropdownItem, ...styles.logoutBtn, ...styles.dropdownItemLast }}
                                    onMouseEnter={(e) =>
                                        Object.assign(e.currentTarget.style, styles.dropdownItemHover)
                                    }
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "transparent";
                                    }}
                                    onClick={handleLogout}
                                >
                                    <span style={styles.dropdownIcon}>🚪</span>
                                    <span>Logout</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        style={styles.mobileMenuBtn}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? "✕" : "☰"}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isSmallScreen && (
                <div
                    style={{
                        ...styles.mobileMenu,
                        ...(mobileMenuOpen ? styles.mobileMenuOpen : {}),
                    }}
                >
                    <div style={styles.mobileMenuContent}>
                        <div
                            style={styles.mobileMenuLink}
                            onClick={() => handleNavigation("/dashboard")}
                            onMouseEnter={(e) =>
                                Object.assign(e.currentTarget.style, styles.mobileMenuLinkHover)
                            }
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                            }}
                        >
                            🏠 Home
                        </div>

                        {user?.role === "admin" && (
                            <div
                                style={styles.mobileMenuLink}
                                onClick={() => handleNavigation("/dashboard")}
                                onMouseEnter={(e) =>
                                    Object.assign(e.currentTarget.style, styles.mobileMenuLinkHover)
                                }
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                                }}
                            >
                                👥 Users
                            </div>
                        )}

                        <div
                            style={styles.mobileMenuLink}
                            onClick={() => handleNavigation("/profile")}
                            onMouseEnter={(e) =>
                                Object.assign(e.currentTarget.style, styles.mobileMenuLinkHover)
                            }
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                            }}
                        >
                            👤 Profile
                        </div>

                        <div
                            style={styles.mobileMenuLink}
                            onClick={() => handleNavigation("/profile")}
                            onMouseEnter={(e) =>
                                Object.assign(e.currentTarget.style, styles.mobileMenuLinkHover)
                            }
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                            }}
                        >
                            ⚙️ Settings
                        </div>

                        <div style={styles.separator}></div>

                        <div
                            style={{ ...styles.mobileMenuLink, ...styles.logoutBtn }}
                            onClick={handleLogout}
                            onMouseEnter={(e) =>
                                Object.assign(e.currentTarget.style, styles.mobileMenuLinkHover)
                            }
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                            }}
                        >
                            🚪 Logout
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}