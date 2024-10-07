/* script.js */

/* Initialize EmailJS */
(function(){
emailjs.init("YOUR_EMAILJS_USER_ID"); // Replace with your EmailJS user ID
})();

/* Wait for the document to fully load */
document.addEventListener('DOMContentLoaded', () => {
// Update current year in footer
const currentYear = new Date().getFullYear();
const yearSpan = document.getElementById('current-year');
if (yearSpan) {
yearSpan.textContent = currentYear;
}

// Theme Toggle Functionality
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Function to set theme
function setTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    }
}

// Initialize theme based on localStorage or system preference
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }
}

// Toggle theme when button is clicked
themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        setTheme('light');
    } else {
        setTheme('dark');
    }
});

// Call initializeTheme when the script loads
initializeTheme();

// Back to Top Button Functionality
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
if (window.pageYOffset > 300) {
backToTopBtn.style.display = 'block';
} else {
backToTopBtn.style.display = 'none';
}
});

backToTopBtn.addEventListener('click', () => {
window.scrollTo({
top: 0,
behavior: 'smooth'
});
});

// Smooth Scrolling for Navigation Links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
link.addEventListener('click', function (e) {
e.preventDefault();
const targetId = this.getAttribute('href').substring(1);
const targetSection = document.getElementById(targetId);
if (targetSection) {
window.scrollTo({
top: targetSection.offsetTop - 70, // Adjust for navbar height
behavior: 'smooth'
});
}
});
});

// Initialize Slick Slider for Testimonials (Requires jQuery and Slick CSS/JS)
if (document.querySelector('.testimonial-slider')) {
$('.testimonial-slider').slick({
dots: true,
infinite: true,
speed: 500,
fade: true,
cssEase: 'linear',
autoplay: true,
autoplaySpeed: 4000,
arrows: false,
adaptiveHeight: true
});
}

// Contact Form Submission Handling with EmailJS
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
contactForm.addEventListener('submit', function (e) {
e.preventDefault();

// Validate form fields
const name = document.getElementById('name').value.trim();
const email = document.getElementById('email').value.trim();
const message = document.getElementById('message').value.trim();

if (!name || !email || !message) {
formStatus.textContent = 'Please fill in all required fields.';
formStatus.style.color = 'red';
return;
}

// Simple email format validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
formStatus.textContent = 'Please enter a valid email address.';
formStatus.style.color = 'red';
return;
}

// Send email using EmailJS
emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
from_name: name,
from_email: email,
message: message
})
.then(function(response) {
formStatus.textContent = 'Thank you! Your message has been sent.';
formStatus.style.color = 'green';
contactForm.reset();
}, function(error) {
formStatus.textContent = 'An error occurred. Please try again later.';
formStatus.style.color = 'red';
console.error('FAILED...', error);
});
});
}
});

console.log("Script loaded successfully");

// Skills Section Scroll Animation
const skillsSection = document.querySelector('.skills');
const skillsContainer = document.querySelector('.skills-container');

if (skillsSection && skillsContainer) {
    let isScrolling = false;
    let startX;
    let scrollLeft;

    skillsContainer.addEventListener('mousedown', (e) => {
        isScrolling = true;
        startX = e.pageX - skillsContainer.offsetLeft;
        scrollLeft = skillsContainer.scrollLeft;
    });

    skillsContainer.addEventListener('mouseleave', () => {
        isScrolling = false;
    });

    skillsContainer.addEventListener('mouseup', () => {
        isScrolling = false;
    });

    skillsContainer.addEventListener('mousemove', (e) => {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.pageX - skillsContainer.offsetLeft;
        const walk = (x - startX) * 2;
        skillsContainer.scrollLeft = scrollLeft - walk;
    });

    // Automatic scroll on page scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const skillsSectionTop = skillsSection.offsetTop;
        const skillsSectionHeight = skillsSection.offsetHeight;
        const windowHeight = window.innerHeight;

        if (scrollPosition > skillsSectionTop - windowHeight / 2 && 
            scrollPosition < skillsSectionTop + skillsSectionHeight - windowHeight / 2) {
            const scrollPercentage = (scrollPosition - (skillsSectionTop - windowHeight / 2)) / 
                                     (skillsSectionHeight + windowHeight);
            const scrollAmount = scrollPercentage * (skillsContainer.scrollWidth - skillsContainer.clientWidth);
            skillsContainer.scrollLeft = scrollAmount;
        }
    });
}

// Services Section Scroll Animation
const servicesSection = document.querySelector('.services');
const servicesContainer = document.querySelector('.services-container');

if (servicesSection && servicesContainer) {
    let isScrolling = false;
    let startX;
    let scrollLeft;

    servicesContainer.addEventListener('mousedown', (e) => {
        isScrolling = true;
        startX = e.pageX - servicesContainer.offsetLeft;
        scrollLeft = servicesContainer.scrollLeft;
    });

    servicesContainer.addEventListener('mouseleave', () => {
        isScrolling = false;
    });

    servicesContainer.addEventListener('mouseup', () => {
        isScrolling = false;
    });

    servicesContainer.addEventListener('mousemove', (e) => {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.pageX - servicesContainer.offsetLeft;
        const walk = (x - startX) * 2;
        servicesContainer.scrollLeft = scrollLeft - walk;
    });

    // Automatic scroll on page scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const servicesSectionTop = servicesSection.offsetTop;
        const servicesSectionHeight = servicesSection.offsetHeight;
        const windowHeight = window.innerHeight;

        if (scrollPosition > servicesSectionTop - windowHeight / 2 && 
            scrollPosition < servicesSectionTop + servicesSectionHeight - windowHeight / 2) {
            const scrollPercentage = (scrollPosition - (servicesSectionTop - windowHeight / 2)) / 
                                     (servicesSectionHeight + windowHeight);
            const scrollAmount = scrollPercentage * (servicesContainer.scrollWidth - servicesContainer.clientWidth);
            servicesContainer.scrollLeft = scrollAmount;
        }
    });
}
