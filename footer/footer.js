/*
 * Footer Component JavaScript
 * Loads footer HTML dynamically and handles footer functionality
 */

// Function to load footer HTML
function loadFooter() {
    fetch('footer/footer.html')
        .then(response => response.text())
        .then(html => {
            const footerContainer = document.getElementById('footer-container');
            if (footerContainer) {
                footerContainer.innerHTML = html;
            }
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
}

// Function to load footer for product view page (different path)
function loadFooterForProductView() {
    fetch('../../footer/footer.html')
        .then(response => response.text())
        .then(html => {
            const footerContainer = document.getElementById('footer-container');
            if (footerContainer) {
                footerContainer.innerHTML = html;
            }
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
}

// Initialize footer when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're in a subdirectory (like product-view-page)
    const isInSubdirectory = window.location.pathname.includes('/other-pages/');
    
    if (isInSubdirectory) {
        loadFooterForProductView();
    } else {
        loadFooter();
    }
});

// Newsletter subscription functionality
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('newsletter-btn')) {
        e.preventDefault();
        const emailInput = e.target.parentElement.querySelector('.newsletter-input');
        const email = emailInput.value.trim();
        
        if (email && isValidEmail(email)) {
            // Simulate newsletter subscription
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            emailInput.value = '';
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification function (if not already available)
function showNotification(message, type = 'info') {
    // Check if notification function exists in main.js
    if (typeof window.showNotification === 'function') {
        window.showNotification(message, type);
    } else {
        // Fallback notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type} show`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}
