// Lichttechnik und Vertrieb - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  const scrollThreshold = 50;
  const hasHero = !!document.querySelector('.hero');

  function handleScroll() {
    if (!hasHero) return;
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  if (hasHero) {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  } else {
    navbar.classList.add('scrolled');
  }

  // Stats counter animation using IntersectionObserver
  const statsSections = document.querySelectorAll('.trust-bar, .stats-strip, .stats');
  statsSections.forEach(section => {
    const statNumbers = section.querySelectorAll('.trust-number, .stat-number');
    if (statNumbers.length === 0) return;

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statNumbers.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'));
            if (!target) return;
            const duration = 2000;
            const start = performance.now();

            function update(now) {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = Math.round(target * eased);
              if (progress < 1) {
                requestAnimationFrame(update);
              } else {
                el.textContent = target;
              }
            }

            requestAnimationFrame(update);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    statsObserver.observe(section);
  });

  // Fade-in on scroll
  const fadeElements = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(el => fadeObserver.observe(el));

  // Before/After sliders
  document.querySelectorAll('.before-after').forEach(container => {
    const slider = container.querySelector('.before-after-slider');
    const beforeDiv = container.querySelector('.before-after-before');
    const line = container.querySelector('.before-after-line');
    if (!slider || !beforeDiv || !line) return;

    // Size the before image to match the container width
    const beforeImg = beforeDiv.querySelector('img');
    if (beforeImg) {
      const setImgWidth = () => { beforeImg.style.width = container.offsetWidth + 'px'; };
      setImgWidth();
      window.addEventListener('resize', setImgWidth);
    }

    slider.addEventListener('input', () => {
      const val = slider.value + '%';
      beforeDiv.style.width = val;
      line.style.left = val;
    });
  });

  // Pre-fill contact form from URL params (e.g. ?produkt=Deckenleuchten)
  const params = new URLSearchParams(window.location.search);
  const produktParam = params.get('produkt');
  if (produktParam) {
    const messageField = document.querySelector('#message');
    if (messageField && !messageField.value) {
      messageField.value = 'Anfrage zu: ' + decodeURIComponent(produktParam) + '\n\n';
    }
  }

  // Statusmeldung nach PHP-Formular-Submit anzeigen
  const statusParam = params.get('status');
  const formStatus = document.querySelector('#form-status');
  if (statusParam && formStatus) {
    formStatus.removeAttribute('hidden');
    if (statusParam === 'erfolg') {
      formStatus.className = 'form-alert form-alert-success';
      formStatus.textContent = 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Ich melde mich so schnell wie möglich bei Ihnen.';
    } else {
      formStatus.className = 'form-alert form-alert-error';
      formStatus.textContent = 'Leider ist beim Senden ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie mich direkt per E-Mail: info@lichttechnik-vertrieb.de';
    }
    // URL bereinigen ohne Seitenreload
    history.replaceState(null, '', window.location.pathname);
  }

  // Sticky CTA - hide when footer is visible
  const stickyCta = document.querySelector('.sticky-cta');
  if (stickyCta) {
    const footer = document.querySelector('.footer');
    const stickyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          stickyCta.classList.add('hidden');
        } else {
          stickyCta.classList.remove('hidden');
        }
      });
    }, { threshold: 0 });

    if (footer) {
      stickyObserver.observe(footer);
    }
  }
});

// Angebotskarten: erst drei Eckdaten, Rest auf Wunsch (Portal-Markup bleibt unverändert)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.angebot-card').forEach((card, i) => {
    const list = card.querySelector('.angebot-specs');
    if (!list || list.children.length <= 3) return;
    if (!list.id) list.id = `angebot-specs-${i}`;
    card.classList.add('ist-kompakt');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'angebot-mehr';
    btn.setAttribute('aria-controls', list.id);
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = 'Alle Details';
    btn.addEventListener('click', () => {
      const offen = card.classList.toggle('ist-offen');
      btn.setAttribute('aria-expanded', String(offen));
      btn.textContent = offen ? 'Weniger Details' : 'Alle Details';
    });
    list.after(btn);
  });
});

// Steht über dem Raster schon ein Tag, wiederholt ein überall gleiches Badge nur: ausblenden
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.angebote-grid').forEach((grid) => {
    const badges = [...grid.querySelectorAll('.angebot-badge')];
    if (badges.length < 2) return;
    const text = badges[0].textContent.trim();
    const kopfMitTag = grid.previousElementSibling?.matches('.section-header') && grid.previousElementSibling.querySelector('.section-label');
    if (kopfMitTag && badges.every((b) => b.textContent.trim() === text)) badges.forEach((b) => b.classList.add('ist-gleich'));
  });
});

// Feinsatz: Umbrüche nur an sinnvollen Stellen (läuft nur im DOM, Quelltext und JSON-LD bleiben unverändert)
document.addEventListener('DOMContentLoaded', () => {
  const NBSP = ' ';
  const WJ = '⁠'; // Wortverbinder: kein Umbruch nach dem Bindestrich
  const regeln = [
    [/ - /g, NBSP + '- '], // Gedankenstrich hängt am vorigen Wort, beginnt nie eine Zeile
    [/(^|[\s(„])([A-ZÄÖÜ0-9][A-Za-z0-9]{0,3})-(?=[A-Za-zÄÖÜäöü0-9])/g, `$1$2-${WJ}`], // LED-Treiber, DIN-zertifiziert, 3D-Planung, E-Mail
    [/(\d) (?=[A-Za-zÄÖÜäöü%€°])/g, `$1${NBSP}`], // 35 Jahren, 100 Schaltzyklen, 5 Watt
    [/\b(Ra|PF|Nr\.|ca\.|bis|von|über|zu|mit) (?=\d)/g, `$1${NBSP}`], // Ra 80, über 35
    [/([.?!]) ([^\s]{1,20}) (?=\S)/g, `$1 $2${NBSP}`], // Satzanfang steht nie allein am Zeilenende
    [/: ([^\s]{1,8}) (?=\S)/g, `: $1${NBSP}`], // nach Doppelpunkt ebenso, bei kurzen Wörtern
    [/([.?!] [^\s]{1,20})\s+$/, `$1${NBSP}`], // auch wenn danach ein <strong> oder Link folgt
  ];
  const auslassen = 'script,style,textarea,input,select,code,pre,svg';
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.parentElement.closest(auslassen) || !n.data.trim() ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
  });
  const knoten = [];
  while (walker.nextNode()) knoten.push(walker.currentNode);
  const block = (n) => n.parentElement.closest('p, li, h1, h2, h3, h4, dd, td, figcaption, a, button');
  knoten.forEach((n, i) => {
    let t = n.data;
    regeln.forEach(([re, ersatz]) => { t = t.replace(re, ersatz); });
    // Satz endet im vorigen Textstück (z. B. in <strong>): erstes Wort hier an das zweite binden
    const vorher = knoten[i - 1];
    if (vorher && block(vorher) === block(n) && /[.?!]\s*$/.test(vorher.data)) t = t.replace(/^(\s*[^\s]{1,20}) (?=\S)/, `$1${NBSP}`);
    if (t !== n.data) n.data = t;
  });
  // Kein kurzes Einzelwort in der letzten Zeile von Überschriften und Absätzen
  document.querySelectorAll('h1, h2, h3, h4, p, li, figcaption').forEach((el) => {
    const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let letzter = null;
    while (w.nextNode()) if (w.currentNode.data.trim()) letzter = w.currentNode;
    const woerter = el.textContent.trim().split(/\s+/).length;
    if (!letzter || woerter < 2) return;
    // nur wenn die letzten zwei Wörter zusammen kurz genug für jede Zeilenbreite bleiben
    letzter.data = letzter.data.replace(/(^|\s)(\S+) (\S{1,10})(\s*)$/, (m, a, vor, wort, rest) =>
      ((vor.length + wort.length <= 16 && woerter >= 3) || wort.length <= 4 ? `${a}${vor}${NBSP}${wort}${rest}` : m));
  });
});
