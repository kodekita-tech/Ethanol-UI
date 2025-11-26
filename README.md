# Ethanol UI

Modern admin dashboard template dengan Bootstrap 5.3.8, ApexCharts, dan SweetAlert2. Template HTML statis murni tanpa build tools. Clean, modern, dan fully customizable.

## ✨ Fitur

- ✅ **Bootstrap 5.3.8** - Framework CSS modern dan responsif
- ✅ **ApexCharts** - Chart library modern dan interaktif
- ✅ **SweetAlert2** - Alert dan konfirmasi yang cantik
- ✅ **Dark/Light Mode** - Toggle theme dengan localStorage persistence
- ✅ **Custom Color Themes** - Pilih warna untuk Sidebar & Topbar (Dark, Light, Primary, Success, Danger, Warning, Info, Teal, Indigo)
- ✅ **Logo Versions** - 3 versi logo (Icon + Text, Logo + Text, Full Logo)
- ✅ **Modern Breadcrumb** - Breadcrumb dengan icon dan styling modern
- ✅ **Custom Component Styling** - Accordion, Button, dan komponen lainnya dengan styling custom
- ✅ **UI/UX Modern** - Smooth transitions, modern shadows, hover effects
- ✅ **Responsive Design** - Mobile-friendly dengan sidebar collapse
- ✅ **Development Tools** - Auto-reload dan cache-busting untuk development
- ✅ **100% Statis** - Tidak perlu build tools, bisa langsung dibuka di browser

## 🎯 Tagline

**"Clean & Modern Admin Dashboard"** - Pure, elegant, and fully customizable.

## 📁 Struktur Folder

```
template-admin-cursor/
│
├── index.html                 # Dashboard utama
│
├── css/
│   └── style.css             # Custom CSS styling (theme, components, layout)
│
├── js/
│   ├── script.js             # JavaScript utama (theme management, sidebar, charts)
│   └── dev-tools.js          # Development tools (auto-reload, cache-busting)
│
├── images/
│   ├── logo-e.png            # Logo E (PNG)
│   ├── logo-e.webp           # Logo E (WebP) - digunakan sebagai favicon
│   ├── logo-ethanol-ui.png   # Logo Ethanol UI (PNG)
│   └── logo-ethanol-ui.webp  # Logo Ethanol UI (WebP)
│
├── components/
│   ├── accordion.html        # Accordion component dengan custom styling
│   ├── alert.html            # Alert component
│   ├── badge.html            # Badge component
│   ├── breadcrumb.html       # Breadcrumb component
│   ├── button.html           # Button component dengan custom styling
│   ├── button-group.html     # Button group component
│   ├── card.html             # Card component
│   ├── list-group.html       # List group component
│   ├── modal.html            # Modal component (various sizes & types)
│   ├── nav-tabs.html         # Nav tabs component
│   └── pagination.html       # Pagination component
│
├── forms/
│   ├── check-radio.html      # Checkbox & Radio component
│   ├── form-control.html     # Form control component
│   ├── input-group.html      # Input group component
│   ├── input-validation.html # Input validation component
│   ├── range.html            # Range input component
│   └── select.html           # Select component
│
├── tables/
│   ├── table.html            # Basic table component
│   └── datatables.html       # DataTables component
│
├── extends/
│   ├── apexcharts.html       # ApexCharts examples
│   ├── jquery-toast.html     # jQuery Toast examples
│   ├── select2.html          # Select2 examples
│   └── sweetalert2.html      # SweetAlert2 examples
│
├── DEVELOPMENT.md            # Dokumentasi development tools
├── LICENSE                   # License file
├── package.json              # Package configuration
└── README.md                 # Dokumentasi ini
```

## 🚀 Cara Menggunakan

### 1. Setup

Clone atau download project ini, kemudian:

```bash
# Tidak perlu install dependencies, semua menggunakan CDN
# Langsung buka file HTML di browser
```

### 2. Development

#### Opsi 1: Langsung Buka di Browser
- Buka file HTML langsung di browser (untuk testing cepat)
- Beberapa fitur mungkin tidak bekerja (seperti localStorage di file://)

#### Opsi 2: Menggunakan Web Server Lokal

**Laragon/XAMPP:**
- Copy project ke `www` atau `htdocs` folder
- Akses via `http://localhost/template-admin-cursor`

**NPM Scripts:**
```bash
# Development server dengan auto-reload
npm run live

# Atau simple HTTP server
npm run dev
```

### 3. Development Tools

Project ini dilengkapi dengan development tools untuk memudahkan development:

- **Auto-reload**: Otomatis reload halaman saat file HTML/CSS berubah
- **Cache-busting**: Menambahkan timestamp ke CSS/JS untuk mencegah cache
- **Development Mode**: Aktifkan via URL parameter `?dev=true` atau localStorage

Lihat `DEVELOPMENT.md` untuk detail lebih lengkap.

## 🎨 Theme System

### Dark/Light Mode

Toggle dark/light mode dengan tombol di topbar. Theme akan tersimpan di localStorage dan otomatis ter-load saat reload halaman.

### Theme Settings Panel

Akses theme settings melalui tombol palette di topbar. Panel ini memungkinkan Anda untuk:

1. **Theme Mode**: Toggle antara Dark dan Light mode
2. **Sidebar Color**: Pilih warna sidebar (Dark, Light, Primary, Success, Danger, Warning, Info, Teal, Indigo)
3. **Topbar Color**: Pilih warna topbar (Light, Dark, Primary, Success)
4. **Logo Version**: Pilih versi logo (Icon + Text, Logo + Text, Full Logo)
5. **Reset to Default**: Reset semua pengaturan ke default

Semua pengaturan tersimpan di localStorage dan akan otomatis ter-apply saat reload.

### Custom Styling

#### Accordion
- Custom border radius dan shadows
- Gradient backgrounds pada button
- Smooth transitions
- Dark mode support

#### Button
- Gradient backgrounds untuk semua variant
- Custom hover effects dengan transform dan shadow
- Icon-only buttons dengan aspect ratio 1:1
- Outline buttons dengan border width 2px
- Warning button menggunakan text hitam untuk kontras optimal

#### Breadcrumb
- Modern breadcrumb dengan icon
- Hover effects
- Chevron separator (tanpa slash)
- Active state styling

## 📦 CDN yang Digunakan

### Bootstrap 5.3.8
- CSS: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css`
- JS: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js`

### jQuery 3.7.1
- JS: `https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js`

### Bootstrap Icons 1.11.3
- CSS: `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css`

### ApexCharts
- JS: `https://cdn.jsdelivr.net/npm/apexcharts`

### SweetAlert2
- JS: `https://cdn.jsdelivr.net/npm/sweetalert2@11`

## 📝 JavaScript Functions

### Theme Management (`js/script.js`)

```javascript
// Toggle dark/light mode
toggleThemeMode();

// Set sidebar theme
setSidebarTheme('dark'); // 'dark', 'light', 'primary', 'success', etc.

// Set topbar theme
setTopbarTheme('light'); // 'light', 'dark', 'primary', 'success'

// Set logo version
setLogoVersion(1); // 1 = Icon + Text, 2 = Logo + Text, 3 = Full Logo

// Reset all theme settings
resetThemeSettings();
```

### Notification Management

```javascript
// Mark notification as read
markNotificationRead(notificationId);

// Mark all notifications as read
markAllNotificationsRead();

// Update notification badge
updateNotificationBadge();
```

### Chart Management

```javascript
// Update chart theme
updateChartTheme('dark'); // 'dark' or 'light'
```

## 🎯 Halaman yang Tersedia

### Dashboard (`index.html`)

- Creative stats cards dengan gradient backgrounds
- Revenue chart (ApexCharts)
- Traffic sources chart (ApexCharts)
- Recent orders table
- Recent activity timeline
- Theme settings panel
- Notification dropdown
- User dropdown dengan profile info

### Components (`components/`)

1. **Accordion** (`accordion.html`)
   - Basic accordion
   - Flush accordion
   - Always open accordion
   - Custom styling dengan gradient dan shadows

2. **Button** (`button.html`)
   - Button variants (Primary, Secondary, Success, Danger, Warning, Info, Light, Dark, Link)
   - Outline buttons
   - Button sizes (Large, Default, Small)
   - Buttons with icons
   - Icon-only buttons (solid style)
   - Disabled buttons
   - Block buttons

3. **Button Group** (`button-group.html`)
   - Basic button group
   - Mixed styles
   - Outline button group
   - Button group sizes
   - Vertical button group
   - Button toolbar

4. **Modal** (`modal.html`)
   - Basic modal
   - Static backdrop modal
   - Modal sizes (Small, Default, Large, Extra Large)
   - Scrollable modal
   - Vertically centered modal

5. **Alert** (`alert.html`)
6. **Badge** (`badge.html`)
7. **Breadcrumb** (`breadcrumb.html`)
8. **Card** (`card.html`)
9. **List Group** (`list-group.html`)
10. **Nav Tabs** (`nav-tabs.html`)
11. **Pagination** (`pagination.html`)

### Forms (`forms/`)

1. **Check & Radio** (`check-radio.html`)
2. **Form Control** (`form-control.html`)
3. **Input Group** (`input-group.html`)
4. **Input Validation** (`input-validation.html`)
5. **Range** (`range.html`)
6. **Select** (`select.html`)

### Tables (`tables/`)

1. **Table** (`table.html`)
2. **DataTables** (`datatables.html`)

### Extends (`extends/`)

1. **ApexCharts** (`apexcharts.html`)
2. **jQuery Toast** (`jquery-toast.html`)
3. **Select2** (`select2.html`)
4. **SweetAlert2** (`sweetalert2.html`)

## 🔧 Customization

### Mengubah Logo

1. Ganti file di `images/` folder
2. Update path di sidebar header (3 versi logo)
3. Update favicon di `<head>` section

### Mengubah Warna Default

Edit CSS variables di `css/style.css`:

```css
:root {
    --primary-color: #6366f1;
    --success-color: #10b981;
    --danger-color: #ef4444;
    --warning-color: #f59e0b;
    --info-color: #06b6d4;
    /* ... */
}
```

### Menambah Menu Sidebar

Edit sidebar di setiap halaman atau buat include file untuk sidebar.

### Menambah Halaman Baru

1. Copy salah satu halaman yang ada (misalnya `components/accordion.html`) sebagai starter
2. Update breadcrumb
3. Update sidebar menu untuk set active state
4. Tambahkan konten sesuai kebutuhan

## 📱 Responsive

Template sudah fully responsive dan mobile-friendly:

- Sidebar otomatis collapse di mobile (< 992px)
- Topbar tetap accessible di semua ukuran
- Cards dan components responsive
- Tables dengan horizontal scroll di mobile

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🛠️ Development

### Development Tools

Project ini dilengkapi dengan development tools untuk memudahkan development:

- **Auto-reload**: Otomatis reload saat file berubah
- **Cache-busting**: Mencegah cache browser
- **Development Mode**: Aktifkan via URL parameter

Lihat `DEVELOPMENT.md` untuk detail lengkap.

### NPM Scripts

```bash
# Development server dengan auto-reload
npm run live

# Simple HTTP server
npm run dev
```

## 📄 License

Template ini bebas digunakan untuk project personal maupun komersial.

## 🤝 Contributing

Silakan fork dan submit pull request jika ingin berkontribusi.

## 📞 Support

Jika ada pertanyaan atau issue, silakan buat issue di repository ini.

---

**Ethanol UI** - Clean & Modern Admin Dashboard

Dibuat dengan ❤️ menggunakan Bootstrap 5.3.8
