/**
 * SweetAlert2 Helper Functions
 * Reusable alert and confirmation dialogs
 */

(function() {
    'use strict';

    const SwalHelper = {
        // Confirm delete dialog
        confirmDelete: function(options = {}) {
            const defaultOptions = {
                title: 'Apakah Anda yakin?',
                text: 'Data yang dihapus tidak dapat dikembalikan!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Ya, Hapus!',
                cancelButtonText: 'Batal',
                reverseButtons: true
            };

            return Swal.fire({
                ...defaultOptions,
                ...options
            });
        },

        // Show success message
        showSuccess: function(message, title = 'Berhasil!') {
            return Swal.fire({
                icon: 'success',
                title: title,
                text: message,
                timer: 3000,
                showConfirmButton: false,
                toast: true,
                position: 'top-end'
            });
        },

        // Show error message
        showError: function(message, title = 'Error!') {
            return Swal.fire({
                icon: 'error',
                title: title,
                text: message,
                confirmButtonText: 'OK'
            });
        },

        // Show info message
        showInfo: function(message, title = 'Informasi') {
            return Swal.fire({
                icon: 'info',
                title: title,
                text: message,
                confirmButtonText: 'OK'
            });
        },

        // Show warning message
        showWarning: function(message, title = 'Peringatan!') {
            return Swal.fire({
                icon: 'warning',
                title: title,
                text: message,
                confirmButtonText: 'OK'
            });
        },

        // Show loading
        showLoading: function(message = 'Memproses...') {
            Swal.fire({
                title: message,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
        },

        // Close loading
        closeLoading: function() {
            Swal.close();
        },

        // Show question dialog
        showQuestion: function(message, title = 'Konfirmasi') {
            return Swal.fire({
                icon: 'question',
                title: title,
                text: message,
                showCancelButton: true,
                confirmButtonText: 'Ya',
                cancelButtonText: 'Tidak'
            });
        }
    };

    // Export to global scope
    window.SwalHelper = SwalHelper;
})();

