/* ===========================================
   Clean Clock Implementation - Amex GPCO
   ===========================================
   Simple, non-intrusive clock in bottom-right corner
   - Low z-index to avoid navigation conflicts
   - Clean, minimal design
   - EST and IST time display
   =========================================== */

(function() {
    'use strict';
    
    // Wait for DOM to be ready
    function initClock() {
        // Don't create if already exists
        if (document.getElementById('amx-clock')) {
            return;
        }
        
        // Create clock container
        const clock = document.createElement('div');
        clock.id = 'amx-clock';
        clock.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 111, 207, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            font-weight: bold;
            z-index: 1;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            user-select: none;
            pointer-events: none;
        `;
        
        // Create time display
        const timeDisplay = document.createElement('div');
        timeDisplay.id = 'amx-time';
        timeDisplay.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 2px;
            text-align: center;
        `;
        
        clock.appendChild(timeDisplay);
        document.body.appendChild(clock);
        
        // Update time function
        function updateTime() {
            const now = new Date();
            
            // EST time
            const estTime = now.toLocaleTimeString('en-US', {
                timeZone: 'America/New_York',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            
            // IST time
            const istTime = now.toLocaleTimeString('en-US', {
                timeZone: 'Asia/Kolkata',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            
            timeDisplay.innerHTML = `
                <div>EST: ${estTime}</div>
                <div>IST: ${istTime}</div>
            `;
        }
        
        // Update immediately and every second
        updateTime();
        setInterval(updateTime, 1000);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initClock);
    } else {
        initClock();
    }
})();
