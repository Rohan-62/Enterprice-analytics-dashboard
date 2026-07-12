import { useState, useEffect } from 'react';
import api from '../api';

function DailyAnalysis() {
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [analysisData, setAnalysisData] = useState([]);
    const [productName, setProductName] = useState('');
    const [loading, setLoading] = useState(false);
    
    const [filters, setFilters] = useState({
        product_id: '',
        date: new Date().toISOString().split('T')[0]
    });

    const loadInitialData = async () => {
        try {
            const [p, s] = await Promise.all([
                api.getProducts(),
                api.getSuppliers()
            ]);
            setProducts(p);
            setSuppliers(s);
            if (p.length > 0) {
                setFilters(prev => ({ ...prev, product_id: p[0].id }));
            }
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    useEffect(() => {
        loadInitialData();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const generateAnalysis = async () => {
        if (!filters.product_id) {
            alert('Please select a product');
            return;
        }

        setLoading(true);
        try {
            const result = await api.getDailyPrices(filters.date, filters.product_id);
            if (result.success) {
                setAnalysisData(result.data);
                setProductName(result.product_name);
            }
        } catch (error) {
            console.error('Error getting daily analysis:', error);
        } finally {
            setLoading(false);
        }
    };

    // Calculate stats
    const validPrices = analysisData.map(d => parseFloat(d.price));
    const minPrice = validPrices.length > 0 ? Math.min(...validPrices) : 0;
    const maxPrice = validPrices.length > 0 ? Math.max(...validPrices) : 0;
    const avgPrice = validPrices.length > 0 ? (validPrices.reduce((a, b) => a + b, 0) / validPrices.length) : 0;

    return (
        <div className="container">
            <div className="page-header">
                <h1 className="page-title">Daily Price Analysis</h1>
                <p className="page-subtitle">Compare prices from all suppliers on a specific day</p>
            </div>

            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Select Parameters</h3>
                </div>
                <div className="form-grid" style={{ marginBottom: '24px' }}>
                    <div className="form-group">
                        <label>Date</label>
                        <input type="date" className="form-control" name="date" value={filters.date} onChange={handleFilterChange} max={new Date().toISOString().split('T')[0]} required />
                    </div>
                    <div className="form-group">
                        <label>Product</label>
                        <select className="form-control" name="product_id" value={filters.product_id} onChange={handleFilterChange} required>
                            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                    </div>
                </div>
                <div className="text-center">
                    <button className="btn btn-primary" onClick={generateAnalysis}>Generate Daily Report</button>
                </div>
            </div>

            {analysisData.length > 0 && !loading && (
                <>
                    <div className="card mt-4">
                        <div className="card-header text-center">
                            <h3 className="card-title">Analysis for {productName}</h3>
                            <p className="card-subtitle">{new Date(filters.date).toLocaleDateString('en-IN')}</p>
                        </div>
                        
                        <div className="grid grid-3 summary-stats" style={{ marginBottom: 0 }}>
                            <div className="stat-card" style={{ borderColor: 'var(--success)' }}>
                                <div>
                                    <div className="stat-value" style={{ color: 'var(--success)' }}>Rs. {minPrice.toFixed(2)}</div>
                                    <div className="stat-label">Lowest Price</div>
                                </div>
                            </div>
                            <div className="stat-card" style={{ borderColor: 'var(--info)' }}>
                                <div>
                                    <div className="stat-value" style={{ color: 'var(--info)' }}>Rs. {avgPrice.toFixed(2)}</div>
                                    <div className="stat-label">Average Price</div>
                                </div>
                            </div>
                            <div className="stat-card" style={{ borderColor: 'var(--danger)' }}>
                                <div>
                                    <div className="stat-value" style={{ color: 'var(--danger)' }}>Rs. {maxPrice.toFixed(2)}</div>
                                    <div className="stat-label">Highest Price</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mt-4">
                        <div className="card-header">
                            <h3 className="card-title">Supplier Ranking (Lowest to Highest)</h3>
                        </div>
                        <div className="table-container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Supplier</th>
                                        <th>Location</th>
                                        <th>Price</th>
                                        <th>Diff vs Lowest</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {analysisData.map((row, index) => {
                                        const price = parseFloat(row.price);
                                        const diff = price - minPrice;
                                        return (
                                            <tr key={index} style={index === 0 ? { backgroundColor: 'var(--success-bg)' } : {}}>
                                                <td style={{ fontWeight: 'bold' }}>#{index + 1}</td>
                                                <td style={index === 0 ? { color: 'var(--success)', fontWeight: 'bold' } : {}}>{row.supplier_name}</td>
                                                <td>{row.supplier_location}</td>
                                                <td style={index === 0 ? { color: 'var(--success)', fontWeight: 'bold' } : {}}>Rs. {price.toFixed(2)}</td>
                                                <td>
                                                    {diff === 0 ? (
                                                        <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>Best Price</span>
                                                    ) : (
                                                        <span style={{ color: 'var(--danger)' }}>+ Rs. {diff.toFixed(2)}</span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {analysisData.length === 0 && !loading && (
                <div className="card mt-4 text-center" style={{ padding: '40px' }}>
                    <p style={{ color: 'var(--text-muted)' }}>Generate a report to see daily analysis data.</p>
                </div>
            )}
        </div>
    );
}

export default DailyAnalysis;
