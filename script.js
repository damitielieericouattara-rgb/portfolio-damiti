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

    let header = doceument.querySelector('header');
    header.classList.toogle('sticky', window.scrollY > 100);
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

    strings:['Developpeur Fullstack', 'Web Designer', 'Etudiant en informatique'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

const circles = document.querySelectorAll('.circle');
circles.forEach(elem=>{

    var dots =  elem.getAttribute("data-dots");
    var marked =  elem.getAttribute("data-percent");
    var percent =  Math.floor(dots*marked/100);
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

// document.getElementById("openModal").addEventListener("click", function(){
//     document.getElementById("modal").style.display="block";
// });

// document.getElementById(".close").addEventListener("click", function(){
//     document.getElementById("modal").style.display="none";
// });

// window.onclick = function(event){
//     let modal = document.getElementById("modal");
//     if(event.target === modal){
//         modal.style.display = "none";
//     }
// };



// function contactService(service) {
//     alert(`Merci pour votre intérêt pour le service "${service}".\nVous allez être redirigé vers la page de contact.`);
//     window.location.href = "./index_portfolio.html#Contact";
// }

// Animation au scroll
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");

    const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < triggerBottom) {
        section.classList.add("visible");
    }
    });
};

  // Lancer au chargement
revealOnScroll();

  // Lancer au scroll
window.addEventListener("scroll", revealOnScroll);
});





document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // Récupération des champs
    let nom = document.getElementById("nom").value.trim();
    let email = document.getElementById("email").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let sujet = document.getElementById("sujet").value.trim();
    let message = document.getElementById("message").value.trim();

    // ⚠️ Mets ton numéro WhatsApp ici en format international (ex: 2250700000000)
    let numero = "2250713188565"; 

    // Vérification si tous les champs sont remplis
    if (!nom || !email || !mobile || !sujet || !message) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    // Message formaté
    let text = `Bonjour, je suis ${nom}.
📧 Email : ${email}
📱 Téléphone : ${mobile}
📌 Sujet : ${sujet}
📝 Message : ${message}`;

    // Redirection vers WhatsApp
    let url = `https://wa.me/${2250713188565}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    });