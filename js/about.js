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

    // Animate sections on scroll
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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Add animation class to sections
    document.querySelectorAll('#skills, #experience, #education, .profile-section').forEach(section => {
        section.classList.add('animate-on-scroll');
        sectionObserver.observe(section);
    });
    
    // Timeline animation
    const animateTimeline = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Staggered animation for timeline items
                const timelineItems = entry.target.querySelectorAll('.timeline-item');
                timelineItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('is-visible');
                    }, index * 200); // 200ms delay between each item
                });
                observer.unobserve(entry.target);
            }
        });
    };
    
    const timelineObserver = new IntersectionObserver(animateTimeline, {
        root: null,
        threshold: 0.1
    });
    
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        // Add animation class to timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            item.classList.add('animate-on-scroll');
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
        });
        
        timelineObserver.observe(timeline);
    }
    
    // Skills animation
    const animateSkills = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Staggered animation for skills
                const skills = entry.target.querySelectorAll('.skill');
                skills.forEach((skill, index) => {
                    setTimeout(() => {
                        skill.classList.add('is-visible');
                        
                        // Animate the skill progress bar
                        setTimeout(() => {
                            const progressBar = skill.querySelector('.skill-progress');
                            if (progressBar) {
                                const width = progressBar.getAttribute('style').split(':')[1];
                                if (width) {
                                    progressBar.style.width = width;
                                }
                            }
                        }, 300);
                        
                    }, index * 150); // 150ms delay between each skill
                });
                observer.unobserve(entry.target);
            }
        });
    };
    
    const skillsObserver = new IntersectionObserver(animateSkills, {
        root: null,
        threshold: 0.1
    });
    
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
        // Add animation class to skills
        document.querySelectorAll('.skill').forEach(skill => {
            skill.classList.add('animate-on-scroll');
            skill.style.opacity = '0';
            skill.style.transform = 'translateY(30px)';
            
            // Store the original width and set to 0 for animation
            const progressBar = skill.querySelector('.skill-progress');
            if (progressBar) {
                const originalWidth = progressBar.getAttribute('style');
                if (originalWidth) {
                    progressBar.setAttribute('data-width', originalWidth);
                    progressBar.style.width = '0';
                }
            }
        });
        
        skillsObserver.observe(skillsGrid);
    }
    
    // Education cards animation
    const animateEducation = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Staggered animation for education cards
                const cards = entry.target.querySelectorAll('.education-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('is-visible');
                    }, index * 200); // 200ms delay between each card
                });
                observer.unobserve(entry.target);
            }
        });
    };
    
    const educationObserver = new IntersectionObserver(animateEducation, {
        root: null,
        threshold: 0.1
    });
    
    const educationGrid = document.querySelector('.education-grid');
    if (educationGrid) {
        // Add animation class to education cards
        document.querySelectorAll('.education-card').forEach(card => {
            card.classList.add('animate-on-scroll');
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
        });
        
        educationObserver.observe(educationGrid);
    }
    
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
    
    // Enhance profile image with parallax effect
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        window.addEventListener('mousemove', function(e) {
            // Calculate mouse position relative to the center of the screen
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            // Apply subtle transform based on mouse position
            profilePhoto.style.transform = `translate(${mouseX * 10}px, ${mouseY * 10}px)`;
        });
    }
    
    // Enhance skill bars with color transitions based on proficiency
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    if (skillProgressBars) {
        skillProgressBars.forEach(bar => {
            // Extract width value from style attribute
            const style = bar.getAttribute('style');
            if (style) {
                const widthMatch = style.match(/width:\s*(\d+)%/);
                const widthValue = widthMatch ? parseFloat(widthMatch[1]) : 0;
                
                // Set color based on proficiency level
                if (widthValue >= 90) {
                    bar.style.backgroundColor = '#64ffda'; // Expert level - secondary color
                } else if (widthValue >= 75) {
                    bar.style.backgroundColor = '#0a92c2'; // Advanced level - blue
                } else if (widthValue >= 50) {
                    bar.style.backgroundColor = '#6d59a8'; // Intermediate - purple
                } else {
                    bar.style.backgroundColor = '#ff7e5f'; // Beginner - orange
                }
            }
        });
    }
});