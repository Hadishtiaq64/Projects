const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
const applyBtns = [
  document.getElementById('applyBtn'),
  document.getElementById('applyBtnHero')
].filter(Boolean);
const applyModal = document.getElementById('applyModal');

// Mobile nav
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navList.classList.toggle('open');
  });
}

// Smooth scroll for anchor links
navList?.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href');
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      navList.classList.remove('open');
    }
  });
});

// Apply modal
applyBtns.forEach(btn => btn.addEventListener('click', () => {
  if (typeof applyModal.showModal === 'function') {
    applyModal.showModal();
  } else {
    // Fallback: navigate to form link
    window.open('https://forms.gle/', '_blank');
  }
}));

// Footer year
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Contact form uses mailto with subject/body
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const name = encodeURIComponent(data.get('name'));
    const email = encodeURIComponent(data.get('email'));
    const message = encodeURIComponent(data.get('message'));
    const subject = encodeURIComponent(`[UofG Rocketry] Message from ${data.get('name')}`);
    const body = encodeURIComponent(`Name: ${data.get('name')}` + `\nEmail: ${data.get('email')}` + `\n\n${data.get('message')}`);
    window.location.href = `mailto:rocketry@guelph.ca?subject=${subject}&body=${body}`;
  });
}
