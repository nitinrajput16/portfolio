document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for reveal effects
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add reveal-on-scroll to sections and major elements
    document.querySelectorAll('section, article, .lg\\:col-span-5').forEach(el => {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Update URL without jump
                history.pushState(null, null, targetId);
            }
        });
    });

    // Hover effect for project cards (optional extra polish)
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // GSAP could be used here for more complex effects if needed
        });
    });
});
