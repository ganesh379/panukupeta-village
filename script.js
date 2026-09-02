/* ─── script.js — Panukupeta Village Site ─── */

/* ─── Route Banner Close ─── */
const routeBanner = document.getElementById('route-banner');
const routeCloseBtn = document.getElementById('route-close');
if (routeCloseBtn && routeBanner) {
  routeCloseBtn.addEventListener('click', () => {
    routeBanner.classList.add('hidden');
  });
}

/* ─── Mobile Menu Toggle ─── */
const hamburger = document.getElementById('nav-hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ─── Smooth-close on outside click ─── */
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }
});

/* ─── Scroll Reveal ─── */
const revealTargets = [
  '.about-card',
  '.landmark-card',
  '.feature-row',
  '.stat-item',
  '.location-detail-card',
  '.hero-text',
  '.hero-illustration',
  '.section-center-header',
  '.contact-inner',
];

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, (entry.target.dataset.delay || 0));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    el.dataset.delay = i * 80;
    revealObserver.observe(el);
  });
});

/* ─── Counter Animation ─── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target || el.textContent, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.round(ease * target);
    el.textContent = current.toLocaleString('en-IN') + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

const statsBanner = document.getElementById('stats');
if (statsBanner) statsObserver.observe(statsBanner);

/* ─── Navbar scroll shadow ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 2px 12px rgba(88,204,2,0.12)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

/* ─── Contact Form Submit ─── */
function handleFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  form.style.display = 'none';
  success.style.display = 'block';
  // Scroll to success
  success.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
