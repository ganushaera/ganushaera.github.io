// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  }));
}

// Scroll reveal for sections
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');
if (prefersReduced || !('IntersectionObserver' in window)) {
  revealEls.forEach(el => el.classList.add('in'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
}

// Floating WhatsApp / Email contact widget
const floatToggle = document.getElementById('floatToggle');
const floatMenu = document.getElementById('floatMenu');
if (floatToggle && floatMenu) {
  floatToggle.addEventListener('click', () => {
    const isOpen = floatMenu.classList.toggle('open');
    floatToggle.classList.toggle('open', isOpen);
    floatToggle.setAttribute('aria-expanded', isOpen);
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#floatContact') && floatMenu.classList.contains('open')) {
      floatMenu.classList.remove('open');
      floatToggle.classList.remove('open');
      floatToggle.setAttribute('aria-expanded', false);
    }
  });
}
