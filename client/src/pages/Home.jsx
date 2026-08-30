import { useState, useEffect } from 'react';
import { Package, Truck, Database, AlertTriangle, TrendingUp, TrendingDown, ArrowRight, Minus } from 'lucide-react';
import { api } from '../api';

function Home() {
    const [stats, setStats] = useState({ products: 0, suppliers: 0, prices: 0 });
    const [advancedStats, setAdvancedStats] = useState(null);
    const [triggeredAlerts, setTriggeredAlerts] = useState([]);
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [todayPrices, setTodayPrices] = useState([]);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        product_id: '',
        supplier_id: '',
        price: '',
        entry_date: new Date().toISOString().split('T')[0]
    });

    const [editing, setEditing] = useState(null);
    const [editFormData, setEditFormData] = useState({ id: '', product_id: '', supplier_id: '', price: '' });

    const loadData = async () => {
        try {
            const [statsRes, advStatsRes, alertsRes, productsRes, suppliersRes, pricesRes] = await Promise.all([
                api.getStats(),
                api.getAdvancedStats(),
                api.getTriggeredAlerts(),
                api.getProducts(),
                api.getSuppliers(),
                api.getTodayPrices()
            ]);
            
            setStats(statsRes);
            setAdvancedStats(advStatsRes);
            setTriggeredAlerts(alertsRes);
            setProducts(productsRes);
            setSuppliers(suppliersRes);
            setTodayPrices(pricesRes);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleInsert = async (e) => {
        e.preventDefault();
        try {
            const result = await api.insertPrice({
                ...formData,
                product_id: parseInt(formData.product_id),
                supplier_id: parseInt(formData.supplier_id),
                price: parseFloat(formData.price)
            });
            if (result.success) {
                setFormData(prev => ({ ...prev, product_id: '', supplier_id: '', price: '' }));
                loadData();
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error saving price entry:', error);
            alert('Error saving price entry' + (error.message ? `: ${error.message}` : ''));
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this entry?')) return;
        try {
            const result = await api.deletePrice(id);
            if (result.success) {
                loadData();
            }
        } catch (error) {
            console.error('Error deleting price entry:', error);
            alert('Error deleting price entry');
        }
    };

    const startEdit = (entry) => {
        setEditFormData({
            id: entry.id,
            product_id: entry.product_id,
            supplier_id: entry.supplier_id,
            price: entry.price
        });
        setEditing(true);
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const result = await api.updatePrice({
                id: editFormData.id,
                product_id: parseInt(editFormData.product_id),
                supplier_id: parseInt(editFormData.supplier_id),
                price: parseFloat(editFormData.price)
            });
            if (result.success) {
                setEditing(null);
                loadData();
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error updating price entry:', error);
            alert('Error updating price entry' + (error.message ? `: ${error.message}` : ''));
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };

    return (
        <div className="container">
            <div className="page-header">
                <h1 className="page-title">Price Entry System</h1>
                <p className="page-subtitle">Track product prices from various suppliers</p>
            </div>

            {triggeredAlerts.length > 0 && (
                <div className="alert-banner">
                    <div className="alert-banner-title">
                        <AlertTriangle size={20} />
                        Price Threshold Alerts Triggered ({triggeredAlerts.length})
                    </div>
                    {triggeredAlerts.slice(0, 3).map(alert => (
                        <div key={alert.alert_id} className="alert-banner-item">
                            <div>
                                <strong>{alert.product_name}</strong> from {alert.supplier_name}
                                <span style={{ margin: '0 8px', color: 'var(--text-muted)' }}>|</span>
                                {alert.entry_date}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ textDecoration: 'line-through', opacity: 0.7 }}>
                                    ₹{alert.alert_type === 'ABOVE_MAX' ? alert.threshold_max : alert.threshold_min}
                                </span>
                                <ArrowRight size={14} />
                                <strong style={{ fontSize: '1.1rem' }}>₹{alert.price}</strong>
                            </div>
                        </div>
                    ))}
                    {triggeredAlerts.length > 3 && (
                        <div style={{ marginTop: '8px', fontSize: '0.85rem', textAlign: 'center', color: 'var(--danger)' }}>
                            + {triggeredAlerts.length - 3} more alerts active
                        </div>
                    )}
                </div>
            )}

            {advancedStats && (
                <div className="insights-grid">
                    <div className="insight-card">
                        <div className="insight-label">Market Avg (7 Days)</div>
                        <div className="insight-value">₹{advancedStats.avg_price_this_week.toFixed(2)}</div>
                        <div className={`insight-trend ${advancedStats.week_over_week_change > 0 ? 'trend-up' : advancedStats.week_over_week_change < 0 ? 'trend-down' : 'trend-neutral'}`} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {advancedStats.week_over_week_change > 0 ? <TrendingUp size={14} /> : advancedStats.week_over_week_change < 0 ? <TrendingDown size={14} /> : <Minus size={14} />}
                            {Math.abs(advancedStats.week_over_week_change)}% vs last week
                        </div>
                    </div>
                    
                    <div className="insight-card">
                        <div className="insight-label">Most Volatile Product</div>
                        <div className="insight-value" style={{ fontSize: '1.2rem' }}>
                            {advancedStats.volatility[0]?.product_name || 'N/A'}
                        </div>
                        <div className="insight-trend trend-neutral">
                            Standard Deviation: ₹{advancedStats.volatility[0]?.volatility || 0}
                        </div>
                    </div>

                    <div className="insight-card">
                        <div className="insight-label">Cheapest Supplier</div>
                        <div className="insight-value" style={{ fontSize: '1.2rem' }}>
                            {advancedStats.cheapest_suppliers[0]?.supplier_name || 'N/A'}
                        </div>
                        <div className="insight-trend trend-down">
                            Avg Price: ₹{advancedStats.cheapest_suppliers[0]?.avg_price || 0}
                        </div>
                    </div>

                    <div className="insight-card">
                        <div className="insight-label">Entries This Week</div>
                        <div className="insight-value">{advancedStats.entries_this_week}</div>
                        <div className="insight-trend trend-neutral">
                            Total System DB: {stats.prices}
                        </div>
                    </div>
                </div>
            )}

            <div className="card mt-4 price-form">
                <div className="card-header text-center">
                    <div style={{ width: '100%' }}>
                        <h2 className="card-title">Add New Price Entry</h2>
                        <p className="card-subtitle" style={{ color: 'var(--text-secondary)' }}>Enter details to track latest market prices</p>
                    </div>
                </div>

                <form onSubmit={handleInsert}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="product_id">Product</label>
                            <select 
                                className="form-control" 
                                value={formData.product_id}
                                onChange={e => setFormData({...formData, product_id: e.target.value})}
                                required
                            >
                                <option value="">Select Product...</option>
                                {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="supplier_id">Supplier</label>
                            <select 
                                className="form-control" 
                                value={formData.supplier_id}
                                onChange={e => setFormData({...formData, supplier_id: e.target.value})}
                                required
                            >
                                <option value="">Select Supplier...</option>
                                {suppliers.map(s => <option key={s.id} value={s.id}>{s.name} ({s.location})</option>)}
                            </select>
                        </div>

                        <div className="form-group form-full">
                            <label htmlFor="price">Price (Rs.)</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                step="0.01" min="0" 
                                placeholder="0.00" 
                                value={formData.price}
                                onChange={e => setFormData({...formData, price: e.target.value})}
                                required 
                            />
                        </div>

                        <div className="form-group form-full">
                            <label htmlFor="entry_date">Entry Date</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                max={new Date().toISOString().split('T')[0]}
                                value={formData.entry_date}
                                onChange={e => setFormData({...formData, entry_date: e.target.value})}
                                required 
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <button type="submit" className="btn btn-primary btn-lg btn-block">
                            Insert Price Entry
                        </button>
                    </div>
                </form>
            </div>

            <div className="card mt-4">
                <div className="card-header flex flex-between flex-center">
                    <div>
                        <h3 className="card-title">Today's Price Entries</h3>
                        <p className="card-subtitle" style={{ color: 'var(--text-secondary)' }}>Recent price entries - click Edit to modify or Delete to remove</p>
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
                            ) : todayPrices.length === 0 ? (
                                <tr><td colSpan="6" className="text-center" style={{ color: 'var(--text-muted)', padding: '40px 0' }}>No price entries yet. Add your first entry above.</td></tr>
                            ) : (
                                todayPrices.map(entry => (
                                    <tr key={entry.id}>
                                        <td>{entry.id}</td>
                                        <td>{formatDate(entry.entry_date)}</td>
                                        <td>{entry.product_name}</td>
                                        <td>{entry.supplier_name} <span style={{ color: 'var(--text-muted)' }}>({entry.supplier_location})</span></td>
                                        <td>Rs. {parseFloat(entry.price).toFixed(2)}</td>
                                        <td>
                                            <button className="btn btn-secondary btn-sm" style={{ marginRight: '8px' }} onClick={() => startEdit(entry)}>Edit</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(entry.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            <div className={`modal-overlay ${editing ? 'active' : ''}`} onClick={(e) => { if (e.target.classList.contains('modal-overlay')) setEditing(false) }}>
                <div className="modal">
                    <div className="modal-header flex flex-between flex-center">
                        <h3 style={{ color: 'var(--primary-dark)' }}>Edit Price Entry</h3>
                        <button className="modal-close" onClick={() => setEditing(false)}>&times;</button>
                    </div>
                    <form onSubmit={handleEdit}>
                        <div className="form-group mb-4">
                            <label className="form-label">Product</label>
                            <select 
                                className="form-control" 
                                value={editFormData.product_id}
                                onChange={e => setEditFormData({...editFormData, product_id: e.target.value})}
                                required
                            >
                                <option value="">Select Product...</option>
                                {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                            </select>
                        </div>

                        <div className="form-group mb-4">
                            <label className="form-label">Supplier</label>
                            <select 
                                className="form-control" 
                                value={editFormData.supplier_id}
                                onChange={e => setEditFormData({...editFormData, supplier_id: e.target.value})}
                                required
                            >
                                <option value="">Select Supplier...</option>
                                {suppliers.map(s => <option key={s.id} value={s.id}>{s.name} ({s.location})</option>)}
                            </select>
                        </div>

                        <div className="form-group mb-4">
                            <label className="form-label">Price (Rs.)</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                step="0.01" min="0" 
                                value={editFormData.price}
                                onChange={e => setEditFormData({...editFormData, price: e.target.value})}
                                required 
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Home;
