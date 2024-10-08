// Theme constants
const THEME_STORAGE_KEY = 'dark-theme';
const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

// DOM element selectors
const THEME_TOGGLE_BTN_ID = 'theme-toggle';
const THEME_TOGGLE_CHECKBOX_ID = 'theme-toggle-checkbox';
const THEME_SWITCH_LABEL_SELECTOR = '.theme-switch span';

function applyTheme() {
    const isDark = localStorage.getItem(THEME_STORAGE_KEY) === 'true';
    document.documentElement.setAttribute('data-theme', isDark ? DARK_THEME : LIGHT_THEME);
    
    const themeToggleBtn = document.getElementById(THEME_TOGGLE_BTN_ID);
    const themeToggleCheckbox = document.getElementById(THEME_TOGGLE_CHECKBOX_ID);
    const themeSwitchLabel = document.querySelector(THEME_SWITCH_LABEL_SELECTOR);
    
    if (themeToggleBtn) themeToggleBtn.setAttribute('aria-pressed', isDark);
    if (themeToggleCheckbox) themeToggleCheckbox.checked = isDark;
    if (themeSwitchLabel) themeSwitchLabel.textContent = isDark ? 'Light Mode' : 'Dark Mode';

    // Update other theme-dependent elements
    updateThemeSpecificElements(isDark);
}

function setTheme(isDark) {
    localStorage.setItem(THEME_STORAGE_KEY, isDark);
    applyTheme();
}

function updateThemeSpecificElements(isDark) {
    // Update progress bars
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        bar.style.backgroundColor = isDark ? '#444' : '#ddd';
    });

    // Update buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.classList.toggle('btn-dark', isDark);
        button.classList.toggle('btn-light', !isDark);
    });

    // Update blog post backgrounds
    const blogPosts = document.querySelectorAll('.blog-post');
    blogPosts.forEach(post => {
        post.style.backgroundColor = isDark ? '#2a2a2a' : '#f5f5f5';
    });
}

function initializeTheme() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme !== null) {
        setTheme(savedTheme === 'true');
    } else {
        setTheme(prefersDarkScheme.matches);
    }

    const themeToggleBtn = document.getElementById(THEME_TOGGLE_BTN_ID);
    const themeToggleCheckbox = document.getElementById(THEME_TOGGLE_CHECKBOX_ID);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            setTheme(document.documentElement.getAttribute('data-theme') !== DARK_THEME);
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