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

// Scroll reveal
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

// Project tab filter (projects page)
const tabBtns = document.querySelectorAll('.tab-btn');
if (tabBtns.length) {
  const cards = document.querySelectorAll('[data-category]');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      cards.forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.category === cat) ? '' : 'none';
      });
    });
  });
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

// Time-based typewriter greeting (welcome page)
const greetTextEl = document.getElementById('greetText');
if (greetTextEl) {
  const hour = new Date().getHours();
  let greeting = 'Good evening';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 17) greeting = 'Good afternoon';
  const message = `${greeting}, welcome!`;
  const prefersReducedGreet = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedGreet) {
    greetTextEl.textContent = message;
  } else {
    let i = 0;
    const typeGreeting = () => {
      greetTextEl.textContent = message.slice(0, i);
      i++;
      if (i <= message.length) setTimeout(typeGreeting, 42);
    };
    typeGreeting();
  }
}

// Copy-link share buttons (blog page)
document.querySelectorAll('.copy-link-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const anchor = btn.dataset.anchor || '';
    const url = window.location.href.split('#')[0] + anchor;
    try {
      await navigator.clipboard.writeText(url);
    } catch (e) {
      // clipboard API unavailable — fall back silently
    }
    btn.classList.add('copied');
    setTimeout(() => btn.classList.remove('copied'), 1500);
  });
});

// Star rating select (reviews page)
const starBtns = document.querySelectorAll('.star-select button');
const starInput = document.getElementById('ratingValue');
if (starBtns.length) {
  starBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = Number(btn.dataset.star);
      if (starInput) starInput.value = val;
      starBtns.forEach(b => b.classList.toggle('on', Number(b.dataset.star) <= val));
    });
  });
}
