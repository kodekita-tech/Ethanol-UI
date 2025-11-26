# Development Guide - Hot Reload & Cache Prevention

## 🔥 Hot Reload & Auto-Reload

Project ini dilengkapi dengan fitur auto-reload untuk development yang memudahkan proses development tanpa harus manual refresh browser.

## 🚀 Cara Menggunakan

### Opsi 1: Menggunakan Development Server (Recommended)

#### Menggunakan npm/http-server:
```bash
npm run dev
# atau
npm run serve
```

#### Menggunakan Live Server (Extension VS Code):
1. Install extension "Live Server" di VS Code
2. Klik kanan pada `index.html`
3. Pilih "Open with Live Server"

#### Menggunakan Laragon/XAMPP:
1. Pastikan project ada di folder `www` atau `htdocs`
2. Buka browser: `http://localhost/template-admin-cursor`
3. File `.htaccess` akan otomatis mencegah caching

### Opsi 2: Mengaktifkan Development Mode

Tambahkan parameter `?dev=true` di URL:
```
http://localhost/template-admin-cursor/index.html?dev=true
```

Atau aktifkan via console browser:
```javascript
localStorage.setItem('devMode', 'true');
location.reload();
```

## 🎯 Fitur Development Tools

### 1. Auto-Reload
- Otomatis reload ketika file HTML/CSS berubah
- Check setiap 2 detik untuk perubahan file
- Hanya aktif saat development mode

### 2. Cache-Busting
- Otomatis menambahkan timestamp ke CSS dan JS files
- Mencegah browser menggunakan cached version
- Aktif otomatis saat development mode

### 3. Meta Tags No-Cache
- HTML meta tags untuk mencegah caching
- Bekerja di semua browser modern

### 4. Keyboard Shortcuts
- `Ctrl + R` atau `F5`: Force reload (development mode)

## 📝 Konfigurasi

### Development Mode
File: `js/dev-tools.js`

```javascript
// Aktifkan development mode
const DEVELOPMENT_MODE = true; // atau gunakan ?dev=true di URL
```

### Cache-Busting Interval
Default: Check setiap 2 detik
```javascript
const checkInterval = 2000; // milliseconds
```

## 🛠️ Troubleshooting

### Cache masih muncul?
1. Hard refresh: `Ctrl + Shift + R` (Windows/Linux) atau `Cmd + Shift + R` (Mac)
2. Clear browser cache
3. Buka Developer Tools > Network tab > Check "Disable cache"
4. Pastikan development mode aktif (`?dev=true` di URL)

### Auto-reload tidak bekerja?
1. Pastikan menggunakan HTTP server (bukan `file://`)
2. Check console browser untuk error
3. Pastikan development mode aktif
4. Check apakah server support `Last-Modified` header

### File tidak ter-reload?
1. Pastikan file disimpan dengan benar
2. Check file permissions
3. Restart development server
4. Gunakan manual reload: `Ctrl + R`

## 📦 Dependencies

Tidak ada dependencies tambahan yang diperlukan. Semua menggunakan:
- Native JavaScript
- Browser APIs
- HTTP Server (opsional, untuk auto-reload)

## 🔒 Production

Untuk production, pastikan:
1. Set `DEVELOPMENT_MODE = false` di `js/dev-tools.js`
2. Atau hapus parameter `?dev=true` dari URL
3. Hapus atau comment script `dev-tools.js` di HTML
4. Gunakan build tools untuk minify dan optimize files

## 💡 Tips

1. **VS Code Live Server**: Paling mudah untuk development
2. **Browser DevTools**: Aktifkan "Disable cache" di Network tab
3. **Hard Refresh**: Gunakan `Ctrl + Shift + R` untuk clear cache
4. **Console Logs**: Check console untuk status development mode

## 🎨 Browser Extensions (Optional)

- **Live Server** (VS Code Extension)
- **Web Server for Chrome** (Chrome Extension)
- **http-server** (npm package)

