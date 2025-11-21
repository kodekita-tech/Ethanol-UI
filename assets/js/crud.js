/**
 * CRUD Operations Helper
 * Reusable functions for CRUD operations
 */

(function() {
    'use strict';

    const CRUDHelper = {
        // Initialize CRUD
        init: function() {
            this.initModals();
            this.initForms();
        },

        // Initialize modals
        initModals: function() {
            // Reset form when modal is closed
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                modal.addEventListener('hidden.bs.modal', () => {
                    const form = modal.querySelector('form');
                    if (form) {
                        form.reset();
                        // Clear validation
                        const invalidInputs = form.querySelectorAll('.is-invalid');
                        invalidInputs.forEach(input => {
                            input.classList.remove('is-invalid');
                        });
                    }
                });
            });
        },

        // Initialize forms
        initForms: function() {
            // Add form validation
            const forms = document.querySelectorAll('.needs-validation');
            forms.forEach(form => {
                form.addEventListener('submit', (e) => {
                    if (!form.checkValidity()) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        },

        // Show add modal
        showAddModal: function(modalId) {
            const modal = new bootstrap.Modal(document.getElementById(modalId));
            const form = document.getElementById(modalId).querySelector('form');
            if (form) {
                form.reset();
                form.classList.remove('was-validated');
                // Set form action to add
                form.setAttribute('data-action', 'add');
            }
            modal.show();
        },

        // Show edit modal
        showEditModal: function(modalId, data) {
            const modal = new bootstrap.Modal(document.getElementById(modalId));
            const form = document.getElementById(modalId).querySelector('form');
            if (form) {
                // Populate form with data
                Object.keys(data).forEach(key => {
                    const input = form.querySelector(`[name="${key}"]`);
                    if (input) {
                        input.value = data[key];
                    }
                });
                form.classList.remove('was-validated');
                // Set form action to edit
                form.setAttribute('data-action', 'edit');
                form.setAttribute('data-id', data.id);
            }
            modal.show();
        },

        // Handle form submit
        handleSubmit: function(form, callback) {
            const formElement = typeof form === 'string' ? document.getElementById(form) : form;
            
            if (!formElement) {
                console.error('Form not found');
                return;
            }

            formElement.addEventListener('submit', async (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (!formElement.checkValidity()) {
                    formElement.classList.add('was-validated');
                    return;
                }

                // Show loading
                SwalHelper.showLoading('Menyimpan data...');

                // Get form data
                const formData = new FormData(formElement);
                const data = Object.fromEntries(formData);
                const action = formElement.getAttribute('data-action');
                const id = formElement.getAttribute('data-id');

                try {
                    // Call callback function
                    if (callback && typeof callback === 'function') {
                        await callback(action, id, data);
                    } else {
                        // Default: just show success
                        SwalHelper.closeLoading();
                        SwalHelper.showSuccess('Data berhasil disimpan!');
                        bootstrap.Modal.getInstance(formElement.closest('.modal')).hide();
                        formElement.reset();
                        formElement.classList.remove('was-validated');
                    }
                } catch (error) {
                    SwalHelper.closeLoading();
                    SwalHelper.showError(error.message || 'Terjadi kesalahan saat menyimpan data');
                }
            });
        },

        // Handle delete
        handleDelete: function(id, callback, options = {}) {
            SwalHelper.confirmDelete(options).then((result) => {
                if (result.isConfirmed) {
                    SwalHelper.showLoading('Menghapus data...');
                    
                    if (callback && typeof callback === 'function') {
                        callback(id)
                            .then(() => {
                                SwalHelper.closeLoading();
                                SwalHelper.showSuccess('Data berhasil dihapus!');
                            })
                            .catch((error) => {
                                SwalHelper.closeLoading();
                                SwalHelper.showError(error.message || 'Terjadi kesalahan saat menghapus data');
                            });
                    } else {
                        // Default: just show success
                        SwalHelper.closeLoading();
                        SwalHelper.showSuccess('Data berhasil dihapus!');
                    }
                }
            });
        },

        // Validate form
        validateForm: function(form) {
            const formElement = typeof form === 'string' ? document.getElementById(form) : form;
            
            if (!formElement) {
                return false;
            }

            if (!formElement.checkValidity()) {
                formElement.classList.add('was-validated');
                return false;
            }

            return true;
        },

        // Reset form
        resetForm: function(form) {
            const formElement = typeof form === 'string' ? document.getElementById(form) : form;
            
            if (formElement) {
                formElement.reset();
                formElement.classList.remove('was-validated');
                const invalidInputs = formElement.querySelectorAll('.is-invalid');
                invalidInputs.forEach(input => {
                    input.classList.remove('is-invalid');
                });
            }
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            CRUDHelper.init();
        });
    } else {
        CRUDHelper.init();
    }

    // Export to global scope
    window.CRUDHelper = CRUDHelper;
})();

