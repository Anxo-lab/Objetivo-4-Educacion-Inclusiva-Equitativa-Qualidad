/**
 * ODS 4 - PLATAFORMA AVANZADA DE EDUCACIÓN
 * Lógica completa recuperada con fix de fijación de menú.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. PRECARGADOR (LOADER) ---
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if(loader) {
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 500);
            }
        }, 800);
    });

    // --- 2. GESTIÓN DE TEMAS (PERSISTENCIA Y TRANSICIÓN) ---
    const themeBtn = document.getElementById('btn-theme');
    const root = document.documentElement;
    const modeText = document.querySelector('.mode-text');

    const updateThemeUI = (theme) => {
        if (modeText) {
            modeText.textContent = theme === 'light' ? 'MODO OSCURO' : 'MODO CLARO';
        }
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    root.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            let currentTheme = root.getAttribute('data-theme');
            let nextTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            root.setAttribute('data-theme', nextTheme);
            localStorage.setItem('theme', nextTheme);
            updateThemeUI(nextTheme);
        });
    }

    // --- 3. BARRA DE PROGRESO DE LECTURA ---
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = scrolled + "%";
        
        revealSections();
    });

    // --- 4. ANIMACIÓN DE REVELADO (SCROLL REVEAL) ---
    function revealSections() {
        const sections = document.querySelectorAll('.reveal-section');
        sections.forEach(sec => {
            const windowHeight = window.innerHeight;
            const elementTop = sec.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                sec.classList.add('visible');
            }
        });
    }
    revealSections();

    // --- 5. SISTEMA DE MODAL (LIGHTBOX CORREGIDO) ---
    const modal = document.getElementById('modal-viewer');
    const modalImg = document.getElementById('modal-img-src');
    const closeBtn = document.querySelector('.modal-close');
    const triggers = document.querySelectorAll('.lightbox-trigger');

    triggers.forEach(img => {
        img.addEventListener('click', () => {
            if (modal && modalImg) {
                modal.style.display = 'flex';
                modalImg.src = img.src;
                // Usamos clase para evitar que el sticky pierda su referencia
                document.body.classList.add('modal-open');
            }
        });
    });

    const closeLightbox = () => {
        if (modal) {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    };

    if(closeBtn) closeBtn.onclick = closeLightbox;
    window.onclick = (e) => { if (e.target === modal) closeLightbox(); };

    // --- 6. NAVEGACIÓN SUAVE (SMOOTH SCROLL) ---
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 120, 
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    console.log("%c ODS 4 | Full Engine Restored ", "background: #c5192d; color: #fff; padding: 5px; font-weight: bold;");
});
