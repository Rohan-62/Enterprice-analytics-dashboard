import React from 'react';
import { Download, Printer } from 'lucide-react';

const ReportExport = ({ data, filename = "report" }) => {
    
    const handleExportCSV = () => {
        if (!data || data.length === 0) return;
        
        // Get headers from first object
        const headers = Object.keys(data[0]);
        
        // Create CSV rows
        const csvRows = [
            headers.join(','), // Header row
            ...data.map(row => headers.map(header => {
                let cell = row[header] === null || row[header] === undefined ? '' : row[header];
                // Escape commas and quotes
                cell = String(cell).replace(/"/g, '""');
                return `"${cell}"`;
            }).join(','))
        ];
        
        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="export-bar">
            <button className="btn-export" onClick={handlePrint} disabled={!data || data.length === 0}>
                <Printer size={16} /> Print Report
            </button>
            <button className="btn-export" onClick={handleExportCSV} disabled={!data || data.length === 0}>
                <Download size={16} /> Export CSV
            </button>
        </div>
    );
};

export default ReportExport;
