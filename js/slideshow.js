document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.slideshow-nav .prev');
    const nextButton = document.querySelector('.slideshow-nav .next');
    const indicatorsContainer = document.querySelector('.slide-indicators');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;
    
    // Create indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
    
    const indicators = document.querySelectorAll('.indicator');
    
    function updateSlides() {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlides();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlides();
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
        resetInterval();
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 6000);
    }
    
    // Event listeners
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
    
    nextButton.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    
    // Start automatic slideshow
    slideInterval = setInterval(nextSlide, 6000);
    
    // Pause on hover
    const slideshow = document.querySelector('.slideshow');
    slideshow.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slideshow.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 6000);
    });
});
