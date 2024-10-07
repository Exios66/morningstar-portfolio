document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
    
    function setTheme(isDark) {
        document.body.classList.toggle('dark-theme', isDark);
        localStorage.setItem('dark-theme', isDark);
    }

    themeToggleCheckbox.addEventListener('change', function() {
        setTheme(this.checked);
    });

    // Set initial theme based on user's preference
    const prefersDarkTheme = localStorage.getItem('dark-theme') === 'true';
    setTheme(prefersDarkTheme);
    themeToggleCheckbox.checked = prefersDarkTheme;

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add active class to current section in table of contents
    const tocLinks = document.querySelectorAll('.table-of-contents a');
    const sections = document.querySelectorAll('section[id]');

    function highlightTOC() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                tocLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightTOC);

    // Initialize highlight.js for code snippets
    hljs.highlightAll();

    // Add copy functionality to code blocks
    document.querySelectorAll('pre code').forEach((block) => {
        const copyButton = document.createElement('button');
        copyButton.innerText = 'Copy';
        copyButton.classList.add('copy-button');
        block.parentNode.insertBefore(copyButton, block);

        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(block.textContent).then(() => {
                copyButton.innerText = 'Copied!';
                setTimeout(() => {
                    copyButton.innerText = 'Copy';
                }, 2000);
            });
        });
    });

    // Add functionality to the social share buttons
    const shareButtons = document.querySelectorAll('.social-share a');
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            let shareUrl;

            switch(this.getAttribute('aria-label')) {
                case 'Share on Twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'Share on Facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'Share on LinkedIn':
                    shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
                    break;
            }

            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });

    // Initialize Disqus
    var disqus_config = function () {
        this.page.url = window.location.href;
        this.page.identifier = 'decentralized-autonomous-organizations';
    };
    (function() {
        var d = document, s = d.createElement('script');
        s.src = 'https://lucius-morningstar.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();
});