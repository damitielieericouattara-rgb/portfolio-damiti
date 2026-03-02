/* ============================================================
   SCROLL ANIMATIONS — BIDIRECTIONNEL
   Les éléments apparaissent en scrollant vers le bas
   et disparaissent en scrollant vers le haut
   ============================================================ */

(function () {
    'use strict';

    /* ── Configuration des animations par groupe d'éléments ──
       chaque entrée : { selector, animation, delay (ms optionnel) }
       animations disponibles : fade-up / fade-down / fade-left / fade-right / zoom-in / flip-up
    ── */
    const GROUPS = [

        /* ─ Titres de section ─ */
        { selector: '.section-tag',                     anim: 'fade-down',  delay: 0   },
        { selector: '.section-title',                   anim: 'fade-down',  delay: 80  },
        { selector: '.section-subtitle',                anim: 'fade-up',    delay: 160 },

        /* ─ À propos ─ */
        { selector: '.apropos-image-wrapper',           anim: 'fade-right', delay: 0   },
        { selector: '.role-card',                       anim: 'fade-up',    delay: 0   },
        { selector: '.bio-intro',                       anim: 'fade-up',    delay: 60  },
        { selector: '.bio-section',                     anim: 'fade-left',  delay: 0,  stagger: true },
        { selector: '.certif-inline-card',              anim: 'fade-up',    delay: 0,  stagger: true },
        { selector: '.tech-stack',                      anim: 'fade-up',    delay: 0   },
        { selector: '.tech-item',                       anim: 'zoom-in',    delay: 0,  stagger: true },
        { selector: '.apropos-actions',                 anim: 'fade-up',    delay: 0   },

        /* ─ Parcours timeline ─ */
        { selector: '.tm-item:not(.tm-right)',           anim: 'fade-right', delay: 0,  stagger: true },
        { selector: '.tm-item.tm-right',                anim: 'fade-left',  delay: 0,  stagger: true },

        /* ─ Compétences ─ */
        { selector: '.comp-card',                       anim: 'fade-up',    delay: 0,  stagger: true },

        /* ─ Portfolio stats & filtres ─ */
        { selector: '.stat-box',                        anim: 'zoom-in',    delay: 0,  stagger: true },
        { selector: '.portfolio-filters',               anim: 'fade-up',    delay: 100 },

        /* ─ Stage ─ */
        { selector: '.stage-header',                    anim: 'fade-down',  delay: 0   },
        { selector: '.stage-availability-card',         anim: 'zoom-in',    delay: 0   },
        { selector: '.stage-card',                      anim: 'fade-up',    delay: 0,  stagger: true },
        { selector: '.stage-skills-target',             anim: 'fade-up',    delay: 0   },
        { selector: '.s-tag',                           anim: 'zoom-in',    delay: 0,  stagger: true },
        { selector: '.stage-cta',                       anim: 'fade-up',    delay: 0   },

        /* ─ Contact ─ */
        { selector: '.contact-v2-header',               anim: 'fade-right', delay: 0   },
        { selector: '.contact-v2-status',               anim: 'fade-right', delay: 80  },
        { selector: '.channel-card',                    anim: 'fade-right', delay: 0,  stagger: true },
        { selector: '.contact-v2-socials',              anim: 'fade-right', delay: 0   },
        { selector: '.contact-v2-form-card',            anim: 'fade-left',  delay: 0   },

        /* ─ Footer ─ */
        { selector: '.footer',                          anim: 'fade-up',    delay: 0   },
    ];

    /* ── Délai inter-éléments pour les groupes staggered ── */
    const STAGGER_STEP = 90; // ms entre chaque enfant

    /* ── Sélecteurs à ne JAMAIS animer (toujours visibles) ── */
    const EXCLUDED = ['.accueil', '.accueil *', '.header', '.navbar', '.theme-toggle'];

    /* ─────────────────────────────────────────────────────────
       1. Injecter la classe d'animation + le délai sur chaque élément
    ───────────────────────────────────────────────────────── */
    function prepare() {
        GROUPS.forEach(group => {
            const els = [...document.querySelectorAll(group.selector)];
            els.forEach((el, i) => {
                // Ignorer les éléments dans la section accueil
                if (el.closest('.accueil')) return;

                el.classList.add('sa-el', `sa-${group.anim}`);
                const totalDelay = (group.delay || 0) + (group.stagger ? i * STAGGER_STEP : 0);
                if (totalDelay > 0) {
                    el.style.transitionDelay = totalDelay + 'ms';
                }
            });
        });
    }

    /* ─────────────────────────────────────────────────────────
       2. Observer bidirectionnel
       isIntersecting = true  → classe .sa-revealed  (apparaît)
       isIntersecting = false → retire .sa-revealed  (disparaît)
    ───────────────────────────────────────────────────────── */
    function observe() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('sa-revealed');
                } else {
                    /* Bidirectionnel : on enlève la classe quand l'élément quitte le viewport */
                    entry.target.classList.remove('sa-revealed');
                    /* Remettre le délai pour la prochaine apparition */
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        document.querySelectorAll('.sa-el').forEach(el => observer.observe(el));
    }

    /* ─────────────────────────────────────────────────────────
       3. Init
    ───────────────────────────────────────────────────────── */
    function init() {
        prepare();
        observe();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();