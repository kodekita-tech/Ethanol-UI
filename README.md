# Ethanol UI

Modern admin dashboard template dengan Bootstrap 5.3.8, DataTables, dan SweetAlert2. Template HTML statis murni tanpa build tools. Clean, modern, dan fully customizable.

## ✨ Fitur

- ✅ **Bootstrap 5.3.8** - Framework CSS modern dan responsif
- ✅ **DataTables 2.3.5** - Tabel interaktif dengan search, sort, pagination
- ✅ **SweetAlert2** - Alert dan konfirmasi yang cantik
- ✅ **Dark/Light Mode** - Toggle theme dengan localStorage persistence
- ✅ **Custom Color Themes** - Pilih warna untuk Sidebar & Topbar
- ✅ **UI/UX Modern** - Glassmorphism, smooth transitions, modern shadows
- ✅ **Responsive Design** - Mobile-friendly
- ✅ **CRUD Template** - Template lengkap untuk operasi CRUD
- ✅ **100% Statis** - Tidak perlu build tools, bisa langsung dibuka di browser

## 🎯 Tagline

**"Clean & Modern Admin Dashboard"** - Pure, elegant, and fully customizable.

## 📁 Struktur Folder

```
ethanol-ui/
│
├── index.html                 # Redirect ke dashboard
├── login.html                 # Halaman login
├── register.html              # Halaman register
│
├── assets/
│   ├── css/
│   │   ├── custom.css         # Custom CSS styling
│   │   └── themes.css          # Theme management CSS
│   │
│   ├── js/
│   │   ├── main.js             # JavaScript utama
│   │   ├── theme.js            # Theme management
│   │   ├── datatable.js        # DataTables config
│   │   ├── sweetalert.js       # SweetAlert2 helpers
│   │   └── crud.js             # CRUD operations
│   │
│   └── images/
│       └── logo.png            # Logo aplikasi
│
├── includes/
│   ├── header.html             # Header/Topbar
│   ├── sidebar.html            # Sidebar menu
│   ├── footer.html             # Footer
│   └── scripts.html            # CDN scripts
│
├── pages/
│   ├── dashboard.html          # Dashboard
│   ├── users.html              # Manajemen Users
│   ├── products.html           # Manajemen Products
│   ├── crud-template.html      # Template CRUD lengkap
│   ├── blank.html              # Halaman blank
│   ├── settings.html           # Settings (termasuk theme)
│   └── profile.html            # Profile user
│
└── README.md                   # Dokumentasi
```

## 🚀 Cara Menggunakan

### 1. Setup

Clone atau download project ini, kemudian:

```bash
# Tidak perlu install dependencies, semua menggunakan CDN
# Langsung buka file HTML di browser
```

### 2. Development

- Buka file HTML langsung di browser (untuk testing)
- Atau gunakan web server lokal (Laragon, XAMPP, dll)
- Edit file HTML, CSS, JS langsung tanpa compile

### 3. Includes

Karena template HTML statis, ada 2 cara untuk menggunakan includes:

**Opsi 1: Copy-Paste Manual** (Recommended untuk production)
- Copy konten dari `includes/` ke setiap halaman yang membutuhkan
- Lebih cepat load, tidak perlu fetch

**Opsi 2: JavaScript Load** (Untuk development)
- Function `loadIncludes()` di `main.js` akan load includes via fetch
- Hanya bekerja jika diakses via HTTP server (tidak bisa file://)

### 4. Customization

#### Mengubah Theme

1. Buka `pages/settings.html`
2. Pilih mode (Dark/Light)
3. Pilih warna Sidebar & Topbar
4. Theme akan tersimpan di localStorage

#### Menambah Halaman Baru

1. Copy `pages/blank.html` sebagai starter
2. Copy includes (header, sidebar, footer) ke halaman baru
3. Tambahkan konten sesuai kebutuhan

#### Menggunakan CRUD Template

1. Buka `pages/crud-template.html`
2. Copy kode yang diperlukan
3. Customize sesuai kebutuhan

## 📦 CDN yang Digunakan

### Bootstrap 5.3.8
- CSS: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css`
- JS: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js`

### jQuery 3.7.1
- JS: `https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js`

### DataTables 2.3.5
- CSS: `https://cdn.datatables.net/2.3.5/css/dataTables.bootstrap5.css`
- JS: 
  - `https://cdn.datatables.net/2.3.5/js/dataTables.min.js`
  - `https://cdn.datatables.net/2.3.5/js/dataTables.bootstrap5.min.js`

### SweetAlert2
- JS: `https://cdn.jsdelivr.net/npm/sweetalert2@11`

### Bootstrap Icons
- CSS: `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css`

## 🎨 Theme System

### Dark/Light Mode

Toggle dark/light mode dengan tombol di topbar. Theme akan tersimpan di localStorage.

### Color Themes

#### Sidebar Colors:
- Blue (default)
- Purple
- Green
- Orange
- Red
- Teal
- Indigo

#### Topbar Colors:
- Bisa match dengan sidebar atau independent
- Pilihan warna sama dengan sidebar

## 📝 JavaScript Functions

### Theme Management (`theme.js`)

```javascript
// Toggle dark/light mode
ThemeManager.toggleDarkMode();

// Set sidebar color
ThemeManager.setSidebarColor('blue');

// Set topbar color
ThemeManager.setTopbarColor('purple');

// Get current theme
const theme = ThemeManager.getTheme();

// Reset to default
ThemeManager.resetTheme();
```

### SweetAlert Helpers (`sweetalert.js`)

```javascript
// Confirm delete
SwalHelper.confirmDelete().then((result) => {
    if (result.isConfirmed) {
        // Delete action
    }
});

// Show success
SwalHelper.showSuccess('Data berhasil disimpan!');

// Show error
SwalHelper.showError('Terjadi kesalahan!');

// Show info
SwalHelper.showInfo('Informasi penting');
```

### CRUD Helpers (`crud.js`)

```javascript
// Show add modal
CRUDHelper.showAddModal('addModal');

// Show edit modal
CRUDHelper.showEditModal('editModal', data);

// Handle delete
CRUDHelper.handleDelete(id, callback);

// Validate form
if (CRUDHelper.validateForm('myForm')) {
    // Form is valid
}
```

### DataTables Config (`datatable.js`)

```javascript
// Initialize with default config
DataTableConfig.initDataTable('#myTable');

// Initialize users table
DataTableConfig.initUsersTable('#usersTable');

// Initialize products table
DataTableConfig.initProductsTable('#productsTable');
```

## 🎯 Halaman yang Tersedia

1. **Login** (`login.html`) - Halaman login dengan validasi
2. **Register** (`register.html`) - Halaman register dengan validasi
3. **Dashboard** (`pages/dashboard.html`) - Dashboard dengan statistik
4. **Users** (`pages/users.html`) - Manajemen users dengan DataTables
5. **Products** (`pages/products.html`) - Manajemen products dengan DataTables
6. **CRUD Template** (`pages/crud-template.html`) - Template CRUD lengkap
7. **Blank Page** (`pages/blank.html`) - Starter template untuk halaman baru
8. **Settings** (`pages/settings.html`) - Settings termasuk theme management
9. **Profile** (`pages/profile.html`) - Edit profile user

## 🔧 Customization

### Mengubah Logo

1. Ganti file `assets/images/logo.png`
2. Atau update path di header/sidebar

### Mengubah Warna Default

Edit file `assets/css/themes.css` untuk mengubah warna default theme.

### Menambah Menu Sidebar

Edit file `includes/sidebar.html` atau copy ke halaman yang membutuhkan.

## 📱 Responsive

Template sudah responsive dan mobile-friendly. Sidebar akan otomatis collapse di mobile.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

Template ini bebas digunakan untuk project personal maupun komersial.

## 🤝 Contributing

Silakan fork dan submit pull request jika ingin berkontribusi.

## 📞 Support

Jika ada pertanyaan atau issue, silakan buat issue di repository ini.

---

**Ethanol UI** - Clean & Modern Admin Dashboard

Dibuat dengan ❤️ menggunakan Bootstrap 5.3.8

