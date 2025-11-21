/**
 * Theme Management JavaScript
 * Handle dark/light mode and color themes
 */

(function() {
    'use strict';

    // Theme configuration
    const ThemeManager = {
        // Default theme
        defaultTheme: {
            mode: 'light',
            sidebarColor: 'blue',
            topbarColor: 'blue'
        },

        // Initialize theme on page load
        init: function() {
            this.loadTheme();
            this.initThemeToggle();
            this.initColorPickers();
            
            // Update active buttons after a short delay to ensure DOM is ready
            setTimeout(() => {
                this.updateActiveColorButtons();
            }, 100);
        },

        // Load theme from localStorage
        loadTheme: function() {
            const savedTheme = this.getTheme();
            const theme = savedTheme || this.defaultTheme;
            
            this.applyTheme(theme);
        },

        // Get theme from localStorage
        getTheme: function() {
            try {
                const theme = localStorage.getItem('adminTheme');
                return theme ? JSON.parse(theme) : null;
            } catch (e) {
                console.error('Error loading theme:', e);
                return null;
            }
        },

        // Save theme to localStorage
        saveTheme: function(theme) {
            try {
                localStorage.setItem('adminTheme', JSON.stringify(theme));
            } catch (e) {
                console.error('Error saving theme:', e);
            }
        },

        // Apply theme to DOM
        applyTheme: function(theme) {
            // Apply mode (dark/light)
            document.documentElement.setAttribute('data-theme', theme.mode);
            document.body.setAttribute('data-theme', theme.mode);

            // Apply sidebar color
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.setAttribute('data-sidebar-theme', theme.sidebarColor);
            }
            document.documentElement.setAttribute('data-sidebar-theme', theme.sidebarColor);

            // Apply topbar color
            const topbar = document.querySelector('.topbar');
            if (topbar) {
                topbar.setAttribute('data-topbar-theme', theme.topbarColor);
            }
            document.documentElement.setAttribute('data-topbar-theme', theme.topbarColor);

            // Update toggle button icon
            this.updateThemeToggleIcon(theme.mode);
        },

        // Toggle dark/light mode
        toggleDarkMode: function() {
            const currentTheme = this.getTheme() || this.defaultTheme;
            const newMode = currentTheme.mode === 'dark' ? 'light' : 'dark';
            
            const newTheme = {
                ...currentTheme,
                mode: newMode
            };

            this.applyTheme(newTheme);
            this.saveTheme(newTheme);
        },

        // Set sidebar color
        setSidebarColor: function(color) {
            const currentTheme = this.getTheme() || this.defaultTheme;
            const newTheme = {
                ...currentTheme,
                sidebarColor: color
            };

            this.applyTheme(newTheme);
            this.saveTheme(newTheme);
        },

        // Set topbar color
        setTopbarColor: function(color) {
            const currentTheme = this.getTheme() || this.defaultTheme;
            const newTheme = {
                ...currentTheme,
                topbarColor: color
            };

            this.applyTheme(newTheme);
            this.saveTheme(newTheme);
        },

        // Reset to default theme
        resetTheme: function() {
            this.applyTheme(this.defaultTheme);
            this.saveTheme(this.defaultTheme);
        },

        // Initialize theme toggle button
        initThemeToggle: function() {
            const toggleBtn = document.getElementById('themeToggle');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => {
                    this.toggleDarkMode();
                });
            }
        },

        // Update theme toggle icon
        updateThemeToggleIcon: function(mode) {
            const toggleBtn = document.getElementById('themeToggle');
            if (toggleBtn) {
                const icon = toggleBtn.querySelector('i');
                if (icon) {
                    icon.className = mode === 'dark' ? 'bi bi-sun' : 'bi bi-moon';
                }
            }
        },

        // Initialize color pickers
        initColorPickers: function() {
            // Sidebar color picker
            const sidebarColors = document.querySelectorAll('.sidebar-color-btn');
            sidebarColors.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const color = btn.getAttribute('data-sidebar-color');
                    this.setSidebarColor(color);
                    this.updateActiveColorButtons();
                });
            });

            // Topbar color picker
            const topbarColors = document.querySelectorAll('.topbar-color-btn');
            topbarColors.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const color = btn.getAttribute('data-topbar-color');
                    this.setTopbarColor(color);
                    this.updateActiveColorButtons();
                });
            });

            // Theme mode radio buttons
            const themeModes = document.querySelectorAll('input[name="themeMode"]');
            themeModes.forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const currentTheme = this.getTheme() || this.defaultTheme;
                    const newTheme = {
                        ...currentTheme,
                        mode: e.target.value
                    };
                    this.applyTheme(newTheme);
                    this.saveTheme(newTheme);
                });
            });

            // Initialize active buttons
            this.updateActiveColorButtons();
        },

        // Update active color buttons
        updateActiveColorButtons: function() {
            const theme = this.getTheme() || this.defaultTheme;
            
            // Remove active class from all buttons
            document.querySelectorAll('.color-scheme-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Add active class to current sidebar color
            const activeSidebarBtn = document.querySelector(`.sidebar-color-btn[data-sidebar-color="${theme.sidebarColor}"]`);
            if (activeSidebarBtn) {
                activeSidebarBtn.classList.add('active');
            }

            // Add active class to current topbar color
            const activeTopbarBtn = document.querySelector(`.topbar-color-btn[data-topbar-color="${theme.topbarColor}"]`);
            if (activeTopbarBtn) {
                activeTopbarBtn.classList.add('active');
            }

            // Update theme mode radio
            const activeModeRadio = document.querySelector(`input[name="themeMode"][value="${theme.mode}"]`);
            if (activeModeRadio) {
                activeModeRadio.checked = true;
            }
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            ThemeManager.init();
        });
    } else {
        ThemeManager.init();
    }

    // Export to global scope
    window.ThemeManager = ThemeManager;
})();

