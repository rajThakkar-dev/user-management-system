import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [me, setMe] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState(null);
    const [confirmDialog, setConfirmDialog] = useState(null);
    const [actionLoading, setActionLoading] = useState(null);

    const USERS_PER_PAGE = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const meRes = await api.get("/users/me");
                setMe(meRes.data);

                if (meRes.data.role === "admin") {
                    const usersRes = await api.get("/users");
                    setUsers(usersRes.data);
                }
            } catch (error) {
                showNotification("Failed to load data", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const showNotification = (message, type = "success") => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 4000);
    };

    const handleActivate = (user) => {
        setConfirmDialog({
            title: "Activate User",
            message: `Are you sure you want to activate ${user.email}?`,
            action: async () => {
                await performAction(user._id, "active");
            },
        });
    };

    const handleDeactivate = (user) => {
        setConfirmDialog({
            title: "Deactivate User",
            message: `Are you sure you want to deactivate ${user.email}?`,
            action: async () => {
                await performAction(user._id, "inactive");
            },
        });
    };

    const performAction = async (userId, action) => {
        setActionLoading(userId);
        try {
            await api.patch(`/users/${userId}/status`, { status: action });
            setUsers((prevUsers) =>
                prevUsers.map((u) =>
                    u._id === userId
                        ? { ...u, status: action === "active" ? "active" : "inactive" }
                        : u
                )
            );
            showNotification(
                `User ${action === "active" ? "active" : "inactive"} successfully`,
                "success"
            );
            setConfirmDialog(null);
        } catch (error) {
            showNotification(
                error.response?.data?.message ||
                `Failed to ${action} user. Please try again.`,
                "error"
            );
        } finally {
            setActionLoading(null);
        }
    };

    const paginatedUsers = users.slice(
        (currentPage - 1) * USERS_PER_PAGE,
        currentPage * USERS_PER_PAGE
    );

    const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

    const styles = {
        container: {
            minHeight: "100vh",
            background: "#f8fafc",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        content: {
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "32px 20px",
        },
        welcomeSection: {
            marginBottom: "40px",
        },
        welcomeTitle: {
            fontSize: "36px",
            fontWeight: "700",
            color: "#1a1a1a",
            marginBottom: "8px",
        },
        welcomeSubtitle: {
            fontSize: "16px",
            color: "#666",
        },
        adminSection: {
            marginTop: "40px",
        },
        sectionTitle: {
            fontSize: "24px",
            fontWeight: "700",
            color: "#1a1a1a",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
        },
        tableWrapper: {
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
        },
        thead: {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        },
        th: {
            padding: "16px",
            textAlign: "left",
            color: "white",
            fontWeight: "600",
            fontSize: "14px",
            borderBottom: "2px solid #e5e7eb",
        },
        td: {
            padding: "16px",
            borderBottom: "1px solid #e5e7eb",
            fontSize: "14px",
            color: "#1a1a1a",
        },
        tr: {
            transition: "background-color 0.2s ease",
        },
        trHover: {
            background: "#f8fafc",
        },
        statusBadge: {
            display: "inline-block",
            paddingTop: "4px",
            paddingBottom: "4px",
            paddingLeft: "12px",
            paddingRight: "12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "600",
        },
        statusActive: {
            background: "#dcfce7",
            color: "#166534",
        },
        statusInactive: {
            background: "#fee2e2",
            color: "#991b1b",
        },
        roleBadge: {
            display: "inline-block",
            paddingTop: "4px",
            paddingBottom: "4px",
            paddingLeft: "12px",
            paddingRight: "12px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "600",
            background: "#e0e7ff",
            color: "#3730a3",
        },
        actionsCell: {
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
        },
        button: {
            paddingTop: "6px",
            paddingBottom: "6px",
            paddingLeft: "12px",
            paddingRight: "12px",
            border: "none",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s ease",
            whiteSpace: "nowrap",
        },
        activateBtn: {
            background: "#dcfce7",
            color: "#166534",
        },
        deactivateBtn: {
            background: "#fee2e2",
            color: "#991b1b",
        },
        buttonHover: {
            opacity: 0.8,
            transform: "translateY(-1px)",
        },
        buttonDisabled: {
            opacity: 0.6,
            cursor: "not-allowed",
        },
        paginationWrapper: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            padding: "24px",
            borderTop: "1px solid #e5e7eb",
        },
        paginationButton: {
            paddingTop: "8px",
            paddingBottom: "8px",
            paddingLeft: "12px",
            paddingRight: "12px",
            border: "1px solid #e5e7eb",
            background: "white",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.2s ease",
            color: "#667eea",
        },
        paginationButtonActive: {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
        },
        paginationButtonDisabled: {
            opacity: 0.5,
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
        notificationIcon: {
            fontSize: "18px",
        },
        confirmDialog: {
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "20px",
        },
        dialogContent: {
            background: "white",
            borderRadius: "12px",
            padding: "32px",
            maxWidth: "400px",
            width: "100%",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        },
        dialogTitle: {
            fontSize: "20px",
            fontWeight: "700",
            color: "#1a1a1a",
            marginBottom: "12px",
        },
        dialogMessage: {
            fontSize: "14px",
            color: "#666",
            marginBottom: "28px",
            lineHeight: "1.6",
        },
        dialogButtons: {
            display: "flex",
            gap: "12px",
            justifyContent: "flex-end",
        },
        dialogBtn: {
            paddingTop: "10px",
            paddingBottom: "10px",
            paddingLeft: "20px",
            paddingRight: "20px",
            border: "none",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s ease",
        },
        cancelBtn: {
            background: "#e5e7eb",
            color: "#1a1a1a",
        },
        confirmBtn: {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
        },
        loadingSpinner: {
            display: "inline-block",
            width: "16px",
            height: "16px",
            border: "2px solid rgba(0, 0, 0, 0.1)",
            borderTop: "2px solid currentColor",
            borderRadius: "50%",
            animation: "spin 0.6s linear infinite",
        },
        emptyState: {
            textAlign: "center",
            padding: "60px 20px",
            color: "#666",
        },
        emptyIcon: {
            fontSize: "48px",
            marginBottom: "16px",
        },
        emptyText: {
            fontSize: "16px",
        },
        notAdminMessage: {
            background: "#fef3c7",
            border: "1px solid #fcd34d",
            color: "#92400e",
            padding: "16px",
            borderRadius: "8px",
            marginTop: "24px",
        },
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
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        tr:hover {
          background-color: #f8fafc;
        }
        button:hover:not(:disabled) {
          opacity: 0.8;
          transform: translateY(-1px);
        }
          body{
          margin: 0;
          }
      `}</style>

            <Navbar />

            <div style={styles.content}>
                <div style={styles.welcomeSection}>
                    <h1 style={styles.welcomeTitle}>Welcome back, {me?.fullName}! 👋</h1>
                    <p style={styles.welcomeSubtitle}>
                        Here's an overview of your account
                    </p>
                </div>

                {me?.role === "admin" ? (
                    <div style={styles.adminSection}>
                        <div style={styles.sectionTitle}>
                            <span>👥</span>
                            <span>User Management</span>
                        </div>

                        {users.length > 0 ? (
                            <div style={styles.tableWrapper}>
                                <table style={styles.table}>
                                    <thead style={styles.thead}>
                                        <tr>
                                            <th style={styles.th}>Email</th>
                                            <th style={styles.th}>Full Name</th>
                                            <th style={styles.th}>Role</th>
                                            <th style={styles.th}>Status</th>
                                            <th style={styles.th}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedUsers.map((user) => (
                                            <tr key={user._id} style={styles.tr}>
                                                <td style={styles.td}>{user.email}</td>
                                                <td style={styles.td}>{user.fullName}</td>
                                                <td style={styles.td}>
                                                    <span style={styles.roleBadge}>
                                                        {user.role || "user"}
                                                    </span>
                                                </td>
                                                <td style={styles.td}>
                                                    <span
                                                        style={{
                                                            ...styles.statusBadge,
                                                            ...(user.status === "active"
                                                                ? styles.statusActive
                                                                : styles.statusInactive),
                                                        }}
                                                    >
                                                        {user.status === "active" ? "✓ Active" : "✕ Inactive"}
                                                    </span>
                                                </td>
                                                <td style={styles.td}>
                                                    <div style={styles.actionsCell}>
                                                        {user.status !== "active" && (
                                                            <button
                                                                onClick={() => handleActivate(user)}
                                                                disabled={actionLoading === user._id}
                                                                style={{
                                                                    ...styles.button,
                                                                    ...styles.activateBtn,
                                                                    ...(actionLoading === user._id
                                                                        ? styles.buttonDisabled
                                                                        : {}),
                                                                }}
                                                            >
                                                                {actionLoading === user._id ? (
                                                                    <div style={styles.loadingSpinner}></div>
                                                                ) : (
                                                                    "Activate"
                                                                )}
                                                            </button>
                                                        )}
                                                        {user.status === "active" && (
                                                            <button
                                                                onClick={() => handleDeactivate(user)}
                                                                disabled={actionLoading === user._id}
                                                                style={{
                                                                    ...styles.button,
                                                                    ...styles.deactivateBtn,
                                                                    ...(actionLoading === user._id
                                                                        ? styles.buttonDisabled
                                                                        : {}),
                                                                }}
                                                            >
                                                                {actionLoading === user._id ? (
                                                                    <div style={styles.loadingSpinner}></div>
                                                                ) : (
                                                                    "Deactivate"
                                                                )}
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {totalPages > 1 && (
                                    <div style={styles.paginationWrapper}>
                                        <button
                                            onClick={() =>
                                                setCurrentPage((prev) => Math.max(1, prev - 1))
                                            }
                                            disabled={currentPage === 1}
                                            style={{
                                                ...styles.paginationButton,
                                                ...(currentPage === 1
                                                    ? styles.paginationButtonDisabled
                                                    : {}),
                                            }}
                                        >
                                            ← Previous
                                        </button>

                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                            (page) => (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    style={{
                                                        ...styles.paginationButton,
                                                        ...(currentPage === page
                                                            ? styles.paginationButtonActive
                                                            : {}),
                                                    }}
                                                >
                                                    {page}
                                                </button>
                                            )
                                        )}

                                        <button
                                            onClick={() =>
                                                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                                            }
                                            disabled={currentPage === totalPages}
                                            style={{
                                                ...styles.paginationButton,
                                                ...(currentPage === totalPages
                                                    ? styles.paginationButtonDisabled
                                                    : {}),
                                            }}
                                        >
                                            Next →
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div style={styles.tableWrapper}>
                                <div style={styles.emptyState}>
                                    <div style={styles.emptyIcon}>📭</div>
                                    <div style={styles.emptyText}>No users found</div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div style={styles.notAdminMessage}>
                        ℹ️ You need admin privileges to access user management. Contact
                        support for more information.
                    </div>
                )}
            </div>

            {notification && (
                <div
                    style={{
                        ...styles.notification,
                        ...(notification.type === "success"
                            ? styles.notificationSuccess
                            : styles.notificationError),
                    }}
                >
                    <span style={styles.notificationIcon}>
                        {notification.type === "success" ? "✓" : "✕"}
                    </span>
                    <span>{notification.message}</span>
                </div>
            )}

            {confirmDialog && (
                <div style={styles.confirmDialog}>
                    <div style={styles.dialogContent}>
                        <h2 style={styles.dialogTitle}>{confirmDialog.title}</h2>
                        <p style={styles.dialogMessage}>{confirmDialog.message}</p>
                        <div style={styles.dialogButtons}>
                            <button
                                onClick={() => setConfirmDialog(null)}
                                style={{ ...styles.dialogBtn, ...styles.cancelBtn }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDialog.action}
                                style={{ ...styles.dialogBtn, ...styles.confirmBtn }}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}