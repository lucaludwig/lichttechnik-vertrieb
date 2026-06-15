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
