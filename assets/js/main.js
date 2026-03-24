/**
 * Gubel Family Vineyards — Main JavaScript
 * Handles: navigation, scroll effects, animations, hero parallax
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollEffects();
  initAnimations();
  initHero();
});

/* --- Navigation --- */
function initNavigation() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.nav__mobile');
  const mobileLinks = document.querySelectorAll('.nav__mobile .nav__link');

  // Mobile menu toggle
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('nav__mobile--open');
      toggle.classList.toggle('nav__toggle--open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);

      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('nav__mobile--open');
        toggle.classList.remove('nav__toggle--open');
        toggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  // Nav background on scroll
  if (nav && !nav.classList.contains('nav--scrolled')) {
    const updateNav = () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 80);
    };
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }
}

/* --- Hero --- */
function initHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Trigger subtle zoom-out on hero background
  requestAnimationFrame(() => {
    hero.classList.add('hero--loaded');
  });

  // Parallax effect on hero background
  const heroBg = hero.querySelector('.hero__bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `scale(${1 + scrolled * 0.0001}) translateY(${scrolled * 0.3}px)`;
      }
    }, { passive: true });
  }
}

/* --- Scroll Effects --- */
function initScrollEffects() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* --- Scroll Animations --- */
function initAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');
  if (!animatedElements.length) return;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    animatedElements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}
