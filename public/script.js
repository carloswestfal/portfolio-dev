/* Carlos Westfal — interações sem dependências */

const root = document.documentElement;
const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = document.querySelector('#theme-icon');
const menuToggle = document.querySelector('#menu-toggle');
const siteNav = document.querySelector('#site-nav');
const year = document.querySelector('#year');

function setTheme(theme) {
  const isDark = theme === 'dark';
  root.dataset.theme = isDark ? 'dark' : 'light';
  themeIcon.textContent = isDark ? '☀' : '☾';
  themeToggle.setAttribute('aria-label', isDark ? 'Ativar tema claro' : 'Ativar tema escuro');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#080e1a' : '#f6f9ff');
}

setTheme(root.dataset.theme);

themeToggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(next);
  try { localStorage.setItem('cw-theme', next); } catch (_) { /* O site funciona mesmo sem armazenamento */ }
});

function setMenuOpen(open) {
  siteNav.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
}

menuToggle.addEventListener('click', () => setMenuOpen(!siteNav.classList.contains('is-open')));
siteNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && siteNav.classList.contains('is-open')) {
    setMenuOpen(false);
    menuToggle.focus();
  }
});
document.addEventListener('click', event => {
  if (siteNav.classList.contains('is-open') && !siteNav.contains(event.target) && !menuToggle.contains(event.target)) {
    setMenuOpen(false);
  }
});
window.matchMedia('(min-width: 821px)').addEventListener('change', event => {
  if (event.matches) setMenuOpen(false);
});

year.textContent = String(new Date().getFullYear());

/* Reveal discreto. Conteúdo permanece visível se JavaScript ou IntersectionObserver falharem. */
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reducedMotion) {
  const elements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -55px 0px', threshold: 0.06 });
  elements.forEach(el => observer.observe(el));
  root.classList.add('reveal-ready');
}
