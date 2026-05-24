/* ============================================================
   PORTFOLIO.JS — Agency Split-Panel
   Liste interactive ← → Vitrine cinématique
   Accordion fluide sur mobile
   Portfolio Ouattara Damiti
   ============================================================ */

(function () {
    'use strict';

    const PROJECTS = [
        { id:1,  src:'./image/image.png',    href:'https://gestion-finance.infinityfreeapp.com', title:'Gestion Financière',   description:'App complète avec tableau de bord admin, suivi des transactions, notifications temps réel et génération de reçus PDF.', technologies:['PHP','MySQL','Tailwind','JavaScript','API REST'], category:'fullstack', year:'2026',  icon:'bx bx-line-chart' },
        { id:2,  src:'./image/MIEL.jpeg',    href:'https://app-boutique-miel.netlify.app',        title:'BON MIEL',             description:'Boutique apicole avec catalogue, panier dynamique et commandes envoyées directement sur WhatsApp  sans serveur.',         technologies:['HTML5','CSS3','JavaScript','LocalStorage'],    category:'frontend',  year:'2024', status:'live', statusLabel: 'null',  icon:'bx bx-shopping-bag' },
        { id:3,  src:'./image/quiz.png',     href:'https://app-quiz-damel.netlify.app/',           title:'Quiz Interactif',      description:'Quiz avec chronomètre, score en temps réel et animations de feedback. 100% JavaScript natif, zéro dépendance.',            technologies:['HTML5','CSS3','Tailwind','JavaScript'],        category:'frontend',  year:'2024', status:'live', statusLabel: null,  icon:'bx bx-target-lock' },
        { id:4,  src:'./image/todolist.jpeg',href:'https://stellular-praline-df37c1.netlify.app/', title:'TODO List App',         description:'Gestionnaire de tâches React.js avec composants réutilisables, hooks, filtres dynamiques et persistance.',                 technologies:['React.js','Tailwind','Hooks','LocalStorage'],  category:'react',     year:'2024', status:'live', statusLabel: null,  icon:'bx bx-list-check' },
        { id:5,  src:'./image/montre.jpeg',  href:'https://app-montre.netlify.app',                title:'Horloge Temps Réel',   description:'Horloge analogique et digitale synchronisée. Aiguilles animées via CSS transforms et setInterval. Pure vanilla.',          technologies:['HTML5','CSS3','JavaScript','setInterval'],     category:'frontend',  year:'2024', status:'live', statusLabel: null,  icon:'bx bx-time-five' },
        { id:6,  src:'./image/BOUFFE.jpeg',  href:'https://damitielieericouattara-rgb.github.io/restaurant/', title:'Dabalie De Babi', description:'Plateforme street food ivoirienne : catalogue, panier, suivi de commande. Front JS + back PHP / MySQL.',          technologies:['HTML5','CSS3','JavaScript','PHP','MySQL'],     category:'fullstack', year:'2024', status:'dev',  statusLabel:'En cours',  icon:'bx bx-store-alt' },
        { id:7,  src:'./image/immobilier.jpeg', href:'https://immobilier-site.netlify.app/',       title:'Y Immobilier',          description:'Site vitrine immobilier : catalogue de biens animé, fiches détaillées avec prix et localisation, formulaire de demande.', technologies:['HTML5','CSS3','JavaScript','Responsive'],      category:'frontend',  year:'2025', status:'live', statusLabel: null,  icon:'bx bx-building-house' },
        { id:8,  src:'https://btp-site.netlify.app/assets/images/features-1.jpg', href:'https://btp-site.netlify.app', title:'Y BTP Immobilier', description:'Site vitrine BTP complet : planning, architecture, construction et aménagement intérieur. Galerie de projets filtrée.', technologies:['HTML5','CSS3','JavaScript','Responsive'], category:'frontend', year:'2025', status:'live', statusLabel: null, icon:'bx bx-building-house' },
        { id:9,  src:'https://location-vehicule.netlify.app/assets/header.png', href:'https://location-vehicule.netlify.app/', title:'Location de Véhicule', description:'Plateforme de location de voitures premium : catalogue filtrable, recherche par date et lieu, fiches détaillées avec tarifs.', technologies:['HTML5','CSS3','JavaScript','Responsive'], category:'frontend', year:'2025', status:'live', statusLabel: null, icon:'bx bx-car' },
        { id:10, src:'https://eightyeight-site.netlify.app/assets/gallery-1.png', href:'https://eightyeight-site.netlify.app/', title:'EightyEight Detailing', description:'Site vitrine automobile avec galerie interactive, sections services et présentation de marque pour une expérience fluide.', technologies:['HTML5','CSS3','JavaScript','Responsive'], category:'frontend', year:'2025', status:'live', statusLabel: null, icon:'bx bx-store' }
    ];

    const FILTERS = [
        { key:'all',       label:'Tous',       icon:'bx-grid-alt' },
        { key:'fullstack', label:'Full-Stack',  icon:'bx-layer' },
        { key:'react',     label:'React.js',   icon:'bxl-react' },
        { key:'frontend',  label:'Front-end',  icon:'bx-code-alt' }
    ];

    const CAT_LABELS = { frontend:'Front-end', fullstack:'Full-Stack', react:'React.js' };
    const CAT_COLORS = {
        frontend:  { bg:'rgba(0,238,255,0.12)',  border:'rgba(0,238,255,0.45)',  color:'#0ef' },
        fullstack: { bg:'rgba(139,92,246,0.12)', border:'rgba(139,92,246,0.45)', color:'#a78bfa' },
        react:     { bg:'rgba(97,218,251,0.12)', border:'rgba(97,218,251,0.45)', color:'#61dafb' }
    };
    const FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='260'%3E%3Crect width='100%25' height='100%25' fill='%23323946'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%230ef' font-size='18' font-family='sans-serif'%3EProjet%3C/text%3E%3C/svg%3E";

    let currentFilter = 'all';
    let currentIdx    = 0;
    let filtered      = [];

    const filtersEl = document.querySelector('.portfolio-filters');
    const wrapEl    = document.getElementById('wrap');
    if (!wrapEl) return;

    /* ── Utils ── */
    function isMobile() { return window.innerWidth <= 768; }

    function mkImg(src, alt) {
        const img = document.createElement('img');
        img.src = src; img.alt = alt; img.loading = 'lazy'; img.draggable = false;
        img.addEventListener('error', () => { img.src = FALLBACK; });
        return img;
    }

    function stDot(proj) {
        const live = proj.status === 'live';
        return `<span class="pf-st-dot ${live ? 'pf-st-dot--live' : 'pf-st-dot--dev'}"></span>
                <span style="color:${live ? '#22c55e' : '#fbbf24'};font-weight:700;font-size:1.2rem;">${proj.statusLabel}</span>`;
    }

    /* ══════════════════════════════════════════
       FILTRES
    ══════════════════════════════════════════ */
    function buildFilters() {
        if (!filtersEl) return;
        filtersEl.innerHTML = '';
        FILTERS.forEach(f => {
            const count = f.key === 'all' ? PROJECTS.length : PROJECTS.filter(p => p.category === f.key).length;
            const btn = document.createElement('button');
            btn.className = 'filter-btn' + (f.key === currentFilter ? ' active' : '');
            btn.dataset.filter = f.key;
            btn.innerHTML = `<i class='bx ${f.icon}'></i>${f.label}<span class="pf-filter-count">${count}</span>`;
            btn.addEventListener('click', () => {
                if (currentFilter === f.key) return;
                currentFilter = f.key; currentIdx = 0;
                buildFilters(); buildLayout();
            });
            filtersEl.appendChild(btn);
        });
    }

    /* ══════════════════════════════════════════
       LAYOUT
    ══════════════════════════════════════════ */
    function buildLayout() {
        wrapEl.innerHTML = '';
        filtered = currentFilter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === currentFilter);

        if (filtered.length === 0) {
            wrapEl.innerHTML = `<div style="text-align:center;padding:6rem 2rem;color:#555;font-size:1.8rem;"><i class='bx bx-folder-open' style="display:block;font-size:5rem;color:rgba(0,238,255,0.2);margin-bottom:1.5rem;"></i>Aucun projet dans cette catégorie.</div>`;
            return;
        }

        wrapEl.appendChild(buildSplitPanel());
        wrapEl.appendChild(buildAccordion());
        selectProject(0);
    }

    /* ══════════════════════════════════════════
       SPLIT PANEL
    ══════════════════════════════════════════ */
    function buildSplitPanel() {
        const split    = document.createElement('div');
        split.className = 'pf-split';

        /* Liste */
        const list = document.createElement('div');
        list.className = 'pf-split__list';

        filtered.forEach((proj, idx) => {
            const row = document.createElement('div');
            row.className = 'pf-project-row';
            row.setAttribute('role', 'button');
            row.setAttribute('tabindex', '0');
            row.dataset.idx = idx;

            const thumb = document.createElement('div');
            thumb.className = 'pf-row-thumb';
            thumb.appendChild(mkImg(proj.src, proj.title));

            const rowInner = document.createElement('div');
            rowInner.innerHTML = `<span class="pf-row-num">${String(idx+1).padStart(2,'0')}</span>`;
            row.appendChild(rowInner.firstChild);
            row.appendChild(thumb);

            const text = document.createElement('div');
            text.className = 'pf-row-text';
            text.innerHTML = `<div class="pf-row-title">${proj.title}</div><span class="pf-row-cat">${CAT_LABELS[proj.category]} · ${proj.year}</span>`;
            row.appendChild(text);

            const arrow = document.createElement('i');
            arrow.className = 'bx bx-right-arrow-alt pf-row-arrow';
            row.appendChild(arrow);

            row.addEventListener('click', () => selectProject(idx));
            row.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') { e.preventDefault(); selectProject(idx); } });
            list.appendChild(row);
        });

        /* Vitrine */
        const showcase = document.createElement('div');
        showcase.className = 'pf-split__showcase';

        filtered.forEach((proj, idx) => {
            const panel = document.createElement('div');
            panel.className = 'pf-showcase-panel';
            panel.dataset.idx = idx;

            const cat = CAT_COLORS[proj.category] || CAT_COLORS.frontend;
            const techs = proj.technologies.map(t => `<span class="pf-showcase-tech">${t}</span>`).join('');

            const imgWrap = document.createElement('div');
            imgWrap.className = 'pf-showcase-img';
            imgWrap.appendChild(mkImg(proj.src, proj.title));

            const badges = document.createElement('div');
            badges.className = 'pf-showcase-badges';
            badges.innerHTML = `
                <div class="pf-showcase-cat" style="background:${cat.bg};border-color:${cat.border};color:${cat.color};">
                    <i class='${proj.icon}'></i>${CAT_LABELS[proj.category]}
                </div>
                <div class="pf-showcase-status">
                    <span class="pf-st-dot ${proj.status==='live' ? 'pf-st-dot--live' : 'pf-st-dot--dev'}"></span>
                    <span style="color:${proj.status==='live' ? '#22c55e' : '#fbbf24'}">${proj.statusLabel}</span>
                </div>`;
            imgWrap.appendChild(badges);

            const info = document.createElement('div');
            info.className = 'pf-showcase-info';
            info.innerHTML = `
                <span class="pf-showcase-year">${proj.year}</span>
                <h3 class="pf-showcase-title">${proj.title}</h3>
                <p class="pf-showcase-desc">${proj.description}</p>
                <div class="pf-showcase-techs">${techs}</div>
                <a href="${proj.href}" target="_blank" rel="noopener noreferrer" class="pf-showcase-btn">
                    <i class='bx bx-link-external'></i>Voir le projet
                </a>`;

            panel.appendChild(imgWrap);
            panel.appendChild(info);
            showcase.appendChild(panel);
        });

        split.appendChild(list);
        split.appendChild(showcase);
        return split;
    }

    /* ══════════════════════════════════════════
       ACCORDION MOBILE
    ══════════════════════════════════════════ */
    function buildAccordion() {
        const acc = document.createElement('div');
        acc.className = 'pf-accordion';

        filtered.forEach((proj, idx) => {
            const item = document.createElement('div');
            item.className = 'pf-accordion-item';
            item.dataset.idx = idx;

            const header = document.createElement('button');
            header.className = 'pf-acc-header';
            header.setAttribute('aria-expanded', 'false');

            const thumb = document.createElement('div');
            thumb.className = 'pf-acc-thumb';
            thumb.appendChild(mkImg(proj.src, proj.title));

            const numSpan = document.createElement('span');
            numSpan.className = 'pf-acc-num';
            numSpan.textContent = String(idx+1).padStart(2,'0');

            const titleSpan = document.createElement('span');
            titleSpan.className = 'pf-acc-title';
            titleSpan.textContent = proj.title;

            const chevron = document.createElement('i');
            chevron.className = 'bx bx-chevron-down pf-acc-chevron';

            header.appendChild(numSpan);
            header.appendChild(thumb);
            header.appendChild(titleSpan);
            header.appendChild(chevron);

            const body = document.createElement('div');
            body.className = 'pf-acc-body';

            const accImgWrap = document.createElement('div');
            accImgWrap.className = 'pf-acc-img';
            accImgWrap.appendChild(mkImg(proj.src, proj.title));

            const techs = proj.technologies.map(t => `<span class="pf-acc-tech">${t}</span>`).join('');
            const content = document.createElement('div');
            content.className = 'pf-acc-content';
            content.innerHTML = `
                <div class="pf-acc-meta">
                    <div class="pf-acc-status">${stDot(proj)}</div>
                    <span class="pf-acc-year">${proj.year}</span>
                </div>
                <p class="pf-acc-desc">${proj.description}</p>
                <div class="pf-acc-techs">${techs}</div>
                <a href="${proj.href}" target="_blank" rel="noopener noreferrer" class="pf-acc-btn">
                    <i class='bx bx-link-external'></i>Voir le projet
                </a>`;

            body.appendChild(accImgWrap);
            body.appendChild(content);
            header.addEventListener('click', () => toggleAcc(idx));
            item.appendChild(header);
            item.appendChild(body);
            acc.appendChild(item);
        });

        return acc;
    }

    /* ── Sélection desktop ── */
    function selectProject(idx) {
        currentIdx = idx;
        document.querySelectorAll('.pf-project-row').forEach((r, i) => r.classList.toggle('active', i===idx));
        document.querySelectorAll('.pf-showcase-panel').forEach((p, i) => p.classList.toggle('active', i===idx));
        const activeRow = document.querySelector('.pf-project-row.active');
        if (activeRow) activeRow.scrollIntoView({ block:'nearest', behavior:'smooth' });
    }

    /* ── Toggle accordion mobile ── */
    function toggleAcc(idx) {
        document.querySelectorAll('.pf-accordion-item').forEach((item, i) => {
            const body   = item.querySelector('.pf-acc-body');
            const header = item.querySelector('.pf-acc-header');
            const open   = i === idx && !item.classList.contains('active');
            item.classList.toggle('active', open);
            header.setAttribute('aria-expanded', open ? 'true' : 'false');
            body.style.maxHeight = open ? body.scrollHeight + 'px' : '0';
            body.style.opacity   = open ? '1' : '0';
        });
    }

    /* ── Keyboard nav ── */
    document.addEventListener('keydown', e => {
        if (isMobile()) return;
        const pf = document.getElementById('portfolio');
        if (!pf) return;
        const r = pf.getBoundingClientRect();
        if (r.top >= window.innerHeight || r.bottom <= 0) return;
        if (e.key==='ArrowDown') { e.preventDefault(); selectProject(Math.min(currentIdx+1, filtered.length-1)); }
        if (e.key==='ArrowUp')   { e.preventDefault(); selectProject(Math.max(currentIdx-1, 0)); }
    });

    /* ── Resize accordion ── */
    let rt;
    window.addEventListener('resize', () => {
        clearTimeout(rt);
        rt = setTimeout(() => {
            document.querySelectorAll('.pf-accordion-item.active .pf-acc-body').forEach(b => { b.style.maxHeight = b.scrollHeight + 'px'; });
        }, 200);
    });

    /* ── Init ── */
    function init() { buildFilters(); buildLayout(); }
    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); }
    else { init(); }

})();