/**
 * Development Tools
 * Auto-reload dan cache-busting untuk development
 * 
 * Cara menggunakan:
 * 1. Set DEVELOPMENT_MODE = true untuk enable auto-reload
 * 2. Atau tambahkan ?dev=true di URL
 */

// Development mode - set ke false untuk production
const DEVELOPMENT_MODE = window.location.search.includes('dev=true') || localStorage.getItem('devMode') === 'true';

// Cache-busting untuk CSS dan JS files
function addCacheBuster() {
    if (DEVELOPMENT_MODE) {
        const timestamp = new Date().getTime();
        
        // Update CSS
        const cssLink = document.getElementById('main-css');
        if (cssLink) {
            const href = cssLink.getAttribute('href');
            if (href && !href.includes('?v=')) {
                cssLink.setAttribute('href', href + '?v=' + timestamp);
            } else if (href && href.includes('?v=')) {
                cssLink.setAttribute('href', href.split('?v=')[0] + '?v=' + timestamp);
            }
        }
        
        // Update JS files
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
            const src = script.getAttribute('src');
            if (src && !src.startsWith('http') && !src.includes('?v=')) {
                script.setAttribute('src', src + '?v=' + timestamp);
            } else if (src && !src.startsWith('http') && src.includes('?v=')) {
                script.setAttribute('src', src.split('?v=')[0] + '?v=' + timestamp);
            }
        });
    }
}

// Auto-reload ketika file berubah (polling)
function initAutoReload() {
    if (!DEVELOPMENT_MODE) return;
    
    let lastModified = null;
    const checkInterval = 2000; // Check setiap 2 detik
    
    // Simpan timestamp saat page load
    if (sessionStorage.getItem('pageLoadTime')) {
        lastModified = parseInt(sessionStorage.getItem('pageLoadTime'));
    } else {
        lastModified = Date.now();
        sessionStorage.setItem('pageLoadTime', lastModified);
    }
    
    // Check untuk perubahan file
    setInterval(() => {
        // Check HTML file
        fetch(window.location.href, {
            method: 'HEAD',
            cache: 'no-cache'
        })
        .then(response => {
            const lastModifiedHeader = response.headers.get('Last-Modified');
            if (lastModifiedHeader) {
                const fileTime = new Date(lastModifiedHeader).getTime();
                if (fileTime > lastModified) {
                    console.log('🔄 File changed! Reloading...');
                    sessionStorage.setItem('pageLoadTime', Date.now());
                    location.reload();
                }
            }
        })
        .catch(() => {
            // Fallback: check localStorage untuk manual trigger
            const reloadFlag = sessionStorage.getItem('forceReload');
            if (reloadFlag === 'true') {
                sessionStorage.removeItem('forceReload');
                location.reload();
            }
        });
        
        // Check CSS file
        fetch(document.getElementById('main-css')?.href || 'css/style.css', {
            method: 'HEAD',
            cache: 'no-cache'
        })
        .then(response => {
            const lastModifiedHeader = response.headers.get('Last-Modified');
            if (lastModifiedHeader) {
                const fileTime = new Date(lastModifiedHeader).getTime();
                const cssLoadTime = parseInt(sessionStorage.getItem('cssLoadTime') || '0');
                if (fileTime > cssLoadTime) {
                    console.log('🎨 CSS changed! Reloading stylesheet...');
                    sessionStorage.setItem('cssLoadTime', Date.now());
                    const cssLink = document.getElementById('main-css');
                    if (cssLink) {
                        const href = cssLink.getAttribute('href').split('?v=')[0];
                        cssLink.setAttribute('href', href + '?v=' + Date.now());
                    }
                }
            }
        })
        .catch(() => {});
    }, checkInterval);
    
    console.log('✅ Auto-reload enabled (Development Mode)');
}

// Force reload function (bisa dipanggil manual)
function forceReload() {
    sessionStorage.setItem('forceReload', 'true');
    location.reload();
}

// Toggle development mode
function toggleDevMode() {
    const currentMode = localStorage.getItem('devMode') === 'true';
    localStorage.setItem('devMode', !currentMode);
    location.reload();
}

// Keyboard shortcut untuk reload (Ctrl+R atau F5)
document.addEventListener('keydown', function(e) {
    if (DEVELOPMENT_MODE && (e.ctrlKey && e.key === 'r' || e.key === 'F5')) {
        e.preventDefault();
        forceReload();
    }
});

// Initialize
if (DEVELOPMENT_MODE) {
    addCacheBuster();
    initAutoReload();
    
    // Show indicator di console
    console.log('%c🔧 Development Mode Active', 'color: #10b981; font-weight: bold; font-size: 14px;');
    console.log('Auto-reload: Enabled');
    console.log('Cache-busting: Enabled');
    console.log('Press Ctrl+R or F5 to force reload');
} else {
    // Disable caching untuk development (meskipun dev mode off)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        addCacheBuster();
    }
}

