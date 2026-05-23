/* ===== PORTFOLIO LIQUIDGLASS — MAIN.JS ===== */

(function () {
  'use strict';

  /* ── 1. CUSTOM CURSOR ────────────────────── */
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top  = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    const expandTargets = document.querySelectorAll('a, button, .glass, .glass-lg, .glass-sm, .glass-pill, .stack-item');
    expandTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('expanded');
        ring.classList.add('expanded');
      });
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('expanded');
        ring.classList.remove('expanded');
      });
    });

    document.addEventListener('mouseleave', () => { ring.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { ring.style.opacity = '1'; });
  }

  /* ── 2. SCROLL REVEAL (IntersectionObserver) ── */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(el => observer.observe(el));

    /* Stagger for grid children */
    document.querySelectorAll('.reveal-group').forEach(group => {
      const children = group.querySelectorAll('.reveal');
      children.forEach((child, i) => {
        child.style.transitionDelay = (i * 80) + 'ms';
      });
    });
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── 3. PARALLAX — HERO ORBS ─────────────── */
  const orbs = [
    document.querySelector('.hero-orb-1'),
    document.querySelector('.hero-orb-2'),
    document.querySelector('.hero-orb-3'),
  ].filter(Boolean);

  if (orbs.length) {
    const heroSection = document.getElementById('hero');
    document.addEventListener('mousemove', (e) => {
      const rect  = heroSection.getBoundingClientRect();
      if (rect.bottom < 0) return;

      const cx = e.clientX / window.innerWidth  - 0.5;
      const cy = e.clientY / window.innerHeight - 0.5;

      orbs[0] && (orbs[0].style.transform = `translate(${cx * -20}px, ${cy * -20}px)`);
      orbs[1] && (orbs[1].style.transform = `translate(${cx * 14}px, ${cy * 14}px)`);
      orbs[2] && (orbs[2].style.transform = `translate(${cx * -8}px, ${cy * 8}px)`);
    });
  }

  /* ── 4. NAV SCROLL STATE ─────────────────── */
  const nav = document.querySelector('nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('nav-scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── 5. MOBILE HAMBURGER ─────────────────── */
  const hamburger   = document.querySelector('.hamburger');
  const mobileMenu  = document.querySelector('.mobile-menu');
  const navEl       = document.querySelector('nav');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      navEl.classList.toggle('nav-open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        navEl.classList.remove('nav-open');
      });
    });
  }

  /* ── 6. SMOOTH SCROLL ────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── 7. HERO ANIMATION INIT ──────────────── */
  const heroAnimEls = document.querySelectorAll('.hero-animate');
  heroAnimEls.forEach(el => {
    el.style.opacity = '0';
  });

  window.addEventListener('load', () => {
    heroAnimEls.forEach(el => {
      el.style.opacity = '';
    });
  });

  /* ── 8. COMPANY CARD HOVER IMAGE DEPTH ───── */
  document.querySelectorAll('.company-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 6;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 4;
      const img = card.querySelector('.company-image-wrapper');
      if (img) {
        img.style.transform = `scale(1.02) rotateY(${x}deg) rotateX(${-y}deg)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      const img = card.querySelector('.company-image-wrapper');
      if (img) img.style.transform = '';
    });
  });

})();
