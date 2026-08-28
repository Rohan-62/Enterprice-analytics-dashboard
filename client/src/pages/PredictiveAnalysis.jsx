import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TrendingUp, TrendingDown, Activity, AlertCircle } from 'lucide-react';
import { api } from '../api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function PredictiveAnalysis() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [kpis, setKpis] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await api.getProducts();
                setProducts(data);
                if (data.length > 0) {
                    setSelectedProduct(data[0].id.toString());
                }
            } catch (err) {
                console.error('Failed to load products', err);
                setError('Failed to load products. Please check your connection.');
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (!selectedProduct) return;

        const loadPredictions = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await api.getPredictions(selectedProduct, 7);
                
                if (!data.success) {
                    setError(data.message || 'Failed to generate predictions.');
                    setChartData(null);
                    setKpis(null);
                    return;
                }

                // Process data for Chart.js
                const allDates = [
                    ...data.historical.map(d => d.entry_date),
                    ...data.predictions.map(d => d.entry_date)
                ];

                const historicalPrices = data.historical.map(d => parseFloat(d.avg_price));
                const futurePrices = new Array(data.historical.length).fill(null);
                
                // To connect the lines, add the last historical point to the future array
                if (data.historical.length > 0 && data.predictions.length > 0) {
                    futurePrices[data.historical.length - 1] = historicalPrices[historicalPrices.length - 1];
                }
                
                data.predictions.forEach(p => futurePrices.push(parseFloat(p.predicted_price)));

                const newChartData = {
                    labels: allDates,
                    datasets: [
                        {
                            label: 'Historical Average Price',
                            data: historicalPrices.concat(new Array(data.predictions.length).fill(null)),
                            borderColor: '#2563eb',
                            backgroundColor: 'rgba(37, 99, 235, 0.5)',
                            tension: 0.1,
                            borderWidth: 2,
                        },
                        {
                            label: 'Predicted Price (7 Days)',
                            data: futurePrices,
                            borderColor: '#ea580c',
                            backgroundColor: 'rgba(234, 88, 12, 0.5)',
                            borderDash: [5, 5],
                            tension: 0.1,
                            borderWidth: 2,
                        }
                    ]
                };

                setChartData(newChartData);

                // Calculate KPIs
                if (data.historical.length > 0 && data.predictions.length > 0) {
                    const currentPrice = parseFloat(data.historical[data.historical.length - 1].avg_price);
                    const lastPredictedPrice = parseFloat(data.predictions[data.predictions.length - 1].predicted_price);
                    const change = lastPredictedPrice - currentPrice;
                    const percentChange = ((change / currentPrice) * 100).toFixed(2);
                    
                    setKpis({
                        currentPrice,
                        lastPredictedPrice,
                        change,
                        percentChange
                    });
                } else {
                    setKpis(null);
                }

            } catch (err) {
                console.error('Failed to load predictions', err);
                setError('Failed to fetch prediction data. Check the server.');
            } finally {
                setLoading(false);
            }
        };

        loadPredictions();
    }, [selectedProduct]);

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Predictive Analysis</h1>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <select 
                        className="form-control"
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        style={{ width: '250px' }}
                    >
                        <option value="" disabled>Select a product...</option>
                        {products.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {error && (
                <div className="card" style={{ marginBottom: '24px', borderLeft: '4px solid var(--danger)', backgroundColor: 'var(--bg-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <AlertCircle color="var(--danger)" />
                        <p style={{ margin: 0, color: 'var(--text-primary)' }}>{error}</p>
                    </div>
                </div>
            )}

            {kpis && !error && (
                <div className="stats-grid" style={{ marginBottom: '24px' }}>
                    <div className="stat-card">
                        <div className="stat-header">
                            <h3>Current Avg Price</h3>
                            <Activity size={20} color="var(--primary)" />
                        </div>
                        <p className="stat-value">₹{kpis.currentPrice.toFixed(2)}</p>
                        <p className="stat-subtitle">Based on latest historical data</p>
                    </div>
                    <div className="stat-card">
                        <div className="stat-header">
                            <h3>Predicted Price (Day 7)</h3>
                            <Activity size={20} color="var(--warning)" />
                        </div>
                        <p className="stat-value">₹{kpis.lastPredictedPrice.toFixed(2)}</p>
                        <p className="stat-subtitle">Expected value in 7 days</p>
                    </div>
                    <div className="stat-card">
                        <div className="stat-header">
                            <h3>Expected Trend</h3>
                            {kpis.change >= 0 ? (
                                <TrendingUp size={20} color="var(--success)" />
                            ) : (
                                <TrendingDown size={20} color="var(--danger)" />
                            )}
                        </div>
                        <p className="stat-value" style={{ color: kpis.change >= 0 ? 'var(--success)' : 'var(--danger)' }}>
                            {kpis.change >= 0 ? '+' : ''}{kpis.percentChange}%
                        </p>
                        <p className="stat-subtitle">Over the next 7 days</p>
                    </div>
                </div>
            )}

            <div className="card" style={{ minHeight: '400px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Price Forecast (30 Days Historical + 7 Days Predicted)</h2>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                        <p style={{ color: 'var(--text-secondary)' }}>Loading prediction model...</p>
                    </div>
                ) : chartData ? (
                    <div style={{ height: '400px', width: '100%' }}>
                        <Line 
                            data={chartData} 
                            options={{ 
                                responsive: true, 
                                maintainAspectRatio: false,
                                interaction: {
                                    mode: 'index',
                                    intersect: false,
                                },
                                scales: {
                                    y: {
                                        beginAtZero: false,
                                        ticks: {
                                            callback: (value) => '₹' + value
                                        }
                                    }
                                }
                            }} 
                        />
                    </div>
                ) : (
                    !error && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                            <p style={{ color: 'var(--text-secondary)' }}>Select a product to view predictions.</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default PredictiveAnalysis;
