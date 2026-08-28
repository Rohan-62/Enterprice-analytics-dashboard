import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { api } from '../../api';

function Dashboard() {
    const [entries, setEntries] = useState([]);
    const [stats, setStats] = useState({ products: 0, suppliers: 0, prices: 0 });
    const [loading, setLoading] = useState(true);
    const [dateFilter, setDateFilter] = useState('');

    const loadData = async () => {
        setLoading(true);
        try {
            const [statsRes, entriesRes] = await Promise.all([
                api.getStats(),
                api.getEntriesByDate(dateFilter, 1, 100)
            ]);
            setStats(statsRes);
            setEntries(entriesRes.data || []);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [dateFilter]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this historical entry? This action cannot be undone.')) return;
        try {
            const result = await api.deletePrice(id);
            if (result.success) {
                loadData();
            }
        } catch (error) {
            alert('Error deleting entry');
        }
    };

    return (
        <div className="container">
            <div className="page-header">
                <h1 className="page-title">Admin Dashboard</h1>
                <p className="page-subtitle">Manage all system data, products, and suppliers</p>
            </div>

            <div className="grid grid-3 mb-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                <NavLink to="/admin/products" className="card text-center" style={{ textDecoration: 'none', display: 'block' }}>
                    <h3 className="card-title">Manage Products</h3>
                    <div className="stat-value mt-4">{stats.products}</div>
                </NavLink>
                <NavLink to="/admin/suppliers" className="card text-center" style={{ textDecoration: 'none', display: 'block' }}>
                    <h3 className="card-title">Manage Suppliers</h3>
                    <div className="stat-value mt-4">{stats.suppliers}</div>
                </NavLink>
                <div className="card text-center">
                    <h3 className="card-title">Total Price Entries</h3>
                    <div className="stat-value mt-4">{stats.prices.toLocaleString()}</div>
                </div>
                <NavLink to="/admin/alerts" className="card text-center" style={{ textDecoration: 'none', display: 'block', border: '1px solid var(--warning)' }}>
                    <h3 className="card-title" style={{ color: 'var(--warning)' }}>Manage Alerts</h3>
                    <div className="card-subtitle mt-2">Price Threshold Rules</div>
                </NavLink>
                <NavLink to="/admin/audit-log" className="card text-center" style={{ textDecoration: 'none', display: 'block', border: '1px solid var(--accent)' }}>
                    <h3 className="card-title" style={{ color: 'var(--accent)' }}>Audit Log</h3>
                    <div className="card-subtitle mt-2">View System Activity</div>
                </NavLink>
            </div>

            <div className="card">
                <div className="card-header flex flex-between flex-center">
                    <div>
                        <h3 className="card-title">Historical Price Entries</h3>
                        <p className="card-subtitle">View and manage all historical data</p>
                    </div>
                    <div className="flex gap-2">
                        <input 
                            type="date" 
                            className="form-control" 
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                        />
                        <button className="btn btn-secondary" onClick={() => setDateFilter('')}>Clear Filter</button>
                    </div>
                </div>

                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Product</th>
                                <th>Supplier</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" className="text-center">Loading...</td></tr>
                            ) : entries.length === 0 ? (
                                <tr><td colSpan="6" className="text-center">No entries found</td></tr>
                            ) : (
                                entries.map(entry => (
                                    <tr key={entry.id}>
                                        <td>{entry.id}</td>
                                        <td>{new Date(entry.entry_date).toLocaleDateString('en-IN')}</td>
                                        <td>{entry.product_name}</td>
                                        <td>{entry.supplier_name}</td>
                                        <td>Rs. {parseFloat(entry.price).toFixed(2)}</td>
                                        <td>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(entry.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
