document.addEventListener("DOMContentLoaded", function() {
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
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only apply smooth scroll for links that point to sections on this page
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        mobileMenuBtn.classList.remove('active');
                    }
                }
            }
        });
    });

    // Fade in animation for sections
    const introSection = document.querySelector('.intro-section');
    const projectCategories = document.querySelectorAll('.project-category');
    
    // Add animation to intro section
    if (introSection) {
        setTimeout(() => {
            introSection.classList.add('is-visible');
        }, 300);
    }
    
    // Add staggered animations to project categories
    projectCategories.forEach((category, index) => {
        setTimeout(() => {
            category.classList.add('is-visible');
        }, 500 + (index * 200));
    });

    // Toggle project category panels
    const categoryHeaders = document.querySelectorAll('.category-header');
    
    categoryHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const category = header.parentElement;
            
            // Toggle active class on the category
            const wasActive = category.classList.contains('active');
            
            // First, close all open categories
            projectCategories.forEach(cat => {
                cat.classList.remove('active');
            });
            
            // Then, if the clicked category wasn't already active, open it
            if (!wasActive) {
                category.classList.add('active');
                
                // When a category is opened, make its project items visible with a staggered animation
                const projectItems = category.querySelectorAll('.project-item');
                projectItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('is-visible');
                    }, 100 + (index * 50));
                });
            }
        });
    });

    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            
            // Close all open categories first
            projectCategories.forEach(cat => {
                cat.classList.remove('active');
            });
            
            if (category === 'all') {
                // Show all categories
                projectCategories.forEach(cat => {
                    cat.style.display = 'block';
                    // Reset project items visibility
                    cat.querySelectorAll('.project-item').forEach(item => {
                        item.classList.remove('is-visible');
                    });
                });
            } else {
                // Filter categories
                projectCategories.forEach(cat => {
                    if (cat.getAttribute('data-category') === category) {
                        cat.style.display = 'block';
                        // Open this category
                        cat.classList.add('active');
                        // Make its project items visible with a staggered animation
                        const projectItems = cat.querySelectorAll('.project-item');
                        projectItems.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('is-visible');
                            }, 100 + (index * 50));
                        });
                    } else {
                        cat.style.display = 'none';
                    }
                });
            }
        });
    });

    // Animate sections on scroll with intersection observer
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
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.animate-on-scroll').forEach(section => {
        sectionObserver.observe(section);
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real scenario, you would send this data to a server
            // For now, just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
});