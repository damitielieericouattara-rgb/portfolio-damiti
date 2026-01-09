var icone_menu = document.querySelector('#icone_menu');
var menu =  document.querySelector('.bar')
icone_menu.onclick = function(){

     icone_menu.classList.toggle('bx-x');
    
     icone_menu.classList.toggle('active');
     menu.classList.toggle('responsive');
    
    };

    const header = document.querySelector("header");

window.addEventListener("scroll", function(){

    header.classList.toggle("sticky", window.scrollY > 80);
});



    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header div a');


window.onscroll = () => {

    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){

            navLinks.forEach(links => {

                links.classList.remove('active');
                document.querySelector('header div a[href*=' + id + ']').classList.add('active');
            });
        };

    });

    let header = doceument.querySelector('header');
    header.classList.toogle('sticky', window.scrollY > 100);
};