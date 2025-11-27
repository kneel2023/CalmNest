// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect and floating buttons visibility
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollToTop = document.getElementById('scrollToTop');
    const themeToggle = document.getElementById('themeToggle');
    
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        scrollToTop.classList.add('show');
        themeToggle.classList.add('show');
    } else {
        header.classList.remove('scrolled');
        scrollToTop.classList.remove('show');
        themeToggle.classList.remove('show');
    }
});

// Scroll to Top functionality
document.getElementById('scrollToTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Theme Toggle functionality
document.getElementById('themeToggle').addEventListener('click', function() {
    const body = document.body;
    const icon = this.querySelector('i');
    
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
});

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.querySelector('#themeToggle i');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.className = 'fas fa-sun';
    }
});

// Mobile menu toggle (for future implementation)
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

// Mood Tracker functionality
function initMoodTracker() {
    const moodButtons = document.querySelectorAll('.mood-btn');
    const moodFeedback = document.getElementById('moodFeedback');
    const moodMessage = document.getElementById('moodMessage');
    
    const moodMessages = {
        great: "That's wonderful! Keep up the positive energy! 🌟",
        good: "Great to hear you're doing well! 😊",
        okay: "Every day has its ups and downs. You're doing fine! 💙",
        sad: "It's okay to feel sad sometimes. Consider reaching out for support. 💝",
        stressed: "Take some deep breaths. Remember, this feeling will pass. 🧘‍♀️"
    };
    
    moodButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            moodButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show feedback
            const mood = this.dataset.mood;
            moodMessage.textContent = moodMessages[mood];
            moodFeedback.style.display = 'block';
            
            // Store mood in localStorage
            localStorage.setItem('currentMood', mood);
            localStorage.setItem('moodDate', new Date().toDateString());
        });
    });
    
    // Load saved mood if it's from today
    const savedMood = localStorage.getItem('currentMood');
    const savedDate = localStorage.getItem('moodDate');
    const today = new Date().toDateString();
    
    if (savedMood && savedDate === today) {
        const savedButton = document.querySelector(`[data-mood="${savedMood}"]`);
        if (savedButton) {
            savedButton.classList.add('active');
            moodMessage.textContent = moodMessages[savedMood];
            moodFeedback.style.display = 'block';
        }
    }
}

// Statistics Counter Animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const animateCounter = (element) => {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statNumbers.forEach((stat, index) => {
                    setTimeout(() => {
                        animateCounter(stat);
                        stat.classList.add('animate-counter');
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.statistics-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// Testimonials Carousel
function initTestimonialsCarousel() {
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    if (!track) return;
    
    const cards = track.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    const totalSlides = Math.ceil(cards.length / 2); // Show 2 cards at a time
    let autoRotateInterval;
    
    // Create indicators
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = `indicator ${i === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }
    
    const indicators = document.querySelectorAll('.indicator');
    
    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth + 20; // Include margin
        const offset = currentIndex * cardWidth * 2; // Move 2 cards at a time
        track.style.transform = `translateX(-${offset}px)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoRotate();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    function startAutoRotate() {
        autoRotateInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoRotate() {
        clearInterval(autoRotateInterval);
        startAutoRotate();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoRotate();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoRotate();
    });
    
    // Start auto-rotation
    startAutoRotate();
    
    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(autoRotateInterval));
    track.addEventListener('mouseleave', startAutoRotate);
}

// Contact Form Validation
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');
    const successMessage = document.getElementById('successMessage');
    
    const validators = {
        name: (value) => value.length >= 2 ? null : 'Name must be at least 2 characters',
        email: (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value) ? null : 'Please enter a valid email address';
        },
        phone: (value) => {
            if (!value) return null; // Optional field
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            return phoneRegex.test(value.replace(/\s/g, '')) ? null : 'Please enter a valid phone number';
        },
        service: (value) => value ? null : 'Please select a service',
        message: (value) => value.length >= 10 ? null : 'Message must be at least 10 characters'
    };
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = document.getElementById(`${fieldName}Error`);
        
        const error = validators[fieldName](value);
        
        if (error) {
            field.classList.add('error');
            errorElement.textContent = error;
            return false;
        } else {
            field.classList.remove('error');
            errorElement.textContent = '';
            return true;
        }
    }
    
    // Real-time validation
    form.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                validateField(field);
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all fields
        const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) return;
        
        // Simulate form submission
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Reset form after 3 seconds
            setTimeout(() => {
                form.reset();
                form.style.display = 'block';
                successMessage.style.display = 'none';
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }, 3000);
            
        } catch (error) {
            alert('Something went wrong. Please try again.');
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing animations
    const animateElements = document.querySelectorAll('.support-card, .testimonial-card, .stigma-image');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Initialize new interactive features
    initMoodTracker();
    initStatsCounter();
    initTestimonialsCarousel();
    initContactForm();
    initSignupModal();
});

// Button click handlers
document.addEventListener('DOMContentLoaded', function() {
    // Hero buttons
    const talkToSomeoneBtn = document.querySelector('.btn-primary');
    const exploreResourcesBtn = document.querySelector('.btn-secondary');
    const getStartedBtn = document.querySelector('.get-started-btn');
    
    if (talkToSomeoneBtn) {
        talkToSomeoneBtn.addEventListener('click', function() {
            alert('Redirecting to booking system...');
            // Here you would typically redirect to a booking page
        });
    }
    
    if (exploreResourcesBtn) {
        exploreResourcesBtn.addEventListener('click', function() {
            // Scroll to resources section
            const resourcesSection = document.querySelector('.support-section');
            if (resourcesSection) {
                resourcesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            alert('Getting started with CalmNest...');
            // Here you would typically redirect to a signup or onboarding flow
        });
    }
    
    // Sign in button
    const signInBtn = document.querySelector('.sign-in-btn');
    if (signInBtn) {
        signInBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Redirecting to sign in...');
            // Here you would typically redirect to a login page
        });
    }
    
    // Get in touch button
    const getInTouchBtn = document.querySelector('.get-in-touch-btn');
    if (getInTouchBtn) {
        getInTouchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.querySelector('.contact-form-section');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Learn more link
    const learnMoreLink = document.querySelector('.learn-more');
    if (learnMoreLink) {
        learnMoreLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Scroll to about section or open modal
            alert('Learn more about CalmNest...');
        });
    }
});

// Form validation (for future contact forms)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Utility function for smooth animations
function fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let start = performance.now();
    
    function animate(timestamp) {
        let progress = timestamp - start;
        let opacity = Math.min(progress / duration, 1);
        
        element.style.opacity = opacity;
        
        if (progress < duration) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Utility function for slide animations
function slideIn(element, direction = 'up', duration = 300) {
    const directions = {
        up: 'translateY(30px)',
        down: 'translateY(-30px)',
        left: 'translateX(30px)',
        right: 'translateX(-30px)'
    };
    
    element.style.transform = directions[direction];
    element.style.opacity = '0';
    element.style.transition = `all ${duration}ms ease-out`;
    
    setTimeout(() => {
        element.style.transform = 'translate(0, 0)';
        element.style.opacity = '1';
    }, 10);
}

// Signup Modal functionality
function initSignupModal() {
    const openModalBtn = document.getElementById('openSignupModal');
    const modal = document.getElementById('signupModal');
    const closeModalBtn = document.getElementById('closeModal');
    const signupForm = document.getElementById('signupForm');
    
    // Open modal
    openModalBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        signupForm.reset();
        // Clear any error messages
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
    }
    
    closeModalBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking overlay
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Form validation and submission
    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            fullName: document.getElementById('fullName').value.trim(),
            email: document.getElementById('signupEmail').value.trim(),
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirmPassword').value,
            agreeTerms: document.getElementById('agreeTerms').checked
        };
        
        // Validation
        let isValid = true;
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
        
        // Full name validation
        if (formData.fullName.length < 2) {
            document.getElementById('fullNameError').textContent = 'Full name must be at least 2 characters';
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            document.getElementById('signupEmailError').textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Password validation
        if (formData.password.length < 6) {
            document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
            isValid = false;
        }
        
        // Confirm password validation
        if (formData.password !== formData.confirmPassword) {
            document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
            isValid = false;
        }
        
        // Terms validation
        if (!formData.agreeTerms) {
            alert('Please agree to the Terms of Service and Privacy Policy');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Simulate form submission
        const submitBtn = signupForm.querySelector('.signup-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'block';
        
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success and close modal
            alert('Account created successfully! Welcome to CalmNest!');
            closeModal();
            
        } catch (error) {
            alert('Something went wrong. Please try again.');
        } finally {
            submitBtn.disabled = false;
            btnText.style.display = 'block';
            btnLoading.style.display = 'none';
        }
    });
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .error {
        border-color: #e74c3c !important;
        box-shadow: 0 0 5px rgba(231, 76, 60, 0.3) !important;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease-in;
    }
`;
document.head.appendChild(style);
