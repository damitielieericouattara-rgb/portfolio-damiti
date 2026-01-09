(function(){
  const FALLBACK = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="220"><rect width="100%" height="100%" fill="%23e2e8f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%234a5568" font-size="18">Image</text></svg>';

  // 🔗 Chaque image a maintenant une URL associée
  const DEFAULT_IMAGES = [
    { src: './image/BOUFFE.jpeg', href: './page/autres_pages/BOUFFE/index.html' },
    { src: './image/quiz.png', href: './page/autres_pages/quiz de damel' },
    { src: './image/MIEL.jpeg', href: './page/autres_pages/VENTE_MIEL/index.html' },
    { src: './image/montre.jpeg', href: './page/autres_pages/MONTRE/index.html' },
    // { src: './image/maketing.jpeg', href: './page/autres_pages/site marketing digitale/index.html' },
    { src: './image/todolist.jpeg', href: './page/autres_pages/todo-list/index.html' }
  ];

  const CARD_W = 180;
  const CARD_H = 240;
  const RADIUS = 240;
  const TILT_SENSITIVITY = 10;
  const DRAG_SENSITIVITY = 0.5;
  const INERTIA_FRICTION = 0.95;
  const AUTOSPIN_SPEED = 0.08;
  const IDLE_TIMEOUT = 2000;

  const wrap = document.getElementById('wrap');
  const stage = document.getElementById('stage');
  const wheel = document.getElementById('wheel');

  let rotation = 0;
  let tilt = 0;
  let targetTilt = 0;
  let velocity = 0;
  let isDragging = false;
  let dragStart = 0;
  let initialRotation = 0;
  let lastInteraction = Date.now();
  let raf = null;

  function buildCards(images, radius){
    wheel.innerHTML = '';
    images.forEach((item, idx) => {
      const angle = idx * 360 / images.length;
      const card = document.createElement('div');
      card.className = 'card';
      card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;

      const inner = document.createElement('div');
      inner.className = 'card-inner';

      // ✅ on met chaque image dans un lien
      const link = document.createElement('a');
      link.href = item.href;
      link.target = "_blank"; // ouvre dans un nouvel onglet
      link.rel = "noopener noreferrer";

      const img = document.createElement('img');
      img.src = item.src;
      img.width = CARD_W; 
      img.height = CARD_H;
      img.draggable = false;
      img.addEventListener('error', () => { img.src = FALLBACK; });

      link.appendChild(img);
      inner.appendChild(link);
      card.appendChild(inner);
      wheel.appendChild(card);
    });
  }


  function resizeStage(cardW, cardH, radius){
    const w = Math.max(cardW * 1.5, radius * 2.2);
    const h = Math.max(cardH * 1.8, radius * 1.5);
    stage.style.width = w + 'px';
    stage.style.height = h + 'px';
  }

  function animate(){
    if(!isDragging){
      if(Math.abs(velocity) > 0.01){
        rotation += velocity;
        velocity *= INERTIA_FRICTION;
      } else if(Date.now() - lastInteraction > IDLE_TIMEOUT){
        rotation += AUTOSPIN_SPEED;
      }
    }
    tilt += (targetTilt - tilt) * 0.1;
    wheel.style.transform = `rotateX(${tilt}deg) rotateY(${rotation}deg)`;
    raf = requestAnimationFrame(animate);
  }

  function onGlobalMouseMove(e){
    if(isDragging) return;
    lastInteraction = Date.now();
    const rect = wrap.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    const normalizedY = (mouseY / rect.height - 0.5) * 2;
    targetTilt = -normalizedY * TILT_SENSITIVITY;
  }

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

  window.addEventListener('mousemove', onGlobalMouseMove);
  wrap.addEventListener('mousedown', (e) => dragStartAt(e.clientX));
  wrap.addEventListener('mousemove', (e) => dragMoveAt(e.clientX));
  wrap.addEventListener('mouseup', dragEnd);
  wrap.addEventListener('mouseleave', dragEnd);

  wrap.addEventListener('touchstart', (e) => {
    if(e.touches && e.touches[0]) dragStartAt(e.touches[0].clientX);
  }, { passive: true });
  wrap.addEventListener('touchmove', (e) => {
    if(e.touches && e.touches[0]) dragMoveAt(e.touches[0].clientX);
  }, { passive: true });
  wrap.addEventListener('touchend', dragEnd);

  buildCards(DEFAULT_IMAGES, RADIUS);
  resizeStage(CARD_W, CARD_H, RADIUS);
  if(raf) cancelAnimationFrame(raf);
  raf = requestAnimationFrame(animate);
})();
