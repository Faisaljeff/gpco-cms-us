// SOP PDF Viewer Functionality - Auto-load version

// Global variables
let currentPDF = null;
let isFullscreen = false;

// Auto-load PDF on page load
document.addEventListener('DOMContentLoaded', function() {
    // Auto-load the PDF based on the page
    const currentPage = window.location.pathname;
    let pdfFile = '';
    
    if (currentPage.includes('sop-delhi')) {
        pdfFile = 'delhi-sop.pdf';
    } else if (currentPage.includes('sop-manila')) {
        pdfFile = 'manila-sop.pdf';
    } else if (currentPage.includes('sop-us')) {
        pdfFile = 'us-sop.pdf';
    }
    
    if (pdfFile) {
        loadPDF(pdfFile);
    }
});

// Load PDF function
function loadPDF(pdfFile) {
    const container = document.getElementById('pdfViewerContainer');
    
    // Create iframe for PDF viewing
    const iframe = document.createElement('iframe');
    iframe.src = pdfFile;
    iframe.className = 'pdf-iframe';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    
    iframe.onload = function() {
        // PDF loaded successfully - remove loading indicator
        const loading = container.querySelector('.pdf-loading');
        if (loading) loading.remove();
    };
    
    iframe.onerror = function() {
        // PDF failed to load - show error message
        container.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; padding: 2rem; background: #f8f9fa;">
                <i class="fas fa-exclamation-triangle" style="font-size: 4rem; color: #dc3545; margin-bottom: 1rem;"></i>
                <h2 style="color: #333; margin-bottom: 1rem;">PDF Not Found</h2>
                <p style="color: #666; margin-bottom: 1rem;">The file "${pdfFile}" could not be loaded.</p>
                <p style="color: #666; font-size: 0.9rem;">Please ensure the PDF file is placed in the correct directory.</p>
            </div>
        `;
    };
    
    // Replace loading content with iframe
    setTimeout(() => {
        container.innerHTML = '';
        container.appendChild(iframe);
        currentPDF = pdfFile;
    }, 500);
}

// Toggle fullscreen function
function toggleFullscreen() {
    const container = document.getElementById('pdfViewerContainer');
    const iframe = container.querySelector('.pdf-iframe');
    
    if (!iframe) {
        showNotification('Please load a PDF first', 'warning');
        return;
    }
    
    if (!isFullscreen) {
        // Enter fullscreen
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
        }
        container.classList.add('fullscreen');
        isFullscreen = true;
        showNotification('Entered fullscreen mode. Press ESC to exit.', 'info');
    } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        container.classList.remove('fullscreen');
        isFullscreen = false;
        showNotification('Exited fullscreen mode', 'info');
    }
}

// Download PDF function
function downloadPDF(pdfFile) {
    if (!currentPDF && !pdfFile) {
        showNotification('No PDF loaded to download', 'warning');
        return;
    }
    
    const fileName = pdfFile || currentPDF;
    
    // Create a temporary link element for download
    const link = document.createElement('a');
    link.href = fileName;
    link.download = fileName;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification(`Downloading ${fileName}...`, 'success');
}

// Section toggle functionality
function toggleSection(header) {
    const section = header.parentElement;
    const content = section.querySelector('.section-content');
    const icon = header.querySelector('i:last-child');
    
    section.classList.toggle('expanded');
    
    if (section.classList.contains('expanded')) {
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
    } else {
        content.style.maxHeight = '0';
        icon.style.transform = 'rotate(0deg)';
    }
}

// Notification system (reuse from main script)
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'info' ? 'info-circle' : type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'times-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="closeNotification(this)">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
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

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Handle fullscreen change events
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    
    // Initialize section toggles
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.style.cursor = 'pointer';
        const icon = header.querySelector('i:last-child');
        if (icon) {
            icon.style.transition = 'transform 0.3s ease';
        }
    });
    
    // Auto-expand first section
    const firstSection = document.querySelector('.sop-section');
    if (firstSection) {
        firstSection.classList.add('expanded');
        const content = firstSection.querySelector('.section-content');
        const icon = firstSection.querySelector('.section-header i:last-child');
        if (content) content.style.maxHeight = content.scrollHeight + 'px';
        if (icon) icon.style.transform = 'rotate(180deg)';
    }
});

function handleFullscreenChange() {
    const container = document.getElementById('pdfViewerContainer');
    if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        container.classList.remove('fullscreen');
        isFullscreen = false;
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC to exit fullscreen
    if (e.key === 'Escape' && isFullscreen) {
        toggleFullscreen();
    }
    
    // F11 to toggle fullscreen
    if (e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
    }
});