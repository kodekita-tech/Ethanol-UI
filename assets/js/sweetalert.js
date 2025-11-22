// SweetAlert2 Helper Functions

const SwalHelper = {
    // Confirm delete
    confirmDelete(title = 'Are you sure?', text = "You won't be able to revert this!") {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });
    },
    
    // Show success message
    showSuccess(message, title = 'Success!') {
        return Swal.fire({
            icon: 'success',
            title: title,
            text: message,
            timer: 3000,
            showConfirmButton: false
        });
    },
    
    // Show error message
    showError(message, title = 'Error!') {
        return Swal.fire({
            icon: 'error',
            title: title,
            text: message
        });
    },
    
    // Show info message
    showInfo(message, title = 'Info') {
        return Swal.fire({
            icon: 'info',
            title: title,
            text: message
        });
    },
    
    // Show warning message
    showWarning(message, title = 'Warning!') {
        return Swal.fire({
            icon: 'warning',
            title: title,
            text: message
        });
    }
};

