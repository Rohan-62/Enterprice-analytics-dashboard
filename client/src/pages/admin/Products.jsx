import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import api from '../../api';

function Products() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await api.getProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const result = await api.addProduct(name);
            if (result.success) {
                setName('');
                loadData();
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            alert('Error adding product');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure? This may fail if the product is linked to existing price entries.')) return;
        try {
            const result = await api.deleteProduct(id);
            if (result.success) {
                loadData();
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            alert('Error deleting product');
        }
    };

    const handleEdit = async (product) => {
        const newName = window.prompt('Enter new product name:', product.name);
        if (newName && newName !== product.name) {
            try {
                const result = await api.updateProduct(product.id, newName);
                if (result.success) {
                    loadData();
                } else {
                    alert('Error: ' + result.message);
                }
            } catch (error) {
                alert('Error updating product');
            }
        }
    };

    return (
        <div className="container">
            <div className="page-header" style={{ marginBottom: '24px' }}>
                <NavLink to="/admin" className="btn btn-secondary" style={{ float: 'left', marginTop: '10px' }}>&larr; Back to Admin</NavLink>
                <h1 className="page-title" style={{ clear: 'both' }}>Manage Products</h1>
            </div>

            <div className="card mb-4">
                <div className="card-header">
                    <h3 className="card-title">Add New Product</h3>
                </div>
                <form onSubmit={handleAdd} className="flex gap-2">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Product Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required 
                        style={{ flex: 1 }}
                    />
                    <button type="submit" className="btn btn-primary">Add Product</button>
                </form>
            </div>

            <div className="card">
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="3" className="text-center">Loading...</td></tr>
                            ) : products.length === 0 ? (
                                <tr><td colSpan="3" className="text-center">No products found</td></tr>
                            ) : (
                                products.map(p => (
                                    <tr key={p.id}>
                                        <td>{p.id}</td>
                                        <td>{p.name}</td>
                                        <td>
                                            <button className="btn btn-secondary btn-sm" style={{ marginRight: '8px' }} onClick={() => handleEdit(p)}>Edit</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>Delete</button>
                                        </td>
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

export default Products;
