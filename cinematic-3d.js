/* ============================================================
   ANIMATIONS-PREMIUM.JS
   Curseur · Loader · Scroll progress · Tilt cards · Ripple
   Portfolio Ouattara Damiti
   ============================================================ */

(function () {
    'use strict';

    /* ══════════════════════════════════════════
       1. CURSEUR PERSONNALISÉ
    ══════════════════════════════════════════ */
    function initCursor() {
        if (window.matchMedia('(hover: none)').matches) return;

        const dot  = document.createElement('div');
        const ring = document.createElement('div');
        dot.className  = 'cursor-dot';
        ring.className = 'cursor-ring';
        document.body.appendChild(dot);
        document.body.appendChild(ring);

        let mx = -100, my = -100;
        let rx = -100, ry = -100;

        document.addEventListener('mousemove', e => {
            mx = e.clientX;
            my = e.clientY;
            dot.style.left  = mx + 'px';
            dot.style.top   = my + 'px';
        });

        /* Ring avec lag pour effet fluide */
        function animateRing() {
            rx += (mx - rx) * 0.12;
            ry += (my - ry) * 0.12;
            ring.style.left = rx + 'px';
            ring.style.top  = ry + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        /* Hover : agrandit le ring sur les éléments interactifs */
        const interactives = 'a, button, .btn, .pf-card, .comp-card, .service-card, .tech-item, .social-btn, .filter-btn, .channel-card, .certif-inline-card, .tm-card, .stage-card';
        document.querySelectorAll(interactives).forEach(el => {
            el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
            el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
        });

        /* Click : rétrécit le dot */
        document.addEventListener('mousedown', () => dot.classList.add('clicking'));
        document.addEventListener('mouseup',   () => dot.classList.remove('clicking'));
    }


    /* ══════════════════════════════════════════
       2. PAGE LOADER
    ══════════════════════════════════════════ */
    function initLoader() {
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.innerHTML = `
            <div class="loader-logo"><span>Mon</span> Portfolio.</div>
            <div class="loader-bar-wrap"><div class="loader-bar"></div></div>
        `;
        document.body.prepend(loader);

        /* Cache le loader quand la barre est pleine (~2.1s) */
        setTimeout(() => {
            loader.classList.add('hide');
            setTimeout(() => loader.remove(), 750);
        }, 2100);
    }


    /* ══════════════════════════════════════════
       3. SCROLL PROGRESS BAR
    ══════════════════════════════════════════ */
    function initScrollProgress() {
        const bar = document.createElement('div');
        bar.id = 'scroll-progress';
        document.body.appendChild(bar);

        window.addEventListener('scroll', () => {
            const el  = document.documentElement;
            const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
            bar.style.width = Math.min(pct, 100) + '%';
        }, { passive: true });
    }


    /* ══════════════════════════════════════════
       4. RIPPLE EFFECT sur boutons
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
       5. TILT 3D sur les cartes
    ══════════════════════════════════════════ */
    function initTilt() {
        if (window.matchMedia('(hover: none)').matches) return;

        const cards = document.querySelectorAll(
            '.pf-card, .comp-card, .service-card, .stage-card'
        );

        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect  = card.getBoundingClientRect();
                const cx    = rect.left + rect.width  / 2;
                const cy    = rect.top  + rect.height / 2;
                const dx    = (e.clientX - cx) / (rect.width  / 2);
                const dy    = (e.clientY - cy) / (rect.height / 2);
                const rotX  = -dy * 5;
                const rotY  =  dx * 5;
                card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px) scale(1.01)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }


    /* ══════════════════════════════════════════
       6. SCROLL REVEAL (IntersectionObserver)
    ══════════════════════════════════════════ */
    function initScrollReveal() {
        /* Assigner les attributs data-reveal aux éléments ciblés */
        const MAP = [
            { sel: '.section-tag',              dir: 'down'  },
            { sel: '.section-title',            dir: 'down'  },
            { sel: '.section-subtitle',         dir: 'up'    },
            { sel: '.apropos-image-wrapper',    dir: 'right' },
            { sel: '.role-card',                dir: 'up'    },
            { sel: '.bio-intro',                dir: 'up'    },
            { sel: '.bio-section',              dir: 'left'  },
            { sel: '.certif-inline-card',       dir: 'up'    },
            { sel: '.tech-item',                dir: 'zoom'  },
            { sel: '.apropos-actions',          dir: 'up'    },
            { sel: '.tm-card',                  dir: 'up'    },
            { sel: '.comp-card',                dir: 'up'    },
            { sel: '.stat-box',                 dir: 'zoom'  },
            { sel: '.service-card',             dir: 'up'    },
            { sel: '.stage-card',               dir: 'up'    },
            { sel: '.channel-card',             dir: 'right' },
            { sel: '.contact-v2-form-card',     dir: 'left'  },
            { sel: '.contact-v2-header',        dir: 'right' },
            { sel: '.services-process',         dir: 'up'    },
            { sel: '.stage-cta',                dir: 'up'    },
        ];

        const STAGGER_STEP = 80;

        MAP.forEach(({ sel, dir }) => {
            document.querySelectorAll(sel).forEach((el, i) => {
                if (el.closest('.accueil')) return;
                if (el.hasAttribute('data-reveal')) return;
                el.setAttribute('data-reveal', dir);
                const delay = i * STAGGER_STEP;
                if (delay) el.style.transitionDelay = delay + 'ms';
            });
        });

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                } else {
                    entry.target.classList.remove('revealed');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    }


    /* ══════════════════════════════════════════
       7. COUNT-UP sur les stats
    ══════════════════════════════════════════ */
    function initCountUp() {
        const statNums = document.querySelectorAll('.stat-number, .stat-box .stat-number');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el  = entry.target;
                const raw = el.textContent.trim();
                const num = parseInt(raw);
                if (isNaN(num)) return;
                const suffix = raw.replace(/\d/g, '');
                let start = 0;
                const dur = 1200;
                const step = timestamp => {
                    if (!start) start = timestamp;
                    const prog = Math.min((timestamp - start) / dur, 1);
                    const eased = 1 - Math.pow(1 - prog, 3);
                    el.textContent = Math.round(eased * num) + suffix;
                    if (prog < 1) requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
                observer.unobserve(el);
            });
        }, { threshold: 0.5 });

        statNums.forEach(el => observer.observe(el));
    }


    /* ══════════════════════════════════════════
       8. PARALLAX LÉGER sur les glow de fond
    ══════════════════════════════════════════ */
    function initParallax() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const glows = document.querySelectorAll(
            '.accueil-bg-glow, .image-bg-shape'
        );

        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            glows.forEach((g, i) => {
                const speed = i % 2 === 0 ? 0.08 : 0.05;
                g.style.transform = `translateY(${y * speed}px)`;
            });
        }, { passive: true });
    }


    /* ══════════════════════════════════════════
       INIT GLOBAL
    ══════════════════════════════════════════ */
    function init() {
        initLoader();
        initScrollProgress();
        initCursor();
        initRipple();
        initScrollReveal();
        initCountUp();
        initParallax();

        /* Tilt après que le portfolio JS ait injecté ses cartes */
        setTimeout(initTilt, 800);

        /* Observer les nouvelles cartes injectées dynamiquement (portfolio filter) */
        const portfolioGrid = document.querySelector('.portfolio');
        if (portfolioGrid) {
            new MutationObserver(() => setTimeout(initTilt, 100))
                .observe(portfolioGrid, { childList: true, subtree: true });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();