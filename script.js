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
    strings:['Developpeur front-end', 'Etudiant en informatique'],
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

// ============================================
// FORMULAIRE DE CONTACT - CORRIGÉ ET SÉCURISÉ
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById("contactForm");
    
    if (!contactForm) return;

    // Fonction de validation des champs
    const validators = {
        nom: (value) => {
            if (!value || value.trim().length < 2) {
                return "Le nom doit contenir au moins 2 caractères";
            }
            if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) {
                return "Le nom ne doit contenir que des lettres";
            }
            return null;
        },
        
        email: (value) => {
            if (!value || value.trim() === '') {
                return "L'email est requis";
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return "Email invalide";
            }
            return null;
        },
        
        mobile: (value) => {
            if (!value || value.trim() === '') {
                return "Le numéro de téléphone est requis";
            }
            const phoneRegex = /^[0-9]{8,15}$/;
            if (!phoneRegex.test(value.replace(/[\s-]/g, ''))) {
                return "Numéro invalide (8-15 chiffres)";
            }
            return null;
        },
        
        sujet: (value) => {
            if (!value || value.trim().length < 3) {
                return "Le sujet doit contenir au moins 3 caractères";
            }
            return null;
        },
        
        message: (value) => {
            if (!value || value.trim().length < 10) {
                return "Le message doit contenir au moins 10 caractères";
            }
            return null;
        }
    };

    // Fonction pour afficher les erreurs
    const showError = (fieldId, errorMessage) => {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        if (field) {
            field.classList.add('error');
            field.style.borderColor = '#ff4444';
        }
        
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.style.color = '#ff4444';
            errorElement.style.fontSize = '1.2rem';
            errorElement.style.marginTop = '0.5rem';
            errorElement.style.display = 'block';
        }
    };

    // Fonction pour retirer les erreurs
    const clearError = (fieldId) => {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        if (field) {
            field.classList.remove('error');
            field.style.borderColor = '';
        }
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    };

    // Validation en temps réel
    Object.keys(validators).forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', () => {
                const error = validators[fieldId](field.value);
                if (error) {
                    showError(fieldId, error);
                } else {
                    clearError(fieldId);
                }
            });
            
            field.addEventListener('blur', () => {
                const error = validators[fieldId](field.value);
                if (error) {
                    showError(fieldId, error);
                }
            });
        }
    });

    // Soumission du formulaire
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();

        // Nettoyer toutes les erreurs précédentes
        Object.keys(validators).forEach(clearError);

        // Récupérer et nettoyer les valeurs
        const formData = {
            nom: document.getElementById("nom").value.trim(),
            email: document.getElementById("email").value.trim(),
            mobile: document.getElementById("mobile").value.trim().replace(/[\s-]/g, ''),
            sujet: document.getElementById("sujet").value.trim(),
            message: document.getElementById("message").value.trim()
        };

        // Valider tous les champs
        let hasErrors = false;
        Object.keys(validators).forEach(fieldId => {
            const error = validators[fieldId](formData[fieldId]);
            if (error) {
                showError(fieldId, error);
                hasErrors = true;
            }
        });

        // Si erreurs, arrêter la soumission
        if (hasErrors) {
            // Scroll vers le premier champ avec erreur
            const firstError = document.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
            return;
        }

        // Numéro WhatsApp (sécurisé)
        const numero = "2250713188565"; 

        // Créer le message sécurisé
        const text = `Bonjour, je suis ${formData.nom}.
📧 Email : ${formData.email}
📱 Téléphone : ${formData.mobile}
📌 Sujet : ${formData.sujet}
📝 Message : ${formData.message}`;

        // Créer l'URL WhatsApp
        const url = `https://wa.me/${numero}?text=${encodeURIComponent(text)}`;
        
        // Animation de succès
        const submitBtn = contactForm.querySelector('.btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="bx bx-check-circle"></i> Message envoyé !';
        submitBtn.style.background = '#00ff00';
        
        // Ouvrir WhatsApp
        window.open(url, "_blank");
        
        // Reset du formulaire après 2 secondes
        setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
        }, 2000);
    });
});



/**
 * ============================================
 * VALIDATION AVANCÉE DU FORMULAIRE DE CONTACT
 * Version: 2.0 - 100% Sécurisée et Optimisée
 * ============================================
 */

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION
    // ============================================
    
    const CONFIG = {
        whatsappNumber: "2250713188565",
        minNameLength: 2,
        minSubjectLength: 3,
        minMessageLength: 10,
        phoneMinLength: 8,
        phoneMaxLength: 15,
        debounceDelay: 300,
        successDelay: 2000
    };

    // ============================================
    // REGEX DE VALIDATION
    // ============================================
    
    const REGEX = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^[0-9]{8,15}$/,
        name: /^[a-zA-ZÀ-ÿ\s'-]+$/,
        onlyNumbers: /^\d+$/
    };

    // ============================================
    // MESSAGES D'ERREUR PERSONNALISÉS
    // ============================================
    
    const ERROR_MESSAGES = {
        nom: {
            empty: "Le nom est requis",
            tooShort: `Le nom doit contenir au moins ${CONFIG.minNameLength} caractères`,
            invalid: "Le nom ne doit contenir que des lettres, espaces, apostrophes et tirets"
        },
        email: {
            empty: "L'email est requis",
            invalid: "Format d'email invalide (exemple: nom@domaine.com)"
        },
        mobile: {
            empty: "Le numéro de téléphone est requis",
            tooShort: `Le numéro doit contenir au moins ${CONFIG.phoneMinLength} chiffres`,
            tooLong: `Le numéro ne doit pas dépasser ${CONFIG.phoneMaxLength} chiffres`,
            invalid: "Le numéro ne doit contenir que des chiffres"
        },
        sujet: {
            empty: "Le sujet est requis",
            tooShort: `Le sujet doit contenir au moins ${CONFIG.minSubjectLength} caractères`
        },
        message: {
            empty: "Le message est requis",
            tooShort: `Le message doit contenir au moins ${CONFIG.minMessageLength} caractères`
        }
    };

    // ============================================
    // VALIDATEURS
    // ============================================
    
    const validators = {
        nom: (value) => {
            const trimmedValue = value.trim();
            
            if (!trimmedValue) {
                return ERROR_MESSAGES.nom.empty;
            }
            
            if (trimmedValue.length < CONFIG.minNameLength) {
                return ERROR_MESSAGES.nom.tooShort;
            }
            
            if (!REGEX.name.test(trimmedValue)) {
                return ERROR_MESSAGES.nom.invalid;
            }
            
            return null;
        },
        
        email: (value) => {
            const trimmedValue = value.trim();
            
            if (!trimmedValue) {
                return ERROR_MESSAGES.email.empty;
            }
            
            if (!REGEX.email.test(trimmedValue)) {
                return ERROR_MESSAGES.email.invalid;
            }
            
            return null;
        },
        
        mobile: (value) => {
            const cleanValue = value.replace(/[\s-]/g, '');
            
            if (!cleanValue) {
                return ERROR_MESSAGES.mobile.empty;
            }
            
            if (!REGEX.onlyNumbers.test(cleanValue)) {
                return ERROR_MESSAGES.mobile.invalid;
            }
            
            if (cleanValue.length < CONFIG.phoneMinLength) {
                return ERROR_MESSAGES.mobile.tooShort;
            }
            
            if (cleanValue.length > CONFIG.phoneMaxLength) {
                return ERROR_MESSAGES.mobile.tooLong;
            }
            
            return null;
        },
        
        sujet: (value) => {
            const trimmedValue = value.trim();
            
            if (!trimmedValue) {
                return ERROR_MESSAGES.sujet.empty;
            }
            
            if (trimmedValue.length < CONFIG.minSubjectLength) {
                return ERROR_MESSAGES.sujet.tooShort;
            }
            
            return null;
        },
        
        message: (value) => {
            const trimmedValue = value.trim();
            
            if (!trimmedValue) {
                return ERROR_MESSAGES.message.empty;
            }
            
            if (trimmedValue.length < CONFIG.minMessageLength) {
                return ERROR_MESSAGES.message.tooShort;
            }
            
            return null;
        }
    };

    // ============================================
    // FONCTIONS D'AFFICHAGE D'ERREURS
    // ============================================
    
    function showError(fieldId, errorMessage) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        if (field) {
            field.classList.remove('valid');
            field.classList.add('error');
            field.style.borderColor = '#ff4444';
            field.setAttribute('aria-invalid', 'true');
        }
        
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
            errorElement.setAttribute('role', 'alert');
        }
    }

    function clearError(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        if (field) {
            field.classList.remove('error');
            field.classList.add('valid');
            field.style.borderColor = '#00ff00';
            field.setAttribute('aria-invalid', 'false');
        }
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            errorElement.removeAttribute('role');
        }
    }

    function clearAllErrors() {
        Object.keys(validators).forEach(fieldId => {
            const field = document.getElementById(fieldId);
            const errorElement = document.getElementById(`${fieldId}-error`);
            
            if (field) {
                field.classList.remove('error', 'valid');
                field.style.borderColor = '';
                field.removeAttribute('aria-invalid');
            }
            
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
                errorElement.removeAttribute('role');
            }
        });
    }

    // ============================================
    // DEBOUNCE POUR VALIDATION EN TEMPS RÉEL
    // ============================================
    
    function debounce(func, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // ============================================
    // VALIDATION D'UN CHAMP
    // ============================================
    
    function validateField(fieldId, showSuccess = false) {
        const field = document.getElementById(fieldId);
        if (!field) return true;
        
        const error = validators[fieldId](field.value);
        
        if (error) {
            showError(fieldId, error);
            return false;
        } else {
            if (showSuccess) {
                clearError(fieldId);
            } else {
                const errorElement = document.getElementById(`${fieldId}-error`);
                if (field.classList.contains('error')) {
                    clearError(fieldId);
                }
            }
            return true;
        }
    }

    // ============================================
    // CALCUL DE LA PROGRESSION DU FORMULAIRE
    // ============================================
    
    function updateFormProgress() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        let validFields = 0;
        const totalFields = Object.keys(validators).length;
        
        Object.keys(validators).forEach(fieldId => {
            if (validateField(fieldId, false)) {
                validFields++;
            }
        });
        
        const progress = (validFields / totalFields) * 100;
        
        // Mise à jour de la classe de progression
        form.classList.remove('form-25', 'form-50', 'form-75', 'form-100');
        if (progress >= 25 && progress < 50) {
            form.classList.add('form-25');
        } else if (progress >= 50 && progress < 75) {
            form.classList.add('form-50');
        } else if (progress >= 75 && progress < 100) {
            form.classList.add('form-75');
        } else if (progress === 100) {
            form.classList.add('form-100');
        }
    }

    // ============================================
    // SANITISATION DES DONNÉES
    // ============================================
    
    function sanitizeInput(value) {
        return value
            .trim()
            .replace(/[<>]/g, '') // Enlever < et >
            .replace(/[^\w\s@.-]/gi, ''); // Garder seulement alphanumérique, espaces, @, ., -
    }

    function sanitizePhone(value) {
        return value.replace(/[\s-]/g, ''); // Enlever espaces et tirets
    }

    // ============================================
    // CRÉATION DU MESSAGE WHATSAPP
    // ============================================
    
    function createWhatsAppMessage(formData) {
        return `Bonjour, je suis ${formData.nom}.

📧 Email : ${formData.email}
📱 Téléphone : ${formData.mobile}
📌 Sujet : ${formData.sujet}

📝 Message :
${formData.message}`;
    }

    // ============================================
    // GESTION DE L'ÉTAT DU BOUTON
    // ============================================
    
    function setButtonState(button, state) {
        const states = {
            loading: {
                html: '<i class="bx bx-loader-alt bx-spin"></i> Envoi en cours...',
                className: 'loading',
                disabled: true
            },
            success: {
                html: '<i class="bx bx-check-circle"></i> Message envoyé !',
                className: 'success',
                disabled: true
            },
            error: {
                html: '<i class="bx bx-error-circle"></i> Erreur, réessayez',
                className: 'error',
                disabled: false
            },
            default: {
                html: '<i class="bx bx-send"></i> Envoyer le message',
                className: '',
                disabled: false
            }
        };
        
        const config = states[state] || states.default;
        
        button.innerHTML = config.html;
        button.className = 'btn ' + config.className;
        button.disabled = config.disabled;
    }

    // ============================================
    // SCROLL VERS PREMIÈRE ERREUR
    // ============================================
    
    function scrollToFirstError() {
        const firstError = document.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            // Focus avec délai pour que le scroll soit terminé
            setTimeout(() => {
                firstError.focus();
            }, 500);
        }
    }

    // ============================================
    // INITIALISATION
    // ============================================
    
    function initContactForm() {
        const contactForm = document.getElementById("contactForm");
        
        if (!contactForm) {
            console.warn('Formulaire de contact non trouvé');
            return;
        }

        const submitButton = contactForm.querySelector('.btn');
        let originalButtonHTML = '<i class="bx bx-send"></i> Envoyer le message';
        
        if (submitButton) {
            originalButtonHTML = submitButton.innerHTML;
        }

        // ============================================
        // VALIDATION EN TEMPS RÉEL
        // ============================================
        
        Object.keys(validators).forEach(fieldId => {
            const field = document.getElementById(fieldId);
            
            if (field) {
                // Validation debounced lors de la saisie
                const debouncedValidation = debounce(() => {
                    validateField(fieldId, false);
                    updateFormProgress();
                }, CONFIG.debounceDelay);
                
                field.addEventListener('input', debouncedValidation);
                
                // Validation immédiate lors de la perte de focus
                field.addEventListener('blur', () => {
                    validateField(fieldId, true);
                    updateFormProgress();
                });
                
                // Clear error on focus si le champ était en erreur
                field.addEventListener('focus', () => {
                    if (field.classList.contains('error')) {
                        const errorElement = document.getElementById(`${fieldId}-error`);
                        if (errorElement) {
                            errorElement.style.display = 'none';
                        }
                    }
                });
            }
        });

        // ============================================
        // SOUMISSION DU FORMULAIRE
        // ============================================
        
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();

            // Nettoyer toutes les erreurs précédentes
            clearAllErrors();

            // Récupérer et sanitiser les valeurs
            const formData = {
                nom: sanitizeInput(document.getElementById("nom").value),
                email: sanitizeInput(document.getElementById("email").value),
                mobile: sanitizePhone(document.getElementById("mobile").value),
                sujet: sanitizeInput(document.getElementById("sujet").value),
                message: document.getElementById("message").value.trim()
            };

            // Valider tous les champs
            let hasErrors = false;
            Object.keys(validators).forEach(fieldId => {
                if (!validateField(fieldId, true)) {
                    hasErrors = true;
                }
            });

            // Si erreurs, arrêter la soumission
            if (hasErrors) {
                scrollToFirstError();
                return;
            }

            // Protection anti-spam (honeypot)
            const honeypot = document.querySelector('.honeypot input');
            if (honeypot && honeypot.value !== '') {
                console.warn('Spam détecté');
                return;
            }

            // État de chargement
            if (submitButton) {
                setButtonState(submitButton, 'loading');
            }

            // Simuler un délai de traitement (optionnel)
            setTimeout(() => {
                try {
                    // Créer le message WhatsApp
                    const message = createWhatsAppMessage(formData);
                    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
                    
                    // Ouvrir WhatsApp
                    const whatsappWindow = window.open(url, "_blank");
                    
                    if (whatsappWindow) {
                        // Succès
                        if (submitButton) {
                            setButtonState(submitButton, 'success');
                        }
                        
                        // Reset du formulaire après délai
                        setTimeout(() => {
                            contactForm.reset();
                            clearAllErrors();
                            updateFormProgress();
                            
                            if (submitButton) {
                                submitButton.innerHTML = originalButtonHTML;
                                submitButton.className = 'btn';
                                submitButton.disabled = false;
                            }
                        }, CONFIG.successDelay);
                    } else {
                        // Erreur d'ouverture
                        throw new Error('Impossible d\'ouvrir WhatsApp');
                    }
                } catch (error) {
                    console.error('Erreur lors de l\'envoi:', error);
                    
                    if (submitButton) {
                        setButtonState(submitButton, 'error');
                        
                        setTimeout(() => {
                            submitButton.innerHTML = originalButtonHTML;
                            submitButton.className = 'btn';
                            submitButton.disabled = false;
                        }, 3000);
                    }
                }
            }, 800); // Délai pour montrer l'état de chargement
        });

        // ============================================
        // EMPÊCHER LA SOUMISSION PAR ENTRÉE SUR INPUTS
        // ============================================
        
        const inputs = contactForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    
                    // Passer au champ suivant
                    const formElements = Array.from(contactForm.elements);
                    const currentIndex = formElements.indexOf(input);
                    const nextElement = formElements[currentIndex + 1];
                    
                    if (nextElement && nextElement.tagName !== 'BUTTON') {
                        nextElement.focus();
                    }
                }
            });
        });

        // ============================================
        // COPIER EMAIL AU CLIC
        // ============================================
        
        const emailLinks = document.querySelectorAll('.info-card a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const email = link.textContent;
                
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(email).then(() => {
                        // Feedback visuel
                        const originalText = link.textContent;
                        link.textContent = '✓ Copié !';
                        link.style.color = '#00ff00';
                        
                        setTimeout(() => {
                            link.textContent = originalText;
                            link.style.color = '';
                        }, 2000);
                    });
                } else {
                    // Fallback pour anciens navigateurs
                    window.location.href = `mailto:${email}`;
                }
            });
        });

        console.log('✅ Formulaire de contact initialisé avec succès');
    }

    // ============================================
    // LANCEMENT AU CHARGEMENT DU DOM
    // ============================================
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContactForm);
    } else {
        initContactForm();
    }

})();