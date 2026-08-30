import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { Building2, UserPlus, LogIn, Shield, Users, Copy, CheckCircle, Sparkles } from 'lucide-react';

function Login() {
    const [tab, setTab] = useState('login'); // 'login' | 'join' | 'register_company'
    
    // Login fields
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginCompanyCode, setLoginCompanyCode] = useState('');

    // Join Company fields
    const [joinUsername, setJoinUsername] = useState('');
    const [joinPassword, setJoinPassword] = useState('');
    const [joinRole, setJoinRole] = useState('user'); // 'admin' | 'user'
    const [joinCompanyCode, setJoinCompanyCode] = useState('');

    // Register Company fields
    const [companyName, setCompanyName] = useState('');
    const [adminUsername, setAdminUsername] = useState('');
    const [adminPassword, setAdminPassword] = useState('');

    // UI feedback
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [createdCompanyCode, setCreatedCompanyCode] = useState('');
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        }
    }, [navigate]);

    const handleCopyCode = () => {
        if (createdCompanyCode) {
            navigator.clipboard.writeText(createdCompanyCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    const handleAuthSuccess = (result) => {
        localStorage.setItem('token', result.token);
        localStorage.setItem('userRole', result.user.role);
        localStorage.setItem('username', result.user.username);
        if (result.user.company_name) localStorage.setItem('companyName', result.user.company_name);
        if (result.user.company_code) localStorage.setItem('companyCode', result.user.company_code);
        
        window.dispatchEvent(new Event('auth-change'));
        navigate('/');
    };

    // 1. Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);

        try {
            const result = await api.login(loginUsername, loginPassword, loginCompanyCode);

            if (result.success) {
                handleAuthSuccess(result);
            } else {
                setError(result.message || 'Invalid username, password, or company code');
            }
        } catch (err) {
            setError('Login failed. Please verify your connection.');
        } finally {
            setLoading(false);
        }
    };

    // 2. Handle Join Existing Company
    const handleJoinCompany = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);

        try {
            const result = await api.registerUser(joinUsername, joinPassword, joinRole, joinCompanyCode);

            if (result.success) {
                handleAuthSuccess(result);
            } else {
                setError(result.message || 'Failed to join company.');
            }
        } catch (err) {
            setError('Registration failed. Please check company code.');
        } finally {
            setLoading(false);
        }
    };

    // 3. Handle Register New Company
    const handleRegisterCompany = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);

        try {
            const result = await api.registerCompany(companyName, adminUsername, adminPassword);

            if (result.success) {
                setCreatedCompanyCode(result.company.company_code);
                setSuccessMessage(`Company "${result.company.name}" registered successfully!`);
                // Briefly show company code before logging in
                setTimeout(() => {
                    handleAuthSuccess(result);
                }, 3000);
            } else {
                setError(result.message || 'Failed to register company.');
            }
        } catch (err) {
            setError('Company registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-body)' }}>
            <div className="login-wrapper" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
                <div className="card" style={{ width: '100%', maxWidth: '480px', padding: '2.2rem', boxShadow: 'var(--shadow-lg)' }}>
                    
                    {/* Header */}
                    <div className="text-center" style={{ marginBottom: '1.5rem' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            marginBottom: '12px',
                            boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)'
                        }}>
                            <Building2 size={26} />
                        </div>
                        <h2 style={{ color: 'var(--primary)', fontWeight: '700', marginBottom: '4px' }}>Enterprise Analytics</h2>
                        <p className="page-subtitle" style={{ fontSize: '0.9rem' }}>
                            Multi-Tenant Commodity Intelligence Platform
                        </p>
                    </div>

                    {/* Navigation Tabs */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gap: '6px',
                        background: 'var(--bg-surface-subtle, rgba(0,0,0,0.04))',
                        padding: '4px',
                        borderRadius: '10px',
                        marginBottom: '20px',
                        border: '1px solid var(--border)'
                    }}>
                        <button
                            type="button"
                            onClick={() => { setTab('login'); setError(''); setSuccessMessage(''); }}
                            style={{
                                padding: '8px 4px',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '0.82rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '4px',
                                background: tab === 'login' ? 'var(--primary)' : 'transparent',
                                color: tab === 'login' ? '#ffffff' : 'var(--text-muted)',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <LogIn size={14} /> Sign In
                        </button>
                        <button
                            type="button"
                            onClick={() => { setTab('join'); setError(''); setSuccessMessage(''); }}
                            style={{
                                padding: '8px 4px',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '0.82rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '4px',
                                background: tab === 'join' ? 'var(--primary)' : 'transparent',
                                color: tab === 'join' ? '#ffffff' : 'var(--text-muted)',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <UserPlus size={14} /> Join Co.
                        </button>
                        <button
                            type="button"
                            onClick={() => { setTab('register_company'); setError(''); setSuccessMessage(''); }}
                            style={{
                                padding: '8px 4px',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '0.82rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '4px',
                                background: tab === 'register_company' ? 'var(--primary)' : 'transparent',
                                color: tab === 'register_company' ? '#ffffff' : 'var(--text-muted)',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Sparkles size={14} /> New Co.
                        </button>
                    </div>

                    {/* Messages */}
                    {error && (
                        <div style={{
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            color: 'var(--danger, #ef4444)',
                            padding: '10px 14px',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            marginBottom: '16px',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}

                    {successMessage && (
                        <div style={{
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            color: '#10b981',
                            padding: '12px 14px',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            marginBottom: '16px',
                            textAlign: 'center'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: '600', marginBottom: '6px' }}>
                                <CheckCircle size={16} /> {successMessage}
                            </div>
                            {createdCompanyCode && (
                                <div style={{ marginTop: '8px', padding: '8px', background: 'rgba(0,0,0,0.06)', borderRadius: '6px' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Share this code with your team:</div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '4px' }}>
                                        <span style={{ fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '1px', color: 'var(--primary)' }}>
                                            {createdCompanyCode}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={handleCopyCode}
                                            style={{
                                                background: 'none',
                                                border: '1px solid var(--border)',
                                                borderRadius: '4px',
                                                padding: '3px 8px',
                                                cursor: 'pointer',
                                                fontSize: '0.75rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}
                                        >
                                            <Copy size={12} /> {copied ? 'Copied!' : 'Copy'}
                                        </button>
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                                        Redirecting to your dashboard...
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* TAB 1: SIGN IN */}
                    {tab === 'login' && (
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="login-username">Username</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="login-username" 
                                    placeholder="Enter your username"
                                    value={loginUsername}
                                    onChange={(e) => setLoginUsername(e.target.value)}
                                    required 
                                />
                            </div>

                            <div className="form-group" style={{ marginTop: '14px' }}>
                                <label htmlFor="login-password">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="login-password" 
                                    placeholder="••••••••"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    required 
                                />
                            </div>

                            <div className="form-group" style={{ marginTop: '14px' }}>
                                <label htmlFor="login-code" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Company Code <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(Optional if unique)</span></span>
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="login-code" 
                                    placeholder="e.g. COMP-9X4A2B"
                                    value={loginCompanyCode}
                                    onChange={(e) => setLoginCompanyCode(e.target.value.toUpperCase())}
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-primary btn-block btn-lg" 
                                style={{ marginTop: '20px' }}
                                disabled={loading}
                            >
                                {loading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>
                    )}

                    {/* TAB 2: JOIN EXISTING COMPANY */}
                    {tab === 'join' && (
                        <form onSubmit={handleJoinCompany}>
                            <div className="form-group">
                                <label htmlFor="join-code">Company Code *</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="join-code" 
                                    placeholder="e.g. COMP-9X4A2B"
                                    value={joinCompanyCode}
                                    onChange={(e) => setJoinCompanyCode(e.target.value.toUpperCase())}
                                    required 
                                />
                                <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '2px', display: 'block' }}>
                                    Ask your company administrator for your organization's code.
                                </small>
                            </div>

                            <div className="form-group" style={{ marginTop: '14px' }}>
                                <label htmlFor="join-username">Your Username *</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="join-username" 
                                    placeholder="Choose a username"
                                    value={joinUsername}
                                    onChange={(e) => setJoinUsername(e.target.value)}
                                    required 
                                />
                            </div>

                            <div className="form-group" style={{ marginTop: '14px' }}>
                                <label htmlFor="join-password">Your Password *</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="join-password" 
                                    placeholder="Choose a secure password"
                                    value={joinPassword}
                                    onChange={(e) => setJoinPassword(e.target.value)}
                                    required 
                                />
                            </div>

                            <div className="form-group" style={{ marginTop: '14px' }}>
                                <label>Your Role in the Company *</label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '4px' }}>
                                    <button
                                        type="button"
                                        onClick={() => setJoinRole('user')}
                                        style={{
                                            padding: '10px',
                                            borderRadius: '8px',
                                            border: joinRole === 'user' ? '2px solid var(--primary)' : '1px solid var(--border)',
                                            background: joinRole === 'user' ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
                                            cursor: 'pointer',
                                            textAlign: 'left'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600', fontSize: '0.85rem' }}>
                                            <Users size={14} color="var(--primary)" /> Standard User
                                        </div>
                                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                                            View charts & predictive forecasts
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setJoinRole('admin')}
                                        style={{
                                            padding: '10px',
                                            borderRadius: '8px',
                                            border: joinRole === 'admin' ? '2px solid var(--primary)' : '1px solid var(--border)',
                                            background: joinRole === 'admin' ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
                                            cursor: 'pointer',
                                            textAlign: 'left'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600', fontSize: '0.85rem' }}>
                                            <Shield size={14} color="var(--primary)" /> Administrator
                                        </div>
                                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                                            Manage products, entries, & rules
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-primary btn-block btn-lg" 
                                style={{ marginTop: '20px' }}
                                disabled={loading}
                            >
                                {loading ? 'Creating Account...' : 'Join Company'}
                            </button>
                        </form>
                    )}

                    {/* TAB 3: REGISTER NEW COMPANY */}
                    {tab === 'register_company' && (
                        <form onSubmit={handleRegisterCompany}>
                            <div className="form-group">
                                <label htmlFor="reg-company-name">Company / Organization Name *</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="reg-company-name" 
                                    placeholder="e.g. Acme Commodities Ltd."
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    required 
                                />
                            </div>

                            <div className="form-group" style={{ marginTop: '14px' }}>
                                <label htmlFor="reg-admin-username">Admin Username *</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="reg-admin-username" 
                                    placeholder="e.g. admin"
                                    value={adminUsername}
                                    onChange={(e) => setAdminUsername(e.target.value)}
                                    required 
                                />
                            </div>

                            <div className="form-group" style={{ marginTop: '14px' }}>
                                <label htmlFor="reg-admin-password">Admin Password *</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="reg-admin-password" 
                                    placeholder="Choose an admin password"
                                    value={adminPassword}
                                    onChange={(e) => setAdminPassword(e.target.value)}
                                    required 
                                />
                            </div>

                            <div style={{
                                marginTop: '14px',
                                padding: '10px 12px',
                                background: 'rgba(59, 130, 246, 0.08)',
                                borderRadius: '8px',
                                border: '1px dashed var(--primary)',
                                fontSize: '0.78rem',
                                color: 'var(--text-muted)'
                            }}>
                                💡 <strong>Automatic Code Generation:</strong> A unique Company Code will be generated for your organization so other team members can join your workspace.
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-primary btn-block btn-lg" 
                                style={{ marginTop: '20px' }}
                                disabled={loading}
                            >
                                {loading ? 'Registering...' : 'Register Company & Launch'}
                            </button>
                        </form>
                    )}

                </div>
            </div>
            
            <footer className="footer text-center" style={{ padding: '1rem' }}>
                <div className="container">
                    <p>&copy; 2026 Analytical Dashboard. Multi-Tenant Enterprise Edition.</p>
                </div>
            </footer>
        </div>
    );
}

export default Login;
