// Portfolio interactions – plain JavaScript, works when opened via file:// in Chrome.

(function () {
  'use strict';

  // ---- Footer year ----
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---- Profile photo: show the initial instead if images/tobias.jpg is missing ----
  var photo = document.querySelector('.hero-photo img');
  function showPhotoFallback() {
    photo.closest('.hero-photo').classList.add('no-photo');
  }
  if (photo) {
    photo.addEventListener('error', showPhotoFallback);
    // The image may already have failed before this script ran
    if (photo.complete && photo.naturalWidth === 0) {
      showPhotoFallback();
    }
  }

  // ---- Mobile menu toggle ----
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  function setMenu(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(!nav.classList.contains('open'));
    });

    // Close the menu after a link is chosen
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenu(false);
      });
    });

    // Close with the Escape key
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        setMenu(false);
      }
    });
  }

  // ---- Back-to-top button: show it once the visitor has scrolled down a bit ----
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    var updateBackToTop = function () {
      backToTop.classList.toggle('is-visible', window.scrollY > 600);
    };
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    updateBackToTop(); // in case the page was reloaded halfway down
  }

  // Older browsers without IntersectionObserver simply skip the effects below
  if (!('IntersectionObserver' in window)) {
    return;
  }

  // ---- Highlight the nav link of the section currently in view ----
  var navLinks = document.querySelectorAll('.site-nav a');
  var sections = document.querySelectorAll('main section[id]');

  function setActive(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + id);
    });
  }

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  // The last section (Contact) is too short to reach the middle of the screen,
  // so highlight it whenever the page is scrolled to the very bottom.
  var lastSection = sections[sections.length - 1];
  window.addEventListener('scroll', function () {
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom && lastSection) {
      setActive(lastSection.id);
    }
  }, { passive: true });

  // ---- Fade content in as it scrolls into view ----
  var revealTargets = document.querySelectorAll('.section h2, .section p, .fact, .skills li, .card, .contact-links');

  var revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealTargets.forEach(function (el) {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
})();
