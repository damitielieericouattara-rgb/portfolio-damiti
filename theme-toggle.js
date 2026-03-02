/* ============================================
   THEME TOGGLE - Mode Sombre / Clair
   ============================================ */

(function () {
    'use strict';

    // ── Injecter le bouton toggle dans le DOM ──
    function injectToggleButton() {
        const btn = document.createElement('button');
        btn.className = 'theme-toggle';
        btn.setAttribute('aria-label', 'Basculer le mode clair/sombre');
        btn.setAttribute('title', 'Changer le thème');
        btn.innerHTML = `
            <i class='bx bx-moon icon-moon'></i>
            <i class='bx bx-sun icon-sun'></i>
        `;
        document.body.appendChild(btn);
        return btn;
    }

    // ── Appliquer le thème ──
    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
        localStorage.setItem('portfolio-theme', theme);
    }

    // ── Initialiser ──
    function initThemeToggle() {
        const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
        applyTheme(savedTheme);

        const btn = injectToggleButton();

        btn.addEventListener('click', function () {
            const isLight = document.body.classList.contains('light-mode');
            applyTheme(isLight ? 'dark' : 'light');

            // Micro-animation de feedback
            btn.style.transform = 'scale(0.85) rotate(20deg)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 200);
        });
    }

    // ── Lancement ──
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThemeToggle);
    } else {
        initThemeToggle();
    }
})();