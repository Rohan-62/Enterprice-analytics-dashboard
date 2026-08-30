import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { api } from '../../api';
import { UserCheck, UserX, Trash2, ArrowLeft, Shield, Users as UsersIcon, Clock, CheckCircle2, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'approved' | 'rejected'
    const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: '' }
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
        setTimeout(() => setFeedback(null), 4000);
    };

    const handleStatusChange = async (userId, newStatus, targetUsername) => {
        try {
            const result = await api.updateUserStatus(userId, newStatus);
            if (result.success) {
                showFeedback('success', `User "${targetUsername}" status set to ${newStatus}.`);
                loadUsers();
            } else {
                showFeedback('error', result.message || 'Failed to update user status.');
            }
        } catch (error) {
            showFeedback('error', 'Error updating user status.');
        }
    };

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

    const handleDelete = async (userId, targetUsername) => {
        if (!window.confirm(`Are you sure you want to permanently remove user "${targetUsername}" from your organization?`)) {
            return;
        }

        try {
            const result = await api.deleteUser(userId);
            if (result.success) {
                showFeedback('success', `User "${targetUsername}" removed successfully.`);
                loadUsers();
            } else {
                showFeedback('error', result.message || 'Failed to remove user.');
            }
        } catch (error) {
            showFeedback('error', 'Error removing user.');
        }
    };

    const pendingCount = users.filter(u => u.status === 'pending').length;
    const approvedCount = users.filter(u => u.status === 'approved').length;
    const rejectedCount = users.filter(u => u.status === 'rejected').length;

    const filteredUsers = users.filter(u => {
        if (filter === 'pending') return u.status === 'pending';
        if (filter === 'approved') return u.status === 'approved';
        if (filter === 'rejected') return u.status === 'rejected';
        return true;
    });

    return (
        <div className="container">
            {/* Header */}
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <NavLink to="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', textDecoration: 'none', marginBottom: '8px', fontSize: '0.88rem', fontWeight: '500' }}>
                        <ArrowLeft size={16} /> Back to Dashboard
                    </NavLink>
                    <h1 className="page-title">User Approvals & Team Management</h1>
                    <p className="page-subtitle">Control who can access your company dashboard and manage roles</p>
                </div>
                <button onClick={loadUsers} className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
                </button>
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

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                <button
                    className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setFilter('all')}
                >
                    All Users ({users.length})
                </button>
                <button
                    className={`btn btn-sm ${filter === 'pending' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setFilter('pending')}
                    style={pendingCount > 0 && filter !== 'pending' ? { borderColor: 'var(--warning)', color: 'var(--warning)' } : {}}
                >
                    Pending Approvals {pendingCount > 0 && `(${pendingCount})`}
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
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" className="text-center" style={{ padding: '30px' }}>Loading company users...</td></tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center" style={{ padding: '30px', color: 'var(--text-muted)' }}>
                                        {filter === 'pending' ? 'No pending approval requests! All users are up to date.' : 'No users found matching this filter.'}
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

                                                    {/* Delete user button (except self) */}
                                                    {!isSelf && (
                                                        <button
                                                            onClick={() => handleDelete(u.id, u.username)}
                                                            className="btn btn-danger btn-sm"
                                                            style={{ padding: '5px 8px' }}
                                                            title="Delete user"
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
        </div>
    );
}

export default Users;
