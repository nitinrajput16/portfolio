/* =====================================================
   APP.JS — UI Logic, Animations, Scroll, & Interactions
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ========================
  // LOADER
  // ========================
  const loader = document.getElementById('loader');
  const loaderBarFill = document.getElementById('loader-bar-fill');
  let loadProgress = 0;

  const loadInterval = setInterval(() => {
    loadProgress += Math.random() * 15 + 5;
    if (loadProgress >= 100) {
      loadProgress = 100;
      clearInterval(loadInterval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        animateHeroEntrance();
      }, 400);
    }
    loaderBarFill.style.width = loadProgress + '%';
  }, 150);

  // ========================
  // CUSTOM CURSOR
  // ========================
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursor-follower');
  let cursorX = 0, cursorY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
  });

  function animateCursor() {
    followerX += (cursorX - followerX) * 0.12;
    followerY += (cursorY - followerY) * 0.12;

    if (cursor) {
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
    }
    if (cursorFollower) {
      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top = followerY + 'px';
    }

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor interactions
  const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .mini-project-card, .skill-tag, .nav-toggle');
  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('active');
      cursorFollower.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
      cursorFollower.classList.remove('active');
    });
  });

  // ========================
  // NAVIGATION
  // ========================
  const nav = document.getElementById('nav');
  const navLinks = document.getElementById('nav-links');
  const navToggle = document.getElementById('nav-toggle');
  const navLinkItems = document.querySelectorAll('.nav-link');

  // Scroll-based nav
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Active section tracking
  const sections = document.querySelectorAll('.section');
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -70% 0px',
    threshold: 0,
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinkItems.forEach((link) => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => sectionObserver.observe(section));

  // Smooth scroll for nav links
  navLinkItems.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(link.dataset.section);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  });

  // ========================
  // SCROLL ANIMATIONS (GSAP)
  // ========================
  gsap.registerPlugin(ScrollTrigger);

  // Animate elements on scroll
  const animatedElements = document.querySelectorAll('[data-animate]');
  animatedElements.forEach((el) => {
    if (el.closest('.hero-section')) {
      return;
    }

    const delay = parseInt(el.dataset.delay) || 0;
    const animType = el.dataset.animate;

    let fromVars = { opacity: 0, y: 40, duration: 0.8, delay: delay / 1000 };

    if (animType === 'fade-right') {
      fromVars = { opacity: 0, x: -50, duration: 0.8, delay: delay / 1000 };
    } else if (animType === 'fade-left') {
      fromVars = { opacity: 0, x: 50, duration: 0.8, delay: delay / 1000 };
    }

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        el.classList.add('visible');
        gsap.from(el, {
          ...fromVars,
          ease: 'power3.out',
          clearProps: 'all',
        });
      },
      once: true,
    });
  });

  // ========================
  // HERO ENTRANCE ANIMATION
  // ========================
  function animateHeroEntrance() {
    document.querySelectorAll('.hero-section [data-animate]').forEach((el) => {
      el.classList.add('visible');
    });

    const tl = gsap.timeline();

    tl.fromTo('.hero-greeting', {
      opacity: 0,
      y: 30,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
    .fromTo('.hero-name', {
      opacity: 0,
      y: 50,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.3')
    .fromTo('.name-line', {
      opacity: 0,
      y: 50,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    }, '<')
    .fromTo('.hero-tagline', {
      opacity: 0,
      y: 30,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.4')
    .fromTo('.hero-cta .btn', {
      opacity: 0,
      y: 20,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out',
    }, '-=0.3')
    .fromTo('.hero-scroll', {
      opacity: 0,
      y: 20,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=0.2')
    .fromTo('.side-social, .side-email', {
      opacity: 0,
      y: 30,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    }, '-=0.3')
    .fromTo('.nav', {
      opacity: 0,
      y: -20,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=0.4');
  }

  // ========================
  // COUNTER ANIMATION
  // ========================
  const counters = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.count);
        animateCounter(counter, 0, target, 2000);
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => counterObserver.observe(counter));

  function animateCounter(el, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = Math.floor(start + (end - start) * eased);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ========================
  // SKILL TAGS HOVER EFFECT
  // ========================
  const skillTags = document.querySelectorAll('.skill-tag');
  skillTags.forEach((tag) => {
    tag.addEventListener('mouseenter', () => {
      const level = tag.dataset.level;
      tag.style.setProperty('--level', level + '%');
    });
  });

  // ========================
  // PROJECT CARDS TILT EFFECT
  // ========================
  const projectCards = document.querySelectorAll('.project-card, .mini-project-card');
  projectCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ========================
  // MAGNETIC BUTTONS
  // ========================
  const magneticBtns = document.querySelectorAll('.btn');
  magneticBtns.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ========================
  // PARALLAX ON SCROLL
  // ========================
  gsap.to('.hero-content', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
    y: -100,
    opacity: 0,
  });

  // ========================
  // SMOOTH SECTION TRANSITIONS
  // ========================
  sections.forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 90%',
        end: 'top 50%',
        scrub: 0.5,
      },
      opacity: 0.3,
    });
  });

  // ========================
  // CONTACT -> WhatsApp button
  // ========================
  const contactStatus = document.getElementById('contact-status');
  const waButton = document.getElementById('wa-button');

  if (waButton) {
    waButton.addEventListener('click', (e) => {
      e.preventDefault();
      const originalHTML = waButton.innerHTML;
      waButton.innerHTML = '<span>Opening...</span> <i class="fas fa-spinner fa-spin"></i>';
      waButton.disabled = true;

      // TODO: replace with your WhatsApp number (country code + number, no + or dashes)
      const WHATSAPP_NUMBER = '919760858044'; // e.g. 15551234567

      // Read name and message inputs and prefill defaults if empty
      const nameInput = document.getElementById('form-name');
      const messageInput = document.getElementById('form-message');
      let nameVal = nameInput ? nameInput.value.trim() : '';
      let msgVal = messageInput ? messageInput.value.trim() : '';

      if (!nameVal) {
        nameVal = 'Anonymous';
        if (nameInput) nameInput.value = nameVal;
      }
      if (!msgVal) {
        msgVal = 'Hello! I would like to get in touch.';
        if (messageInput) messageInput.value = msgVal;
      }

      const waText = `Name: ${nameVal}\n\n${msgVal}`;
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

      window.open(waUrl, '_blank');

      if (contactStatus) {
        contactStatus.textContent = 'Opening WhatsApp...';
        contactStatus.className = 'contact-status success';
        gsap.from(contactStatus, { opacity: 0, y: 10, duration: 0.5, ease: 'power3.out' });
      }

      setTimeout(() => {
        waButton.innerHTML = originalHTML;
        waButton.disabled = false;
        if (contactStatus) {
          contactStatus.textContent = '';
          contactStatus.className = 'contact-status';
        }
      }, 1200);
    });
  }

  // ========================
  // TEXT SCRAMBLE EFFECT
  // ========================
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#________';
      this.update = this.update.bind(this);
    }

    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => (this.resolve = resolve));
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }

    update() {
      let output = '';
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.chars[Math.floor(Math.random() * this.chars.length)];
            this.queue[i].char = char;
          }
          output += `<span class="text-muted" style="opacity:0.3">${char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
  }

  // Apply scramble effect to section titles on scroll
  const sectionTitles = document.querySelectorAll('.section-title');
  sectionTitles.forEach((title) => {
    const originalText = title.textContent;
    const scrambler = new TextScramble(title);

    const titleObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          scrambler.setText(originalText);
          titleObserver.unobserve(title);
        }
      });
    }, { threshold: 0.5 });

    titleObserver.observe(title);
  });

  // ========================
  // PARTICLE TRAIL ON MOUSE
  // ========================
  const trailCanvas = document.createElement('canvas');
  trailCanvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9997;';
  document.body.appendChild(trailCanvas);
  const trailCtx = trailCanvas.getContext('2d');
  trailCanvas.width = window.innerWidth;
  trailCanvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    trailCanvas.width = window.innerWidth;
    trailCanvas.height = window.innerHeight;
  });

  const trailParticles = [];

  document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.6) return; // throttle
    trailParticles.push({
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 3 + 1,
      life: 1,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
      color: ['#6c5ce7', '#a29bfe', '#00cec9', '#fd79a8'][Math.floor(Math.random() * 4)],
    });
  });

  function animateTrail() {
    trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);

    for (let i = trailParticles.length - 1; i >= 0; i--) {
      const p = trailParticles[i];
      p.life -= 0.02;
      p.x += p.vx;
      p.y += p.vy;
      p.size *= 0.98;

      if (p.life <= 0) {
        trailParticles.splice(i, 1);
        continue;
      }

      trailCtx.beginPath();
      trailCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      trailCtx.fillStyle = p.color;
      trailCtx.globalAlpha = p.life * 0.5;
      trailCtx.fill();
    }

    trailCtx.globalAlpha = 1;
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  // Keep trail particles array manageable
  setInterval(() => {
    if (trailParticles.length > 100) {
      trailParticles.splice(0, trailParticles.length - 100);
    }
  }, 1000);

});
