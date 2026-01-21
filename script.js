/*pour l'icon de navbar*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () =>{
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Animation au scroll - Déclenche les animations dans les deux sens
    revealOnScroll();
};

ScrollReveal({
    reset:true,
    distance:'80px',    
    duration:2000,
    delay:200
});

ScrollReveal().reveal('.home-content, .heading', { origin:'top'});
ScrollReveal().reveal('.home-image, .services-container, .portfolio-box, .contact form', { origin:'bottom'});
ScrollReveal().reveal('.home-content h1, .about-img', { origin:'left'});
ScrollReveal().reveal('.home-content p, .about-content', { origin:'right'});

const typed = new Typed('.multiple-text', {
    strings:['Developpeur Fullstack', 'Etudiant en informatique'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

const circles = document.querySelectorAll('.circle');
circles.forEach(elem=>{
    var dots = elem.getAttribute("data-dots");
    var marked = elem.getAttribute("data-percent");
    var percent = Math.floor(dots*marked/100);
    var points = "";
    var rotate = 360 / dots;

    for(let i = 0 ; i < dots ; i++){
        points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`
    }

    elem.innerHTML = points;

    const pointsMarked = elem.querySelectorAll('.points');
    for(let i = 0; i<percent ; i++){
        pointsMarked[i].classList.add('marked');
    }
})  

// ============================================
// Animation au scroll - AMÉLIORÉE (bidirectionnelle)
// ============================================
const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    const triggerTop = window.innerHeight * 0.15; // Nouveau seuil pour le scroll vers le haut
    
    const allSections = document.querySelectorAll("section");

    allSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;
        
        // Ajouter la classe visible quand la section entre dans la vue (du bas ou du haut)
        if (sectionTop < triggerBottom && sectionBottom > triggerTop) {
            section.classList.add("visible");
        }
        // Retirer la classe quand la section sort complètement de la vue
        else {
            section.classList.remove("visible");
        }
    });

    // Animation spéciale pour le footer - CORRIGÉE
    const footer = document.querySelector('.footer');
    if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        const footerBottom = footer.getBoundingClientRect().bottom;
        
        // Le footer devient visible quand il entre dans la vue
        if (footerTop < triggerBottom && footerBottom > 0) {
            footer.classList.add("visible");
        } else {
            footer.classList.remove("visible");
        }
    }
};

// Lancer au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    revealOnScroll();
    
    // Ajouter visible à la section accueil immédiatement
    const accueilSection = document.querySelector('.acceuil');
    if(accueilSection) {
        accueilSection.classList.add('visible');
    }
});

// Lancer au scroll
window.addEventListener("scroll", revealOnScroll);

// Animation supplémentaire pour les éléments au scroll - AMÉLIORÉE
const observerOptions = {
    threshold: 0.15, // Augmenté pour une meilleure détection
    rootMargin: '0px 0px -50px 0px' // Réduit pour déclencher plus tôt
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            // Retirer la classe quand l'élément sort de la vue
            entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

// Observer toutes les sections ET le footer
document.addEventListener('DOMContentLoaded', () => {
    const sectionsToObserve = document.querySelectorAll('section');
    sectionsToObserve.forEach(section => {
        observer.observe(section);
    });
    
    // Observer spécifiquement le footer
    const footer = document.querySelector('.footer');
    if (footer) {
        observer.observe(footer);
    }
});

// Formulaire de contact WhatsApp
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let nom = document.getElementById("nom").value.trim();
    let email = document.getElementById("email").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let sujet = document.getElementById("sujet").value.trim();
    let message = document.getElementById("message").value.trim();

    let numero = "2250713188565"; 

    if (!nom || !email || !mobile || !sujet || !message) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    let text = `Bonjour, je suis ${nom}.
📧 Email : ${email}
📱 Téléphone : ${mobile}
📌 Sujet : ${sujet}
📝 Message : ${message}`;

    let url = `https://wa.me/${numero}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
});