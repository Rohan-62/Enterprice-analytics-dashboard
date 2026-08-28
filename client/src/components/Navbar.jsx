import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { TrendingUp, LogOut, Settings, BarChart2, Calendar } from 'lucide-react';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ isAuthenticated, setIsAuthenticated, isAdmin }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                <Link to="/" className="navbar-brand">
                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.35)'
                    }}>
                        <TrendingUp size={20} color="white" />
                    </div>
                    <span>PriceTracker<span style={{ color: '#3b82f6' }}>.</span></span>
                </Link>

                {isAuthenticated && (
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', maxWidth: '400px' }}>
                        <SearchBar />
                    </div>
                )}

                <div className="navbar-menu">
                    {isAuthenticated ? (
                        <>
                            <NavLink to="/daily-analysis" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
                                <Calendar size={15} /> Daily Analysis
                            </NavLink>
                            <NavLink to="/analytics" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
                                <BarChart2 size={15} /> Analytics
                            </NavLink>
                            <NavLink to="/predictive-analysis" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
                                <TrendingUp size={15} /> Predictions
                            </NavLink>
                            {isAdmin && (
                                <NavLink to="/admin" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
                                    <Settings size={15} /> Admin
                                </NavLink>
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderLeft: '1px solid var(--border)', paddingLeft: '14px', marginLeft: '6px' }}>
                                <ThemeToggle />
                                <button onClick={handleLogout} className="btn btn-secondary btn-sm" title="Log Out">
                                    <LogOut size={15} /> Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
