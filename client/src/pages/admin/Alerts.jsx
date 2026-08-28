import React, { useState, useEffect } from 'react';
import { api } from '../../api';
import { Trash2, AlertTriangle, Plus } from 'lucide-react';

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const [productId, setProductId] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const [alertsData, productsData] = await Promise.all([
                api.getAlerts(),
                api.getProducts()
            ]);
            setAlerts(alertsData);
            setProducts(productsData);
            if (productsData.length > 0) {
                setProductId(productsData[0].id);
            }
        } catch (err) {
            console.error('Failed to load data:', err);
            setError('Failed to load alerts.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddAlert = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!minPrice && !maxPrice) {
            setError('Please specify at least a minimum or maximum price.');
            return;
        }

        try {
            await api.addAlert({
                product_id: parseInt(productId),
                min_price: minPrice ? parseFloat(minPrice) : null,
                max_price: maxPrice ? parseFloat(maxPrice) : null
            });
            setMinPrice('');
            setMaxPrice('');
            fetchData();
        } catch (err) {
            setError('Failed to add alert.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this alert?')) return;
        try {
            await api.deleteAlert(id);
            fetchData();
        } catch (err) {
            console.error('Failed to delete alert:', err);
        }
    };

    return (
        <div className="container">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertTriangle size={28} /> Price Threshold Alerts
                </h1>
            </div>

            <div className="card" style={{ marginBottom: '24px' }}>
                <h2 style={{ marginBottom: '16px' }}>Create New Alert</h2>
                {error && <div className="alert-banner" style={{ padding: '12px' }}>{error}</div>}
                <form onSubmit={handleAddAlert} className="form-grid">
                    <div className="form-group">
                        <label>Product</label>
                        <select className="form-control" value={productId} onChange={e => setProductId(e.target.value)} required>
                            {products.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Minimum Price (Optional)</label>
                        <input type="number" step="0.01" className="form-control" placeholder="e.g. 3000" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Maximum Price (Optional)</label>
                        <input type="number" step="0.01" className="form-control" placeholder="e.g. 4000" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
                    </div>
                    <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Plus size={16} /> Add Alert
                        </button>
                    </div>
                </form>
            </div>

            <div className="card">
                <h2 style={{ marginBottom: '16px' }}>Active Alerts</h2>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Min Price Threshold</th>
                                <th>Max Price Threshold</th>
                                <th>Created At</th>
                                <th style={{ width: '80px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan="5" className="text-center">Loading alerts...</td></tr>
                            ) : alerts.length === 0 ? (
                                <tr><td colSpan="5" className="text-center">No alerts configured.</td></tr>
                            ) : (
                                alerts.map(alert => (
                                    <tr key={alert.id}>
                                        <td style={{ fontWeight: 600 }}>{alert.product_name}</td>
                                        <td style={{ color: 'var(--danger)' }}>{alert.min_price !== null ? `₹${alert.min_price}` : '—'}</td>
                                        <td style={{ color: 'var(--danger)' }}>{alert.max_price !== null ? `₹${alert.max_price}` : '—'}</td>
                                        <td style={{ color: 'var(--text-secondary)' }}>{alert.created_at}</td>
                                        <td>
                                            <button className="btn-icon" onClick={() => handleDelete(alert.id)} title="Delete Alert" style={{ color: 'var(--danger)' }}>
                                                <Trash2 size={16} />
                                            </button>
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
};

export default Alerts;
