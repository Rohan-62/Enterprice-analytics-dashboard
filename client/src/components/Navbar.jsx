import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, LogOut, Settings } from 'lucide-react';
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
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link to="/" className="navbar-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 'max-content' }}>
                    <BarChart3 size={24} color="var(--primary)" />
                    PriceTracker Pro
                </Link>

                {isAuthenticated && (
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', margin: '0 24px' }}>
                        <SearchBar />
                    </div>
                )}

                <div className="navbar-menu" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {isAuthenticated ? (
                        <>
                            <Link to="/daily-analysis" className="navbar-link">Daily Analysis</Link>
                            <Link to="/analytics" className="navbar-link">Analytics</Link>
                            <Link to="/predictive-analysis" className="navbar-link">Predictions</Link>
                            {isAdmin && (
                                <Link to="/admin" className="navbar-link" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Settings size={16} /> Admin
                                </Link>
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid var(--border)', paddingLeft: '16px', marginLeft: '8px' }}>
                                <ThemeToggle />
                                <button onClick={handleLogout} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px' }}>
                                    <LogOut size={16} /> Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <Link to="/login" className="btn btn-primary">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
