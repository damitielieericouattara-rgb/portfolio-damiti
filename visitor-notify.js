/* ============================================================
   VISITOR NOTIFY — Notification Email à chaque visite
   Service : EmailJS (gratuit, 200 emails/mois)

   ✏️  CONFIGURATION (5 minutes) :

   1. Va sur https://www.emailjs.com et crée un compte gratuit
   2. "Add New Service" → choisis Gmail → connecte ton Gmail
      → copie le SERVICE_ID (ex: 'service_abc123')
   3. "Create New Template" → copie le TEMPLATE_ID (ex: 'template_xyz456')
      Dans le template, utilise ces variables :
         {{sujet}}  {{heure}}  {{date}}  {{langue}}
         {{ecran}}  {{os}}  {{referrer}}  {{page}}
   4. "Account" → API Keys → copie ton PUBLIC_KEY (ex: 'AbCdEfGhIjKlMn')
   5. Remplis les 4 variables ci-dessous
   ============================================================ */

(function () {
    'use strict';

    /* ── ✏️  MODIFIE CES 4 VALEURS ── */
    const SERVICE_ID   = 'service_gjk5upd';    // ex: 'service_abc123'
    const TEMPLATE_ID  = 'template_rvhr1ib';   // ex: 'template_xyz456'
    const PUBLIC_KEY   = 'AwrDbSF0ajmNoD8A-';    // ex: 'AbCdEfGhIjKlMn'
    const EMAIL_DEST   = 'damitielieericouattara@gmail.com'; // ton adresse email
    const COOLDOWN_MINUTES = 20;

    /* ─────────────────────────────────────────────────────────
       Anti-spam
    ───────────────────────────────────────────────────────── */
    function shouldNotify() {
        try {
            const last = localStorage.getItem('pf_visit_ts');
            if (!last) return true;
            return (Date.now() - parseInt(last)) / 60000 >= COOLDOWN_MINUTES;
        } catch(e) { return true; }
    }

    /* ─────────────────────────────────────────────────────────
       Infos visiteur
    ───────────────────────────────────────────────────────── */
    function getVisitorInfo() {
        const now = new Date();
        return {
            sujet    : '👁️ Nouveau visiteur sur ton Portfolio !',
            heure    : now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            date     : now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
            langue   : navigator.language || '?',
            ecran    : screen.width + 'x' + screen.height,
            os       : navigator.platform || '?',
            referrer : document.referrer
                        ? document.referrer.replace(/^https?:\/\/(www\.)?/,'').split('/')[0]
                        : 'Accès direct',
            page     : window.location.href,
            email_to : EMAIL_DEST
        };
    }

    /* ─────────────────────────────────────────────────────────
       Envoi via EmailJS
    ───────────────────────────────────────────────────────── */
    function sendNotification() {
        if (SERVICE_ID === 'VOTRE_SERVICE_ID') {
            console.warn('[Portfolio Notify] Configure EmailJS dans visitor-notify.js');
            return;
        }
        if (!shouldNotify()) return;

        /* Charger le SDK EmailJS dynamiquement */
        var script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
        script.onload = function () {
            emailjs.init(PUBLIC_KEY);
            emailjs.send(SERVICE_ID, TEMPLATE_ID, getVisitorInfo())
                .then(function () {
                    try { localStorage.setItem('pf_visit_ts', Date.now().toString()); } catch(e) {}
                })
                .catch(function () {});
        };
        document.head.appendChild(script);
    }

    /* ─────────────────────────────────────────────────────────
       Lancement — 3s après le chargement
    ───────────────────────────────────────────────────────── */
    function init() {
        setTimeout(sendNotification, 3000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();