/* ════════════════════════════════════
   AAHIL PORTFOLIO v3 — intdex.js
   CLEAN REWRITE — no double-fire issues
   ════════════════════════════════════ */
'use strict';

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════
   GUARD — hero runs ONCE only
══════════════════════════ */
let _heroRan = false;
function runHeroOnce() {
  if (_heroRan) return;
  _heroRan = true;
  runHeroEntrance();
}

/* ══════════════════════════
   1. LOADER
══════════════════════════ */
(function () {
  const loader = document.getElementById('loader');
  const fill   = document.getElementById('loaderFill');
  const label  = document.getElementById('loaderLabel');
  if (!loader) { runHeroOnce(); return; }

  const steps = ['Initialising...', 'Loading assets...', 'Building UI...', 'Ready.'];
  let pct = 0;
  let _dismissed = false;

  // progress bar animation
  const iv = setInterval(() => {
    pct += Math.random() * 18 + 4;
    if (pct >= 100) { pct = 100; clearInterval(iv); }
    if (fill) fill.style.width = pct + '%';
    if (label) label.textContent = steps[Math.min(3, Math.floor(pct / 26))];
  }, 120);

  function dismiss() {
    if (_dismissed) return;
    _dismissed = true;
    clearInterval(iv);
    if (fill) fill.style.width = '100%';
    if (label) label.textContent = 'Ready.';
    setTimeout(() => {
      gsap.to(loader, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          loader.style.display = 'none';
          runHeroOnce();
        }
      });
    }, 400);
  }

  // dismiss after page loads or after 2.5s max
  if (document.readyState === 'complete') {
    setTimeout(dismiss, 1200);
  } else {
    window.addEventListener('load', () => setTimeout(dismiss, 500), { once: true });
    setTimeout(dismiss, 2500);
  }
})();


/* ══════════════════════════
   2. HERO ENTRANCE
══════════════════════════ */
function runHeroEntrance() {

  // Set all hidden immediately — synchronously before any paint
  gsap.set('#navbar',    { yPercent: -100, opacity: 0 });
  gsap.set('.hud',       { opacity: 0 });
  gsap.set('#hEyebrow',  { y: -14, opacity: 0 });
  gsap.set('#hNameWrap', { scale: 0.85, opacity: 0, filter: 'blur(12px)' });
  gsap.set('#hRole',     { y: 10, opacity: 0 });
  gsap.set('#hTagline',  { y: 14, opacity: 0 });
  gsap.set('#hActions',  { y: 16, opacity: 0 });
  gsap.set('#hStats',    { y: 12, opacity: 0 });
  gsap.set('#hScroll',   { opacity: 0 });

  // One frame so browser paints the hidden state before animating
  requestAnimationFrame(() => {

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl
      .to('#navbar',    { yPercent: 0, opacity: 1, duration: 0.55 })
      .to('.hud',       { opacity: 1, duration: 0.4, stagger: 0.08 }, '-=0.2')
      .to('#hEyebrow',  { y: 0, opacity: 1, duration: 0.45 }, '-=0.15')
      .to('#hNameWrap', { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.9, ease: 'expo.out' }, '-=0.1')
      .to('#hRole',     { y: 0, opacity: 1, duration: 0.4 }, '-=0.45')
      .to('#hTagline',  { y: 0, opacity: 1, duration: 0.4 }, '-=0.28')
      .to('#hActions',  { y: 0, opacity: 1, duration: 0.4 }, '-=0.28')
      .to('#hStats',    { y: 0, opacity: 1, duration: 0.38 }, '-=0.24')
      .to('#hScroll',   { opacity: 1, duration: 0.3 }, '-=0.1')
      .call(startTypewriter);

  });
}


/* ══════════════════════════
   3. TYPEWRITER
══════════════════════════ */
function startTypewriter() {
  const el = document.getElementById('roleText');
  if (!el) return;

  const phrases = [
    'Developer & Builder',
    'AI Enthusiast',
    'Systems Thinker',
    'Future Product Engineer',
    'Web Developer',
  ];

  let pi = 0, ci = 0, del = false, locked = false;

  function tick() {
    if (locked) return;
    const w = phrases[pi];

    if (!del) {
      el.textContent = w.slice(0, ++ci);
      if (ci === w.length) {
        locked = true;
        setTimeout(() => { locked = false; del = true; tick(); }, 2000);
        return;
      }
      setTimeout(tick, 72);
    } else {
      el.textContent = w.slice(0, --ci);
      if (ci === 0) {
        locked = true;
        del = false;
        pi = (pi + 1) % phrases.length;
        setTimeout(() => { locked = false; tick(); }, 380);
        return;
      }
      setTimeout(tick, 38);
    }
  }

  tick();
}


/* ══════════════════════════
   4. SCROLL ANIMATIONS
══════════════════════════ */
window.addEventListener('load', function () {

  // Labels slide from left
  gsap.utils.toArray('.anim-label').forEach(el => {
    gsap.fromTo(el, { x: -28, opacity: 0 }, {
      x: 0, opacity: 1, duration: 0.55, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
    });
  });

  // Titles
  gsap.utils.toArray('.anim-title').forEach(el => {
    gsap.fromTo(el, { y: 36, opacity: 0, skewY: 1.5 }, {
      y: 0, opacity: 1, skewY: 0, duration: 0.75, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  // Fade-up elements
  gsap.utils.toArray('.anim-fade').forEach(el => {
    gsap.fromTo(el, { y: 20, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
    });
  });

  // Cards — stagger per group
  const seen = new Set();
  gsap.utils.toArray('.anim-card').forEach(el => {
    const parent = el.parentElement;
    if (seen.has(parent)) return;
    seen.add(parent);
    const group = parent.querySelectorAll('.anim-card');
    gsap.fromTo(group, { y: 44, opacity: 0, scale: 0.96 }, {
      y: 0, opacity: 1, scale: 1, duration: 0.65, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: parent, start: 'top 84%', toggleActions: 'play none none none' }
    });
  });

  // Focus rows
  gsap.fromTo('.anim-row', { x: -32, opacity: 0 }, {
    x: 0, opacity: 1, duration: 0.48, ease: 'power2.out', stagger: 0.08,
    scrollTrigger: { trigger: '.focus-table', start: 'top 84%', toggleActions: 'play none none none' }
  });

  // Timeline spine
  gsap.to('#tlSpine', {
    scaleY: 1, duration: 1.4, ease: 'power2.inOut',
    scrollTrigger: { trigger: '#journey', start: 'top 72%', toggleActions: 'play none none none' }
  });

  // Timeline items
  gsap.fromTo('.anim-tl-l', { x: -46, opacity: 0 }, {
    x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.16,
    scrollTrigger: { trigger: '.timeline', start: 'top 80%', toggleActions: 'play none none none' }
  });
  gsap.fromTo('.anim-tl-r', { x: 46, opacity: 0 }, {
    x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.16, delay: 0.08,
    scrollTrigger: { trigger: '.timeline', start: 'top 80%', toggleActions: 'play none none none' }
  });

  // Contact links
  gsap.fromTo('.anim-clink', { y: 26, opacity: 0 }, {
    y: 0, opacity: 1, duration: 0.52, ease: 'power2.out', stagger: 0.11,
    scrollTrigger: { trigger: '.clinks', start: 'top 87%', toggleActions: 'play none none none' }
  });

  // Chips
  gsap.fromTo('.chip', { y: 10, opacity: 0, scale: 0.88 }, {
    y: 0, opacity: 1, scale: 1, duration: 0.36, ease: 'back.out(1.3)', stagger: 0.05,
    scrollTrigger: { trigger: '.chips', start: 'top 90%', toggleActions: 'play none none none' }
  });

  // Skill list items
  gsap.utils.toArray('.skill-block').forEach(block => {
    gsap.fromTo(block.querySelectorAll('li'), { x: -10, opacity: 0 }, {
      x: 0, opacity: 1, duration: 0.36, ease: 'power2.out', stagger: 0.055,
      scrollTrigger: { trigger: block, start: 'top 86%', toggleActions: 'play none none none' }
    });
  });

  // Football badges
  gsap.fromTo('.fpos', { x: -12, opacity: 0 }, {
    x: 0, opacity: 1, duration: 0.36, ease: 'power2.out', stagger: 0.09,
    scrollTrigger: { trigger: '.fpos-row', start: 'top 92%', toggleActions: 'play none none none' }
  });

  // Availability badge
  gsap.fromTo('.avail', { scale: 0.82, opacity: 0 }, {
    scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.6)',
    scrollTrigger: { trigger: '.avail', start: 'top 92%', toggleActions: 'play none none none' }
  });

  // Hero name parallax
  gsap.to('#hNameWrap', {
    yPercent: -14, ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  // Background parallax
  gsap.utils.toArray('.bg-grid, .bg-dots').forEach(el => {
    gsap.to(el, {
      yPercent: 16, ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  // Contact glow parallax
  gsap.to('.contact-glow', {
    yPercent: 26, ease: 'none',
    scrollTrigger: { trigger: '#contact', start: 'top bottom', end: 'bottom top', scrub: true }
  });

  // Footer
  gsap.fromTo('footer', { opacity: 0, y: 16 }, {
    opacity: 1, y: 0, duration: 0.55, ease: 'power2.out',
    scrollTrigger: { trigger: 'footer', start: 'top 96%', toggleActions: 'play none none none' }
  });

}, { once: true });


/* ══════════════════════════
   5. PARTICLES
══════════════════════════ */
(function () {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts = [], raf;
  const N = window.innerWidth < 768 ? 50 : 105;
  const CD = 120;
  const M = { x: null, y: null, r: 140 };

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Dot {
    constructor() { this.init(true); }
    init(rand) {
      this.x  = Math.random() * W;
      this.y  = rand ? Math.random() * H : H + 5;
      this.vx = (Math.random() - 0.5) * 0.28;
      this.vy = -(Math.random() * 0.32 + 0.07);
      this.r  = Math.random() * 1.3 + 0.3;
      this.ba = Math.random() * 0.38 + 0.07;
      this.a  = this.ba;
      this.h  = Math.random() > 0.55 ? 193 : 214;
      this.life = 0;
      this.ml = Math.random() * 460 + 200;
    }
    update() {
      if (++this.life > this.ml) { this.init(false); return; }
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0) this.x = W;
      if (this.x > W) this.x = 0;
      if (M.x !== null) {
        const dx = this.x - M.x, dy = this.y - M.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < M.r) {
          const f = (M.r - d) / M.r;
          this.x += dx/d * f * 1.2;
          this.y += dy/d * f * 1.2;
          this.a = Math.min(0.9, this.ba + f * 0.45);
        } else {
          this.a += (this.ba - this.a) * 0.05;
        }
      }
      const lr = this.life / this.ml;
      if (lr < 0.08) this.a = this.ba * (lr / 0.08);
      if (lr > 0.82) this.a = this.ba * (1 - (lr - 0.82) / 0.18);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
      ctx.fillStyle = `hsla(${this.h},90%,68%,${this.a})`;
      ctx.fill();
    }
  }

  function drawLines() {
    for (let i = 0; i < pts.length; i++) {
      for (let j = i+1; j < pts.length; j++) {
        const a = pts[i], b = pts[j];
        const dx = a.x-b.x, dy = a.y-b.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < CD) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `hsla(${194 + (d/CD)*20},90%,65%,${(1-d/CD)*0.15})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawLines();
    pts.forEach(p => { p.update(); p.draw(); });
    raf = requestAnimationFrame(loop);
  }

  function init() {
    resize();
    pts = Array.from({ length: N }, () => new Dot());
    if (raf) cancelAnimationFrame(raf);
    loop();
  }

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    M.x = e.clientX - r.left;
    M.y = e.clientY - r.top;
  }, { passive: true });
  window.addEventListener('mouseleave', () => { M.x = null; M.y = null; });

  init();
})();


/* ══════════════════════════
   6. CUSTOM CURSOR
══════════════════════════ */
(function () {
  const cur  = document.getElementById('cursor');
  const glow = document.getElementById('cursorGlow');
  if (!cur || window.innerWidth <= 768) return;

  let mx = 0, my = 0, gx = 0, gy = 0;
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });

  function loop() {
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
    gx += (mx - gx) * 0.08;
    gy += (my - gy) * 0.08;
    glow.style.left = gx + 'px';
    glow.style.top  = gy + 'px';
    requestAnimationFrame(loop);
  }
  loop();

  document.querySelectorAll('a, button, .proj-card, .acard, .think-card, .clink, .skill-block').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('hover'));
    el.addEventListener('mouseleave', () => cur.classList.remove('hover'));
  });
})();


/* ══════════════════════════
   7. NAVBAR
══════════════════════════ */
(function () {
  const nav   = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  document.querySelectorAll('section[id]').forEach(sec => {
    ScrollTrigger.create({
      trigger: sec, start: 'top 50%', end: 'bottom 50%',
      onToggle: self => {
        if (self.isActive)
          links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + sec.id));
      }
    });
  });
})();


/* ══════════════════════════
   8. HAMBURGER
══════════════════════════ */
(function () {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    btn.classList.remove('open');
    menu.classList.remove('open');
  }));
})();


/* ══════════════════════════
   9. CARD 3D TILT
══════════════════════════ */
document.querySelectorAll('.proj-card:not(.proj-card--next)').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width/2)  / (r.width/2);
    const dy = (e.clientY - r.top  - r.height/2) / (r.height/2);
    gsap.to(card, { rotateX: dy*-5, rotateY: dx*5, duration: 0.3, ease: 'power2.out', transformPerspective: 900 });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.55, ease: 'elastic.out(1,0.5)' });
  });
});


/* ══════════════════════════
   10. GLITCH on hero name
══════════════════════════ */
(function () {
  const name = document.querySelector('.hero-name');
  if (!name) return;
  function burst() {
    gsap.timeline()
      .to(name, { x: (Math.random()-.5)*8, skewX: (Math.random()-.5)*4, duration: 0.05, ease: 'none' })
      .to(name, { x: (Math.random()-.5)*5, skewX: 0, duration: 0.05, ease: 'none' })
      .to(name, { x: 0, duration: 0.1, ease: 'power2.out' });
  }
  function schedule() {
    setTimeout(() => { burst(); setTimeout(burst, 110); schedule(); }, Math.random()*5000 + 4000);
  }
  setTimeout(schedule, 4000);
})();


/* ══════════════════════════
   11. SMOOTH SCROLL
══════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' });
  });
});
