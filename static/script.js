console.log("Script loaded");

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const htmlElement = document.documentElement;

// Function to set theme
function setTheme(theme) {
    body.classList.toggle('dark-theme', theme === 'dark');
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update theme for all pages
    document.querySelectorAll('iframe').forEach(iframe => {
        iframe.contentWindow.postMessage({ type: 'themeChange', theme: theme }, '*');
    });

    // Update theme for code snippets if Prism is available
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }

    // Update theme for charts if Chart.js is available
    if (typeof Chart !== 'undefined') {
        Chart.helpers.each(Chart.instances, function(instance) {
            instance.options.theme = theme;
            instance.update();
        });
    }
}

// Event listener for theme toggle
themeToggle.addEventListener('click', () => {
    const newTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
    setTheme(newTheme);
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// Listen for theme changes from other windows
window.addEventListener('message', (event) => {
    if (event.data.type === 'themeChange') {
        setTheme(event.data.theme);
    }
});

// Apply theme to dynamically loaded content
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
            const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
            setTheme(theme);
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });

// Add more functionality as needed