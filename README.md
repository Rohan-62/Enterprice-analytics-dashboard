# Price Tracking System — Analytical Dashboard

A production-ready web application for tracking commodity prices from multiple suppliers with graphical analytics. The application provides a robust backend API built with Express.js and PostgreSQL, with a responsive frontend built on HTML, CSS, and Chart.js.

## Key Features

- **Price Entry:** Add daily commodity prices from various suppliers.
- **Analytics Dashboard:** Graphical charts to analyze price trends over time using Chart.js.
- **Daily Analysis:** In-depth daily breakdown by product and supplier.
- **Admin Panel:** Complete CRUD management for Products, Suppliers, and Historical Price Entries.
- **Role-Based Access Control (RBAC):** Separate user and admin roles.
- **PostgreSQL Database:** Robust relational database for reliable data storage.
- **RESTful API:** Clean API layer for frontend-backend communication.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Charts:** Chart.js

## Project Structure

```
├── assets/                 # Frontend static assets
│   ├── css/                # Stylesheets
│   └── js/                 # API client and main scripts
├── pages/                  # Frontend HTML pages
│   └── admin/              # Admin-specific pages
├── src/                    # Backend source code
│   └── database.js         # PostgreSQL connection and queries
├── server.js               # Main Express.js application entry point
├── package.json            # Node.js dependencies
└── .env                    # Environment variables (DB credentials)
```

## Setup Instructions

### 1. Prerequisites

- **Node.js** (v14 or higher)
- **PostgreSQL** (v12 or higher)

### 2. Installation

Clone the repository and install the Node.js dependencies:

```bash
git clone <repository_url>
cd price-tracking-system
npm install
```

### 3. Database Configuration

Create a `.env` file in the root directory and configure your PostgreSQL database connection:

```env
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=price_tracking
DB_PASSWORD=your_password
DB_PORT=5432
```

Ensure the PostgreSQL server is running and the database specified in `.env` exists. The application will automatically create the necessary tables and seed default data on the first run.

### 4. Running the Application

Start the Express server:

```bash
npm start
```

The server will start running at `http://localhost:3000`. 
Open `http://localhost:3000` in your web browser to access the application login page.

### 5. Default Credentials

- **Admin User:**
  - Username: `admin`
  - Password: `admin123`
- **Standard User:**
  - Username: `user`
  - Password: `user123`

## License

MIT License
