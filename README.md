# GPCO CMS US - Content Management System

A professional HTML, CSS, and JavaScript-based content management system designed for corporate use, featuring American Express-inspired styling and comprehensive functionality.

## 🎯 Features

### Main Dashboard
- **Professional welcome interface** with "GPCO CMS US" branding
- **Modern card-based navigation** to different modules
- **Responsive design** that works on all devices
- **American Express-inspired styling** with corporate blue theme

### Core Modules
- **Schedule File Management** - Organize and manage scheduling operations
- **Task Assignment** - Kanban-style task board with team collaboration
- **P&DI (Performance & Development Insights)** - Analytics and performance metrics
- **GAX (Global Application Exchange)** - System integration monitoring
- **Standard Operating Procedures** - Region-specific SOPs for Delhi, Manila, and US
- **Important Links** - Quick access to essential resources and tools

### SOP Pages
- **Full-page PDF viewers** with auto-loading functionality
- **Region-specific procedures** for Delhi, Manila, and US operations
- **Professional headers** with "View it on Square" buttons
- **PDF.js integration** for offline PDF viewing
- **OneDrive compatible** - works without server requirements

## 🚀 Technology Stack

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)** - Interactive functionality and PDF handling
- **PDF.js** - Client-side PDF rendering
- **Font Awesome** - Professional icons
- **Inter Font** - Modern typography

## 📁 Project Structure

```
├── index.html              # Main dashboard page
├── styles.css              # Global styles and theming
├── script.js               # Main JavaScript functionality
├── pdf.min.js              # PDF.js library for PDF viewing
├── sop.js                  # SOP-specific JavaScript (legacy)
├── schedule-file.html      # Schedule management page
├── task-assignment.html    # Task management page
├── pdi.html               # Performance insights page
├── gax.html               # System integration page
├── sop-delhi.html         # Delhi SOP viewer
├── sop-manila.html        # Manila SOP viewer
├── sop-us.html            # US SOP viewer
├── important-links.html   # Resource links page
└── delhi-sop.pdf          # Sample PDF file
```

## 🛠️ Installation & Setup

### Local Development
1. Clone the repository
2. Open `index.html` in a web browser
3. For PDF functionality, serve files using a local server:
   ```bash
   python -m http.server 8000
   ```

### OneDrive Deployment
1. Upload all files to your OneDrive folder
2. Place your PDF files in the same directory:
   - `delhi-sop.pdf` for Delhi operations
   - `manila-sop.pdf` for Manila operations
   - `us-sop.pdf` for US operations
3. Open `index.html` directly from OneDrive

## 📋 Usage

### Navigation
- Click on dashboard cards to navigate to different modules
- Use browser back button to return to main dashboard
- SOP pages automatically load respective PDF files

### PDF Viewing
- PDFs load automatically when visiting SOP pages
- Full-page viewing experience
- "View it on Square" buttons link to original sources
- Works offline once files are loaded

### Customization
- Update colors in `styles.css` (search for `#006fcf` for primary blue)
- Modify content in respective HTML files
- Add new modules by creating additional HTML pages
- Update navigation in `script.js`

## 🎨 Design System

### Colors
- **Primary Blue**: `#006fcf` (American Express inspired)
- **Secondary Blue**: `#004a8f`
- **Background**: `#f5f7fa` to `#c3cfe2` gradient
- **Text**: `#333` for primary, `#666` for secondary

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: 600-700 weight
- **Body**: 400-500 weight

### Components
- **Cards**: Rounded corners, subtle shadows, hover effects
- **Buttons**: Gradient backgrounds, smooth transitions
- **Navigation**: Clean, professional styling

## 🔧 Configuration

### PDF Sources
Update the Square links in SOP pages:
- Delhi: `https://square.com/sop/delhi`
- Manila: `https://square.com/sop/manila`
- US: `https://square.com/sop/us`

### Branding
- Logo/Title: Update in header sections
- Colors: Modify CSS custom properties
- Content: Edit respective HTML files

## 📱 Responsive Design

- **Desktop**: Full-featured experience
- **Tablet**: Optimized layout with adjusted grid
- **Mobile**: Single-column layout, touch-friendly interface

## 🔒 Security Features

- **No server dependencies** for basic functionality
- **Local file handling** for PDF viewing
- **External links** open in new tabs
- **Clean code** with no inline scripts

## 🌐 Browser Compatibility

- **Chrome/Edge**: Full functionality including PDF viewing
- **Firefox**: Full functionality with PDF.js
- **Safari**: Full functionality with PDF.js
- **Mobile browsers**: Responsive design support

## 📄 License

This project is designed for corporate use. Please ensure compliance with your organization's policies when deploying.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across different browsers
5. Submit a pull request

## 📞 Support

For technical support or questions about implementation, please refer to your organization's IT support channels.

---

**Built with ❤️ for professional corporate environments**