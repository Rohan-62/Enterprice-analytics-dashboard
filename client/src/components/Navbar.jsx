import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const userData = JSON.parse(sessionStorage.getItem('user_data') || '{}');
    const isAdmin = userData.role === 'admin';

    const handleLogout = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <NavLink to="/" className="logo">
                    <span className="logo-text">Analytical Dashboard</span>
                </NavLink>
                <div className="nav-links">
                    <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} end>Home</NavLink>
                    <NavLink to="/analytics" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Analytics</NavLink>
                    <NavLink to="/daily-analysis" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Daily Analysis</NavLink>
                    {isAdmin && (
                        <NavLink to="/admin" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Admin Panel</NavLink>
                    )}
                    <a href="#" className="nav-link btn-nav" onClick={handleLogout}>Logout</a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
