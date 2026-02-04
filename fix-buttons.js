/* ============================================
   CORRECTIF BOUTONS - Assure que tous les boutons sont cliquables
   ============================================ */

(function() {
    'use strict';

    console.log('🔧 Initialisation du correctif des boutons...');

    // Attendre que le DOM soit complètement chargé
    function initButtonFixes() {
        // ============================================
        // CORRECTION 1 : Supprimer les overlays qui bloquent
        // ============================================
        
        // Retirer les éléments qui peuvent bloquer les clics
        const particles = document.querySelector('.particles');
        const imageDecoration = document.querySelector('.image-decoration');
        const techIcons = document.querySelector('.tech-icons');
        
        if (particles) particles.style.pointerEvents = 'none';
        if (imageDecoration) imageDecoration.style.pointerEvents = 'none';
        if (techIcons) techIcons.style.pointerEvents = 'none';

        // ============================================
        // CORRECTION 2 : Forcer le z-index des boutons
        // ============================================
        
        const socialButtons = document.querySelectorAll('.social-btn');
        const actionButtons = document.querySelectorAll('.action-buttons .btn');
        
        [...socialButtons, ...actionButtons].forEach(btn => {
            btn.style.position = 'relative';
            btn.style.zIndex = '9999';
            btn.style.pointerEvents = 'auto';
            btn.style.cursor = 'pointer';
        });

        console.log(`✅ ${socialButtons.length} boutons sociaux corrigés`);
        console.log(`✅ ${actionButtons.length} boutons d'action corrigés`);

        // ============================================
        // CORRECTION 3 : Ajouter des écouteurs de secours
        // ============================================
        
        // Bouton Facebook
        const facebookBtn = document.querySelector('.social-btn.facebook');
        if (facebookBtn) {
            facebookBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔵 Clic Facebook détecté');
                window.open('https://www.facebook.com/profile.php?id=100088974321346', '_blank');
            });
        }

        // Bouton Instagram
        const instagramBtn = document.querySelector('.social-btn.instagram');
        if (instagramBtn) {
            instagramBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('📸 Clic Instagram détecté');
                window.open('https://www.instagram.com/dam_el225/', '_blank');
            });
        }

        // Bouton WhatsApp
        const whatsappBtn = document.querySelector('.social-btn.whatsapp');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('💬 Clic WhatsApp détecté');
                window.open('https://wa.me/2250713188565', '_blank');
            });
        }

        // Bouton Snapchat
        const snapchatBtn = document.querySelector('.social-btn.snapchat');
        if (snapchatBtn) {
            snapchatBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('👻 Clic Snapchat détecté');
                window.open('https://www.snapchat.com/add/dam_el225', '_blank');
            });
        }

        // Bouton Télécharger CV
        const cvBtn = document.querySelector('.btn-primary');
        if (cvBtn && cvBtn.textContent.includes('Télécharger')) {
            cvBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log('📥 Clic Télécharger CV détecté');
                
                // Vérifier si le fichier existe
                const link = document.createElement('a');
                link.href = './document/cv.pdf';
                link.download = 'CV_Ouattara_Damiti.pdf';
                
                // Tester si le fichier existe
                fetch('./document/cv.pdf', { method: 'HEAD' })
                    .then(response => {
                        if (response.ok) {
                            console.log('✅ Fichier CV trouvé, téléchargement...');
                            link.click();
                        } else {
                            console.error('❌ Fichier CV non trouvé !');
                            alert('Le fichier CV n\'est pas disponible. Veuillez placer votre CV dans le dossier "document/cv.pdf"');
                        }
                    })
                    .catch(() => {
                        console.warn('⚠️ Impossible de vérifier le fichier, tentative de téléchargement...');
                        link.click();
                    });
            });
        }

        // Bouton Me Contacter
        const contactBtn = document.querySelector('.btn-contact');
        if (contactBtn) {
            contactBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('📧 Clic Me Contacter détecté');
                
                const contactSection = document.querySelector('#Contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            });
        }

        // ============================================
        // CORRECTION 4 : Indicateur visuel au survol
        // ============================================
        
        [...socialButtons, ...actionButtons].forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
                console.log(`👆 Survol du bouton: ${this.title || this.textContent.trim()}`);
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });

        // ============================================
        // CORRECTION 5 : Test de tous les boutons
        // ============================================
        
        console.log('\n🧪 Test des boutons:');
        console.log('Facebook:', facebookBtn ? '✅' : '❌');
        console.log('Instagram:', instagramBtn ? '✅' : '❌');
        console.log('WhatsApp:', whatsappBtn ? '✅' : '❌');
        console.log('Snapchat:', snapchatBtn ? '✅' : '❌');
        console.log('Télécharger CV:', cvBtn ? '✅' : '❌');
        console.log('Me Contacter:', contactBtn ? '✅' : '❌');
        
        console.log('\n✅ Tous les correctifs appliqués avec succès!');
    }

    // ============================================
    // LANCEMENT
    // ============================================
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initButtonFixes);
    } else {
        initButtonFixes();
    }

    // Réappliquer après un délai pour être sûr
    setTimeout(initButtonFixes, 1000);

})();