require('dotenv').config();
const { Pool } = require('pg');
const crypto = require('crypto');

class AppDatabase {
    constructor() {
        const poolConfig = process.env.DATABASE_URL
            ? {
                connectionString: process.env.DATABASE_URL,
                ssl: process.env.DB_SSL === 'false' ? false : { rejectUnauthorized: false }
            }
            : {
                user: process.env.DB_USER || 'postgres',
                host: process.env.DB_HOST || 'localhost',
                database: process.env.DB_DATABASE || 'price_tracking',
                password: process.env.DB_PASSWORD || 'postgres',
                port: parseInt(process.env.DB_PORT, 10) || 5432,
                ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
            };

        this.pool = new Pool(poolConfig);
    }

    async initialize() {
        try {
            await this.initializeDatabase();
            console.log('Database initialized successfully with Multi-Tenant Architecture & Admin Approval Flow');
            return this;
        } catch (error) {
            console.error('Error initializing database:', error);
            throw error;
        }
    }

    async initializeDatabase() {
        // 1. Companies table
        await this.pool.query(`
            CREATE TABLE IF NOT EXISTS companies (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                company_code TEXT NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // 2. Users table (linked to company, with approval status)
        await this.pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
                username TEXT NOT NULL,
                password TEXT NOT NULL,
                role TEXT NOT NULL DEFAULT 'user',
                status TEXT NOT NULL DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // 3. Products table (linked to company)
        await this.pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
                name TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // 4. Suppliers table (linked to company)
        await this.pool.query(`
            CREATE TABLE IF NOT EXISTS suppliers (
                id SERIAL PRIMARY KEY,
                company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
                name TEXT NOT NULL,
                location TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // 5. Prices table (linked to company, product, supplier)
        await this.pool.query(`
            CREATE TABLE IF NOT EXISTS prices (
                id SERIAL PRIMARY KEY,
                company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
                product_id INTEGER NOT NULL,
                supplier_id INTEGER NOT NULL,
                price REAL NOT NULL,
                entry_date DATE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
                FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE
            )
        `);

        // 6. Price Alerts table (linked to company)
        await this.pool.query(`
            CREATE TABLE IF NOT EXISTS price_alerts (
                id SERIAL PRIMARY KEY,
                company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
                product_id INTEGER NOT NULL,
                min_price REAL,
                max_price REAL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
            )
        `);

        // 7. Audit Logs table (linked to company)
        await this.pool.query(`
            CREATE TABLE IF NOT EXISTS audit_logs (
                id SERIAL PRIMARY KEY,
                company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
                user_id INTEGER,
                username TEXT,
                action TEXT NOT NULL,
                entity_type TEXT NOT NULL,
                entity_id INTEGER,
                details TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Migrations: Add company_id column if missing
        const tablesWithCompany = ['users', 'products', 'suppliers', 'prices', 'price_alerts', 'audit_logs'];
        for (const table of tablesWithCompany) {
            await this.pool.query(`
                DO $$
                BEGIN
                    IF NOT EXISTS (
                        SELECT 1 FROM information_schema.columns 
                        WHERE table_name = '${table}' AND column_name = 'company_id'
                    ) THEN
                        ALTER TABLE ${table} ADD COLUMN company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE;
                    END IF;
                END $$;
            `);
        }

        // Migration: Add status column to users table if missing
        await this.pool.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM information_schema.columns 
                    WHERE table_name = 'users' AND column_name = 'status'
                ) THEN
                    ALTER TABLE users ADD COLUMN status TEXT NOT NULL DEFAULT 'pending';
                    UPDATE users SET status = 'approved' WHERE role = 'admin';
                END IF;
            END $$;
        `);

        // Clean out legacy unassigned seed/mock data
        await this.pool.query(`DELETE FROM prices WHERE company_id IS NULL`);
        await this.pool.query(`DELETE FROM price_alerts WHERE company_id IS NULL`);
        await this.pool.query(`DELETE FROM audit_logs WHERE company_id IS NULL`);
        await this.pool.query(`DELETE FROM products WHERE company_id IS NULL`);
        await this.pool.query(`DELETE FROM suppliers WHERE company_id IS NULL`);
        await this.pool.query(`DELETE FROM users WHERE company_id IS NULL`);

        // Create indexes
        await this.pool.query(`CREATE INDEX IF NOT EXISTS idx_company_code ON companies(company_code)`);
        await this.pool.query(`CREATE INDEX IF NOT EXISTS idx_users_company ON users(company_id, username)`);
        await this.pool.query(`CREATE INDEX IF NOT EXISTS idx_users_status ON users(company_id, status)`);
        await this.pool.query(`CREATE INDEX IF NOT EXISTS idx_product_company ON products(company_id)`);
        await this.pool.query(`CREATE INDEX IF NOT EXISTS idx_supplier_company ON suppliers(company_id)`);
        await this.pool.query(`CREATE INDEX IF NOT EXISTS idx_price_company_date ON prices(company_id, entry_date)`);
        await this.pool.query(`CREATE INDEX IF NOT EXISTS idx_product_date ON prices(product_id, entry_date)`);
        await this.pool.query(`CREATE INDEX IF NOT EXISTS idx_supplier_date ON prices(supplier_id, entry_date)`);
        await this.pool.query(`CREATE INDEX IF NOT EXISTS idx_audit_company_created ON audit_logs(company_id, created_at DESC)`);
    }

    generateCompanyCode() {
        const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
        let code = 'COMP-';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    hashPassword(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }

    // ==========================================
    // Auth & Company Management
    // ==========================================
    async registerCompany({ companyName, username, password }) {
        if (!companyName || !companyName.trim()) {
            return { success: false, message: 'Company name is required.' };
        }
        if (!username || !username.trim()) {
            return { success: false, message: 'Username is required.' };
        }
        if (!password || password.length < 4) {
            return { success: false, message: 'Password must be at least 4 characters long.' };
        }

        const trimmedCompanyName = companyName.trim();
        const trimmedUsername = username.trim();

        // Generate unique company code
        let companyCode = this.generateCompanyCode();
        let isUnique = false;
        let attempts = 0;
        while (!isUnique && attempts < 10) {
            const check = await this.pool.query('SELECT id FROM companies WHERE company_code = $1', [companyCode]);
            if (check.rows.length === 0) {
                isUnique = true;
            } else {
                companyCode = this.generateCompanyCode();
                attempts++;
            }
        }

        // Insert company
        const compRes = await this.pool.query(
            'INSERT INTO companies (name, company_code) VALUES ($1, $2) RETURNING id, name, company_code, created_at',
            [trimmedCompanyName, companyCode]
        );
        const company = compRes.rows[0];

        // Insert initial Admin User (Admin is immediately 'approved')
        const hashedPassword = this.hashPassword(password);
        const userRes = await this.pool.query(
            'INSERT INTO users (company_id, username, password, role, status) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, role, status',
            [company.id, trimmedUsername, hashedPassword, 'admin', 'approved']
        );
        const user = userRes.rows[0];

        await this.logAction(user.id, user.username, 'CREATE', 'company', company.id, { companyName: company.name, companyCode: company.company_code }, company.id);

        return {
            success: true,
            company: {
                id: company.id,
                name: company.name,
                company_code: company.company_code
            },
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                status: user.status,
                company_id: company.id,
                company_name: company.name,
                company_code: company.company_code
            }
        };
    }

    async registerUser({ username, password, role, companyCode }) {
        if (!companyCode || !companyCode.trim()) {
            return { success: false, message: 'Company code is required.' };
        }
        if (!username || !username.trim()) {
            return { success: false, message: 'Username is required.' };
        }
        if (!password || password.length < 4) {
            return { success: false, message: 'Password must be at least 4 characters long.' };
        }

        const trimmedCode = companyCode.trim().toUpperCase();
        const trimmedUsername = username.trim();
        const assignedRole = (role === 'admin') ? 'admin' : 'user';

        // Find company by company_code
        const compRes = await this.pool.query('SELECT id, name, company_code FROM companies WHERE UPPER(company_code) = $1', [trimmedCode]);
        if (compRes.rows.length === 0) {
            return { success: false, message: 'Invalid Company Code. Please check with your administrator.' };
        }
        const company = compRes.rows[0];

        // Check if username already exists in this company
        const userCheck = await this.pool.query(
            'SELECT id FROM users WHERE company_id = $1 AND LOWER(username) = LOWER($2)',
            [company.id, trimmedUsername]
        );
        if (userCheck.rows.length > 0) {
            return { success: false, message: `Username "${trimmedUsername}" is already registered in ${company.name}.` };
        }

        // Insert user with status = 'pending' (requires company admin approval)
        const hashedPassword = this.hashPassword(password);
        const userRes = await this.pool.query(
            'INSERT INTO users (company_id, username, password, role, status) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, role, status',
            [company.id, trimmedUsername, hashedPassword, assignedRole, 'pending']
        );
        const user = userRes.rows[0];

        await this.logAction(user.id, user.username, 'REGISTER_PENDING', 'user', user.id, { role: user.role, status: 'pending', company: company.name }, company.id);

        return {
            success: true,
            pendingApproval: true,
            message: `Registration request submitted! Your company administrator (${company.name}) must approve your account before you can log in.`,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                status: user.status,
                company_name: company.name,
                company_code: company.company_code
            }
        };
    }

    async userLogin(username, password, companyCode) {
        if (!username || !password) {
            return { success: false, message: 'Username and password are required.' };
        }

        const hashedPassword = this.hashPassword(password);
        let query = `
            SELECT u.id, u.username, u.role, u.status, u.company_id, c.name as company_name, c.company_code
            FROM users u
            JOIN companies c ON u.company_id = c.id
            WHERE LOWER(u.username) = LOWER($1) AND u.password = $2
        `;
        const params = [username.trim(), hashedPassword];

        if (companyCode && companyCode.trim()) {
            query += ' AND UPPER(c.company_code) = $3';
            params.push(companyCode.trim().toUpperCase());
        }

        const res = await this.pool.query(query, params);

        if (res.rows.length === 1) {
            const user = res.rows[0];

            // Check approval status
            if (user.status === 'pending') {
                return {
                    success: false,
                    isPending: true,
                    message: 'Your account is currently pending approval by your company administrator. Please contact your admin to activate your access.'
                };
            }

            if (user.status === 'rejected') {
                return {
                    success: false,
                    message: 'Your access request was declined by the company administrator.'
                };
            }

            return { success: true, user };
        } else if (res.rows.length > 1) {
            return { success: false, message: 'Multiple accounts found with this username. Please specify your Company Code.' };
        }

        return { success: false, message: 'Invalid credentials or company code.' };
    }

    // ==========================================
    // User Approvals & Management (Admin Only)
    // ==========================================
    async getCompanyUsers(companyId) {
        const res = await this.pool.query(
            `SELECT id, username, role, status,
                    TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI') as created_at
             FROM users
             WHERE company_id = $1
             ORDER BY CASE WHEN status = 'pending' THEN 0 ELSE 1 END, created_at DESC`,
            [companyId]
        );
        return res.rows;
    }

    async updateUserStatus(targetUserId, status, adminUser) {
        if (!['approved', 'pending', 'rejected'].includes(status)) {
            return { success: false, message: 'Invalid status.' };
        }

        const target = await this.pool.query('SELECT username, role, status FROM users WHERE id = $1 AND company_id = $2', [targetUserId, adminUser.company_id]);
        if (target.rows.length === 0) return { success: false, message: 'User not found in your company.' };

        await this.pool.query('UPDATE users SET status = $1 WHERE id = $2 AND company_id = $3', [status, targetUserId, adminUser.company_id]);
        await this.logAction(adminUser.id, adminUser.username, `USER_${status.toUpperCase()}`, 'user', targetUserId, { targetUsername: target.rows[0].username, oldStatus: target.rows[0].status, newStatus: status }, adminUser.company_id);

        return { success: true, message: `User ${target.rows[0].username} is now ${status}.` };
    }

    async updateUserRole(targetUserId, role, adminUser) {
        if (!['admin', 'user'].includes(role)) {
            return { success: false, message: 'Invalid role.' };
        }

        const target = await this.pool.query('SELECT username, role FROM users WHERE id = $1 AND company_id = $2', [targetUserId, adminUser.company_id]);
        if (target.rows.length === 0) return { success: false, message: 'User not found in your company.' };

        await this.pool.query('UPDATE users SET role = $1 WHERE id = $2 AND company_id = $3', [role, targetUserId, adminUser.company_id]);
        await this.logAction(adminUser.id, adminUser.username, 'USER_ROLE_CHANGE', 'user', targetUserId, { targetUsername: target.rows[0].username, oldRole: target.rows[0].role, newRole: role }, adminUser.company_id);

        return { success: true, message: `User ${target.rows[0].username} role changed to ${role}.` };
    }

    async adminCreateUser({ username, password, role }, adminUser) {
        if (!username || !username.trim()) {
            return { success: false, message: 'Username is required.' };
        }
        if (!password || password.length < 4) {
            return { success: false, message: 'Password must be at least 4 characters long.' };
        }

        const trimmedUsername = username.trim();
        const assignedRole = (role === 'admin') ? 'admin' : 'user';

        // Check if username already exists in this company
        const userCheck = await this.pool.query(
            'SELECT id FROM users WHERE company_id = $1 AND LOWER(username) = LOWER($2)',
            [adminUser.company_id, trimmedUsername]
        );
        if (userCheck.rows.length > 0) {
            return { success: false, message: `Username "${trimmedUsername}" is already registered in this company.` };
        }

        const hashedPassword = this.hashPassword(password);
        const userRes = await this.pool.query(
            'INSERT INTO users (company_id, username, password, role, status) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, role, status',
            [adminUser.company_id, trimmedUsername, hashedPassword, assignedRole, 'approved']
        );
        const newUser = userRes.rows[0];

        await this.logAction(adminUser.id, adminUser.username, 'CREATE_USER', 'user', newUser.id, { username: newUser.username, role: newUser.role, status: 'approved' }, adminUser.company_id);

        return {
            success: true,
            message: `User "${newUser.username}" created and activated successfully.`,
            user: newUser
        };
    }

    async adminResetPassword(targetUserId, newPassword, adminUser) {
        if (!newPassword || newPassword.length < 4) {
            return { success: false, message: 'New password must be at least 4 characters long.' };
        }

        const target = await this.pool.query('SELECT username FROM users WHERE id = $1 AND company_id = $2', [targetUserId, adminUser.company_id]);
        if (target.rows.length === 0) return { success: false, message: 'User not found in your company.' };

        const hashedPassword = this.hashPassword(newPassword);
        await this.pool.query('UPDATE users SET password = $1 WHERE id = $2 AND company_id = $3', [hashedPassword, targetUserId, adminUser.company_id]);
        await this.logAction(adminUser.id, adminUser.username, 'PASSWORD_RESET', 'user', targetUserId, { targetUsername: target.rows[0].username }, adminUser.company_id);

        return { success: true, message: `Password for user "${target.rows[0].username}" has been reset successfully.` };
    }

    async deleteCompanyUser(targetUserId, adminUser) {
        if (parseInt(targetUserId, 10) === parseInt(adminUser.id, 10)) {
            return { success: false, message: 'You cannot delete your own administrator account.' };
        }

        const target = await this.pool.query('SELECT username FROM users WHERE id = $1 AND company_id = $2', [targetUserId, adminUser.company_id]);
        if (target.rows.length === 0) return { success: false, message: 'User not found in your company.' };

        await this.pool.query('DELETE FROM users WHERE id = $1 AND company_id = $2', [targetUserId, adminUser.company_id]);
        await this.logAction(adminUser.id, adminUser.username, 'DELETE_USER', 'user', targetUserId, { targetUsername: target.rows[0].username }, adminUser.company_id);

        return { success: true, message: `User "${target.rows[0].username}" deleted successfully from your organization.` };
    }

    // ==========================================
    // Audit Logging
    // ==========================================
    async logAction(userId, username, action, entityType, entityId, details, companyId) {
        try {
            await this.pool.query(
                'INSERT INTO audit_logs (company_id, user_id, username, action, entity_type, entity_id, details) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                [companyId, userId, username, action, entityType, entityId, typeof details === 'string' ? details : JSON.stringify(details)]
            );
        } catch (e) {
            console.error('Audit log error:', e.message);
        }
    }

    async getAuditLogs(page = 1, limit = 25, companyId) {
        const offset = (page - 1) * limit;
        const countRes = await this.pool.query('SELECT COUNT(*) as count FROM audit_logs WHERE company_id = $1', [companyId]);
        const total = parseInt(countRes.rows[0].count, 10);

        const res = await this.pool.query(
            `SELECT id, user_id, username, action, entity_type, entity_id, details,
                    TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') as created_at
             FROM audit_logs 
             WHERE company_id = $1 
             ORDER BY created_at DESC 
             LIMIT $2 OFFSET $3`,
            [companyId, limit, offset]
        );

        return {
            data: res.rows,
            pagination: { total, page, limit, totalPages: Math.ceil(total / limit) }
        };
    }

    // ==========================================
    // Products (Scoped to Company)
    // ==========================================
    async getProducts(companyId) {
        const res = await this.pool.query(
            'SELECT id, name FROM products WHERE company_id = $1 ORDER BY id ASC',
            [companyId]
        );
        return res.rows;
    }

    async addProduct(name, user = {}) {
        try {
            if (!name || !name.trim()) return { success: false, message: 'Product name is required' };
            const trimmedName = name.trim();
            const res = await this.pool.query(
                'INSERT INTO products (company_id, name) VALUES ($1, $2) RETURNING id',
                [user.company_id, trimmedName]
            );
            await this.logAction(user.id, user.username, 'CREATE', 'product', res.rows[0].id, { name: trimmedName }, user.company_id);
            return { success: true, id: res.rows[0].id };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    async updateProduct(id, name, user = {}) {
        try {
            const old = await this.pool.query('SELECT name FROM products WHERE id = $1 AND company_id = $2', [id, user.company_id]);
            if (old.rows.length === 0) return { success: false, message: 'Product not found' };
            await this.pool.query('UPDATE products SET name = $1 WHERE id = $2 AND company_id = $3', [name.trim(), id, user.company_id]);
            await this.logAction(user.id, user.username, 'UPDATE', 'product', id, { old_name: old.rows[0]?.name, new_name: name.trim() }, user.company_id);
            return { success: true };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    async deleteProduct(id, user = {}) {
        try {
            const old = await this.pool.query('SELECT name FROM products WHERE id = $1 AND company_id = $2', [id, user.company_id]);
            if (old.rows.length === 0) return { success: false, message: 'Product not found' };
            await this.pool.query('DELETE FROM products WHERE id = $1 AND company_id = $2', [id, user.company_id]);
            await this.logAction(user.id, user.username, 'DELETE', 'product', id, { name: old.rows[0]?.name }, user.company_id);
            return { success: true };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    // ==========================================
    // Suppliers (Scoped to Company)
    // ==========================================
    async getSuppliers(companyId) {
        const res = await this.pool.query(
            'SELECT id, name, location FROM suppliers WHERE company_id = $1 ORDER BY id ASC',
            [companyId]
        );
        return res.rows;
    }

    async addSupplier(name, location, user = {}) {
        try {
            if (!name || !name.trim()) return { success: false, message: 'Supplier name is required' };
            const res = await this.pool.query(
                'INSERT INTO suppliers (company_id, name, location) VALUES ($1, $2, $3) RETURNING id',
                [user.company_id, name.trim(), location ? location.trim() : '']
            );
            await this.logAction(user.id, user.username, 'CREATE', 'supplier', res.rows[0].id, { name: name.trim(), location: location ? location.trim() : '' }, user.company_id);
            return { success: true, id: res.rows[0].id };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    async updateSupplier(id, name, location, user = {}) {
        try {
            const old = await this.pool.query('SELECT name, location FROM suppliers WHERE id = $1 AND company_id = $2', [id, user.company_id]);
            if (old.rows.length === 0) return { success: false, message: 'Supplier not found' };
            await this.pool.query(
                'UPDATE suppliers SET name = $1, location = $2 WHERE id = $3 AND company_id = $4',
                [name.trim(), location ? location.trim() : '', id, user.company_id]
            );
            await this.logAction(user.id, user.username, 'UPDATE', 'supplier', id, { old: old.rows[0], new: { name: name.trim(), location: location ? location.trim() : '' } }, user.company_id);
            return { success: true };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    async deleteSupplier(id, user = {}) {
        try {
            const old = await this.pool.query('SELECT name, location FROM suppliers WHERE id = $1 AND company_id = $2', [id, user.company_id]);
            if (old.rows.length === 0) return { success: false, message: 'Supplier not found' };
            await this.pool.query('DELETE FROM suppliers WHERE id = $1 AND company_id = $2', [id, user.company_id]);
            await this.logAction(user.id, user.username, 'DELETE', 'supplier', id, { name: old.rows[0]?.name, location: old.rows[0]?.location }, user.company_id);
            return { success: true };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    // ==========================================
    // Statistics (Scoped to Company)
    // ==========================================
    async getStats(companyId) {
        const products = await this.pool.query('SELECT COUNT(*) as count FROM products WHERE company_id = $1', [companyId]);
        const suppliers = await this.pool.query('SELECT COUNT(*) as count FROM suppliers WHERE company_id = $1', [companyId]);
        const prices = await this.pool.query('SELECT COUNT(*) as count FROM prices WHERE company_id = $1', [companyId]);
        const pendingUsers = await this.pool.query('SELECT COUNT(*) as count FROM users WHERE company_id = $1 AND status = $2', [companyId, 'pending']);
        const totalUsers = await this.pool.query('SELECT COUNT(*) as count FROM users WHERE company_id = $1', [companyId]);

        return {
            products: parseInt(products.rows[0].count, 10),
            suppliers: parseInt(suppliers.rows[0].count, 10),
            prices: parseInt(prices.rows[0].count, 10),
            pending_users: parseInt(pendingUsers.rows[0].count, 10),
            total_users: parseInt(totalUsers.rows[0].count, 10)
        };
    }

    async getAdvancedStats(companyId) {
        const avgThisWeek = await this.pool.query(`
            SELECT COALESCE(AVG(price), 0) as avg_price
            FROM prices WHERE company_id = $1 AND entry_date >= CURRENT_DATE - INTERVAL '7 days'
        `, [companyId]);
        
        const avgLastWeek = await this.pool.query(`
            SELECT COALESCE(AVG(price), 0) as avg_price
            FROM prices WHERE company_id = $1 AND entry_date >= CURRENT_DATE - INTERVAL '14 days' AND entry_date < CURRENT_DATE - INTERVAL '7 days'
        `, [companyId]);

        const thisWeekAvg = parseFloat(avgThisWeek.rows[0].avg_price);
        const lastWeekAvg = parseFloat(avgLastWeek.rows[0].avg_price);
        const weekChange = lastWeekAvg > 0 ? ((thisWeekAvg - lastWeekAvg) / lastWeekAvg * 100) : 0;

        const volatility = await this.pool.query(`
            SELECT pr.name as product_name, ROUND(CAST(STDDEV(p.price) AS numeric), 2) as volatility,
                   ROUND(CAST(AVG(p.price) AS numeric), 2) as avg_price
            FROM prices p
            JOIN products pr ON p.product_id = pr.id
            WHERE p.company_id = $1 AND p.entry_date >= CURRENT_DATE - INTERVAL '30 days'
            GROUP BY pr.name
            HAVING COUNT(*) > 1
            ORDER BY volatility DESC
            LIMIT 5
        `, [companyId]);

        const cheapestSuppliers = await this.pool.query(`
            SELECT s.name as supplier_name, s.location, ROUND(CAST(AVG(p.price) AS numeric), 2) as avg_price
            FROM prices p
            JOIN suppliers s ON p.supplier_id = s.id
            WHERE p.company_id = $1 AND p.entry_date >= CURRENT_DATE - INTERVAL '30 days'
            GROUP BY s.name, s.location
            ORDER BY avg_price ASC
            LIMIT 5
        `, [companyId]);

        const expensiveSuppliers = await this.pool.query(`
            SELECT s.name as supplier_name, s.location, ROUND(CAST(AVG(p.price) AS numeric), 2) as avg_price
            FROM prices p
            JOIN suppliers s ON p.supplier_id = s.id
            WHERE p.company_id = $1 AND p.entry_date >= CURRENT_DATE - INTERVAL '30 days'
            GROUP BY s.name, s.location
            ORDER BY avg_price DESC
            LIMIT 5
        `, [companyId]);

        const entriesThisWeek = await this.pool.query(`
            SELECT COUNT(*) as count FROM prices WHERE company_id = $1 AND entry_date >= CURRENT_DATE - INTERVAL '7 days'
        `, [companyId]);

        return {
            avg_price_this_week: thisWeekAvg,
            avg_price_last_week: lastWeekAvg,
            week_over_week_change: parseFloat(weekChange.toFixed(2)),
            volatility: volatility.rows,
            cheapest_suppliers: cheapestSuppliers.rows,
            expensive_suppliers: expensiveSuppliers.rows,
            entries_this_week: parseInt(entriesThisWeek.rows[0].count, 10)
        };
    }

    // ==========================================
    // Prices (Scoped to Company)
    // ==========================================
    async getTodayPrices(companyId) {
        const today = new Date().toISOString().split('T')[0];
        const res = await this.pool.query(`
            SELECT p.id, p.price, TO_CHAR(p.entry_date, 'YYYY-MM-DD') as entry_date, p.product_id, p.supplier_id,
                   pr.name as product_name, 
                   s.name as supplier_name, s.location as supplier_location
            FROM prices p
            JOIN products pr ON p.product_id = pr.id
            JOIN suppliers s ON p.supplier_id = s.id
            WHERE p.company_id = $1 AND p.entry_date = $2
            ORDER BY p.id ASC
        `, [companyId, today]);
        return res.rows;
    }

    async insertPrice(data, user = {}) {
        try {
            const { product_id, supplier_id, price, entry_date } = data;
            const date = entry_date || new Date().toISOString().split('T')[0];
            const res = await this.pool.query(
                'INSERT INTO prices (company_id, product_id, supplier_id, price, entry_date) VALUES ($1, $2, $3, $4, $5) RETURNING id',
                [user.company_id, product_id, supplier_id, price, date]
            );
            await this.logAction(user.id, user.username, 'CREATE', 'price', res.rows[0].id, { product_id, supplier_id, price, entry_date: date }, user.company_id);
            return { success: true, id: res.rows[0].id };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    async updatePrice(data, user = {}) {
        try {
            const { id, product_id, supplier_id, price } = data;
            const old = await this.pool.query('SELECT product_id, supplier_id, price FROM prices WHERE id = $1 AND company_id = $2', [id, user.company_id]);
            if (old.rows.length === 0) return { success: false, message: 'Price record not found' };

            await this.pool.query(
                'UPDATE prices SET product_id = $1, supplier_id = $2, price = $3 WHERE id = $4 AND company_id = $5',
                [product_id, supplier_id, price, id, user.company_id]
            );
            await this.logAction(user.id, user.username, 'UPDATE', 'price', id, { old: old.rows[0], new: { product_id, supplier_id, price } }, user.company_id);
            return { success: true };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    async deletePrice(id, user = {}) {
        try {
            const old = await this.pool.query(
                `SELECT p.price, pr.name as product_name, s.name as supplier_name
                 FROM prices p JOIN products pr ON p.product_id = pr.id JOIN suppliers s ON p.supplier_id = s.id
                 WHERE p.id = $1 AND p.company_id = $2`, [id, user.company_id]);
            if (old.rows.length === 0) return { success: false, message: 'Price record not found' };

            await this.pool.query('DELETE FROM prices WHERE id = $1 AND company_id = $2', [id, user.company_id]);
            await this.logAction(user.id, user.username, 'DELETE', 'price', id, old.rows[0] || {}, user.company_id);
            return { success: true };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    async getPrices(filters = {}, companyId) {
        let sql = `
            SELECT p.id, p.price, TO_CHAR(p.entry_date, 'YYYY-MM-DD') as entry_date,
                   pr.name as product_name,
                   s.name as supplier_name, s.location as supplier_location
            FROM prices p
            JOIN products pr ON p.product_id = pr.id
            JOIN suppliers s ON p.supplier_id = s.id
            WHERE p.company_id = $1
        `;
        const params = [companyId];
        let paramIndex = 2;

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

    async getDailyPrices(date, productId, companyId) {
        const res = await this.pool.query(`
            SELECT p.id, p.price, TO_CHAR(p.entry_date, 'YYYY-MM-DD') as entry_date, p.product_id, p.supplier_id,
                   s.name as supplier_name, s.location as supplier_location
            FROM prices p
            JOIN suppliers s ON p.supplier_id = s.id
            WHERE p.company_id = $1 AND p.entry_date = $2 AND p.product_id = $3
            ORDER BY p.price ASC
        `, [companyId, date, productId]);

        const product = await this.pool.query('SELECT name FROM products WHERE id = $1 AND company_id = $2', [productId, companyId]);

        return {
            success: true,
            data: res.rows,
            product_name: product.rows.length > 0 ? product.rows[0].name : ''
        };
    }

    async getEntriesByDate(date, page = 1, limit = 20, companyId) {
        let whereClause = 'WHERE p.company_id = $1';
        const baseParams = [companyId];

        if (date && date.trim() !== '') {
            const cleanDate = date.trim();
            whereClause += ' AND p.entry_date = $2';
            baseParams.push(cleanDate);
        } else {
            const today = new Date().toISOString().split('T')[0];
            whereClause += ' AND p.entry_date = $2';
            baseParams.push(today);
        }

        const countSql = `SELECT COUNT(*) as count FROM prices p ${whereClause}`;
        const countResult = await this.pool.query(countSql, baseParams);
        const total = parseInt(countResult.rows[0].count, 10);

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

    async getPredictions(productId, daysToPredict = 7, companyId) {
        const sql = `
            SELECT entry_date, AVG(price) as avg_price
            FROM prices
            WHERE company_id = $1 AND product_id = $2
            GROUP BY entry_date
            ORDER BY entry_date ASC
            LIMIT 30
        `;
        const res = await this.pool.query(sql, [companyId, productId]);
        const data = res.rows;

        if (data.length < 2) {
            return { success: false, message: 'Not enough historical data in your company to generate predictions (at least 2 days of quotes needed).', historical: [], predictions: [] };
        }

        let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
        const n = data.length;

        data.forEach((row, i) => {
            const x = i;
            const y = parseFloat(row.avg_price);
            sumX += x;
            sumY += y;
            sumXY += x * y;
            sumXX += x * x;
        });

        const denominator = (n * sumXX - sumX * sumX);
        const slope = denominator === 0 ? 0 : (n * sumXY - sumX * sumY) / denominator;
        const intercept = (sumY - slope * sumX) / n;

        const predictions = [];
        const lastDate = new Date(data[n - 1].entry_date);

        for (let i = 1; i <= daysToPredict; i++) {
            const futureDate = new Date(lastDate);
            futureDate.setDate(lastDate.getDate() + i);
            const x = n - 1 + i;
            const predictedPrice = slope * x + intercept;

            predictions.push({
                entry_date: futureDate.toISOString().split('T')[0],
                predicted_price: predictedPrice > 0 ? parseFloat(predictedPrice.toFixed(2)) : 0
            });
        }

        return {
            success: true,
            historical: data.map(d => {
                let dateStr;
                try {
                    dateStr = d.entry_date instanceof Date ? d.entry_date.toISOString().split('T')[0] : new Date(d.entry_date).toISOString().split('T')[0];
                } catch(e) {
                    dateStr = d.entry_date;
                }
                return {
                    entry_date: dateStr,
                    avg_price: parseFloat(d.avg_price).toFixed(2)
                };
            }),
            predictions
        };
    }

    // ==========================================
    // Price Alerts (Scoped to Company)
    // ==========================================
    async getAlerts(companyId) {
        const res = await this.pool.query(`
            SELECT a.id, a.product_id, a.min_price, a.max_price,
                   pr.name as product_name,
                   TO_CHAR(a.created_at, 'YYYY-MM-DD HH24:MI') as created_at
            FROM price_alerts a
            JOIN products pr ON a.product_id = pr.id
            WHERE a.company_id = $1
            ORDER BY a.created_at DESC
        `, [companyId]);
        return res.rows;
    }

    async addAlert(productId, minPrice, maxPrice, user = {}) {
        try {
            const res = await this.pool.query(
                'INSERT INTO price_alerts (company_id, product_id, min_price, max_price) VALUES ($1, $2, $3, $4) RETURNING id',
                [user.company_id, productId, minPrice || null, maxPrice || null]
            );
            await this.logAction(user.id, user.username, 'CREATE', 'alert', res.rows[0].id, { productId, minPrice, maxPrice }, user.company_id);
            return { success: true, id: res.rows[0].id };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    async deleteAlert(id, user = {}) {
        try {
            const old = await this.pool.query('SELECT id FROM price_alerts WHERE id = $1 AND company_id = $2', [id, user.company_id]);
            if (old.rows.length === 0) return { success: false, message: 'Alert not found' };

            await this.pool.query('DELETE FROM price_alerts WHERE id = $1 AND company_id = $2', [id, user.company_id]);
            await this.logAction(user.id, user.username, 'DELETE', 'alert', id, {}, user.company_id);
            return { success: true };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    async getTriggeredAlerts(companyId) {
        const res = await this.pool.query(`
            SELECT a.id as alert_id, pr.name as product_name,
                   a.min_price as threshold_min, a.max_price as threshold_max,
                   p.price, TO_CHAR(p.entry_date, 'YYYY-MM-DD') as entry_date,
                   s.name as supplier_name, s.location as supplier_location,
                   CASE
                       WHEN a.min_price IS NOT NULL AND p.price < a.min_price THEN 'BELOW_MIN'
                       WHEN a.max_price IS NOT NULL AND p.price > a.max_price THEN 'ABOVE_MAX'
                   END as alert_type
            FROM price_alerts a
            JOIN products pr ON a.product_id = pr.id
            JOIN prices p ON p.product_id = a.product_id
            JOIN suppliers s ON p.supplier_id = s.id
            WHERE a.company_id = $1 AND p.company_id = $1
              AND p.entry_date >= CURRENT_DATE - INTERVAL '7 days'
              AND (
                  (a.min_price IS NOT NULL AND p.price < a.min_price) OR
                  (a.max_price IS NOT NULL AND p.price > a.max_price)
              )
            ORDER BY p.entry_date DESC, p.price DESC
            LIMIT 50
        `, [companyId]);
        return res.rows;
    }

    // ==========================================
    // Search (Scoped to Company)
    // ==========================================
    async search(query, companyId) {
        const term = `%${query}%`;

        const products = await this.pool.query(
            `SELECT id, name, 'product' as type FROM products WHERE company_id = $1 AND name ILIKE $2 LIMIT 10`,
            [companyId, term]
        );

        const suppliers = await this.pool.query(
            `SELECT id, name, location, 'supplier' as type FROM suppliers WHERE company_id = $1 AND (name ILIKE $2 OR location ILIKE $2) LIMIT 10`,
            [companyId, term]
        );

        const prices = await this.pool.query(
            `SELECT p.id, pr.name as product_name, s.name as supplier_name, p.price,
                    TO_CHAR(p.entry_date, 'YYYY-MM-DD') as entry_date, 'price' as type
             FROM prices p
             JOIN products pr ON p.product_id = pr.id
             JOIN suppliers s ON p.supplier_id = s.id
             WHERE p.company_id = $1 AND (pr.name ILIKE $2 OR s.name ILIKE $2)
             ORDER BY p.entry_date DESC
             LIMIT 10`,
            [companyId, term]
        );

        return {
            products: products.rows,
            suppliers: suppliers.rows,
            prices: prices.rows
        };
    }
}

module.exports = AppDatabase;
