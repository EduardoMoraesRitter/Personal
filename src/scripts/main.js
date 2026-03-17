/* ============================================================

   Eduardo Ritter — Portfolio Script
   ─────────────────────────────────
   01. Translations
   02. Language System
   03. Theme System
   04. Scroll Progress Bar
   05. Scroll Reveal (Intersection Observer)
   06. Counter Animation
   07. Mobile Navigation
   08. Smooth Scroll
   09. Init

   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {


    /* ==========================================================
       01. TRANSLATIONS
       ========================================================== */

    const T = {

        pt: {
            'nav.home': 'Início',
            'nav.about': 'Sobre',
            'nav.services': 'Jornada',
            'nav.recognition': 'Impacto',
            'nav.expertise': 'Expertise',
            'nav.contact': 'Contato',
            'hero.tag': 'Staff AI Engineer &amp; Global NASA Winner',
            'hero.sub': 'Projetando o futuro com IA Generativa<br>e arquiteturas escaláveis.',
            'hero.cta': 'Vamos Conversar',
            'hero.scroll': 'Rolar',
            'about.title': 'Sobre Mim',
            'about.statement': 'Transformo complexidade técnica em <em>impacto real</em> com IA.',
            'about.bio': 'Sou Staff AI Engineer com mais de 15 anos de experiência projetando sistemas de alta escala. Vencedor Global do NASA Space Apps Challenge e reconhecido pela IBM como um dos Top 50 Inovadores em IA do Brasil, combino visão de produto com engenharia profunda para criar soluções que transformam indústrias.',
            'about.stat1': 'Anos de Experiência',
            'about.stat2': 'Prêmio Global NASA',
            'about.stat3': 'Top 50 AI IBM',
            'services.title': 'Expertise',
            'services.item1.title': 'Engenharia de IA &amp; LLMs',
            'services.item1.text': 'Arquiteturas de RAG, Agentes Autônomos e Prompt Engineering avançado com GPT-4 e Gemini.',
            'services.item2.title': 'Arquitetura de Sistemas',
            'services.item2.text': 'Sistemas distribuídos, Cloud (GCP/AWS) e pipelines de dados escaláveis para milhões de usuários.',
            'services.item3.title': 'Inovação de Produto',
            'services.item3.text': 'Liderança técnica focada em resultados de negócio, como o aumento de 70% em conversão na Contabilizei.',
            'experience.title': 'Jornada',
            'experience.job1.title': 'Staff AI Engineer @ Contabilizei',
            'experience.job1.date': '2024 — Presente',
            'experience.job2.title': 'Head of AI @ BrandLovrs',
            'experience.job2.date': '2023 — 2024',
            'experience.job3.title': 'Senior Data Scientist @ XP Inc.',
            'experience.job3.date': '2021 — 2023',
            'recognition.title': 'Impacto & Mídia',
            'recognition.nasa.title': 'NASA Space Apps Global Winner',
            'recognition.nasa.text': 'Vencedor mundial com o projeto Poseidon, uma solução de IA que utiliza Redes Neurais Convolucionais (Deep Learning) e imagens de satélite do tipo SAR (Radar de Abertura Sintética) para identificar manchas de óleo nos oceanos mesmo através de nuvens ou à noite. Desenvolvido em resposta ao desastre ambiental de 2019 no Brasil, o sistema automatiza o monitoramento marítimo global, reduzindo drasticamente o tempo de resposta para mitigar impactos ecológicos e econômicos.',
            'recognition.ibm.title': 'C0D3RS Championship',
            'recognition.ibm.text': 'Finalista representando o Brasil na minissérie exclusiva da IBM e Prime Video. Uma competição épica entre os melhores desenvolvedores da América Latina, utilizando IBM Cloud e IA para resolver problemas reais da sociedade em um formato de reality show tecnológico.',
            'recognition.media.title': 'Talks & Podcast',
            'recognition.media.text': 'Discussões na Alura, Brazil Journal e outros canais sobre IA aplicada ao ambiente e tecnologia de ponta.',
            'recognition.talk.title': 'Jornada até a NASA',
            'recognition.talk.text': 'Palestra completa no EducaXperience sobre tecnologia, inovação e os bastidores da vitória global.',
            'recognition.media.video2.title': 'Inovação na Prática',
            'recognition.media.video2.text': 'Entrevista técnica e insights sobre o desenvolvimento de produtos digitais e o ecossistema de tecnologia.',
            'contact.title': 'Entre em Contato',
            'contact.headline': 'Vamos construir<br>o próximo nível.',
            'contact.sub': 'Disponível para parcerias e projetos de alto impacto.',
            'experience.cv': 'Ver Currículo Completo (PDF)',
            'footer.text': '&copy; 2026 — Eduardo Moraes Ritter. Todos os direitos reservados.',
        },

        en: {
            'nav.home': 'Home',
            'nav.about': 'About',
            'nav.services': 'Journey',
            'nav.recognition': 'Impact',
            'nav.expertise': 'Expertise',
            'nav.contact': 'Contact',
            'hero.tag': 'Staff AI Engineer &amp; Global NASA Winner',
            'hero.sub': 'Designing the future with Generative AI<br>and scalable architectures.',
            'hero.cta': "Let's Talk",
            'hero.scroll': 'Scroll',
            'about.title': 'About Me',
            'about.statement': 'Transforming technical complexity into <em>real impact</em> with AI.',
            'about.bio': "I'm a Staff AI Engineer with over 15 years of experience designing high-scale systems. Global Winner of the NASA Space Apps Challenge and recognized by IBM as one of the Top 50 AI Innovators in Brazil, I combine product vision with deep engineering to create solutions that transform industries.",
            'about.stat1': 'Years of Experience',
            'about.stat2': 'NASA Global Award',
            'about.stat3': 'Top 50 AI IBM',
            'services.title': 'Expertise',
            'services.item1.title': 'AI Engineering &amp; LLMs',
            'services.item1.text': 'RAG architectures, Autonomous Agents, and advanced Prompt Engineering with GPT-4 and Gemini.',
            'services.item2.title': 'System Architecture',
            'services.item2.text': 'Distributed systems, Cloud (GCP/AWS), and scalable data pipelines for millions of users.',
            'services.item3.title': 'Product Innovation',
            'services.item3.text': 'Technical leadership focused on business results, such as the 70% conversion increase at Contabilizei.',
            'experience.title': 'Journey',
            'experience.job1.title': 'Staff AI Engineer @ Contabilizei',
            'experience.job1.date': '2024 — Present',
            'experience.job2.title': 'Head of AI @ BrandLovrs',
            'experience.job2.date': '2023 — 2024',
            'experience.job3.title': 'Senior Data Scientist @ XP Inc.',
            'experience.job3.date': '2021 — 2023',
            'recognition.title': 'Impact & Media',
            'recognition.nasa.title': 'NASA Space Apps Global Winner',
            'recognition.nasa.text': 'Global winner with Project Poseidon, an AI solution using Convolutional Neural Networks (Deep Learning) and SAR (Synthetic Aperture Radar) satellite imagery to identify ocean oil spills even through clouds or at night. Developed in response to the 2019 environmental disaster in Brazil, the system automates global maritime monitoring, drastically reducing response time to mitigate ecological and economic impacts.',
            'recognition.ibm.title': 'C0D3RS Championship',
            'recognition.ibm.text': 'Finalist representing Brazil in the exclusive IBM and Prime Video miniseries. An epic competition among the best developers in Latin America, using IBM Cloud and AI to solve real-world problems in a tech reality show format.',
            'recognition.media.title': 'Talks & Podcasts',
            'recognition.media.text': 'Deep dives on Alura, Brazil Journal, and other media outlets about applied AI and cutting-edge tech.',
            'recognition.talk.title': 'Journey to NASA',
            'recognition.talk.text': 'Full keynote at EducaXperience about technology, innovation, and the behind-the-scenes of the global victory.',
            'recognition.media.video2.title': 'Innovation in Practice',
            'recognition.media.video2.text': 'Technical interview and insights on digital product development and the technology ecosystem.',
            'contact.title': 'Get in Touch',
            'contact.headline': "Let's build<br>the next level.",
            'contact.sub': 'Available for partnerships and high-impact projects.',
            'experience.cv': 'View Full Resume (PDF)',
            'footer.text': '&copy; 2026 — Eduardo Moraes Ritter. All rights reserved.',
        },

    };


    /* ==========================================================
       02. LANGUAGE SYSTEM
       ========================================================== */

    function detectLang() {
        const stored = localStorage.getItem('lang');
        if (stored) return stored;
        return (navigator.language || 'pt').toLowerCase().startsWith('pt') ? 'pt' : 'en';
    }

    function applyLang(lang) {
        const t = T[lang];
        if (!t) return;

        document.documentElement.setAttribute('data-lang', lang);
        document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');
        localStorage.setItem('lang', lang);

        const label = document.getElementById('langLabel');
        if (label) label.textContent = lang === 'pt' ? 'EN' : 'PT';

        document.title = lang === 'pt'
            ? 'Eduardo Ritter — Desenvolvedor & Criativo'
            : 'Eduardo Ritter — Developer & Creative';

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key] !== undefined) el.innerHTML = t[key];
        });
    }

    document.getElementById('langToggle')?.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-lang') || 'pt';
        applyLang(cur === 'pt' ? 'en' : 'pt');
    });


    /* ==========================================================
       03. THEME SYSTEM
       ========================================================== */

    const prefersColorDark = window.matchMedia('(prefers-color-scheme: dark)');

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    /* Follow OS changes only when user hasn't manually picked a theme */
    prefersColorDark.addEventListener('change', e => {
        if (!localStorage.getItem('theme')) applyTheme(e.matches ? 'dark' : 'light');
    });

    document.getElementById('themeToggle')?.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme') || 'dark';
        applyTheme(cur === 'dark' ? 'light' : 'dark');
    });

    if (!localStorage.getItem('theme')) {
        applyTheme(prefersColorDark.matches ? 'dark' : 'light');
    }


    /* ==========================================================
       04. SCROLL PROGRESS BAR
       ========================================================== */

    const progressBar = document.getElementById('scrollProgress');

    window.addEventListener('scroll', () => {
        if (!progressBar) return;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = total > 0 ? (window.scrollY / total) * 100 + '%' : '0%';
    }, { passive: true });


    /* ==========================================================
       05. SCROLL REVEAL (Intersection Observer)
       ========================================================== */

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('is-visible');

            /* Trigger counters inside newly visible sections */
            entry.target.querySelectorAll('[data-counter]').forEach(animateCounter);

            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal-section').forEach(el => revealObserver.observe(el));

    /* Hero is already in view on load */
    document.querySelector('.hero')?.classList.add('is-visible');


    /* ==========================================================
       06. COUNTER ANIMATION
       ========================================================== */

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-value'), 10) || 0;
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1400;
        let start = null;

        function step(ts) {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
            el.textContent = Math.round(target * eased) + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }


    /* ==========================================================
       07. MOBILE NAVIGATION
       ========================================================== */

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        function toggleMenu(open) {
            const isOpen = typeof open === 'boolean' ? open : !navLinks.classList.contains('is-open');
            
            navLinks.classList.toggle('is-open', isOpen);
            hamburger.classList.toggle('is-open', isOpen);
            hamburger.setAttribute('aria-expanded', String(isOpen));
            
            // Lock body scroll and add class for CSS styling
            if (isOpen) {
                document.body.style.overflow = 'hidden';
                document.body.classList.add('menu-is-open');
            } else {
                document.body.style.overflow = '';
                document.body.classList.remove('menu-is-open');
            }
        }

        hamburger.addEventListener('click', () => toggleMenu());

        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => toggleMenu(false));
        });
        
        // Close menu on resize if screen becomes wide
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navLinks.classList.contains('is-open')) {
                toggleMenu(false);
            }
        });
    }


    /* ==========================================================
       08. SMOOTH SCROLL
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
       09. INIT
       ========================================================== */

    applyLang(detectLang());

});
