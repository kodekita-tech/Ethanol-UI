// Theme Management JavaScript

const ThemeManager = {
    // Initialize theme on page load
    initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const savedSidebarColor = localStorage.getItem('sidebarColor') || 'blue';
        const savedTopbarColor = localStorage.getItem('topbarColor') || 'blue';
        
        if (savedTheme) {
            document.documentElement.setAttribute('data-bs-theme', savedTheme);
            this.updateDarkModeIcon(savedTheme === 'dark');
        }
        
        this.setSidebarColor(savedSidebarColor);
        this.setTopbarColor(savedTopbarColor);
        
        // Update datetime card on load
        this.updateDateTimeCardColor(savedTopbarColor);
        
        // Update user dropdown on load
        this.updateUserDropdownColor(savedTopbarColor);
    },
    
    // Toggle dark/light mode
    toggleDarkMode() {
        const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        this.updateDarkModeIcon(newTheme === 'dark');
    },
    
    // Update dark mode icon
    updateDarkModeIcon(isDark) {
        const icon = document.querySelector('#darkModeToggle i');
        if (icon) {
            icon.className = isDark ? 'bi bi-sun fs-5' : 'bi bi-moon-stars fs-5';
        }
    },
    
    // Set sidebar color
    setSidebarColor(color) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            // Remove all color classes
            sidebar.classList.remove('sidebar-blue', 'sidebar-purple', 'sidebar-green', 
                                   'sidebar-orange', 'sidebar-red', 'sidebar-teal', 'sidebar-indigo');
            
            // Add new color class
            sidebar.classList.add(`sidebar-${color}`);
            localStorage.setItem('sidebarColor', color);
        }
    },
    
    // Set topbar color
    setTopbarColor(color) {
        const topbar = document.getElementById('topbar');
        if (topbar) {
            // Remove all color classes
            topbar.classList.remove('topbar-blue', 'topbar-purple', 'topbar-green', 
                                  'topbar-orange', 'topbar-red', 'topbar-teal', 'topbar-indigo');
            
            // Add new color class
            topbar.classList.add(`topbar-${color}`);
            localStorage.setItem('topbarColor', color);
            
            // Update datetime card color
            this.updateDateTimeCardColor(color);
            
            // Update user dropdown color
            this.updateUserDropdownColor(color);
        }
    },
    
    // Update datetime card color to match topbar
    updateDateTimeCardColor(color) {
        const datetimeCard = document.querySelector('.datetime-card');
        if (datetimeCard) {
            const colorMap = {
                'blue': 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                'purple': 'linear-gradient(135deg, #6b21a8 0%, #7c3aed 100%)',
                'green': 'linear-gradient(135deg, #166534 0%, #16a34a 100%)',
                'orange': 'linear-gradient(135deg, #c2410c 0%, #ea580c 100%)',
                'red': 'linear-gradient(135deg, #991b1b 0%, #dc2626 100%)',
                'teal': 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                'indigo': 'linear-gradient(135deg, #3730a3 0%, #6366f1 100%)'
            };
            
            if (colorMap[color]) {
                datetimeCard.style.background = colorMap[color];
            }
        }
    },
    
    // Update user dropdown color to match topbar
    updateUserDropdownColor(color) {
        const userDropdown = document.getElementById('userDropdown');
        if (userDropdown) {
            // Remove all color classes
            userDropdown.classList.remove('user-dropdown-blue', 'user-dropdown-purple', 'user-dropdown-green', 
                                        'user-dropdown-orange', 'user-dropdown-red', 'user-dropdown-teal', 'user-dropdown-indigo');
            
            // Add new color class
            userDropdown.classList.add(`user-dropdown-${color}`);
        }
    },
    
    // Get current theme
    getTheme() {
        return {
            mode: document.documentElement.getAttribute('data-bs-theme') || 'light',
            sidebarColor: localStorage.getItem('sidebarColor') || 'blue',
            topbarColor: localStorage.getItem('topbarColor') || 'blue'
        };
    },
    
    // Reset to default theme
    resetTheme() {
        localStorage.removeItem('theme');
        localStorage.removeItem('sidebarColor');
        localStorage.removeItem('topbarColor');
        document.documentElement.setAttribute('data-bs-theme', 'light');
        this.setSidebarColor('blue');
        this.setTopbarColor('blue');
        this.updateDarkModeIcon(false);
    }
};

// Initialize theme on DOM ready
function initThemeOnLoad() {
    ThemeManager.initTheme();
    
    // Dark mode toggle event - use event delegation for reliability
    document.addEventListener('click', function(e) {
        if (e.target.closest('#darkModeToggle')) {
            e.preventDefault();
            e.stopPropagation();
            ThemeManager.toggleDarkMode();
        }
    });
    
    // Color picker functionality - separate event listener
    document.addEventListener('click', function(e) {
        const colorPickerBtn = e.target.closest('.color-picker-btn');
        if (colorPickerBtn) {
            // Prevent default and stop propagation
            e.preventDefault();
            e.stopPropagation();
            
            const color = colorPickerBtn.getAttribute('data-color');
            const type = colorPickerBtn.getAttribute('data-type');
            
            if (!color || !type) {
                return;
            }
            
            // Remove active class from all buttons of same type
            document.querySelectorAll(`.color-picker-btn[data-type="${type}"]`).forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            colorPickerBtn.classList.add('active');
            
            // Apply color immediately
            if (type === 'sidebar') {
                ThemeManager.setSidebarColor(color);
            } else if (type === 'topbar') {
                ThemeManager.setTopbarColor(color);
            }
            
            // Don't close dropdown automatically - let user close it manually
            // This allows user to change both sidebar and topbar colors
        }
    });
    
    // Set active color picker buttons based on current theme
    function updateColorPickerButtons() {
        const theme = ThemeManager.getTheme();
        
        // Remove all active classes first
        document.querySelectorAll('.color-picker-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to current colors
        const sidebarBtn = document.querySelector(`.color-picker-btn[data-type="sidebar"][data-color="${theme.sidebarColor}"]`);
        const topbarBtn = document.querySelector(`.color-picker-btn[data-type="topbar"][data-color="${theme.topbarColor}"]`);
        
        if (sidebarBtn) sidebarBtn.classList.add('active');
        if (topbarBtn) topbarBtn.classList.add('active');
    }
    
    // Update on load
    setTimeout(updateColorPickerButtons, 200);
    
    // Also update after color changes - wrap the methods
    const originalSetSidebarColor = ThemeManager.setSidebarColor.bind(ThemeManager);
    const originalSetTopbarColor = ThemeManager.setTopbarColor.bind(ThemeManager);
    
    ThemeManager.setSidebarColor = function(color) {
        originalSetSidebarColor(color);
        setTimeout(updateColorPickerButtons, 100);
    };
    
    ThemeManager.setTopbarColor = function(color) {
        originalSetTopbarColor(color);
        setTimeout(updateColorPickerButtons, 100);
    };
    
    // Reset to default theme button
    document.addEventListener('click', function(e) {
        const resetBtn = e.target.closest('#resetThemeBtn');
        if (resetBtn) {
            e.preventDefault();
            e.stopPropagation();
            
            // Reset theme to default
            ThemeManager.resetTheme();
            
            // Update color picker buttons
            setTimeout(function() {
                updateColorPickerButtons();
            }, 100);
            
            // Close dropdown
            const dropdown = resetBtn.closest('.dropdown');
            if (dropdown) {
                const dropdownToggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
                if (dropdownToggle && typeof bootstrap !== 'undefined') {
                    const bsDropdown = bootstrap.Dropdown.getInstance(dropdownToggle);
                    if (bsDropdown) {
                        bsDropdown.hide();
                    } else {
                        // Fallback: remove show class manually
                        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                        if (dropdownMenu) {
                            dropdownMenu.classList.remove('show');
                            dropdownToggle.setAttribute('aria-expanded', 'false');
                        }
                    }
                }
            }
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeOnLoad);
} else {
    // DOM already loaded, initialize immediately
    initThemeOnLoad();
}

