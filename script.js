// ============================================================
//  FERNANDA VALERIANO — PORTFOLIO · script.js
// ============================================================


// ── 1. NAV — fundo ao scrollar ───────────────────────────────
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
});


// ── 2. CURSOR PERSONALIZADO ──────────────────────────────────
const cur  = document.createElement('div');
const ring = document.createElement('div');
cur.id  = 'cur';
ring.id = 'cur-ring';
document.body.append(cur, ring);

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
});

(function animateCursor() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, button, .service-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});


// ── 3. SCROLL REVEAL ─────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Pegamos apenas os elementos que realmente precisam do efeito
const revealTargets = document.querySelectorAll('.project-card, .service-card, .contact-item, .destaque-mockup');

revealTargets.forEach((el, i) => {
    el.classList.add('reveal');
    // Um delay pequeno e controlado para não travar a exibição
    el.style.transitionDelay = (i % 4) * 0.1 + 's';
    revealObserver.observe(el);
});


// ── 4. TYPED EFFECT ──────────────────────────────────────────
const typedEl = document.getElementById('typed');

if (typedEl) {
    const words  = ['Developer.', 'Designer.', 'Criadora.'];
    let wi       = 0;
    let ci       = 0;
    let deleting = false;

    function type() {
        const word = words[wi];
        typedEl.textContent = deleting
            ? word.slice(0, ci--)
            : word.slice(0, ci++);

        if (!deleting && ci > word.length) {
            deleting = true;
            setTimeout(type, 1400);
            return;
        }
        if (deleting && ci < 0) {
            deleting = false;
            wi = (wi + 1) % words.length;
        }

        setTimeout(type, deleting ? 55 : 95);
    }

    type();
}


// ── 5. CONTADORES ANIMADOS ────────────────────────────────────
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    let count    = 0;
    const step   = Math.max(1, Math.ceil(target / 50));

    const timer = setInterval(() => {
        count += step;
        if (count >= target) {
            el.textContent = suffix || target;
            clearInterval(timer);
        } else {
            el.textContent = count;
        }
    }, 35);
}


// ── 6. SMOOTH SCROLL ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


// ── 7. ACTIVE LINK conforme seção visível ────────────────────
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navItems.forEach(a => {
                a.classList.remove('active-link');
                if (a.getAttribute('href') === '#' + entry.target.id) {
                    a.classList.add('active-link');
                }
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));