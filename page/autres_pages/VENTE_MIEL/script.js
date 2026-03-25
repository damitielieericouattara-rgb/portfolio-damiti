// const header = document.querySelector("header");

// window.addEventListener("scroll", function(){

//     header.classList.toggle("sticky", window.scrollY > 80);
// });

// let menu = document.querySelector('#menu-icon');
// let navlist = document.querySelector('.navlist');


// menu.onclick = () => {

//     menu.classList.toggle('bx-x');
//     navlist.classList.toggle('open');
// };

// window.onscroll = () => {

//     menu.classList.remove('bx-x');
//     navlist.classList.remove('open');
// };

// const sr = ScrollReveal({
//     origin: 'top',
//     distance: '85px',
//     duration: 2500,
//     reset: true 
// })

// sr.reveal ('.home-text',{delay:300});
// sr.reveal ('.home-img',{delay:400});
// sr.reveal ('.container',{delay:400});


// sr.reveal ('.about-img',{});
// sr.reveal ('.about-text',{delay:300});


// sr.reveal ('.middle-text',{});
// sr.reveal ('.row-btn,.shop-content',{delay:300}); 






// Header Sticky
        const header = document.querySelector("header");
        window.addEventListener("scroll", function() {
            header.classList.toggle("sticky", window.scrollY > 80);
        });

        // Mobile Menu Toggle
        let menu = document.querySelector('#menu-icon');
        let navlist = document.querySelector('.navlist');

        menu.onclick = () => {
            menu.classList.toggle('bx-x');
            navlist.classList.toggle('open');
        };

        window.onscroll = () => {
            menu.classList.remove('bx-x');
            navlist.classList.remove('open');
        };

        // Active Nav Links
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navlist a');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // Shopping Cart System
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        function updateCartUI() {
            const cartCount = document.getElementById('cartCount');
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            const cartFooter = document.getElementById('cartFooter');

            cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="empty-cart">
                        <i class='bx bx-cart-alt'></i>
                        <p>Votre panier est vide</p>
                    </div>
                `;
                cartFooter.style.display = 'none';
            } else {
                let total = 0;
                cartItems.innerHTML = cart.map((item, index) => {
                    total += item.price * item.quantity;
                    return `
                        <div class="cart-item">
                            <div class="cart-item-image">🍯</div>
                            <div class="cart-item-info">
                                <h4>${item.name}</h4>
                                <p>${item.price.toLocaleString()} FCFA</p>
                            </div>
                            <div class="cart-item-actions">
                                <div class="cart-item-quantity">
                                    <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                                    <span>${item.quantity}</span>
                                    <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                                </div>
                                <button class="remove-item" onclick="removeFromCart(${index})">Retirer</button>
                            </div>
                        </div>
                    `;
                }).join('');
                cartTotal.textContent = total.toLocaleString() + ' FCFA';
                cartFooter.style.display = 'block';
            }

            localStorage.setItem('cart', JSON.stringify(cart));
        }

        function addToCart(name, price) {
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            updateCartUI();
            
            // Animation feedback
            const cartIcon = document.querySelector('.bx-cart');
            cartIcon.style.transform = 'scale(1.3)';
            setTimeout(() => {
                cartIcon.style.transform = 'scale(1)';
            }, 300);

            // Notification
            alert(`✅ ${name} ajouté au panier !`);
        }

        function updateQuantity(index, change) {
            cart[index].quantity += change;
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }
            updateCartUI();
        }

        function removeFromCart(index) {
            if (confirm('Voulez-vous vraiment retirer cet article ?')) {
                cart.splice(index, 1);
                updateCartUI();
            }
        }

        function toggleCart() {
            document.getElementById('cartModal').classList.toggle('active');
            document.getElementById('cartOverlay').classList.toggle('active');
        }

        function toggleSearch() {
            document.getElementById('searchModal').classList.toggle('active');
            if (document.getElementById('searchModal').classList.contains('active')) {
                document.getElementById('searchInput').focus();
            }
        }

        function checkout() {
            if (cart.length === 0) {
                alert('Votre panier est vide !');
                return;
            }

            let message = `Bonjour, je souhaite commander :\n\n`;
            let total = 0;

            cart.forEach(item => {
                message += `• ${item.name} x${item.quantity} = ${(item.price * item.quantity).toLocaleString()} FCFA\n`;
                total += item.price * item.quantity;
            });

            message += `\n💰 Total: ${total.toLocaleString()} FCFA\n\nMerci !`;

            const whatsappUrl = `https://wa.me/2250713188565?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        }

        function toggleLike(element) {
            element.classList.toggle('liked');
            if (element.classList.contains('liked')) {
                element.classList.remove('bx-heart');
                element.classList.add('bxs-heart');
            } else {
                element.classList.remove('bxs-heart');
                element.classList.add('bx-heart');
            }
        }

        // Search Functionality
        document.getElementById('searchInput').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const products = document.querySelectorAll('.shop-content .row');
            
            products.forEach(product => {
                const productName = product.querySelector('h3').textContent.toLowerCase();
                if (productName.includes(searchTerm)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });

        // Initialize cart on page load
        updateCartUI();

        // Scroll Reveal Animations (simple version)
        window.addEventListener('scroll', () => {
            const reveals = document.querySelectorAll('.container-box, .row, .box');
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < windowHeight - elementVisible) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        });

        // Initial animation setup
        document.querySelectorAll('.container-box, .row, .box').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
        });

























        