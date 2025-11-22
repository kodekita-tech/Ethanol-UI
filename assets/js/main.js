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
      .catch((error) => console.error(`Error loading ${include}:`, error));
  });
}

// Toggle submenu - make it globally available
window.toggleSubmenu = function (element) {
  const parent = element.closest(".menu-item-has-children");
  if (parent) {
    const wasActive = parent.classList.contains("active");
    parent.classList.toggle("active");
    const isNowActive = parent.classList.contains("active");

    const menuLink = parent.querySelector(".menu-item");
    const menuTitle = menuLink
      ? menuLink.getAttribute("data-title") || menuLink.textContent.trim()
      : "Unknown";
    const submenu = parent.querySelector(".submenu");
    const submenuItems = submenu
      ? submenu.querySelectorAll(".submenu-item")
      : [];

    console.log(
      "%c=== SUBMENU TOGGLE EVENT ===",
      "color: #f59e0b; font-size: 14px; font-weight: bold;"
    );
    console.log(`Menu: "${menuTitle}"`);
    console.log(
      `Previous state: ${wasActive ? "Active (Open)" : "Inactive (Closed)"}`
    );
    console.log(
      `Current state: ${isNowActive ? "Active (Open)" : "Inactive (Closed)"}`
    );
    console.log(`Submenu items count: ${submenuItems.length}`);

    if (submenuItems.length > 0) {
      console.log("Submenu items:");
      submenuItems.forEach((subItem, index) => {
        // subItem is already the <a> element with class "submenu-item"
        const subTitle =
          subItem.getAttribute("data-title") ||
          subItem.textContent.trim() ||
          "Unknown";
        const subHref = subItem.getAttribute("href") || "N/A";
        const subActive = subItem.classList.contains("active");
        console.log(`  ${index + 1}. ${subTitle}`, {
          href: subHref,
          active: subActive,
        });
      });
    }

    console.log(
      "%c=== SUBMENU TOGGLE COMPLETE ===",
      "color: #f59e0b; font-size: 14px; font-weight: bold;"
    );
  }
};

// Initialize sidebar toggle
function initSidebar() {
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("sidebar");

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      const isCollapsed = sidebar.classList.contains("collapsed");
      sidebar.classList.toggle("collapsed");
      const nowCollapsed = sidebar.classList.contains("collapsed");

      console.log(
        "%c=== SIDEBAR TOGGLE EVENT ===",
        "color: #0ea5e9; font-size: 14px; font-weight: bold;"
      );
      console.log(`Sidebar ${nowCollapsed ? "COLLAPSED" : "EXPANDED"}`);
      console.log(`Previous state: ${isCollapsed ? "Collapsed" : "Expanded"}`);
      console.log(`Current state: ${nowCollapsed ? "Collapsed" : "Expanded"}`);

      // Check for menu items with submenu
      const menuItemsWithSubmenu = document.querySelectorAll(
        ".menu-item-has-children"
      );
      console.log(
        `\n📋 Menu items with submenu: ${menuItemsWithSubmenu.length}`
      );

      if (menuItemsWithSubmenu.length > 0) {
        console.log(
          "%c\n=== MENU ITEMS WITH SUBMENU ===",
          "color: #10b981; font-weight: bold;"
        );
        menuItemsWithSubmenu.forEach((menuItem, index) => {
          const menuLink = menuItem.querySelector(".menu-item");
          const menuTitle = menuLink
            ? menuLink.getAttribute("data-title") || menuLink.textContent.trim()
            : "Unknown";
          const submenu = menuItem.querySelector(".submenu");
          const submenuItems = submenu
            ? submenu.querySelectorAll(".submenu-item")
            : [];
          const isActive = menuItem.classList.contains("active");
          const isSubmenuVisible =
            submenu &&
            submenu.style.display !== "none" &&
            submenu.offsetHeight > 0;

          console.log(`\n${index + 1}. Menu: "${menuTitle}"`, {
            hasSubmenu: !!submenu,
            submenuItemCount: submenuItems.length,
            isActive: isActive,
            isSubmenuVisible: isSubmenuVisible,
            sidebarCollapsed: nowCollapsed,
          });

          if (submenuItems.length > 0) {
            console.log(`   Submenu items (${submenuItems.length}):`);
            submenuItems.forEach((subItem, subIndex) => {
              // subItem is already the <a> element with class "submenu-item"
              const subTitle =
                subItem.getAttribute("data-title") ||
                subItem.textContent.trim() ||
                "Unknown";
              const subHref = subItem.getAttribute("href") || "N/A";
              const subActive = subItem.classList.contains("active");
              console.log(`     ${subIndex + 1}. ${subTitle}`, {
                href: subHref,
                active: subActive,
              });
            });
          }
        });
      } else {
        console.log("⚠️ No menu items with submenu found");
      }

      console.log(
        "%c\n=== SIDEBAR TOGGLE COMPLETE ===",
        "color: #0ea5e9; font-size: 14px; font-weight: bold;"
      );
    });
  }

  // Mobile sidebar toggle
  const mobileToggle = document.querySelector('[data-bs-toggle="offcanvas"]');
  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      sidebar.classList.toggle("show");
      console.log("📱 Mobile sidebar toggled");
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
    console.log("🔧 Initializing modern UI effects...");

    // Add smooth scroll - only for anchors with valid ID selectors
    // Get all anchors and filter out those with href="#" or invalid
    const allAnchors = document.querySelectorAll("a");
    console.log(`📋 Total anchors found: ${allAnchors.length}`);

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

        if (isValid) {
          console.log(`✅ Anchor passed filter: "${trimmedHref}"`);
        } else {
          console.log(`⏭️ Anchor filtered out: "${trimmedHref}"`);
        }

        return isValid;
      } catch (error) {
        console.error("❌ Error filtering anchor:", error);
        return false;
      }
    });

    console.log(
      `📋 Found ${anchors.length} valid anchor links with href starting with # (excluding #)`
    );

    anchors.forEach((anchor, index) => {
      try {
        const href = anchor.getAttribute("href");
        if (!href) {
          console.warn(`⚠️ Anchor ${index + 1} has no href, skipping`);
          return;
        }

        const trimmedHref = href.trim();

        // Final safety check
        if (trimmedHref === "#" || trimmedHref.length <= 1) {
          console.warn(
            `⚠️ Anchor ${
              index + 1
            } has invalid href: "${trimmedHref}", skipping`
          );
          return;
        }

        console.log(
          `✅ Processing anchor ${index + 1} with href: "${trimmedHref}"`
        );

        anchor.addEventListener("click", function (e) {
          console.log(`🖱️ Clicked anchor with href: "${trimmedHref}"`);
          e.preventDefault();

          try {
            console.log(`🔍 Attempting to query selector: "${trimmedHref}"`);
            const target = document.querySelector(trimmedHref);
            console.log(`🎯 Target element found:`, target);

            if (target) {
              target.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
              console.log(`✅ Scrolled to target`);
            } else {
              console.warn(
                `⚠️ Target element not found for href: "${trimmedHref}"`
              );
            }
          } catch (error) {
            console.error(
              `❌ Error querying selector "${trimmedHref}":`,
              error
            );
            console.error("Error details:", error.message, error.stack);
          }
        });
      } catch (error) {
        console.error(`❌ Error processing anchor ${index + 1}:`, error);
      }
    });

    console.log("✅ Modern UI effects initialized");
  } catch (error) {
    console.error("❌ Error in initModernUI:", error);
    console.error("Error details:", error.message, error.stack);
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
      // But still log for debugging
      if (isCollapsed) {
        console.log(
          "%c⚠️ Sidebar is collapsed - submenu toggle handled by hover",
          "color: #f59e0b; font-weight: bold;"
        );
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
