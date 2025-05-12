document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.getElementById('primary-nav');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const visibility = primaryNav.getAttribute('data-visible') === 'true';
            primaryNav.setAttribute('data-visible', !visibility);
            navToggle.setAttribute('aria-expanded', !visibility);
            
            // Toggle icon
            const bars = navToggle.querySelector('.fa-bars');
            const xmark = navToggle.querySelector('.fa-xmark');
            
            if (visibility) {
                bars.style.display = 'block';
                xmark.style.display = 'none';
            } else {
                bars.style.display = 'none';
                xmark.style.display = 'block';
            }
            
            // Prevent body scrolling when menu is open
            if (!visibility) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Initialize menu icons correctly on page load
        // const bars = navToggle.querySelector('.fa-bars');
        // const xmark = navToggle.querySelector('.fa-xmark');
        // bars.style.display = 'block';
        // xmark.style.display = 'none';
    }
    
    // Smooth scrolling for navigation links
    // const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                if (primaryNav && primaryNav.getAttribute('data-visible') === 'true') {
                    primaryNav.setAttribute('data-visible', 'false');
                    navToggle.setAttribute('aria-expanded', 'false');
                    navToggle.querySelector('.fa-bars').style.display = 'block';
                    navToggle.querySelector('.fa-xmark').style.display = 'none';
                    // Restore body scrolling
                    document.body.style.overflow = '';
                }
                
                // Scroll to the section
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Highlight active section on scroll
    const sections = document.querySelectorAll('section');
    
    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY;
        const headerHeight = document.getElementById('header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // Testimonial slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            const newIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
            showTestimonial(newIndex);
        });
        
        nextBtn.addEventListener('click', () => {
            const newIndex = (currentIndex + 1) % testimonialCards.length;
            showTestimonial(newIndex);
        });
    }
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            showTestimonial(index);
        });
    });
    
    // Auto rotate testimonials
    setInterval(() => {
        if (document.visibilityState === 'visible') {
            const newIndex = (currentIndex + 1) % testimonialCards.length;
            showTestimonial(newIndex);
        }
    }, 5000);
    
    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;
            
            // Simple validation
            if (name.value.trim() === '') {
                highlightError(name, 'Please enter your name');
                isValid = false;
            } else {
                resetError(name);
            }
            
            if (email.value.trim() === '') {
                highlightError(email, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                highlightError(email, 'Please enter a valid email address');
                isValid = false;
            } else {
                resetError(email);
            }
            
            if (message.value.trim() === '') {
                highlightError(message, 'Please enter your message');
                isValid = false;
            } else {
                resetError(message);
            }
            
            if (isValid) {
                // For frontend demo only - simulate form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                setTimeout(() => {
                    submitBtn.textContent = 'Message Sent!';
                    contactForm.reset();
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                }, 1500);
            }
        });
    }
    
    function highlightError(field, message) {
        field.style.borderColor = 'var(--danger)';
        
        // Create or update error message
        let errorElement = field.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.color = 'var(--danger)';
            errorElement.style.fontSize = '0.875rem';
            errorElement.style.marginTop = '0.25rem';
            field.parentNode.insertBefore(errorElement, field.nextElementSibling);
        }
        
        errorElement.textContent = message;
    }
    
    function resetError(field) {
        field.style.borderColor = '';
        
        // Remove error message if exists
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.category-card, .feature-card, .portfolio-item, .stat');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = entry.target.classList.contains('category-card') ? 
                        'translateY(0)' : entry.target.style.transform;
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // Header scroll effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.backgroundColor = 'var(--white)';
            header.style.boxShadow = 'var(--shadow-sm)';
        }
    });
    
});





const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const images = document.querySelectorAll('.gallery img');

images.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
  });
});

lightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
});






