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

// Per-post blog comments (giscus, free, no database) — lazy-loaded on click, one thread per post
// EDIT ME: after setting up giscus at https://giscus.app for your repo, paste your values below —
// this one edit turns on comments for every post on the blog page.
const GISCUS_CONFIG = {
  repo: 'YOUR_GITHUB_USERNAME/YOUR_REPO',
  repoId: 'YOUR_REPO_ID',
  category: 'Blog Comments',
  categoryId: 'YOUR_CATEGORY_ID'
};
document.querySelectorAll('.comments-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const mount = document.getElementById(btn.dataset.target);
    if (!mount) return;
    const isOpen = mount.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
    if (isOpen && !mount.dataset.loaded) {
      mount.dataset.loaded = 'true';
      const script = document.createElement('script');
      script.src = 'https://giscus.app/client.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.setAttribute('data-repo', GISCUS_CONFIG.repo);
      script.setAttribute('data-repo-id', GISCUS_CONFIG.repoId);
      script.setAttribute('data-category', GISCUS_CONFIG.category);
      script.setAttribute('data-category-id', GISCUS_CONFIG.categoryId);
      script.setAttribute('data-mapping', 'specific');
      script.setAttribute('data-term', mount.dataset.term);
      script.setAttribute('data-strict', '0');
      script.setAttribute('data-reactions-enabled', '1');
      script.setAttribute('data-emit-metadata', '0');
      script.setAttribute('data-input-position', 'bottom');
      script.setAttribute('data-theme', 'dark_dimmed');
      script.setAttribute('data-lang', 'en');
      mount.appendChild(script);
    }
  });
});

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

// Facebook-style Like/reaction widget (blog page)
// Each visitor's pick is remembered in their own browser (localStorage) —
// this is a per-visitor "your reaction" memory, not a shared counter across everyone.
const REACTIONS = [
  { mood: 'like',  emoji: '👍', label: 'Like'  },
  { mood: 'love',  emoji: '❤️', label: 'Love'  },
  { mood: 'haha',  emoji: '😂', label: 'Haha'  },
  { mood: 'wow',   emoji: '😮', label: 'Wow'   },
  { mood: 'sad',   emoji: '😢', label: 'Sad'   },
  { mood: 'angry', emoji: '😡', label: 'Angry' }
];
document.querySelectorAll('.reaction-widget').forEach(widget => {
  const postId = widget.dataset.post;
  const btn = widget.querySelector('.reaction-btn');
  const iconEl = btn.querySelector('.reaction-icon');
  const labelEl = btn.querySelector('.reaction-label');
  const storeKey = `reaction:${postId}`;
  const moodClasses = REACTIONS.map(r => 'mood-' + r.mood);

  const applyMood = (mood) => {
    const found = REACTIONS.find(r => r.mood === mood);
    btn.classList.remove('picked', ...moodClasses);
    if (found) {
      iconEl.textContent = found.emoji;
      labelEl.textContent = found.label;
      btn.classList.add('picked');
      if (found.mood !== 'like') btn.classList.add('mood-' + found.mood);
    } else {
      iconEl.textContent = '👍';
      labelEl.textContent = 'Like';
    }
  };

  try {
    const saved = localStorage.getItem(storeKey);
    if (saved) applyMood(saved);
  } catch (e) { /* localStorage unavailable — widget still works, just won't persist */ }

  const setReaction = (mood) => {
    try {
      if (localStorage.getItem(storeKey) === mood) {
        localStorage.removeItem(storeKey);
        applyMood(null);
      } else {
        localStorage.setItem(storeKey, mood);
        applyMood(mood);
      }
    } catch (e) {
      applyMood(btn.classList.contains('picked') ? null : mood);
    }
    widget.classList.remove('open');
  };

  btn.addEventListener('click', () => setReaction('like'));

  widget.querySelectorAll('.reaction-emoji').forEach(emojiBtn => {
    emojiBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setReaction(emojiBtn.dataset.mood);
    });
  });

  // Long-press opens the reaction picker on touch devices (no hover there)
  let pressTimer = null;
  let longPressed = false;
  btn.addEventListener('touchstart', () => {
    longPressed = false;
    pressTimer = setTimeout(() => {
      longPressed = true;
      widget.classList.add('open');
    }, 400);
  }, { passive: true });
  btn.addEventListener('touchend', (e) => {
    clearTimeout(pressTimer);
    if (longPressed) e.preventDefault();
  });
});
document.addEventListener('click', (e) => {
  document.querySelectorAll('.reaction-widget.open').forEach(w => {
    if (!w.contains(e.target)) w.classList.remove('open');
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
