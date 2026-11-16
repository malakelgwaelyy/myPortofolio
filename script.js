/* Malak Elgwaely portfolio: progressive enhancement only.
   The page is fully readable without this script. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Footer year ---- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---- Header state on scroll ---- */
  var header = document.getElementById('site-header');
  var progress = document.getElementById('progress');
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(window.scrollY / max, 1) : 0) + ')';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  var toggle = document.getElementById('menu-toggle');
  var navList = document.getElementById('nav-list');

  function setMenu(open, returnFocus) {
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (!open && returnFocus) toggle.focus();
  }

  toggle.addEventListener('click', function () {
    setMenu(!header.classList.contains('is-open'), false);
  });

  navList.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false, false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && header.classList.contains('is-open')) {
      setMenu(false, true);
    }
  });

  document.addEventListener('click', function (e) {
    if (header.classList.contains('is-open') && !header.contains(e.target)) {
      setMenu(false, false);
    }
  });

  // Close the menu automatically if the viewport grows past the mobile breakpoint.
  var desktopQuery = window.matchMedia('(min-width: 861px)');
  desktopQuery.addEventListener('change', function (e) {
    if (e.matches) setMenu(false, false);
  });

  /* ---- Active section highlight ---- */
  var links = Array.prototype.slice.call(navList.querySelectorAll('a[href^="#"]'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  function setActive(id) {
    links.forEach(function (a) {
      var match = a.getAttribute('href') === '#' + id;
      if (match) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var activeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { activeObserver.observe(s); });
  }

  /* ---- Reveal on scroll ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    root.classList.add('js-motion');
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---- Certificate dialog ---- */
  var certs = {
    cisco: {
      image: 'assets/certificates/cyber_cisco.png',
      title: 'Introduction to Cybersecurity',
      info: 'Issued by Cisco Networking Academy via Skills Plus Egypt. Instructor: Belal Mohamed. Completed January 13, 2026.',
      initials: 'CISCO'
    },
    iti: {
      image: 'assets/certificates/screenshot.png',
      title: 'Python Programming Basics',
      info: 'ITI Mahara-Tech Platform, Artificial Intelligence Academy. Duration: 1h 38min. Verification: AlFrmseqHS. Completed January 29, 2026.',
      initials: 'ITI'
    },
    basef: {
      image: 'assets/certificates/BASEF.png',
      title: 'BASEF Science & Engineering Fair, participant',
      info: 'Bibliotheca Alexandrina Science and Engineering Fair, organized by the Planetarium Science Center. March 8–10, 2024.',
      initials: 'BA'
    }
  };

  var dialog = document.getElementById('cert-dialog');
  var closeBtn = document.getElementById('cert-close');
  var media = document.getElementById('cert-media');
  var dTitle = document.getElementById('cert-dialog-title');
  var dInfo = document.getElementById('cert-dialog-info');
  var lastTrigger = null;

  function openCert(key, trigger) {
    var c = certs[key];
    if (!c || !dialog) return;
    lastTrigger = trigger || null;

    media.textContent = '';
    var img = document.createElement('img');
    img.alt = c.title + ' certificate';
    img.src = c.image;
    img.addEventListener('error', function () {
      img.remove();
      var ph = document.createElement('div');
      ph.className = 'dialog-placeholder';
      ph.textContent = c.initials;
      media.appendChild(ph);
    });
    media.appendChild(img);

    dTitle.textContent = c.title;
    dInfo.textContent = c.info;

    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    closeBtn.focus();
  }

  function closeCert() {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }

  document.querySelectorAll('[data-cert]').forEach(function (btn) {
    btn.addEventListener('click', function () { openCert(btn.getAttribute('data-cert'), btn); });
  });

  closeBtn.addEventListener('click', closeCert);

  // Close when clicking the backdrop (outside the dialog box).
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) closeCert();
  });

  // Return focus to the card that opened the dialog.
  dialog.addEventListener('close', function () {
    if (lastTrigger) lastTrigger.focus();
    lastTrigger = null;
  });
})();
