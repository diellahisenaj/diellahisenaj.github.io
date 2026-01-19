const themes = ['retro', 'tech', 'oriental', 'ecommerce'];
let currentThemeIndex = 0;
let autoRotateInterval;
let isAutoRotating = true;

function changeTheme(theme) {
    const header = document.querySelector('.header');
    const buttons = document.querySelectorAll('.theme-btn');
    
    // Remove all theme classes
    themes.forEach(t => header.classList.remove(t));
    
    // Add new theme
    header.classList.add(theme);
    
    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.theme-btn.${theme}`).classList.add('active');
    
    // Update current index
    currentThemeIndex = themes.indexOf(theme);
}

function startAutoRotate() {
    // Clear any existing interval first
    if (autoRotateInterval) {
        clearInterval(autoRotateInterval);
    }
    
    // Only start if auto-rotating is enabled
    if (isAutoRotating) {
        autoRotateInterval = setInterval(() => {
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            changeTheme(themes[currentThemeIndex]);
        }, 5000); // 5 seconds between changes
    }
}

// Manual theme change (stops auto-rotate)
window.changeTheme = function(theme) {
    isAutoRotating = false;
    clearInterval(autoRotateInterval);
    
    const header = document.querySelector('.header');
    const buttons = document.querySelectorAll('.theme-btn');
    
    themes.forEach(t => header.classList.remove(t));
    header.classList.add(theme);
    
    buttons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.theme-btn.${theme}`).classList.add('active');
    
    currentThemeIndex = themes.indexOf(theme);
    
    // Restart auto-rotate after 10 seconds of inactivity
    setTimeout(() => {
        isAutoRotating = true;
        startAutoRotate();
    }, 10000);
};

// Start auto-rotation when page loads
document.addEventListener('DOMContentLoaded', () => {
    startAutoRotate();
});

// Pause auto-rotate when user hovers over theme buttons
const switcher = document.querySelector('.theme-switcher');
if (switcher) {
    switcher.addEventListener('mouseenter', () => {
        clearInterval(autoRotateInterval);
    });
    
    switcher.addEventListener('mouseleave', () => {
        if (isAutoRotating) {
            startAutoRotate();
        }
    });
}


 
