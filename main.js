
// Menu Toggle Logic
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
const navItems = links.querySelectorAll('a');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });
  
  // Close menu when clicking a link
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      links.classList.remove('open');
    });
  });
}

// Close menu if clicking outside
document.addEventListener('click', (e) => {
  if (links && links.classList.contains('open') && !toggle.contains(e.target) && !links.contains(e.target)) {
    links.classList.remove('open');
  }
});

// Scroll Reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Chatbot Toggle
const chatbotFab = document.getElementById('chatbotFab');
const chatbotWindow = document.getElementById('chatbotWindow');
const closeChat = document.getElementById('closeChat');

if(chatbotFab && chatbotWindow) {
  chatbotFab.addEventListener('click', () => {
    chatbotWindow.classList.toggle('open');
  });
  closeChat.addEventListener('click', () => {
    chatbotWindow.classList.remove('open');
  });
}
