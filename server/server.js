const express = require('express');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Database = require('./src/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from React app (production)
app.use(express.static(path.join(__dirname, '../client/dist')));

// Initialize database and start server
let db;

async function startServer() {
    try {
        db = new Database();
        await db.initialize();
        console.log('Database connected successfully');

        // JWT Middleware
        const authenticateToken = (req, res, next) => {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            
            if (token == null) return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });

            jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret_price_tracker_key', (err, user) => {
                if (err) return res.status(403).json({ success: false, message: 'Forbidden: Invalid token' });
                req.user = user;
                next();
            });
        };

        // Protect all API routes except /auth/*
        app.use('/api', (req, res, next) => {
            if (req.path.startsWith('/auth/')) return next();
            authenticateToken(req, res, next);
        });

        // ===== Authentication Routes =====
        app.post('/api/auth/register-company', async (req, res) => {
            try {
                const { companyName, username, password } = req.body;
                const result = await db.registerCompany({ companyName, username, password });
                
                if (result.success) {
                    const token = jwt.sign(
                        { 
                            id: result.user.id, 
                            username: result.user.username, 
                            role: result.user.role, 
                            company_id: result.user.company_id,
                            company_name: result.user.company_name,
                            company_code: result.user.company_code
                        }, 
                        process.env.JWT_SECRET || 'jwt_secret_price_tracker_key', 
                        { expiresIn: '24h' }
                    );
                    res.json({ success: true, company: result.company, user: result.user, token });
                } else {
                    res.status(400).json(result);
                }
            } catch (error) {
                console.error('Error during company registration:', error);
                res.status(500).json({ success: false, message: error.message });
            }
        });

        app.post('/api/auth/register-user', async (req, res) => {
            try {
                const { username, password, role, companyCode } = req.body;
                const result = await db.registerUser({ username, password, role, companyCode });
                
                if (result.success) {
                    const token = jwt.sign(
                        { 
                            id: result.user.id, 
                            username: result.user.username, 
                            role: result.user.role, 
                            company_id: result.user.company_id,
                            company_name: result.user.company_name,
                            company_code: result.user.company_code
                        }, 
                        process.env.JWT_SECRET || 'jwt_secret_price_tracker_key', 
                        { expiresIn: '24h' }
                    );
                    res.json({ success: true, user: result.user, token });
                } else {
                    res.status(400).json(result);
                }
            } catch (error) {
                console.error('Error during user registration:', error);
                res.status(500).json({ success: false, message: error.message });
            }
        });

        app.post('/api/auth/login', async (req, res) => {
            try {
                const { username, password, companyCode } = req.body;
                const result = await db.userLogin(username, password, companyCode);
                
                if (result.success) {
                    const token = jwt.sign(
                        { 
                            id: result.user.id, 
                            username: result.user.username, 
                            role: result.user.role, 
                            company_id: result.user.company_id,
                            company_name: result.user.company_name,
                            company_code: result.user.company_code
                        }, 
                        process.env.JWT_SECRET || 'jwt_secret_price_tracker_key', 
                        { expiresIn: '24h' }
                    );
                    res.json({ success: true, user: result.user, token });
                } else {
                    res.status(401).json(result);
                }
            } catch (error) {
                console.error('Error during login:', error);
                res.status(500).json({ success: false, message: error.message });
            }
        });

        // ===== Business & Analytics API Routes =====

        // --- Products ---
        app.get('/api/products', async (req, res) => {
            try {
                const products = await db.getProducts(req.user.company_id);
                res.json(products);
            } catch (error) {
                console.error('Error getting products:', error);
                res.status(500).json({ error: error.message });
            }
        });

        app.post('/api/products', async (req, res) => {
            try {
                const result = await db.addProduct(req.body.name, req.user);
                res.json(result);
            } catch (error) {
                console.error('Error adding product:', error);
                res.status(500).json({ success: false, message: error.message });
            }
        });

        app.put('/api/products/:id', async (req, res) => {
            try {
                const result = await db.updateProduct(req.params.id, req.body.name, req.user);
                res.json(result);
            } catch (error) {
                console.error('Error updating product:', error);
                res.status(500).json({ success: false, message: error.message });
            }
        });

        app.delete('/api/products/:id', async (req, res) => {
            try {
                const result = await db.deleteProduct(req.params.id, req.user);
                res.json(result);
            } catch (error) {
                console.error('Error deleting product:', error);
                res.status(500).json({ success: false, message: error.message });
            }
        });

        // --- Suppliers ---
        app.get('/api/suppliers', async (req, res) => {
            try {
                const suppliers = await db.getSuppliers(req.user.company_id);
                res.json(suppliers);
            } catch (error) {
                console.error('Error getting suppliers:', error);
                res.status(500).json({ error: error.message });
            }
        });

        app.post('/api/suppliers', async (req, res) => {
            try {
                const result = await db.addSupplier(req.body.name, req.body.location, req.user);
                res.json(result);
            } catch (error) {
                console.error('Error adding supplier:', error);
                res.status(500).json({ success: false, message: error.message });
            }
        });

        app.put('/api/suppliers/:id', async (req, res) => {
            try {
                const result = await db.updateSupplier(req.params.id, req.body.name, req.body.location, req.user);
                res.json(result);
            } catch (error) {
                console.error('Error updating supplier:', error);
                res.status(500).json({ success: false, message: error.message });
            }
        });

        app.delete('/api/suppliers/:id', async (req, res) => {
            try {
                const result = await db.deleteSupplier(req.params.id, req.user);
                res.json(result);
            } catch (error) {
                console.error('Error deleting supplier:', error);
                res.status(500).json({ success: false, message: error.message });
            }
        });

        // --- Statistics ---
        app.get('/api/stats', async (req, res) => {
            try {
                const stats = await db.getStats(req.user.company_id);
                res.json(stats);
            } catch (error) {
                console.error('Error getting stats:', error);
                res.status(500).json({ error: error.message });
            }
        });

        app.get('/api/stats/advanced', async (req, res) => {
            try {
                const stats = await db.getAdvancedStats(req.user.company_id);
                res.json(stats);
            } catch (error) {
                console.error('Error getting advanced stats:', error);
                res.status(500).json({ error: error.message });
            }
        });

        // --- Prices ---
        app.get('/api/prices/today', async (req, res) => {
            try {
                const prices = await db.getTodayPrices(req.user.company_id);
                res.json(prices);
            } catch (error) {
                console.error('Error getting today prices:', error);
                res.status(500).json({ error: error.message });
            }
        });

        app.get('/api/prices/daily', async (req, res) => {
            try {
                const { date, product_id } = req.query;
                const result = await db.getDailyPrices(date, product_id, req.user.company_id);
                res.json(result);
            } catch (error) {
                console.error('Error getting daily prices:', error);
                res.status(500).json({ error: error.message });
            }
        });

        app.get('/api/prices', async (req, res) => {
            try {
                const filters = {};
                if (req.query.product_id) filters.product_id = req.query.product_id;
                if (req.query.supplier_id) filters.supplier_id = req.query.supplier_id;
                if (req.query.start_date) filters.start_date = req.query.start_date;
                if (req.query.end_date) filters.end_date = req.query.end_date;
                const prices = await db.getPrices(filters, req.user.company_id);
                res.json(prices);
            } catch (error) {
                console.error('Error getting prices:', error);
                res.status(500).json({ error: error.message });
            }
        });

        app.post('/api/prices', async (req, res) => {
            try {
                const result = await db.insertPrice(req.body, req.user);
                res.json(result);
            } catch (error) {
                console.error('Error inserting price:', error);
                res.status(500).json({ success: false, message: error.message });
            }
        });

        app.put('/api/prices/:id', async (req, res) => {
            try {
                const data = { ...req.body, id: req.params.id };
                const result = await db.updatePrice(data, req.user);
                res.json(result);
            } catch (error) {
                console.error('Error updating price:', error);
                res.status(500).json({ success: false, message: error.message });
            }
        });

        app.delete('/api/prices/:id', async (req, res) => {
            try {
                const result = await db.deletePrice(req.params.id, req.user);
                res.json(result);
            } catch (error) {
                console.error('Error deleting price:', error);
                res.status(500).json({ success: false, message: error.message });
            }
        });

        // --- Predictive Analysis ---
        app.get('/api/predict/:productId', async (req, res) => {
            try {
                const daysToPredict = parseInt(req.query.days) || 7;
                const result = await db.getPredictions(req.params.productId, daysToPredict, req.user.company_id);
                res.json(result);
            } catch (error) {
                console.error('Error getting predictions:', error);
                res.status(500).json({ success: false, message: error.message });
            }
        });

        // --- Entries (Admin) ---
        app.get('/api/entries', async (req, res) => {
            try {
                const { date, page, limit } = req.query;
                const result = await db.getEntriesByDate(date, parseInt(page) || 1, parseInt(limit) || 20, req.user.company_id);
                res.json(result);
            } catch (error) {
                console.error('Error getting entries:', error);
                res.status(500).json({ error: error.message });
            }
        });

        // --- Price Alerts ---
        app.get('/api/alerts', async (req, res) => {
            try {
                const alerts = await db.getAlerts(req.user.company_id);
                res.json(alerts);
            } catch (error) {
                console.error('Error getting alerts:', error);
                res.status(500).json({ error: error.message });
            }
        });

        app.post('/api/alerts', async (req, res) => {
            try {
                const { product_id, min_price, max_price } = req.body;
                const result = await db.addAlert(product_id, min_price, max_price, req.user);
                res.json(result);
            } catch (error) {
                console.error('Error adding alert:', error);
                res.status(500).json({ success: false, message: error.message });
            }
        });

        app.delete('/api/alerts/:id', async (req, res) => {
            try {
                const result = await db.deleteAlert(req.params.id, req.user);
                res.json(result);
            } catch (error) {
                console.error('Error deleting alert:', error);
                res.status(500).json({ success: false, message: error.message });
            }
        });

        app.get('/api/alerts/triggered', async (req, res) => {
            try {
                const alerts = await db.getTriggeredAlerts(req.user.company_id);
                res.json(alerts);
            } catch (error) {
                console.error('Error getting triggered alerts:', error);
                res.status(500).json({ error: error.message });
            }
        });

        // --- Search ---
        app.get('/api/search', async (req, res) => {
            try {
                const { q } = req.query;
                if (!q || q.trim().length < 2) {
                    return res.json({ products: [], suppliers: [], prices: [] });
                }
                const results = await db.search(q.trim(), req.user.company_id);
                res.json(results);
            } catch (error) {
                console.error('Error searching:', error);
                res.status(500).json({ error: error.message });
            }
        });

        // --- Audit Logs ---
        app.get('/api/audit-logs', async (req, res) => {
            try {
                const { page, limit } = req.query;
                const result = await db.getAuditLogs(parseInt(page) || 1, parseInt(limit) || 25, req.user.company_id);
                res.json(result);
            } catch (error) {
                console.error('Error getting audit logs:', error);
                res.status(500).json({ error: error.message });
            }
        });

        // React Router fallback (must be after all API routes)
        app.use((req, res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });

        // Start listening
        app.listen(PORT, () => {
            console.log(`\n  ✓ Server running at http://localhost:${PORT}`);
            console.log(`  ✓ API available at http://localhost:${PORT}/api`);
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
