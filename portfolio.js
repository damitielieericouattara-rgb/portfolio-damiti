/* ============================================================
   PORTFOLIO.JS — Carrousel 3D Premium
   Hover overlay · Filtres · Drag · Auto-spin
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
            title: 'Gestion Financière',
            description: 'App complète avec tableau de bord admin, suivi des transactions, notifications temps réel et génération de reçus PDF.',
            technologies: ['PHP', 'MySQL', 'Tailwind', 'JavaScript', 'API REST'],
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
            description: 'Boutique apicole avec catalogue, panier dynamique et commandes envoyées directement sur WhatsApp — sans serveur.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage'],
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
            description: 'Quiz avec chronomètre, score en temps réel et animations de feedback. 100% JavaScript natif, zéro dépendance.',
            technologies: ['HTML5', 'CSS3', 'Tailwind', 'JavaScript'],
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
            description: 'Gestionnaire de tâches React.js avec composants réutilisables, hooks, filtres dynamiques et persistance.',
            technologies: ['React.js', 'Tailwind', 'Hooks', 'LocalStorage'],
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
            title: 'Horloge Temps Réel',
            description: 'Horloge analogique et digitale synchronisée. Aiguilles animées via CSS transforms et setInterval. Pure vanilla.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'setInterval'],
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
            description: 'Plateforme street food ivoirienne : catalogue, panier, suivi de commande. Front JS + back PHP / MySQL.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
            category: 'fullstack',
            year: '2024',
            status: 'En cours',
            icon: 'bx bx-store-alt',
            gradient: 'linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)'
        },
        {
            id: 7,
            src: './image/image (3).png',
            href: 'https://premier-portfolio.netlify.app/',
            title: 'Premier Portfolio',
            description: 'Mon tout premier portfolio responsive avec animations CSS soignées et navigation fluide entre sections.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive'],
            category: 'frontend',
            year: '2025',
            status: 'En ligne',
            icon: 'bx bx-user-circle',
            gradient: 'linear-gradient(135deg, #059669 0%, #064e3b 100%)'
        },
        {
            id: 8,
            src: './image/immobilier.jpeg',
            href: 'https://immobilier-site.netlify.app/',
            title: 'Y Immobilier',
            description: 'Site vitrine immobilier clé en main : catalogue de biens animé (villas, appartements, terrains), fiches détaillées avec prix et localisation, formulaire de demande de visite et offre commerciale intégrée. Conçu pour les agences abidjanaises.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive'],
            category: 'frontend',
            year: '2025',
            status: 'En ligne',
            icon: 'bx bx-building-house',
            gradient: 'linear-gradient(135deg, #0f4c75 0%, #1b6ca8 100%)'
        }
    ];

    /* ══════════════════════════════════════════
       FILTRES
    ══════════════════════════════════════════ */
    const FILTERS = [
        { key: 'all',       label: 'Tous',      icon: 'bx-grid-alt' },
        { key: 'fullstack', label: 'Full-Stack', icon: 'bx-layer' },
        { key: 'react',     label: 'React.js',  icon: 'bxl-react' },
        { key: 'frontend',  label: 'Front-end', icon: 'bx-code-alt' }
    ];

    const CAT_LABELS = { frontend: 'Front-end', fullstack: 'Full-Stack', react: 'React.js' };

    const CAT_COLORS = {
        frontend:  { bg: 'rgba(0,238,255,0.12)',  border: 'rgba(0,238,255,0.38)',  color: '#0ef' },
        fullstack: { bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.38)', color: '#a78bfa' },
        react:     { bg: 'rgba(97,218,251,0.12)', border: 'rgba(97,218,251,0.38)', color: '#61dafb' }
    };

    /* ══════════════════════════════════════════
       CONFIG
    ══════════════════════════════════════════ */
    const DRAG_SENSITIVITY = 0.45;
    const INERTIA_FRICTION = 0.92;
    const AUTOSPIN_SPEED   = 0.06;
    const IDLE_TIMEOUT     = 2500;
    const TILT_SENSITIVITY = 8;
    const MAX_TECHS        = 3;

    const FALLBACK = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="190" height="275"><rect width="100%25" height="100%25" fill="%23323946"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%230ef" font-size="14">Projet</text></svg>';

    /* ══════════════════════════════════════════
       DOM
    ══════════════════════════════════════════ */
    const wrap      = document.getElementById('wrap');
    const stage     = document.getElementById('stage');
    const wheel     = document.getElementById('wheel');
    const filtersEl = document.querySelector('.portfolio-filters');

    if (!wrap || !stage || !wheel) return;

    /* ── État ── */
    let currentFilter   = 'all';
    let rotation        = 0;
    let tilt            = 0;
    let targetTilt      = 0;
    let velocity        = 0;
    let isDragging      = false;
    let dragStartX      = 0;
    let initialRotation = 0;
    let lastInteraction = Date.now();
    let raf             = null;
    let currentRadius   = 320;

    /* ══════════════════════════════════════════
       FILTRES
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
            btn.innerHTML = `<i class='bx ${f.icon}'></i>${f.label}<span class="pf-filter-count">${count}</span>`;

            btn.addEventListener('click', () => {
                if (currentFilter === f.key) return;
                currentFilter = f.key;
                rotation = 0;
                velocity = 0;
                buildFilters();
                buildCarousel();
            });
            filtersEl.appendChild(btn);
        });
    }

    /* ══════════════════════════════════════════
       CONSTRUCTION CARROUSEL
    ══════════════════════════════════════════ */
    function buildCarousel() {
        const filtered = currentFilter === 'all'
            ? PROJECTS
            : PROJECTS.filter(p => p.category === currentFilter);

        const total = filtered.length;
        currentRadius = Math.max(240, Math.round(total * 50));

        wheel.innerHTML = '';

        filtered.forEach((proj, idx) => {
            const angle = idx * (360 / total);
            const cat   = CAT_COLORS[proj.category] || CAT_COLORS.frontend;

            /* ── Techno tags ── */
            const vis   = proj.technologies.slice(0, MAX_TECHS);
            const extra = proj.technologies.length - MAX_TECHS;
            const techsHTML = vis.map(t => `<span class="pf-tech">${t}</span>`).join('')
                + (extra > 0 ? `<span class="pf-tech pf-tech-more">+${extra}</span>` : '');

            /* ── Statut ── */
            const statusHTML = proj.status
                ? `<div class="pf-status ${proj.status === 'En ligne' ? 'pf-status-live' : 'pf-status-dev'}">
                       <span class="pf-status-dot"></span>${proj.status}
                   </div>`
                : '';

            /* ── Carte ── */
            const card = document.createElement('div');
            card.className = 'card';
            card.style.transform = `rotateY(${angle}deg) translateZ(${currentRadius}px)`;

            card.innerHTML = `
                <div class="card-inner">

                    <!-- Image plein fond -->
                    <div class="pf-card-img-wrap">
                        <img src="${proj.src}" alt="${proj.title}" draggable="false" loading="lazy"/>
                        <div class="pf-card-img-overlay" style="background:${proj.gradient};"></div>
                    </div>

                    <!-- Fondu bas (visible au repos) -->
                    <div class="pf-card-fade-bottom"></div>

                    <!-- Badge catégorie -->
                    <div class="pf-card-cat" style="background:${cat.bg};border-color:${cat.border};color:${cat.color};">
                        <i class='${proj.icon}'></i>${CAT_LABELS[proj.category]}
                    </div>

                    <!-- Badge statut -->
                    ${statusHTML}

                    <!-- Infos courtes au bas (repos) -->
                    <div class="pf-card-info-bar">
                        <div class="pf-card-year">${proj.year}</div>
                        <div class="pf-card-title">${proj.title}</div>
                    </div>

                    <!-- ✨ Panel qui glisse au hover -->
                    <div class="pf-card-hover-panel">
                        <div class="pf-panel-title">${proj.title}</div>
                        <p class="pf-panel-desc">${proj.description}</p>
                        <div class="pf-panel-techs">${techsHTML}</div>
                        <a
                            href="${proj.href}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="pf-panel-link"
                        >
                            <i class='bx bx-link-external'></i>
                            Voir le projet
                        </a>
                    </div>

                </div>
            `;

            /* Empêche le drag sur le bouton lien */
            const link = card.querySelector('.pf-panel-link');
            if (link) {
                link.addEventListener('mousedown', e => e.stopPropagation());
                link.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });
            }

            /* Fallback image */
            const img = card.querySelector('img');
            if (img) img.addEventListener('error', () => { img.src = FALLBACK; });

            wheel.appendChild(card);
        });

        resizeStage();
    }

    /* ══════════════════════════════════════════
       TAILLE STAGE
    ══════════════════════════════════════════ */
    function resizeStage() {
        const CARD_W = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) || 190;
        const CARD_H = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--card-h')) || 275;
        stage.style.width  = Math.max(CARD_W * 1.6, currentRadius * 2.4) + 'px';
        stage.style.height = Math.max(CARD_H * 1.6, currentRadius * 1.4) + 'px';
    }

    /* ══════════════════════════════════════════
       ANIMATION LOOP
    ══════════════════════════════════════════ */
    function animate() {
        if (!isDragging) {
            if (Math.abs(velocity) > 0.01) {
                rotation += velocity;
                velocity *= INERTIA_FRICTION;
            } else if (Date.now() - lastInteraction > IDLE_TIMEOUT) {
                rotation += AUTOSPIN_SPEED;
            }
        }
        tilt += (targetTilt - tilt) * 0.08;
        wheel.style.transform = `rotateX(${tilt}deg) rotateY(${rotation}deg)`;
        raf = requestAnimationFrame(animate);
    }

    /* ══════════════════════════════════════════
       INTERACTIONS
    ══════════════════════════════════════════ */
    function onMouseMove(e) {
        if (isDragging) return;
        const rect = wrap.getBoundingClientRect();
        targetTilt = -((e.clientY - rect.top) / rect.height - 0.5) * 2 * TILT_SENSITIVITY;
    }

    function dragStart(x) {
        lastInteraction = Date.now();
        isDragging = true;
        velocity = 0;
        dragStartX = x;
        initialRotation = rotation;
        wrap.classList.add('dragging');
    }

    function dragMove(x) {
        if (!isDragging) return;
        lastInteraction = Date.now();
        const delta  = x - dragStartX;
        const newRot = initialRotation + delta * DRAG_SENSITIVITY;
        velocity = newRot - rotation;
        rotation = newRot;
    }

    function dragEnd() {
        isDragging = false;
        lastInteraction = Date.now();
        wrap.classList.remove('dragging');
    }

    window.addEventListener('mousemove', onMouseMove);
    wrap.addEventListener('mousedown',  e => dragStart(e.clientX));
    wrap.addEventListener('mousemove',  e => dragMove(e.clientX));
    wrap.addEventListener('mouseup',    dragEnd);
    wrap.addEventListener('mouseleave', dragEnd);

    wrap.addEventListener('touchstart', e => { if (e.touches[0]) dragStart(e.touches[0].clientX); }, { passive: true });
    wrap.addEventListener('touchmove',  e => { if (e.touches[0]) dragMove(e.touches[0].clientX);  }, { passive: true });
    wrap.addEventListener('touchend',   dragEnd);

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
       HUD
    ══════════════════════════════════════════ */
    function buildHud() {
        const old = stage.querySelector('.hud');
        if (old) old.remove();
        const hud = document.createElement('div');
        hud.className = 'hud';
        // hud.innerHTML = `<i class='bx bx-move-horizontal'></i>Glissez ou scrollez pour pivoter`;
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

        /* Pause auto-spin au survol */
        wrap.addEventListener('mouseenter', () => { lastInteraction = Date.now() + 9999999; });
        wrap.addEventListener('mouseleave', () => { lastInteraction = Date.now(); });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();