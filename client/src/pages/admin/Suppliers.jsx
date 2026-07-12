import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import api from '../../api';

function Suppliers() {
    const [suppliers, setSuppliers] = useState([]);
    const [formData, setFormData] = useState({ name: '', location: '' });
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await api.getSuppliers();
            setSuppliers(data);
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
            const result = await api.addSupplier(formData.name, formData.location);
            if (result.success) {
                setFormData({ name: '', location: '' });
                loadData();
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            alert('Error adding supplier');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure? This may fail if the supplier is linked to existing price entries.')) return;
        try {
            const result = await api.deleteSupplier(id);
            if (result.success) {
                loadData();
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            alert('Error deleting supplier');
        }
    };

    const handleEdit = async (supplier) => {
        const newName = window.prompt('Enter new supplier name:', supplier.name);
        const newLocation = window.prompt('Enter new supplier location:', supplier.location);
        
        if (newName && newLocation && (newName !== supplier.name || newLocation !== supplier.location)) {
            try {
                const result = await api.updateSupplier(supplier.id, newName, newLocation);
                if (result.success) {
                    loadData();
                } else {
                    alert('Error: ' + result.message);
                }
            } catch (error) {
                alert('Error updating supplier');
            }
        }
    };

    return (
        <div className="container">
            <div className="page-header" style={{ marginBottom: '24px' }}>
                <NavLink to="/admin" className="btn btn-secondary" style={{ float: 'left', marginTop: '10px' }}>&larr; Back to Admin</NavLink>
                <h1 className="page-title" style={{ clear: 'both' }}>Manage Suppliers</h1>
            </div>

            <div className="card mb-4">
                <div className="card-header">
                    <h3 className="card-title">Add New Supplier</h3>
                </div>
                <form onSubmit={handleAdd} className="form-grid">
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Supplier Name" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Location/Region" 
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                            required 
                        />
                    </div>
                    <div className="form-group form-full">
                        <button type="submit" className="btn btn-primary btn-block">Add Supplier</button>
                    </div>
                </form>
            </div>

            <div className="card">
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="4" className="text-center">Loading...</td></tr>
                            ) : suppliers.length === 0 ? (
                                <tr><td colSpan="4" className="text-center">No suppliers found</td></tr>
                            ) : (
                                suppliers.map(s => (
                                    <tr key={s.id}>
                                        <td>{s.id}</td>
                                        <td>{s.name}</td>
                                        <td>{s.location}</td>
                                        <td>
                                            <button className="btn btn-secondary btn-sm" style={{ marginRight: '8px' }} onClick={() => handleEdit(s)}>Edit</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s.id)}>Delete</button>
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

export default Suppliers;
