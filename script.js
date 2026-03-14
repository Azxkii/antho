// ===== AOS INIT =====
AOS.init({ duration: 750, once: true, easing: 'ease-out-cubic' });

// ===== EMAILJS INIT =====
// ⚠️ Remplacer par votre clé publique EmailJS
emailjs.init("VOTRE_PUBLIC_KEY");

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// ===== BURGER MENU =====
document.getElementById('burger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

// Fermer le menu au clic sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});

// ===== LIGHTBOX GALLERY =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    lightboxImg.src = item.querySelector('img').src;
    lightbox.classList.add('active');
  });
});

document.getElementById('lightbox-close').addEventListener('click', () => {
  lightbox.classList.remove('active');
});
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.classList.remove('active');
});

// ===== FORMULAIRE EMAILJS =====
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const btnText   = document.getElementById('btn-text');
  const btnLoader = document.getElementById('btn-loader');
  const feedback  = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  // Afficher le loader
  btnText.style.display = 'none';
  btnLoader.style.display = 'inline';
  submitBtn.disabled = true;
  feedback.className = 'form-feedback';
  feedback.textContent = '';

  // ⚠️ Remplacer SERVICE_ID et TEMPLATE_ID par les vôtres
  emailjs.sendForm('VOTRE_SERVICE_ID', 'VOTRE_TEMPLATE_ID', this)
    .then(() => {
      feedback.textContent = '✅ Message envoyé ! Nous vous répondons sous 24h.';
      feedback.className = 'form-feedback success';
      this.reset();
    })
    .catch(() => {
      feedback.textContent = '❌ Erreur d\'envoi. Veuillez réessayer ou appeler directement.';
      feedback.className = 'form-feedback error';
    })
    .finally(() => {
      btnText.style.display = 'inline';
      btnLoader.style.display = 'none';
      submitBtn.disabled = false;
    });
});
