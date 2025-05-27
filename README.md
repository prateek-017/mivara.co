# Mivara.co - Premium T-Shirt Ecommerce Website

A modern, responsive ecommerce website for premium t-shirts and fashion apparel built with vanilla HTML, CSS, and JavaScript.

## 🚀 Features

### ✅ Completed Features
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, minimal design with professional color palette
- **Component-Based Architecture**: Modular HTML/CSS/JS structure
- **Interactive Navigation**:
  - Sticky topbar with mega dropdown menus
  - Collapsible sidebar with user dashboard
- **Product Showcase**:
  - Hero banner with call-to-action
  - Best Deals section with product cards
  - Trending This Season section
  - Latest Arrivals section
- **Product Cards**: Include image, name, discounted/original price, discount percentage, deal type badges, and color options
- **Interactive Elements**: Hover effects, smooth transitions, and modern animations
- **Search Functionality**: Search bar in topbar (frontend ready)
- **Cart Integration**: Cart icon with counter (frontend ready)
- **Wishlist Feature**: Add to wishlist functionality (frontend ready)

### 🎨 Design System
- **Color Palette**:
  - Background: #F7F7F7 (Soft Grayish White)
  - Primary Text: #1C1C1C (Deep Graphite Black)
  - Accent: #D1AE87 (Warm Tan/Gold)
  - Borders: #E4E4E7 (Light Cool Gray)
  - CTA Buttons: #242424 / #C0A97E (Matte Gold)

- **Typography**:
  - Logo/Brand: Poppins SemiBold
  - Headings: Poppins
  - Body Text: DM Sans
  - Price/CTA: Urbanist Medium

### 📁 Project Structure
```
mivara-co/
├── index.html                 # Main entry file
├── assets/
│   ├── css/
│   │   └── global.css        # Global styles and variables
│   ├── js/
│   │   └── main.js           # Main JavaScript functionality
│   ├── images/               # Product and site images
│   ├── icons/                # Icons and favicons
│   └── fonts/                # Custom fonts
├── topbar/
│   ├── topbar.html           # Navigation component
│   ├── topbar.css            # Navigation styles
│   ├── mens-collection/      # Men's product pages
│   ├── women-collection/     # Women's product pages
│   └── top-collections/      # Featured collections
├── sidebar/
│   ├── sidebar.html          # Sidebar component
│   └── sidebar.css           # Sidebar styles
├── homepage/
│   ├── homepage.html         # Homepage content
│   └── homepage.css          # Homepage styles
└── footer/                   # Footer component (planned)
```

## 🛠️ Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid, Flexbox, CSS Custom Properties
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Google Fonts (Poppins, DM Sans, Inter, Urbanist)
- **Images**: Pexels, Pixabay, Canva

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation
1. Clone or download the repository
2. Open `index.html` in your web browser
3. For development, serve the files using a local server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve . -p 8000

   # Using PHP
   php -S localhost:8000
   ```

## 📱 Responsive Breakpoints
- **Mobile**: ≤ 768px
- **Tablet**: 769px - 1024px
- **Desktop**: ≥ 1025px

## 🎯 Key Components

### Navigation (Topbar)
- Logo on the left
- Central navigation menu with mega dropdowns
- Search bar, cart, and auth buttons on the right

### Sidebar
- User profile section
- Dashboard navigation
- Orders dropdown (Active/Past orders)
- Special Collections
- Settings and account management
- Promotional section

### Homepage Sections
1. **Hero Banner**: Main call-to-action with statistics
2. **Best Deals**: Featured discounted products
3. **Trending This Season**: Popular current items
4. **Latest Arrivals**: Newest product releases

### Product Cards
- High-quality product images
- Product name and pricing
- Discount percentage and badges
- Color variant circles
- Hover effects with action buttons

## 🔧 Customization

### Colors
Modify CSS custom properties in `assets/css/global.css`:
```css
:root {
    --bg-primary: #F7F7F7;
    --text-primary: #1C1C1C;
    --accent-primary: #D1AE87;
    /* ... */
}
```

### Typography
Update font imports in `index.html` and variables in `global.css`

### Layout
Adjust grid layouts and spacing using CSS custom properties

## 🚧 Future Enhancements
- Backend integration for product data
- User authentication system
- Shopping cart functionality
- Payment gateway integration
- Product filtering and sorting
- User reviews and ratings
- Order management system
- Admin dashboard
- SEO optimization
- Performance optimization

## 📄 License
This project is for educational and demonstration purposes.

## 🤝 Contributing
Feel free to submit issues and enhancement requests!

---
**Mivara.co** - Where style meets comfort. Premium t-shirts for the modern individual.
