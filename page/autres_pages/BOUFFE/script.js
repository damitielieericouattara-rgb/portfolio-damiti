/* =========================================
   STREETBITE v2 — APP.JS INNOVATIONS
   ========================================= */

// ===== DATABASE =====
const DB = {
  users: [{ id:1,name:"Demo User",email:"demo@streetbite.com",password:"demo123",avatar:"D",points:350,orders:[] }],
  menu: [
    {id:1,name:"StreetBurger Classic",cat:"Burgers",emoji:"🍔",price:3500,rating:4.9,reviews:248,desc:"Double steak haché, cheddar fondu, sauce maison artisanale",badge:"Best seller",popular:true,isNew:false,tags:["viande","fromage","signature"],extras:["Extra fromage +500","Sauce BBQ +200","Bacon +800","Double steak +1000"],calories:650,time:"12 min"},
    {id:2,name:"Poulet Braisé Royal",cat:"Poulet",emoji:"🍗",price:4500,rating:4.8,reviews:186,desc:"Quart de poulet braisé avec attiéké frais et sauce piment maison",badge:"Best seller",popular:true,isNew:false,tags:["poulet","local","attiéké"],extras:["Extra attiéké +300","Double sauce +200","Plantain frit +500"],calories:720,time:"18 min"},
    {id:3,name:"Aloko Spécial",cat:"Local",emoji:"🌍",price:1500,rating:4.7,reviews:320,desc:"Aloko croustillant avec sauce tomate pimentée, spécialité maison",badge:null,popular:true,isNew:false,tags:["local","végétarien","plantain"],extras:["Sauce extra +150","Poisson grillé +1500"],calories:320,time:"8 min"},
    {id:4,name:"Wrap Frais du Jour",cat:"Wraps",emoji:"🌯",price:3000,rating:4.6,reviews:134,desc:"Tortilla fraîche, légumes grillés, avocat, sauce yaourt citronnée",badge:"New",popular:false,isNew:true,tags:["frais","légumes","healthy"],extras:["Extra avocat +500","Poulet grillé +800","Sauce piquante +150"],calories:420,time:"10 min"},
    {id:5,name:"Frites Maison XL",cat:"Accompagnements",emoji:"🍟",price:1000,rating:4.5,reviews:412,desc:"Frites dorées croustillantes à l'assaisonnement secret de la maison",badge:null,popular:true,isNew:false,tags:["frites","végétarien","snack"],extras:["Sauce ketchup +100","Sauce mayo +100","Fromage fondu +400"],calories:380,time:"7 min"},
    {id:6,name:"Thiéboudienne Premium",cat:"Local",emoji:"🍚",price:5000,rating:4.9,reviews:178,desc:"Riz au poisson sénégalais traditionnel, légumes de saison, sauce tomate",badge:"Chef's choice",popular:true,isNew:false,tags:["riz","poisson","local","sénégal"],extras:["Extra poisson +1500","Sauce bissap +300"],calories:850,time:"25 min"},
    {id:7,name:"Cheese Dog Ivoirien",cat:"Burgers",emoji:"🌭",price:2500,rating:4.4,reviews:97,desc:"Hot-dog artisanal façon ivoirienne, fromage fondu, oignons caramélisés",badge:null,popular:false,isNew:false,tags:["viande","fromage","hot-dog"],extras:["Extra fromage +400","Oignons caramélisés +200"],calories:540,time:"10 min"},
    {id:8,name:"Jus Bissap Frais",cat:"Boissons",emoji:"🧃",price:800,rating:4.8,reviews:503,desc:"Jus d'hibiscus maison, sucré naturellement avec du gingembre",badge:"Populaire",popular:true,isNew:false,tags:["boisson","local","frais","sans alcool"],extras:["Glaçons +0","Grande taille +300"],calories:80,time:"2 min"},
    {id:9,name:"Poulet Frit Épicé",cat:"Poulet",emoji:"🍗",price:4000,rating:4.7,reviews:221,desc:"Poulet croustillant mariné 24h, mélange d'épices africaines secrètes",badge:"Hot 🌶️",popular:false,isNew:true,tags:["poulet","épicé","croustillant"],extras:["Sauce piri-piri +200","Frites +1000"],calories:680,time:"16 min"},
    {id:10,name:"Pizza Locale",cat:"Pizzas",emoji:"🍕",price:6000,rating:4.6,reviews:89,desc:"Base tomate maison, mozzarella fondante, garnitures généreuses africaines",badge:"New",popular:false,isNew:true,tags:["fromage","pizza","partage"],extras:["Extra fromage +500","Chorizo +800","Grande taille +1500"],calories:920,time:"22 min"},
    {id:11,name:"Salade Fraîcheur",cat:"Salades",emoji:"🥗",price:2000,rating:4.3,reviews:67,desc:"Légumes frais du marché, avocat mûr, vinaigrette citronnée maison",badge:null,popular:false,isNew:false,tags:["frais","végétarien","léger","healthy"],extras:["Poulet grillé +800","Avocat extra +500"],calories:280,time:"6 min"},
    {id:12,name:"Smoothie Tropical",cat:"Boissons",emoji:"🥤",price:1200,rating:4.7,reviews:145,desc:"Mangue, ananas, banane, lait de coco — pure Côte d'Ivoire",badge:null,popular:false,isNew:false,tags:["boisson","frais","tropical","vitamines"],extras:["Gingembre +100","Protéine +500"],calories:160,time:"3 min"},
  ],
  reviews: [
    {id:1,name:"Marie K.",text:"Service impeccable ! Le poulet braisé est une merveille absolue.",stars:5,date:"15 Fév 2025",avatar:"M",likes:24},
    {id:2,name:"Jean-Paul A.",text:"Meilleur fast food d'Abidjan. Je recommande le thiéboudienne.",stars:5,date:"12 Fév 2025",avatar:"J",likes:18},
    {id:3,name:"Ama N.",text:"Livraison ultra-rapide et nourriture encore chaude à l'arrivée !",stars:4,date:"8 Fév 2025",avatar:"A",likes:12},
    {id:4,name:"Kofi B.",text:"Le StreetBurger Classic vaut vraiment son prix. Incroyable !",stars:5,date:"5 Fév 2025",avatar:"K",likes:31},
    {id:5,name:"Fatou D.",text:"J'adore l'aloko spécial et le bissap frais. Top !",stars:5,date:"1 Fév 2025",avatar:"F",likes:27},
  ],
  orders: [],
  nextId: 1000,
  promoCodes: { "BITE10": 10, "STREET20": 20, "WELCOME15": 15 },
  rewardTiers: [
    {pts:100,reward:"Frites offertes",emoji:"🍟"},
    {pts:250,reward:"Boisson gratuite",emoji:"🧃"},
    {pts:500,reward:"-15% sur commande",emoji:"💰"},
    {pts:1000,reward:"Repas complet offert",emoji:"🎁"},
  ]
};

const CATS = ["Tous","Burgers","Poulet","Local","Wraps","Accompagnements","Boissons","Pizzas","Salades"];
const CAT_ICONS = {Tous:"🍽️",Burgers:"🍔",Poulet:"🍗",Local:"🌍",Wraps:"🌯",Accompagnements:"🍟",Boissons:"🧃",Pizzas:"🍕",Salades:"🥗"};
const TICKER_MSGS = ["🔥 3 commandes passées dans votre quartier","⭐ Note moyenne: 4.9/5 sur 2450 avis","🛵 Livraison express disponible maintenant","🎁 Code BITE10 : -10% sur votre commande","🍔 Le StreetBurger Classic — Best seller du mois","📱 Installez notre app pour des offres exclusives","🌍 Ingrédients 100% locaux et frais chaque matin","⚡ Commandez en 30 secondes chrono"];

// ===== STATE =====
const S = {
  user: null, cart: [], favs: new Set(), cat: "Tous", sort: "", searchQ: "",
  maxPrice: 10000, shown: 8, starSel: 0, view: "grid", promoCode: "",
  promoDisc: 0, pwaPrompt: null, voiceRecog: null, itemQty: 1, selectedExtras: []
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initLoader(); initCursor(); initHeader(); initParticles();
  renderCats(); renderMenu(); renderReviews(); renderRatingBars();
  renderStarPicker(); initAI(); populateSelect(); buildTicker();
  checkOpenStatus(); loadState(); initPWA(); initScrollObserver();
  animateAboutCounters(); renderAIReco();
});

// ===== LOADER =====
function initLoader() {
  let p = 0;
  const prog = document.getElementById('loader-prog');
  const pct = document.getElementById('loader-pct');
  const iv = setInterval(() => {
    p += Math.random() * 12;
    if (p >= 100) { p = 100; clearInterval(iv); setTimeout(() => {
      document.getElementById('loader').classList.add('out');
      animateStatCounter('stat-orders', 3847, 2000);
    }, 300); }
    prog.style.width = p + '%';
    pct.textContent = Math.floor(p) + '%';
  }, 80);
}

// ===== CUSTOM CURSOR =====
function initCursor() {
  const cur = document.getElementById('cursor');
  const glow = document.getElementById('cursor-glow');
  let mx=0,my=0,gx=0,gy=0;
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; cur.style.left=mx+'px'; cur.style.top=my+'px'; });
  function animGlow() { gx+=(mx-gx)*.12; gy+=(my-gy)*.12; glow.style.left=gx+'px'; glow.style.top=gy+'px'; requestAnimationFrame(animGlow); }
  animGlow();
}

// ===== PARTICLES CANVAS =====
function initParticles() {
  const canvas = document.getElementById('ptx');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  function resize() { canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight; }
  resize(); window.addEventListener('resize', resize);
  class P {
    constructor() { this.reset(); }
    reset() { this.x=Math.random()*canvas.width; this.y=Math.random()*canvas.height; this.r=Math.random()*2+.5; this.vx=(Math.random()-.5)*.3; this.vy=-(Math.random()*.4+.1); this.op=Math.random()*.4+.1; }
    draw() { ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fillStyle=`rgba(244,106,6,${this.op})`; ctx.fill(); }
    update() { this.x+=this.vx; this.y+=this.vy; if(this.y<-10||this.x<-10||this.x>canvas.width+10) this.reset(); }
  }
  for(let i=0;i<80;i++) particles.push(new P());
  function animate() { ctx.clearRect(0,0,canvas.width,canvas.height); particles.forEach(p=>{p.update();p.draw();}); requestAnimationFrame(animate); }
  animate();
}

// ===== HEADER =====
function initHeader() {
  window.addEventListener('scroll', () => {
    const hdr = document.getElementById('hdr');
    hdr.style.background = window.scrollY>40 ? 'rgba(10,10,10,.98)' : '';
    updateActiveNav();
  });
  document.getElementById('mob-toggle').addEventListener('click', () => {
    document.getElementById('nav').classList.toggle('open');
  });
  document.querySelectorAll('.nl').forEach(l => l.addEventListener('click', () => document.getElementById('nav').classList.remove('open')));
  document.querySelectorAll('.atab').forEach(t => t.addEventListener('click', () => {
    document.querySelectorAll('.atab').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    const tab = t.dataset.tab;
    document.getElementById('login-pane').classList.toggle('hidden', tab!=='login');
    document.getElementById('register-pane').classList.toggle('hidden', tab!=='register');
  }));
}

function updateActiveNav() {
  const sections = ['home','menu-sec','about-sec','reviews'];
  let cur = '';
  sections.forEach(id => { const el=document.getElementById(id); if(el&&window.scrollY>=el.offsetTop-120) cur=id; });
  document.querySelectorAll('.nl').forEach(l => {
    l.classList.toggle('active', l.getAttribute('href')==='#'+cur);
  });
}

// ===== TICKER =====
function buildTicker() {
  const inner = document.getElementById('ticker-inner');
  const msgs = [...TICKER_MSGS,...TICKER_MSGS]; // duplicate for infinite loop
  inner.innerHTML = msgs.map(m=>`<div class="ticker-item">${m}</div>`).join('');
}

// ===== CATEGORIES =====
function renderCats() {
  const bar = document.getElementById('cats-bar');
  bar.innerHTML = CATS.map(c=>`
    <button class="cat-btn ${c===S.cat?'active':''}" onclick="setCat('${c}')">
      <span>${CAT_ICONS[c]||'🍴'}</span>${c}
    </button>`).join('');
}
function setCat(c) { S.cat=c; S.shown=8; renderCats(); renderMenu(); }

// ===== MENU RENDER =====
function renderMenu() {
  const grid = document.getElementById('menu-grid');
  let items = getFiltered();
  if (items.length===0) {
    grid.innerHTML=`<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-search"></i><p>Aucun résultat pour "${S.searchQ||S.cat}"</p></div>`;
    document.getElementById('load-more-wrap').style.display='none'; return;
  }
  const shown = items.slice(0,S.shown);
  grid.innerHTML = shown.map((item,i)=>renderCard(item,i)).join('');
  document.getElementById('load-more-wrap').style.display = items.length>S.shown?'block':'none';
  if (S.view==='list') grid.classList.add('list-view'); else grid.classList.remove('list-view');
}

function getFiltered() {
  let items = [...DB.menu];
  if (S.cat!=="Tous") items = items.filter(i=>i.cat===S.cat);
  if (S.searchQ) { const q=S.searchQ.toLowerCase(); items=items.filter(i=>i.name.toLowerCase().includes(q)||i.cat.toLowerCase().includes(q)||i.desc.toLowerCase().includes(q)||i.tags.some(t=>t.includes(q))); }
  items = items.filter(i=>i.price<=S.maxPrice);
  switch(S.sort) {
    case 'price-asc': items.sort((a,b)=>a.price-b.price); break;
    case 'price-desc': items.sort((a,b)=>b.price-a.price); break;
    case 'rating': items.sort((a,b)=>b.rating-a.rating); break;
    case 'popular': items.sort((a,b)=>b.reviews-a.reviews); break;
  }
  return items;
}

function renderCard(item,idx) {
  const isFav = S.favs.has(item.id);
  const stars = Array.from({length:5},(_,i)=>{
    if(i<Math.floor(item.rating)) return `<i class="fas fa-star"></i>`;
    if(i<item.rating) return `<i class="fas fa-star-half-alt"></i>`;
    return `<i class="far fa-star"></i>`;
  }).join('');
  return `
  <div class="m-card" style="animation-delay:${idx*.05}s" id="mc-${item.id}" onclick="openItem(${item.id})">
    <div class="card-img">
      <span>${item.emoji}</span>
      ${item.badge?`<span class="card-badge ${item.isNew?'new':item.badge.includes('🌶️')?'hot':''}">${item.badge}</span>`:''}
      <button class="card-fav ${isFav?'on':''}" onclick="event.stopPropagation();toggleFav(${item.id})" aria-label="Favoris">
        <i class="fa${isFav?'s':'r'} fa-heart"></i>
      </button>
    </div>
    <div class="card-body">
      <div class="card-cat">${item.cat}</div>
      <div class="card-name">${item.name}</div>
      <div class="card-desc">${item.desc}</div>
      <div class="card-stars">${stars}<span>(${item.reviews})</span></div>
    </div>
    <div class="card-foot">
      <div class="card-price">${fmt(item.price)}</div>
      <button class="card-add" id="add-${item.id}" onclick="event.stopPropagation();addToCart(${item.id})" aria-label="Ajouter">
        <i class="fas fa-plus"></i> Ajouter
      </button>
    </div>
  </div>`;
}

function loadMore() { S.shown+=4; renderMenu(); }
function sortMenu(v) { S.sort=v; renderMenu(); }
function setView(v) { S.view=v; document.getElementById('vb-grid').classList.toggle('active',v==='grid'); document.getElementById('vb-list').classList.toggle('active',v==='list'); renderMenu(); }
function filterPrice(v) { S.maxPrice=parseInt(v); document.getElementById('price-lbl').textContent=parseInt(v).toLocaleString('fr-FR'); renderMenu(); }

// ===== ITEM DETAIL MODAL =====
function openItem(id) {
  const item = DB.menu.find(i=>i.id===id);
  if(!item) return;
  S.itemQty=1; S.selectedExtras=[];
  const stars = Array.from({length:5},(_,i)=>`<i class="${i<item.rating?'fas':'far'} fa-star"></i>`).join('');
  document.getElementById('item-modal-body').innerHTML=`
    <div class="item-modal-hero">${item.emoji}</div>
    <div class="item-modal-body">
      <div class="cat">${item.cat}</div>
      <h2>${item.name}</h2>
      <div class="card-stars" style="margin-bottom:12px">${stars}<span style="color:var(--txt3)">(${item.reviews} avis)</span></div>
      <div class="desc">${item.desc}</div>
      <div style="display:flex;gap:12px;font-size:1.3rem;color:var(--txt3);margin-bottom:16px">
        <span><i class="fas fa-clock"></i> ${item.time}</span>
        <span><i class="fas fa-fire-alt"></i> ${item.calories} cal</span>
      </div>
      ${item.extras.length?`
      <div style="margin-bottom:16px">
        <div style="font-size:1.3rem;font-weight:700;color:var(--txt3);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Extras</div>
        <div class="item-modal-extras">${item.extras.map(e=>`<div class="extra-chip" onclick="toggleExtra('${e}',this)">${e}</div>`).join('')}</div>
      </div>`:''}
      <div class="item-modal-footer">
        <div>
          <div class="item-price" id="item-price-display">${fmt(item.price)}</div>
          <div style="font-size:1.2rem;color:var(--txt3)">par unité</div>
        </div>
        <div class="qty-ctrl">
          <button onclick="changeItemQty(-1,${item.id})"><i class="fas fa-minus"></i></button>
          <span id="item-qty-disp">1</span>
          <button onclick="changeItemQty(1,${item.id})"><i class="fas fa-plus"></i></button>
        </div>
        <button class="btn-p" onclick="addToCartFromModal(${item.id})"><i class="fas fa-shopping-bag"></i> Ajouter</button>
      </div>
    </div>`;
  openModal('item-modal');
}

function toggleExtra(extra, el) { el.classList.toggle('sel'); if(el.classList.contains('sel')) S.selectedExtras.push(extra); else S.selectedExtras=S.selectedExtras.filter(e=>e!==extra); }
function changeItemQty(d,id) { S.itemQty=Math.max(1,S.itemQty+d); document.getElementById('item-qty-disp').textContent=S.itemQty; const item=DB.menu.find(i=>i.id===id); if(item) document.getElementById('item-price-display').textContent=fmt(item.price*S.itemQty); }
function addToCartFromModal(id) { for(let i=0;i<S.itemQty;i++) addToCart(id,false); showToast(`Ajouté ×${S.itemQty} 🛒`,'success'); closeModal('item-modal'); }

// ===== AI RECOMMENDATIONS =====
function renderAIReco() {
  const hour = new Date().getHours();
  let reco, reason;
  if(hour<10) { reco=[11,8,12]; reason="Bon matin ! Voici nos suggestions légères ☀️"; }
  else if(hour<14) { reco=[6,2,1]; reason="L'heure du déjeuner — repas complets recommandés 🌤️"; }
  else if(hour<18) { reco=[3,5,8]; reason="Après-midi — snacks et boissons fraîches 🌡️"; }
  else { reco=[1,2,9]; reason="Bonsoir ! Nos plats signature pour dîner 🌙"; }
  document.getElementById('ai-reason').textContent=reason;
  const grid = document.getElementById('ai-reco-grid');
  grid.innerHTML = reco.map(id=>{
    const item=DB.menu.find(i=>i.id===id);
    if(!item) return '';
    return `<div style="min-width:220px;background:var(--bg2);border:1px solid var(--brd);border-radius:var(--r);overflow:hidden;cursor:pointer;transition:.3s;flex-shrink:0" onclick="openItem(${item.id})" class="m-card">
      <div class="card-img" style="height:130px"><span>${item.emoji}</span></div>
      <div style="padding:12px">
        <div class="card-name" style="font-size:1.6rem">${item.name}</div>
        <div class="card-price" style="font-size:2rem;margin-top:6px">${fmt(item.price)}</div>
        <button class="card-add" style="margin-top:8px;width:100%;justify-content:center" onclick="event.stopPropagation();addToCart(${item.id})"><i class="fas fa-plus"></i> Ajouter</button>
      </div>
    </div>`;
  }).join('');
}

// ===== CART =====
function addToCart(id,animate=true) {
  const item=DB.menu.find(i=>i.id===id);
  if(!item) return;
  const ex=S.cart.find(i=>i.id===id);
  if(ex) ex.qty++; else S.cart.push({...item,qty:1});
  updateCartUI(); saveState();
  if(animate) { showToast(`${item.emoji} ${item.name} ajouté`,'success'); animBadge(); }
  // Visual feedback on card
  const btn=document.getElementById(`add-${id}`);
  if(btn) { btn.classList.add('added'); btn.innerHTML='<i class="fas fa-check"></i> Ajouté'; setTimeout(()=>{btn.classList.remove('added');btn.innerHTML='<i class="fas fa-plus"></i> Ajouter';},1500); }
}

function quickAdd(id) { addToCart(id); const dish=document.getElementById('main-dish'); if(dish){dish.style.transform='scale(1.2)';setTimeout(()=>dish.style.transform='',300);} }

function updateQty(id,d) { const i=S.cart.find(x=>x.id===id); if(!i) return; i.qty+=d; if(i.qty<=0) removeFromCart(id); else { updateCartUI(); saveState(); } }
function removeFromCart(id) { S.cart=S.cart.filter(i=>i.id!==id); updateCartUI(); saveState(); }
function clearCart() { S.cart=[]; S.promoCode=''; S.promoDisc=0; updateCartUI(); saveState(); showToast('Panier vidé','error'); }

function updateCartUI() {
  const sub=S.cart.reduce((s,i)=>s+i.price*i.qty,0);
  const disc=Math.floor(sub*S.promoDisc/100);
  const del=S.cart.length>0?1500:0;
  const tot=sub-disc+del;
  const n=S.cart.reduce((s,i)=>s+i.qty,0);

  // Badge
  const badge=document.getElementById('cart-badge');
  badge.textContent=n; badge.classList.toggle('hidden',n===0);
  document.getElementById('cart-n').textContent=n;
  document.getElementById('cart-sub').textContent=fmt(sub);
  document.getElementById('cart-del').textContent=del>0?fmt(del):'0 FCFA';
  document.getElementById('cart-tot').textContent=fmt(tot);
  document.getElementById('cko-tot').textContent=fmt(tot);

  // Promo row
  const pr=document.getElementById('promo-trow');
  pr.style.display=disc>0?'flex':'none';
  document.getElementById('cart-promo').textContent=`-${fmt(disc)}`;

  // Cart body
  const body=document.getElementById('cart-body');
  if(S.cart.length===0) {
    body.innerHTML=`<div class="cart-empty"><i class="fas fa-shopping-bag"></i><p>Votre panier est vide</p><p style="font-size:1.2rem;color:var(--txt3);margin-top:4px">Commencez à ajouter des plats !</p></div>`;
  } else {
    body.innerHTML=S.cart.map(i=>`
      <div class="c-item">
        <div class="c-emoji">${i.emoji}</div>
        <div class="c-info"><div class="c-name">${i.name}</div><div class="c-price">${fmt(i.price*i.qty)}</div></div>
        <div class="c-qty">
          <button class="qb" onclick="updateQty(${i.id},-1)"><i class="fas fa-minus"></i></button>
          <span class="qn">${i.qty}</span>
          <button class="qb" onclick="updateQty(${i.id},1)"><i class="fas fa-plus"></i></button>
        </div>
        <button class="c-remove" onclick="removeFromCart(${i.id})"><i class="fas fa-trash"></i></button>
      </div>`).join('');
  }

  // Upsell
  const upsell=document.getElementById('cart-upsell');
  if(S.cart.length>0&&sub<5000) {
    const diff=5000-sub;
    upsell.classList.remove('hidden');
    upsell.innerHTML=`<strong>Plus que ${fmt(diff)} pour la livraison gratuite !</strong> 🎉`;
  } else upsell.classList.add('hidden');

  // Float bubble
  const bubble=document.getElementById('cart-bubble');
  if(n>0) { bubble.classList.remove('hidden'); document.getElementById('bubble-count').textContent=n; document.getElementById('bubble-price').textContent=fmt(tot); }
  else bubble.classList.add('hidden');

  // Order summary
  updateOrderSummary(sub,disc,del,tot);
}

function updateOrderSummary(sub,disc,del,tot) {
  const el=document.getElementById('order-sum-items');
  if(!el) return;
  if(S.cart.length===0) { el.innerHTML='<div class="empty-sum">Panier vide</div>'; return; }
  el.innerHTML=S.cart.map(i=>`<div class="sum-item"><span>${i.emoji} ${i.name} ×${i.qty}</span><span>${fmt(i.price*i.qty)}</span></div>`).join('')+
    `<div class="sum-item"><span>Livraison</span><span>${fmt(del)}</span></div>`+
    (disc>0?`<div class="sum-item"><span>Promo -${S.promoDisc}%</span><span>-${fmt(disc)}</span></div>`:'') +
    `<div class="sum-item" style="font-weight:700;color:var(--txt)"><span>Total</span><span>${fmt(tot)}</span></div>`;
}

function toggleCart() {
  document.getElementById('cart-drw').classList.toggle('open');
  document.getElementById('cart-ov').classList.toggle('hidden');
}

function applyPromo() {
  const code=document.getElementById('promo-code').value.trim().toUpperCase();
  if(DB.promoCodes[code]) {
    S.promoCode=code; S.promoDisc=DB.promoCodes[code];
    showToast(`Code ${code} appliqué ! -${S.promoDisc}% 🎉`,'success');
    updateCartUI(); saveState();
  } else { showToast('Code promo invalide','error'); }
}

function animBadge() {
  const b=document.getElementById('cart-badge');
  b.style.transform='scale(1.5)';
  setTimeout(()=>b.style.transform='',200);
}

// ===== CHECKOUT =====
function checkout() {
  if(S.cart.length===0){showToast('Votre panier est vide !','error');return;}
  if(!S.user){openModal('auth-modal');showToast('Connectez-vous pour commander','error');return;}
  const order=placeOrder();
  toggleCart(); showOrderModal(order);
}

function placeOrder(extra={}) {
  const items=[...S.cart];
  const sub=items.reduce((s,i)=>s+i.price*i.qty,0);
  const disc=Math.floor(sub*S.promoDisc/100);
  const tot=sub-disc+1500;
  const id='SB-'+(++DB.nextId);
  const order={id,items,total:tot,status:'preparing',date:new Date().toLocaleString('fr-FR'),userId:S.user?.id,...extra};
  DB.orders.unshift(order);
  if(S.user){ S.user.points=(S.user.points||0)+Math.floor(tot/100); document.getElementById('pts-badge').textContent=S.user.points+'pts'; }
  S.cart=[]; S.promoCode=''; S.promoDisc=0;
  updateCartUI(); saveState();
  return order;
}

function showOrderModal(order) {
  document.getElementById('order-id-disp').textContent=`Commande ${order.id} — ${fmt(order.total)}`;
  const eta=Math.floor(Math.random()*10)+22;
  document.getElementById('eta-val').textContent=eta+' min';
  openModal('order-modal');
  spawnConfetti();
  const steps=['ts0','ts1','ts2','ts3'];
  let cur=0; steps[0] && document.getElementById(steps[0]).classList.add('active');
  const lines=document.querySelectorAll('.tl');
  const iv=setInterval(()=>{
    cur++; if(cur>=steps.length){clearInterval(iv);const ord=DB.orders.find(o=>o.id===order.id);if(ord)ord.status='delivered';return;}
    document.getElementById(steps[cur]).classList.add('active');
    if(lines[cur-1]) lines[cur-1].classList.add('active');
  },4000);
}

// ===== CONFETTI =====
function spawnConfetti() {
  const wrap=document.getElementById('confetti-wrap');
  const colors=['#f46a06','#fbbf24','#10b981','#3b82f6','#ef4444','#fff'];
  for(let i=0;i<60;i++) {
    const el=document.createElement('div');
    el.className='confetti-piece';
    el.style.cssText=`left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*colors.length)]};animation-duration:${Math.random()*.5+.8}s;animation-delay:${Math.random()*.5}s;transform:rotate(${Math.random()*360}deg)`;
    wrap.appendChild(el);
  }
  setTimeout(()=>wrap.innerHTML='',2000);
}

// ===== AUTH =====
function doLogin() {
  const email=document.getElementById('l-email').value.trim();
  const pass=document.getElementById('l-pass').value;
  if(!email||!pass){showToast('Remplissez tous les champs','error');return;}
  const user=DB.users.find(u=>u.email===email&&u.password===pass);
  if(!user){showToast('Email ou mot de passe incorrect','error');return;}
  S.user=user; closeModal('auth-modal'); updateAuthUI(); showToast(`Bienvenue, ${user.name} 👋`,'success'); saveState();
}

function doRegister() {
  const name=document.getElementById('r-name').value.trim();
  const email=document.getElementById('r-email').value.trim();
  const pass=document.getElementById('r-pass').value;
  if(!name||!email||!pass){showToast('Remplissez tous les champs','error');return;}
  if(DB.users.find(u=>u.email===email)){showToast('Email déjà utilisé','error');return;}
  if(pass.length<6){showToast('Mot de passe trop court (6 min)','error');return;}
  const user={id:DB.users.length+1,name,email,password:pass,avatar:name[0].toUpperCase(),points:50,orders:[]};
  DB.users.push(user); S.user=user; closeModal('auth-modal'); updateAuthUI();
  showToast(`Bienvenue ${name} ! +50 points de bienvenue 🎉`,'success'); saveState();
}

function checkPwStrength(val) {
  const bar=document.getElementById('pw-strength');
  let strength=0; let color='var(--red)'; let label='Faible';
  if(val.length>=6) strength=1;
  if(val.length>=8&&/[A-Z]/.test(val)) strength=2;
  if(val.length>=10&&/[A-Z]/.test(val)&&/[0-9]/.test(val)) strength=3;
  if(strength===1){color='var(--yellow)';label='Moyen';}
  if(strength>=2){color='var(--green)';label='Fort';}
  bar.innerHTML=`<div style="width:${(strength/3)*100}%;height:100%;background:${color};border-radius:99px"></div>`;
  bar.title=label;
}

function togglePw(id,btn) {
  const inp=document.getElementById(id);
  const isText=inp.type==='text'; inp.type=isText?'password':'text';
  btn.innerHTML=isText?'<i class="fas fa-eye"></i>':'<i class="fas fa-eye-slash"></i>';
}

function updateAuthUI() {
  const btn=document.getElementById('auth-btn');
  if(S.user) {
    btn.innerHTML=`<span style="font-weight:700;font-size:1.2rem">${S.user.avatar}</span>`;
    btn.title=S.user.name;
    btn.onclick=()=>{ if(confirm(`Déconnecter ${S.user.name} ?`)){S.user=null;updateAuthUI();showToast('Déconnecté','error');saveState();} };
    document.getElementById('pts-badge').textContent=(S.user.points||0)+'pts';
  } else {
    btn.innerHTML='<i class="fas fa-user"></i>'; btn.title='Connexion';
    btn.onclick=()=>openModal('auth-modal');
    document.getElementById('pts-badge').textContent='0pts';
  }
}

// ===== FAVORITES =====
function toggleFav(id) {
  if(S.favs.has(id)){S.favs.delete(id);showToast('Retiré des favoris','error');}
  else{S.favs.add(id);showToast('Ajouté aux favoris ❤️','success');}
  renderMenu(); saveState();
}

// ===== SEARCH =====
function toggleSearch() {
  const ov=document.getElementById('search-ov');
  ov.classList.toggle('hidden');
  if(!ov.classList.contains('hidden')) { document.getElementById('s-input').focus(); renderSearchTags(); }
  else { S.searchQ=''; document.getElementById('s-input').value=''; document.getElementById('s-results').innerHTML=''; }
}

function renderSearchTags() {
  const tags=['🔥 Populaires','🍔 Burgers','🍗 Poulet','🌍 Local','💚 Healthy','⚡ Rapide'];
  document.getElementById('s-tags').innerHTML=tags.map(t=>`<button class="s-tag" onclick="searchTag('${t}')">${t}</button>`).join('');
}

function searchTag(tag) {
  const clean=tag.replace(/[^\w\s]/gi,'').trim().toLowerCase();
  document.getElementById('s-input').value=tag;
  doSearch(clean);
}

function doSearch(q) {
  S.searchQ=q;
  const res=document.getElementById('s-results');
  if(!q.trim()){res.innerHTML='';return;}
  const matches=getFiltered();
  if(!matches.length){res.innerHTML=`<p style="color:var(--txt3);font-size:1.4rem;padding:12px">Aucun résultat</p>`;return;}
  res.innerHTML=matches.map(i=>`
    <div class="s-result" onclick="goToItem(${i.id})">
      <div class="s-result-emoji">${i.emoji}</div>
      <div class="s-result-info"><strong>${i.name}</strong><span>${i.cat} — ${fmt(i.price)}</span></div>
    </div>`).join('');
}

function goToItem(id) {
  toggleSearch(); S.searchQ=''; S.cat='Tous'; renderCats(); renderMenu();
  setTimeout(()=>{
    const card=document.getElementById(`mc-${id}`);
    if(card){card.scrollIntoView({behavior:'smooth',block:'center'});card.style.border='2px solid var(--o)';setTimeout(()=>card.style.border='',2000);}
  },300);
}

// ===== VOICE SEARCH =====
function startVoice() {
  const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SpeechRecognition){showToast('Votre navigateur ne supporte pas la recherche vocale','error');return;}
  const rec=new SpeechRecognition();
  rec.lang='fr-FR'; rec.interimResults=false; rec.maxAlternatives=1;
  const btn=document.getElementById('voice-btn')||document.getElementById('s-input');
  const voiceBtns=document.querySelectorAll('.voice-btn');
  voiceBtns.forEach(b=>b.classList.add('listening'));
  rec.onresult=e=>{
    const t=e.results[0][0].transcript;
    const input=document.getElementById('s-input');
    if(input) input.value=t;
    doSearch(t);
    voiceBtns.forEach(b=>b.classList.remove('listening'));
    showToast(`🎤 "${t}"`, 'info');
  };
  rec.onerror=()=>{ voiceBtns.forEach(b=>b.classList.remove('listening')); showToast('Erreur microphone','error'); };
  rec.start();
}

// ===== AI CHATBOT =====
const AI_KNOWLEDGE = {
  greetings:['bonjour','salut','hello','hey','bonsoir'],
  recommend:['recommande','conseil','suggestion','quoi manger','que manger','proposer'],
  burger:['burger','bœuf','viande','fromage'],
  poulet:['poulet','chicken','braisé','frit'],
  local:['local','ivoirien','attiéké','thiéboudienne','aloko'],
  vegetarien:['végétarien','vegan','légumes','salade','healthy'],
  boisson:['boisson','jus','boire','soif','bissap','smoothie'],
  price:['prix','pas cher','économique','budget'],
  order:['commander','passer commande','acheter'],
  hours:['horaire','ouvert','fermé','heure'],
};

const AI_RESPONSES = {
  default:"Je peux vous aider à choisir un plat ! Dites-moi vos envies : burger, poulet, plat local, végétarien... 😊",
  greeting:"Bonjour et bienvenue chez StreetBite ! 🌟 Je suis votre conseiller personnel. Qu'est-ce qui vous ferait plaisir aujourd'hui ?",
  recommend:"Voici mes recommandations du moment ⭐",
  burger:"Pour les amateurs de burger, notre <strong>StreetBurger Classic</strong> (3 500 FCFA) est notre best-seller absolu ! Voulez-vous l'ajouter au panier ?",
  poulet:"Le <strong>Poulet Braisé Royal</strong> avec attiéké frais (4 500 FCFA) est une pépite ! Authentique et généreux. 🍗",
  local:"Pour les plats locaux, je recommande le <strong>Thiéboudienne Premium</strong> (5 000 FCFA) — notre chef's choice ! Ou l'<strong>Aloko Spécial</strong> pour un snack rapide (1 500 FCFA). 🌍",
  vegetarien:"Pour une option végétarienne : <strong>Salade Fraîcheur</strong> (2 000 FCFA) ou le <strong>Wrap Frais</strong> (3 000 FCFA) — légers et délicieux ! 🥗",
  boisson:"Nos boissons star : <strong>Jus de Bissap</strong> maison (800 FCFA) et le <strong>Smoothie Tropical</strong> (1 200 FCFA). Fraîcheur garantie ! 🧃",
  price:"Nos plats économiques : Aloko Spécial à 1 500 FCFA, Jus de Bissap à 800 FCFA, Frites Maison à 1 000 FCFA. 💚",
  order:"Pour passer commande, ajoutez vos plats au panier et cliquez sur 'Commander'. Je vous guide !",
  hours:"Nous sommes ouverts Lun-Ven de 10h à 22h, et Sam-Dim de 11h à 23h. Livraison disponible pendant les horaires d'ouverture ! 🕐",
};

const AI_SUGGESTIONS = ["Recommandez-moi quelque chose","J'ai faim, c'est quoi le meilleur ?","Option végétarienne ?","Plat local ?","Pas cher ?","Vos horaires ?"];

function initAI() {
  renderAISuggestions();
  setTimeout(()=>{
    addAIMsg("Bonjour ! 👋 Je suis Chef IA, votre conseiller personnel StreetBite. Comment puis-je vous aider aujourd'hui ?", 'bot');
    renderAISuggestions();
  }, 2000);
}

function toggleAI() { document.getElementById('ai-chat').classList.toggle('hidden'); }
function openAIChat() { document.getElementById('ai-chat').classList.remove('hidden'); document.getElementById('ai-inp').focus(); }

function sendAI() {
  const inp=document.getElementById('ai-inp');
  const msg=inp.value.trim();
  if(!msg) return;
  addAIMsg(msg,'user'); inp.value='';
  setTimeout(()=>{ addAIMsg(getAIResponse(msg),'bot'); renderAISuggestions(); }, 800);
}

function getAIResponse(msg) {
  const m=msg.toLowerCase();
  if(AI_KNOWLEDGE.greetings.some(w=>m.includes(w))) return AI_RESPONSES.greeting;
  if(AI_KNOWLEDGE.recommend.some(w=>m.includes(w))) return AI_RESPONSES.recommend + `<br><br>🏆 <strong>StreetBurger Classic</strong> (4.9★)<br>🍗 <strong>Poulet Braisé Royal</strong> (4.8★)<br>🌍 <strong>Thiéboudienne</strong> (4.9★)`;
  if(AI_KNOWLEDGE.burger.some(w=>m.includes(w))) return AI_RESPONSES.burger;
  if(AI_KNOWLEDGE.poulet.some(w=>m.includes(w))) return AI_RESPONSES.poulet;
  if(AI_KNOWLEDGE.local.some(w=>m.includes(w))) return AI_RESPONSES.local;
  if(AI_KNOWLEDGE.vegetarien.some(w=>m.includes(w))) return AI_RESPONSES.vegetarien;
  if(AI_KNOWLEDGE.boisson.some(w=>m.includes(w))) return AI_RESPONSES.boisson;
  if(AI_KNOWLEDGE.price.some(w=>m.includes(w))) return AI_RESPONSES.price;
  if(AI_KNOWLEDGE.order.some(w=>m.includes(w))) return AI_RESPONSES.order;
  if(AI_KNOWLEDGE.hours.some(w=>m.includes(w))) return AI_RESPONSES.hours;
  return AI_RESPONSES.default;
}

function addAIMsg(text,role) {
  const msgs=document.getElementById('ai-msgs');
  const div=document.createElement('div');
  div.className=`ai-msg ${role}`;
  div.innerHTML=text;
  msgs.appendChild(div); msgs.scrollTop=msgs.scrollHeight;
}

function renderAISuggestions() {
  const el=document.getElementById('ai-suggestions');
  el.innerHTML=AI_SUGGESTIONS.slice(0,4).map(s=>`<button class="ai-sugg" onclick="aiSugg('${s}')">${s}</button>`).join('');
}

function aiSugg(text) { document.getElementById('ai-inp').value=text; sendAI(); }

// ===== THEME =====
function toggleTheme() {
  const html=document.documentElement;
  const isDark=html.dataset.theme==='dark';
  html.dataset.theme=isDark?'light':'dark';
  document.getElementById('theme-icon').className=isDark?'fas fa-moon':'fas fa-sun';
  localStorage.setItem('sb_theme',isDark?'light':'dark');
  showToast(`Thème ${isDark?'clair':'sombre'} activé`,'info');
}

// ===== 3D TILT =====
function tilt3D(e) {
  const el=document.getElementById('hero-3d');
  const rect=el.getBoundingClientRect();
  const x=((e.clientX-rect.left)/rect.width-.5)*20;
  const y=((e.clientY-rect.top)/rect.height-.5)*-20;
  el.style.transform=`perspective(600px) rotateY(${x}deg) rotateX(${y}deg)`;
}
function resetTilt() { document.getElementById('hero-3d').style.transform=''; }

// ===== GEOLOCATION =====
function geolocate() {
  const result=document.getElementById('geo-result');
  result.innerHTML='<i class="fas fa-spinner fa-spin"></i> Localisation en cours...';
  if(!navigator.geolocation){result.innerHTML='<i class="fas fa-times"></i> Géolocalisation non supportée';return;}
  navigator.geolocation.getCurrentPosition(
    pos=>{
      const {latitude:lat,longitude:lon}=pos.coords;
      result.innerHTML=`<i class="fas fa-check-circle"></i> Position détectée (${lat.toFixed(4)}, ${lon.toFixed(4)})`;
      animateMapPin(lat,lon);
    },
    ()=>{ result.innerHTML='<i class="fas fa-times-circle" style="color:var(--red)"></i> Position refusée — vérifiez vos paramètres'; }
  );
}

function animateMapPin(lat,lon) {
  const pin=document.getElementById('map-marker');
  if(pin){pin.style.animation='none';setTimeout(()=>{pin.style.animation='';},100);}
  showToast('Position détectée ! 📍','success');
}

function fillAddr() {
  geolocate();
  const addr=document.getElementById('o-addr');
  if(addr) { addr.value=''; addr.placeholder='Localisation en cours...';
    setTimeout(()=>{addr.value='Plateau, Abidjan (position détectée)';addr.placeholder='Quartier, rue, détails...';},1500); }
}

// ===== ORDERS =====
function openOrders(e) { if(e) e.preventDefault(); if(!S.user){openModal('auth-modal');showToast('Connectez-vous pour voir vos commandes','error');return;} renderOrders(); document.getElementById('orders-drw').classList.add('open'); document.getElementById('orders-ov').classList.remove('hidden'); }
function closeOrders() { document.getElementById('orders-drw').classList.remove('open'); document.getElementById('orders-ov').classList.add('hidden'); }

function renderOrders() {
  const list=document.getElementById('orders-body');
  const orders=DB.orders.filter(o=>o.userId===S.user?.id);
  if(!orders.length){list.innerHTML=`<div class="empty-state"><i class="fas fa-receipt"></i><p>Aucune commande pour l'instant</p></div>`;return;}
  list.innerHTML=orders.map(o=>`
    <div class="ord-card">
      <div class="ord-card-hd">
        <span class="ord-id">#${o.id}</span>
        <span class="status-pill ${o.status}">${o.status==='preparing'?'En cours':o.status==='delivered'?'Livré':'Annulé'}</span>
      </div>
      <div class="ord-items">${o.items.map(i=>`${i.emoji} ${i.name} ×${i.qty}`).join(', ')}</div>
      <div class="ord-total">${fmt(o.total)}</div>
      <div class="ord-date">${o.date}</div>
    </div>`).join('');
}

// ===== LOYALTY =====
function openLoyalty(e) { if(e) e.preventDefault(); renderLoyalty(); document.getElementById('loyalty-drw').classList.add('open'); document.getElementById('loyalty-ov').classList.remove('hidden'); }
function closeLoyalty() { document.getElementById('loyalty-drw').classList.remove('open'); document.getElementById('loyalty-ov').classList.add('hidden'); }

function renderLoyalty() {
  const pts=S.user?.points||0;
  const nextTier=DB.rewardTiers.find(t=>t.pts>pts)||DB.rewardTiers[DB.rewardTiers.length-1];
  const progress=Math.min((pts/nextTier.pts)*100,100);
  const body=document.getElementById('loyalty-body');
  body.innerHTML=`
    <div class="pts-card">
      <div style="font-size:1.3rem;opacity:.8;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">Vos points</div>
      <div class="big-pts">${pts}</div>
      <p>Prochain palier: ${nextTier.reward} ${nextTier.emoji} à ${nextTier.pts} pts</p>
      <div class="pts-bar-wrap"><div class="pts-bar-fill" style="width:${progress}%"></div></div>
      <div class="pts-hint">${nextTier.pts-pts} points restants</div>
    </div>
    <div style="font-size:1.2rem;font-weight:700;color:var(--txt3);text-transform:uppercase;letter-spacing:.5px;margin:4px 0 12px">Récompenses disponibles</div>
    ${DB.rewardTiers.map(t=>`
      <div class="reward-item" style="${pts>=t.pts?'border-color:var(--o)':''}">
        <div class="reward-ico">${t.emoji}</div>
        <div class="reward-info"><strong>${t.reward}</strong><small>${t.pts} points requis</small></div>
        <div class="reward-pts">${t.pts}pts</div>
        ${pts>=t.pts?`<button class="btn-p" style="padding:6px 12px;font-size:1.2rem;margin-left:8px" onclick="redeemReward('${t.reward}')">Utiliser</button>`:''}
      </div>`).join('')}
    <div style="margin-top:16px;padding:14px;background:var(--bg3);border-radius:var(--r-sm);font-size:1.3rem;color:var(--txt3)">
      <i class="fas fa-info-circle" style="color:var(--o)"></i> Gagnez <strong>1 point</strong> pour chaque 100 FCFA dépensés.
    </div>`;
}

function redeemReward(reward) { showToast(`Récompense "${reward}" appliquée ! 🎁`,'success'); closeLoyalty(); }

// ===== REVIEWS =====
function renderReviews() {
  const grid=document.getElementById('reviews-grid');
  grid.innerHTML=DB.reviews.map(r=>`
    <div class="rev-card">
      <div class="rev-head">
        <div class="rev-ava">${r.avatar}</div>
        <div class="rev-meta"><strong>${r.name}</strong><small>${r.date}</small></div>
        <div style="margin-left:auto;color:var(--txt3);font-size:1.2rem;cursor:pointer" onclick="likeReview(${r.id})"><i class="far fa-heart"></i> ${r.likes}</div>
      </div>
      <div class="rev-stars">${'<i class="fas fa-star"></i>'.repeat(r.stars)}</div>
      <div class="rev-txt">"${r.text}"</div>
    </div>`).join('');
}

function renderRatingBars() {
  const data={5:65,4:22,3:8,2:3,1:2};
  document.getElementById('rating-bars').innerHTML=Object.entries(data).reverse().map(([s,p])=>`
    <div class="r-bar-row">
      <span>${s}</span><i class="fas fa-star"></i>
      <div class="r-bar"><div class="r-bar-fill" style="width:${p}%"></div></div>
      <span style="color:var(--txt3);min-width:30px">${p}%</span>
    </div>`).join('');
}

function likeReview(id) {
  const r=DB.reviews.find(x=>x.id===id);
  if(r){r.likes++;renderReviews();showToast('Merci pour votre like ! 👍','success');}
}

function renderStarPicker() {
  const el=document.getElementById('star-picker');
  el.innerHTML=Array.from({length:5},(_,i)=>`<i class="fas fa-star" data-v="${i+1}"></i>`).join('');
  el.querySelectorAll('i').forEach(star=>{
    star.addEventListener('click',()=>{S.starSel=parseInt(star.dataset.v);el.querySelectorAll('i').forEach((s,i)=>s.classList.toggle('on',i<S.starSel));});
    star.addEventListener('mouseenter',()=>el.querySelectorAll('i').forEach((s,i)=>s.classList.toggle('hover',i<=parseInt(star.dataset.v)-1)));
    star.addEventListener('mouseleave',()=>el.querySelectorAll('i').forEach(s=>s.classList.remove('hover')));
  });
}

function submitReview() {
  if(!S.user){showToast('Connectez-vous pour laisser un avis','error');openModal('auth-modal');return;}
  if(!S.starSel){showToast('Choisissez une note','error');return;}
  const text=document.getElementById('rev-text').value.trim();
  if(!text){showToast('Écrivez votre avis','error');return;}
  DB.reviews.unshift({id:DB.reviews.length+1,name:S.user.name,text,stars:S.starSel,date:new Date().toLocaleDateString('fr-FR',{day:'numeric',month:'short',year:'numeric'}),avatar:S.user.avatar,likes:0});
  renderReviews();
  document.getElementById('rev-text').value='';
  S.starSel=0;
  document.querySelectorAll('#star-picker i').forEach(s=>s.classList.remove('on'));
  showToast('Avis publié ! Merci ⭐','success');
}

// ===== ORDER FORM =====
function populateSelect() {
  const sel=document.getElementById('o-dish');
  DB.menu.forEach(i=>{const o=document.createElement('option');o.value=i.id;o.textContent=`${i.emoji} ${i.name} — ${fmt(i.price)}`;sel.appendChild(o);});
}

function submitOrder(e) {
  e.preventDefault();
  const name=document.getElementById('o-name').value.trim();
  const phone=document.getElementById('o-phone').value.trim();
  const dishId=parseInt(document.getElementById('o-dish').value);
  const extras=document.getElementById('o-extras').value.trim();
  const qty=parseInt(document.getElementById('o-qty').value)||1;
  const addr=document.getElementById('o-addr').value.trim();
  const dt=document.getElementById('o-dt').value;
  const pay=document.querySelector('input[name="pay"]:checked')?.value||'cash';
  if(!name||!phone||!dishId||!addr){showToast('Remplissez tous les champs','error');return;}
  const dish=DB.menu.find(i=>i.id===dishId);
  if(!dish) return;
  const items=[{...dish,qty}];
  const tot=dish.price*qty+1500;
  const id='SB-'+(++DB.nextId);
  const order={id,items,total:tot,status:'preparing',date:new Date().toLocaleString('fr-FR'),userId:S.user?.id,name,phone,address:addr,extras,datetime:dt,payment:pay};
  DB.orders.unshift(order);
  if(S.user){S.user.points=(S.user.points||0)+Math.floor(tot/100);document.getElementById('pts-badge').textContent=S.user.points+'pts';}
  showOrderModal(order);
  e.target.reset(); saveState();
  showToast('Commande envoyée ! 🎉','success');
}

// ===== SCROLL OBSERVER =====
function initScrollObserver() {
  const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:.1});
  document.querySelectorAll('.m-card,.rev-card,.feat,.s-box').forEach(el=>io.observe(el));
}

// ===== ABOUT COUNTERS =====
function animateAboutCounters() {
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting) {
        animCount('ac1',12,1500,''); animCount('ac2',DB.menu.length,800,'');
        animCount('ac3',2450,1500,''); animCount('ac4',28,1000,'');
        io.disconnect();
      }
    });
  },{threshold:.3});
  const el=document.getElementById('ac1');
  if(el) io.observe(el.closest('.s-box')||el);
}

function animCount(id,target,dur,suffix='') {
  const el=document.getElementById(id); if(!el) return;
  let v=0; const step=target/(dur/16);
  const iv=setInterval(()=>{v+=step;if(v>=target){el.textContent=target+suffix;clearInterval(iv);return;}el.textContent=Math.floor(v)+suffix;},16);
}

function animateStatCounter(id,target,dur) { animCount(id,target,dur); }

// ===== OPEN STATUS =====
function checkOpenStatus() {
  const h=new Date().getHours(),d=new Date().getDay();
  const isWeekend=d===0||d===6;
  const isOpen=isWeekend?(h>=11&&h<23):(h>=10&&h<22);
  const el=document.getElementById('open-status');
  if(el) {
    el.style.cssText=`background:${isOpen?'rgba(16,185,129,.1)':'rgba(239,68,68,.1)'};border:1px solid ${isOpen?'rgba(16,185,129,.3)':'rgba(239,68,68,.3)'};color:${isOpen?'var(--green)':'var(--red)'}`;
    el.innerHTML=isOpen?'● Ouvert maintenant':'● Fermé';
  }
}

// ===== PWA =====
function initPWA() {
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();S.pwaPrompt=e;setTimeout(()=>document.getElementById('pwa-banner').classList.remove('hidden'),5000);});
}
function installPWA() { if(S.pwaPrompt){S.pwaPrompt.prompt();S.pwaPrompt.userChoice.then(()=>{document.getElementById('pwa-banner').classList.add('hidden');});} }

// ===== UTILS =====
function fmt(n){return new Intl.NumberFormat('fr-FR').format(n)+' FCFA';}

function showToast(msg,type='success') {
  const c=document.getElementById('toasts');
  const icons={success:'fa-check-circle',error:'fa-exclamation-circle',info:'fa-info-circle'};
  const t=document.createElement('div');
  t.className=`toast ${type}`;
  t.innerHTML=`<i class="fas ${icons[type]||icons.success}"></i> ${msg}`;
  c.appendChild(t);
  setTimeout(()=>{t.style.animation='toastOut .3s ease forwards';setTimeout(()=>t.remove(),300);},3500);
}

function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
  document.getElementById('backdrop').classList.remove('hidden');
}
function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
  const anyOpen=[...document.querySelectorAll('.modal')].some(m=>!m.classList.contains('hidden'));
  if(!anyOpen) document.getElementById('backdrop').classList.add('hidden');
}
function closeAllModals() {
  document.querySelectorAll('.modal').forEach(m=>m.classList.add('hidden'));
  document.getElementById('backdrop').classList.add('hidden');
}

function saveState() {
  try{localStorage.setItem('sb_user',JSON.stringify(S.user));localStorage.setItem('sb_cart',JSON.stringify(S.cart));localStorage.setItem('sb_favs',JSON.stringify([...S.favs]));}catch(e){}
}
function loadState() {
  try{
    const theme=localStorage.getItem('sb_theme');
    if(theme){document.documentElement.dataset.theme=theme;document.getElementById('theme-icon').className=theme==='light'?'fas fa-moon':'fas fa-sun';}
    const u=JSON.parse(localStorage.getItem('sb_user'));
    const c=JSON.parse(localStorage.getItem('sb_cart'));
    const f=JSON.parse(localStorage.getItem('sb_favs'));
    if(u){S.user=u;updateAuthUI();}
    if(c){S.cart=c;updateCartUI();}
    if(f){S.favs=new Set(f);}
  }catch(e){}
}

// KEYBOARD SHORTCUTS
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){closeAllModals();if(!document.getElementById('search-ov').classList.contains('hidden'))toggleSearch();}
  if(e.key==='/'&&document.activeElement.tagName!=='INPUT'&&document.activeElement.tagName!=='TEXTAREA'){e.preventDefault();toggleSearch();}
  if(e.key==='c'&&(e.ctrlKey||e.metaKey)&&e.shiftKey){e.preventDefault();toggleCart();}
});

// CLOSE DRAWERS ON ESCAPE
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeOrders();closeLoyalty();}});