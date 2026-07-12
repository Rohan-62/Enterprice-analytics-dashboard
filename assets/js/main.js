// Main JavaScript for Electron renderer
// Modal functions
function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});

// Close modal when clicking overlay
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
    }
});

// Format date helper
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Escape HTML helper
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Insert price function (for home page)
async function insertPrice(formData) {
    const data = {
        product_id: parseInt(formData.get('product_id')),
        supplier_id: parseInt(formData.get('supplier_id')),
        price: parseFloat(formData.get('price')),
        entry_date: formData.get('entry_date')
    };

    try {
        const result = await window.api.insertPrice(data);
        return result;
    } catch (error) {
        console.error('Error inserting price:', error);
        return { success: false, message: error.message };
    }
}
