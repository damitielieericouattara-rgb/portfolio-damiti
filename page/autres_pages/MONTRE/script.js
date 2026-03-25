/* ============================================================
   MONTRE ÉLÉGANTE — Script
   ============================================================ */

const html       = document.documentElement;
const themeBtn   = document.getElementById('themeToggle');
const toggleIcon = document.getElementById('toggle-icon');
const hourEl     = document.getElementById('hour-num');
const minEl      = document.getElementById('min-num');
const secEl      = document.getElementById('sec-num');
const ampmEl     = document.getElementById('am-pm');
const dateEl     = document.getElementById('date-display');
const dayBar     = document.getElementById('day-bar');
const pctEl      = document.getElementById('progress-pct');

/* ── Theme toggle ──────────────────────────────────────── */
themeBtn.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  toggleIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
});

/* ── Locale-aware date label ───────────────────────────── */
function updateDate() {
  const now = new Date();
  dateEl.textContent = now.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

/* ── Clock tick ────────────────────────────────────────── */
function pad(n) { return n < 10 ? '0' + n : String(n); }

function tick() {
  const now  = new Date();
  let h      = now.getHours();
  const m    = now.getMinutes();
  const s    = now.getSeconds();

  const meridiem = h < 12 ? 'AM' : 'PM';
  h = h % 12 || 12;

  hourEl.textContent = pad(h);
  minEl.textContent  = pad(m);
  secEl.textContent  = pad(s);
  ampmEl.textContent = meridiem;

  /* Day progress (seconds elapsed / 86400) */
  const totalSec = now.getHours() * 3600 + m * 60 + s;
  const pct      = Math.round((totalSec / 86400) * 100);
  dayBar.style.width  = pct + '%';
  pctEl.textContent   = pct + '%';
}

/* ── Init ──────────────────────────────────────────────── */
updateDate();
tick();
setInterval(tick, 1000);