function applyTheme() {
    const isDark = localStorage.getItem('dark-theme') === 'true';
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
    const themeSwitchLabel = document.querySelector('.theme-switch span');
    
    if (themeToggleBtn) themeToggleBtn.setAttribute('aria-pressed', isDark);
    if (themeToggleCheckbox) themeToggleCheckbox.checked = isDark;
    if (themeSwitchLabel) themeSwitchLabel.textContent = isDark ? 'Light Mode' : 'Dark Mode';
}

function setTheme(isDark) {
    localStorage.setItem('dark-theme', isDark);
    applyTheme();
}

function initializeTheme() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('dark-theme');

    if (savedTheme !== null) {
        setTheme(savedTheme === 'true');
    } else {
        setTheme(prefersDarkScheme.matches);
    }

    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            setTheme(document.documentElement.getAttribute('data-theme') !== 'dark');
        });
    }

    if (themeToggleCheckbox) {
        themeToggleCheckbox.addEventListener('change', (e) => {
            setTheme(e.target.checked);
        });
    }

    prefersDarkScheme.addEventListener('change', (e) => {
        setTheme(e.matches);
    });
}

document.addEventListener('DOMContentLoaded', initializeTheme);