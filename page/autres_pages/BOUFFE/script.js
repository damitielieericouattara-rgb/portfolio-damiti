let menu =  document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{

    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () =>{

    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

document.querySelector('#search-icon').onclick = () =>{

    document.querySelector('#search-form').classList.toggle('active');
}

document.querySelector('#close').onclick = () =>{

    document.querySelector('#search-form').classList.remove('active');
}



var swiper = new Swiper(".home-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    loop:true,
  });

  // Swiper pour la section Critiques
var swiper2 = new Swiper(".critique-slider", {
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: { delay: 4000, disableOnInteraction: false },
    pagination: { el: ".critique .swiper-pagination", clickable: true },
    loop: true,
});