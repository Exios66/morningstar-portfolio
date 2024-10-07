/* script.js */

/* Initialize EmailJS */
(function () {
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
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
    const body = document.body;

    function setTheme(isDark) {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        body.classList.toggle('dark-theme', isDark);
        localStorage.setItem('dark-theme', isDark);
        
        // Update both the button and checkbox
        themeToggleBtn.setAttribute('aria-pressed', isDark);
        themeToggleCheckbox.checked = isDark;
    }

    // Check for saved theme preference or prefer-color-scheme
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('dark-theme');

    if (savedTheme !== null) {
        setTheme(savedTheme === 'true');
    } else {
        setTheme(prefersDarkScheme.matches);
    }

    // Event listener for the button
    themeToggleBtn.addEventListener('click', () => {
        setTheme(!body.classList.contains('dark-theme'));
    });

    // Event listener for the checkbox
    themeToggleCheckbox.addEventListener('change', (e) => {
        setTheme(e.target.checked);
    });

    // Listen for changes in color scheme preference
    prefersDarkScheme.addEventListener('change', (e) => {
        setTheme(e.matches);
    });

    // Call these functions when the DOM is fully loaded
    initializeTheme();
    setupThemeToggle();
  
    // Back to Top Button Functionality
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
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
    }
  
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
    if (window.jQuery && document.querySelector('.testimonial-slider')) {
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
    } else {
      console.error("jQuery is required for the Slick Slider to function.");
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
          .then(function (response) {
            formStatus.textContent = 'Thank you! Your message has been sent.';
            formStatus.style.color = 'green';
            contactForm.reset();
          }, function (error) {
            formStatus.textContent = 'An error occurred. Please try again later.';
            formStatus.style.color = 'red';
            console.error('FAILED...', error);
          });
      });
    }
  
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
  });
