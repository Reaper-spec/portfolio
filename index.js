// Mark JS as loaded — enables animations safely
document.documentElement.classList.add('js-loaded');
/* ════════════════════════════════════════════════════
   AAHIL PORTFOLIO — main.js
   Particles · Typewriter · Scroll Reveal · Nav · Cursor
   ════════════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────
   1. PARTICLE CANVAS
────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [], animId;
  const PARTICLE_COUNT = window.innerWidth < 768 ? 60 : 120;
  const CONNECTION_DIST = 130;
  const MOUSE = { x: null, y: null, radius: 160 };

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(true); }

    reset(initial = false) {
      this.x  = Math.random() * W;
      this.y  = initial ? Math.random() * H : H + 10;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = -(Math.random() * 0.4 + 0.1);
      this.size   = Math.random() * 1.5 + 0.4;
      this.baseAlpha = Math.random() * 0.45 + 0.1;
      this.alpha  = this.baseAlpha;
      // color: mix of cyan and electric blue
      this.hue = Math.random() > 0.5 ? 193 : 215; // cyan or blue-ish
      this.sat = 90 + Math.random() * 10;
      this.life = 0;
      this.maxLife = Math.random() * 400 + 200;
    }

    update() {
      this.life++;
      if (this.life > this.maxLife) { this.reset(); return; }

      this.x += this.vx;
      this.y += this.vy;

      // wrap horizontally
      if (this.x < 0) this.x = W;
      if (this.x > W) this.x = 0;

      // mouse repulsion
      if (MOUSE.x !== null) {
        const dx = this.x - MOUSE.x;
        const dy = this.y - MOUSE.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE.radius) {
          const force = (MOUSE.radius - dist) / MOUSE.radius;
          this.x += dx / dist * force * 1.2;
          this.y += dy / dist * force * 1.2;
          this.alpha = Math.min(1, this.baseAlpha + force * 0.6);
        } else {
          this.alpha += (this.baseAlpha - this.alpha) * 0.05;
        }
      }

      // fade in / out over lifetime
      const lifeRatio = this.life / this.maxLife;
      if (lifeRatio < 0.1) this.alpha = this.baseAlpha * (lifeRatio / 0.1);
      if (lifeRatio > 0.8) this.alpha = this.baseAlpha * (1 - (lifeRatio - 0.8) / 0.2);
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, ${this.sat}%, 70%, ${this.alpha})`;
      ctx.fill();
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.18;
          // blend cyan to blue along connection
          const t = dist / CONNECTION_DIST;
          const h = 193 + t * 22;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `hsla(${h}, 90%, 65%, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(loop);
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    if (animId) cancelAnimationFrame(animId);
    loop();
  }

  // events
  window.addEventListener('resize', () => { resize(); });
  window.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    MOUSE.x = e.clientX - rect.left;
    MOUSE.y = e.clientY - rect.top;
  });
  window.addEventListener('mouseleave', () => { MOUSE.x = null; MOUSE.y = null; });

  init();
})();


/* ──────────────────────────────────────
   2. TYPEWRITER ROLE TEXT
────────────────────────────────────── */
(function initTypewriter() {
  const el = document.getElementById('roleText');
  if (!el) return;

  const phrases = [
    'Developer & Builder',
    'AI Enthusiast',
    'System Thinker',
    'Future Product Engineer',
    'Web Developer',
  ];

  let phraseIdx = 0, charIdx = 0, deleting = false, paused = false;

  function tick() {
    const current = phrases[phraseIdx];

    if (paused) {
      paused = false;
      setTimeout(tick, deleting ? 50 : 1800);
      return;
    }

    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        paused = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(tick, 400);
        return;
      }
    }

    setTimeout(tick, deleting ? 38 : 72);
  }

  setTimeout(tick, 1200);
})();


/* ──────────────────────────────────────
   3. CURSOR GLOW TRACKING
────────────────────────────────────── */
(function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my;

  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animate() {
    cx += (mx - cx) * 0.09;
    cy += (my - cy) * 0.09;
    glow.style.left = cx + 'px';
    glow.style.top  = cy + 'px';
    requestAnimationFrame(animate);
  }
  animate();
})();


/* ──────────────────────────────────────
   4. SCROLL REVEAL
────────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
      setTimeout(() => el.classList.add('visible'), delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

  // Small delay to let page paint first
  setTimeout(() => {
    els.forEach(el => observer.observe(el));
  }, 100);
})();


/* ──────────────────────────────────────
   5. NAVBAR — scroll state + active link
────────────────────────────────────── */
(function initNavbar() {
  const nav  = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  // scroll state
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  // active section highlight
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const id = e.target.id;
      links.forEach(a => {
        const isActive = a.getAttribute('href') === '#' + id;
        a.classList.toggle('active', isActive);
      });
    });
  }, { threshold: 0.35 });

  sections.forEach(s => sectionObserver.observe(s));

  // smooth close mobile menu on link click
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    a.addEventListener('click', () => {
      const menu = document.getElementById('mobileMenu');
      const burger = document.getElementById('hamburger');
      menu.classList.remove('open');
      burger.classList.remove('open');
    });
  });
})();


/* ──────────────────────────────────────
   6. HAMBURGER MENU TOGGLE
────────────────────────────────────── */
(function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });
})();


/* ──────────────────────────────────────
   7. FOCUS ROW — hover glow effect
────────────────────────────────────── */
(function initFocusRows() {
  document.querySelectorAll('.focus-row').forEach(row => {
    row.addEventListener('mouseenter', () => {
      row.style.paddingLeft = '2.25rem';
    });
    row.addEventListener('mouseleave', () => {
      row.style.paddingLeft = '';
    });
  });
})();


/* ──────────────────────────────────────
   8. PROJECT CARDS — tilt on hover
────────────────────────────────────── */
(function initCardTilt() {
  const cards = document.querySelectorAll('.project-card:not(.project-card--next)');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const tiltX =  dy * 4;
      const tiltY = -dx * 4;
      card.style.transform = `translateY(-6px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ──────────────────────────────────────
   9. COUNTER ANIMATION (hero stats)
────────────────────────────────────── */
(function initCounters() {
  // Nothing numeric to count up, but animate the stat entries
  const stats = document.querySelectorAll('.hero-stat');
  stats.forEach((stat, i) => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(12px)';
    setTimeout(() => {
      stat.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      stat.style.opacity = '1';
      stat.style.transform = '';
    }, 1600 + i * 150);
  });
})();


/* ──────────────────────────────────────
   10. GLITCH EFFECT ON HERO NAME (subtle)
────────────────────────────────────── */
(function initGlitch() {
  const name = document.querySelector('.hero-name');
  if (!name) return;

  function glitch() {
    name.style.textShadow = `
      ${(Math.random() - 0.5) * 6}px 0 rgba(0,212,255,0.7),
      ${(Math.random() - 0.5) * 6}px 0 rgba(26,110,255,0.5)
    `;
    setTimeout(() => {
      name.style.textShadow = '';
    }, 80);
  }

  // random glitch bursts
  function scheduleGlitch() {
    const delay = Math.random() * 6000 + 3000;
    setTimeout(() => {
      glitch();
      setTimeout(glitch, 100);
      setTimeout(glitch, 180);
      scheduleGlitch();
    }, delay);
  }

  scheduleGlitch();
})();


/* ──────────────────────────────────────
   11. SECTION ENTRANCE — bg grid parallax
────────────────────────────────────── */
(function initParallaxGrid() {
  const grids = document.querySelectorAll('.section-bg-grid, .section-bg-dots');

  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    grids.forEach(g => {
      const rect = g.parentElement.getBoundingClientRect();
      const offset = (rect.top / window.innerHeight) * 20;
      g.style.transform = `translateY(${offset}px)`;
    });
  }, { passive: true });
})();


/* ──────────────────────────────────────
   12. TIMELINE SPINE DRAW-IN ANIMATION
────────────────────────────────────── */
(function initTimelineSpine() {
  const spine = document.querySelector('.tl-spine');
  if (!spine) return;

  spine.style.scaleY = 0;
  spine.style.transformOrigin = 'top';

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      spine.style.transition = 'transform 1.4s cubic-bezier(0.4,0,0.2,1)';
      spine.style.transform = 'scaleY(1)';
      obs.disconnect();
    }
  }, { threshold: 0.1 });

  obs.observe(document.querySelector('#journey') || spine);
})();


/* ──────────────────────────────────────
   13. SMOOTH ANCHOR SCROLL (fallback)
────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const offset = 64; // navbar height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ──────────────────────────────────────
   14. ABOUT CARDS STAGGER
────────────────────────────────────── */
(function initAboutStagger() {
  const cards = document.querySelectorAll('.acard');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      cards.forEach((c, i) => {
        setTimeout(() => {
          c.style.transition = `opacity 0.5s ease ${i * 0.12}s, transform 0.5s ease ${i * 0.12}s`;
          c.classList.add('visible');
        }, i * 120);
      });
      obs.disconnect();
    });
  }, { threshold: 0.2 });

  const container = document.querySelector('.about-cards');
  if (container) obs.observe(container);
})();


/* ──────────────────────────────────────
   15. SKILL LIST STAGGER ON ENTER
────────────────────────────────────── */
(function initSkillStagger() {
  const blocks = document.querySelectorAll('.skill-block');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const items = entry.target.querySelectorAll('.skill-list li');
      items.forEach((li, i) => {
        li.style.opacity = '0';
        li.style.transform = 'translateX(-10px)';
        setTimeout(() => {
          li.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          li.style.opacity = '1';
          li.style.transform = '';
        }, 100 + i * 60);
      });
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  blocks.forEach(b => obs.observe(b));
})();