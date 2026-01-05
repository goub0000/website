document.addEventListener('DOMContentLoaded', function() {
    // Page Loader
    const pageLoader = document.getElementById('page-loader');
    if (pageLoader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                pageLoader.classList.add('hidden');
            }, 500);
        });
        // Fallback in case load event already fired
        setTimeout(() => {
            pageLoader.classList.add('hidden');
        }, 1500);
    }

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

    // Success Message Popup
    const successMessage = document.getElementById('success-message');

    function showSuccessMessage() {
        if (successMessage) {
            successMessage.classList.remove('hidden');
            // Auto-hide after 3 seconds
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 3000);
        }
    }

    // Click outside to close success message
    if (successMessage) {
        successMessage.addEventListener('click', (e) => {
            if (e.target === successMessage) {
                successMessage.classList.add('hidden');
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
                    showSuccessMessage();
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

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');

            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                if (themeIcon) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                }
            } else {
                localStorage.setItem('theme', 'light');
                if (themeIcon) {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            }
        });
    }

    // Lazy Loading Images
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.addEventListener('load', () => {
                        img.classList.add('loaded');
                    });
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    }
});
