// Auctera Capital Partners — main.js

// ── Mobile Nav ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ── Scroll Fade-In ──
const fadeEls = document.querySelectorAll(
  '.service-card, .why-point, .process-step, .principle, .aside-block, .cd-item'
);
fadeEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));

// ── Contact Form — Formspree ──
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');

    btnText.textContent = 'Sending...';
    btn.disabled = true;

    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    try {
      // Replace YOUR_FORMSPREE_ID with your actual Formspree form ID
      // Sign up free at formspree.io
      const res = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        document.getElementById('formFields').style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      btnText.textContent = 'Send Message';
      btn.disabled = false;
      alert('There was an issue sending your message. Please email us directly at info@aucterapartners.com');
    }
  });
}
