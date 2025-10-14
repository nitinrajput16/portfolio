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
					// Offset scroll position to account for fixed navbar
					const nav = document.querySelector('nav.site-nav');
					const offset = nav ? nav.offsetHeight : 0;
					const targetTop = target.getBoundingClientRect().top + window.pageYOffset - offset;
					window.scrollTo({ top: targetTop, behavior: 'smooth' });
					// Focus the target after scrolling
					setTimeout(() => target.focus({ preventScroll: true }), 600);
				}
			}
		});
	});

		// Hero enhancements: badge, gradient last-words, caret
		const heroContent = document.querySelector('.hero-content');
		if (heroContent) {
			// Insert badge/eyebrow if not present
			if (!heroContent.querySelector('.badge')) {
				const badge = document.createElement('div');
				badge.className = 'badge';
				badge.innerHTML = '<span class="star" aria-hidden="true"></span><span>My Portfolio</span>';
				const eyebrow = document.createElement('div');
				eyebrow.className = 'eyebrow';
				eyebrow.appendChild(badge);
				heroContent.prepend(eyebrow);
			}

			// Transform hero heading: wrap last two words with gradient span and add caret
			const h1 = heroContent.querySelector('h1');
			if (h1) {
				const text = h1.textContent.trim();
				const parts = text.split(/\s+/);
				if (parts.length >= 2) {
					const lastTwo = parts.slice(-2).join(' ');
					const rest = parts.slice(0, -2).join(' ');
					h1.innerHTML = `${rest} <span class="gradient">${lastTwo}</span><span class="caret" aria-hidden="true"></span>`;
					h1.classList.add('hero-title');
				} else {
					h1.classList.add('hero-title');
				}
			}

			// Ensure there are two CTA buttons and the second has outline class
			const ctaContainer = heroContent.querySelector('p');
			if (ctaContainer) {
				const ctas = ctaContainer.querySelectorAll('a.btn');
				if (ctas.length === 1) {
					// create a secondary outline button
					const outline = document.createElement('a');
					outline.href = '#contact';
					outline.className = 'btn btn-outline';
					outline.textContent = 'Start as Teacher';
					ctaContainer.appendChild(outline);
				} else if (ctas.length >= 2) {
					ctas[1].classList.add('btn-outline');
				}
			}


			// GSAP animations (if available)
			function animateWithGSAP() {
				console.log('animateWithGSAP called, gsap:', !!window.gsap, 'ScrollTrigger:', !!window.ScrollTrigger);
				// register ScrollTrigger if available
				if (gsap && gsap.registerPlugin && window.ScrollTrigger) {
					gsap.registerPlugin(ScrollTrigger);
				}

				// entrance timeline for nav/logo -> badge -> hero
				if (window.gsap) {
					const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } });
					// nav/logo
					entrance.fromTo('.nav-inner .logo', { y: -8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
					entrance.fromTo('.nav-toggle', { y: -8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 }, '-=0.35');
					// badge and hero
					const badgeEl = heroContent.querySelector('.badge');
					if (badgeEl) entrance.fromTo(badgeEl, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.15');
					entrance.fromTo('.hero-title', { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.25');
				}
				// badge fade/slide
				const badge = heroContent.querySelector('.badge');
				const h1 = heroContent.querySelector('h1.hero-title');
				const heroImage = document.querySelector('.hero-image');
				const ctas = heroContent.querySelectorAll('.btn');

				if (window.gsap) {
					const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
					if (badge) tl.fromTo(badge, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });

					// split hero title gradient text into words for stagger
					if (h1) {
						// split by spaces but keep spans intact
						const gradientSpan = h1.querySelector('.gradient');
						if (gradientSpan) {
							// Keep gradient text visible without animation to ensure visibility
						}
					}

					if (heroImage) tl.fromTo(heroImage, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5');
					if (ctas && ctas.length) tl.fromTo(ctas, { y: 8, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.45 }, '-=0.4');

					// caret pulse via GSAP
					const caret = heroContent.querySelector('.caret');
					if (caret) gsap.to(caret, { opacity: 0, repeat: -1, yoyo: true, duration: 0.8, ease: 'steps(2)' });

					// nav open/close animation
					if (navToggle && navLinks) {
						navToggle.addEventListener('click', () => {
							if (navLinks.classList.contains('open')) {
								// animate open
								gsap.fromTo(navLinks, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 });
							} else {
								// animate close (quick fade)
								gsap.to(navLinks, { opacity: 0, duration: 0.18 });
							}
						});
					}

					// ScrollTrigger animations for sections
					if (window.ScrollTrigger) {
						// simple reveal for sections
						gsap.utils.toArray('.about, .projects, .contact').forEach(section => {
							gsap.fromTo(section, 
								{ y: 24, opacity: 0 }, 
								{ 
									y: 0, 
									opacity: 1, 
									duration: 0.7,
									scrollTrigger: {
										trigger: section,
										start: 'top 80%',
										toggleActions: 'play none none none'
									}
								}
							);
						});

						// Animate code preview with typing effect
						const codePreview = document.querySelector('.code-preview');
						if (codePreview) {
							gsap.fromTo(codePreview, 
								{ y: 30, opacity: 0 }, 
								{ 
									y: 0, 
									opacity: 1, 
									duration: 0.8,
									delay: 0.3,
									scrollTrigger: {
										trigger: codePreview,
										start: 'top 85%',
										toggleActions: 'play none none none'
									}
								}
							);
						}

						// stagger projects
						gsap.utils.toArray('.project-grid .project').forEach((proj, i) => {
							gsap.fromTo(proj, 
								{ y: 18, opacity: 0 }, 
								{ 
									y: 0, 
									opacity: 1, 
									duration: 0.9, 
									delay: i * 0.06,
									scrollTrigger: {
										trigger: proj,
										start: 'top 90%',
									}
								}
							);
						});
					}
				}
			}

			// run GSAP animations if available, otherwise simple CSS-based reveal
			if (window.gsap) {
				animateWithGSAP();
				// Safety fallback: ensure elements are visible after 5 seconds in case animations fail
				setTimeout(() => {
					const badge = heroContent.querySelector('.badge');
					const h1 = heroContent.querySelector('h1.hero-title');
					const heroImage = document.querySelector('.hero-image');
					const ctas = heroContent.querySelectorAll('.btn');

					if (badge && getComputedStyle(badge).opacity === '0') badge.style.opacity = '1';
					if (h1 && getComputedStyle(h1).opacity === '0') h1.style.opacity = '1';
					if (heroImage && getComputedStyle(heroImage).opacity === '0') heroImage.style.opacity = '1';
					if (ctas && ctas.length) {
						ctas.forEach(btn => {
							if (getComputedStyle(btn).opacity === '0') btn.style.opacity = '1';
						});
					}
				}, 5000);
			} else {
				// basic fallback: ensure all elements are visible
				const badge = heroContent.querySelector('.badge');
				const h1 = heroContent.querySelector('h1.hero-title');
				const heroImage = document.querySelector('.hero-image');
				const ctas = heroContent.querySelectorAll('.btn');

				if (badge) badge.style.opacity = '1';
				if (h1) h1.style.opacity = '1';
				if (heroImage) heroImage.style.opacity = '1';
				if (ctas && ctas.length) {
					ctas.forEach(btn => btn.style.opacity = '1');
				}
			}
		}

		// Contact form handler (frontend only)
		const contactForm = document.getElementById('contact-form');
		if (contactForm) {
			const submitBtn = contactForm.querySelector('button[type="submit"]');
			contactForm.addEventListener('submit', async (e) => {
				e.preventDefault();
				const status = document.getElementById('contact-status');

				// Disable button and show loading state
				if (submitBtn) {
					submitBtn.disabled = true;
					submitBtn.textContent = 'Sending...';
				}

				status.textContent = 'Sending...';
				const formData = new FormData(contactForm);
				const payload = {};
				for (const [k, v] of formData.entries()) payload[k] = v;

				try {
					// Attempt to POST to backend endpoint /contact
					const res = await fetch('/contact', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(payload),
					});
					if (res.ok) {
						status.textContent = 'Message sent — thank you!';
						status.style.color = 'var(--accent-2)';
						contactForm.reset();
					} else {
						const text = await res.text();
						status.textContent = 'Error sending message: ' + text;
						status.style.color = 'var(--accent-1)';
					}
				} catch (err) {
					status.textContent = 'Failed to send message. (No backend configured)';
					status.style.color = 'var(--accent-1)';
					console.error(err);
				} finally {
					// Re-enable button
					if (submitBtn) {
						submitBtn.disabled = false;
						submitBtn.textContent = 'Send Message';
					}
				}
			});
		}
});
