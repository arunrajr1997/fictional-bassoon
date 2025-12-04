document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if the link is a standard internal anchor
            if (this.getAttribute('href').length > 1) {
                e.preventDefault();

                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Scroll into view with smooth behavior
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });

                    // Close mobile menu after clicking a link
                    const nav = document.querySelector('.main-nav');
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                    }
                }
            }
        });
    });

    // 2. Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        // Toggle icon from bars to close (optional but good practice)
        const icon = menuToggle.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // 3. Simple Scroll Reveal (Pure JS) - *OPTIONAL ENHANCEMENT*
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a class to elements when they become visible
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply the reveal effect to sections (skip the hero as it has its own CSS animation)
    document.querySelectorAll('.section-padding').forEach(section => {
        section.classList.add('reveal-on-scroll');
        observer.observe(section);
    });
});

/* Additional CSS for the simple scroll-reveal effect */
/* Add this to style.css for the effect to work: */
/*
.reveal-on-scroll {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.reveal-on-scroll.in-view {
    opacity: 1;
    transform: translateY(0);
}
*/