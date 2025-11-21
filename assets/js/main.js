/**
 * Main JavaScript File
 * Core functionality and utilities
 */

(function() {
    'use strict';

    const AdminApp = {
        // Initialize all components
        init: function() {
            this.initSidebar();
            this.initTooltips();
            this.initPopovers();
            this.initModernUI();
            this.loadIncludes();
        },

        // Initialize sidebar toggle
        initSidebar: function() {
            const toggleBtn = document.getElementById('sidebarToggle');
            const sidebar = document.querySelector('.sidebar');
            
            if (toggleBtn && sidebar) {
                toggleBtn.addEventListener('click', () => {
                    this.toggleSidebar();
                });
            }

            // Close sidebar on mobile when clicking outside
            document.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    if (sidebar && sidebar.classList.contains('show')) {
                        if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                            sidebar.classList.remove('show');
                        }
                    }
                }
            });
        },

        // Toggle sidebar
        toggleSidebar: function() {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.classList.toggle('collapsed');
                sidebar.classList.toggle('show');
            }
        },

        // Initialize Bootstrap tooltips
        initTooltips: function() {
            // Initialize tooltips with data-bs-toggle="tooltip"
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
            
            // Initialize tooltips for elements with title attribute (like color scheme buttons)
            const titleElements = document.querySelectorAll('[title]:not([data-bs-toggle])');
            titleElements.forEach(function (el) {
                if (el.title && !el._tooltip) {
                    new bootstrap.Tooltip(el);
                }
            });
        },

        // Initialize Bootstrap popovers
        initPopovers: function() {
            const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
            popoverTriggerList.map(function (popoverTriggerEl) {
                return new bootstrap.Popover(popoverTriggerEl);
            });
        },

        // Initialize modern UI effects
        initModernUI: function() {
            // Add fade-in animation to cards
            const cards = document.querySelectorAll('.card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('fade-in');
                }, index * 100);
            });

            // Smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    const href = this.getAttribute('href');
                    if (href !== '#' && href !== '') {
                        e.preventDefault();
                        const target = document.querySelector(href);
                        if (target) {
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }
                });
            });
        },

        // Load includes (header, sidebar, footer) via fetch
        loadIncludes: function() {
            // Only load if we're on HTTP server (not file://)
            if (window.location.protocol === 'file:') {
                console.warn('Includes loading requires HTTP server. Please use copy-paste method for file:// protocol.');
                return;
            }

            const includes = [
                { id: 'header-placeholder', file: 'includes/header.html' },
                { id: 'sidebar-placeholder', file: 'includes/sidebar.html' },
                { id: 'footer-placeholder', file: 'includes/footer.html' }
            ];

            includes.forEach(include => {
                const placeholder = document.getElementById(include.id);
                if (placeholder) {
                    fetch(include.file)
                        .then(response => response.text())
                        .then(html => {
                            placeholder.outerHTML = html;
                            // Re-initialize after loading
                            this.init();
                        })
                        .catch(error => {
                            console.error(`Error loading ${include.file}:`, error);
                        });
                }
            });
        },

        // Load page dynamically (if needed)
        loadPage: function(url) {
            // This can be used for SPA-like behavior if needed
            fetch(url)
                .then(response => response.text())
                .then(html => {
                    document.querySelector('.main-content').innerHTML = html;
                    this.init();
                })
                .catch(error => {
                    console.error('Error loading page:', error);
                });
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            AdminApp.init();
        });
    } else {
        AdminApp.init();
    }

    // Export to global scope
    window.AdminApp = AdminApp;
})();

