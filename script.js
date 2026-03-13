/* ============================================================

   Eduardo Ritter — Portfolio Script
   ─────────────────────────────────
   01. Translations
   02. Language System
   03. Theme System
   04. Custom Cursor
   05. Scroll Progress Bar
   06. Parallax (Hero headline)
   07. Split Text (word reveal)
   08. Counter Animation
   09. Scroll Reveal (Intersection Observer)
   10. Mobile Navigation
   11. Smooth Scroll
   12. Init

   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {


    /* ==========================================================
       01. TRANSLATIONS
       ========================================================== */

    const T = {

        pt: {
            /* Navigation */
            'nav.home':     'Início',
            'nav.about':    'Sobre',
            'nav.services': 'Serviços',
            'nav.contact':  'Contato',

            /* Hero */
            'hero.tag':    'Desenvolvedor &amp; Criativo',
            'hero.sub':    'Criando experiências digitais<br>modernas e impactantes.',
            'hero.cta':    'Vamos Conversar',
            'hero.scroll': 'Rolar',

            /* About */
            'about.title':     'Sobre Mim',
            'about.statement': 'Transformo ideias em interfaces <em>precisas</em>, <em>intencionais</em> e <em>premium</em>.',
            'about.bio':       'Sou um desenvolvedor apaixonado por criar interfaces limpas e com visual premium. Foco sempre na melhor experiência para o usuário — cada detalhe importa.',
            'about.stat1':     'Anos de Experiência',
            'about.stat2':     'Projetos Entregues',
            'about.stat3':     'Dedicação',

            /* Services */
            'services.title':       'Serviços',
            'services.item1.title': 'Design &amp; UI',
            'services.item1.text':  'Interfaces modernas, responsivas e com atenção precisa aos detalhes visuais.',
            'services.item2.title': 'Desenvolvimento',
            'services.item2.text':  'HTML5, CSS3, JavaScript — código limpo, performático e bem estruturado.',
            'services.item3.title': 'Soluções Digitais',
            'services.item3.text':  'Tecnologia eficiente focada em resolver problemas reais com precisão.',

            /* Contact */
            'contact.title':    'Entre em Contato',
            'contact.headline': 'Vamos construir<br>algo excepcional.',
            'contact.sub':      'Disponível para novos projetos.',

            /* Footer */
            'footer.text': '&copy; 2026 — Todos os direitos reservados.',
        },

        en: {
            /* Navigation */
            'nav.home':     'Home',
            'nav.about':    'About',
            'nav.services': 'Services',
            'nav.contact':  'Contact',

            /* Hero */
            'hero.tag':    'Developer &amp; Creative',
            'hero.sub':    'Creating modern and<br>impactful digital experiences.',
            'hero.cta':    "Let's Talk",
            'hero.scroll': 'Scroll',

            /* About */
            'about.title':     'About Me',
            'about.statement': 'Transforming ideas into <em>precise</em>, <em>intentional</em>, and <em>premium</em> interfaces.',
            'about.bio':       "I'm a developer passionate about creating clean and premium interfaces. I always focus on the best user experience — every detail matters.",
            'about.stat1':     'Years of Experience',
            'about.stat2':     'Projects Delivered',
            'about.stat3':     'Dedication',

            /* Services */
            'services.title':       'Services',
            'services.item1.title': 'Design &amp; UI',
            'services.item1.text':  'Modern, responsive interfaces with precise attention to visual detail.',
            'services.item2.title': 'Development',
            'services.item2.text':  'HTML5, CSS3, JavaScript — clean, performant and well-structured code.',
            'services.item3.title': 'Digital Solutions',
            'services.item3.text':  'Efficient technology focused on solving real problems with precision.',

            /* Contact */
            'contact.title':    'Get in Touch',
            'contact.headline': "Let's build<br>something exceptional.",
            'contact.sub':      'Available for new projects.',

            /* Footer */
            'footer.text': '&copy; 2026 — All rights reserved.',
        },

    };


    /* ==========================================================
       02. LANGUAGE SYSTEM
       ========================================================== */

    function detectLang() {
        const stored = localStorage.getItem('lang');
        if (stored) return stored;
        const browser = (navigator.language || 'pt').toLowerCase();
        return browser.startsWith('pt') ? 'pt' : 'en';
    }

    function applyLang(lang) {
        const t = T[lang];
        if (!t) return;

        document.documentElement.setAttribute('data-lang', lang);
        document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');
        localStorage.setItem('lang', lang);

        /* Toggle label shows the OTHER language */
        const label = document.getElementById('langLabel');
        if (label) label.textContent = lang === 'pt' ? 'EN' : 'PT';

        /* Page title */
        document.title = lang === 'pt'
            ? 'Eduardo Ritter — Desenvolvedor & Criativo'
            : 'Eduardo Ritter — Developer & Creative';

        /* Replace every marked element */
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key] !== undefined) {
                el.innerHTML = t[key];
                /* Re-split text elements after language swap */
                if (el.hasAttribute('data-split-text') && el.classList.contains('split-ready')) {
                    el.classList.remove('split-ready');
                    splitText(el);
                }
            }
        });
    }

    document.getElementById('langToggle')?.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-lang') || 'pt';
        applyLang(cur === 'pt' ? 'en' : 'pt');
    });


    /* ==========================================================
       03. THEME SYSTEM
       ========================================================== */

    const mq = window.matchMedia('(prefers-color-scheme: dark)');

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    /* Follow OS changes when user hasn't overridden manually */
    mq.addEventListener('change', e => {
        if (!localStorage.getItem('theme')) applyTheme(e.matches ? 'dark' : 'light');
    });

    document.getElementById('themeToggle')?.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme') || 'dark';
        applyTheme(cur === 'dark' ? 'light' : 'dark');
    });

    /* Seed localStorage on first visit so OS-change listener works correctly */
    if (!localStorage.getItem('theme')) {
        applyTheme(mq.matches ? 'dark' : 'light');
    }


    /* ==========================================================
       04. CUSTOM CURSOR
       ========================================================== */

    const cursorDot  = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    /* Ring lags behind with lerp */
    let ringX = window.innerWidth  / 2;
    let ringY = window.innerHeight / 2;
    let mouseX = ringX;
    let mouseY = ringY;
    function updateCursor() {
        /* Lerp: ring chases mouse at 12% per frame */
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;

        if (cursorDot)  { cursorDot.style.left  = mouseX + 'px'; cursorDot.style.top  = mouseY + 'px'; }
        if (cursorRing) { cursorRing.style.left = ringX  + 'px'; cursorRing.style.top = ringY  + 'px'; }

        requestAnimationFrame(updateCursor);
    }

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        /* Also drive ambient glow via CSS variables */
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    document.addEventListener('mouseleave', () => {
        if (cursorDot)  cursorDot.style.opacity  = '0';
        if (cursorRing) cursorRing.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        if (cursorDot)  cursorDot.style.opacity  = '1';
        if (cursorRing) cursorRing.style.opacity = '0.5';
    });

    requestAnimationFrame(updateCursor);


    /* ==========================================================
       05. SCROLL PROGRESS BAR
       ========================================================== */

    const progressBar = document.getElementById('scrollProgress');

    function updateProgress() {
        if (!progressBar) return;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
        progressBar.style.width = pct + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });


    /* ==========================================================
       06. PARALLAX (Hero headline lines)
       ========================================================== */

    const parallaxLines = document.querySelectorAll('[data-parallax]');

    function updateParallax() {
        const scrollY = window.scrollY;
        parallaxLines.forEach(el => {
            const factor = parseFloat(el.getAttribute('data-parallax')) || 0.1;
            el.style.transform = `translateY(${scrollY * factor}px)`;
        });
    }

    window.addEventListener('scroll', updateParallax, { passive: true });


    /* ==========================================================
       07. SPLIT TEXT (word-by-word reveal)
       ========================================================== */

    function splitText(el) {
        /* Preserve inline HTML tags (like <em>) while splitting words */
        const html = el.innerHTML;

        /* Parse into segments: tags and text nodes */
        const parser = new DOMParser();
        const doc    = parser.parseFromString(`<div>${html}</div>`, 'text/html');
        const root   = doc.querySelector('div');
        let result   = '';

        root.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                /* Split plain text into words */
                const words = node.textContent.split(/(\s+)/);
                words.forEach(part => {
                    if (/\s+/.test(part)) {
                        result += part;
                    } else if (part.length) {
                        result += `<span class="word-wrap"><span class="word-inner">${part}</span></span>`;
                    }
                });
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                /* Keep the tag but wrap its text content too */
                const tag     = node.tagName.toLowerCase();
                const inner   = node.textContent;
                const wrapped = inner.split(/\s+/).filter(Boolean).map(w =>
                    `<span class="word-wrap"><span class="word-inner">${w}</span></span>`
                ).join(' ');
                result += `<${tag}>${wrapped}</${tag}> `;
            }
        });

        el.innerHTML = result;
        el.classList.add('split-ready');
    }

    /* Split all marked elements */
    document.querySelectorAll('[data-split-text]').forEach(el => splitText(el));


    /* ==========================================================
       08. COUNTER ANIMATION
       ========================================================== */

    function animateCounter(el) {
        const target   = parseInt(el.getAttribute('data-value'), 10) || 0;
        const suffix   = el.getAttribute('data-suffix') || '';
        const duration = 1600; /* ms */
        let start      = null;

        function step(ts) {
            if (!start) start = ts;
            const elapsed  = ts - start;
            const progress = Math.min(elapsed / duration, 1);
            /* Ease out cubic */
            const eased    = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }


    /* ==========================================================
       09. SCROLL REVEAL (Intersection Observer)
       ========================================================== */

    /* ─ Sections and items ─ */
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('is-visible');

            /* Trigger counters inside newly visible sections */
            entry.target.querySelectorAll('[data-counter]').forEach(animateCounter);

            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });

    document.querySelectorAll('.reveal-section').forEach(el => revealObserver.observe(el));

    /* ─ Split-text elements (observed individually for precision) ─ */
    const splitObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            splitObserver.unobserve(entry.target);
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('[data-split-text]').forEach(el => splitObserver.observe(el));

    /* ─ Hero fades in immediately (already in view) ─ */
    const hero = document.querySelector('.hero');
    if (hero) {
        requestAnimationFrame(() => {
            hero.style.opacity = '1';
            hero.style.transform = 'none';
        });
    }


    /* ==========================================================
       10. MOBILE NAVIGATION
       ========================================================== */

    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const open = navLinks.classList.toggle('is-open');
            hamburger.classList.toggle('is-open', open);
            hamburger.setAttribute('aria-expanded', String(open));
        });

        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                navLinks.classList.remove('is-open');
                hamburger.classList.remove('is-open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }


    /* ==========================================================
       11. SMOOTH SCROLL
       ========================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });


    /* ==========================================================
       12. INIT
       ========================================================== */

    applyLang(detectLang());

});
