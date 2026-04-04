/* ============================================================
   BON MIEL — script.js
   ============================================================ */

// ── Header sticky ──────────────────────────────────────────
const header    = document.querySelector('header');
const scrollBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', window.scrollY > 80);
    if (scrollBtn) scrollBtn.classList.toggle('visible', window.scrollY > 400);
});

// ── Mobile menu ────────────────────────────────────────────
const menuIcon = document.getElementById('menu-icon');
const navlist  = document.querySelector('.navlist');

const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

function openMenu() {
    menuIcon.classList.remove('fa-bars');
    menuIcon.classList.add('fa-xmark');
    navlist.classList.add('open');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    menuIcon.classList.remove('fa-xmark');
    menuIcon.classList.add('fa-bars');
    navlist.classList.remove('open');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

menuIcon.addEventListener('click', () => {
    navlist.classList.contains('open') ? closeMenu() : openMenu();
});

navOverlay.addEventListener('click', closeMenu);

document.querySelectorAll('.navlist a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault(); // bloque la navigation native
            closeMenu();        // ferme le menu (animation 400ms)
            setTimeout(() => {
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }, 420); // attend la fin de l'animation avant de scroller
        } else {
            closeMenu();
        }
    });
});

// ── Active nav links on scroll ─────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.navlist a');

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            const link = document.querySelector(`.navlist a[href="#${entry.target.id}"]`);
            if (link) link.classList.add('active');
        }
    });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ── Reveal on scroll ───────────────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${(i % 4) * 80}ms`;
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Toast notification ─────────────────────────────────────
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── Cart ───────────────────────────────────────────────────
let cart = [];

try {
    cart = JSON.parse(localStorage.getItem('bonmiel_cart')) || [];
} catch {
    cart = [];
}

function saveCart() {
    try {
        localStorage.setItem('bonmiel_cart', JSON.stringify(cart));
    } catch {}
}

function updateCartUI() {
    const countEl  = document.getElementById('cartCount');
    const itemsEl  = document.getElementById('cartItems');
    const totalEl  = document.getElementById('cartTotal');
    const footerEl = document.getElementById('cartFooter');

    if (!countEl) return;

    const totalQty = cart.reduce((s, i) => s + i.quantity, 0);

    // Badge panier
    if (totalQty > 0) {
        countEl.textContent = totalQty;
        countEl.style.display = 'flex';
    } else {
        countEl.style.display = 'none';
    }

    if (cart.length === 0) {
        itemsEl.innerHTML = `
            <div class="empty-cart">
                <i class='fa-solid fa-cart-arrow-down'></i>
                <p>Votre panier est vide</p>
            </div>`;
        footerEl.style.display = 'none';
        saveCart();
        return;
    }

    let total = 0;
    itemsEl.innerHTML = cart.map((item, idx) => {
        total += item.price * item.quantity;
        return `
            <div class="cart-item">
                <div class="cart-item-image"></div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price.toLocaleString('fr-FR')} FCFA</p>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${idx}, -1)">−</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${idx}, 1)">+</button>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${idx})">
                        <i class='fa-solid fa-trash'></i> Retirer
                    </button>
                </div>
            </div>`;
    }).join('');

    totalEl.textContent = total.toLocaleString('fr-FR') + ' FCFA';
    footerEl.style.display = 'block';
    saveCart();
}

function addToCart(name, price) {
    const existing = cart.find(i => i.name === name);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCartUI();
    showToast(` ${name} ajouté au panier !`);

    // Bounce animation sur l'icône panier
    const cartIcons = document.querySelectorAll('.fa-cart-shopping');
    cartIcons.forEach(icon => {
        icon.style.transform = 'scale(1.4)';
        setTimeout(() => { icon.style.transform = 'scale(1)'; }, 300);
    });
}

function updateQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) cart.splice(index, 1);
    }
    updateCartUI();
}

function removeFromCart(index) {
    if (cart[index]) {
        showToast(` ${cart[index].name} retiré du panier.`);
        cart.splice(index, 1);
    }
    updateCartUI();
}

function toggleCart() {
    document.getElementById('cartModal').classList.toggle('active');
    document.getElementById('cartOverlay').classList.toggle('active');
}

function checkout() {
    if (cart.length === 0) {
        showToast(' Votre panier est vide !');
        return;
    }

    let msg = 'Bonjour Bon Miel , je souhaite commander :\n\n';
    let total = 0;

    cart.forEach(item => {
        msg += `• ${item.name} x${item.quantity} = ${(item.price * item.quantity).toLocaleString('fr-FR')} FCFA\n`;
        total += item.price * item.quantity;
    });

    msg += `\n Total : ${total.toLocaleString('fr-FR')} FCFA\n\nMerci !`;
    window.open(`https://wa.me/2250713188565?text=${encodeURIComponent(msg)}`, '_blank');
}

// ── Search ─────────────────────────────────────────────────
const products = [
    { name: "Miel d'Acacia",    price: 7000  },
    { name: "Miel de Forêt",    price: 9000  },
    { name: "Miel de Fleurs",   price: 6000  },
    { name: "Miel Royal",       price: 10000 },
    { name: "Miel de Mangrove", price: 8500  },
    { name: "Miel Épicé",       price: 11000 },
];

function toggleSearch() {
    const modal = document.getElementById('searchModal');
    modal.classList.toggle('active');
    if (modal.classList.contains('active')) {
        setTimeout(() => document.getElementById('searchInput').focus(), 100);
        document.getElementById('searchResults').innerHTML = '';
        document.getElementById('searchInput').value = '';
        // Réafficher toutes les cartes
        document.querySelectorAll('.shop-content .row').forEach(r => r.style.display = '');
    }
}

document.getElementById('searchInput').addEventListener('input', function () {
    const term = this.value.trim().toLowerCase();
    const results = document.getElementById('searchResults');
    const rows = document.querySelectorAll('.shop-content .row');

    rows.forEach(row => {
        const name = row.querySelector('h3')?.textContent.toLowerCase() || '';
        row.style.display = !term || name.includes(term) ? '' : 'none';
    });

    if (!term) { results.innerHTML = ''; return; }

    const matches = products.filter(p => p.name.toLowerCase().includes(term));
    if (matches.length === 0) {
        results.innerHTML = `<p style="color:var(--second-color);text-align:center;grid-column:1/-1;padding:1rem;">Aucun résultat pour "<strong>${term}</strong>"</p>`;
        return;
    }

    results.innerHTML = matches.map(p => `
        <div class="search-result-item" onclick="addToCart('${p.name.replace(/'/g, "\\'")}', ${p.price}); toggleSearch();">
            <span></span>
            <div>
                <div><span>${p.name}</span></div>
                <small>${p.price.toLocaleString('fr-FR')} FCFA</small>
            </div>
        </div>`).join('');
});

// Fermer sur Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if (document.getElementById('searchModal').classList.contains('active')) toggleSearch();
        if (document.getElementById('cartModal').classList.contains('active')) toggleCart();
    }
});

// ── Like / Wishlist ────────────────────────────────────────
function toggleLike(el) {
    const isLiked = el.classList.contains('fa-solid');
    el.classList.toggle('fa-solid', !isLiked);
    el.classList.toggle('fa-regular', isLiked);
    el.classList.toggle('liked', !isLiked);
    showToast(isLiked ? ' Retiré des favoris.' : ' Ajouté aux favoris !');
}

// ── Shop filter ────────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.dataset.filter;
        document.querySelectorAll('.shop-content .row').forEach(row => {
            const cat = row.dataset.category || '';
            if (filter === 'all' || cat === filter) {
                row.style.display = '';
                row.style.opacity = '0';
                row.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    row.style.transition = 'opacity .4s ease, transform .4s ease';
                    row.style.opacity = '1';
                    row.style.transform = 'translateY(0)';
                }, 50);
            } else {
                row.style.display = 'none';
            }
        });
    });
});

// ── Newsletter ─────────────────────────────────────────────
function subscribeNewsletter() {
    const emailEl = document.getElementById('newsletterEmail');
    const email   = emailEl ? emailEl.value.trim() : '';
    if (!email || !email.includes('@')) {
        showToast(' Veuillez entrer un email valide.');
        return;
    }
    emailEl.value = '';
    showToast(' Merci ! Vous êtes maintenant abonné(e).');
}

// ── Contact form → WhatsApp ────────────────────────────────
function sendMessage() {
    const name    = document.getElementById('formName')?.value.trim();
    const email   = document.getElementById('formEmail')?.value.trim();
    const phone   = document.getElementById('formPhone')?.value.trim();
    const message = document.getElementById('formMessage')?.value.trim();

    if (!name || !message) {
        showToast(' Veuillez remplir au minimum votre nom et votre message.');
        return;
    }

    let msg = `Bonjour Bon Miel ,\n\nNom : ${name}\n`;
    if (email)   msg += `Email : ${email}\n`;
    if (phone)   msg += `Tél : ${phone}\n`;
    msg += `\nMessage :\n${message}\n\nMerci !`;

    window.open(`https://wa.me/2250713188565?text=${encodeURIComponent(msg)}`, '_blank');
    showToast(' Message envoyé via WhatsApp !');

    // Vider le formulaire
    document.getElementById('formName').value    = '';
    document.getElementById('formEmail').value   = '';
    document.getElementById('formPhone').value   = '';
    document.getElementById('formMessage').value = '';
}

// ── Init ───────────────────────────────────────────────────
updateCartUI();