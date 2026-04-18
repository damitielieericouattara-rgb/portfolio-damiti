/* ============================================================
   PORTFOLIO.JS — Carrousel 3D Premium avec descriptions
   Filtre dynamique · Drag · Auto-spin · Inertia
   Portfolio Ouattara Damiti
   ============================================================ */

(function () {
    'use strict';

    /* ══════════════════════════════════════════
       DONNÉES PROJETS
    ══════════════════════════════════════════ */
    const PROJECTS = [
        {
            id: 1,
            src: './image/image.png',
            href: 'https://gestion-finance.infinityfreeapp.com',
            title: 'App Gestion Financière',
            subtitle: 'Tableau de bord · Full-Stack',
            description: 'Application web complète de gestion financière avec tableau de bord admin, suivi des transactions, gestion des utilisateurs, historique du solde global, notifications en temps réel et génération de reçus PDF.',
            technologies: ['PHP', 'MySQL', 'Tailwind CSS', 'JavaScript', 'PHPMailer', 'TCPDF', 'API REST'],
            category: 'fullstack',
            year: '2026',
            status: 'En ligne',
            icon: 'bx bx-line-chart',
            gradient: 'linear-gradient(135deg, #0891b2 0%, #0e4f6e 100%)'
        },
        {
            id: 2,
            src: './image/MIEL.jpeg',
            href: 'https://app-boutique-miel.netlify.app',
            title: 'BON MIEL',
            subtitle: 'Boutique WhatsApp · Front-end',
            description: 'Boutique de produits apicoles avec catalogue, panier dynamique et persistance localStorage. La commande est formatée automatiquement et envoyée sur WhatsApp — aucun serveur requis.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage', 'WhatsApp API'],
            category: 'frontend',
            year: '2024',
            status: 'En ligne',
            icon: 'bx bx-shopping-bag',
            gradient: 'linear-gradient(135deg, #d97706 0%, #92400e 100%)'
        },
        {
            id: 3,
            src: './image/quiz.png',
            href: 'https://app-quiz-damel.netlify.app/',
            title: 'Quiz Interactif',
            subtitle: 'Application dynamique · Front-end',
            description: 'Quiz avec chronomètre, score en temps réel, animations de feedback et tableau des résultats. 100% JavaScript natif, manipulation du DOM sans librairie externe.',
            technologies: ['HTML5', 'CSS3', 'Tailwind CSS', 'JavaScript', 'DOM API'],
            category: 'frontend',
            year: '2024',
            status: 'En ligne',
            icon: 'bx bx-target-lock',
            gradient: 'linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)'
        },
        {
            id: 4,
            src: './image/todolist.jpeg',
            href: 'https://stellular-praline-df37c1.netlify.app/',
            title: 'TODO List App',
            subtitle: 'Gestionnaire de tâches · React.js',
            description: 'Application de gestion de tâches avec React.js et Tailwind CSS. Composants réutilisables, état géré avec useState/useEffect, filtres dynamiques et persistance localStorage.',
            technologies: ['React.js', 'Tailwind CSS', 'Hooks', 'LocalStorage'],
            category: 'react',
            year: '2024',
            status: 'En ligne',
            icon: 'bx bx-list-check',
            gradient: 'linear-gradient(135deg, #0284c7 0%, #1e3a5f 100%)'
        },
        {
            id: 5,
            src: './image/montre.jpeg',
            href: 'https://app-montre.netlify.app',
            title: 'Affichage Temps Réel',
            subtitle: 'Animation temps réel · Front-end',
            description: 'Horloge analogique et digitale en temps réel. Aiguilles animées via transformations CSS et synchronisées avec setInterval. Zéro librairie externe, code vanilla pur.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'setInterval', 'CSS Transforms'],
            category: 'frontend',
            year: '2024',
            status: 'En ligne',
            icon: 'bx bx-time-five',
            gradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
        },
        {
            id: 6,
            src: './image/BOUFFE.jpeg',
            href: 'https://damitielieericouattara-rgb.github.io/restaurant/',
            title: 'Dabalie De Babi',
            subtitle: 'Plateforme de livraison · Full-Stack',
            description: 'Interface complète pour commander de la street food ivoirienne. Catalogue de plats, panier dynamique, suivi de commande et système de paiement mobile. Architecture JS côté front, PHP + MySQL côté back.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
            category: 'fullstack',
            year: '2024',
            status: 'En développement',
            icon: 'bx bx-store-alt',
            gradient: 'linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)'
        },
        {
            id: 7,
            src: './image/image (3).png',
            href: 'https://premier-portfolio.netlify.app/',
            title: 'Premier Portfolio',
            subtitle: 'Portfolio personnel · Front-end',
            description: 'Mon tout premier portfolio personnel — interface responsive avec animations CSS, typographie soignée et navigation fluide. Première version de mon identité web en ligne.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Animations CSS'],
            category: 'frontend',
            year: '2025',
            status: 'En ligne',
            icon: 'bx bx-user-circle',
            gradient: 'linear-gradient(135deg, #059669 0%, #064e3b 100%)'
        }
    ];

    /* ══════════════════════════════════════════
       FILTRES
    ══════════════════════════════════════════ */
    const FILTERS = [
        { key: 'all',       label: 'Tous',       icon: 'bx-grid-alt' },
        { key: 'fullstack', label: 'Full-Stack',  icon: 'bx-layer' },
        { key: 'react',     label: 'React.js',    icon: 'bxl-react' },
        { key: 'frontend',  label: 'Front-end',   icon: 'bx-code-alt' }
    ];

    const CAT_LABELS = {
        frontend:  'Front-end',
        fullstack: 'Full-Stack',
        react:     'React.js'
    };

    const CAT_COLORS = {
        frontend:  { bg: 'rgba(0,238,255,0.12)',  border: 'rgba(0,238,255,0.35)',  color: '#0ef' },
        fullstack: { bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.35)', color: '#a78bfa' },
        react:     { bg: 'rgba(97,218,251,0.12)', border: 'rgba(97,218,251,0.35)', color: '#61dafb' }
    };

    /* ══════════════════════════════════════════
       CONFIGURATION
    ══════════════════════════════════════════ */
    const CARD_W            = 240;
    const CARD_H            = 400;
    const TILT_SENSITIVITY  = 8;
    const DRAG_SENSITIVITY  = 0.45;
    const INERTIA_FRICTION  = 0.92;
    const AUTOSPIN_SPEED    = 0.06;
    const IDLE_TIMEOUT      = 2500;

    const FALLBACK = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="240" height="400"><rect width="100%25" height="100%25" fill="%23323946"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%230ef" font-size="16" font-family="sans-serif">Projet</text></svg>';

    /* ══════════════════════════════════════════
       ÉLÉMENTS DOM
    ══════════════════════════════════════════ */
    const wrap      = document.getElementById('wrap');
    const stage     = document.getElementById('stage');
    const wheel     = document.getElementById('wheel');
    const filtersEl = document.querySelector('.portfolio-filters');

    if (!wrap || !stage || !wheel) return;

    /* ── État ── */
    let currentFilter  = 'all';
    let filteredProjects = [...PROJECTS];
    let rotation       = 0;
    let tilt           = 0;
    let targetTilt     = 0;
    let velocity       = 0;
    let isDragging     = false;
    let dragStartX     = 0;
    let initialRotation = 0;
    let lastInteraction = Date.now();
    let raf            = null;
    let currentRadius  = 350;

    /* ══════════════════════════════════════════
       CONSTRUCTION DES FILTRES
    ══════════════════════════════════════════ */
    function buildFilters() {
        if (!filtersEl) return;
        filtersEl.innerHTML = '';

        FILTERS.forEach(f => {
            const count = f.key === 'all'
                ? PROJECTS.length
                : PROJECTS.filter(p => p.category === f.key).length;

            const btn = document.createElement('button');
            btn.className = 'filter-btn' + (f.key === currentFilter ? ' active' : '');
            btn.dataset.filter = f.key;
            btn.innerHTML = `
                <i class='bx ${f.icon}'></i>
                ${f.label}
                <span class="pf-filter-count">${count}</span>
            `;
            btn.addEventListener('click', () => {
                if (currentFilter === f.key) return;
                currentFilter = f.key;
                buildFilters();
                buildCarousel();
                rotation = 0;
                velocity = 0;
            });
            filtersEl.appendChild(btn);
        });
    }

    /* ══════════════════════════════════════════
       CONSTRUCTION DES CARTES
    ══════════════════════════════════════════ */
    function buildCarousel() {
        filteredProjects = currentFilter === 'all'
            ? PROJECTS
            : PROJECTS.filter(p => p.category === currentFilter);

        const total = filteredProjects.length;
        /* Rayon adaptatif selon le nombre de cartes */
        currentRadius = Math.max(260, Math.round(total * 52));

        wheel.innerHTML = '';

        filteredProjects.forEach((proj, idx) => {
            const angle = idx * (360 / total);

            /* ── Wrapper carte ── */
            const card = document.createElement('div');
            card.className = 'card';
            card.style.transform = `rotateY(${angle}deg) translateZ(${currentRadius}px)`;

            /* ── Badges techno (max 4 + "…") ── */
            const MAX_TECHS = 3;
            const visibleTechs = proj.technologies.slice(0, MAX_TECHS);
            const extraCount  = proj.technologies.length - MAX_TECHS;
            const techsHTML   = visibleTechs.map(t =>
                `<span class="pf-tech">${t}</span>`
            ).join('') + (extraCount > 0 ? `<span class="pf-tech pf-tech-more">+${extraCount}</span>` : '');

            /* ── Couleur catégorie ── */
            const cat = CAT_COLORS[proj.category] || CAT_COLORS.frontend;

            /* ── Statut badge ── */
            const statusHTML = proj.status
                ? `<div class="pf-status ${proj.status === 'En ligne' ? 'pf-status-live' : 'pf-status-dev'}">
                       <span class="pf-status-dot"></span>${proj.status}
                   </div>`
                : '';

            card.innerHTML = `
                <div class="card-inner">

                    <!-- Image + overlay gradient -->
                    <div class="pf-card-img-wrap">
                        <img
                            src="${proj.src}"
                            alt="${proj.title}"
                            draggable="false"
                            loading="lazy"
                        />
                        <div class="pf-card-img-overlay" style="background:${proj.gradient};"></div>

                        <!-- Catégorie -->
                        <div class="pf-card-cat" style="background:${cat.bg};border-color:${cat.border};color:${cat.color};">
                            <i class='${proj.icon}'></i>
                            ${CAT_LABELS[proj.category]}
                        </div>

                        <!-- Statut -->
                        ${statusHTML}
                    </div>

                    <!-- Contenu texte -->
                    <div class="pf-card-body">
                        <div class="pf-card-year">${proj.year}</div>
                        <h3 class="pf-card-title">${proj.title}</h3>
                        <p class="pf-card-desc">${proj.description}</p>

                        <div class="pf-card-techs">${techsHTML}</div>

                        <a
                            href="${proj.href}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="pf-card-link"
                            title="Voir ${proj.title}"
                        >
                            <i class='bx bx-link-external'></i>
                            Voir le projet
                        </a>
                    </div>

                </div>
            `;

            /* Empêche le clic sur le lien de déclencher le drag */
            const link = card.querySelector('.pf-card-link');
            if (link) {
                link.addEventListener('mousedown', e => e.stopPropagation());
                link.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });
            }

            /* Erreur image → fallback */
            const img = card.querySelector('img');
            if (img) img.addEventListener('error', () => { img.src = FALLBACK; });

            wheel.appendChild(card);
        });

        resizeStage();
    }

    /* ══════════════════════════════════════════
       RESIZE STAGE
    ══════════════════════════════════════════ */
    function resizeStage() {
        const w = Math.max(CARD_W * 1.6, currentRadius * 2.4);
        const h = Math.max(CARD_H * 1.6, currentRadius * 1.4);
        stage.style.width  = w + 'px';
        stage.style.height = h + 'px';
    }

    /* ══════════════════════════════════════════
       BOUCLE D'ANIMATION
    ══════════════════════════════════════════ */
    function animate() {
        if (!isDragging) {
            if (Math.abs(velocity) > 0.01) {
                rotation  += velocity;
                velocity  *= INERTIA_FRICTION;
            } else if (Date.now() - lastInteraction > IDLE_TIMEOUT) {
                rotation  += AUTOSPIN_SPEED;
            }
        }

        /* Tilt fluide (suivi de la souris) */
        tilt += (targetTilt - tilt) * 0.08;

        wheel.style.transform = `rotateX(${tilt}deg) rotateY(${rotation}deg)`;
        raf = requestAnimationFrame(animate);
    }

    /* ══════════════════════════════════════════
       INTERACTIONS SOURIS & TOUCH
    ══════════════════════════════════════════ */

    /* Tilt au mouvement global */
    function onMouseMove(e) {
        if (isDragging) return;
        const rect = wrap.getBoundingClientRect();
        const normalizedY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        targetTilt = -normalizedY * TILT_SENSITIVITY;
    }

    function dragStart(x) {
        lastInteraction = Date.now();
        isDragging      = true;
        velocity        = 0;
        dragStartX      = x;
        initialRotation = rotation;
        wrap.classList.add('dragging');
    }

    function dragMove(x) {
        if (!isDragging) return;
        lastInteraction = Date.now();
        const delta     = x - dragStartX;
        const newRot    = initialRotation + delta * DRAG_SENSITIVITY;
        velocity        = newRot - rotation;
        rotation        = newRot;
    }

    function dragEnd() {
        isDragging      = false;
        lastInteraction = Date.now();
        wrap.classList.remove('dragging');
    }

    /* Souris */
    window.addEventListener('mousemove', onMouseMove);
    wrap.addEventListener('mousedown',  e => dragStart(e.clientX));
    wrap.addEventListener('mousemove',  e => dragMove(e.clientX));
    wrap.addEventListener('mouseup',    dragEnd);
    wrap.addEventListener('mouseleave', dragEnd);

    /* Touch */
    wrap.addEventListener('touchstart', e => {
        if (e.touches[0]) dragStart(e.touches[0].clientX);
    }, { passive: true });
    wrap.addEventListener('touchmove', e => {
        if (e.touches[0]) dragMove(e.touches[0].clientX);
    }, { passive: true });
    wrap.addEventListener('touchend', dragEnd);

    /* Molette de souris */
    let wheelCooldown = false;
    wrap.addEventListener('wheel', e => {
        e.preventDefault();
        if (wheelCooldown) return;
        wheelCooldown = true;
        velocity += e.deltaY > 0 ? 2 : -2;
        lastInteraction = Date.now();
        setTimeout(() => { wheelCooldown = false; }, 300);
    }, { passive: false });

    /* ══════════════════════════════════════════
       HUD — indicateur de navigation
    ══════════════════════════════════════════ */
    function buildHud() {
        /* Supprime ancien HUD si présent */
        const existing = stage.querySelector('.hud');
        if (existing) existing.remove();

        const hud = document.createElement('div');
        hud.className = 'hud';
        hud.innerHTML = `
            <i class='bx bx-move-horizontal'></i>
            Glissez pour explorer · Scroll pour pivoter
        `;
        stage.appendChild(hud);
    }

    /* ══════════════════════════════════════════
       INIT
    ══════════════════════════════════════════ */
    function init() {
        buildFilters();
        buildCarousel();
        buildHud();

        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(animate);

        /* Pause auto-spin quand la souris entre, reprise à la sortie */
        wrap.addEventListener('mouseenter', () => { lastInteraction = Date.now() + 999999; });
        wrap.addEventListener('mouseleave', () => { lastInteraction  = Date.now(); });
    }

    /* Lancer après le DOM */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();