/* ===========================================
   Time Display Module - GPCO CMS US
   ===========================================
   Displays current EST and IST time in the top-right corner
   of all pages. Features:
   - No CDN dependencies (pure JavaScript)
   - Real-time updates every second
   - Compact, blended design
   - EST (UTC-5) and IST (UTC+5:30) time zones
   - Smooth animations and hover effects
   =========================================== */

(function() {
    'use strict';
    
    /**
     * Create the time display element with CSS classes
     * @returns {HTMLElement} The time display container
     */
    function createTimeDisplay() {
        const timeContainer = document.createElement('div');
        timeContainer.id = 'time-display';
        
        // Create grid layout for time display
        const timeContent = document.createElement('div');
        timeContent.className = 'time-content';
        
        // EST Label (Eastern Standard Time)
        const estLabel = document.createElement('div');
        estLabel.className = 'time-label';
        estLabel.textContent = 'EST';
        
        // EST Time Display
        const estTime = document.createElement('div');
        estTime.id = 'est-time';
        estTime.className = 'time-value';
        estTime.textContent = '--:--:--';
        
        // IST Label (Indian Standard Time)
        const istLabel = document.createElement('div');
        istLabel.className = 'time-label';
        istLabel.textContent = 'IST';
        
        // IST Time Display
        const istTime = document.createElement('div');
        istTime.id = 'ist-time';
        istTime.className = 'time-value';
        istTime.textContent = '--:--:--';
        
        timeContent.appendChild(estLabel);
        timeContent.appendChild(estTime);
        timeContent.appendChild(istLabel);
        timeContent.appendChild(istTime);
        timeContainer.appendChild(timeContent);
        
        return timeContainer;
    }
    
    /**
     * Format time with timezone offset
     * @param {Date} date - The date object
     * @param {number} offsetHours - Timezone offset in hours
     * @returns {string} - Formatted time string (HH:MM:SS)
     */
    function formatTime(date, offsetHours) {
        const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
        const targetTime = new Date(utc + (offsetHours * 3600000));
        
        return targetTime.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
    
    /**
     * Update the time display with current EST and IST times
     */
    function updateTime() {
        const now = new Date();
        
        // EST is UTC-5 (or UTC-4 during daylight saving)
        // For simplicity, using UTC-5 (you can adjust this)
        const estTime = formatTime(now, -5);
        
        // IST is UTC+5:30
        const istTime = formatTime(now, 5.5);
        
        const estElement = document.getElementById('est-time');
        const istElement = document.getElementById('ist-time');
        
        if (estElement) estElement.textContent = estTime;
        if (istElement) istElement.textContent = istTime;
    }
    
    /**
     * Initialize the time display system
     * Creates the display element and starts the update interval
     */
    function initTimeDisplay() {
        console.log('🕐 Initializing time display...');
        
        // Check if time display already exists to prevent duplicates
        if (document.getElementById('time-display')) {
            console.log('🕐 Time display already exists, skipping initialization');
            return;
        }
        
        const timeDisplay = createTimeDisplay();
        document.body.appendChild(timeDisplay);
        console.log('🕐 Time display element created and added to DOM');
        
        // Update immediately
        updateTime();
        console.log('🕐 Time display updated');
        
        // Update every second for real-time display
        setInterval(updateTime, 1000);
        console.log('🕐 Time display interval started');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTimeDisplay);
    } else {
        initTimeDisplay();
    }
})();
