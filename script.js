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
  
    // Blog carousel functionality
    const blogCarousel = document.querySelector('.blog-carousel');
    const blogPosts = document.querySelectorAll('.blog-post');
    const prevBlogBtn = document.getElementById('prev-blog');
    const nextBlogBtn = document.getElementById('next-blog');

    let blogCurrentIndex = 0;
    const blogVisiblePosts = 3;

    function updateBlogCarousel() {
        blogPosts.forEach((post, index) => {
            if (index >= blogCurrentIndex && index < blogCurrentIndex + blogVisiblePosts) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });

        prevBlogBtn.disabled = blogCurrentIndex === 0;
        nextBlogBtn.disabled = blogCurrentIndex + blogVisiblePosts >= blogPosts.length;
    }

    prevBlogBtn.addEventListener('click', () => {
        if (blogCurrentIndex > 0) {
            blogCurrentIndex--;
            updateBlogCarousel();
        }
    });

    nextBlogBtn.addEventListener('click', () => {
        if (blogCurrentIndex + blogVisiblePosts < blogPosts.length) {
            blogCurrentIndex++;
            updateBlogCarousel();
        }
    });

    // Initialize blog carousel
    updateBlogCarousel();

    // Add blog carousel to the sections that can be scrolled
    const scrollableSections = [
        { element: skillsCarousel, visibleItems: visibleSkills },
        { element: expertiseCarousel, visibleItems: visibleExpertise },
        { element: blogCarousel, visibleItems: blogVisiblePosts }
    ];

    // Update the wheel event listener to include the blog carousel
    document.addEventListener('wheel', (event) => {
        event.preventDefault();
        
        scrollableSections.forEach(section => {
            const rect = section.element.getBoundingClientRect();
            if (
                rect.top <= window.innerHeight &&
                rect.bottom >= 0
            ) {
                const scrollDirection = event.deltaY > 0 ? 1 : -1;
                const currentIndex = parseInt(section.element.dataset.currentIndex) || 0;
                const totalItems = section.element.children.length;
                
                let newIndex = currentIndex + scrollDirection;
                if (newIndex < 0) newIndex = 0;
                if (newIndex > totalItems - section.visibleItems) newIndex = totalItems - section.visibleItems;
                
                section.element.dataset.currentIndex = newIndex;
                section.element.style.transform = `translateX(-${newIndex * (100 / section.visibleItems)}%)`;
            }
        });
    }, { passive: false });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });

    // Close menu when a link is clicked
    navMenu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        navMenu.classList.remove('show');
      }
    });

    // Smooth scrolling for touch devices
    const smoothScrollElements = document.querySelectorAll('.services-container, .skills-container, .blog-carousel');

    smoothScrollElements.forEach(element => {
      element.addEventListener('touchstart', (e) => {
        e.preventDefault();
        element.style.overflow = 'auto';
      });

      element.addEventListener('touchend', () => {
        element.style.overflow = 'hidden';
      });
    });

    // Adjust viewport height for mobile browsers
    function setMobileViewportHeight() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    window.addEventListener('resize', setMobileViewportHeight);
    setMobileViewportHeight();

    // Add this function to your existing script.js file

    function initializeSkillPages() {
        const skillProgress = document.querySelector('.skill-progress .progress');
        
        if (skillProgress) {
            const skillLevel = parseInt(skillProgress.getAttribute('aria-valuenow'));
            skillProgress.style.width = `${skillLevel}%`;
            
            // Animate the progress bar
            setTimeout(() => {
                skillProgress.style.transition = 'width 1s ease-in-out';
                skillProgress.style.width = `${skillLevel}%`;
            }, 100);
        }
    }

    // Call this function when the DOM is loaded
    document.addEventListener('DOMContentLoaded', initializeSkillPages);
  
  });