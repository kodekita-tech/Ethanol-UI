// DataTables Configuration

const DataTableConfig = {
    // Initialize DataTable with default config
    initDataTable(selector, options = {}) {
        const defaultOptions = {
            responsive: true,
            pageLength: 10,
            lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
            language: {
                search: "Search:",
                lengthMenu: "Show _MENU_ entries",
                info: "Showing _START_ to _END_ of _TOTAL_ entries",
                infoEmpty: "Showing 0 to 0 of 0 entries",
                infoFiltered: "(filtered from _MAX_ total entries)",
                paginate: {
                    first: "First",
                    last: "Last",
                    next: "Next",
                    previous: "Previous"
                }
            },
            ...options
        };
        
        return $(selector).DataTable(defaultOptions);
    },
    
    // Initialize users table
    initUsersTable(selector) {
        return this.initDataTable(selector, {
            columns: [
                { data: 'id', title: 'ID' },
                { data: 'name', title: 'Name' },
                { data: 'email', title: 'Email' },
                { data: 'role', title: 'Role' },
                { data: 'status', title: 'Status' },
                { data: 'actions', title: 'Actions', orderable: false }
            ]
        });
    },
    
    // Initialize products table
    initProductsTable(selector) {
        return this.initDataTable(selector, {
            columns: [
                { data: 'id', title: 'ID' },
                { data: 'name', title: 'Product Name' },
                { data: 'category', title: 'Category' },
                { data: 'price', title: 'Price' },
                { data: 'stock', title: 'Stock' },
                { data: 'status', title: 'Status' },
                { data: 'actions', title: 'Actions', orderable: false }
            ]
        });
    }
};

