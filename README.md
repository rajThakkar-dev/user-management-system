# Mini User Management System (MERN Stack)

A full-stack **User Management System** built using the **MERN stack** with secure authentication, role-based access control (RBAC), and user lifecycle management.  
This project was developed as part of a **Backend Developer Intern Assessment**.

---

## 🚀 Live Deployment

- **Frontend (Vercel):** (https://user-management-system-seven-flax.vercel.app/login)
- **Backend API (Render):** (https://user-management-system-gb4z.onrender.com)   

---

## 🧩 Project Overview

The Mini User Management System allows users to sign up, log in, and manage their profile information.  
Admins have access to an admin dashboard where they can view, activate, and deactivate users.

The application focuses on:
- Secure authentication
- Clean backend architecture
- Role-based authorization
- Real-world deployment practices

---

## 🛠️ Tech Stack

### Frontend
- React (Hooks)
- React Router
- Axios
- Vercel (Deployment)

### Backend
- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- JWT Authentication
- bcrypt (Password Hashing)
- Render (Deployment)

### Tools
- Git & GitHub
- Postman
- dotenv
- CORS

---

## ✨ Features

### Authentication
- User signup with full name, email, and password
- Email format validation
- Password strength validation
- JWT token generation on signup and login
- Secure logout

### User Features
- View own profile
- Update full name and email
- Change password
- Protected routes for authenticated users

### Admin Features
- View all users with pagination
- Activate user accounts
- Deactivate user accounts
- Admin-only access control

### Security
- Passwords hashed using bcrypt
- JWT-protected API routes
- Role-based access control (Admin / User)
- Environment variable protection
- Proper HTTP status codes and error handling

  ---

🚀 Deployment
Backend (Render)
GitHub repository connected to Render

Environment variables configured in Render dashboard

Automatic deployment on push to main branch

Frontend (Vercel)
GitHub repository connected to Vercel

Environment variables configured in Vercel dashboard

Automatic production deployment

🧪 Testing
Backend unit tests for core business logic

API testing using Postman

Role-based access control verified

📌 Conclusion
This project demonstrates:

Secure authentication and authorization

Role-based user management

Clean MERN stack architecture

End-to-end deployment using Render and Vercel

Built with a strong focus on security, scalability, and clean code.
