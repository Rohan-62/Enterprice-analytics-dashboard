import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import DailyAnalysis from './pages/DailyAnalysis';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminSuppliers from './pages/admin/Suppliers';

function ProtectedRoute({ children, adminOnly = false }) {
    const isLoggedIn = sessionStorage.getItem('user_logged_in');
    const userData = JSON.parse(sessionStorage.getItem('user_data') || '{}');

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    if (adminOnly && userData.role !== 'admin') {
        return <Navigate to="/" />;
    }

    return children;
}

function App() {
    return (
        <Router>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    
                    <Route path="/*" element={
                        <>
                            <Navbar />
                            <main className="main-content" style={{ flex: 1 }}>
                                <Routes>
                                    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                                    <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                                    <Route path="/daily-analysis" element={<ProtectedRoute><DailyAnalysis /></ProtectedRoute>} />
                                    <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
                                    <Route path="/admin/products" element={<ProtectedRoute adminOnly><AdminProducts /></ProtectedRoute>} />
                                    <Route path="/admin/suppliers" element={<ProtectedRoute adminOnly><AdminSuppliers /></ProtectedRoute>} />
                                </Routes>
                            </main>
                            <Footer />
                        </>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
