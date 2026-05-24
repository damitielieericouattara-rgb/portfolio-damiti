/* ============================================================
   ANIMATIONS-PREMIUM.JS — v2 (sans curseur personnalisé)
   Loader · Scroll progress · Tilt · Ripple · Scroll reveal
   Portfolio Ouattara Damiti
   ============================================================ */

(function () {
    'use strict';

    /* ══════════════════════════════════════════
       1. PAGE LOADER
    ══════════════════════════════════════════ */
    function initLoader() {
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.innerHTML = `
            <div class="loader-logo"><span>Mon</span> Portfolio.</div>
            <div class="loader-bar-wrap"><div class="loader-bar"></div></div>
        `;
        document.body.prepend(loader);

        setTimeout(() => {
            loader.classList.add('hide');
            setTimeout(() => loader.remove(), 750);
        }, 1800);
    }


    /* ══════════════════════════════════════════
       2. SCROLL PROGRESS BAR
    ══════════════════════════════════════════ */
    function initScrollProgress() {
        const bar = document.createElement('div');
        bar.id = 'scroll-progress';
        document.body.appendChild(bar);

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const el  = document.documentElement;
                    const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
                    bar.style.width = Math.min(pct, 100) + '%';
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }


    /* ══════════════════════════════════════════
       3. RIPPLE EFFECT sur boutons
    ══════════════════════════════════════════ */
    function initRipple() {
        const selector = '.btn, .social-btn, .filter-btn, .contact-v2-submit, .pf-overlay-btn';
        document.addEventListener('click', e => {
            const btn = e.target.closest(selector);
            if (!btn) return;

            const rect   = btn.getBoundingClientRect();
            const size   = Math.max(rect.width, rect.height);
            const x      = e.clientX - rect.left - size / 2;
            const y      = e.clientY - rect.top  - size / 2;

            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    }


    /* ══════════════════════════════════════════
       4. TILT 3D sur les cartes (desktop uniquement)
    ══════════════════════════════════════════ */
    function initTilt() {
        if (window.matchMedia('(hover: none)').matches) return;

        const applyTilt = () => {
            document.querySelectorAll('.pf-card, .comp-card, .service-card, .stage-card').forEach(card => {
                if (card._tiltBound) return;
                card._tiltBound = true;

                card.addEventListener('mousemove', e => {
                    const rect = card.getBoundingClientRect();
                    const dx   = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
                    const dy   = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
                    card.style.transform = `perspective(900px) rotateX(${-dy * 5}deg) rotateY(${dx * 5}deg) translateY(-8px) scale(1.01)`;
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = '';
                });
            });
        };

        applyTilt();
        return applyTilt; // retourné pour rappel externe si besoin
    }


    /* ══════════════════════════════════════════
       5. SCROLL REVEAL (IntersectionObserver)
    ══════════════════════════════════════════ */
    function initScrollReveal() {
        const MAP = [
            { sel: '.section-tag',           dir: 'down'  },
            { sel: '.section-title',         dir: 'down'  },
            { sel: '.section-subtitle',      dir: 'up'    },
            { sel: '.apropos-image-wrapper', dir: 'right' },
            { sel: '.role-card',             dir: 'up'    },
            { sel: '.bio-intro',             dir: 'up'    },
            { sel: '.bio-section',           dir: 'left', stagger: true },
            { sel: '.certif-inline-card',    dir: 'up',   stagger: true },
            { sel: '.tech-item',             dir: 'zoom', stagger: true },
            { sel: '.apropos-actions',       dir: 'up'    },
            { sel: '.tm-card',               dir: 'up',   stagger: true },
            { sel: '.comp-card',             dir: 'up',   stagger: true },
            { sel: '.stat-box',              dir: 'zoom', stagger: true },
            { sel: '.service-card',          dir: 'up',   stagger: true },
            { sel: '.stage-card',            dir: 'up',   stagger: true },
            { sel: '.channel-card',          dir: 'right',stagger: true },
            { sel: '.contact-v2-form-card',  dir: 'left'  },
            { sel: '.contact-v2-header',     dir: 'right' },
            { sel: '.services-process',      dir: 'up'    },
            { sel: '.stage-cta',             dir: 'up'    },
        ];

        const STAGGER_STEP = 70;

        MAP.forEach(({ sel, dir, stagger }) => {
            document.querySelectorAll(sel).forEach((el, i) => {
                if (el.closest('.accueil') || el.hasAttribute('data-reveal')) return;
                el.setAttribute('data-reveal', dir);
                const delay = stagger ? i * STAGGER_STEP : 0;
                if (delay) el.style.transitionDelay = delay + 'ms';
            });
        });

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                entry.target.classList.toggle('revealed', entry.isIntersecting);
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    }


    /* ══════════════════════════════════════════
       6. COUNT-UP sur les stats
    ══════════════════════════════════════════ */
    function initCountUp() {
        const nums = document.querySelectorAll('.stat-number, .stat-box .stat-number');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el  = entry.target;
                const raw = el.textContent.trim();
                const num = parseInt(raw);
                if (isNaN(num)) return;
                const suffix = raw.replace(/\d/g, '');
                let start = 0;
                const step = ts => {
                    if (!start) start = ts;
                    const prog  = Math.min((ts - start) / 1200, 1);
                    const eased = 1 - Math.pow(1 - prog, 3);
                    el.textContent = Math.round(eased * num) + suffix;
                    if (prog < 1) requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
                observer.unobserve(el);
            });
        }, { threshold: 0.5 });

        nums.forEach(el => observer.observe(el));
    }


    /* ══════════════════════════════════════════
       7. PARALLAX LÉGER sur les glows de fond
    ══════════════════════════════════════════ */
    function initParallax() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const glows = document.querySelectorAll('.accueil-bg-glow, .image-bg-shape');
        if (!glows.length) return;

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const y = window.scrollY;
                    glows.forEach((g, i) => {
                        g.style.transform = `translateY(${y * (i % 2 === 0 ? 0.07 : 0.04)}px)`;
                    });
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }


    /* ══════════════════════════════════════════
       INIT GLOBAL
    ══════════════════════════════════════════ */
    function init() {
        initLoader();
        initScrollProgress();
        initRipple();
        initScrollReveal();
        initCountUp();
        initParallax();

        /* Tilt après que le portfolio ait injecté ses cartes */
        const tiltFn = initTilt();
        setTimeout(tiltFn, 800);

        /* Observer les nouvelles cartes injectées par le filtre portfolio */
        const portfolio = document.querySelector('.portfolio');
        if (portfolio && tiltFn) {
            new MutationObserver(() => setTimeout(tiltFn, 100))
                .observe(portfolio, { childList: true, subtree: true });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();