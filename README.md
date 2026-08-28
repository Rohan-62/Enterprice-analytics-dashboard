# 📊 Enterprise Commodity Price Tracking & Analytics Dashboard

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646C9A?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express.js-5.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-8.22-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.5-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

An enterprise-grade analytical platform and commodity price intelligence dashboard. It enables organizations to monitor daily market quotes from suppliers across regions, visualize historical trends, generate predictive price forecasts, automate threshold alerts, and track system changes through granular audit logging.

---

## 🌟 Key Features

### 📈 Analytics & Market Intelligence
- **Multi-Supplier Price Tracking:** Log, monitor, and compare daily commodity rates across national and regional suppliers.
- **Interactive Graphical Analytics:** Multi-series trend charts, moving averages, and supplier volatility metrics powered by Chart.js.
- **Daily Price Breakdown:** In-depth daily analysis displaying minimum, maximum, and average market quotes with competitive supplier rankings.
- **Predictive Forecasting:** Linear regression modeling to project future price trends up to 7+ days based on historical velocity.
- **Instant Global Search:** Fast lookup across commodities, suppliers, locations, and historical price records.

### 🛡️ Enterprise Governance & Admin Suite
- **Role-Based Access Control (RBAC):** Distinct roles for standard Users (view, explore, predict) and Administrators (full CRUD, audit logs, alert rules).
- **CRUD Operations:** Complete management suite for Products, Suppliers, and Historical Entries with pagination and date filters.
- **Automated Price Alerts:** Define minimum and maximum price threshold rules per product; automatically flag deviations and spikes.
- **Comprehensive Audit Trails:** Automatic logging of every mutation (`CREATE`, `UPDATE`, `DELETE`) with user attribution, entity IDs, timestamps, and modification diffs.
- **Report & Data Export:** One-click CSV and analytical report exporting.
- **Modern Responsive UI:** Glassmorphism-inspired dark & light theme modes, animated transitions, and mobile-friendly layouts.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, React Router v6, Vite, Lucide React, Chart.js, React-Chartjs-2 |
| **Styling** | Modern Vanilla CSS (Design Tokens, Glassmorphism, Dark/Light Themes) |
| **Backend** | Node.js, Express.js 5, JSON Web Tokens (`jsonwebtoken`), CORS |
| **Database** | PostgreSQL (`pg` Connection Pool with parameterized queries & index optimizations) |
| **Dev Tooling** | `concurrently` (unified server + client runner), `dotenv`, `oxlint` |

---

## 📁 Project Structure

```text
├── client/                     # React + Vite Frontend Application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── assets/             # Images and local styles
│   │   ├── components/         # Shared UI (Navbar, Footer, SearchBar, ThemeToggle, etc.)
│   │   ├── pages/              # Main view pages (Home, Analytics, DailyAnalysis, PredictiveAnalysis, Login)
│   │   │   └── admin/          # Admin Views (Dashboard, Products, Suppliers, Alerts, AuditLog)
│   │   ├── api.js              # Centralized Axios/Fetch API client with JWT headers
│   │   ├── App.jsx             # React router configuration & route protection guards
│   │   ├── main.jsx            # React root mount
│   │   └── index.css           # Global design tokens and theme stylesheet
│   ├── package.json            # Frontend package dependencies
│   └── vite.config.js          # Vite build configuration
│
├── server/                     # Node.js + Express Backend
│   ├── src/
│   │   └── database.js         # PostgreSQL connection pool, schema init, queries & audit logging
│   └── server.js               # REST API endpoints, JWT authentication middleware & static fallback
│
├── sql/                        # Schema and bulk insertion scripts
│   ├── setup.sql               # Database setup and schema definitions
│   └── insert_data_*.sql       # Historical daily market datasets
│
├── .env.example                # Template for environment configuration
├── package.json                # Root package for running both services concurrently
└── README.md                   # Project documentation
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **PostgreSQL** (v14 or higher)
- **Git**

---

### 2. Clone the Repository
```bash
git clone <your-repository-url>
cd Enterprice-analytics-dashboard-main
```

---

### 3. Install Dependencies
Install dependencies for both the root backend orchestrator and the frontend client:

```bash
# Install root/server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

---

### 4. Database Setup & Configuration
1. Start your local PostgreSQL server.
2. Create a new database named `price_tracking` (or name of your choice):
   ```sql
   CREATE DATABASE price_tracking;
   ```
3. Create a `.env` file in the root directory (refer to `.env.example`):
   ```env
   DB_USER=postgres
   DB_HOST=localhost
   DB_DATABASE=price_tracking
   DB_PASSWORD=your_postgres_password
   DB_PORT=5432
   PORT=3000
   JWT_SECRET=your_super_secret_jwt_key_here
   ```

> **Note:** On first startup, the backend automatically creates all necessary tables (`products`, `suppliers`, `prices`, `users`, `price_alerts`, `audit_logs`) and seeds sample products, suppliers, and users if the database is empty.

---

### 5. Running the Application

#### 🔹 Development Mode (Unified Runner)
Run both backend Express server and Vite frontend concurrently with one command:
```bash
npm run dev
```
- **Frontend:** `http://localhost:5173`
- **Backend API:** `http://localhost:3000`

#### 🔹 Production Mode
Build the client and start the Express production server:
```bash
npm run build
npm start
```
The application will be served at `http://localhost:3000`.

---

## 🔑 Default Credentials

The system seeds default accounts on initial launch:

| Role | Username | Password | Access Scope |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin` | `admin123` | Full Access (Analytics, Forecasts, CRUD Products/Suppliers, Entries, Alerts, Audit Logs) |
| **Standard User** | `user` | `user123` | Read-only & Analytics (Home, Analytics, Daily Breakdown, Predictive Forecasts) |

---

## 🔌 API Reference Overview

### 🔐 Authentication
- `POST /api/auth/login` — Authenticate user and issue JWT token

### 📦 Products & Suppliers
- `GET /api/products` — Retrieve all tracked commodities
- `POST /api/products` — Create a new product *(Admin)*
- `PUT /api/products/:id` — Update product details *(Admin)*
- `DELETE /api/products/:id` — Delete product *(Admin)*
- `GET /api/suppliers` — Retrieve all registered suppliers & locations
- `POST /api/suppliers` — Register a supplier *(Admin)*
- `PUT /api/suppliers/:id` — Modify supplier info *(Admin)*
- `DELETE /api/suppliers/:id` — Delete supplier *(Admin)*

### 💰 Price & Analytics
- `GET /api/prices` — Fetch filtered historical price series
- `GET /api/prices/today` — Fetch latest quotes for today
- `GET /api/prices/daily?date=YYYY-MM-DD&product_id=ID` — Daily breakdown by commodity
- `POST /api/prices` — Add daily price entry *(Admin)*
- `PUT /api/prices/:id` — Modify historical entry *(Admin)*
- `DELETE /api/prices/:id` — Delete price entry *(Admin)*
- `GET /api/stats` — High-level statistics (totals for commodities, suppliers, quotes)
- `GET /api/stats/advanced` — Deep analytics (volatility, price changes, cheapest suppliers)
- `GET /api/predict/:productId?days=7` — Linear regression price forecast

### 🔔 Alerts & Audit
- `GET /api/alerts` — Fetch configured price alert thresholds
- `POST /api/alerts` — Set a min/max price trigger *(Admin)*
- `DELETE /api/alerts/:id` — Remove price alert *(Admin)*
- `GET /api/alerts/triggered` — Retrieve triggered threshold breaches
- `GET /api/audit-logs?page=1&limit=25` — View paginated system audit trails *(Admin)*
- `GET /api/search?q=term` — Global search across commodities, suppliers, and prices

---

## 📜 License

This project is licensed under the **MIT License**.
