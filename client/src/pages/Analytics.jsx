import { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import api from '../api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const chartColors = [
    '#2563eb', '#0891b2', '#059669', '#d97706', '#dc2626',
    '#7c3aed', '#db2777', '#0d9488', '#ea580c', '#4f46e5'
];

function Analytics() {
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [stats, setStats] = useState({ prices: 0, products: 0, suppliers: 0 });
    const [chartData, setChartData] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [filters, setFilters] = useState({
        product_id: '',
        supplier_id: '',
        start_date: '',
        end_date: ''
    });

    const loadInitialData = async () => {
        try {
            const [p, s, st] = await Promise.all([
                api.getProducts(),
                api.getSuppliers(),
                api.getStats()
            ]);
            setProducts(p);
            setSuppliers(s);
            setStats(st);
            loadCharts(filters);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    const loadCharts = async (currentFilters) => {
        setLoading(true);
        try {
            const data = await api.getPrices(currentFilters);
            setTableData(data.slice(0, 15));
            processChartData(data, currentFilters.product_id, currentFilters.supplier_id);
        } catch (error) {
            console.error('Error loading charts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadInitialData();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const applyFilters = () => {
        loadCharts(filters);
    };

    const processChartData = (data, singleProduct, singleSupplier) => {
        if (!data || data.length === 0) {
            setChartData(null);
            return;
        }

        const reversedData = [...data].reverse();
        const dates = [...new Set(reversedData.map(d => d.entry_date))];
        
        const datasets = [];
        let colorIndex = 0;

        if (singleProduct && !singleSupplier) {
            // Group by supplier
            const supplierData = {};
            reversedData.forEach(row => {
                if (!supplierData[row.supplier_name]) supplierData[row.supplier_name] = {};
                supplierData[row.supplier_name][row.entry_date] = row.price;
            });

            for (const [supplierName, dateMap] of Object.entries(supplierData)) {
                datasets.push({
                    label: supplierName,
                    data: dates.map(d => dateMap[d] || null),
                    borderColor: chartColors[colorIndex % chartColors.length],
                    backgroundColor: chartColors[colorIndex % chartColors.length],
                    tension: 0.1,
                    spanGaps: true
                });
                colorIndex++;
            }
        } else if (singleSupplier && !singleProduct) {
            // Group by product
            const productData = {};
            reversedData.forEach(row => {
                if (!productData[row.product_name]) productData[row.product_name] = {};
                productData[row.product_name][row.entry_date] = row.price;
            });

            for (const [productName, dateMap] of Object.entries(productData)) {
                datasets.push({
                    label: productName,
                    data: dates.map(d => dateMap[d] || null),
                    borderColor: chartColors[colorIndex % chartColors.length],
                    backgroundColor: chartColors[colorIndex % chartColors.length],
                    tension: 0.1,
                    spanGaps: true
                });
                colorIndex++;
            }
        } else {
            // Average per date if neither or both selected
            const dateGroups = {};
            reversedData.forEach(row => {
                if (!dateGroups[row.entry_date]) dateGroups[row.entry_date] = [];
                dateGroups[row.entry_date].push(row.price);
            });

            const avgData = dates.map(d => {
                const prices = dateGroups[d];
                return prices.reduce((a, b) => a + b, 0) / prices.length;
            });

            datasets.push({
                label: 'Average Price',
                data: avgData,
                borderColor: chartColors[0],
                backgroundColor: chartColors[0],
                tension: 0.1,
                fill: true,
                backgroundColor: 'rgba(37, 99, 235, 0.1)'
            });
        }

        setChartData({
            labels: dates,
            datasets
        });
    };

    return (
        <div className="container">
            <div className="page-header">
                <h1 className="page-title">Price Analytics</h1>
                <p className="page-subtitle">Analyze historical price trends and compare suppliers</p>
            </div>

            <div className="grid grid-3 summary-stats">
                <div className="stat-card">
                    <div>
                        <div className="stat-value">{stats.prices.toLocaleString()}</div>
                        <div className="stat-label">Total Entries</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div>
                        <div className="stat-value">{stats.products}</div>
                        <div className="stat-label">Products Tracked</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div>
                        <div className="stat-value">{stats.suppliers}</div>
                        <div className="stat-label">Active Suppliers</div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Filter Analytics</h3>
                </div>
                <div className="form-grid" style={{ marginBottom: '24px' }}>
                    <div className="form-group">
                        <label>Product</label>
                        <select className="form-control" name="product_id" value={filters.product_id} onChange={handleFilterChange}>
                            <option value="">All Products</option>
                            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Supplier</label>
                        <select className="form-control" name="supplier_id" value={filters.supplier_id} onChange={handleFilterChange}>
                            <option value="">All Suppliers</option>
                            {suppliers.map(s => <option key={s.id} value={s.id}>{s.name} ({s.location})</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>From Date</label>
                        <input type="date" className="form-control" name="start_date" value={filters.start_date} onChange={handleFilterChange} />
                    </div>
                    <div className="form-group">
                        <label>To Date</label>
                        <input type="date" className="form-control" name="end_date" value={filters.end_date} onChange={handleFilterChange} />
                    </div>
                </div>
                <div className="text-center">
                    <button className="btn btn-primary" onClick={applyFilters}>Apply Filters & Generate Chart</button>
                </div>
            </div>

            <div className="card mt-4">
                <div className="card-header">
                    <h3 className="card-title">Price Trends over Time</h3>
                </div>
                <div className="chart-wrapper">
                    {loading ? (
                        <div className="text-center" style={{ padding: '100px 0' }}>Loading chart data...</div>
                    ) : chartData ? (
                        <Line 
                            data={chartData} 
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { position: 'top' },
                                    tooltip: {
                                        callbacks: {
                                            label: (context) => `Rs. ${context.parsed.y.toFixed(2)}`
                                        }
                                    }
                                },
                                scales: {
                                    y: {
                                        beginAtZero: false,
                                        ticks: { callback: (value) => `Rs. ${value}` }
                                    }
                                }
                            }}
                        />
                    ) : (
                        <div className="text-center" style={{ padding: '100px 0', color: 'var(--text-muted)' }}>No data available for the selected filters</div>
                    )}
                </div>
            </div>

            <div className="card mt-4">
                <div className="card-header">
                    <h3 className="card-title">Recent Entries (Filtered)</h3>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Product</th>
                                <th>Supplier</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.length === 0 ? (
                                <tr><td colSpan="4" className="text-center">No recent data found</td></tr>
                            ) : (
                                tableData.map((row, i) => (
                                    <tr key={i}>
                                        <td>{new Date(row.entry_date).toLocaleDateString('en-IN')}</td>
                                        <td>{row.product_name}</td>
                                        <td>{row.supplier_name}</td>
                                        <td>Rs. {parseFloat(row.price).toFixed(2)}</td>
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

export default Analytics;
