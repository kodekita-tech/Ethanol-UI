// Main JavaScript Functions

// Load includes (for development - requires HTTP server)
function loadIncludes() {
    const includes = ['header', 'sidebar', 'footer', 'scripts'];
    
    includes.forEach(include => {
        fetch(`../includes/${include}.html`)
            .then(response => response.text())
            .then(data => {
                const element = document.getElementById(include);
                if (element) {
                    element.innerHTML = data;
                } else if (include === 'scripts') {
                    // Scripts should be loaded in head or before closing body
                    const scriptContainer = document.createElement('div');
                    scriptContainer.innerHTML = data;
                    document.body.appendChild(scriptContainer);
                }
            })
            .catch(error => console.error(`Error loading ${include}:`, error));
    });
}

// Toggle submenu - make it globally available
window.toggleSubmenu = function(element) {
    const parent = element.closest('.menu-item-has-children');
    if (parent) {
        parent.classList.toggle('active');
    }
};

// Initialize sidebar toggle
function initSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }
    
    // Mobile sidebar toggle
    const mobileToggle = document.querySelector('[data-bs-toggle="offcanvas"]');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });
    }
}

// Initialize tooltips
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Initialize popovers
function initPopovers() {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

// Initialize modern UI effects
function initModernUI() {
    try {
        console.log('🔧 Initializing modern UI effects...');
        
        // Add smooth scroll - only for anchors with valid ID selectors
        // Get all anchors and filter out those with href="#" or invalid
        const allAnchors = document.querySelectorAll('a');
        console.log(`📋 Total anchors found: ${allAnchors.length}`);
        
        const anchors = Array.from(allAnchors).filter(anchor => {
            try {
                const href = anchor.getAttribute('href');
                if (!href) {
                    return false;
                }
                
                const trimmedHref = href.trim();
                
                // Only include anchors that:
                // 1. Start with #
                // 2. Are not just "#"
                // 3. Have length > 1
                // 4. Match valid CSS selector format
                const isValid = trimmedHref.startsWith('#') && 
                               trimmedHref !== '#' && 
                               trimmedHref.length > 1 &&
                               trimmedHref.match(/^#[a-zA-Z_][\w-]*$/);
                
                if (isValid) {
                    console.log(`✅ Anchor passed filter: "${trimmedHref}"`);
                } else {
                    console.log(`⏭️ Anchor filtered out: "${trimmedHref}"`);
                }
                
                return isValid;
            } catch (error) {
                console.error('❌ Error filtering anchor:', error);
                return false;
            }
        });
        
        console.log(`📋 Found ${anchors.length} valid anchor links with href starting with # (excluding #)`);
        
        anchors.forEach((anchor, index) => {
            try {
                const href = anchor.getAttribute('href');
                if (!href) {
                    console.warn(`⚠️ Anchor ${index + 1} has no href, skipping`);
                    return;
                }
                
                const trimmedHref = href.trim();
                
                // Final safety check
                if (trimmedHref === '#' || trimmedHref.length <= 1) {
                    console.warn(`⚠️ Anchor ${index + 1} has invalid href: "${trimmedHref}", skipping`);
                    return;
                }
                
                console.log(`✅ Processing anchor ${index + 1} with href: "${trimmedHref}"`);
                
                anchor.addEventListener('click', function (e) {
                    console.log(`🖱️ Clicked anchor with href: "${trimmedHref}"`);
                    e.preventDefault();
                    
                    try {
                        console.log(`🔍 Attempting to query selector: "${trimmedHref}"`);
                        const target = document.querySelector(trimmedHref);
                        console.log(`🎯 Target element found:`, target);
                        
                        if (target) {
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                            console.log(`✅ Scrolled to target`);
                        } else {
                            console.warn(`⚠️ Target element not found for href: "${trimmedHref}"`);
                        }
                    } catch (error) {
                        console.error(`❌ Error querying selector "${trimmedHref}":`, error);
                        console.error('Error details:', error.message, error.stack);
                    }
                });
            } catch (error) {
                console.error(`❌ Error processing anchor ${index + 1}:`, error);
            }
        });
        
        console.log('✅ Modern UI effects initialized');
    } catch (error) {
        console.error('❌ Error in initModernUI:', error);
        console.error('Error details:', error.message, error.stack);
    }
}

// Initialize all on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initTooltips();
    initPopovers();
    initModernUI();
    
    // Event delegation for submenu toggle
    document.addEventListener('click', function(e) {
        const menuToggle = e.target.closest('.menu-item-toggle');
        if (menuToggle) {
            e.preventDefault();
            e.stopPropagation();
            window.toggleSubmenu(menuToggle);
        }
    });
    
    // Set active menu item based on current page
    const currentPath = window.location.pathname;
    document.querySelectorAll('.menu-item').forEach(item => {
        if (item.getAttribute('href') === currentPath.split('/').pop()) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Set current year dynamically
    const yearElements = document.querySelectorAll('#currentYear');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        if (el) el.textContent = currentYear;
    });
});

