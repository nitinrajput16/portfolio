document.addEventListener('DOMContentLoaded', () => {
	console.log('DOM ready. gsap present?', !!window.gsap, 'ScrollTrigger present?', !!window.ScrollTrigger);
	const navToggle = document.getElementById('navToggle');
	const navLinks = document.getElementById('primary-menu');

	if (navToggle && navLinks) {
		navToggle.addEventListener('click', () => {
			const expanded = navToggle.getAttribute('aria-expanded') === 'true';
			navToggle.setAttribute('aria-expanded', String(!expanded));
			navLinks.classList.toggle('open');
		});

		// Close nav when clicking a link (mobile)
		navLinks.addEventListener('click', (e) => {
			if (e.target.tagName === 'A') {
				navLinks.classList.remove('open');
				navToggle.setAttribute('aria-expanded', 'false');
			}
		});
	}

	// Smooth scroll for anchor links
	document.querySelectorAll('a[href^="#"]').forEach(a => {
		a.addEventListener('click', function (e) {
			const href = this.getAttribute('href');
			if (href.length > 1) {
				e.preventDefault();
				const target = document.querySelector(href);
				if (target) {
					const nav = document.querySelector('nav.site-nav');
					const offset = nav ? nav.offsetHeight : 0;

					if (window.gsap && window.gsap.to) {
						gsap.to(window, {
							duration: 1,
							scrollTo: { y: target, offsetY: offset },
							ease: 'power3.inOut'
						});
					} else {
						const targetTop = target.getBoundingClientRect().top + window.pageYOffset - offset;
						window.scrollTo({ top: targetTop, behavior: 'smooth' });
					}
					history.pushState(null, null, href);
				}
			}
		});
	});

	// Project Read More toggle
	const readMoreBtns = document.querySelectorAll('.read-more-btn');
	readMoreBtns.forEach(btn => {
		btn.addEventListener('click', function() {
			const project = this.closest('.project');
			const details = project.querySelector('.project-details');
			const summary = project.querySelector('.project-summary');
			const isExpanding = details.style.display === 'none';

			details.style.display = isExpanding ? 'block' : 'none';
			summary.style.display = isExpanding ? 'none' : 'block';
		});
	});

	// Hero Section Enhancement
	const heroContent = document.querySelector('.hero-content');
	if (heroContent) {
		const h1 = heroContent.querySelector('h1');
		if (h1) {
			const text = h1.textContent.trim();
			const parts = text.split(/\s+/);
			if (parts.length >= 2) {
				const lastTwo = parts.slice(-2).join(' ');
				const rest = parts.slice(0, -2).join(' ');
				h1.innerHTML = `${rest} <span class="gradient">${lastTwo}</span><span class="caret" aria-hidden="true"></span>`;
				h1.classList.add('hero-title');
			}
		}

		// Animations
		if (window.gsap) {
			const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

			// Entrance
			tl.fromTo('.nav-inner .logo', { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
			  .fromTo('.badge', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.2')
			  .fromTo('.hero-title', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.3')
			  .fromTo('.lead', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
			  .fromTo('.cta-row .btn', { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 }, '-=0.4')
			  .fromTo('.hero-image', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 }, '-=0.8');

			// Caret pulse
			const caret = document.querySelector('.caret');
			if (caret) gsap.to(caret, { opacity: 0, repeat: -1, yoyo: true, duration: 0.8 });

			// ScrollTrigger Animations
			if (window.ScrollTrigger) {
				gsap.registerPlugin(ScrollTrigger);

				// Reveal sections
				gsap.utils.toArray('.section-surface').forEach(section => {
					gsap.from(section, {
						y: 40,
						opacity: 0,
						duration: 0.8,
						scrollTrigger: {
							trigger: section,
							start: 'top 85%',
							toggleActions: 'play none none none'
						}
					});
				});

				// Project Card Interactions
				gsap.utils.toArray('.project').forEach(proj => {
					// 3D Tilt
					proj.addEventListener('mousemove', (e) => {
						const rect = proj.getBoundingClientRect();
						const x = (e.clientX - rect.left) / rect.width - 0.5;
						const y = (e.clientY - rect.top) / rect.height - 0.5;
						gsap.to(proj, {
							rotateY: x * 10,
							rotateX: -y * 10,
							duration: 0.4,
							ease: 'power2.out'
						});
					});

					proj.addEventListener('mouseleave', () => {
						gsap.to(proj, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power2.out' });
					});
				});
			}
		}
	}
		
});
