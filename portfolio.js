(function(){
  const FALLBACK = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="260"><rect width="100%" height="100%" fill="%23e2e8f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%234a5568" font-size="18">Image</text></svg>';

  // 🔗 Projets avec descriptions et technologies
  const DEFAULT_IMAGES = [
    { 
      src: './image/BOUFFE.jpeg', 
      href: './page/autres_pages/BOUFFE/index.html',
      title: 'Site de Livraison de Nourriture',
      description: 'Plateforme de commande de repas en ligne avec interface moderne et responsive',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
      category: 'frontend',
      year: '2024'
    },
    { 
      src: './image/quiz.png', 
      href: './page/autres_pages/quiz de damel',
      title: 'Application Quiz Interactive',
      description: 'Quiz interactif avec système de score et feedback en temps réel',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'DOM Manipulation'],
      category: 'frontend',
      year: '2024'
    },
    { 
      src: './image/MIEL.jpeg', 
      href: './page/autres_pages/VENTE_MIEL/index.html',
      title: 'Site Vitrine - Vente de Miel',
      description: 'Site e-commerce élégant pour la vente de produits naturels',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Animations CSS'],
      category: 'frontend',
      year: '2024'
    },
    { 
      src: './image/montre.jpeg', 
      href: './page/autres_pages/MONTRE/index.html',
      title: 'Montres',
      description: 'App web moderne montrant le temps en temps réel avec design épuré',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Grid Layout'],
      category: 'frontend',
      year: '2024'
    },
    { 
      src: './image/todolist.jpeg', 
      href: './page/autres_pages/todo-list/index.html',
      title: 'Todo List Manager',
      description: 'Application de gestion de tâches avec localStorage',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage API'],
      category: 'frontend',
      year: '2024'
    }
  ];

  // ============================================
  // CONFIGURATION DU CAROUSEL - OPTIMISÉE
  // ============================================
  
  const getCardDimensions = () => {
    const style = getComputedStyle(document.documentElement);
    return {
      CARD_W: parseInt(style.getPropertyValue('--card-w')) || 200,
      CARD_H: parseInt(style.getPropertyValue('--card-h')) || 260,
      RADIUS: parseInt(style.getPropertyValue('--radius')) || 280
    };
  };

  let { CARD_W, CARD_H, RADIUS } = getCardDimensions();

  const TILT_SENSITIVITY = 12;
  const DRAG_SENSITIVITY = 0.6;
  const INERTIA_FRICTION = 0.94;
  const AUTOSPIN_SPEED = 0.1;
  const IDLE_TIMEOUT = 3000;

  const wrap = document.getElementById('wrap');
  const stage = document.getElementById('stage');
  const wheel = document.getElementById('wheel');

  if (!wrap || !stage || !wheel) {
    console.error('Carousel elements not found');
    return;
  }

  let rotation = 0;
  let tilt = 0;
  let targetTilt = 0;
  let velocity = 0;
  let isDragging = false;
  let dragStart = 0;
  let initialRotation = 0;
  let lastInteraction = Date.now();
  let raf = null;
  let currentProjects = [...DEFAULT_IMAGES];

  // ============================================
  // FIX CRITIQUE: Construction des cartes 3D
  // ============================================
  
  function buildCards(images, radius){
    wheel.innerHTML = '';
    
    if (images.length === 0) {
      const emptyMsg = document.createElement('div');
      emptyMsg.style.cssText = 'position: absolute; color: #888; font-size: 1.8rem; text-align: center;';
      emptyMsg.textContent = 'Aucun projet dans cette catégorie';
      wheel.appendChild(emptyMsg);
      return;
    }

    images.forEach((item, idx) => {
      const angle = idx * 360 / images.length;
      const card = document.createElement('div');
      card.className = 'card';
      
      // FIX CRITIQUE: Application correcte de la transformation 3D
      card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;

      const inner = document.createElement('div');
      inner.className = 'card-inner';

      // Container pour l'image et l'overlay
      const cardContent = document.createElement('div');
      cardContent.className = 'card-content';

      const link = document.createElement('a');
      link.href = item.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      const img = document.createElement('img');
      img.src = item.src;
      img.width = CARD_W; 
      img.height = CARD_H;
      img.draggable = false;
      img.alt = item.title;
      img.addEventListener('error', () => { 
        img.src = FALLBACK;
      });

      // Overlay avec informations
      const overlay = document.createElement('div');
      overlay.className = 'card-overlay';
      overlay.innerHTML = `
        <span class="project-year">${item.year}</span>
        <h3 class="project-title">${item.title}</h3>
        <p class="project-description">${item.description}</p>
        <div class="project-tech">
          ${item.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
        </div>
      `;

      link.appendChild(img);
      cardContent.appendChild(link);
      cardContent.appendChild(overlay);
      inner.appendChild(cardContent);
      card.appendChild(inner);
      wheel.appendChild(card);
    });
  }

  // ============================================
  // Redimensionnement du stage
  // ============================================
  
  function resizeStage(cardW, cardH, radius){
    const w = Math.max(cardW * 2, radius * 2.4);
    const h = Math.max(cardH * 2, radius * 1.6);
    stage.style.width = w + 'px';
    stage.style.height = h + 'px';
  }

  // ============================================
  // FIX CRITIQUE: Animation loop optimisée
  // ============================================
  
  function animate(){
    // Inertie et auto-rotation
    if(!isDragging){
      if(Math.abs(velocity) > 0.01){
        rotation += velocity;
        velocity *= INERTIA_FRICTION;
      } else if(Date.now() - lastInteraction > IDLE_TIMEOUT){
        rotation += AUTOSPIN_SPEED;
      }
    }
    
    // Smooth tilt
    tilt += (targetTilt - tilt) * 0.12;
    
    // FIX CRITIQUE: Application de la transformation 3D avec preserve-3d
    wheel.style.transform = `rotateX(${tilt}deg) rotateY(${rotation}deg)`;
    
    raf = requestAnimationFrame(animate);
  }

  // ============================================
  // Gestion du tilt au mouvement de la souris
  // ============================================
  
  function onGlobalMouseMove(e){
    if(isDragging) return;
    lastInteraction = Date.now();
    const rect = wrap.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    const normalizedY = (mouseY / rect.height - 0.5) * 2;
    targetTilt = -normalizedY * TILT_SENSITIVITY;
  }

  // ============================================
  // Gestion du drag - OPTIMISÉE
  // ============================================
  
  function dragStartAt(x){
    lastInteraction = Date.now();
    isDragging = true;
    velocity = 0;
    dragStart = x;
    initialRotation = rotation;
    wrap.classList.add('dragging');
  }
  
  function dragMoveAt(x){
    if(!isDragging) return;
    lastInteraction = Date.now();
    const deltaX = x - dragStart;
    const newRotation = initialRotation + deltaX * DRAG_SENSITIVITY;
    velocity = newRotation - rotation;
    rotation = newRotation;
  }
  
  function dragEnd(){
    isDragging = false;
    lastInteraction = Date.now();
    wrap.classList.remove('dragging');
  }

  // ============================================
  // FIX CRITIQUE: Fonction de filtrage améliorée
  // ============================================
  
  function filterProjects(category) {
    // Arrêter l'animation en cours
    if(raf) cancelAnimationFrame(raf);
    
    // Filtrer les projets
    if (category === 'all') {
      currentProjects = [...DEFAULT_IMAGES];
    } else {
      currentProjects = DEFAULT_IMAGES.filter(project => project.category === category);
    }
    
    // Mettre à jour les dimensions
    const dims = getCardDimensions();
    CARD_W = dims.CARD_W;
    CARD_H = dims.CARD_H;
    RADIUS = dims.RADIUS;
    
    // Rebuild le carousel avec les projets filtrés
    buildCards(currentProjects, RADIUS);
    resizeStage(CARD_W, CARD_H, RADIUS);
    
    // Reset rotation pour une animation fluide
    rotation = 0;
    velocity = 0;
    tilt = 0;
    targetTilt = 0;
    
    // Redémarrer l'animation
    raf = requestAnimationFrame(animate);
  }

  // ============================================
  // Event listeners pour les boutons de filtre
  // ============================================
  
  document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
      filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          // Remove active class from all buttons
          filterButtons.forEach(b => b.classList.remove('active'));
          // Add active class to clicked button
          btn.classList.add('active');
          // Filter projects
          const category = btn.getAttribute('data-filter');
          filterProjects(category);
        });
      });
    }
  });

  // ============================================
  // Event listeners pour le drag (souris)
  // ============================================
  
  window.addEventListener('mousemove', onGlobalMouseMove);
  wrap.addEventListener('mousedown', (e) => {
    e.preventDefault();
    dragStartAt(e.clientX);
  });
  wrap.addEventListener('mousemove', (e) => dragMoveAt(e.clientX));
  wrap.addEventListener('mouseup', dragEnd);
  wrap.addEventListener('mouseleave', dragEnd);

  // ============================================
  // FIX CRITIQUE: Event listeners pour mobile (touch)
  // ============================================
  
  wrap.addEventListener('touchstart', (e) => {
    if(e.touches && e.touches[0]) {
      e.preventDefault();
      dragStartAt(e.touches[0].clientX);
    }
  }, { passive: false });
  
  wrap.addEventListener('touchmove', (e) => {
    if(e.touches && e.touches[0]) {
      e.preventDefault();
      dragMoveAt(e.touches[0].clientX);
    }
  }, { passive: false });
  
  wrap.addEventListener('touchend', (e) => {
    e.preventDefault();
    dragEnd();
  }, { passive: false });

  // ============================================
  // Gestion du resize responsive
  // ============================================
  
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const dims = getCardDimensions();
      CARD_W = dims.CARD_W;
      CARD_H = dims.CARD_H;
      RADIUS = dims.RADIUS;
      
      if(raf) cancelAnimationFrame(raf);
      buildCards(currentProjects, RADIUS);
      resizeStage(CARD_W, CARD_H, RADIUS);
      raf = requestAnimationFrame(animate);
    }, 250);
  });

  // ============================================
  // INITIALISATION DU CAROUSEL
  // ============================================
  
  buildCards(DEFAULT_IMAGES, RADIUS);
  resizeStage(CARD_W, CARD_H, RADIUS);
  
  if(raf) cancelAnimationFrame(raf);
  raf = requestAnimationFrame(animate);

  // ============================================
  // Cleanup on page unload
  // ============================================
  
  window.addEventListener('beforeunload', () => {
    if(raf) cancelAnimationFrame(raf);
  });
})();