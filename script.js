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

// Initialize theme based on localStorage
if (localStorage.getItem('theme') === 'dark') {
body.classList.add('dark-theme');
themeToggleBtn.innerHTML = '<i class="fas fa-sun" aria-hidden="true"></i>';
} else {
themeToggleBtn.innerHTML = '<i class="fas fa-moon" aria-hidden="true"></i>';
}

themeToggleBtn.addEventListener('click', () => {
body.classList.toggle('dark-theme');
if (body.classList.contains('dark-theme')) {
localStorage.setItem('theme', 'dark');
themeToggleBtn.innerHTML = '<i class="fas fa-sun" aria-hidden="true"></i>';
} else {
localStorage.setItem('theme', 'light');
themeToggleBtn.innerHTML = '<i class="fas fa-moon" aria-hidden="true"></i>';
}
});

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
