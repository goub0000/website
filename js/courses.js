document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Course category toggle functionality
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        const header = card.querySelector('.category-header');
        const panel = card.querySelector('.course-panel');
        const toggleIcon = card.querySelector('.toggle-icon i');
        
        // Set initial state (collapsed)
        panel.style.maxHeight = "0";
        panel.style.overflow = "hidden";
        
        header.addEventListener('click', () => {
            // Toggle active class
            card.classList.toggle('active');
            
            // Toggle panel visibility with animation
            if (card.classList.contains('active')) {
                panel.style.maxHeight = panel.scrollHeight + "px";
                toggleIcon.classList.remove('fa-chevron-down');
                toggleIcon.classList.add('fa-chevron-up');
                
                // Add delay to ensure smooth animation
                setTimeout(() => {
                    panel.style.overflow = "visible";
                }, 300);
            } else {
                panel.style.overflow = "hidden";
                panel.style.maxHeight = "0";
                toggleIcon.classList.remove('fa-chevron-up');
                toggleIcon.classList.add('fa-chevron-down');
            }
        });
    });

    // Animate course items on reveal
    const animateCourseItems = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const courseItemObserver = new IntersectionObserver(animateCourseItems, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.course-item').forEach((item, index) => {
        // Add staggered animation delay based on index
        item.style.transitionDelay = `${index * 50}ms`;
        courseItemObserver.observe(item);
    });

    // Scroll-triggered animations for sections
    const animateSections = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(animateSections, {
        root: null,
        threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll, .category-card, .intro-section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Add hover effects for touch devices
    if ('ontouchstart' in window) {
        const courseItems = document.querySelectorAll('.course-item');
        courseItems.forEach(item => {
            item.addEventListener("touchstart", () => {
                item.classList.toggle("hover");
            });
        });
    }

    // Open first category by default for better UX
    if (categoryCards.length > 0) {
        setTimeout(() => {
            categoryCards[0].querySelector('.category-header').click();
        }, 500);
    }
});