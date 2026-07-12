const express = require('express');
const path = require('path');
const Database = require('./src/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));

// Redirect root to login page
app.get('/', (req, res) => {
    res.redirect('/pages/login.html');
});

// Initialize database and start server
let db;

async function startServer() {
    try {
        db = new Database();
        await db.initialize();
        console.log('Database connected successfully');

        // ===== API Routes =====

        // --- Products ---
        app.get('/api/products', async (req, res) => {
            try {
                const products = await db.getProducts();
                res.json(products);
            } catch (error) {
                console.error('Error getting products:', error);
                res.status(500).json({ error: error.message });
            }
        });

        app.post('/api/products', async (req, res) => {
            try {
                const result = await db.addProduct(req.body.name);
                res.json(result);
            } catch (error) {
                console.error('Error adding product:', error);
                res.status(500).json({ success: false, message: error.message });
            }
        });

        app.put('/api/products/:id', async (req, res) => {
            try {
                const result = await db.updateProduct(req.params.id, req.body.name);
                res.json(result);
            } catch (error) {
                console.error('Error updating product:', error);
                res.status(500).json({ success: false, message: error.message });
            }
        });

        app.delete('/api/products/:id', async (req, res) => {
            try {
                const result = await db.deleteProduct(req.params.id);
                res.json(result);
            } catch (error) {
                console.error('Error deleting product:', error);
                res.status(500).json({ success: false, message: error.message });
            }
        });

        // --- Suppliers ---
        app.get('/api/suppliers', async (req, res) => {
            try {
                const suppliers = await db.getSuppliers();
                res.json(suppliers);
            } catch (error) {
                console.error('Error getting suppliers:', error);
                res.status(500).json({ error: error.message });
            }
        });

        app.post('/api/suppliers', async (req, res) => {
            try {
                const result = await db.addSupplier(req.body.name, req.body.location);
                res.json(result);
            } catch (error) {
                console.error('Error adding supplier:', error);
                res.status(500).json({ success: false, message: error.message });
            }
        });

        app.put('/api/suppliers/:id', async (req, res) => {
            try {
                const result = await db.updateSupplier(req.params.id, req.body.name, req.body.location);
                res.json(result);
            } catch (error) {
                console.error('Error updating supplier:', error);
                res.status(500).json({ success: false, message: error.message });
            }
        });

        app.delete('/api/suppliers/:id', async (req, res) => {
            try {
                const result = await db.deleteSupplier(req.params.id);
                res.json(result);
            } catch (error) {
                console.error('Error deleting supplier:', error);
                res.status(500).json({ success: false, message: error.message });
            }
        });

        // --- Statistics ---
        app.get('/api/stats', async (req, res) => {
            try {
                const stats = await db.getStats();
                res.json(stats);
            } catch (error) {
                console.error('Error getting stats:', error);
                res.status(500).json({ error: error.message });
            }
        });

        // --- Prices ---
        app.get('/api/prices/today', async (req, res) => {
            try {
                const prices = await db.getTodayPrices();
                res.json(prices);
            } catch (error) {
                console.error('Error getting today prices:', error);
                res.status(500).json({ error: error.message });
            }
        });

        app.get('/api/prices/daily', async (req, res) => {
            try {
                const { date, product_id } = req.query;
                const result = await db.getDailyPrices(date, product_id);
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
                const prices = await db.getPrices(filters);
                res.json(prices);
            } catch (error) {
                console.error('Error getting prices:', error);
                res.status(500).json({ error: error.message });
            }
        });

        app.post('/api/prices', async (req, res) => {
            try {
                const result = await db.insertPrice(req.body);
                res.json(result);
            } catch (error) {
                console.error('Error inserting price:', error);
                res.status(500).json({ success: false, message: error.message });
            }
        });

        app.put('/api/prices/:id', async (req, res) => {
            try {
                const data = { ...req.body, id: req.params.id };
                const result = await db.updatePrice(data);
                res.json(result);
            } catch (error) {
                console.error('Error updating price:', error);
                res.status(500).json({ success: false, message: error.message });
            }
        });

        app.delete('/api/prices/:id', async (req, res) => {
            try {
                const result = await db.deletePrice(req.params.id);
                res.json(result);
            } catch (error) {
                console.error('Error deleting price:', error);
                res.status(500).json({ success: false, message: error.message });
            }
        });

        // --- Auth ---
        app.post('/api/auth/login', async (req, res) => {
            try {
                const { username, password } = req.body;
                const result = await db.userLogin(username, password);
                res.json(result);
            } catch (error) {
                console.error('Error during login:', error);
                res.status(500).json({ success: false, message: error.message });
            }
        });

        // --- Entries (Admin) ---
        app.get('/api/entries', async (req, res) => {
            try {
                const { date, page, limit } = req.query;
                const result = await db.getEntriesByDate(date, parseInt(page) || 1, parseInt(limit) || 20);
                res.json(result);
            } catch (error) {
                console.error('Error getting entries:', error);
                res.status(500).json({ error: error.message });
            }
        });

        // Start listening
        app.listen(PORT, () => {
            console.log(`\n  ✓ Server running at http://localhost:${PORT}`);
            console.log(`  ✓ Open http://localhost:${PORT}/pages/login.html to access the dashboard\n`);
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
