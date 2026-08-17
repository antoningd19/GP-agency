// GP Agency — interactions front (aucun backend : à brancher plus tard)

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle : drawer plein écran avec liens + CTA, verrouillage du
  // scroll, fermeture au clic sur un lien, à la touche Échap ou au repassage
  // en largeur desktop.
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    const openMenu = () => {
      links.classList.add('open');
      toggle.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Fermer le menu');
      document.body.classList.add('menu-open');
    };
    const closeMenu = () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Ouvrir le menu');
      document.body.classList.remove('menu-open');
    };

    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'nav-links');

    toggle.addEventListener('click', () => {
      if (links.classList.contains('open')) closeMenu();
      else openMenu();
    });

    links.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && links.classList.contains('open')) closeMenu();
    });

    window.matchMedia('(min-width: 761px)').addEventListener('change', (e) => {
      if (e.matches) closeMenu();
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach((item) => {
    const q = item.querySelector('.faq-q');
    q?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach((el) => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // Marquee: duplicate content so the loop is seamless
  document.querySelectorAll('.marquee-track').forEach((track) => {
    track.innerHTML += track.innerHTML;
  });

  // Effet rouleau sur les CTA : chaque lettre bascule vers le haut au survol, une copie
  // identique entre par le bas, avec un léger décalage lettre à lettre.
  const buildRollLabel = (btn, label) => {
    btn.innerHTML = '';

    const wrap = document.createElement('span');
    wrap.className = 'btn-label';
    wrap.setAttribute('aria-hidden', 'true');

    const chars = Array.from(label);
    const stagger = Math.min(0.03, 0.28 / Math.max(chars.length, 1));

    chars.forEach((char, i) => {
      const charEl = document.createElement('span');
      charEl.className = 'btn-char';

      const top = document.createElement('span');
      top.className = 'char-top';
      top.textContent = char;

      const bottom = document.createElement('span');
      bottom.className = 'char-bot';
      bottom.textContent = char;

      const delay = `${(i * stagger).toFixed(3)}s`;
      top.style.transitionDelay = delay;
      bottom.style.transitionDelay = delay;

      charEl.append(top, bottom);
      wrap.appendChild(charEl);
    });

    btn.appendChild(wrap);
  };

  document.querySelectorAll('.btn').forEach((btn) => {
    const label = btn.textContent.trim();
    btn.setAttribute('aria-label', label);
    buildRollLabel(btn, label);
  });

  // Contact form: placeholder only, pas de backend branché
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        const original = btn.getAttribute('aria-label');
        const message = 'Message enregistré (démo)';
        buildRollLabel(btn, message);
        btn.setAttribute('aria-label', message);
        setTimeout(() => {
          buildRollLabel(btn, original);
          btn.setAttribute('aria-label', original);
        }, 2500);
      }
    });
  }

  // Point bleu qui suit le curseur (souris uniquement, pas les écrans tactiles)
  if (window.matchMedia('(pointer: fine)').matches) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let started = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!started) {
        dotX = mouseX;
        dotY = mouseY;
        started = true;
        dot.classList.add('visible');
      }
    });

    document.addEventListener('mouseleave', () => dot.classList.remove('visible'));
    document.addEventListener('mouseenter', () => dot.classList.add('visible'));

    const hoverSelector = 'a, button, input, textarea, select, .faq-q';
    const ctaSelector = '.btn';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(ctaSelector)) {
        dot.classList.add('on-cta');
      } else if (e.target.closest(hoverSelector)) {
        dot.classList.add('active');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(ctaSelector)) {
        dot.classList.remove('on-cta');
      } else if (e.target.closest(hoverSelector)) {
        dot.classList.remove('active');
      }
    });

    const animateDot = () => {
      dotX += (mouseX - dotX) * 0.2;
      dotY += (mouseY - dotY) * 0.2;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(animateDot);
    };
    requestAnimationFrame(animateDot);
  }
});
