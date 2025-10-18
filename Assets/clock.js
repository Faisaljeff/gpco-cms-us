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
            background: rgba(0, 111, 207, 0.95);
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            font-weight: bold;
            z-index: 1;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            user-select: none;
            pointer-events: none;
            border: 2px solid rgba(255, 255, 255, 0.2);
            min-width: 120px;
            transition: all 0.3s ease;
            animation: clockPulse 2s ease-in-out infinite;
        `;
        
        // Create time display
        const timeDisplay = document.createElement('div');
        timeDisplay.id = 'amx-time';
        timeDisplay.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 4px;
            text-align: center;
            line-height: 1.2;
        `;
        
        clock.appendChild(timeDisplay);
        document.body.appendChild(clock);
        
        // Add CSS animation
        if (!document.querySelector('#clock-styles')) {
            const style = document.createElement('style');
            style.id = 'clock-styles';
            style.textContent = `
                @keyframes clockPulse {
                    0%, 100% { 
                        transform: scale(1);
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                    }
                    50% { 
                        transform: scale(1.02);
                        box-shadow: 0 6px 16px rgba(0, 111, 207, 0.4);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
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
                <div style="font-size: 13px; opacity: 0.9;">EST</div>
                <div style="font-size: 16px; font-weight: 900; letter-spacing: 1px;">${estTime}</div>
                <div style="font-size: 13px; opacity: 0.9; margin-top: 2px;">IST</div>
                <div style="font-size: 16px; font-weight: 900; letter-spacing: 1px;">${istTime}</div>
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
