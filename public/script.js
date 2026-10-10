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
  themeToggle.setAttribute('aria-label', isDark ? (root.lang === 'en' ? 'Switch to light theme' : 'Ativar tema claro') : (root.lang === 'en' ? 'Switch to dark theme' : 'Ativar tema escuro'));
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
  menuToggle.setAttribute('aria-label', open ? (root.lang === 'en' ? 'Close menu' : 'Fechar menu') : (root.lang === 'en' ? 'Open menu' : 'Abrir menu'));
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


/* PORTUGUÊS / INGLÊS
   As versões PT-BR originais estão no HTML.
   As traduções estáticas em EN ficam neste dicionário — sem API externa.
*/
const enTranslations = {
  "skip": "Skip to content",
  "brand-aria": "Carlos Westfal, home",
  "nav-about": "About",
  "nav-skills": "Tech stack",
  "nav-projects": "Projects",
  "nav-contact": "Contact",
  "header-cta": "Let’s talk <span aria-hidden=\"true\">↗</span>",
  "theme-tooltip": "Change theme",
  "hero-eyebrow": "<span class=\"eyebrow-dot\" aria-hidden=\"true\"></span> BACK-END, WEB & DIGITAL SOLUTIONS",
  "hero-title": "Turning ideas into <span class=\"text-accent\">digital solutions.</span>",
  "hero-lead": "Hi, I’m <strong>Carlos Westfal</strong>. I work in technical support and back-end development, combining logic, organization and creativity to solve real-world problems.",
  "hero-projects": "Explore projects <span aria-hidden=\"true\">↗</span>",
  "hero-github": "My GitHub <span aria-hidden=\"true\">↗</span>",
  "hero-footnote": "<span class=\"line\" aria-hidden=\"true\"></span> Real projects. Continuous learning.",
  "terminal-label": "Illustrative terminal showing my profile and technologies",
  "terminal-bottom": "<span class=\"status-light\" aria-hidden=\"true\"></span> Always building something new <span>01 / 03</span>",
  "about-kicker": "01 <span>/</span> ABOUT ME",
  "about-title": "Curious to learn. <span class=\"text-accent\">Driven to build.</span>",
  "about-one": "I have a technical degree in Systems Development and professional experience in technical support and back-end development. My day-to-day work involves investigating issues, working with data and improving solutions.",
  "about-two": "I also study web development and build personal projects to put concepts into practice — with a focus on clean organization, accessibility and performance.",
  "about-highlight-one": "Hands-on experience",
  "about-highlight-one-detail": "Support, back-end & data",
  "about-highlight-two": "Continuous learning",
  "about-highlight-two-detail": "PHP, Laravel & fundamentals",
  "skills-kicker": "02 <span>/</span> TECHNOLOGIES",
  "skills-title": "Tools that are part of my journey<span class=\"text-accent\">.</span>",
  "skills-description": "Technologies I use, practice or am currently learning. Each has a role in my growth.",
  "skills-professional": "Development & data",
  "skills-professional-description": "Professional experience & projects",
  "skills-learning": "Web & learning",
  "skills-learning-description": "Building and sharpening my skills",
  "laravel-study": "Laravel · learning",
  "python-study": "Python · fundamentals",
  "projects-kicker": "03 <span>/</span> PROJECTS",
  "projects-title": "Projects, experiments and ideas in progress<span class=\"text-accent\">.</span>",
  "projects-description": "A few projects that reflect my learning journey and how I approach my work.",
  "project-one-category": "PERSONAL PROJECT",
  "project-one-status": "<i></i> Live",
  "project-one-title": "My portfolio",
  "project-one-desc": "A space to share my journey and projects, with light/dark themes, responsive design and automated deployment.",
  "project-one-view": "View project ↗",
  "project-one-code": "Source code ↗",
  "project-two-category": "LEARNING",
  "project-two-status": "Private",
  "project-two-title": "Alura Studies",
  "project-two-desc": "A private repository of course exercises and projects, organized by learning area.",
  "project-two-stack": "<span>Git</span><span>Logic</span><span>Learning</span>",
  "project-two-private": "🔒 Private repository",
  "project-two-private-aria": "Private repository, no public link",
  "project-three-category": "UPCOMING PROJECTS",
  "project-three-status": "Planning",
  "project-three-title": "Landing pages",
  "project-three-desc": "Web pages for small businesses, designed to showcase their services clearly, quickly and professionally.",
  "project-three-future": "More coming soon",
  "contact-kicker": "04 <span>/</span> CONTACT",
  "contact-title": "Great ideas deserve to <span>come to life.</span>",
  "contact-desc": "I work in software development and I’m open to discussing landing pages and web projects for small businesses. Have a project in mind?",
  "contact-email-cta": "Send an email <span aria-hidden=\"true\">↗</span>",
  "contact-github-cta": "View my GitHub <span aria-hidden=\"true\">↗</span>",
  "contact-email-label": "My email",
  "footer-copy": "© <span id=\"year\">2026</span> Carlos Westfal · Built with code and curiosity.",
  "footer-back": "Back to top ↑",
  "language-group": "Site language",
  "terminal-learning-command": "cat learning.txt",
  "preview-portfolio": "Ideas into <em>code.</em>",
  "preview-landing": "Design that<br><em>connects.</em>"
};
const originalHtml = new Map();
const originalAria = new Map();
const originalTitles = new Map();
const translatables = document.querySelectorAll('[data-i18n]');
const accessibleTranslatables = document.querySelectorAll('[data-i18n-aria]');
const titleTranslatables = document.querySelectorAll('[data-i18n-title]');
translatables.forEach(el => originalHtml.set(el, el.innerHTML));
accessibleTranslatables.forEach(el => originalAria.set(el, el.getAttribute('aria-label')));
titleTranslatables.forEach(el => originalTitles.set(el, el.getAttribute('title')));

const defaultMeta = {
  title: document.title,
  description: document.querySelector('meta[name="description"]')?.content,
  ogTitle: document.querySelector('meta[property="og:title"]')?.content,
  ogDescription: document.querySelector('meta[property="og:description"]')?.content
};
const languageButtons = document.querySelectorAll('.language-option');

function setLanguage(language) {
  const isEnglish = language === 'en';
  const nextLanguage = isEnglish ? 'en' : 'pt-BR';
  root.lang = nextLanguage;
  root.dataset.language = nextLanguage;

  translatables.forEach(el => {
    const key = el.dataset.i18n;
    // Only HTML authored inside this local script is inserted here.
    el.innerHTML = isEnglish ? enTranslations[key] : originalHtml.get(el);
  });
  accessibleTranslatables.forEach(el => {
    const key = el.dataset.i18nAria;
    el.setAttribute('aria-label', isEnglish ? enTranslations[key] : originalAria.get(el));
  });
  titleTranslatables.forEach(el => {
    const key = el.dataset.i18nTitle;
    el.setAttribute('title', isEnglish ? enTranslations[key] : originalTitles.get(el));
  });

  languageButtons.forEach(button => {
    const active = button.dataset.lang === nextLanguage;
    button.setAttribute('aria-pressed', String(active));
    button.classList.toggle('is-active', active);
  });

  document.title = isEnglish
    ? 'Carlos Westfal — Back-end & Web Developer'
    : defaultMeta.title;
  const desc = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDesc = document.querySelector('meta[property="og:description"]');
  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (desc) desc.content = isEnglish
    ? 'Carlos Westfal — back-end developer and web developer. Projects, technologies and digital solutions.'
    : defaultMeta.description;
  if (ogTitle) ogTitle.content = isEnglish ? document.title : defaultMeta.ogTitle;
  if (ogDesc) ogDesc.content = isEnglish
    ? 'Back-end development, web experiences and projects built with purpose.'
    : defaultMeta.ogDescription;
  if (ogLocale) ogLocale.content = isEnglish ? 'en_US' : 'pt_BR';

  // Labels of the theme and mobile-menu buttons also follow the chosen language.
  setTheme(root.dataset.theme);
  setMenuOpen(siteNav.classList.contains('is-open'));
  // The year span is rebuilt when translating the footer.
  document.querySelector('#year').textContent = String(new Date().getFullYear());
}

languageButtons.forEach(button => {
  button.addEventListener('click', () => {
    setLanguage(button.dataset.lang);
    try { localStorage.setItem('cw-language', root.lang); } catch (_) {}
  });
});

let savedLanguage = 'pt-BR';
try {
  const saved = localStorage.getItem('cw-language');
  if (saved === 'en' || saved === 'pt-BR') savedLanguage = saved;
} catch (_) {}
setLanguage(savedLanguage);
