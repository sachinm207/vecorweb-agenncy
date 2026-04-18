/* AGENTZY — scripts */

// Sticky nav
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 16);
}, { passive: true });

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 72, behavior: 'smooth' });
    }
  });
});

// Contact form — Netlify submission
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    try { await fetch('/', { method: 'POST', body: new FormData(form) }); } catch (_) {}
    form.innerHTML = `
      <div class="form-success">
        <div class="fs-icon">✅</div>
        <h3>Message received</h3>
        <p>We'll reply within a few hours.<br/>
        Meanwhile, <a href="https://app.bizap.org" target="_blank" style="color:var(--orange)">try Bizap free</a> — your site could be live today.</p>
      </div>`;
  });
}

// Subtle fade-in on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.06, rootMargin: '0px 0px -24px 0px' });

document.querySelectorAll('.feat-card, .service-row, .hiw-step, .cta-block').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = `opacity 0.45s ease ${(i % 5) * 0.06}s, transform 0.45s ease ${(i % 5) * 0.06}s`;
  io.observe(el);
});
