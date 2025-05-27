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
        console.log('Mivara.co initialized successfully');
    },

    // Set up global event listeners
    setupEventListeners() {
        // Window resize handler
        window.addEventListener('resize', () => this.handleResize());

        // Mobile overlay click handler
        const overlay = document.getElementById('mobileOverlay');
        if (overlay) {
            overlay.addEventListener('click', () => {
                // Handle overlay click if needed
            });
        }

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



    // Toggle dropdown menu
    toggleDropdown(dropdownId) {
        const dropdown = document.getElementById(dropdownId);
        if (!dropdown) return;

        // Close other dropdowns
        if (this.currentDropdown && this.currentDropdown !== dropdownId) {
            this.closeDropdown(this.currentDropdown);
        }

        const isOpen = dropdown.classList.contains('open');

        if (isOpen) {
            this.closeDropdown(dropdownId);
        } else {
            this.openDropdown(dropdownId);
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

        console.log('Searching for:', query);
        // TODO: Implement search functionality
        // This will be connected to product filtering later
    },

    // Add to cart functionality
    addToCart(productId, quantity = 1) {
        console.log(`Adding product ${productId} to cart (quantity: ${quantity})`);
        // TODO: Implement cart functionality
        // This will be connected to cart management later

        // Show success message (temporary)
        this.showNotification('Product added to cart!', 'success');
    },

    // Add to wishlist functionality
    addToWishlist(productId) {
        console.log(`Adding product ${productId} to wishlist`);
        // TODO: Implement wishlist functionality

        // Show success message (temporary)
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

/**
 * Component loader function
 * Loads HTML components into specified containers
 */
async function loadComponent(componentPath, containerId) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to load ${componentPath}: ${response.status}`);
        }

        const html = await response.text();
        const container = document.getElementById(containerId);

        if (container) {
            container.innerHTML = html;
            console.log(`Component ${componentPath} loaded successfully`);
        } else {
            console.error(`Container ${containerId} not found`);
        }
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);

        // Show fallback content
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `<div class="error-message">Failed to load ${componentPath}</div>`;
        }
    }
}

/**
 * Utility functions
 */
const Utils = {
    // Format price with currency
    formatPrice(price, currency = '₹') {
        return `${currency}${price.toLocaleString()}`;
    },

    // Calculate discount percentage
    calculateDiscount(originalPrice, discountedPrice) {
        return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
    },

    // Debounce function for search
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    MivaraApp.init();
});

// Make functions globally available
window.MivaraApp = MivaraApp;
window.Utils = Utils;
window.loadComponent = loadComponent;
