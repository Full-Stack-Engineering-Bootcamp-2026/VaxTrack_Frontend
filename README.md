<div align="center">

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />

<br /><br />

# 💉 VaxTrack Frontend

**A modern, role-based vaccination management platform**  
Built for guardians, healthcare staff, and administrators.

[Getting Started](#installation) · [Features](#core-features) · [Architecture](#frontend-architecture) · [Tech Stack](#tech-stack)

</div>

---

## 📋 Overview

VaxTrack Frontend is the client-side application powering the VaxTrack vaccination management platform. It delivers role-specific dashboards and workflows tailored to three types of users — guardians tracking dependents, staff managing records, and admins overseeing the entire system.

### What it handles

- 🔐 Authentication & authorization (JWT + Redux Persist)
- 👨‍👩‍👧 Guardian vaccination tracking & notifications
- 📋 Vaccination record management
- ⚠️ Overdue vaccination monitoring & outreach
- 💊 Vaccine catalog management
- 👩‍⚕️ Staff management dashboards
- 📊 Reporting, analytics & PDF exports
- 📱 Fully responsive healthcare UI

---

## 👥 User Roles

| Role       | Responsibility                                   |
| ---------- | ------------------------------------------------ |
| `GUARDIAN` | Tracks dependent vaccinations and notifications  |
| `STAFF`    | Manages vaccination records and overdue tracking |
| `ADMIN`    | Manages staff, reports, and vaccine catalog      |

---

## ✨ Core Features

- **JWT Authentication** with persistent sessions via Redux Persist
- **Protected Routes** with role-based access control
- **Three Role-Specific Dashboards** — Guardian, Staff, and Admin
- **Vaccination Record Management** — search, filter, paginate, and record
- **Overdue Vaccination Workflows** — prioritization, indicators, outreach
- **Vaccine Catalog** — add, categorize, and toggle vaccine states
- **Dynamic Reporting** with PDF export (jsPDF + autotable)
- **Real-Time Dashboard Statistics**
- **Responsive Healthcare-Oriented UI**

---

## 🛠️ Tech Stack

| Layer            | Technology              |
| ---------------- | ----------------------- |
| Framework        | React                   |
| Language         | TypeScript              |
| Build Tool       | Vite                    |
| State Management | Redux Toolkit           |
| Persistence      | Redux Persist           |
| Routing          | React Router DOM        |
| Styling          | Tailwind CSS            |
| UI Components    | Shadcn UI               |
| HTTP Client      | Axios                   |
| Notifications    | React Toastify          |
| PDF Export       | jsPDF + jspdf-autotable |
| Icons            | Lucide React            |

---

## 🏗️ Frontend Architecture

```
Pages
  ↓
Reusable Components
  ↓
Redux Store
  ↓
Axios API Layer
  ↓
Backend APIs
```

| Layer       | Responsibility                    |
| ----------- | --------------------------------- |
| Pages       | Dashboard and route-level screens |
| Components  | Reusable UI elements              |
| Redux Store | Global state management           |
| Axios Layer | API communication                 |
| Hooks       | Reusable frontend logic           |
| Utils       | Shared utility functions          |

---

## 📁 Project Structure

```
src/
├── assets/                 # Static assets and images
│
├── components/
│   ├── dashboard/          # Dashboard UI components
│   ├── dialogs/            # Dialog components
│   ├── layouts/            # Role-based layouts
│   ├── protectedRoutes/    # Route protection
│   ├── svgImages/          # Custom SVG components
│   └── ui/                 # Shadcn reusable UI
│
├── hooks/                  # Custom hooks
├── lib/                    # Utility helpers
│
├── pages/
│   ├── admin/              # Admin pages
│   ├── guardian/           # Guardian pages
│   ├── profile/            # Shared profile pages
│   └── staff/              # Staff pages
│
├── redux/
│   ├── slices/             # Redux slices
│   └── stores/             # Store configuration
│
├── utils/                  # Utility functions
├── App.tsx
└── main.tsx
```

---

## 📄 Main Pages

| Page                 | Purpose                |
| -------------------- | ---------------------- |
| Login                | User authentication    |
| Register             | Guardian registration  |
| Guardian Dashboard   | Vaccination overview   |
| Staff Dashboard      | Vaccination management |
| Admin Dashboard      | System administration  |
| Vaccination Records  | Record management      |
| Overdue Vaccinations | Overdue tracking       |
| Reports              | Analytics and exports  |
| Vaccine Catalog      | Vaccine management     |
| Staff Management     | Admin staff control    |
| Notifications        | Guardian alerts        |
| Profile Page         | User profile settings  |

---

## 📊 Dashboard Breakdown

### 🏠 Guardian Dashboard

- Dependent vaccination tracking
- Notification center
- Upcoming vaccine schedules
- Compliance overview

### 🏥 Staff Dashboard

- Vaccination records table
- Overdue management
- Dynamic reporting
- Vaccine administration workflows

### ⚙️ Admin Dashboard

- Staff management
- Vaccine catalog control
- Reports and analytics
- System-wide monitoring

---

## 🔐 Authentication Flow

```
User Login
  ↓
JWT Token Generated
  ↓
Redux Persist Stores Auth State
  ↓
Protected Routes Validate Access
  ↓
Role-Based Layout Rendering
```

---

## 📤 PDF Export

Vaccination reports are exported using **jsPDF** and **jspdf-autotable**, and include:

- Dependent information
- Vaccine details
- Vaccination status
- Due dates
- Administration details

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <frontend-repository-url>
cd VaxTrack_Frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The app runs at `http://localhost:5173`

---

## 📦 Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run lint`  | Lint the codebase        |

---

## 🔧 Engineering Challenges Solved

- Designing role-based frontend workflows with clean separation
- Dynamic dashboard rendering per user role
- Protected routing architecture with JWT validation
- Managing persistent authentication across sessions
- Building reusable, healthcare-specific dashboard components
- Handling complex vaccination states (upcoming, due, overdue, completed)
- Creating scalable and maintainable frontend architecture

---

## 🔭 Future Improvements

- [ ] Real-time notification updates via WebSocket
- [ ] Advanced analytics dashboards
- [ ] Multi-language (i18n) support
- [ ] Accessibility (a11y) enhancements
- [ ] Offline support via service workers
- [ ] Mobile-first optimizations

---

## 🔗 Related Repository

> Backend Repository: `<backend-repository-url>`

---

## 👨‍💻 Author

Built by **Yash Kalange and Sanskar Rajput** — a healthcare-focused vaccination management frontend designed for guardians, healthcare staff, and administrators.
