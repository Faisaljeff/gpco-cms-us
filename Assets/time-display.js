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
     * Create the time display element with styling
     * @returns {HTMLElement} The time display container
     */
    function createTimeDisplay() {
        const timeContainer = document.createElement('div');
        timeContainer.id = 'time-display';
        timeContainer.style.cssText = `
            position: fixed;
            top: 15px;
            right: 20px;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(0, 111, 207, 0.3);
            border-radius: 8px;
            padding: 0.5rem 0.75rem;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            box-shadow: 0 2px 8px rgba(0, 111, 207, 0.1);
            z-index: 999;
            backdrop-filter: blur(8px);
            font-variant-numeric: tabular-nums;
            transition: all 0.3s ease;
            animation: slideInFromRight 0.5s ease-out;
        `;
        
        // Add CSS animations and hover effects
        if (!document.querySelector('#time-display-styles')) {
            const style = document.createElement('style');
            style.id = 'time-display-styles';
            style.textContent = `
                @keyframes slideInFromRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                #time-display:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 3px 12px rgba(0, 111, 207, 0.15);
                    background: rgba(255, 255, 255, 0.95);
                }
            `;
            document.head.appendChild(style);
        }
        
        // Create grid layout for time display
        const timeContent = document.createElement('div');
        timeContent.style.cssText = `
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 0.25rem 0.5rem;
            align-items: center;
        `;
        
        // EST Label (Eastern Standard Time)
        const estLabel = document.createElement('div');
        estLabel.style.cssText = `
            font-weight: 600;
            color: #006fcf;
            text-align: right;
            font-size: 0.75rem;
            letter-spacing: 0.3px;
        `;
        estLabel.textContent = 'EST';
        
        // EST Time Display
        const estTime = document.createElement('div');
        estTime.id = 'est-time';
        estTime.style.cssText = `
            font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Courier New', monospace;
            font-weight: 600;
            font-size: 0.85rem;
            color: #333;
            text-align: left;
            letter-spacing: 0.5px;
        `;
        estTime.textContent = '--:--:--';
        
        // IST Label (Indian Standard Time)
        const istLabel = document.createElement('div');
        istLabel.style.cssText = `
            font-weight: 600;
            color: #006fcf;
            text-align: right;
            font-size: 0.75rem;
            letter-spacing: 0.3px;
        `;
        istLabel.textContent = 'IST';
        
        // IST Time Display
        const istTime = document.createElement('div');
        istTime.id = 'ist-time';
        istTime.style.cssText = `
            font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Courier New', monospace;
            font-weight: 600;
            font-size: 0.85rem;
            color: #333;
            text-align: left;
            letter-spacing: 0.5px;
        `;
        istTime.textContent = '--:--:--';
        
        timeContent.appendChild(estLabel);
        timeContent.appendChild(estTime);
        timeContent.appendChild(istLabel);
        timeContent.appendChild(istTime);
        timeContainer.appendChild(timeContent);
        
        return timeContainer;
    }
    
    
    /**
     * Update the time display with current EST and IST times
     */
    function updateTime() {
        const now = new Date();
        
        // Use browser's built-in timezone handling (same as working simple test)
        const estTime = now.toLocaleTimeString('en-US', {
            timeZone: 'America/New_York',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        const istTime = now.toLocaleTimeString('en-US', {
            timeZone: 'Asia/Kolkata',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
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
        // Check if time display already exists to prevent duplicates
        if (document.getElementById('time-display')) {
            return;
        }
        
        const timeDisplay = createTimeDisplay();
        document.body.appendChild(timeDisplay);
        
        // Update immediately
        updateTime();
        
        // Update every second for real-time display
        setInterval(updateTime, 1000);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTimeDisplay);
    } else {
        initTimeDisplay();
    }
})();
