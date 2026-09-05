
// Menu Toggle Logic
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });
}

// Close menu if clicking outside (helps with mobile experience)
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
