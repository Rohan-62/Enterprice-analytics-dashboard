require('dotenv').config();
const { Pool } = require('pg');
const crypto = require('crypto');

class AppDatabase {
    constructor() {
        this.pool = new Pool({
            user: process.env.DB_USER || 'postgres',
            host: process.env.DB_HOST || 'localhost',
            database: process.env.DB_DATABASE || 'price_tracking',
            password: process.env.DB_PASSWORD || 'postgres',
            port: process.env.DB_PORT || 5432,
        });
    }

    async initialize() {
        try {
            await this.initializeDatabase();
            console.log('Database initialized successfully');
            return this;
        } catch (error) {
            console.error('Error initializing database:', error);
            throw error;
        }
    }

    async initializeDatabase() {
        // Create tables
        await this.pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await this.pool.query(`
            CREATE TABLE IF NOT EXISTS suppliers (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                location TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await this.pool.query(`
            CREATE TABLE IF NOT EXISTS prices (
                id SERIAL PRIMARY KEY,
                product_id INTEGER NOT NULL,
                supplier_id INTEGER NOT NULL,
                price REAL NOT NULL,
                entry_date DATE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
                FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE
            )
        `);

        await this.pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                role TEXT NOT NULL DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await this.pool.query(`CREATE INDEX IF NOT EXISTS idx_product_date ON prices(product_id, entry_date)`);
        await this.pool.query(`CREATE INDEX IF NOT EXISTS idx_supplier_date ON prices(supplier_id, entry_date)`);

        // Check if we have data before seeding
        const res = await this.pool.query('SELECT COUNT(*) as count FROM suppliers');
        const count = parseInt(res.rows[0].count, 10);
        console.log('Suppliers count in db:', count);
        
        if (count === 0) {
            console.log('Database exists but is empty, seeding...');
            await this.seedData();
        }
    }

    async seedData() {
        console.log('Seeding database...');

        // Insert products
        const products = [
            'DORB/RBDOC', 'SOYA DOC (45%)', 'SOYA DOC (46%)', 'SOYA DOC (47%)',
            'SOYA DOC (48%)', 'SOYA DOC (50%)', 'SOYA DOC (HiPro)', 'Maize DOC',
            'GN DOC (40%)', 'GN DOC (45%)', 'GN DOC (50%)', 'MUSTARD DOC',
            'COTTON DOC', 'DORB/RBDOC (Hipro)'
        ];

        for (const name of products) {
            try {
                await this.pool.query('INSERT INTO products (name) VALUES ($1) ON CONFLICT (name) DO NOTHING', [name]);
            } catch (e) {
                console.log('Product insert error:', e.message);
            }
        }

        // Insert suppliers
        const suppliers = [
            ['Ritish', 'Khanna'], ['RamdevBaba', 'Bhrahampuri'], ['Chaitanya Solv', 'Neora'],
            ['Jayshree', 'Durg'], ['Shivangi', 'Bilaspur'], ['Rudrapur Solv', 'Rudrapur'],
            ['Surago', 'Bundi'], ['Seahawk', 'Aurangabad (Bihar)'], ['Suryamitra', 'Katni'],
            ['Saibaba Naturals', 'Nagpur'], ['Ramdev Baba Solv', 'Nagpur'], ['SLS Agro', 'Kartagi'],
            ['Maheshwari', 'Hyderabad'], ['Kalyani', 'Malda'], ['Om Shri Sai', 'Bhuvneshwar'],
            ['Growing Tree', 'Bhuneshwar'], ['Bargarh', 'Bargarh'], ['Anmol', 'Kolkata'],
            ['Siddhivinayak', 'Gondia'], ['Aadityaa Protein', 'Nagpur'], ['Betul oil', 'Satna'],
            ['Betul oil', 'Betul'], ['Betul oil', 'Solapur'], ['Rayat Agro', 'Dharashiv'],
            ['Deesan Agro', 'Dhule'], ['Living Foods', 'Shujalpur'], ['Shiv Group', 'Kota'],
            ['Dhakshita Solv', 'Warangal'], ['Vijay', 'Vijaywada'], ['Abhay Solv', 'Koppal'],
            ['Orchard Solv', 'Tiruppur'], ['Shri Krishna', 'Bargarh'], ['Ramdev', 'Piparia'],
            ['Shrinivasa Cattel', 'Nanded'], ['Sachin Proteins', 'Udgir'], ['Siri Agro', 'Nanded'],
            ['Vijay Soya', 'Latur'], ['Tulija Bhavani Soya', 'Murud'], ['Agrocean', 'Majalgaon'],
            ['Kanhaiya Solv', 'Barnala'], ['Shree Ram', 'Patiala'], ['Shree Sita Solv', 'Nagpur'],
            ['Sai Baba Solv', 'Nagpur'], ['ROC', 'Rajkot'], ['Rajesh', 'Rajkot'],
            ['National Industries', 'Dhoraji'], ['Divya Solv', 'Kuvadva'], ['Nuchem', 'Bikaner'],
            ['Shymakala Agro', 'Nagpur'], ['Shalimar', 'Nagpur'], ['Narayana Agro', 'Udgir'],
            ['Minakshi Solv', 'Latur'], ['Amrit Refined', 'Mandsaur'], ['Soyug', 'Bundi'],
            ['Tania Industries', 'Nagpur'], ['Rajnandgaon', 'Rajnandgaon (CG)'],
            ['Badnawar', 'Badnawar (MP)'], ['Latur Solv', 'Latur'],
            ['Sree Siddarameshwara Agro', 'Nanded'], ['Snehil Soya', 'Sagar (MP)'],
            ['Sanwaria Agro', 'Itarsi'], ['RH Solv', 'Seoni'], ['Midiya', 'Radhanpur'],
            ['Patanjali Foods', 'Baran'], ['AWL (Adani)', 'Alwar'], ['AWL (Adani)', 'Bundi'],
            ['AWL (Adani)', 'Gohana'], ['Shiv Group', 'Kota'], ['Tirupati Solv', 'Hardoi'],
            ['Mantora', 'Kanpur'], ['Avadh', 'Bahraich'], ['Ashok Dall Mill', 'Itarsi'],
            ['AWL', 'Mantralayam'], ['AWL', 'Gohana'], ['Thakurji Solv', 'Jalna'],
            ['Anmol Solv', 'Gomta (Gujarat)'], ['Vinod', 'Bikaner']
        ];

        for (const [name, location] of suppliers) {
            try {
                await this.pool.query('INSERT INTO suppliers (name, location) VALUES ($1, $2)', [name, location]);
            } catch (e) {
                console.log('Supplier insert error:', e.message);
            }
        }

        // Insert default users (password: admin123 / user123)
        try {
            const hashedAdminPassword = this.hashPassword('admin123');
            const hashedUserPassword = this.hashPassword('user123');
            await this.pool.query('INSERT INTO users (username, password, role) VALUES ($1, $2, $3) ON CONFLICT (username) DO NOTHING', ['admin', hashedAdminPassword, 'admin']);
            await this.pool.query('INSERT INTO users (username, password, role) VALUES ($1, $2, $3) ON CONFLICT (username) DO NOTHING', ['user', hashedUserPassword, 'user']);
        } catch (e) {
            console.log('User insert error:', e.message);
        }

        // Insert sample prices
        const today = new Date().toISOString().split('T')[0];
        const priceData = [
            [1, 1, 3500.00, today], [1, 2, 3450.00, today], [1, 3, 3520.00, today],
            [1, 4, 3480.00, today], [1, 5, 3420.00, today], [2, 6, 4200.00, today],
            [2, 7, 4150.00, today], [2, 8, 4225.00, today], [2, 9, 4180.00, today]
        ];

        for (const [product_id, supplier_id, price, entry_date] of priceData) {
            try {
                await this.pool.query('INSERT INTO prices (product_id, supplier_id, price, entry_date) VALUES ($1, $2, $3, $4)',
                    [product_id, supplier_id, price, entry_date]);
            } catch (e) {
                console.log('Price insert error:', e.message);
            }
        }

        console.log('Database seeded successfully');
    }

    hashPassword(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }

    // Products
    async getProducts() {
        const res = await this.pool.query('SELECT id, name FROM products ORDER BY id ASC');
        console.log('getProducts returning:', res.rows.length, 'items');
        return res.rows;
    }

    async addProduct(name) {
        try {
            const res = await this.pool.query('INSERT INTO products (name) VALUES ($1) RETURNING id', [name]);
            return { success: true, id: res.rows[0].id };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    async updateProduct(id, name) {
        try {
            await this.pool.query('UPDATE products SET name = $1 WHERE id = $2', [name, id]);
            return { success: true };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    async deleteProduct(id) {
        try {
            await this.pool.query('DELETE FROM products WHERE id = $1', [id]);
            return { success: true };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    // Suppliers
    async getSuppliers() {
        const res = await this.pool.query('SELECT id, name, location FROM suppliers ORDER BY id ASC');
        console.log('getSuppliers returning:', res.rows.length, 'items');
        return res.rows;
    }

    async addSupplier(name, location) {
        try {
            const res = await this.pool.query('INSERT INTO suppliers (name, location) VALUES ($1, $2) RETURNING id', [name, location]);
            return { success: true, id: res.rows[0].id };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    async updateSupplier(id, name, location) {
        try {
            await this.pool.query('UPDATE suppliers SET name = $1, location = $2 WHERE id = $3', [name, location, id]);
            return { success: true };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    async deleteSupplier(id) {
        try {
            await this.pool.query('DELETE FROM suppliers WHERE id = $1', [id]);
            return { success: true };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    // Statistics
    async getStats() {
        const products = await this.pool.query('SELECT COUNT(*) as count FROM products');
        const suppliers = await this.pool.query('SELECT COUNT(*) as count FROM suppliers');
        const prices = await this.pool.query('SELECT COUNT(*) as count FROM prices');
        return {
            products: parseInt(products.rows[0].count, 10),
            suppliers: parseInt(suppliers.rows[0].count, 10),
            prices: parseInt(prices.rows[0].count, 10)
        };
    }

    // Prices
    async getTodayPrices() {
        const today = new Date().toISOString().split('T')[0];
        const res = await this.pool.query(`
            SELECT p.id, p.price, TO_CHAR(p.entry_date, 'YYYY-MM-DD') as entry_date, p.product_id, p.supplier_id,
                   pr.name as product_name, 
                   s.name as supplier_name, s.location as supplier_location
            FROM prices p
            JOIN products pr ON p.product_id = pr.id
            JOIN suppliers s ON p.supplier_id = s.id
            WHERE p.entry_date = $1
            ORDER BY p.id ASC
        `, [today]);
        return res.rows;
    }

    async insertPrice(data) {
        try {
            const { product_id, supplier_id, price, entry_date } = data;
            const date = entry_date || new Date().toISOString().split('T')[0];
            const res = await this.pool.query(
                'INSERT INTO prices (product_id, supplier_id, price, entry_date) VALUES ($1, $2, $3, $4) RETURNING id',
                [product_id, supplier_id, price, date]
            );
            return { success: true, id: res.rows[0].id };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    async updatePrice(data) {
        try {
            const { id, product_id, supplier_id, price } = data;
            await this.pool.query(
                'UPDATE prices SET product_id = $1, supplier_id = $2, price = $3 WHERE id = $4',
                [product_id, supplier_id, price, id]
            );
            return { success: true };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    async deletePrice(id) {
        try {
            await this.pool.query('DELETE FROM prices WHERE id = $1', [id]);
            return { success: true };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    async getPrices(filters = {}) {
        let sql = `
            SELECT p.id, p.price, TO_CHAR(p.entry_date, 'YYYY-MM-DD') as entry_date,
                   pr.name as product_name,
                   s.name as supplier_name, s.location as supplier_location
            FROM prices p
            JOIN products pr ON p.product_id = pr.id
            JOIN suppliers s ON p.supplier_id = s.id
            WHERE 1=1
        `;
        const params = [];
        let paramIndex = 1;

        if (filters.product_id) {
            sql += ` AND p.product_id = $${paramIndex++}`;
            params.push(filters.product_id);
        }
        if (filters.supplier_id) {
            sql += ` AND p.supplier_id = $${paramIndex++}`;
            params.push(filters.supplier_id);
        }
        if (filters.start_date) {
            sql += ` AND p.entry_date >= $${paramIndex++}`;
            params.push(filters.start_date);
        }
        if (filters.end_date) {
            sql += ` AND p.entry_date <= $${paramIndex++}`;
            params.push(filters.end_date);
        }

        sql += ' ORDER BY p.entry_date DESC, p.id DESC LIMIT 5000';

        const res = await this.pool.query(sql, params);
        return res.rows;
    }

    async getDailyPrices(date, productId) {
        const res = await this.pool.query(`
            SELECT p.id, p.price, TO_CHAR(p.entry_date, 'YYYY-MM-DD') as entry_date, p.product_id, p.supplier_id,
                   s.name as supplier_name, s.location as supplier_location
            FROM prices p
            JOIN suppliers s ON p.supplier_id = s.id
            WHERE p.entry_date = $1 AND p.product_id = $2
            ORDER BY p.price ASC
        `, [date, productId]);

        const product = await this.pool.query('SELECT name FROM products WHERE id = $1', [productId]);

        return {
            success: true,
            data: res.rows,
            product_name: product.rows.length > 0 ? product.rows[0].name : ''
        };
    }

    // Users
    async userLogin(username, password) {
        const hashedPassword = this.hashPassword(password);
        const res = await this.pool.query(
            'SELECT id, username, role FROM users WHERE username = $1 AND password = $2',
            [username, hashedPassword]
        );

        if (res.rows.length > 0) {
            return { success: true, user: res.rows[0] };
        }
        return { success: false, message: 'Invalid credentials' };
    }

    async getEntriesByDate(date, page = 1, limit = 20) {
        let whereClause = '';
        const baseParams = [];

        if (date && date.trim() !== '') {
            const cleanDate = date.trim();
            whereClause = 'WHERE p.entry_date = $1';
            baseParams.push(cleanDate);
        } else {
            // Default to today if no date specified
            const today = new Date().toISOString().split('T')[0];
            whereClause = 'WHERE p.entry_date = $1';
            baseParams.push(today);
        }

        // Get total count
        const countSql = `SELECT COUNT(*) as count FROM prices p ${whereClause}`;
        const countResult = await this.pool.query(countSql, baseParams);
        const total = parseInt(countResult.rows[0].count, 10);

        // Get data
        let sql = `
            SELECT p.id, p.price, TO_CHAR(p.entry_date, 'YYYY-MM-DD') as entry_date, p.product_id, p.supplier_id,
                   pr.name as product_name,
                   s.name as supplier_name, s.location as supplier_location
            FROM prices p
            JOIN products pr ON p.product_id = pr.id
            JOIN suppliers s ON p.supplier_id = s.id
            ${whereClause}
            ORDER BY p.entry_date DESC, p.id DESC
            LIMIT $${baseParams.length + 1} OFFSET $${baseParams.length + 2}
        `;

        const offset = (page - 1) * limit;
        const dataParams = [...baseParams, limit, offset];
        const res = await this.pool.query(sql, dataParams);

        return {
            data: res.rows,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
}

module.exports = AppDatabase;
