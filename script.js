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

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle (for future implementation)
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.support-card, .testimonial-card, .stigma-image');
    animateElements.forEach(el => {
        observer.observe(el);
    });
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
            alert('Opening contact form...');
            // Here you would typically open a contact modal or redirect to contact page
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
