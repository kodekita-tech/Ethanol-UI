// CRUD Operations Helper

const CRUDHelper = {
    // Show add modal
    showAddModal(modalId) {
        const modal = new bootstrap.Modal(document.getElementById(modalId));
        const form = document.querySelector(`#${modalId} form`);
        if (form) {
            form.reset();
            // Remove any validation classes
            form.querySelectorAll('.is-invalid').forEach(el => {
                el.classList.remove('is-invalid');
            });
        }
        modal.show();
    },
    
    // Show edit modal with data
    showEditModal(modalId, data) {
        const modal = new bootstrap.Modal(document.getElementById(modalId));
        const form = document.querySelector(`#${modalId} form`);
        
        if (form && data) {
            // Populate form fields
            Object.keys(data).forEach(key => {
                const input = form.querySelector(`[name="${key}"]`);
                if (input) {
                    input.value = data[key];
                }
            });
            
            // Remove validation classes
            form.querySelectorAll('.is-invalid').forEach(el => {
                el.classList.remove('is-invalid');
            });
        }
        
        modal.show();
    },
    
    // Handle delete with confirmation
    handleDelete(id, callback) {
        SwalHelper.confirmDelete().then((result) => {
            if (result.isConfirmed) {
                if (callback && typeof callback === 'function') {
                    callback(id);
                } else {
                    // Default delete action
                    SwalHelper.showSuccess('Data deleted successfully!');
                }
            }
        });
    },
    
    // Validate form
    validateForm(formId) {
        const form = document.getElementById(formId);
        if (!form) return false;
        
        let isValid = true;
        
        // Remove previous validation
        form.querySelectorAll('.is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
        });
        
        // Check required fields
        form.querySelectorAll('[required]').forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            }
        });
        
        // Check email format
        form.querySelectorAll('input[type="email"]').forEach(field => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (field.value && !emailRegex.test(field.value)) {
                field.classList.add('is-invalid');
                isValid = false;
            }
        });
        
        return isValid;
    },
    
    // Reset form
    resetForm(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.reset();
            form.querySelectorAll('.is-invalid').forEach(el => {
                el.classList.remove('is-invalid');
            });
        }
    }
};

