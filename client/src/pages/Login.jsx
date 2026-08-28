import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const result = await api.login(username, password);

            if (result.success) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('userRole', result.user.role);
                window.dispatchEvent(new Event('auth-change'));
                navigate('/');
            } else {
                setError('Invalid username or password');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-body)' }}>
            <div className="login-wrapper" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
                    <div className="text-center" style={{ marginBottom: '2rem' }}>
                        <h1 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Analytical Dashboard</h1>
                        <p className="page-subtitle">Please enter your credentials to login</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="username" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="form-group" style={{ marginTop: '16px' }}>
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>

                        {error && (
                            <div className="text-center" style={{ color: 'var(--danger)', margin: '16px 0' }}>
                                {error}
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ marginTop: '24px' }}>
                            Login
                        </button>
                    </form>
                </div>
            </div>
            <footer className="footer text-center" style={{ padding: '1rem' }}>
                <div className="container">
                    <p>&copy; 2026 Analytical Dashboard. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Login;
