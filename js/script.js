// Main JavaScript for oil-filament website

// Slideshow functionality
class Slideshow {
    constructor() {
        this.slides = [
            'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?q=80&w=1170&auto=format&fit=crop',
            'https://plus.unsplash.com/premium_photo-1723196718472-be6b6a214845?q=80&w=1332&auto=format&fit=crop',
            'https://plus.unsplash.com/premium_photo-1691854350738-9de4f0eaa188?q=80&w=1075&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1542931415-162aeab4418f?q=80&w=1332&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1605361318687-f132e21ade9e?q=80&w=1201&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=1170&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1651684195895-38708dc94cfa?q=80&w=1169&auto=format&fit=crop'
        ];
        this.currentSlide = 0;
        this.slideshowContainer = document.querySelector('.slideshow');
        this.initialize();
    }

    initialize() {
        // Create initial slides
        this.slides.forEach((url, index) => {
            const slide = document.createElement('div');
            slide.className = `slide ${index === 0 ? 'active' : ''}`;
            slide.style.backgroundImage = `url(${url})`;
            
            // Add overlay
            const overlay = document.createElement('div');
            overlay.className = 'slide-overlay';
            slide.appendChild(overlay);
            
            this.slideshowContainer.appendChild(slide);
        });

        // Start slideshow
        setInterval(() => this.nextSlide(), 5000);
    }

    nextSlide() {
        const slides = document.querySelectorAll('.slide');
        slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide + 1) % slides.length;
        slides[this.currentSlide].classList.add('active');
    }
}

// Mega Menu functionality
class MegaMenu {
    constructor() {
        this.init();
    }

    init() {
        const servicesLink = document.querySelector('.nav-link-services');
        const megaMenu = document.querySelector('.mega-menu');

        servicesLink?.addEventListener('mouseenter', () => {
            megaMenu?.classList.add('active');
        });

        megaMenu?.addEventListener('mouseleave', () => {
            megaMenu?.classList.remove('active');
        });
    }
}

// Form validation
class FormValidator {
    constructor(form) {
        this.form = form;
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validateForm()) {
                this.showSuccess();
            }
        });
    }

    validateForm() {
        let isValid = true;
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                this.showError(input, 'This field is required');
                isValid = false;
            } else if (input.type === 'email' && !this.validateEmail(input.value)) {
                this.showError(input, 'Please enter a valid email address');
                isValid = false;
            }
        });

        return isValid;
    }

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    showError(input, message) {
        const formGroup = input.closest('.form-group');
        const error = formGroup.querySelector('.error-message') || document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(error);
        }
        input.classList.add('error');
    }

    showSuccess() {
        // Redirect to success page or show success message
        if (window.location.pathname.includes('apply.html')) {
            window.location.href = 'success.html';
        }
    }
}

// Confetti effect for success page
class ConfettiEffect {
    constructor() {
        this.colors = ['#2563eb', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];
        this.init();
    }

    init() {
        if (window.location.pathname.includes('success.html')) {
            this.createConfetti();
        }
    }

    createConfetti() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = this.colors[Math.floor(Math.random() * this.colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.opacity = Math.random();
            document.body.appendChild(confetti);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize slideshow on home page
    if (document.querySelector('.slideshow')) {
        new Slideshow();
    }

    // Initialize mega menu
    new MegaMenu();

    // Initialize form validation on forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => new FormValidator(form));

    // Initialize confetti effect
    new ConfettiEffect();
});
