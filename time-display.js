// Simple time display for EST and IST without CDN
(function() {
    'use strict';
    
    // Create time display element
    function createTimeDisplay() {
        const timeContainer = document.createElement('div');
        timeContainer.id = 'time-display';
        timeContainer.style.cssText = `
            position: fixed;
            top: 15px;
            left: 20px;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(0, 111, 207, 0.3);
            border-radius: 8px;
            padding: 0.5rem 0.75rem;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            box-shadow: 0 2px 8px rgba(0, 111, 207, 0.1);
            z-index: 1000;
            backdrop-filter: blur(8px);
            font-variant-numeric: tabular-nums;
            transition: all 0.3s ease;
            animation: slideInFromLeft 0.5s ease-out;
        `;
        
        // Add CSS animation
        if (!document.querySelector('#time-display-styles')) {
            const style = document.createElement('style');
            style.id = 'time-display-styles';
            style.textContent = `
                @keyframes slideInFromLeft {
                    from {
                        transform: translateX(-100%);
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
        
        const timeContent = document.createElement('div');
        timeContent.style.cssText = `
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 0.25rem 0.5rem;
            align-items: center;
        `;
        
        // EST Label
        const estLabel = document.createElement('div');
        estLabel.style.cssText = `
            font-weight: 600;
            color: #006fcf;
            text-align: right;
            font-size: 0.75rem;
            letter-spacing: 0.3px;
        `;
        estLabel.textContent = 'EST';
        
        // EST Time
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
        
        // IST Label
        const istLabel = document.createElement('div');
        istLabel.style.cssText = `
            font-weight: 600;
            color: #006fcf;
            text-align: right;
            font-size: 0.75rem;
            letter-spacing: 0.3px;
        `;
        istLabel.textContent = 'IST';
        
        // IST Time
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
    
    // Format time with timezone offset
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
    
    // Update time display
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
    
    // Initialize time display
    function initTimeDisplay() {
        // Check if time display already exists
        if (document.getElementById('time-display')) {
            return;
        }
        
        const timeDisplay = createTimeDisplay();
        document.body.appendChild(timeDisplay);
        
        // Update immediately
        updateTime();
        
        // Update every second
        setInterval(updateTime, 1000);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTimeDisplay);
    } else {
        initTimeDisplay();
    }
})();
