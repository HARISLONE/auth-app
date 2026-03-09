# Secure Authentication App

This project is a simple **authentication system** built using **React (Frontend)** and **Node.js + Express (Backend)** with **JWT-based authentication**.

The application allows a user to log in, access a protected dashboard, and log out securely using token invalidation.

---

## Tech Stack

**Frontend**

- React (Vite)
- React Router v6
- Axios

**Backend**

- Node.js
- Express.js
- JSON Web Token (JWT)

---

## Features

- User Login with JWT authentication
- Protected Dashboard route
- Token stored in localStorage
- Logout with token blacklist
- Token expiration after 1 hour
- API error handling

Valid login credentials:

```
username: admin
password: admin123
```

---

# Project Structure

```
auth-app
│
├── backend
│   └── server.js
│
└── frontend
    └── React application
```

---

# Backend Setup

Navigate to the backend folder:

```
cd backend
```

Install dependencies:

```
npm install
```

Start the server:

```
node server.js
```

Backend will run on:

```
http://localhost:3000
```

---

# Frontend Setup

Navigate to the frontend folder:

```
cd frontend
```

Install dependencies:

```
npm install
```

Start the frontend server:

```
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

# API Endpoints

### Login

```
POST /api/login
```

Returns JWT token.

---

### Profile (Protected)

```
GET /api/profile
```

Requires Authorization header:

```
Authorization: Bearer <token>
```

---

### Logout

```
POST /api/logout
```

Invalidates the token using a blacklist.

---

# Author

Haris Hilal
