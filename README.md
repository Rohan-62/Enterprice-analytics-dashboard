# SKM Animal Feeds & Foods — Price Tracking System

A production-ready **Electron** desktop application for tracking commodity prices from multiple suppliers with graphical analytics, built for **SKM Animal Feeds and Foods**.

---

## 🚀 Features

- 📦 **14 Products** pre-loaded (DORB/RBDOC, Soya DOC variants, Maize DOC, GN DOC, Mustard DOC, Cotton DOC, etc.)
- 🏭 **77 Suppliers** pre-loaded with location metadata across India
- 💰 **Price Entry** — add, edit, and delete daily prices per product per supplier
- 📊 **Interactive Charts** — visualize price trends with Chart.js (filterable by product, supplier, and date range)
- 📅 **Daily Analysis** — drill-down view to compare supplier prices for a specific product on a given day
- 🔐 **Role-based Authentication** — Admin and User roles with secure login
- 🛠️ **Admin Dashboard** — manage products, suppliers, and view all entries with pagination
- 🐘 **PostgreSQL Database** — all data persisted in a Postgres database (tables auto-created on first run)

---

## 🏗️ Tech Stack

| Layer         | Technology                     |
|---------------|-------------------------------|
| Desktop App   | Electron (with Electron Forge)|
| Backend Logic | Node.js                       |
| Database      | PostgreSQL (via `pg` module)  |
| Frontend      | HTML, CSS, JavaScript         |
| Charts        | Chart.js                      |
| Build/Package | Electron Forge                |

---

## 📁 Project Structure

```
appliaction/
├── main.js                  # Electron main process (window + IPC handlers)
├── preload.js               # Secure bridge between main & renderer (contextBridge)
├── package.json             # Dependencies and scripts
├── forge.config.js          # Electron Forge build configuration
├── .env                     # PostgreSQL credentials (DO NOT commit)
├── .gitignore               # Ignores node_modules, .env
│
├── src/
│   └── database.js          # PostgreSQL database layer (connection, schema, CRUD, seeding)
│
├── pages/
│   ├── login.html           # User login page
│   ├── index.html           # Main dashboard (price entry + today's prices)
│   ├── charts.html          # Interactive price trend charts
│   ├── daily_analysis.html  # Daily supplier-wise price comparison
│   └── admin/
│       ├── dashboard.html   # Admin dashboard (entries by date, pagination)
│       ├── products.html    # Admin: manage products (add/edit/delete)
│       └── suppliers.html   # Admin: manage suppliers (add/edit/delete)
│
├── assets/                  # Icons and static assets
├── sql/                     # Legacy SQL dump files (historical data)
├── insertion/               # Legacy SQL insert scripts
├── data/                    # (Legacy) SQLite database storage
├── dist/                    # Electron Builder output
└── out/                     # Electron Forge output
```

---

## ⚙️ Prerequisites

- **Node.js** v16+ and **npm**
- **PostgreSQL** v12+ (running locally or remotely)
- A database created in PostgreSQL (e.g., `price_tracking`)

---

## 🔧 Setup & Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd appliaction
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file in the project root:

```env
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=price_tracking
DB_PASSWORD=your_password
DB_PORT=5432
```

### 4. Create the Database

Using `psql` or pgAdmin:

```sql
CREATE DATABASE price_tracking;
```

> **Note:** The application will automatically create all tables (`products`, `suppliers`, `prices`, `users`) and seed them with initial data on first run.

### 5. Run the Application

```bash
npm start
```

---

## 🔑 Default Login Credentials

| Username | Password  | Role  |
|----------|-----------|-------|
| admin    | admin123  | Admin |
| user     | user123   | User  |

> ⚠️ **Change these in production!**

---

## 📊 Database Schema

### `products`
| Column      | Type      | Description          |
|-------------|-----------|----------------------|
| id          | SERIAL PK | Auto-increment ID    |
| name        | TEXT      | Product name (unique) |
| created_at  | TIMESTAMP | Creation timestamp    |

### `suppliers`
| Column      | Type      | Description          |
|-------------|-----------|----------------------|
| id          | SERIAL PK | Auto-increment ID    |
| name        | TEXT      | Supplier name        |
| location    | TEXT      | Supplier location    |
| created_at  | TIMESTAMP | Creation timestamp    |

### `prices`
| Column      | Type      | Description              |
|-------------|-----------|--------------------------|
| id          | SERIAL PK | Auto-increment ID        |
| product_id  | INTEGER   | FK → products(id)        |
| supplier_id | INTEGER   | FK → suppliers(id)       |
| price       | REAL      | Price value              |
| entry_date  | DATE      | Date of the price entry  |
| created_at  | TIMESTAMP | Creation timestamp        |

### `users`
| Column      | Type      | Description          |
|-------------|-----------|----------------------|
| id          | SERIAL PK | Auto-increment ID    |
| username    | TEXT      | Username (unique)    |
| password    | TEXT      | SHA-256 hashed       |
| role        | TEXT      | `admin` or `user`    |
| created_at  | TIMESTAMP | Creation timestamp    |

---

## 🔒 Security Features

- SHA-256 password hashing
- Parameterized queries (prevents SQL injection)
- Context isolation in Electron (`contextBridge`)
- `.env` file for credentials (excluded from Git)
- Role-based access control (Admin vs User)

---

## 📦 Building for Production

```bash
# Package the app
npm run package

# Create distributable installer
npm run make
```

Output will be in the `out/` directory.

---

## 📄 License

MIT License
