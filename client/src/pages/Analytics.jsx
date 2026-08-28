import { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { BarChart, PieChart, Activity } from 'lucide-react';
import { api } from '../api';
import ReportExport from '../components/ReportExport';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const chartColors = [
    '#2563eb', '#0891b2', '#059669', '#d97706', '#dc2626',
    '#7c3aed', '#db2777', '#0d9488', '#ea580c', '#4f46e5'
];

function Analytics() {
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [stats, setStats] = useState({ prices: 0, products: 0, suppliers: 0 });
    const [chartData, setChartData] = useState(null);
    const [barData, setBarData] = useState(null);
    const [doughnutData, setDoughnutData] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chartType, setChartType] = useState('line'); // 'line', 'bar', 'doughnut'
    
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
            const data = await api.getFilteredPrices(currentFilters);
            setTableData(data.slice(0, 100)); // Increased for export
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
            setBarData(null);
            setDoughnutData(null);
            return;
        }

        const reversedData = [...data].reverse();
        const dates = [...new Set(reversedData.map(d => d.entry_date))];
        
        // --- Line Chart Logic ---
        const datasets = [];
        let colorIndex = 0;

        if (singleProduct && !singleSupplier) {
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
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                tension: 0.1,
                fill: true,
            });
        }
        setChartData({ labels: dates, datasets });

        // --- Bar Chart & Doughnut Logic (Supplier Comparisons) ---
        const supplierAggregates = {};
        reversedData.forEach(row => {
            if (!supplierAggregates[row.supplier_name]) {
                supplierAggregates[row.supplier_name] = { total: 0, count: 0 };
            }
            supplierAggregates[row.supplier_name].total += parseFloat(row.price);
            supplierAggregates[row.supplier_name].count += 1;
        });

        const supplierNames = Object.keys(supplierAggregates);
        const avgPrices = supplierNames.map(name => supplierAggregates[name].total / supplierAggregates[name].count);
        const marketShare = supplierNames.map(name => supplierAggregates[name].count);

        setBarData({
            labels: supplierNames,
            datasets: [{
                label: 'Average Price (Overall Period)',
                data: avgPrices,
                backgroundColor: chartColors.map(c => `${c}CC`),
                borderColor: chartColors,
                borderWidth: 1
            }]
        });

        setDoughnutData({
            labels: supplierNames,
            datasets: [{
                label: 'Number of Entries (Market Share)',
                data: marketShare,
                backgroundColor: chartColors.map(c => `${c}CC`),
                borderColor: chartColors,
                borderWidth: 1
            }]
        });
    };

    return (
        <div className="container">
            <div className="page-header">
                <h1 className="page-title">Price Analytics</h1>
                <p className="page-subtitle">Analyze historical price trends, supplier market share, and export reports.</p>
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
                <div className="card-header flex flex-between flex-center">
                    <h3 className="card-title">Analytics Dashboard</h3>
                    
                    <div className="chart-toggle">
                        <button className={`chart-toggle-btn ${chartType === 'line' ? 'active' : ''}`} onClick={() => setChartType('line')} title="Line Chart (Trends)">
                            <Activity size={16} /> Trends
                        </button>
                        <button className={`chart-toggle-btn ${chartType === 'bar' ? 'active' : ''}`} onClick={() => setChartType('bar')} title="Bar Chart (Comparison)">
                            <BarChart size={16} /> Compare
                        </button>
                        <button className={`chart-toggle-btn ${chartType === 'doughnut' ? 'active' : ''}`} onClick={() => setChartType('doughnut')} title="Doughnut Chart (Share)">
                            <PieChart size={16} /> Share
                        </button>
                    </div>
                </div>
                
                <div className="chart-wrapper">
                    {loading ? (
                        <div className="text-center" style={{ padding: '100px 0' }}>Loading chart data...</div>
                    ) : !chartData ? (
                        <div className="text-center" style={{ padding: '100px 0', color: 'var(--text-muted)' }}>No data available for the selected filters</div>
                    ) : (
                        <>
                            {chartType === 'line' && (
                                <Line data={chartData} options={{
                                    responsive: true, maintainAspectRatio: false,
                                    plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: (c) => `₹${c.parsed.y.toFixed(2)}` } } },
                                    scales: { y: { beginAtZero: false } }
                                }} />
                            )}
                            {chartType === 'bar' && (
                                <Bar data={barData} options={{
                                    responsive: true, maintainAspectRatio: false,
                                    plugins: { legend: { display: false }, title: { display: true, text: 'Average Price by Supplier' } },
                                    scales: { y: { beginAtZero: false } }
                                }} />
                            )}
                            {chartType === 'doughnut' && (
                                <div style={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <Doughnut data={doughnutData} options={{
                                        responsive: true, maintainAspectRatio: false,
                                        plugins: { legend: { position: 'right' }, title: { display: true, text: 'Data Entry Market Share' } }
                                    }} />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            <div className="card mt-4">
                <div className="card-header flex flex-between flex-center">
                    <h3 className="card-title">Filtered Data Extract</h3>
                    <ReportExport data={tableData} filename={`Analytics_Export_${new Date().getTime()}`} />
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
                                tableData.slice(0, 15).map((row, i) => (
                                    <tr key={i}>
                                        <td>{new Date(row.entry_date).toLocaleDateString('en-IN')}</td>
                                        <td>{row.product_name}</td>
                                        <td>{row.supplier_name}</td>
                                        <td>₹{parseFloat(row.price).toFixed(2)}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    {tableData.length > 15 && (
                        <div className="text-center mt-2" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            Showing top 15 records. Export CSV to view all {tableData.length} records.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Analytics;
