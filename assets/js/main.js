/**
 * Main JavaScript file for Mivara.co
 * Handles component loading, navigation, and interactive features
 */

// Global state management
const MivaraApp = {
    isMobile: window.innerWidth <= 768,
    sidebarOpen: false,
    currentDropdown: null,

    // Initialize the application
    init() {
        this.setupEventListeners();
        this.handleResize();
    },

    // Set up global event listeners
    setupEventListeners() {
        // Window resize handler
        window.addEventListener('resize', () => this.handleResize());

        // Escape key handler for closing dropdowns
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllDropdowns();
            }
        });

        // Click outside handler for dropdowns
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown-container')) {
                this.closeAllDropdowns();
            }
        });

        // Setup sidebar hover functionality
        this.setupSidebarHover();

        // Setup topbar dropdown hover functionality
        this.setupTopbarDropdownHover();
    },

    // Handle window resize
    handleResize() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 768;

        // If switching from mobile to desktop, close sidebar
        if (wasMobile && !this.isMobile && this.sidebarOpen) {
            this.closeSidebar();
        }

        // Reset content margins for responsive design
        this.adjustContentForSidebar(false);
    },

    // Setup sidebar hover functionality
    setupSidebarHover() {
        const verticalNav = document.getElementById('verticalNav');
        const mainContent = document.querySelector('.main-content');

        if (verticalNav && mainContent) {
            // When sidebar is hovered, expand content area with proper timing
            verticalNav.addEventListener('mouseenter', () => {
                if (!this.sidebarOpen && !this.isMobile) {
                    // Adjust content to match sidebar expansion timing
                    setTimeout(() => {
                        this.adjustContentForSidebar(true);
                    }, 100); // Sync with sidebar expansion
                }
            });

            // When sidebar hover ends, contract content area
            verticalNav.addEventListener('mouseleave', () => {
                if (!this.sidebarOpen && !this.isMobile) {
                    this.adjustContentForSidebar(false);
                }
            });
        }
    },

    // Setup topbar dropdown hover functionality
    setupTopbarDropdownHover() {
        const dropdownContainers = document.querySelectorAll('.dropdown-container');
        let currentHoverTimeout = null;
        let currentCloseTimeout = null;
        let isTransitioning = false;
        let lastHoveredContainer = null;
        // Add hover detection to the entire topbar
        const topbar = document.querySelector('.topbar-center');
        if (topbar) {
            topbar.addEventListener('mouseleave', () => {
                // Close all dropdowns when leaving the entire navigation area
                if (currentCloseTimeout) {
                    clearTimeout(currentCloseTimeout);
                }
                currentCloseTimeout = setTimeout(() => {
                    this.closeAllDropdowns();
                    lastHoveredContainer = null;
                    currentCloseTimeout = null;
                }, 300);
            });
        }

        dropdownContainers.forEach(container => {
            const trigger = container.querySelector('.dropdown-trigger');
            const dropdown = container.querySelector('.dropdown-menu');

            if (!trigger || !dropdown) return;

            // Mouse enter on container
            container.addEventListener('mouseenter', () => {
                // Prevent rapid triggering during mouse transitions
                if (isTransitioning) return;

                // If this is the same container as last hovered, ignore
                if (lastHoveredContainer === container) return;

                // Clear any existing timeouts
                if (currentHoverTimeout) {
                    clearTimeout(currentHoverTimeout);
                    currentHoverTimeout = null;
                }
                if (currentCloseTimeout) {
                    clearTimeout(currentCloseTimeout);
                    currentCloseTimeout = null;
                }

                // Add delay to prevent accidental triggers when moving between nav items
                currentHoverTimeout = setTimeout(() => {
                    // Check if mouse is still over the container
                    if (container.matches(':hover') && !isTransitioning) {
                        isTransitioning = true;
                        lastHoveredContainer = container;

                        // Close other dropdowns immediately for smooth transition
                        this.closeAllDropdowns();

                        // Open the dropdown
                        const dropdownId = dropdown.id;
                        if (dropdownId) {
                            this.openDropdown(dropdownId);
                            this.adjustDropdownPosition(dropdown);
                        }

                        // Reset transition flag after animation
                        setTimeout(() => {
                            isTransitioning = false;
                        }, 300);
                    }
                    currentHoverTimeout = null;
                }, 150); // Reasonable delay to prevent accidental triggers
            });

            // Mouse leave on container
            container.addEventListener('mouseleave', () => {
                // Clear any existing timeouts
                if (currentHoverTimeout) {
                    clearTimeout(currentHoverTimeout);
                    currentHoverTimeout = null;
                }
                if (currentCloseTimeout) {
                    clearTimeout(currentCloseTimeout);
                    currentCloseTimeout = null;
                }

                // Short delay before closing to allow moving to dropdown
                currentCloseTimeout = setTimeout(() => {
                    const dropdownId = dropdown.id;
                    if (dropdownId && !dropdown.matches(':hover')) {
                        this.closeDropdown(dropdownId);
                    }
                    currentCloseTimeout = null;
                }, 200);
            });

            // Keep dropdown open when hovering over the dropdown itself
            dropdown.addEventListener('mouseenter', () => {
                if (currentCloseTimeout) {
                    clearTimeout(currentCloseTimeout);
                    currentCloseTimeout = null;
                }
            });

            dropdown.addEventListener('mouseleave', () => {
                if (currentCloseTimeout) {
                    clearTimeout(currentCloseTimeout);
                    currentCloseTimeout = null;
                }

                currentCloseTimeout = setTimeout(() => {
                    const dropdownId = dropdown.id;
                    if (dropdownId) {
                        this.closeDropdown(dropdownId);
                    }
                    currentCloseTimeout = null;
                }, 200);
            });
        });

        // Listen for sidebar hover changes to adjust dropdown positions
        const verticalNav = document.getElementById('verticalNav');
        if (verticalNav) {
            verticalNav.addEventListener('mouseenter', () => {
                this.adjustAllDropdownPositions(true);
            });

            verticalNav.addEventListener('mouseleave', () => {
                this.adjustAllDropdownPositions(false);
            });
        }
    },

    // Adjust dropdown position based on sidebar state
    adjustDropdownPosition(dropdown) {
        if (!dropdown) return;

        const dropdownId = dropdown.id;
        if (dropdownId === 'mensDropdown' || dropdownId === 'womensDropdown') {
            const verticalNav = document.getElementById('verticalNav');
            const isHovered = verticalNav && verticalNav.matches(':hover');
            const leftPosition = isHovered ? '220px' : '60px';
            dropdown.style.left = leftPosition;
        }
    },

    // Adjust all dropdown positions when sidebar state changes
    adjustAllDropdownPositions(sidebarExpanded) {
        const mensDropdown = document.getElementById('mensDropdown');
        const womensDropdown = document.getElementById('womensDropdown');

        const leftPosition = sidebarExpanded ? '220px' : '60px';

        if (mensDropdown) {
            mensDropdown.style.left = leftPosition;
        }
        if (womensDropdown) {
            womensDropdown.style.left = leftPosition;
        }
    },

    // Adjust main content for sidebar expansion
    adjustContentForSidebar(expanded) {
        const mainContent = document.querySelector('.main-content');
        if (!mainContent || this.isMobile) return;

        if (expanded) {
            // Sidebar expanded - add class for CSS transition
            mainContent.classList.add('sidebar-expanded');
        } else {
            // Sidebar collapsed - remove class
            mainContent.classList.remove('sidebar-expanded');
            // Clear any inline styles that might interfere
            mainContent.style.marginLeft = '';
            mainContent.style.width = '';
        }
    },





    // Open specific dropdown
    openDropdown(dropdownId) {
        const dropdown = document.getElementById(dropdownId);
        if (dropdown) {
            dropdown.classList.add('open');
            this.currentDropdown = dropdownId;
        }
    },

    // Close specific dropdown
    closeDropdown(dropdownId) {
        const dropdown = document.getElementById(dropdownId);
        if (dropdown) {
            dropdown.classList.remove('open');
            if (this.currentDropdown === dropdownId) {
                this.currentDropdown = null;
            }
        }
    },

    // Close all dropdowns
    closeAllDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown-menu');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('open');
        });
        this.currentDropdown = null;
    },

    // Search functionality
    handleSearch(query) {
        if (!query.trim()) return;
        // TODO: Implement search functionality
        // This will be connected to product filtering later
    },

    // Add to cart functionality
    addToCart(productId, quantity = 1) {
        // TODO: Implement cart functionality
        // This will be connected to cart management later
        this.showNotification('Product added to cart!', 'success');
    },

    // Add to wishlist functionality
    addToWishlist(productId) {
        // TODO: Implement wishlist functionality
        this.showNotification('Product added to wishlist!', 'success');
    },

    // Show notification
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Add to page
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    MivaraApp.init();
});

// Make functions globally available
window.MivaraApp = MivaraApp;
