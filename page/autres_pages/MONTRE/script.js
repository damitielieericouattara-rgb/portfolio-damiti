/* ============================================================
   Montre — Script
   ============================================================ */

const html       = document.documentElement;
const themeBtn   = document.getElementById('themeToggle');
const toggleIcon = document.getElementById('toggle-icon');
const hourEl     = document.getElementById('hour-num');
const minEl      = document.getElementById('min-num');
const secEl      = document.getElementById('sec-num');
const dateEl     = document.getElementById('date-display');
const dayBar     = document.getElementById('day-bar');
const pctEl      = document.getElementById('progress-pct');
const tzName     = document.getElementById('tz-name');
const tzOffset   = document.getElementById('tz-offset');
const locText    = document.getElementById('loc-text');

const ringH      = document.getElementById('ring-h');
const ringM      = document.getElementById('ring-m');
const ringS      = document.getElementById('ring-s');

const CIRCUM     = 276.46;

/* ── Thème ─────────────────────────────────────────────── */
const savedTheme = localStorage.getItem('clock-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
toggleIcon.textContent = savedTheme === 'dark' ? '☾' : '☀';

themeBtn.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  const next   = isDark ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  toggleIcon.textContent = isDark ? '☀' : '☾';
  localStorage.setItem('clock-theme', next);
});

/* ── Timezone ───────────────────────────────────────────── */
function updateTimezone() {
  try {
    const tz       = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offsetMin = -new Date().getTimezoneOffset();
    const sign      = offsetMin >= 0 ? '+' : '-';
    const h         = String(Math.floor(Math.abs(offsetMin) / 60)).padStart(2, '0');
    const m         = String(Math.abs(offsetMin) % 60).padStart(2, '0');
    tzName.textContent   = tz;
    tzOffset.textContent = `UTC${sign}${h}:${m}`;
  } catch {
    tzName.textContent   = 'Fuseau local';
    tzOffset.textContent = 'UTC';
  }
}

/* ── Géolocalisation ────────────────────────────────────── */
function fetchLocation(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=fr`;

  fetch(url, { headers: { 'Accept-Language': 'fr' } })
    .then(r => r.json())
    .then(data => {
      const addr    = data.address || {};
      const city    = addr.city || addr.town || addr.village || addr.county || '';
      const country = addr.country || '';
      const parts   = [city, country].filter(Boolean);
      locText.textContent = parts.length ? parts.join(', ') : 'Position obtenue';
    })
    .catch(() => {
      locText.textContent = 'Position obtenue';
    });
}

function initGeolocation() {
  if (!('geolocation' in navigator)) {
    locText.textContent = 'Localisation indisponible';
    return;
  }

  locText.textContent = 'Localisation…';

  navigator.geolocation.getCurrentPosition(
    pos => fetchLocation(pos.coords.latitude, pos.coords.longitude),
    err => {
      // Fallback : IP-based (pas besoin de clé API)
      fetch('https://ipapi.co/json/')
        .then(r => r.json())
        .then(data => {
          const city    = data.city    || '';
          const country = data.country_name || '';
          const parts   = [city, country].filter(Boolean);
          locText.textContent = parts.length ? parts.join(', ') : 'Localisation inconnue';
        })
        .catch(() => { locText.textContent = 'Localisation inconnue'; });
    },
    { timeout: 6000, maximumAge: 300000 }
  );
}

/* ── Date ───────────────────────────────────────────────── */
function updateDate() {
  const now = new Date();
  dateEl.textContent = now.toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });
}

/* ── Ring helper ────────────────────────────────────────── */
function setRing(el, ratio) {
  el.style.strokeDashoffset = CIRCUM - CIRCUM * ratio;
}

/* ── Horloge ────────────────────────────────────────────── */
function pad(n) { return n < 10 ? '0' + n : String(n); }

let prevSec = -1;

function tick() {
  const now  = new Date();
  const h24  = now.getHours();
  const m    = now.getMinutes();
  const s    = now.getSeconds();
  const h12  = h24 % 12 || 12;

  hourEl.textContent = pad(h12);
  minEl.textContent  = pad(m);
  secEl.textContent  = pad(s);

  setRing(ringH, h12 / 12);
  setRing(ringM, m / 60);
  setRing(ringS, s / 60);

  /* Pulse sur les secondes */
  if (s !== prevSec) {
    secEl.classList.remove('pulse');
    void secEl.offsetWidth;
    secEl.classList.add('pulse');
    prevSec = s;
  }

  /* Progression du jour */
  const totalSec = h24 * 3600 + m * 60 + s;
  const pct      = Math.round((totalSec / 86400) * 100);
  dayBar.style.width  = pct + '%';
  pctEl.textContent   = pct + '%';
}

/* ── Init ───────────────────────────────────────────────── */
updateTimezone();
updateDate();
tick();
initGeolocation();

setInterval(tick,       1000);
setInterval(updateDate, 60000);