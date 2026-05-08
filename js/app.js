/* ═══════════════════════════════════════════
   AIPL ERP — CORE APPLICATION LOGIC
═══════════════════════════════════════════ */

// 1. SCREEN NAVIGATION SYSTEM
// Ensures only one screen is visible at a time for speed and safety
function showScreen(screenId) {
    // Hide all standard screens and app screens
    const allScreens = document.querySelectorAll('.screen, .app-screen');
    allScreens.forEach(screen => {
        screen.style.display = 'none';
        screen.classList.remove('on');
    });

    // Show the target screen
    const target = document.getElementById(screenId);
    if (target) {
        target.style.display = 'flex';
        // Small delay to trigger CSS entry animations
        setTimeout(() => target.classList.add('on'), 10);
    } else {
        console.error("Screen ID not found: " + screenId);
    }
}

// 2. LIVE CLOCK & DATE (For Site Monitoring)
function startLiveClock() {
    const timeDisplay = document.querySelector('.clock-time');
    const dateDisplay = document.querySelector('.clock-date');
    
    setInterval(() => {
        const now = new Date();
        
        if (timeDisplay) {
            timeDisplay.textContent = now.toLocaleTimeString('en-IN', {
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit',
                hour12: true 
            });
        }
        
        if (dateDisplay) {
            dateDisplay.textContent = now.toLocaleDateString('en-IN', {
                weekday: 'long', 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric'
            }).toUpperCase();
        }
    }, 1000);
}

// 3. ATTENDANCE & SECURITY LOGIC
function handlePunch() {
    const statusText = document.getElementById('punch-status-text');
    const punchRing = document.querySelector('.punch-ring');
    
    // Simulate GPS & Site Boundary Check
    const gpsStatus = document.getElementById('gps-status');
    gpsStatus.textContent = "Verifying GPS Location...";
    
    setTimeout(() => {
        // Logic: In a real scenario, compare user Lat/Long with Site Lat/Long
        gpsStatus.textContent = "GPS: Within Site Boundary ✅";
        
        if (statusText.textContent.includes('OUT')) {
            statusText.textContent = "Status: IN";
            statusText.style.color = "#43A047";
            punchRing.style.background = "linear-gradient(135deg, #C62828, #E53935)";
            document.querySelector('.punch-label').textContent = "PUNCH OUT";
            showToast("Punch-In Successful at NH-48 Site");
        } else {
            statusText.textContent = "Status: OUT";
            statusText.style.color = "#0D2137";
            punchRing.style.background = "linear-gradient(135deg, #2E7D32, #43A047)";
            document.querySelector('.punch-label').textContent = "PUNCH IN";
            showToast("Punch-Out Successful. Stay Safe!");
        }
    }, 1500);
}

// 4. TOAST NOTIFICATION SYSTEM
function showToast(message) {
    const wrapper = document.createElement('div');
    wrapper.className = 'toast-wrap';
    wrapper.innerHTML = `<div class="toast-item">✅ ${message}</div>`;
    document.body.appendChild(wrapper);
    
    setTimeout(() => {
        wrapper.style.opacity = '0';
        setTimeout(() => wrapper.remove(), 500);
    }, 3000);
}

// 5. APP INITIALIZATION
window.onload = () => {
    console.log("AIPL ERP System Initialized");
    startLiveClock();
    
    // Auto-transition from Splash to Login after 3 seconds
    setTimeout(() => {
        showScreen('scr-login');
    }, 3000);
};