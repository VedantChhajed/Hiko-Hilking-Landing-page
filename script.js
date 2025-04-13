// Initialize AOS animation library
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: false
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav ul');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });

    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.backgroundPositionY = -(scrolled * 0.15) + 'px';
        }
    });

    // Back to top button functionality
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }    // Testimonial slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    
    if (testimonialCards.length > 0) {
        let currentIndex = 0;
        
        const showTestimonial = (index) => {
            // Update cards
            testimonialCards.forEach(card => card.classList.remove('active'));
            testimonialCards[index].classList.add('active');
            
            // Update dots
            testimonialDots.forEach(dot => dot.classList.remove('active'));
            testimonialDots[index].classList.add('active');
            
            // Update track position
            const track = document.querySelector('.testimonial-track');
            track.style.transform = `translateX(-${index * 100}%)`;
        };
        
        // Navigation buttons
        testimonialNext.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            showTestimonial(currentIndex);
        });
        
        testimonialPrev.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
            showTestimonial(currentIndex);
        });
        
        // Dot navigation
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                showTestimonial(currentIndex);
            });
        });
        
        // Auto-advance every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            showTestimonial(currentIndex);
        }, 5000);
        
        // Initialize first slide
        showTestimonial(0);
    }

    // Form submissions
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would normally send the form data to a server
            // For now, let's just show a success message
            
            // Create success message
            const formSuccess = document.createElement('div');
            formSuccess.className = 'form-success';
            formSuccess.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for contacting us, ${name}. We'll get back to you shortly.</p>
            `;
            
            // Replace form with success message
            contactForm.style.opacity = '0';
            setTimeout(() => {
                contactForm.parentNode.replaceChild(formSuccess, contactForm);
                formSuccess.style.opacity = '0';
                setTimeout(() => {
                    formSuccess.style.opacity = '1';
                }, 50);
            }, 500);
        });
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Here you would normally send the subscription to a server
            // For now, let's just show a success message
            
            // Save the original content
            const originalContent = this.innerHTML;
            
            // Replace with success message
            this.innerHTML = `<p class="success-message">Thank you for subscribing!</p>`;
            
            // Reset form after 3 seconds
            setTimeout(() => {
                this.innerHTML = originalContent;
                emailInput.value = '';
            }, 3000);
        });
    }

    // Trip card hover effects
    const tripCards = document.querySelectorAll('.trip-card');
    
    tripCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.book-now-btn').style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.book-now-btn').style.transform = 'scale(1)';
        });
    });

    // Service card hover animations
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon i');
            icon.style.transform = 'rotateY(180deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon i');
            icon.style.transform = 'rotateY(0)';
        });
    });

    // Add subtle parallax effect for all section backgrounds
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop - window.innerHeight && 
                scrollPosition <= sectionTop + sectionHeight) {
                const speed = section.getAttribute('data-parallax-speed') || 0.1;
                section.style.backgroundPositionY = (scrollPosition - sectionTop) * speed + 'px';
            }
        });
    });

    // Animate progress when in viewport
    const animateElementsOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateElementsOnScroll);
    animateElementsOnScroll(); // Run once on load
    
    // Interactive trip booking buttons
    const bookNowButtons = document.querySelectorAll('.book-now-btn');
    
    bookNowButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tripName = this.closest('.trip-card').querySelector('h3').textContent;
            alert(`Booking process started for: ${tripName}\nIn a real implementation, this would open a booking form or redirect to a booking page.`);
        });
    });
    
    // Interactive view more trips button
    const viewMoreBtn = document.querySelector('.view-more-btn');
    
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function() {
            alert('In a real implementation, this would load more trips or redirect to a trips listing page.');
        });
    }
    
    // Interactive CTA banner button
    const ctaBannerBtn = document.querySelector('.cta-banner-btn');
    
    if (ctaBannerBtn) {
        ctaBannerBtn.addEventListener('click', function() {
            document.querySelector('#featured-trips').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // Add a typed.js effect if script is loaded
    if (typeof Typed !== 'undefined') {
        new Typed('.hero-content h1', {
            strings: ["Let's Go Hiking", "Explore Nature", "Adventure Awaits", "Discover Trails"],
            typeSpeed: 80,
            backSpeed: 40,
            backDelay: 5000,
            startDelay: 1000,
            loop: true
        });
    }

    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // Interactive Testimonial Cards
    const interactiveCards = document.querySelectorAll('.testimonial-card-interactive');

    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (centerY - y) / 15; // Adjust divisor for sensitivity
            const rotateY = (x - centerX) / 15; // Adjust divisor for sensitivity

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
            card.style.setProperty('--cursor-x', `${x}px`);
            card.style.setProperty('--cursor-y', `${y}px`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
});
