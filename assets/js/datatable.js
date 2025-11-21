/**
 * DataTables Configuration
 * Custom settings for DataTables
 */

(function() {
    'use strict';

    const DataTableConfig = {
        // Default configuration
        defaultConfig: {
            language: {
                url: '//cdn.datatables.net/plug-ins/2.3.5/i18n/id.json',
                search: 'Cari:',
                lengthMenu: 'Tampilkan _MENU_ data',
                info: 'Menampilkan _START_ sampai _END_ dari _TOTAL_ data',
                infoEmpty: 'Menampilkan 0 sampai 0 dari 0 data',
                infoFiltered: '(disaring dari _MAX_ total data)',
                paginate: {
                    first: 'Pertama',
                    last: 'Terakhir',
                    next: 'Selanjutnya',
                    previous: 'Sebelumnya'
                },
                emptyTable: 'Tidak ada data yang tersedia',
                zeroRecords: 'Tidak ada data yang cocok'
            },
            responsive: true,
            pageLength: 10,
            lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, 'Semua']],
            order: [[0, 'desc']],
            dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>rt<"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',
            drawCallback: function() {
                // Re-initialize tooltips after table redraw
                if (window.AdminApp) {
                    AdminApp.initTooltips();
                }
            }
        },

        // Initialize DataTable with default config
        initDataTable: function(selector, customConfig = {}) {
            const config = {
                ...this.defaultConfig,
                ...customConfig
            };

            return $(selector).DataTable(config);
        },

        // Initialize Users table
        initUsersTable: function(selector) {
            return this.initDataTable(selector, {
                columns: [
                    { data: 'id', title: 'ID' },
                    { data: 'name', title: 'Nama' },
                    { data: 'email', title: 'Email' },
                    { data: 'role', title: 'Role' },
                    { data: 'status', title: 'Status' },
                    { 
                        data: null, 
                        title: 'Aksi',
                        orderable: false,
                        searchable: false,
                        render: function(data, type, row) {
                            return `
                                <button class="btn btn-sm btn-primary me-1" onclick="editUser(${row.id})" data-bs-toggle="tooltip" title="Edit">
                                    <i class="bi bi-pencil"></i>
                                </button>
                                <button class="btn btn-sm btn-danger" onclick="deleteUser(${row.id})" data-bs-toggle="tooltip" title="Hapus">
                                    <i class="bi bi-trash"></i>
                                </button>
                            `;
                        }
                    }
                ]
            });
        },

        // Initialize Products table
        initProductsTable: function(selector) {
            return this.initDataTable(selector, {
                columns: [
                    { data: 'id', title: 'ID' },
                    { data: 'name', title: 'Nama Produk' },
                    { data: 'category', title: 'Kategori' },
                    { data: 'price', title: 'Harga', render: function(data) {
                        return 'Rp ' + parseFloat(data).toLocaleString('id-ID');
                    }},
                    { data: 'stock', title: 'Stok' },
                    { 
                        data: null, 
                        title: 'Aksi',
                        orderable: false,
                        searchable: false,
                        render: function(data, type, row) {
                            return `
                                <button class="btn btn-sm btn-primary me-1" onclick="editProduct(${row.id})" data-bs-toggle="tooltip" title="Edit">
                                    <i class="bi bi-pencil"></i>
                                </button>
                                <button class="btn btn-sm btn-danger" onclick="deleteProduct(${row.id})" data-bs-toggle="tooltip" title="Hapus">
                                    <i class="bi bi-trash"></i>
                                </button>
                            `;
                        }
                    }
                ]
            });
        }
    };

    // Export to global scope
    window.DataTableConfig = DataTableConfig;
})();

