/* ============================================================
   PORTFOLIO — Ouattara Damiti Elie
   Bento Grid éditorial, cohérent avec le design system complet
   ============================================================ */

(function () {
    'use strict';

    // ── DONNÉES DES PROJETS ───────────────────────────────────
    const PROJECTS = [
        {
            id: 1,
            src: './image/BOUFFE.jpeg',
            href: 'https://damitielieericouattara-rgb.github.io/restaurant/',
            title: 'DABALIE DE BABI ( en cours de developpement )',
            subtitle: 'Plateforme de livraison · Full-Stack',
            description: 'Interface complète pour commander de la street food ivoirienne. Catalogue de plats, panier dynamique, suivi de commande et système de paiement mobile. Architecture JavaScript native côté front, PHP + MySQL côté back.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
            category: 'fullstack',
            year: '2024',
            status: 'En ligne',
            icon: 'bx bx-store-alt'
        },
        {
            id: 2,
            src: './image/quiz.png',
            href: './page/autres_pages/quiz de damel',
            title: 'Quiz Interactif',
            subtitle: 'Application dynamique · Front-end',
            description: 'Quiz avec chronomètre, score en temps réel, animations de feedback et tableau des résultats. 100% JavaScript natif, manipulation du DOM sans librairie externe.',
            technologies: ['HTML5','CSS3', 'TAILWIND', 'JavaScript', 'DOM API'],
            category: 'frontend',
            year: '2024',
            status: 'En ligne',
            icon: 'bx bx-target-lock'
        },
        {
            id: 3,
            src: './image/MIEL.jpeg',
            href: 'https://damitielieericouattara-rgb.github.io/VENTE_MIEL/',
            title: 'BON MIEL',
            subtitle: 'Boutique WhatsApp · Front-end',
            description: 'Boutique de produits apicoles avec catalogue, panier dynamique et persistance localStorage. La commande est formatée automatiquement et envoyée sur WhatsApp — aucun serveur requis.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage', 'WhatsApp API'],
            category: 'frontend',
            year: '2024',
            status: 'En ligne',
            icon: 'bx bx-shopping-bag'
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
            icon: 'bx bx-list-check'
        },
        {
            id: 5,
            src: './image/montre.jpeg',
            href: './page/autres_pages/MONTRE/index.html',
            title: 'AFFICHAGE TEMPS RÉEL',
            subtitle: 'Animation temps réel · Front-end',
            description: 'Horloge analogique et digitale en temps réel. Aiguilles animées via transformations CSS et synchronisées avec setInterval. Zéro librairie externe, code vanilla pur.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'setInterval'],
            category: 'frontend',
            year: '2024',
            status: 'En ligne',
            icon: 'bx bx-time-five'
        }
    ];

    // ── FILTRES ───────────────────────────────────────────────
    const FILTERS = [
        { key: 'all',       label: 'Tous',       icon: 'bx-grid-alt' },
        { key: 'fullstack', label: 'Full-Stack',  icon: 'bx-layer' },
        { key: 'react',     label: 'React.js',   icon: 'bxl-react' },
        { key: 'frontend',  label: 'Front-end',  icon: 'bx-code-alt' },
    ];

    const CAT_LABELS = {
        frontend:  'Front-end',
        fullstack: 'Full-Stack',
        react:     'React.js'
    };

    let currentFilter = 'all';
    let portfolioGrid = null;
    let portfolioSection = null;

    // ── INIT ──────────────────────────────────────────────────
    function init() {
        portfolioSection = document.querySelector('.portfolio');
        if (!portfolioSection) return;
        if (portfolioSection.querySelector('.pf-grid')) return;

        injectSectionHeader();
        injectFilters();
        injectGrid();
    }

    // ── EN-TÊTE ───────────────────────────────────────────────
    function injectSectionHeader() {
        const entete = portfolioSection.querySelector('.entete');
        if (entete) entete.classList.add('pf-entete-hidden');

        const header = document.createElement('div');
        header.className = 'pf-section-header';
        header.innerHTML = `
            <span class="section-tag">
                <i class='bx bx-briefcase'></i>
                Réalisations
            </span>
            <h2 class="section-title" style="margin-top:1rem;">
                Mes <span class="highlight">Projets</span>
            </h2>
        `;
        portfolioSection.insertAdjacentElement('afterbegin', header);
    }

    // ── FILTRES ───────────────────────────────────────────────
    function injectFilters() {
        const existing = portfolioSection.querySelector('.portfolio-filters');
        if (existing) existing.remove();

        const wrap = document.createElement('div');
        wrap.className = 'pf-filters';

        wrap.innerHTML = FILTERS.map(f => {
            const count = f.key === 'all'
                ? PROJECTS.length
                : PROJECTS.filter(p => p.category === f.key).length;
            return `
                <button class="filter-btn ${f.key === 'all' ? 'active' : ''}" data-filter="${f.key}">
                    <i class='bx ${f.icon}'></i>
                    <span class="pf-filter-label">${f.label}</span>
                    <em class="pf-filter-count">${count}</em>
                </button>`;
        }).join('');

        wrap.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                wrap.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                renderCards();
            });
        });

        const afterStats = portfolioSection.querySelector('.portfolio-stats');
        if (afterStats) afterStats.insertAdjacentElement('afterend', wrap);
        else portfolioSection.appendChild(wrap);
    }

    // ── GRILLE ────────────────────────────────────────────────
    function injectGrid() {
        portfolioGrid = document.createElement('div');
        portfolioGrid.className = 'pf-grid';
        portfolioSection.appendChild(portfolioGrid);
        renderCards();
    }

    function renderCards() {
        const isFiltered = currentFilter !== 'all';
        const filtered = isFiltered
            ? PROJECTS.filter(p => p.category === currentFilter)
            : PROJECTS;

        portfolioGrid.classList.toggle('pf-grid--filtered', isFiltered);

        portfolioGrid.style.opacity = '0';
        portfolioGrid.style.transform = 'translateY(18px)';

        setTimeout(() => {
            portfolioGrid.innerHTML = filtered.length
                ? filtered.map((p, i) => cardHTML(p, i, isFiltered)).join('')
                : `<div class="pf-empty">
                       <i class='bx bx-folder-open'></i>
                       <p>Aucun projet dans cette catégorie</p>
                   </div>`;

            requestAnimationFrame(() => {
                portfolioGrid.style.transition = 'opacity .45s ease, transform .45s ease';
                portfolioGrid.style.opacity = '1';
                portfolioGrid.style.transform = 'translateY(0)';
            });
        }, 260);
    }

    // ── CARTE ─────────────────────────────────────────────────
    function cardHTML(p, i) {
        const num = String(i + 1).padStart(2, '0');
        const tags = p.technologies.map(t => `<span class="pf-tech">${t}</span>`).join('');
        const catLabel = CAT_LABELS[p.category] || p.category;

        return `
        <article class="pf-card" data-num="${num}" style="animation-delay:${i * 80}ms">

            <div class="pf-card-visual">
                <img src="${p.src}" alt="${p.title}" loading="lazy" class="pf-card-img">

                <div class="pf-card-overlay">
                    <a href="${p.href}" target="_blank" rel="noopener noreferrer" class="pf-overlay-btn">
                        <i class='bx bx-link-external'></i>
                        Voir le projet
                    </a>
                </div>

                <div class="pf-img-badges">
                    <span class="pf-year-badge">${p.year}</span>
                    <span class="pf-status-badge">
                        <span class="pf-status-dot"></span>
                        ${p.status}
                    </span>
                </div>
            </div>

            <div class="pf-card-content">

                <div class="pf-card-meta">
                    <span class="pf-icon-box" aria-hidden="true"><i class='${p.icon}'></i></span>
                    <span class="pf-cat-badge ${p.category}">${catLabel}</span>
                </div>

                <p class="pf-card-subtitle">${p.subtitle}</p>
                <h3 class="pf-card-title">${p.title}</h3>
                <p class="pf-card-desc">${p.description}</p>

                <div class="pf-tech-tags">${tags}</div>

                <div class="pf-card-footer">
                    <a href="${p.href}" target="_blank" rel="noopener noreferrer" class="pf-cta">
                        <span>Voir le projet</span>
                        <i class='bx bx-right-arrow-alt'></i>
                    </a>
                </div>

            </div>
        </article>`;
    }

    // ── LAUNCH ────────────────────────────────────────────────
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.portfolioModern = { getProjects: () => [...PROJECTS] };

})();