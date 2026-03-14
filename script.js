// ============================================================
// ⚠️  REMPLACER UNIQUEMENT CETTE VALEUR
const EMAILJS_PUBLIC_KEY  = 'T9LWVGKL4NzUWrlfE'; // Account → API Keys
// Les deux suivantes sont déjà remplies :
const EMAILJS_SERVICE_ID  = 'service_tsiyk1m';
const EMAILJS_TEMPLATE_ID = 'template_g61nick';
// ============================================================

// ===== AOS =====
AOS.init({ duration: 750, once: true, easing: 'ease-out-cubic' });

// ===== EMAILJS INIT =====
emailjs.init(EMAILJS_PUBLIC_KEY);

// ===== GOOGLE CALENDAR BUTTON =====
window.addEventListener('load', function () {
  if (typeof calendar !== 'undefined' && calendar.schedulingButton) {
    calendar.schedulingButton.load({
      url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2PdhwFDE0hjYLFu4LWB5YhiWlIo0MMzF8d61rpyI8p5_QiFGagMYgAI5Si8rBYXlq87rb78GcG?gv=true',
      color: '#C0201F',
      label: 'Choisir un créneau',
      target: document.getElementById('gcal-btn-container'),
    });
  }
});

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

// ===== BURGER MENU =====
const burger   = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const icon = burger.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const icon = burger.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  });
});

// ===== LIGHTBOX AVEC NAVIGATION =====
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const galleryImgs = Array.from(document.querySelectorAll('.gallery-item img'));
let currentIndex  = 0;

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = galleryImgs[index].src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function navigate(dir) {
  currentIndex = (currentIndex + dir + galleryImgs.length) % galleryImgs.length;
  lightboxImg.style.opacity = '0';
  setTimeout(() => {
    lightboxImg.src = galleryImgs[currentIndex].src;
    lightboxImg.style.opacity = '1';
  }, 150);
}

document.querySelectorAll('.gallery-item').forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox-prev').addEventListener('click', () => navigate(-1));
document.getElementById('lightbox-next').addEventListener('click', () => navigate(1));

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  navigate(-1);
  if (e.key === 'ArrowRight') navigate(1);
});

// ===== FORMULAIRE EMAILJS =====
const form      = document.getElementById('contact-form');
const btnText   = document.getElementById('btn-text');
const btnLoader = document.getElementById('btn-loader');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Validation téléphone
  const phone = document.getElementById('phone').value.replace(/\s/g, '');
  if (phone.length < 10) {
    showInlineError('phone', 'Numéro de téléphone invalide.');
    return;
  }

  setLoading(true);

  emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
    .then(() => {
      document.getElementById('confirm-email').textContent =
        document.getElementById('email').value;
      showState('success');
    })
    .catch((err) => {
      console.error('EmailJS error:', err);
      showState('error');
    })
    .finally(() => setLoading(false));
});

function setLoading(on) {
  btnText.style.display   = on ? 'none'   : 'inline';
  btnLoader.style.display = on ? 'inline' : 'none';
  submitBtn.disabled      = on;
}

function showState(state) {
  form.style.display = 'none';
  document.getElementById('form-' + state).style.display = 'flex';
}

function resetForm() {
  form.reset();
  form.style.display = 'block';
  document.getElementById('form-success').style.display = 'none';
  document.getElementById('form-error').style.display   = 'none';
  setLoading(false);
}

function showInlineError(fieldId, msg) {
  const field = document.getElementById(fieldId);
  field.classList.add('input-error');
  let err = field.parentNode.querySelector('.inline-error');
  if (!err) {
    err = document.createElement('span');
    err.className = 'inline-error';
    field.parentNode.appendChild(err);
  }
  err.textContent = msg;
  field.addEventListener('input', () => {
    field.classList.remove('input-error');
    err.remove();
  }, { once: true });
}
