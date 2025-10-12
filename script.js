/* ===========================================
   GPCO CMS US - Main JavaScript File
   ===========================================
   This file contains all the main functionality for the GPCO Content Management System.
   
   Features:
   - Navigation system
   - Global search functionality
   - Notification system
   - Keyboard shortcuts
   - XSS protection for search
   =========================================== */

/* ===========================================
   NAVIGATION SYSTEM
   ===========================================
   Handles navigation between different pages and modules.
   =========================================== */

/**
 * Navigate to a specific page
 * @param {string} page - The page filename to navigate to
 */
function navigateTo(page) {
    // List of all available pages in the system
    const pages = [
        'schedule-file.html',
        'task-assignment.html', 
        'pdi.html',
        'gax.html',
        'GAX_Skilling_Matrix.html',
        'new_wfm_codes.html',
        'sop-delhi.html',
        'sop-manila.html',
        'sop-us.html',
        'important-links.html',
        'policies.html',
        'break-structure.html',
        'gocm-processes.html'
    ];
    
    if (pages.includes(page)) {
        window.location.href = page;
    } else {
        // Show notification for non-existent pages
        showNotification(`Navigating to ${page.replace('.html', '').replace('-', ' ').toUpperCase()}`, 'info');
    }
}

/* ===========================================
   NOTIFICATION SYSTEM
   ===========================================
   Provides user feedback through toast notifications.
   =========================================== */

/**
 * Show a notification to the user
 * @param {string} message - The message to display
 * @param {string} type - The type of notification ('info', 'success', 'error')
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications to prevent stacking
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element with appropriate styling
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'info' ? 'info-circle' : type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="closeNotification(this)">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles for notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            border-left: 4px solid #006fcf;
            max-width: 400px;
        }
        
        .notification-content {
            padding: 1rem 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .notification i:first-child {
            color: #006fcf;
            font-size: 1.2rem;
        }
        
        .notification span {
            flex: 1;
            color: #333;
            font-weight: 500;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: #666;
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 4px;
            transition: all 0.2s ease;
        }
        
        .notification-close:hover {
            background: #f0f0f0;
            color: #333;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 4000);
}

function closeNotification(button) {
    const notification = button.closest('.notification');
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers for navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
    
    // Add keyboard navigation for cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add keyboard navigation for SOP buttons
    const sopButtons = document.querySelectorAll('.sop-btn');
    sopButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add loading animation to cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Welcome message animation
    setTimeout(() => {
        showNotification('Welcome to GPCO CMS US! Click on any card to navigate.', 'info');
    }, 1000);
});

/* ===========================================
   SEARCH FUNCTIONALITY
   ===========================================
   Provides search capabilities across the system.
   Includes both basic module search and global search.
   =========================================== */

/**
 * Initialize basic search functionality for modules
 * @returns {HTMLElement} The search input element
 */
function initializeSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search modules...';
    searchInput.className = 'search-input';
    
    // Add search styles
    const searchStyle = document.createElement('style');
    searchStyle.textContent = `
        .search-input {
            padding: 0.75rem 1rem;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
            width: 300px;
            transition: all 0.3s ease;
        }
        
        .search-input:focus {
            outline: none;
            border-color: #006fcf;
            box-shadow: 0 0 0 3px rgba(0, 111, 207, 0.1);
        }
    `;
    document.head.appendChild(searchStyle);
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const description = card.querySelector('.card-description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = searchTerm === '' ? 'block' : 'none';
            }
        });
    });
    
    return searchInput;
}

// Utility functions
function formatPageName(filename) {
    return filename
        .replace('.html', '')
        .replace('-', ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
});

/* ===========================================
   GLOBAL SEARCH SYSTEM
   ===========================================
   Advanced search functionality with XSS protection and highlighting.
   Searches across all pages and provides real-time results.
   =========================================== */

// Global Search - index.html integration
(function() {
  // Complete list of all pages in the system for search indexing
  const pages = [
    { title: 'Schedule File', url: 'schedule-file.html' },
    { title: 'Task Assignment', url: 'task-assignment.html' },
    { title: 'P&DI', url: 'pdi.html' },
    { title: 'GAX', url: 'gax.html' },
    { title: 'GAX Skilling Matrix', url: 'GAX_Skilling_Matrix.html' },
    { title: 'New WFM Codes', url: 'new_wfm_codes.html' },
    { title: 'Standard Operating Procedures (Delhi)', url: 'sop-delhi.html' },
    { title: 'Standard Operating Procedures (Manila)', url: 'sop-manila.html' },
    { title: 'Standard Operating Procedures (US)', url: 'sop-us.html' },
    { title: 'Break Structure', url: 'break-structure.html' },
    { title: 'GOCM Processes', url: 'gocm-processes.html' },
    { title: 'Important Links', url: 'important-links.html' },
    { title: 'Company Policies', url: 'policies.html' },
    { title: 'Performance', url: 'performance.html' },
    { title: 'CSV File Viewer', url: 'csv_file_viewer.html' },
    { title: 'Python HTML Doc', url: 'python_html_doc.html' }
  ];

  const normalize = (text) => (text || '').toString().toLowerCase();

  async function fetchPageText(url){
    try { const r = await fetch(url); return await r.text(); } catch { return ''; }
  }
  function extractText(html){
    if(!html) return '';
    const noScripts = html.replace(/<script[\s\S]*?<\/script>/gi, ' ');
    const noStyles = noScripts.replace(/<style[\s\S]*?<\/style>/gi, ' ');
    const textOnly = noStyles.replace(/<[^>]+>/g, ' ');
    return textOnly.replace(/\s+/g, ' ').trim();
  }

  /**
   * Highlight search terms in text with XSS protection
   * @param {string} text - The text to highlight
   * @param {string} query - The search query to highlight
   * @returns {string} - Text with highlighted search terms
   */
  function highlight(text, query){
    if(!query) return text;
    
    // XSS Protection: Secure sanitization - remove all potentially dangerous content
    const sanitizedQuery = query
      .replace(/<[^>]*>/g, '') // Remove all HTML tags
      .replace(/javascript:/gi, '') // Remove javascript protocol
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Escape regex characters
      .trim();
    
    if(!sanitizedQuery) return text;
    
    // Use textContent-safe highlighting with data attributes
    const re = new RegExp(`(${sanitizedQuery})`, 'ig');
    return text.replace(re, '<mark class="search-highlight" data-highlight="true">$1</mark>');
  }

  /**
   * Setup the inline search functionality for the hero section
   * Handles real-time search with caching and keyboard navigation
   */
  function setupInlineSearch(){
    const input = document.getElementById('searchInputInline');
    const results = document.getElementById('inlineSearchResults');
    if(!input || !results) return;

    // Search state management
    const cache = {}; let ready = false; let items = []; let selectedIndex = -1; let lastQuery = '';
    
    // Prefetch all page content for fast searching
    const prefetch = Promise.all(pages.map(async p => {
      const html = await fetchPageText(p.url); cache[p.url] = extractText(html);
    })).finally(()=>{ ready = true; });

    function render(query){
      results.innerHTML = '';
      const q = normalize(query);
      if(!q){ items = []; selectedIndex = -1; return; }

      const matched = [];
      for(const p of pages){
        const text = normalize(cache[p.url] || '');
        const titleMatch = normalize(p.title).includes(q);
        const textMatch = text.includes(q);
        if(titleMatch || textMatch){
          const snippetIdx = text.indexOf(q);
          let snippet = '';
          if(snippetIdx !== -1){
            const start = Math.max(0, snippetIdx - 60);
            const end = Math.min(text.length, snippetIdx + 120);
            snippet = text.substring(start, end);
            snippet = highlight(snippet, query);
          }
          matched.push({ ...p, snippet });
        }
      }
      items = matched;
      selectedIndex = matched.length ? 0 : -1;

      if(matched.length === 0){ results.innerHTML = ''; return; }

      const html = matched.map((m, i) => `
        <div class="search-result-item${i===selectedIndex ? ' selected' : ''}" data-index="${i}">
          <a href="${m.url}" onclick="event.stopPropagation();">${highlight(m.title, query)}<span class="secondary">${m.snippet || ''}</span></a>
        </div>`).join('');
      results.innerHTML = html;
    }

    // Debounced input handler to prevent excessive API calls
    const debounced = (fn, wait=120) => { let t; return (...args)=>{ clearTimeout(t); t=setTimeout(()=>fn(...args), wait); }; };
    
    /**
     * Handle search input with XSS protection and sanitization
     * @param {Event} e - The input event
     */
    const onInput = debounced(async (e)=>{
      // XSS Protection: Sanitize input before processing
      const rawValue = e.target.value;
      const sanitizedValue = rawValue
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/javascript:/gi, '') // Remove javascript protocol
        .replace(/on\w+\s*=/gi, '') // Remove event handlers
        .substring(0, 100); // Limit length to prevent abuse
      
      // Update input with sanitized value if it changed
      if (sanitizedValue !== rawValue) {
        e.target.value = sanitizedValue;
      }
      
      lastQuery = sanitizedValue;
      if(!ready){ try{ await Promise.race([prefetch, new Promise(res=>setTimeout(res,200))]); }catch{} }
      // Ensure missing cache fetched
      const missing = pages.filter(p => !(p.url in cache));
      if(missing.length){ await Promise.all(missing.map(async p => { const html = await fetchPageText(p.url); cache[p.url] = extractText(html); })); }
      render(lastQuery);
    });

    input.addEventListener('input', onInput);

    input.addEventListener('keydown', (e)=>{
      if(!items.length) return;
      if(e.key === 'ArrowDown'){ e.preventDefault(); selectedIndex = Math.min(items.length-1, selectedIndex+1); render(lastQuery); }
      else if(e.key === 'ArrowUp'){ e.preventDefault(); selectedIndex = Math.max(0, selectedIndex-1); render(lastQuery); }
      else if(e.key === 'Enter'){
        e.preventDefault(); const sel = items[selectedIndex]; if(sel){ window.location.href = sel.url; }
      } else if(e.key === 'Escape'){ results.innerHTML=''; }
    });

    results.addEventListener('mousemove', (e)=>{
      const item = e.target.closest('.search-result-item');
      if(!item) return; const idx = Number(item.dataset.index); if(!Number.isNaN(idx)){ selectedIndex = idx; const q = lastQuery; render(q); }
    });

    results.addEventListener('click', (e)=>{
      const item = e.target.closest('.search-result-item');
      if(!item) return; const idx = Number(item.dataset.index); const sel = items[idx]; if(sel){ window.location.href = sel.url; }
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setupInlineSearch);
  else setupInlineSearch();
})();

// Inline hero search and global shortcuts
(function(){
  // Removed keyboard shortcut triggers and modal routing; inline search now handles input directly.
})();
