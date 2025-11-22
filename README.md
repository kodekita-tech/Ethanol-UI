# Ethanol UI

Modern admin dashboard template dengan Bootstrap 5.3.8, ApexCharts, DataTables, dan SweetAlert2. Template HTML statis murni tanpa build tools. Clean, modern, dan fully customizable.

## ✨ Fitur

- ✅ **Bootstrap 5.3.8** - Framework CSS modern dan responsif
- ✅ **ApexCharts 3.44.0** - Chart library modern dan interaktif
- ✅ **DataTables 2.3.5** - Tabel interaktif dengan search, sort, pagination
- ✅ **SweetAlert2** - Alert dan konfirmasi yang cantik
- ✅ **Dark/Light Mode** - Toggle theme dengan localStorage persistence
- ✅ **Custom Color Themes** - Pilih warna untuk Sidebar & Topbar
- ✅ **UI/UX Modern** - Glassmorphism, smooth transitions, modern shadows
- ✅ **Responsive Design** - Mobile-friendly
- ✅ **100% Statis** - Tidak perlu build tools, bisa langsung dibuka di browser

## 🎯 Tagline

**"Clean & Modern Admin Dashboard"** - Pure, elegant, and fully customizable.

## 📁 Struktur Folder

```
ethanol-ui/
│
├── index.html                 # Redirect ke dashboard
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
│       ├── logo-e.png          # Logo E
│       ├── logo-e.webp         # Logo E (WebP)
│       ├── logo-ethanol-ui.png  # Logo Ethanol UI
│       └── logo-ethanol-ui.webp # Logo Ethanol UI (WebP)
│
├── includes/
│   ├── header.html             # Header/Topbar
│   ├── sidebar.html            # Sidebar menu
│   ├── footer.html             # Footer
│   └── scripts.html            # CDN scripts
│
├── pages/
│   ├── components-badge.html         # Badge Component
│   ├── components-button.html         # Button Component
│   ├── components-button-groups.html # Button Groups Component
│   ├── components-card.html          # Card Component
│   ├── components-modal.html         # Modal Component
│   ├── components-breadcrumb.html    # Breadcrumb Component
│   └── dashboard.html                # Dashboard
│
├── RANCANGAN.md               # Dokumentasi rancangan
├── RANGKUMAN-SCRIPT.md        # Rangkuman script
├── LICENSE                    # License file
├── package.json               # Package configuration
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

1. Gunakan tombol dark mode toggle di topbar
2. Gunakan color scheme picker di topbar untuk mengubah warna Sidebar & Topbar
3. Theme akan tersimpan di localStorage

#### Menambah Halaman Baru

1. Copy salah satu halaman yang ada (misalnya `pages/dashboard.html`) sebagai starter
2. Copy includes (header, sidebar, footer) ke halaman baru
3. Tambahkan konten sesuai kebutuhan

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

### ApexCharts 3.44.0

- CSS: `https://cdn.jsdelivr.net/npm/apexcharts@3.44.0/dist/apexcharts.css`
- JS: `https://cdn.jsdelivr.net/npm/apexcharts@3.44.0/dist/apexcharts.min.js`

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
ThemeManager.setSidebarColor("blue");

// Set topbar color
ThemeManager.setTopbarColor("purple");

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
SwalHelper.showSuccess("Data berhasil disimpan!");

// Show error
SwalHelper.showError("Terjadi kesalahan!");

// Show info
SwalHelper.showInfo("Informasi penting");
```

### CRUD Helpers (`crud.js`)

```javascript
// Show add modal
CRUDHelper.showAddModal("addModal");

// Show edit modal
CRUDHelper.showEditModal("editModal", data);

// Handle delete
CRUDHelper.handleDelete(id, callback);

// Validate form
if (CRUDHelper.validateForm("myForm")) {
  // Form is valid
}
```

### DataTables Config (`datatable.js`)

```javascript
// Initialize with default config
DataTableConfig.initDataTable("#myTable");

// Initialize users table
DataTableConfig.initUsersTable("#usersTable");

// Initialize products table
DataTableConfig.initProductsTable("#productsTable");
```

## 🎯 Halaman yang Tersedia

### Halaman Components (`pages/`)

1. **Badge** (`pages/components-badge.html`) - Dokumentasi dan contoh penggunaan badge component

   - Custom creative colors (Ocean, Slate, Emerald, Rose, Amber, Cyan, Stone, Violet, Gradient)
   - Pill badges dengan rounded corners
   - Badges dengan icons
   - Positioning badges
   - Badge dalam buttons

2. **Button** (`pages/components-button.html`) - Dokumentasi dan contoh penggunaan button component

3. **Button Groups** (`pages/components-button-groups.html`) - Dokumentasi dan contoh penggunaan button groups component

4. **Card** (`pages/components-card.html`) - Dokumentasi dan contoh penggunaan card component

5. **Modal** (`pages/components-modal.html`) - Dokumentasi dan contoh penggunaan modal component

   - Basic modal dengan header, body, dan footer
   - Modal sizes (Small, Default, Large, Extra Large)
   - Modal dengan form untuk input data
   - Scrollable modal untuk konten panjang
   - Vertically centered modal
   - Static backdrop modal (tidak bisa ditutup dengan klik outside)
   - Fullscreen modal dengan berbagai breakpoint

6. **Breadcrumb** (`pages/components-breadcrumb.html`) - Dokumentasi dan contoh penggunaan breadcrumb component

   - Basic breadcrumb navigation
   - Breadcrumb dengan icons untuk visual yang lebih baik
   - Custom divider (>, |, →, ·)
   - Breadcrumb dalam card component
   - Custom styled breadcrumb dengan warna (Ocean, Emerald, Rose)

   - Custom button colors dengan gradient backgrounds
   - Button sizes (Large, Default, Small)
   - Buttons dengan icons
   - Outline buttons
   - Disabled state
   - Loading state dengan spinner

7. **Button Groups** (`pages/components-button-groups.html`) - Dokumentasi dan contoh penggunaan button groups

   - Basic button groups
   - Mixed styles (kombinasi warna dan outline)
   - Button toolbar
   - Sizing (Large, Default, Small)
   - Vertical variation
   - Button groups dengan icons
   - Nesting dengan dropdown
   - Radio button groups
   - Checkbox button groups

### Halaman Dashboard

1. **Dashboard** (`pages/dashboard.html`) - Dashboard dengan statistik, charts, dan quick actions

## 🔧 Customization

### Mengubah Logo

1. Ganti file di `assets/images/` (logo-e.webp, logo-ethanol-ui.webp, dll)
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
