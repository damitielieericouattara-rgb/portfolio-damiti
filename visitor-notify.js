/* ============================================================
   VISITOR NOTIFY — Notification Email à chaque visite
   Service : EmailJS
   ============================================================ */

(function () {
    'use strict';

    const SERVICE_ID       = 'service_gjk5upd';
    const TEMPLATE_ID      = 'template_rvhr1ib';
    const PUBLIC_KEY       = 'AwrDbSF0ajmNoD8A-';
    const EMAIL_DEST       = 'damitielieericouattara@gmail.com';
    const COOLDOWN_MINUTES = 20;

    function shouldNotify() {
        try {
            const last = localStorage.getItem('pf_visit_ts');
            if (!last) return true;
            return (Date.now() - parseInt(last)) / 60000 >= COOLDOWN_MINUTES;
        } catch(e) { return true; }
    }

    function getVisitorInfo() {
        const now = new Date();
        const heure  = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        const date   = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
        const langue = navigator.language || '?';
        const ecran  = screen.width + 'x' + screen.height;
        const os     = navigator.platform || '?';
        const referrer = document.referrer
            ? document.referrer.replace(/^https?:\/\/(www\.)?/,'').split('/')[0]
            : 'Acces direct';
        const page = window.location.href;

        return {
            to_email : EMAIL_DEST,
            subject  : 'Nouveau visiteur sur ton Portfolio !',
            heure    : heure,
            date     : date,
            langue   : langue,
            ecran    : ecran,
            os       : os,
            referrer : referrer,
            page     : page
        };
    }

    function sendNotification() {
        if (!shouldNotify()) return;

        var script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
        script.onload = function () {
            emailjs.init(PUBLIC_KEY);
            emailjs.send(SERVICE_ID, TEMPLATE_ID, getVisitorInfo())
                .then(function () {
                    console.log('[Portfolio Notify] Email envoye !');
                    try { localStorage.setItem('pf_visit_ts', Date.now().toString()); } catch(e) {}
                })
                .catch(function (err) {
                    console.error('[Portfolio Notify] Erreur :', JSON.stringify(err));
                });
        };
        script.onerror = function() {
            console.error('[Portfolio Notify] Impossible de charger EmailJS');
        };
        document.head.appendChild(script);
    }

    function init() {
        setTimeout(sendNotification, 3000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();