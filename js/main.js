(function () {
  'use strict';

  var root = document.documentElement;

  // Apply the preloaded web-font stylesheet without blocking first paint
  var fontPreload = document.querySelector('link[rel="preload"][as="style"]');
  if (fontPreload) {
    var fontStylesheet = document.createElement('link');
    fontStylesheet.rel = 'stylesheet';
    fontStylesheet.href = fontPreload.href;
    document.head.appendChild(fontStylesheet);
  }

  // Theme toggle
  var themeToggle = document.getElementById('theme-toggle');
  var themeLabel = themeToggle ? themeToggle.querySelector('.theme-toggle-label') : null;

  function syncThemeControl() {
    var isDark = root.getAttribute('data-theme') !== 'light';
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.setAttribute('aria-label', isDark ? 'Dark theme, activate to switch to light' : 'Light theme, activate to switch to dark');
    }
    if (themeLabel) {
      themeLabel.textContent = isDark ? 'Dark' : 'Light';
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      syncThemeControl();
    });
    syncThemeControl();
  }

  // Mobile navigation
  var menuToggle = document.getElementById('menu-toggle');
  var mobileNav = document.getElementById('mobile-nav');

  function closeMenu(focusToggle) {
    if (!mobileNav || !menuToggle) return;
    mobileNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    if (focusToggle) menuToggle.focus();
  }

  function openMenu() {
    if (!mobileNav || !menuToggle) return;
    mobileNav.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.contains('is-open');
      if (isOpen) { closeMenu(false); } else { openMenu(); }
    });

    mobileNav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        closeMenu(true);
      }
    });
  }

  // Only now that the menu is wired do we let CSS collapse the fallback navigation
  // and reveal the JS-only controls. If this file never runs, `no-js` styling keeps
  // the navigation open and usable and hides the inert toggles.
  root.classList.replace('no-js', 'js');

  // Sticky header background after scroll
  var header = document.querySelector('.site-header');
  if (header) {
    var updateHeaderState = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
  }

  // Scroll-reveal, only enabled when IntersectionObserver is available
  if ('IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll('[data-reveal]');
    if (revealEls.length) {
      root.classList.add('reveal-ready');
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
      revealEls.forEach(function (el) { observer.observe(el); });
    }
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
