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

    // Skills category toggles
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        const title = category.querySelector('h3');
        const list = category.querySelector('.skill-list');
        
        if (title && list) {
            // Set initial state
            if (!category.classList.contains('active')) {
                list.style.maxHeight = "0";
            } else {
                list.style.maxHeight = list.scrollHeight + "px";
            }
            
            title.addEventListener('click', () => {
                category.classList.toggle('active');
                
                if (category.classList.contains('active')) {
                    list.style.maxHeight = list.scrollHeight + "px";
                } else {
                    list.style.maxHeight = "0";
                }
            });
        }
    });

    // Contact form toggle
    const contactToggle = document.getElementById('contact-toggle');
    const contactFormContainer = document.getElementById('contact-form-container');
    
    if (contactToggle && contactFormContainer) {
        contactToggle.addEventListener('click', () => {
            contactFormContainer.classList.toggle('hidden');
            
            if (!contactFormContainer.classList.contains('hidden')) {
                contactToggle.textContent = 'Hide Contact Form';
                contactFormContainer.style.display = 'block';
                
                // Add a small delay for the transition to work properly
                setTimeout(() => {
                    contactFormContainer.style.opacity = '1';
                    contactFormContainer.style.transform = 'translateY(0)';
                }, 10);
            } else {
                contactToggle.textContent = 'Show Contact Form';
                contactFormContainer.style.opacity = '0';
                contactFormContainer.style.transform = 'translateY(20px)';
                
                // Wait for the transition to complete before hiding
                setTimeout(() => {
                    contactFormContainer.style.display = 'none';
                }, 500);
            }
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                    // Hide the form after successful submission
                    if (contactToggle) {
                        contactToggle.click();
                    }
                } else {
                    alert('Oops! Something went wrong. Please try again.');
                }
            })
            .catch(error => {
                alert('Oops! Something went wrong. Please try again.');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }

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
    
    document.querySelectorAll('.animate-on-scroll').forEach(section => {
        sectionObserver.observe(section);
    });

    // Initialize the first skill category as open
    if (skillCategories.length > 0 && !skillCategories[0].classList.contains('active')) {
        setTimeout(() => {
            skillCategories[0].querySelector('h3').click();
        }, 500);
    }
});