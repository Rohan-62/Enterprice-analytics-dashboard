import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { api } from '../../api';
import { Users, UserCheck, ShieldAlert, History, Package, Truck, Database } from 'lucide-react';

function Dashboard() {
    const [entries, setEntries] = useState([]);
    const [stats, setStats] = useState({ products: 0, suppliers: 0, prices: 0, pending_users: 0, total_users: 0 });
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
                <p className="page-subtitle">Manage company data, user approvals, price rules, and system audits</p>
            </div>

            {/* Admin Action Cards */}
            <div className="grid grid-3 mb-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '16px' }}>
                {/* 1. User Approvals Card */}
                <NavLink 
                    to="/admin/users" 
                    className="card text-center" 
                    style={{ 
                        textDecoration: 'none', 
                        display: 'block', 
                        border: stats.pending_users > 0 ? '2px solid var(--warning)' : '1px solid var(--primary)',
                        background: stats.pending_users > 0 ? 'rgba(245, 158, 11, 0.05)' : 'var(--bg-card)',
                        position: 'relative'
                    }}
                >
                    {stats.pending_users > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            backgroundColor: 'var(--warning)',
                            color: '#000',
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                            padding: '2px 8px',
                            borderRadius: '12px'
                        }}>
                            {stats.pending_users} PENDING
                        </span>
                    )}
                    <h3 className="card-title" style={{ color: stats.pending_users > 0 ? 'var(--warning)' : 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        <UserCheck size={18} /> User Approvals
                    </h3>
                    <div className="stat-value mt-2">{stats.pending_users || 0}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {stats.pending_users > 0 ? 'Review join requests' : 'Manage authorized members'}
                    </div>
                </NavLink>

                {/* 2. Products */}
                <NavLink to="/admin/products" className="card text-center" style={{ textDecoration: 'none', display: 'block' }}>
                    <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        <Package size={18} color="var(--primary)" /> Manage Products
                    </h3>
                    <div className="stat-value mt-2">{stats.products}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Tracked commodities</div>
                </NavLink>

                {/* 3. Suppliers */}
                <NavLink to="/admin/suppliers" className="card text-center" style={{ textDecoration: 'none', display: 'block' }}>
                    <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        <Truck size={18} color="var(--primary)" /> Manage Suppliers
                    </h3>
                    <div className="stat-value mt-2">{stats.suppliers}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Registered vendor network</div>
                </NavLink>

                {/* 4. Price Threshold Alerts */}
                <NavLink to="/admin/alerts" className="card text-center" style={{ textDecoration: 'none', display: 'block', border: '1px solid var(--warning)' }}>
                    <h3 className="card-title" style={{ color: 'var(--warning)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        <ShieldAlert size={18} /> Manage Alerts
                    </h3>
                    <div style={{ fontSize: '0.85rem', fontWeight: '600', marginTop: '12px' }}>Threshold Rules</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Automate min/max flags</div>
                </NavLink>

                {/* 5. Audit Log */}
                <NavLink to="/admin/audit-log" className="card text-center" style={{ textDecoration: 'none', display: 'block', border: '1px solid var(--accent)' }}>
                    <h3 className="card-title" style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        <History size={18} /> Audit Trails
                    </h3>
                    <div style={{ fontSize: '0.85rem', fontWeight: '600', marginTop: '12px' }}>Activity Logs</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Track all mutations & diffs</div>
                </NavLink>
            </div>

            {/* Historical Entries Table */}
            <div className="card">
                <div className="card-header flex flex-between flex-center" style={{ flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                        <h3 className="card-title">Historical Price Entries</h3>
                        <p className="card-subtitle">View and manage all historical data for your organization</p>
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
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" className="text-center" style={{ padding: '24px' }}>Loading entries...</td></tr>
                            ) : entries.length === 0 ? (
                                <tr><td colSpan="6" className="text-center" style={{ padding: '24px', color: 'var(--text-muted)' }}>No historical price entries found.</td></tr>
                            ) : (
                                entries.map(entry => (
                                    <tr key={entry.id}>
                                        <td>{entry.id}</td>
                                        <td>{new Date(entry.entry_date).toLocaleDateString('en-IN')}</td>
                                        <td style={{ fontWeight: '500' }}>{entry.product_name}</td>
                                        <td>
                                            <div>{entry.supplier_name}</div>
                                            {entry.supplier_location && <small style={{ color: 'var(--text-muted)' }}>{entry.supplier_location}</small>}
                                        </td>
                                        <td style={{ fontWeight: '600', color: 'var(--primary)' }}>₹{parseFloat(entry.price).toFixed(2)}</td>
                                        <td style={{ textAlign: 'right' }}>
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
