/*
 * Product View Page JavaScript
 * Handles product interactions, image gallery, and dynamic content
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality since HTML is embedded
    initializeTopbarFunctionality();
    initializeVerticalNavFunctionality();
    initializeImageGallery();
    initializeProductOptions();
    initializeActionButtons();
    loadSimilarProducts();

    // Initialize main app functionality
    if (typeof MivaraApp !== 'undefined') {
        MivaraApp.init();
    }
});

// Initialize Topbar Functionality
function initializeTopbarFunctionality() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');

    if (searchInput && searchBtn) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch(this.value);
            }
        });

        searchBtn.addEventListener('click', function() {
            const query = searchInput.value;
            handleSearch(query);
        });
    }

    // Cart functionality
    const cartLink = document.querySelector('.cart-link');
    if (cartLink) {
        cartLink.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Cart functionality coming soon!', 'info');
        });
    }

    // Profile functionality
    const profileLink = document.querySelector('.profile-link');
    if (profileLink) {
        profileLink.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Profile dashboard coming soon!', 'info');
        });
    }

    // Logo link
    const logoLink = document.querySelector('.logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = '../../index.html';
        });
    }

    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === '/' || href === '#') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                if (this.textContent.trim() === 'Home') {
                    window.location.href = '../../index.html';
                } else {
                    const linkText = this.textContent.trim();
                    showNotification(`${linkText} section coming soon!`, 'info');
                }
            });
        }
    });

    // Dropdown links
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent.trim();
            showNotification(`${linkText} page coming soon!`, 'info');
        });
    });
}

// Initialize Vertical Nav Functionality
function initializeVerticalNavFunctionality() {
    const verticalNavLinks = document.querySelectorAll('.vertical-nav-link');

    verticalNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const href = this.getAttribute('href');
            const text = this.querySelector('.nav-text')?.textContent || 'Feature';

            // Handle different navigation items
            switch(href) {
                case '#dashboard':
                    showNotification('Dashboard coming soon!', 'info');
                    break;
                case '#wishlist':
                    showNotification('Wishlist page coming soon!', 'info');
                    break;
                case '#orders':
                    showNotification('Orders page coming soon!', 'info');
                    break;
                case '#special-collections':
                    showNotification('Special Collections coming soon!', 'info');
                    break;
                case '#settings':
                    showNotification('Settings page coming soon!', 'info');
                    break;
                case '#switch-accounts':
                    showNotification('Account switching coming soon!', 'info');
                    break;
                case '#help-support':
                    showNotification('Help & Support coming soon!', 'info');
                    break;
                case '#logout':
                    if (confirm('Are you sure you want to logout?')) {
                        showNotification('Logging out...', 'info');
                        setTimeout(() => {
                            window.location.href = '../../index.html';
                        }, 1500);
                    }
                    break;
                default:
                    showNotification(`${text} feature coming soon!`, 'info');
            }
        });
    });
}

// Search handler
function handleSearch(query) {
    if (!query.trim()) {
        showNotification('Please enter a search term', 'warning');
        return;
    }

    showNotification(`Searching for "${query}"...`, 'info');
    // TODO: Implement actual search functionality
}

// Initialize Image Gallery
function initializeImageGallery() {
    const mainImage = document.getElementById('mainProductImage');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(thumb => thumb.classList.remove('active'));

            // Add active class to clicked thumbnail
            this.classList.add('active');

            // Update main image
            mainImage.src = this.src;
            mainImage.alt = this.alt;
        });
    });

    // Image zoom functionality
    const mainImageContainer = document.querySelector('.main-image');
    mainImageContainer.addEventListener('click', function() {
        // Implement image zoom modal here
        showImageZoom(mainImage.src);
    });
}

// Show Image Zoom Modal
function showImageZoom(imageSrc) {
    // Create zoom modal
    const modal = document.createElement('div');
    modal.className = 'image-zoom-modal';
    modal.innerHTML = `
        <div class="zoom-overlay">
            <div class="zoom-container">
                <img src="${imageSrc}" alt="Zoomed product image">
                <button class="close-zoom">&times;</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add styles for zoom modal
    const style = document.createElement('style');
    style.textContent = `
        .image-zoom-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .zoom-container {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        .zoom-container img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        .close-zoom {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    // Close modal functionality
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('close-zoom')) {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        }
    });
}

// Initialize Product Options
function initializeProductOptions() {
    // Color options
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');

            // Update product based on color selection
            updateProductColor(this.dataset.color);
        });
    });

    // Size options
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            sizeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');

            // Update product based on size selection
            updateProductSize(this.dataset.size);
        });
    });
}

// Update Product Color
function updateProductColor(color) {
    console.log('Selected color:', color);
    // Here you would typically update the main image based on color
    // For now, we'll just log the selection
}

// Update Product Size
function updateProductSize(size) {
    console.log('Selected size:', size);
    // Here you would typically update availability or pricing based on size
    // For now, we'll just log the selection
}

// Initialize Action Buttons
function initializeActionButtons() {
    const addToCartBtn = document.querySelector('.add-to-cart');
    const buyNowBtn = document.querySelector('.buy-now');
    const wishlistBtn = document.querySelector('.wishlist-btn');

    addToCartBtn.addEventListener('click', function() {
        addToCart();
    });

    buyNowBtn.addEventListener('click', function() {
        buyNow();
    });

    wishlistBtn.addEventListener('click', function() {
        toggleWishlist();
    });
}

// Add to Cart Function
function addToCart() {
    const selectedColor = document.querySelector('.color-option.active')?.dataset.color;
    const selectedSize = document.querySelector('.size-option.active')?.dataset.size;

    if (!selectedColor || !selectedSize) {
        showNotification('Please select color and size', 'warning');
        return;
    }

    // Add to cart logic here
    showNotification('Product added to cart!', 'success');

    // Update cart count in topbar
    updateCartCount();
}

// Update Cart Count
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        let currentCount = parseInt(cartCountElement.textContent) || 0;
        currentCount += 1;
        cartCountElement.textContent = currentCount;

        // Add animation to cart icon
        const cartLink = document.querySelector('.cart-link');
        if (cartLink) {
            cartLink.style.transform = 'scale(1.1)';
            setTimeout(() => {
                cartLink.style.transform = 'scale(1)';
            }, 200);
        }
    }
}

// Buy Now Function
function buyNow() {
    const selectedColor = document.querySelector('.color-option.active')?.dataset.color;
    const selectedSize = document.querySelector('.size-option.active')?.dataset.size;

    if (!selectedColor || !selectedSize) {
        showNotification('Please select color and size', 'warning');
        return;
    }

    // Redirect to checkout or show checkout modal
    showNotification('Redirecting to checkout...', 'info');

    // Simulate redirect delay
    setTimeout(() => {
        // window.location.href = '/checkout';
        console.log('Redirecting to checkout page...');
    }, 1500);
}

// Toggle Wishlist
function toggleWishlist() {
    const wishlistBtn = document.querySelector('.wishlist-btn');
    const icon = wishlistBtn.querySelector('i');

    if (wishlistBtn.classList.contains('active')) {
        wishlistBtn.classList.remove('active');
        icon.className = 'far fa-heart';
        showNotification('Removed from wishlist', 'info');
    } else {
        wishlistBtn.classList.add('active');
        icon.className = 'fas fa-heart';
        showNotification('Added to wishlist!', 'success');
    }
}

// Load Similar Products
function loadSimilarProducts() {
    const productsGrid = document.querySelector('.similar-products .products-grid');

    // Sample similar products data
    const similarProducts = [
        {
            id: 1,
            name: 'Classic Cotton Polo',
            price: 1199,
            originalPrice: 1599,
            image: '../../assets/images/SHIRT DESIGN - Mark Anthony Villanueva.jpg',
            badge: 'bestseller'
        },
        {
            id: 2,
            name: 'Premium Henley Shirt',
            price: 1399,
            originalPrice: 1899,
            image: '../../assets/images/41e03a9aa769b167149c74e7c1220a1f.jpg',
            badge: 'new-arrival'
        },
        {
            id: 3,
            name: 'Casual Button Down',
            price: 1599,
            originalPrice: 2199,
            image: '../../assets/images/close-up-lady-wearing-black-dress-with-stylish-leather-strap-while-standing-outdoors-female-fashion.jpg',
            badge: 'trending'
        },
        {
            id: 4,
            name: 'Vintage Crew Neck',
            price: 1099,
            originalPrice: 1499,
            image: '../../assets/images/shop-clothing-clothes-shop-hanger-modern-shop-boutique.jpg',
            badge: 'collection'
        }
    ];

    // Generate product cards
    productsGrid.innerHTML = similarProducts.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-badge ${product.badge}">${product.badge.replace('-', ' ')}</div>
                <div class="product-actions">
                    <button class="action-btn" onclick="addToWishlist(${product.id})">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="action-btn" onclick="quickView(${product.id})">
                        <i class="far fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">
                    <span class="discounted-price">₹${product.price}</span>
                    <span class="original-price">₹${product.originalPrice}</span>
                    <span class="discount-percent">${Math.round((1 - product.price/product.originalPrice) * 100)}% OFF</span>
                </div>
            </div>
        </div>
    `).join('');

    // Add click handlers for product cards
    const productCards = productsGrid.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.action-btn')) {
                const productId = this.dataset.productId;
                // Navigate to product page
                console.log('Navigate to product:', productId);
            }
        });
    });
}

// Utility Functions
function addToWishlist(productId) {
    showNotification('Added to wishlist!', 'success');
}

function quickView(productId) {
    showNotification('Quick view feature coming soon!', 'info');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}
