import React, { useState, useEffect } from 'react';
import { api } from '../../api';
import { ClipboardList, ChevronLeft, ChevronRight } from 'lucide-react';

const AuditLog = () => {
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalLogs, setTotalLogs] = useState(0);

    const fetchLogs = async (currentPage) => {
        try {
            setIsLoading(true);
            const response = await api.getAuditLogs(currentPage, 25);
            setLogs(response.data);
            setTotalPages(response.pagination.totalPages);
            setTotalLogs(response.pagination.total);
        } catch (err) {
            console.error('Failed to load audit logs:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs(page);
    }, [page]);

    const getActionBadgeClass = (action) => {
        switch(action) {
            case 'CREATE': return 'audit-badge audit-badge-create';
            case 'UPDATE': return 'audit-badge audit-badge-update';
            case 'DELETE': return 'audit-badge audit-badge-delete';
            default: return 'audit-badge';
        }
    };

    return (
        <div className="container">
            <div className="page-header">
                <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ClipboardList size={28} /> Activity Audit Log
                </h1>
                <p className="page-subtitle">Track all system changes and activity ({totalLogs} records)</p>
            </div>

            <div className="card">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Timestamp</th>
                                <th>User</th>
                                <th>Action</th>
                                <th>Entity Type</th>
                                <th>Entity ID</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan="6" className="text-center">Loading logs...</td></tr>
                            ) : logs.length === 0 ? (
                                <tr><td colSpan="6" className="text-center">No activity recorded yet.</td></tr>
                            ) : (
                                logs.map(log => (
                                    <tr key={log.id}>
                                        <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{log.created_at}</td>
                                        <td style={{ fontWeight: 600 }}>{log.username}</td>
                                        <td>
                                            <span className={getActionBadgeClass(log.action)}>
                                                {log.action}
                                            </span>
                                        </td>
                                        <td style={{ textTransform: 'capitalize' }}>{log.entity_type}</td>
                                        <td>{log.entity_id}</td>
                                        <td>
                                            <div className="audit-details" title={log.details}>
                                                {log.details}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="pagination">
                        <button 
                            className="pagination-btn" 
                            disabled={page === 1 || isLoading}
                            onClick={() => setPage(p => p - 1)}
                        >
                            <ChevronLeft size={16} /> Prev
                        </button>
                        <span className="pagination-info">Page {page} of {totalPages}</span>
                        <button 
                            className="pagination-btn" 
                            disabled={page === totalPages || isLoading}
                            onClick={() => setPage(p => p + 1)}
                        >
                            Next <ChevronRight size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuditLog;
