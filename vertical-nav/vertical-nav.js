/*
 * Vertical Navigation Bar JavaScript
 * Handles hover interactions and sidebar triggering
 */

class VerticalNav {
    constructor() {
        this.verticalNav = document.getElementById('verticalNav');
        this.sidebar = document.getElementById('sidebar');
        this.mobileOverlay = document.getElementById('mobileOverlay');
        this.hoverTimeout = null;
        this.isHovering = false;

        this.init();
    }

    init() {
        if (!this.verticalNav) return;

        this.setupEventListeners();
        this.updateActiveLink();
    }

    setupEventListeners() {
        // Vertical nav hover events
        this.verticalNav.addEventListener('mouseenter', () => {
            this.handleVerticalNavHover();
        });

        this.verticalNav.addEventListener('mouseleave', () => {
            this.handleVerticalNavLeave();
        });

        // Sidebar hover events to keep it open
        if (this.sidebar) {
            this.sidebar.addEventListener('mouseenter', () => {
                this.isHovering = true;
                this.clearHoverTimeout();
            });

            this.sidebar.addEventListener('mouseleave', () => {
                this.isHovering = false;
                this.handleSidebarLeave();
            });
        }

        // Navigation link clicks
        const navLinks = this.verticalNav.querySelectorAll('.vertical-nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleNavLinkClick(e, link);
            });
        });

        // Close sidebar when clicking on overlay
        if (this.mobileOverlay) {
            this.mobileOverlay.addEventListener('click', () => {
                this.closeSidebar();
            });
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    handleVerticalNavHover() {
        this.isHovering = true;
        this.clearHoverTimeout();

        // Small delay before opening sidebar
        this.hoverTimeout = setTimeout(() => {
            if (this.isHovering) {
                this.openSidebar();
            }
        }, 200);
    }

    handleVerticalNavLeave() {
        this.isHovering = false;
        this.clearHoverTimeout();

        // Delay before closing to allow moving to sidebar
        this.hoverTimeout = setTimeout(() => {
            if (!this.isHovering) {
                this.closeSidebar();
            }
        }, 300);
    }

    handleSidebarLeave() {
        // Delay before closing sidebar
        this.hoverTimeout = setTimeout(() => {
            if (!this.isHovering) {
                this.closeSidebar();
            }
        }, 300);
    }

    openSidebar() {
        if (this.sidebar) {
            this.sidebar.classList.add('open');
        }

        // Show overlay on mobile/tablet
        if (window.innerWidth <= 1024 && this.mobileOverlay) {
            this.mobileOverlay.classList.add('active');
        }

        // Add class to body to prevent scrolling on mobile
        if (window.innerWidth <= 768) {
            document.body.classList.add('sidebar-open');
        }
    }

    closeSidebar() {
        if (this.sidebar) {
            this.sidebar.classList.remove('open');
        }

        if (this.mobileOverlay) {
            this.mobileOverlay.classList.remove('active');
        }

        document.body.classList.remove('sidebar-open');
    }

    clearHoverTimeout() {
        if (this.hoverTimeout) {
            clearTimeout(this.hoverTimeout);
            this.hoverTimeout = null;
        }
    }

    handleNavLinkClick(e, link) {
        e.preventDefault();

        // Update active state
        this.updateActiveLink(link);

        // Get the target from href
        const target = link.getAttribute('href');

        // Handle navigation based on target
        this.navigateToSection(target);

        // Keep sidebar open briefly to show the navigation
        this.openSidebar();

        // Close after a delay on mobile
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                this.closeSidebar();
            }, 1500);
        }
    }

    updateActiveLink(activeLink = null) {
        const navLinks = this.verticalNav.querySelectorAll('.vertical-nav-link');

        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        if (activeLink) {
            activeLink.classList.add('active');
        } else {
            // Set default active link based on current page
            const currentPath = window.location.pathname;
            const defaultLink = this.verticalNav.querySelector('.vertical-nav-link[href="#dashboard"]');
            if (defaultLink) {
                defaultLink.classList.add('active');
            }
        }
    }

    navigateToSection(target) {
        // Handle different navigation targets
        switch(target) {
            case '#dashboard':
                this.showNotification('Navigating to Dashboard');
                break;
            case '#wishlist':
                this.showNotification('Opening Wishlist');
                break;
            case '#orders':
                this.showNotification('Viewing Orders');
                break;
            case '#special-collections':
                this.showNotification('Browsing Special Collections');
                break;
            case '#settings':
                this.showNotification('Opening Settings');
                break;
            case '#switch-accounts':
                this.showNotification('Switch Accounts');
                break;
            case '#help-support':
                this.showNotification('Opening Help & Support');
                break;
            case '#logout':
                this.showNotification('Logging out...');
                // Add logout functionality here
                setTimeout(() => {
                    this.showNotification('Logout successful');
                }, 1000);
                break;
            default:
                // Handle other navigation targets
        }
    }

    showNotification(message) {
        // Create and show a notification
        const notification = document.createElement('div');
        notification.className = 'notification notification-info show';
        notification.textContent = message;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    handleResize() {
        // Close sidebar on resize to prevent layout issues
        if (window.innerWidth > 1024) {
            this.closeSidebar();
        }
    }
}

// Initialize vertical navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VerticalNav();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VerticalNav;
}
