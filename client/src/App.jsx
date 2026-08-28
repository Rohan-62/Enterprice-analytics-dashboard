import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import DailyAnalysis from './pages/DailyAnalysis';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import Alerts from './pages/admin/Alerts';
import AuditLog from './pages/admin/AuditLog';
import PredictiveAnalysis from './pages/PredictiveAnalysis';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token') !== null;
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
    const isAdmin = localStorage.getItem('userRole') === 'admin';
    return isAdmin ? children : <Navigate to="/" />;
};

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('userRole');
        setIsAuthenticated(!!token);
        setIsAdmin(role === 'admin');
    }, []);

    // Also update states when storage changes (e.g., from login component)
    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(!!localStorage.getItem('token'));
            setIsAdmin(localStorage.getItem('userRole') === 'admin');
        };
        window.addEventListener('storage', handleStorageChange);
        // Custom event for same-tab updates
        window.addEventListener('auth-change', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('auth-change', handleStorageChange);
        };
    }, []);

    return (
        <Router>
            <div className="app">
                <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} isAdmin={isAdmin} />
                <main className="main-content">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                        <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
                        <Route path="/daily-analysis" element={<PrivateRoute><DailyAnalysis /></PrivateRoute>} />
                        <Route path="/predictive-analysis" element={<PrivateRoute><PredictiveAnalysis /></PrivateRoute>} />
                        
                        {/* Admin Routes */}
                        <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
                        <Route path="/admin/alerts" element={<AdminRoute><Alerts /></AdminRoute>} />
                        <Route path="/admin/audit-log" element={<AdminRoute><AuditLog /></AdminRoute>} />
                    </Routes>
                </main>
                <footer className="footer">
                    <div className="container">
                        <p>&copy; {new Date().getFullYear()} PriceTracker Pro. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;
