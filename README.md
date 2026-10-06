# 🏢 Enterprise Employee Management System (EMS)

A production-style, enterprise Employee Management System built with **React**, **Vite**, **Tailwind CSS**, **Node.js**, **Express**, **MongoDB**, **JWT**, and **bcrypt**.

The design system incorporates the **exact 4-color palette**:
- 🏛️ **Holly / Deep Green (`#02261E`)**: Authority, sidebar, headings, primary buttons, structure.
- 🌫️ **Alabaster (`#F2F7F9`)**: Canvas background, cards, surfaces, clean negative space.
- 🌊 **Dusty Teal (`#89C9C9`)**: Secondary cards, informational elements, charts, supporting UI.
- 🍋 **Soft Lime / Mindaro (`#DAFC92`)**: Primary CTA highlights, "+ Add Employee", active indicators, positive statistics.

---

## 🚀 Quick Start

### 1. Default Administrator Credentials
- **Email:** `admin@enterprise.com`
- **Password:** `Admin@123456`
*(Includes a 1-click **Auto-fill** button on the Login page for testing)*

### 2. Services Already Running
- **Frontend URL:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000](http://localhost:5000)
- **MongoDB Database:** `mongodb://127.0.0.1:27017/enterprise_ems`

---

## 📁 Architecture Overview

```text
Task_2/
├── backend/
│   ├── src/
│   │   ├── config/          # db.js (MongoDB manager), seed.js (Admin & Workforce seeding)
│   │   ├── controllers/     # authController, employeeController, dashboardController
│   │   ├── middleware/      # authMiddleware (JWT), errorMiddleware, validateMiddleware
│   │   ├── models/          # User.js (bcrypt), Employee.js (indexes, uniqueness)
│   │   ├── routes/          # authRoutes, employeeRoutes, dashboardRoutes
│   │   ├── validators/      # authValidator (Zod), employeeValidator (Zod)
│   │   └── server.js        # Express app entry point
│   ├── .env                 # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/      # Button, Input, Badge, StatCard, Modal, Toast, Skeleton, etc.
│   │   │   └── employee/    # EmployeeTable, EmployeeFilterBar, EmployeeFormModal, DetailModal
│   │   ├── context/         # AuthContext.jsx (Persistent JWT & user state)
│   │   ├── layouts/         # AdminLayout.jsx (Holly sidebar + navbar + modal triggers)
│   │   ├── pages/           # Login, Register, Dashboard, Employees, Settings, NotFound
│   │   ├── services/        # api.js, authService, employeeService, dashboardService
│   │   └── utils/           # constants.js, formatters.js (currency, dates, avatars)
│   ├── tailwind.config.js   # Tailored palette: holly, alabaster, dusty-teal, soft-lime
│   ├── vite.config.js       # API proxy configuration
│   └── package.json
└── run_verification.ps1     # Automated end-to-end verification script
```

---

## 🛡️ Security Features
1. **Password Hashing:** Passwords hashed with `bcryptjs` (salt rounds = 10); passwords never returned by APIs.
2. **JWT Authentication:** Strict Bearer tokens with 7-day expiration and automated verification.
3. **Role Authorization:** Protected endpoints require verified `admin` role.
4. **Dual Validation:** Zod schema validation on both client inputs and server endpoints.
5. **No Stack Traces:** Centralized error handling returns clean `{ success: false, message: ... }`.

---

## 📊 Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new administrator |
| `POST` | `/api/auth/login` | Public | Authenticate admin & receive JWT |
| `POST` | `/api/auth/logout` | Protected | Clear session |
| `GET` | `/api/auth/me` | Protected | Current admin user |
| `GET` | `/api/dashboard/stats` | Protected | Live workforce statistics & aggregations |
| `GET` | `/api/employees` | Protected | List employees (search, filters, pagination) |
| `GET` | `/api/employees/:id` | Protected | Single employee personnel record |
| `POST` | `/api/employees` | Protected | Add new employee |
| `PUT` | `/api/employees/:id` | Protected | Edit employee details |
| `DELETE`| `/api/employees/:id` | Protected | Delete employee record |
