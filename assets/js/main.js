// Main JavaScript Functions

// Load includes (for development - requires HTTP server)
function loadIncludes() {
  const includes = ["header", "sidebar", "footer", "scripts"];

  includes.forEach((include) => {
    fetch(`../includes/${include}.html`)
      .then((response) => response.text())
      .then((data) => {
        const element = document.getElementById(include);
        if (element) {
          element.innerHTML = data;
        } else if (include === "scripts") {
          // Scripts should be loaded in head or before closing body
          const scriptContainer = document.createElement("div");
          scriptContainer.innerHTML = data;
          document.body.appendChild(scriptContainer);
        }
      })
      .catch((error) => {
        // Error loading include
      });
  });
}

// Toggle submenu - make it globally available
window.toggleSubmenu = function (element) {
  const parent = element.closest(".menu-item-has-children");
  if (parent) {
    const wasActive = parent.classList.contains("active");
    parent.classList.toggle("active");
    const isNowActive = parent.classList.contains("active");

    const submenu = parent.querySelector(".submenu");
    const submenuItems = submenu
      ? submenu.querySelectorAll(".submenu-item")
      : [];
  }
};

// Update topbar logo visibility based on sidebar state
// CSS handles all transitions, this function ensures initial state is correct
function updateTopbarLogo() {
  const sidebar = document.getElementById("sidebar");
  const topbarLogos = document.querySelectorAll(".topbar-logo");
  
  if (sidebar && topbarLogos.length > 0) {
    // CSS selector .sidebar.hidden ~ .main-content .topbar-logo handles visibility
    // We just need to remove any inline display styles that might interfere
    topbarLogos.forEach(topbarLogo => {
      // Remove inline display style to let CSS handle it
      if (topbarLogo.style.display) {
        topbarLogo.style.display = "";
      }
    });
  }
}

// Initialize sidebar toggle
function initSidebar() {
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("sidebar");

  if (sidebarToggle && sidebar) {
    // Load hidden state from localStorage on page load
    if (localStorage.getItem("sidebarHidden") === "true") {
      sidebar.classList.add("hidden");
    }
    
    // Update topbar logo on page load
    updateTopbarLogo();

    sidebarToggle.addEventListener("click", () => {
      const isHidden = sidebar.classList.contains("hidden");
      
      // Toggle hidden state (minimize/show sidebar)
      if (isHidden) {
        // Show sidebar (expand)
        sidebar.classList.remove("hidden");
        sidebar.classList.remove("collapsed");
      } else {
        // Hide sidebar (minimize) - sidebar benar-benar tidak terlihat
        sidebar.classList.add("hidden");
        sidebar.classList.remove("collapsed");
      }
      
      // Save hidden state to localStorage
      localStorage.setItem("sidebarHidden", !isHidden ? "true" : "false");
      
      // Update topbar logo visibility
      updateTopbarLogo();
    });
  }

  // Mobile sidebar toggle
  const mobileToggle = document.querySelector('[data-bs-toggle="offcanvas"]');
  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      sidebar.classList.toggle("show");
    });
  }
}

// Initialize tooltips
function initTooltips() {
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

// Initialize popovers
function initPopovers() {
  const popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
}

// Initialize modern UI effects
function initModernUI() {
  try {
    // Add smooth scroll - only for anchors with valid ID selectors
    // Get all anchors and filter out those with href="#" or invalid
    const allAnchors = document.querySelectorAll("a");

    const anchors = Array.from(allAnchors).filter((anchor) => {
      try {
        const href = anchor.getAttribute("href");
        if (!href) {
          return false;
        }

        const trimmedHref = href.trim();

        // Only include anchors that:
        // 1. Start with #
        // 2. Are not just "#"
        // 3. Have length > 1
        // 4. Match valid CSS selector format
        const isValid =
          trimmedHref.startsWith("#") &&
          trimmedHref !== "#" &&
          trimmedHref.length > 1 &&
          trimmedHref.match(/^#[a-zA-Z_][\w-]*$/);

        return isValid;
      } catch (error) {
        return false;
      }
    });

    anchors.forEach((anchor) => {
      try {
        const href = anchor.getAttribute("href");
        if (!href) {
          return;
        }

        const trimmedHref = href.trim();

        // Final safety check
        if (trimmedHref === "#" || trimmedHref.length <= 1) {
          return;
        }

        anchor.addEventListener("click", function (e) {
          e.preventDefault();

          try {
            const target = document.querySelector(trimmedHref);

            if (target) {
              target.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          } catch (error) {
            // Error querying selector
          }
        });
      } catch (error) {
        // Error processing anchor
      }
    });
  } catch (error) {
    // Error in initModernUI
  }
}

// Handle collapsed sidebar submenu hover
// Note: CSS handles most of the hover behavior, this function ensures proper initialization
function initCollapsedSidebarSubmenu() {
  // CSS :hover pseudo-class handles the submenu display
  // This function is kept for potential future enhancements
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  // Ensure submenu items are clickable when sidebar is collapsed
  document.querySelectorAll(".submenu-item").forEach((item) => {
    item.addEventListener("click", function () {
      // Close submenu after clicking (optional - can be removed if you want submenu to stay open)
      const menuItem = this.closest(".menu-item-has-children");
      if (menuItem && sidebar.classList.contains("collapsed")) {
        setTimeout(() => {
          menuItem.classList.remove("active");
        }, 200);
      }
    });
  });
}

// Initialize all on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initSidebar();
  initTooltips();
  initPopovers();
  initModernUI();
  initCollapsedSidebarSubmenu();

  // Event delegation for submenu toggle
  document.addEventListener("click", function (e) {
    const menuToggle = e.target.closest(".menu-item-toggle");
    if (menuToggle) {
      const sidebar = document.getElementById("sidebar");
      const isCollapsed = sidebar && sidebar.classList.contains("collapsed");

      // When sidebar is collapsed, don't toggle on click, let hover handle it
      if (isCollapsed) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      window.toggleSubmenu(menuToggle);
    }
  });

  // Set active menu item based on current page
  const currentPath = window.location.pathname;
  document.querySelectorAll(".menu-item").forEach((item) => {
    if (item.getAttribute("href") === currentPath.split("/").pop()) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Set current year dynamically
  const yearElements = document.querySelectorAll("#currentYear");
  const currentYear = new Date().getFullYear();
  yearElements.forEach((el) => {
    if (el) el.textContent = currentYear;
  });
});
