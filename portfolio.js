/* ============================================
   PORTFOLIO MODERNE - JAVASCRIPT
   Gestion des filtres et animations
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // DONNÉES DES PROJETS
    // ============================================
    
    const PROJECTS = [
        { 
            src: './image/BOUFFE.jpeg', 
            href: 'https://damitielieericouattara-rgb.github.io/restaurant/',
            title: 'Site de Livraison de Nourriture',
            description: 'Plateforme de commande de repas en ligne avec interface moderne et responsive, design attractif et expérience utilisateur optimisée.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
            category: 'frontend',
            year: '2024'
        },
        { 
            src: './image/quiz.png', 
            href: './page/autres_pages/quiz de damel',
            title: 'Application Quiz Interactive',
            description: 'Quiz interactif avec système de score et feedback en temps réel. Interface engageante et questions dynamiques.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'DOM'],
            category: 'frontend',
            year: '2024'
        },
        { 
            src: './image/MIEL.jpeg', 
            href: 'https://damitielieericouattara-rgb.github.io/VENTE_MIEL/',
            title: 'Site Vitrine - Vente de Miel',
            description: 'Site e-commerce élégant pour la vente de miel naturels. Design moderne et navigation intuitive.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Animations'],
            category: 'frontend',
            year: '2024'
        },
        { 
            src: './image/montre.jpeg', 
            href: './page/autres_pages/MONTRE/index.html',
            title: 'Horloge',
            description: 'Nous affichons l\'heure actuelle avec un design épuré et moderne.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Grid'],
            category: 'frontend',
            year: '2024'
        },
        { 
            src: './image/todolist.jpeg', 
            href: 'https://stellular-praline-df37c1.netlify.app/',
            title: 'Todo List Manager',
            description: 'Application de gestion de tâches avec localStorage. Interface clean et fonctionnalités complètes pour la productivité.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage'],
            category: 'frontend',
            year: '2024'
        }
    ];

    // ============================================
    // VARIABLES GLOBALES
    // ============================================
    
    let currentProjects = [...PROJECTS];
    let portfolioSection = null;
    let portfolioGrid = null;

    // ============================================
    // INITIALISATION
    // ============================================
    
    function init() {
        portfolioSection = document.querySelector('.portfolio');
        if (!portfolioSection) {
            console.error('Section portfolio non trouvée');
            return;
        }

        buildPortfolioHTML();
        setupEventListeners();
        setupScrollAnimations();
    }

    // ============================================
    // CONSTRUCTION DU HTML
    // ============================================
    
    function buildPortfolioHTML() {
        // Guard anti-duplication : si la grille existe déjà, stop
        if (portfolioSection.querySelector('.portfolio-grid')) return;

        // Nettoyer le contenu existant (ancien carousel)
        const existingContent = portfolioSection.querySelector('.wrap, .carousel-3d-container, .horizontal-slider-container, .stack-container, .floating-cards-grid');
        if (existingContent) {
            existingContent.remove();
        }

        // Construire le nouveau HTML
        const html = `
            <div class="portfolio-grid">
                ${currentProjects.length > 0 
                    ? currentProjects.map((project, index) => createProjectCard(project, index)).join('')
                    : createEmptyState()
                }
            </div>

            <div class="portfolio-instructions">
                <p>
                    <i class='bx bx-mouse'></i> Survolez les cartes pour voir les effets d'animation<br>
                    <i class='bx bx-pointer'></i> Cliquez pour voir les projets en détail
                </p>
            </div>
        `;

        // Insérer après les filtres
        const filters = portfolioSection.querySelector('.portfolio-filters');
        if (filters) {
            filters.insertAdjacentHTML('afterend', html);
        } else {
            portfolioSection.insertAdjacentHTML('beforeend', html);
        }

        portfolioGrid = portfolioSection.querySelector('.portfolio-grid');
    }

    // ============================================
    // CRÉATION D'UNE CARTE PROJET
    // ============================================
    
    function createProjectCard(project, index) {
        return `
            <div class="project-card" data-category="${project.category}">
                <div class="project-image-wrapper">
                    <img src="${project.src}" alt="${project.title}" class="project-image" loading="lazy">
                    <span class="project-year-badge">${project.year}</span>
                    <span class="project-number-badge">${String(index + 1).padStart(2, '0')}</span>
                </div>
                
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    
                    <div class="project-tech-tags">
                        ${project.technologies.map(tech => `
                            <span class="tech-tag">${tech}</span>
                        `).join('')}
                    </div>
                    
                    <a href="${project.href}" target="_blank" class="project-link-btn">
                        <span>Voir le projet</span>
                        <i class='bx bx-right-arrow-alt'></i>
                    </a>
                </div>
            </div>
        `;
    }

    // ============================================
    // ÉTAT VIDE
    // ============================================
    
    function createEmptyState() {
        return `
            <div class="empty-state">
                <i class='bx bx-folder-open'></i>
                <h3>Aucun projet dans cette catégorie</h3>
                <p>Essayez de sélectionner une autre catégorie</p>
            </div>
        `;
    }

    // ============================================
    // FILTRAGE DES PROJETS
    // ============================================
    
    function filterProjects(category) {
        // Filtrer les projets
        if (category === 'all') {
            currentProjects = [...PROJECTS];
        } else {
            currentProjects = PROJECTS.filter(project => project.category === category);
        }

        // Animation de sortie
        portfolioGrid.style.opacity = '0';
        portfolioGrid.style.transform = 'translateY(20px)';

        setTimeout(() => {
            // Rebuild la grille
            portfolioGrid.innerHTML = currentProjects.length > 0 
                ? currentProjects.map((project, index) => createProjectCard(project, index)).join('')
                : createEmptyState();

            // Animation d'entrée
            requestAnimationFrame(() => {
                portfolioGrid.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                portfolioGrid.style.opacity = '1';
                portfolioGrid.style.transform = 'translateY(0)';
            });

            // Réappliquer les animations de scroll
            setupScrollAnimations();
        }, 300);
    }

    // ============================================
    // EVENT LISTENERS
    // ============================================
    
    function setupEventListeners() {
        // Filtres
        const filterButtons = document.querySelectorAll('.filter-btn');
        if (filterButtons.length > 0) {
            filterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Mettre à jour l'état actif
                    filterButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    // Filtrer les projets
                    const category = btn.getAttribute('data-filter');
                    filterProjects(category);

                    // Scroll vers la grille sur mobile
                    if (window.innerWidth < 768) {
                        portfolioGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            });
        }

        // Analytics - Track project clicks
        setupAnalytics();

        // Lazy loading des images
        setupLazyLoading();
    }

    // ============================================
    // ANIMATIONS AU SCROLL
    // ============================================
    
    function setupScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            }, observerOptions);

            const cards = portfolioGrid.querySelectorAll('.project-card');
            cards.forEach(card => {
                observer.observe(card);
            });
        }
    }

    // ============================================
    // LAZY LOADING DES IMAGES
    // ============================================
    
    function setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }

                        imageObserver.unobserve(img);
                    }
                });
            });

            const images = portfolioGrid.querySelectorAll('img[data-src]');
            images.forEach(img => imageObserver.observe(img));
        }
    }

    // ============================================
    // ANALYTICS (Optionnel)
    // ============================================
    
    function trackProjectClick(projectTitle) {
        console.log(`Projet cliqué: ${projectTitle}`);
        
        // Exemple avec Google Analytics (si implémenté)
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', 'project_click', {
        //         'project_name': projectTitle
        //     });
        // }
    }

    function setupAnalytics() {
        const projectLinks = portfolioGrid.querySelectorAll('.project-link-btn');
        projectLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const card = link.closest('.project-card');
                const title = card.querySelector('.project-title').textContent;
                trackProjectClick(title);
            });
        });
    }

    // ============================================
    // EFFET PARALLAX AU SCROLL (Optionnel)
    // ============================================
    
    function setupParallaxEffect() {
        let ticking = false;

        function updateParallax() {
            const cards = portfolioGrid.querySelectorAll('.project-card');
            const windowHeight = window.innerHeight;

            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const cardCenter = rect.top + rect.height / 2;
                const distanceFromCenter = cardCenter - windowHeight / 2;
                
                // Parallax subtil
                const parallaxValue = distanceFromCenter * 0.02;
                
                if (rect.top < windowHeight && rect.bottom > 0) {
                    card.style.transform = `translateY(${parallaxValue}px)`;
                }
            });

            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick);
        updateParallax();
    }

    // Activer le parallax (commenté par défaut pour la performance)
    // setupParallaxEffect();

    // ============================================
    // RESPONSIVE - Gestion du resize
    // ============================================
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculer si nécessaire
        }, 250);
    });

    // ============================================
    // INITIALISATION AU CHARGEMENT
    // ============================================
    
    // Init unique — on passe toujours par DOMContentLoaded ou immédiat
    if (!document.querySelector('.portfolio-grid')) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    }

    // ============================================
    // EXPOSITION D'UNE API PUBLIQUE (Optionnel)
    // ============================================
    
    window.portfolioModern = {
        filter: filterProjects,
        getProjects: () => [...currentProjects],
        getAllProjects: () => [...PROJECTS]
    };

})();