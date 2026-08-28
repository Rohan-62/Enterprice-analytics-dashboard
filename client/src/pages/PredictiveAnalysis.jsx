import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TrendingUp, TrendingDown, Activity, AlertCircle, Sparkles, Filter } from 'lucide-react';
import { api } from '../api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

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
                    setError(data.message || 'Not enough historical data to generate reliable predictions. Please add more daily quotes.');
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
                            label: 'Historical Avg Price (₹)',
                            data: historicalPrices.concat(new Array(data.predictions.length).fill(null)),
                            borderColor: '#3b82f6',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            tension: 0.3,
                            borderWidth: 2.5,
                            pointRadius: 4,
                            pointHoverRadius: 6,
                            fill: true,
                        },
                        {
                            label: 'Predicted Trend (Next 7 Days)',
                            data: futurePrices,
                            borderColor: '#f59e0b',
                            backgroundColor: 'rgba(245, 158, 11, 0.1)',
                            borderDash: [6, 6],
                            tension: 0.3,
                            borderWidth: 2.5,
                            pointRadius: 4,
                            pointHoverRadius: 6,
                            fill: true,
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
                setError('Failed to fetch prediction model output. Check backend connection.');
            } finally {
                setLoading(false);
            }
        };

        loadPredictions();
    }, [selectedProduct]);

    return (
        <div className="container">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h1 className="page-title">
                        <Sparkles size={28} color="#3b82f6" />
                        Predictive Price Forecasting
                    </h1>
                    <p className="page-subtitle">Linear regression price modeling based on 30-day historical trading velocity</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <label htmlFor="product-select" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                        Select Commodity:
                    </label>
                    <select 
                        id="product-select"
                        className="form-control"
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        style={{ minWidth: '240px' }}
                    >
                        <option value="" disabled>Choose a product...</option>
                        {products.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {error && (
                <div className="alert-box" style={{ marginBottom: '24px' }}>
                    <AlertCircle size={20} style={{ flexShrink: 0 }} />
                    <div>
                        <strong>Notice:</strong> {error}
                    </div>
                </div>
            )}

            {kpis && !error && (
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-header">
                            <h3>Current Avg Price</h3>
                            <Activity size={18} color="var(--accent)" />
                        </div>
                        <p className="stat-value">₹{kpis.currentPrice.toFixed(2)}</p>
                        <p className="stat-subtitle">Latest recorded spot price</p>
                    </div>
                    <div className="stat-card">
                        <div className="stat-header">
                            <h3>Forecast Price (Day +7)</h3>
                            <Sparkles size={18} color="var(--warning)" />
                        </div>
                        <p className="stat-value" style={{ color: 'var(--warning)' }}>₹{kpis.lastPredictedPrice.toFixed(2)}</p>
                        <p className="stat-subtitle">Projected benchmark value</p>
                    </div>
                    <div className="stat-card">
                        <div className="stat-header">
                            <h3>Estimated Trajectory</h3>
                            {kpis.change >= 0 ? (
                                <TrendingUp size={18} color="var(--success)" />
                            ) : (
                                <TrendingDown size={18} color="var(--danger)" />
                            )}
                        </div>
                        <p className="stat-value" style={{ color: kpis.change >= 0 ? 'var(--success)' : 'var(--danger)' }}>
                            {kpis.change >= 0 ? '+' : ''}{kpis.percentChange}%
                        </p>
                        <p className="stat-subtitle">Projected 7-day movement</p>
                    </div>
                </div>
            )}

            <div className="card">
                <div className="card-header flex flex-between flex-center">
                    <div>
                        <h2 className="card-title">Forecast Trajectory Chart</h2>
                        <p className="card-subtitle">Comparing historical velocity vs 7-day linear projection</p>
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'var(--accent-subtle)', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)' }}>
                        <Activity size={14} /> AI Regression Active
                    </div>
                </div>
                
                {loading ? (
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '340px', gap: '12px' }}>
                        <Activity size={32} color="var(--accent)" style={{ animation: 'spin 1.5s linear infinite' }} />
                        <p style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Calculating predictive regression curve...</p>
                    </div>
                ) : chartData ? (
                    <div className="chart-wrapper">
                        <Line 
                            data={chartData} 
                            options={{ 
                                responsive: true, 
                                maintainAspectRatio: false,
                                interaction: {
                                    mode: 'index',
                                    intersect: false,
                                },
                                plugins: {
                                    legend: {
                                        position: 'top',
                                        labels: {
                                            boxWidth: 12,
                                            usePointStyle: true,
                                            font: {
                                                family: 'Plus Jakarta Sans',
                                                weight: 600,
                                                size: 12
                                            }
                                        }
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: (item) => `${item.dataset.label}: ₹${parseFloat(item.parsed.y).toFixed(2)}`
                                        }
                                    }
                                },
                                scales: {
                                    y: {
                                        beginAtZero: false,
                                        grid: {
                                            color: 'rgba(148, 163, 184, 0.1)'
                                        },
                                        ticks: {
                                            callback: (value) => '₹' + value
                                        }
                                    },
                                    x: {
                                        grid: {
                                            display: false
                                        }
                                    }
                                }
                            }} 
                        />
                    </div>
                ) : (
                    !error && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                            <p style={{ color: 'var(--text-muted)' }}>Select a commodity product from above to view predictions.</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default PredictiveAnalysis;
