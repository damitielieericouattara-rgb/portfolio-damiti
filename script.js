/* ============================================
   script.js — VERSION CORRIGÉE
   "accueil" orthographié correctement partout
   ============================================ */

/* ── Navbar mobile ── */
let menuIcon = document.querySelector('#menu-icon');
let navbar   = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/* ── Scroll : section active + header sticky ── */
let sections = document.querySelectorAll('section');
let navLinks  = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top    = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id     = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            const active = document.querySelector('header nav a[href*="' + id + '"]');
            if (active) active.classList.add('active');
        }
    });

    document.querySelector('header').classList.toggle('sticky', window.scrollY > 100);

};

/* ── ScrollReveal ── */
ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.accueil-content, .heading',            { origin: 'top' });
ScrollReveal().reveal('.profile-img, .contact form',           { origin: 'bottom' });
ScrollReveal().reveal('.accueil-content h1, .apropos-img',     { origin: 'left' });
ScrollReveal().reveal('.accueil-content p, .apropos-content-wrapper', { origin: 'right' });

/* ── Typed.js ── */
const typed = new Typed('.multiple-text', {
    strings: ['Développeur front-end', 'Étudiant en informatique', 'Passionné de web'],
    typeSpeed: 90,
    backSpeed: 70,
    backDelay: 1200,
    loop: true
});

/* ── Visibilité immédiate de la section accueil ── */
document.addEventListener('DOMContentLoaded', () => {
    const accueilSection = document.querySelector('.accueil');
    if (accueilSection) accueilSection.classList.add('visible');
});

/* ============================================
   FORMULAIRE DE CONTACT
   ============================================ */
(function () {
    'use strict';

    const CONFIG = {
        whatsappNumber: '2250713188565',
        minNameLength: 2,
        minSubjectLength: 3,
        minMessageLength: 10,
        phoneMinLength: 8,
        phoneMaxLength: 15,
        debounceDelay: 300,
        successDelay: 2000
    };

    const REGEX = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^[0-9]{8,15}$/,
        name:  /^[a-zA-ZÀ-ÿ\s'-]+$/,
        nums:  /^\d+$/
    };

    const ERRORS = {
        nom:     { empty: 'Le nom est requis', tooShort: `Minimum ${CONFIG.minNameLength} caractères`, invalid: 'Lettres uniquement' },
        email:   { empty: "L'email est requis", invalid: 'Format invalide (ex: nom@domaine.com)' },
        mobile:  { empty: 'Le numéro est requis', tooShort: `Minimum ${CONFIG.phoneMinLength} chiffres`, tooLong: `Maximum ${CONFIG.phoneMaxLength} chiffres`, invalid: 'Chiffres uniquement' },
        sujet:   { empty: 'Le sujet est requis', tooShort: `Minimum ${CONFIG.minSubjectLength} caractères` },
        message: { empty: 'Le message est requis', tooShort: `Minimum ${CONFIG.minMessageLength} caractères` }
    };

    const validators = {
        nom:     v => { const t = v.trim(); if (!t) return ERRORS.nom.empty; if (t.length < CONFIG.minNameLength) return ERRORS.nom.tooShort; if (!REGEX.name.test(t)) return ERRORS.nom.invalid; return null; },
        email:   v => { const t = v.trim(); if (!t) return ERRORS.email.empty; if (!REGEX.email.test(t)) return ERRORS.email.invalid; return null; },
        mobile:  v => { const c = v.replace(/[\s-]/g,''); if (!c) return ERRORS.mobile.empty; if (!REGEX.nums.test(c)) return ERRORS.mobile.invalid; if (c.length < CONFIG.phoneMinLength) return ERRORS.mobile.tooShort; if (c.length > CONFIG.phoneMaxLength) return ERRORS.mobile.tooLong; return null; },
        sujet:   v => { const t = v.trim(); if (!t) return ERRORS.sujet.empty; if (t.length < CONFIG.minSubjectLength) return ERRORS.sujet.tooShort; return null; },
        message: v => { const t = v.trim(); if (!t) return ERRORS.message.empty; if (t.length < CONFIG.minMessageLength) return ERRORS.message.tooShort; return null; }
    };

    function showError(id, msg) {
        const f = document.getElementById(id);
        const e = document.getElementById(id + '-error');
        if (f) { f.classList.add('error'); f.classList.remove('valid'); f.style.borderColor = '#ff4444'; }
        if (e) { e.textContent = msg; e.style.display = 'block'; }
    }

    function clearError(id) {
        const f = document.getElementById(id);
        const e = document.getElementById(id + '-error');
        if (f) { f.classList.remove('error'); f.classList.add('valid'); f.style.borderColor = '#00ff00'; }
        if (e) { e.textContent = ''; e.style.display = 'none'; }
    }

    function clearAll() {
        Object.keys(validators).forEach(id => {
            const f = document.getElementById(id);
            const e = document.getElementById(id + '-error');
            if (f) { f.classList.remove('error','valid'); f.style.borderColor = ''; }
            if (e) { e.textContent = ''; e.style.display = 'none'; }
        });
    }

    function debounce(fn, delay) {
        let t;
        return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
    }

    function initForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const btn = form.querySelector('.btn');
        const originalHTML = btn ? btn.innerHTML : '';

        Object.keys(validators).forEach(id => {
            const field = document.getElementById(id);
            if (!field) return;

            field.addEventListener('input', debounce(() => {
                const err = validators[id](field.value);
                err ? showError(id, err) : clearError(id);
            }, CONFIG.debounceDelay));

            field.addEventListener('blur', () => {
                const err = validators[id](field.value);
                if (err) showError(id, err);
            });
        });

        form.addEventListener('submit', e => {
            e.preventDefault();
            clearAll();

            const data = {
                nom:     document.getElementById('nom').value.trim(),
                email:   document.getElementById('email').value.trim(),
                mobile:  document.getElementById('mobile').value.replace(/[\s-]/g,''),
                sujet:   document.getElementById('sujet').value.trim(),
                message: document.getElementById('message').value.trim()
            };

            let hasErrors = false;
            Object.keys(validators).forEach(id => {
                const err = validators[id](data[id] || document.getElementById(id).value);
                if (err) { showError(id, err); hasErrors = true; }
            });

            if (hasErrors) {
                const first = form.querySelector('.error');
                if (first) { first.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
                return;
            }

            if (btn) { btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Envoi…'; btn.disabled = true; }

            setTimeout(() => {
                const text = `Bonjour, je suis ${data.nom}.\n📧 ${data.email}\n📱 ${data.mobile}\n📌 ${data.sujet}\n📝 ${data.message}`;
                const url  = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
                window.open(url, '_blank');

                if (btn) { btn.innerHTML = '<i class="bx bx-check-circle"></i> Message envoyé !'; btn.style.background = '#00e676'; }

                setTimeout(() => {
                    form.reset();
                    clearAll();
                    if (btn) { btn.innerHTML = originalHTML; btn.style.background = ''; btn.disabled = false; }
                }, CONFIG.successDelay);
            }, 700);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initForm);
    } else {
        initForm();
    }
})();