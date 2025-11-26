$(document).ready(function() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    $('html').attr('data-bs-theme', savedTheme);
    updateThemeIcon(savedTheme);
    updateChartTheme(savedTheme);
    updateThemeModeButton(savedTheme);
    updateLogoTheme(savedTheme);

    // Check for saved sidebar theme
    const savedSidebarTheme = localStorage.getItem('sidebarTheme');
    if (savedSidebarTheme) {
        $('body').attr('data-sidebar-theme', savedSidebarTheme);
    }

    // Check for saved topbar theme
    const savedTopbarTheme = localStorage.getItem('topbarTheme');
    if (savedTopbarTheme) {
        $('body').attr('data-topbar-theme', savedTopbarTheme);
    }

    // Check for saved logo version
    const savedLogoVersion = localStorage.getItem('logoVersion');
    if (savedLogoVersion) {
        setLogoVersion(parseInt(savedLogoVersion), false);
    } else {
        // Default to version 1
        setLogoVersion(1, false);
    }


    // Sidebar Toggle Logic
    $('#sidebarToggle').on('click', function() {
        if ($(window).width() < 992) {
            // Mobile: Toggle offcanvas
            $('#sidebar').toggleClass('active');
            
            // Add overlay for mobile
            if ($('#sidebar').hasClass('active')) {
                $('body').append('<div class="sidebar-overlay"></div>');
                $('.sidebar-overlay').fadeIn(300);
            } else {
                $('.sidebar-overlay').fadeOut(300, function() {
                    $(this).remove();
                });
            }
        } else {
            // Desktop: Toggle collapsed state
            $('#sidebar').toggleClass('collapsed');
            $('.main-content').toggleClass('expanded');
            
            // Close any open submenus when collapsing
            if ($('#sidebar').hasClass('collapsed')) {
                $('.sidebar-nav .collapse').removeClass('show');
                $('.sidebar-nav .nav-link[aria-expanded="true"]').attr('aria-expanded', 'false');
            }
        }
    });

    // Close sidebar when clicking overlay (Mobile)
    $(document).on('click', '.sidebar-overlay', function() {
        $('#sidebar').removeClass('active');
        $(this).fadeOut(300, function() {
            $(this).remove();
        });
    });

    // Close sidebar on mobile when clicking a link
    $('.sidebar-nav .nav-link:not(.has-dropdown)').on('click', function() {
        if ($(window).width() < 992) {
            $('#sidebar').removeClass('active');
            $('.sidebar-overlay').fadeOut(300, function() {
                $(this).remove();
            });
        }
    });

    // Theme Toggle Logic
    $('#themeToggle').on('click', function() {
        const currentTheme = $('html').attr('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        $('html').attr('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        updateChartTheme(newTheme);
    });

    // Smooth scroll for all anchor links
    $('a[href^="#"]').on('click', function(e) {
        if ($(this).attr('href').length > 1 && !$(this).hasClass('has-dropdown')) {
            e.preventDefault();
            var target = $(this).attr('href');
            $('html, body').animate({
                scrollTop: $(target).offset().top - 100
            }, 600);
        }
    });

    // Add active class to current page nav link
    var currentPage = window.location.pathname.split('/').pop();
    if (currentPage === '') currentPage = 'index.html';
    
    $('.sidebar-nav .nav-link').each(function() {
        var href = $(this).attr('href');
        if (href === currentPage) {
            $(this).addClass('active');
            // Open parent dropdown if exists
            $(this).closest('.collapse').addClass('show');
            $(this).closest('.collapse').prev('.nav-link').attr('aria-expanded', 'true');
        } else {
            $(this).removeClass('active');
        }
    });

    // Tooltip initialization
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Dropdown hover effect
    $('.dropdown').hover(
        function() {
            if ($(window).width() > 992) {
                $(this).addClass('show');
                $(this).find('.dropdown-menu').addClass('show');
            }
        },
        function() {
            if ($(window).width() > 992) {
                $(this).removeClass('show');
                $(this).find('.dropdown-menu').removeClass('show');
            }
        }
    );

    // Initialize Charts if on Dashboard
    if ($('#revenueChart').length) {
        initCharts();
    }

    // Initialize theme settings indicators (after functions are defined)
    setTimeout(function() {
        const sidebarTheme = $('body').attr('data-sidebar-theme') || 'dark';
        setSidebarTheme(sidebarTheme);
        
        const topbarTheme = $('body').attr('data-topbar-theme') || 'light';
        setTopbarTheme(topbarTheme);
        
        const currentTheme = $('html').attr('data-bs-theme') || 'light';
        updateThemeModeButton(currentTheme);
    }, 100);

    // Initialize notification badge
    updateNotificationBadge();
    
    // Update notification count when dropdown is shown
    $('.notification-btn').on('click', function() {
        setTimeout(updateNotificationBadge, 100);
    });
});

// Add overlay styles dynamically
const style = document.createElement('style');
style.textContent = `
    .sidebar-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        display: none;
    }
`;
document.head.appendChild(style);

// Theme Icon Update Function (must be global)
function updateThemeIcon(theme) {
    const icon = $('#themeToggle i');
    if (theme === 'dark') {
        icon.removeClass('bi-moon-stars').addClass('bi-sun');
    } else {
        icon.removeClass('bi-sun').addClass('bi-moon-stars');
    }
}

// Theme Setting Functions
function setSidebarTheme(theme) {
    // Remove existing attribute first to ensure CSS re-applies
    $('body').removeAttr('data-sidebar-theme');
    
    // Force reflow to ensure CSS updates
    void $('body')[0].offsetHeight;
    
    // Set new theme
    $('body').attr('data-sidebar-theme', theme);
    localStorage.setItem('sidebarTheme', theme);
    
    // Update active state
    $('.theme-color-btn[data-type="sidebar"]').removeClass('active');
    $('.theme-color-btn[data-type="sidebar"][data-theme="' + theme + '"]').addClass('active');
    
    // Update indicator
    $('#sidebarThemeIndicator').text(theme.charAt(0).toUpperCase() + theme.slice(1));
}

function setTopbarTheme(theme) {
    // Remove existing attribute first to ensure CSS re-applies
    $('body').removeAttr('data-topbar-theme');
    
    // Force reflow to ensure CSS updates
    void $('body')[0].offsetHeight;
    
    // Set new theme
    $('body').attr('data-topbar-theme', theme);
    localStorage.setItem('topbarTheme', theme);
    
    // Update active state
    $('.theme-color-btn[data-type="topbar"]').removeClass('active');
    $('.theme-color-btn[data-type="topbar"][data-theme="' + theme + '"]').addClass('active');
    
    // Update indicator
    $('#topbarThemeIndicator').text(theme.charAt(0).toUpperCase() + theme.slice(1));
}

function setLogoVersion(version, save = true) {
    // Hide all logo versions
    $('.logo-version').addClass('d-none');
    
    // Show selected version
    $('.logo-version-' + version).removeClass('d-none');
    
    // Update button states in settings
    $('#logoVersion1, #logoVersion2, #logoVersion3').removeClass('active btn-primary').addClass('btn-outline-primary');
    $('#logoVersion1Check, #logoVersion2Check, #logoVersion3Check').addClass('d-none');
    $('#logoVersion' + version).removeClass('btn-outline-primary').addClass('active btn-primary');
    $('#logoVersion' + version + 'Check').removeClass('d-none');
    
    // Update indicator
    const versionNames = {
        1: 'Icon + Text',
        2: 'Logo + Text',
        3: 'Full Logo'
    };
    $('#logoVersionIndicator').text(versionNames[version]);
    
    // Save to localStorage
    if (save) {
        localStorage.setItem('logoVersion', version);
    }
}

function toggleThemeMode() {
    const currentTheme = $('html').attr('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    $('html').attr('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    updateChartTheme(newTheme);
    updateThemeModeButton(newTheme);
    updateLogoTheme(newTheme);
}

function updateLogoTheme(theme) {
    // Update all logo images based on theme
    $('.logo-theme').each(function() {
        const $img = $(this);
        if (theme === 'dark') {
            $img.attr('src', $img.data('dark'));
        } else {
            $img.attr('src', $img.data('light'));
        }
    });
}

function updateThemeModeButton(theme) {
    const icon = $('#themeModeIcon');
    const text = $('#themeModeText');
    
    if (theme === 'dark') {
        icon.removeClass('bi-sun').addClass('bi-moon-stars');
        text.text('Dark Mode');
    } else {
        icon.removeClass('bi-moon-stars').addClass('bi-sun');
        text.text('Light Mode');
    }
}

function resetThemeSettings() {
    Swal.fire({
        title: 'Reset to Default?',
        text: 'Are you sure you want to reset all theme settings to default?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#6366f1',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, reset it!',
        cancelButtonText: 'Cancel',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            // Clear all theme settings from localStorage first
            localStorage.removeItem('theme');
            localStorage.removeItem('sidebarTheme');
            localStorage.removeItem('topbarTheme');
            localStorage.removeItem('logoVersion');
            
            // Reset theme mode to light
            $('html').attr('data-bs-theme', 'light');
            localStorage.setItem('theme', 'light');
            updateThemeIcon('light');
            updateChartTheme('light');
            updateThemeModeButton('light');
            updateLogoTheme('light');
            
            // Reset sidebar theme to dark (default)
            // Call the function directly - it handles attribute removal and setting
            setSidebarTheme('dark');
            
            // Reset topbar theme to light (default)
            // Call the function directly - it handles attribute removal and setting
            setTopbarTheme('light');
            
            // Reset logo version to 1 (default)
            setLogoVersion(1, true);
            
            // Show success message with SweetAlert2
            Swal.fire({
                title: 'Reset!',
                text: 'Theme settings have been reset to default.',
                icon: 'success',
                confirmButtonColor: '#6366f1',
                timer: 2000,
                timerProgressBar: true
            });
        }
    });
}


// Chart Global Variables
let revenueChart, trafficChart;

function initCharts() {
    const isDark = $('html').attr('data-bs-theme') === 'dark';
    const textColor = isDark ? '#f3f4f6' : '#1f2937';
    const gridColor = isDark ? '#334155' : '#e5e7eb';

    // Revenue Chart
    const revenueOptions = {
        series: [{
            name: 'Revenue',
            data: [31, 40, 28, 51, 42, 109, 100]
        }, {
            name: 'Orders',
            data: [11, 32, 45, 32, 34, 52, 41]
        }],
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: false
            },
            background: 'transparent'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"],
            labels: {
                style: {
                    colors: textColor
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: textColor
                }
            }
        },
        grid: {
            borderColor: gridColor
        },
        theme: {
            mode: isDark ? 'dark' : 'light'
        },
        colors: ['#6366f1', '#10b981'],
        tooltip: {
            theme: isDark ? 'dark' : 'light'
        }
    };

    revenueChart = new ApexCharts(document.querySelector("#revenueChart"), revenueOptions);
    revenueChart.render();

    // Traffic Chart
    const trafficOptions = {
        series: [44, 55, 13, 43],
        chart: {
            width: 380,
            type: 'pie',
            background: 'transparent'
        },
        labels: ['Direct', 'Social', 'Referral', 'Organic'],
        theme: {
            mode: isDark ? 'dark' : 'light'
        },
        colors: ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b'],
        legend: {
            labels: {
                colors: textColor
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    trafficChart = new ApexCharts(document.querySelector("#trafficChart"), trafficOptions);
    trafficChart.render();
}

function updateChartTheme(theme) {
    if (!revenueChart || !trafficChart) return;

    const isDark = theme === 'dark';
    const textColor = isDark ? '#f3f4f6' : '#1f2937';
    const gridColor = isDark ? '#334155' : '#e5e7eb';

    revenueChart.updateOptions({
        theme: { mode: theme },
        xaxis: { labels: { style: { colors: textColor } } },
        yaxis: { labels: { style: { colors: textColor } } },
        grid: { borderColor: gridColor },
        tooltip: { theme: theme }
    });

    trafficChart.updateOptions({
        theme: { mode: theme },
        legend: { labels: { colors: textColor } }
    });
}

// Notification Functions
function markNotificationRead(notificationId) {
    const notification = $(`.notification-item[data-notification-id="${notificationId}"]`);
    if (notification.hasClass('unread')) {
        notification.removeClass('unread');
        notification.find('.notification-dot').fadeOut();
        updateNotificationBadge();
    }
}

function markAllNotificationsRead() {
    $('.notification-item.unread').each(function() {
        $(this).removeClass('unread');
        $(this).find('.notification-dot').fadeOut();
    });
    updateNotificationBadge();
}

function updateNotificationBadge() {
    const unreadCount = $('.notification-item.unread').length;
    const badge = $('#notificationBadge');
    const countText = $('#notificationCount');
    
    if (unreadCount > 0) {
        badge.text(unreadCount).show();
        countText.text(unreadCount + ' new');
    } else {
        badge.text('').hide();
        countText.text('No new notifications');
        $('#markAllReadBtn').addClass('d-none');
    }
}

