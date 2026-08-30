import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { TrendingUp, LogOut, Settings, BarChart2, Calendar, Building2, Copy, Check, Shield, User } from 'lucide-react';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ isAuthenticated, setIsAuthenticated, isAdmin }) => {
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    const companyName = localStorage.getItem('companyName') || '';
    const companyCode = localStorage.getItem('companyCode') || '';
    const username = localStorage.getItem('username') || '';
    const userRole = localStorage.getItem('userRole') || '';

    const handleCopyCode = () => {
        if (companyCode) {
            navigator.clipboard.writeText(companyCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('username');
        localStorage.removeItem('companyName');
        localStorage.removeItem('companyCode');
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
                    <div>
                        <span style={{ fontWeight: '700' }}>PriceTracker<span style={{ color: '#3b82f6' }}>.</span></span>
                        {companyName && (
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: '1', fontWeight: '500' }}>
                                {companyName}
                            </div>
                        )}
                    </div>
                </Link>

                {isAuthenticated && (
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', maxWidth: '350px' }}>
                        <SearchBar />
                    </div>
                )}

                <div className="navbar-menu" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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

                            {/* Company Code Pill */}
                            {companyCode && (
                                <div 
                                    onClick={handleCopyCode}
                                    title="Click to copy Company Code for inviting colleagues"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                        border: '1px solid rgba(59, 130, 246, 0.25)',
                                        borderRadius: '20px',
                                        padding: '4px 10px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        color: 'var(--primary)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <Building2 size={12} />
                                    <span>Code: {companyCode}</span>
                                    {copied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                                </div>
                            )}

                            {/* User & Role Badge */}
                            {username && (
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    fontSize: '0.78rem',
                                    color: 'var(--text-main)',
                                    fontWeight: '500'
                                }}>
                                    {userRole === 'admin' ? (
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                                            <Shield size={10} /> ADMIN
                                        </span>
                                    ) : (
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                                            <User size={10} /> USER
                                        </span>
                                    )}
                                    <span>{username}</span>
                                </div>
                            )}

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderLeft: '1px solid var(--border)', paddingLeft: '12px', marginLeft: '4px' }}>
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
