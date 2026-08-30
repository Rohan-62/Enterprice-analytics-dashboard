import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { api } from '../../api';
import { 
    UserCheck, UserX, Trash2, ArrowLeft, Shield, Users as UsersIcon, 
    Clock, CheckCircle2, XCircle, AlertCircle, RefreshCw, KeyRound, 
    UserPlus, Search, X
} from 'lucide-react';

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'approved' | 'rejected'
    const [searchQuery, setSearchQuery] = useState('');
    const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: '' }

    // Modals
    const [showAddModal, setShowAddModal] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newRole, setNewRole] = useState('user');
    const [addLoading, setAddLoading] = useState(false);

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [resetPassword, setResetPassword] = useState('');
    const [resetLoading, setResetLoading] = useState(false);

    const currentUsername = localStorage.getItem('username');

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await api.getUsers();
            if (Array.isArray(data)) {
                setUsers(data);
            } else {
                setUsers([]);
            }
        } catch (error) {
            console.error('Error loading users:', error);
            showFeedback('error', 'Failed to load company users.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const showFeedback = (type, message) => {
        setFeedback({ type, message });
        setTimeout(() => setFeedback(null), 4500);
    };

    // Status change (Approve, Reject, Revoke)
    const handleStatusChange = async (userId, newStatus, targetUsername) => {
        try {
            const result = await api.updateUserStatus(userId, newStatus);
            if (result.success) {
                showFeedback('success', `User "${targetUsername}" is now ${newStatus}.`);
                loadUsers();
            } else {
                showFeedback('error', result.message || 'Failed to update user status.');
            }
        } catch (error) {
            showFeedback('error', 'Error updating user status.');
        }
    };

    // Role change
    const handleRoleChange = async (userId, newRole, targetUsername) => {
        try {
            const result = await api.updateUserRole(userId, newRole);
            if (result.success) {
                showFeedback('success', `User "${targetUsername}" role updated to ${newRole}.`);
                loadUsers();
            } else {
                showFeedback('error', result.message || 'Failed to update user role.');
            }
        } catch (error) {
            showFeedback('error', 'Error updating user role.');
        }
    };

    // Delete user
    const handleDelete = async (userId, targetUsername) => {
        if (!window.confirm(`Are you sure you want to permanently delete user "${targetUsername}" from your company? This cannot be undone.`)) {
            return;
        }

        try {
            const result = await api.deleteUser(userId);
            if (result.success) {
                showFeedback('success', `User "${targetUsername}" was deleted successfully.`);
                loadUsers();
            } else {
                showFeedback('error', result.message || 'Failed to delete user.');
            }
        } catch (error) {
            showFeedback('error', 'Error deleting user.');
        }
    };

    // Direct Add User
    const handleAddUser = async (e) => {
        e.preventDefault();
        setAddLoading(true);
        try {
            const result = await api.addUser({
                username: newUsername,
                password: newPassword,
                role: newRole
            });
            if (result.success) {
                showFeedback('success', result.message || `User "${newUsername}" added successfully.`);
                setShowAddModal(false);
                setNewUsername('');
                setNewPassword('');
                setNewRole('user');
                loadUsers();
            } else {
                showFeedback('error', result.message || 'Failed to add user.');
            }
        } catch (error) {
            showFeedback('error', 'Error adding user.');
        } finally {
            setAddLoading(false);
        }
    };

    // Reset Password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!selectedUser) return;
        setResetLoading(true);
        try {
            const result = await api.resetUserPassword(selectedUser.id, resetPassword);
            if (result.success) {
                showFeedback('success', `Password for "${selectedUser.username}" reset successfully.`);
                setShowPasswordModal(false);
                setSelectedUser(null);
                setResetPassword('');
            } else {
                showFeedback('error', result.message || 'Failed to reset password.');
            }
        } catch (error) {
            showFeedback('error', 'Error resetting password.');
        } finally {
            setResetLoading(false);
        }
    };

    const pendingCount = users.filter(u => u.status === 'pending').length;
    const approvedCount = users.filter(u => u.status === 'approved').length;
    const rejectedCount = users.filter(u => u.status === 'rejected').length;

    const filteredUsers = users.filter(u => {
        // Status filter
        if (filter === 'pending' && u.status !== 'pending') return false;
        if (filter === 'approved' && u.status !== 'approved') return false;
        if (filter === 'rejected' && u.status !== 'rejected') return false;
        
        // Search query
        if (searchQuery.trim()) {
            return u.username.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return true;
    });

    return (
        <div className="container" style={{ position: 'relative' }}>
            {/* Header */}
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                    <NavLink to="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', textDecoration: 'none', marginBottom: '8px', fontSize: '0.88rem', fontWeight: '500' }}>
                        <ArrowLeft size={16} /> Back to Dashboard
                    </NavLink>
                    <h1 className="page-title">Company User Management</h1>
                    <p className="page-subtitle">Full administrative control: approve, add, modify roles, reset passwords, and remove members</p>
                </div>
                
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button 
                        onClick={() => setShowAddModal(true)} 
                        className="btn btn-primary btn-sm"
                        style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                        <UserPlus size={15} /> Add Member
                    </button>
                    <button 
                        onClick={loadUsers} 
                        className="btn btn-secondary btn-sm" 
                        style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                        title="Refresh user list"
                    >
                        <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
                    </button>
                </div>
            </div>

            {/* Feedback Alert */}
            {feedback && (
                <div style={{
                    backgroundColor: feedback.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    border: `1px solid ${feedback.type === 'success' ? '#10b981' : 'var(--danger)'}`,
                    color: feedback.type === 'success' ? '#10b981' : 'var(--danger)',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: '500',
                    fontSize: '0.9rem'
                }}>
                    {feedback.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    <span>{feedback.message}</span>
                </div>
            )}

            {/* Summary Cards */}
            <div className="grid grid-3 mb-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                <div 
                    className="card text-center" 
                    onClick={() => setFilter('pending')}
                    style={{ 
                        cursor: 'pointer',
                        border: filter === 'pending' ? '2px solid var(--warning)' : (pendingCount > 0 ? '1px solid var(--warning)' : '1px solid var(--border)'),
                        background: pendingCount > 0 ? 'rgba(245, 158, 11, 0.05)' : 'var(--bg-card)'
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', color: 'var(--warning)', fontWeight: '600' }}>
                        <Clock size={18} /> Pending Approvals
                    </div>
                    <div className="stat-value mt-2" style={{ color: pendingCount > 0 ? 'var(--warning)' : 'inherit' }}>
                        {pendingCount}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {pendingCount === 1 ? '1 user waiting for approval' : `${pendingCount} users waiting for approval`}
                    </div>
                </div>

                <div 
                    className="card text-center" 
                    onClick={() => setFilter('approved')}
                    style={{ 
                        cursor: 'pointer',
                        border: filter === 'approved' ? '2px solid #10b981' : '1px solid var(--border)'
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', color: '#10b981', fontWeight: '600' }}>
                        <CheckCircle2 size={18} /> Active Members
                    </div>
                    <div className="stat-value mt-2">
                        {approvedCount}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        Authorized dashboard users
                    </div>
                </div>

                <div 
                    className="card text-center" 
                    onClick={() => setFilter('all')}
                    style={{ 
                        cursor: 'pointer',
                        border: filter === 'all' ? '2px solid var(--primary)' : '1px solid var(--border)'
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontWeight: '600' }}>
                        <UsersIcon size={18} /> Total Registered
                    </div>
                    <div className="stat-value mt-2">
                        {users.length}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        All organization accounts
                    </div>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                        className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setFilter('all')}
                    >
                        All ({users.length})
                    </button>
                    <button
                        className={`btn btn-sm ${filter === 'pending' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setFilter('pending')}
                        style={pendingCount > 0 && filter !== 'pending' ? { borderColor: 'var(--warning)', color: 'var(--warning)' } : {}}
                    >
                        Pending {pendingCount > 0 && `(${pendingCount})`}
                    </button>
                    <button
                        className={`btn btn-sm ${filter === 'approved' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setFilter('approved')}
                    >
                        Approved ({approvedCount})
                    </button>
                    <button
                        className={`btn btn-sm ${filter === 'rejected' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setFilter('rejected')}
                    >
                        Rejected ({rejectedCount})
                    </button>
                </div>

                <div style={{ position: 'relative', width: '220px' }}>
                    <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search username..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="form-control"
                        style={{ paddingLeft: '30px', fontSize: '0.82rem', height: '34px' }}
                    />
                </div>
            </div>

            {/* Users Table */}
            <div className="card">
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Joined / Requested</th>
                                <th style={{ textAlign: 'right' }}>Admin Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" className="text-center" style={{ padding: '30px' }}>Loading company users...</td></tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center" style={{ padding: '30px', color: 'var(--text-muted)' }}>
                                        {filter === 'pending' ? 'No pending approval requests.' : 'No users match the search criteria.'}
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map(u => {
                                    const isSelf = u.username === currentUsername;
                                    return (
                                        <tr key={u.id}>
                                            <td style={{ fontWeight: '600' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <span>{u.username}</span>
                                                    {isSelf && (
                                                        <span style={{ fontSize: '0.7rem', padding: '1px 6px', borderRadius: '4px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)' }}>
                                                            (You)
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                {isSelf ? (
                                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                                        <Shield size={12} /> {u.role.toUpperCase()}
                                                    </span>
                                                ) : (
                                                    <select
                                                        value={u.role}
                                                        onChange={(e) => handleRoleChange(u.id, e.target.value, u.username)}
                                                        className="form-control"
                                                        style={{ width: 'auto', padding: '3px 8px', fontSize: '0.8rem', height: 'auto' }}
                                                    >
                                                        <option value="user">Standard User</option>
                                                        <option value="admin">Administrator</option>
                                                    </select>
                                                )}
                                            </td>
                                            <td>
                                                {u.status === 'approved' && (
                                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                                        <CheckCircle2 size={12} /> Approved
                                                    </span>
                                                )}
                                                {u.status === 'pending' && (
                                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', color: 'var(--warning)', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                                        <Clock size={12} /> Pending Approval
                                                    </span>
                                                )}
                                                {u.status === 'rejected' && (
                                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                                        <XCircle size={12} /> Rejected
                                                    </span>
                                                )}
                                            </td>
                                            <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                                {u.created_at || '—'}
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                                    {/* If Pending: show Approve and Reject buttons */}
                                                    {u.status === 'pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleStatusChange(u.id, 'approved', u.username)}
                                                                className="btn btn-sm"
                                                                style={{ backgroundColor: '#10b981', color: 'white', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                                                                title="Allow user to enter company"
                                                            >
                                                                <UserCheck size={14} /> Allow Access
                                                            </button>
                                                            <button
                                                                onClick={() => handleStatusChange(u.id, 'rejected', u.username)}
                                                                className="btn btn-sm btn-danger"
                                                                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                                                                title="Decline request"
                                                            >
                                                                <UserX size={14} /> Decline
                                                            </button>
                                                        </>
                                                    )}

                                                    {/* If Approved: show Deactivate button if not self */}
                                                    {u.status === 'approved' && !isSelf && (
                                                        <button
                                                            onClick={() => handleStatusChange(u.id, 'rejected', u.username)}
                                                            className="btn btn-secondary btn-sm"
                                                            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}
                                                            title="Revoke access"
                                                        >
                                                            <UserX size={13} /> Revoke
                                                        </button>
                                                    )}

                                                    {/* If Rejected: show Re-Approve button */}
                                                    {u.status === 'rejected' && (
                                                        <button
                                                            onClick={() => handleStatusChange(u.id, 'approved', u.username)}
                                                            className="btn btn-sm"
                                                            style={{ backgroundColor: '#10b981', color: 'white', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}
                                                            title="Allow access"
                                                        >
                                                            <UserCheck size={13} /> Approve
                                                        </button>
                                                    )}

                                                    {/* Reset Password Button */}
                                                    {!isSelf && (
                                                        <button
                                                            onClick={() => { setSelectedUser(u); setShowPasswordModal(true); }}
                                                            className="btn btn-secondary btn-sm"
                                                            style={{ padding: '5px 8px' }}
                                                            title="Reset password for this user"
                                                        >
                                                            <KeyRound size={13} />
                                                        </button>
                                                    )}

                                                    {/* Delete user button (except self) */}
                                                    {!isSelf && (
                                                        <button
                                                            onClick={() => handleDelete(u.id, u.username)}
                                                            className="btn btn-danger btn-sm"
                                                            style={{ padding: '5px 8px' }}
                                                            title="Permanently delete user"
                                                        >
                                                            <Trash2 size={13} />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal: Direct Add User */}
            {showAddModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '20px'
                }}>
                    <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '24px', position: 'relative' }}>
                        <button 
                            onClick={() => setShowAddModal(false)}
                            style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                        >
                            <X size={18} />
                        </button>

                        <h3 style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)' }}>
                            <UserPlus size={20} /> Add New Company Member
                        </h3>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
                            Directly create and activate an approved user account.
                        </p>

                        <form onSubmit={handleAddUser}>
                            <div className="form-group">
                                <label>Username *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="e.g. john_doe"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group" style={{ marginTop: '12px' }}>
                                <label>Initial Password *</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="••••••••"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group" style={{ marginTop: '12px' }}>
                                <label>Role *</label>
                                <select
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value)}
                                    className="form-control"
                                >
                                    <option value="user">Standard User (Analytics & Forecasts)</option>
                                    <option value="admin">Administrator (Full Access)</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'flex-end' }}>
                                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-secondary btn-sm">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary btn-sm" disabled={addLoading}>
                                    {addLoading ? 'Creating...' : 'Create Member'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Reset Password */}
            {showPasswordModal && selectedUser && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '20px'
                }}>
                    <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '24px', position: 'relative' }}>
                        <button 
                            onClick={() => { setShowPasswordModal(false); setSelectedUser(null); }}
                            style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                        >
                            <X size={18} />
                        </button>

                        <h3 style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)' }}>
                            <KeyRound size={20} /> Reset Password
                        </h3>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
                            Set a new password for <strong>{selectedUser.username}</strong>.
                        </p>

                        <form onSubmit={handleResetPassword}>
                            <div className="form-group">
                                <label>New Password *</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter new secure password"
                                    value={resetPassword}
                                    onChange={(e) => setResetPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'flex-end' }}>
                                <button type="button" onClick={() => { setShowPasswordModal(false); setSelectedUser(null); }} className="btn btn-secondary btn-sm">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary btn-sm" disabled={resetLoading}>
                                    {resetLoading ? 'Resetting...' : 'Save Password'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Users;
