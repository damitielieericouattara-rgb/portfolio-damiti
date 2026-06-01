/* ============================================================
   script.js — VERSION PERFORMANCE
   • Passive scroll listener + RAF throttle
   • Suppression de ScrollReveal (remplacé par scroll-animations.js)
   • Active section trackée sans layout thrashing
   ============================================================ */

/* ── 1. Navbar mobile ── */
const menuIcon = document.querySelector('#menu-icon');
const navbar   = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });

    /* Fermer le menu au clic sur un lien */
    navbar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        });
    });
}

/* ── 2. Scroll : section active + header sticky — RAF throttle ── */
(function () {
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('header nav a');
    const header    = document.querySelector('header');
    let ticking     = false;

    function onScroll() {
        if (ticking) return;
        ticking = true;

        requestAnimationFrame(() => {
            const scrollY = window.scrollY;

            /* Sticky header */
            if (header) header.classList.toggle('sticky', scrollY > 100);

            /* Section active */
            let currentId = '';
            sections.forEach(sec => {
                if (scrollY >= sec.offsetTop - 160) {
                    currentId = sec.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                const href = link.getAttribute('href') || '';
                link.classList.toggle(
                    'active',
                    href === '#' + currentId || href.includes(currentId)
                );
            });

            ticking = false;
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    /* Run once on load to set initial state */
    onScroll();
})();

/* ── 3. Typed.js ── */
(function initTyped() {
    const el = document.querySelector('.multiple-text');
    if (!el || typeof Typed === 'undefined') {
        /* Retry once Typed.js loads */
        document.addEventListener('DOMContentLoaded', () => {
            if (typeof Typed !== 'undefined') {
                new Typed('.multiple-text', {
                    strings: ['Développeur front-end', 'Étudiant en informatique', 'Passionné de web'],
                    typeSpeed: 90,
                    backSpeed: 70,
                    backDelay: 1200,
                    loop: true,
                    cursorChar: '|',
                    smartBackspace: true,
                });
            }
        });
        return;
    }

    new Typed('.multiple-text', {
        strings: ['Développeur front-end', 'Étudiant en informatique', 'Passionné de web'],
        typeSpeed: 90,
        backSpeed: 70,
        backDelay: 1200,
        loop: true,
        cursorChar: '|',
        smartBackspace: true,
    });
})();

/* ── 4. Section accueil — toujours visible ── */
document.addEventListener('DOMContentLoaded', () => {
    const accueil = document.querySelector('.accueil');
    if (accueil) accueil.classList.add('visible');
});

/* ── 5. Formulaire de contact WhatsApp ── */
(function () {
    'use strict';

    const CONFIG = {
        whatsappNumber: '2250713188565',
        minNameLength: 2,
        minSubjectLength: 3,
        minMessageLength: 10,
        phoneMinLength: 8,
        phoneMaxLength: 15,
        debounceDelay: 350,
        successDelay: 1800,
    };

    const REGEX = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        name:  /^[a-zA-ZÀ-ÿ\s'-]+$/,
        nums:  /^\d+$/,
    };

    const ERRORS = {
        nom:    { empty: 'Le nom est requis', tooShort: `Min. ${CONFIG.minNameLength} car.`, invalid: 'Lettres uniquement' },
        email:  { empty: "L'email est requis", invalid: 'Format invalide (ex: nom@domaine.com)' },
        mobile: { empty: 'Numéro requis', tooShort: `Min. ${CONFIG.phoneMinLength} chiffres`, tooLong: `Max. ${CONFIG.phoneMaxLength} chiffres`, invalid: 'Chiffres uniquement' },
        sujet:  { empty: 'Sujet requis', tooShort: `Min. ${CONFIG.minSubjectLength} car.` },
        message:{ empty: 'Message requis', tooShort: `Min. ${CONFIG.minMessageLength} car.` },
    };

    const validators = {
        nom:    v => { const t = v.trim(); if (!t) return ERRORS.nom.empty; if (t.length < CONFIG.minNameLength) return ERRORS.nom.tooShort; if (!REGEX.name.test(t)) return ERRORS.nom.invalid; return null; },
        email:  v => { const t = v.trim(); if (!t) return ERRORS.email.empty; if (!REGEX.email.test(t)) return ERRORS.email.invalid; return null; },
        mobile: v => { const c = v.replace(/[\s\-\+]/g,''); if (!c) return ERRORS.mobile.empty; if (!REGEX.nums.test(c)) return ERRORS.mobile.invalid; if (c.length < CONFIG.phoneMinLength) return ERRORS.mobile.tooShort; if (c.length > CONFIG.phoneMaxLength) return ERRORS.mobile.tooLong; return null; },
        sujet:  v => { const t = v.trim(); if (!t) return ERRORS.sujet.empty; if (t.length < CONFIG.minSubjectLength) return ERRORS.sujet.tooShort; return null; },
        message:v => { const t = v.trim(); if (!t) return ERRORS.message.empty; if (t.length < CONFIG.minMessageLength) return ERRORS.message.tooShort; return null; },
    };

    function setFieldState(id, error) {
        const f = document.getElementById(id);
        const e = document.getElementById(id + '-error');
        if (!f) return;
        if (error) {
            f.classList.add('error'); f.classList.remove('valid');
            if (e) { e.textContent = error; e.style.display = 'block'; }
        } else {
            f.classList.remove('error'); f.classList.add('valid');
            if (e) { e.textContent = ''; e.style.display = 'none'; }
        }
    }

    function clearAll() {
        Object.keys(validators).forEach(id => {
            const f = document.getElementById(id);
            const e = document.getElementById(id + '-error');
            if (f) { f.classList.remove('error','valid'); }
            if (e) { e.textContent = ''; e.style.display = 'none'; }
        });
    }

    function debounce(fn, ms) {
        let t;
        return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
    }

    function initForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const btn = form.querySelector('.contact-v2-submit');
        const originalHTML = btn ? btn.innerHTML : '';

        Object.keys(validators).forEach(id => {
            const field = document.getElementById(id);
            if (!field) return;
            const validate = debounce(() => setFieldState(id, validators[id](field.value)), CONFIG.debounceDelay);
            field.addEventListener('input', validate, { passive: true });
            field.addEventListener('blur', () => setFieldState(id, validators[id](field.value)), { passive: true });
        });

        form.addEventListener('submit', e => {
            e.preventDefault();
            clearAll();

            const data = {};
            let hasErrors = false;
            Object.keys(validators).forEach(id => {
                const f = document.getElementById(id);
                data[id] = f ? f.value : '';
                const err = validators[id](data[id]);
                if (err) { setFieldState(id, err); hasErrors = true; }
            });

            if (hasErrors) {
                const first = form.querySelector('.error');
                if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }

            if (btn) { btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Envoi…'; btn.disabled = true; }

            setTimeout(() => {
                const mobile = data.mobile.replace(/[\s\-\+]/g, '');
                const text = `Bonjour, je suis ${data.nom.trim()}.\n📧 ${data.email.trim()}\n📱 ${mobile}\n📌 ${data.sujet.trim()}\n📝 ${data.message.trim()}`;
                window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');

                if (btn) { btn.innerHTML = '<i class="bx bx-check-circle"></i> Message envoyé !'; btn.style.background = 'linear-gradient(135deg,#00c46a,#00e676)'; }

                setTimeout(() => {
                    form.reset();
                    clearAll();
                    if (btn) { btn.innerHTML = originalHTML; btn.style.background = ''; btn.disabled = false; }
                }, CONFIG.successDelay);
            }, 600);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initForm);
    } else {
        initForm();
    }
})();