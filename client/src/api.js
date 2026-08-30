const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:3000/api');

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
};

export const api = {
    // --- Auth ---
    async login(username, password, companyCode = '') {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, companyCode })
        });
        return response.json();
    },

    async registerCompany(companyName, username, password) {
        const response = await fetch(`${API_URL}/auth/register-company`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ companyName, username, password })
        });
        return response.json();
    },

    async registerUser(username, password, role, companyCode) {
        const response = await fetch(`${API_URL}/auth/register-user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, role, companyCode })
        });
        return response.json();
    },

    // --- Stats ---
    async getStats() {
        const response = await fetch(`${API_URL}/stats`, { headers: getHeaders() });
        return response.json();
    },

    async getAdvancedStats() {
        const response = await fetch(`${API_URL}/stats/advanced`, { headers: getHeaders() });
        return response.json();
    },

    // --- Products ---
    async getProducts() {
        const response = await fetch(`${API_URL}/products`, { headers: getHeaders() });
        return response.json();
    },

    async addProduct(name) {
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ name })
        });
        return response.json();
    },

    async updateProduct(id, name) {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ name })
        });
        return response.json();
    },

    async deleteProduct(id) {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        return response.json();
    },

    // --- Suppliers ---
    async getSuppliers() {
        const response = await fetch(`${API_URL}/suppliers`, { headers: getHeaders() });
        return response.json();
    },

    async addSupplier(name, location) {
        const response = await fetch(`${API_URL}/suppliers`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ name, location })
        });
        return response.json();
    },

    async updateSupplier(id, name, location) {
        const response = await fetch(`${API_URL}/suppliers/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ name, location })
        });
        return response.json();
    },

    async deleteSupplier(id) {
        const response = await fetch(`${API_URL}/suppliers/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        return response.json();
    },

    // --- Prices (Admin Entries) ---
    async getEntries(date = '', page = 1, limit = 20) {
        const query = new URLSearchParams();
        if (date) query.append('date', date);
        query.append('page', page);
        query.append('limit', limit);
        
        const response = await fetch(`${API_URL}/entries?${query.toString()}`, { headers: getHeaders() });
        return response.json();
    },

    async getEntriesByDate(date = '', page = 1, limit = 20) {
        return this.getEntries(date, page, limit);
    },

    async insertPrice(data) {
        const response = await fetch(`${API_URL}/prices`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        return response.json();
    },

    async addPrice(data) {
        return this.insertPrice(data);
    },

    async updatePrice(idOrData, data) {
        const id = (idOrData && typeof idOrData === 'object') ? idOrData.id : idOrData;
        const bodyData = (idOrData && typeof idOrData === 'object') ? idOrData : data;
        const response = await fetch(`${API_URL}/prices/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(bodyData)
        });
        return response.json();
    },

    async deletePrice(id) {
        const response = await fetch(`${API_URL}/prices/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        return response.json();
    },

    // --- Analytics / Prices ---
    async getTodayPrices() {
        const response = await fetch(`${API_URL}/prices/today`, { headers: getHeaders() });
        return response.json();
    },

    async getDailyAnalysis(date, product_id) {
        const response = await fetch(`${API_URL}/prices/daily?date=${date}&product_id=${product_id}`, { headers: getHeaders() });
        return response.json();
    },

    async getDailyPrices(date, product_id) {
        return this.getDailyAnalysis(date, product_id);
    },

    async getFilteredPrices(filters) {
        const query = new URLSearchParams();
        if (filters.product_id) query.append('product_id', filters.product_id);
        if (filters.supplier_id) query.append('supplier_id', filters.supplier_id);
        if (filters.start_date) query.append('start_date', filters.start_date);
        if (filters.end_date) query.append('end_date', filters.end_date);
        
        const response = await fetch(`${API_URL}/prices?${query.toString()}`, { headers: getHeaders() });
        return response.json();
    },

    // --- Predictive Analysis ---
    async getPredictions(productId, days = 7) {
        const response = await fetch(`${API_URL}/predict/${productId}?days=${days}`, { headers: getHeaders() });
        return response.json();
    },

    // --- Price Alerts ---
    async getAlerts() {
        const response = await fetch(`${API_URL}/alerts`, { headers: getHeaders() });
        return response.json();
    },

    async addAlert(data) {
        const response = await fetch(`${API_URL}/alerts`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        return response.json();
    },

    async deleteAlert(id) {
        const response = await fetch(`${API_URL}/alerts/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        return response.json();
    },

    async getTriggeredAlerts() {
        const response = await fetch(`${API_URL}/alerts/triggered`, { headers: getHeaders() });
        return response.json();
    },

    // --- Search ---
    async search(query) {
        const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`, { headers: getHeaders() });
        return response.json();
    },

    // --- Audit Logs ---
    async getAuditLogs(page = 1, limit = 25) {
        const response = await fetch(`${API_URL}/audit-logs?page=${page}&limit=${limit}`, { headers: getHeaders() });
        return response.json();
    },

    // --- User Approvals & Management (Admin Only) ---
    async getUsers() {
        const response = await fetch(`${API_URL}/users`, { headers: getHeaders() });
        return response.json();
    },

    async updateUserStatus(id, status) {
        const response = await fetch(`${API_URL}/users/${id}/status`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ status })
        });
        return response.json();
    },

    async updateUserRole(id, role) {
        const response = await fetch(`${API_URL}/users/${id}/role`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ role })
        });
        return response.json();
    },

    async addUser(data) {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        return response.json();
    },

    async resetUserPassword(id, password) {
        const response = await fetch(`${API_URL}/users/${id}/password`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ password })
        });
        return response.json();
    },

    async deleteUser(id) {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        return response.json();
    }
};
