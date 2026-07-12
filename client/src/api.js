const API_BASE = 'http://localhost:3000/api';

async function apiCall(url, options = {}) {
    const token = sessionStorage.getItem('jwt_token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };

    const response = await fetch(API_BASE + url, {
        headers,
        ...options
    });
    if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
}

const api = {
    // Products
    getProducts: () => apiCall('/products'),
    addProduct: (name) => apiCall('/products', {
        method: 'POST',
        body: JSON.stringify({ name })
    }),
    updateProduct: (id, name) => apiCall(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name })
    }),
    deleteProduct: (id) => apiCall(`/products/${id}`, {
        method: 'DELETE'
    }),

    // Suppliers
    getSuppliers: () => apiCall('/suppliers'),
    addSupplier: (name, location) => apiCall('/suppliers', {
        method: 'POST',
        body: JSON.stringify({ name, location })
    }),
    updateSupplier: (id, name, location) => apiCall(`/suppliers/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, location })
    }),
    deleteSupplier: (id) => apiCall(`/suppliers/${id}`, {
        method: 'DELETE'
    }),

    // Statistics
    getStats: () => apiCall('/stats'),

    // Prices
    getTodayPrices: () => apiCall('/prices/today'),
    insertPrice: (data) => apiCall('/prices', {
        method: 'POST',
        body: JSON.stringify(data)
    }),
    updatePrice: (data) => apiCall(`/prices/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    }),
    deletePrice: (id) => apiCall(`/prices/${id}`, {
        method: 'DELETE'
    }),
    getPrices: (filters) => apiCall('/prices?' + new URLSearchParams(filters || {}).toString()),
    getDailyPrices: (date, productId) => apiCall(`/prices/daily?date=${encodeURIComponent(date)}&product_id=${encodeURIComponent(productId)}`),

    // Auth
    userLogin: (username, password) => apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
    }),
    getEntriesByDate: (date, page, limit) => apiCall(`/entries?date=${encodeURIComponent(date || '')}&page=${page || 1}&limit=${limit || 20}`)
};

export default api;
