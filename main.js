// ===== Dark mode (runs immediately, before DOMContentLoaded) =====
;(function () {
  if (localStorage.getItem('hp-color-mode') === 'dark') {
    document.documentElement.classList.add('dark');
  }
})();

document.addEventListener('DOMContentLoaded', function () {

  // ===== Mode toggle =====
  document.addEventListener('click', function (e) {
    if (e.target.closest('.mode-toggle')) {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('hp-color-mode', isDark ? 'dark' : 'light');
    }
  });

  // ===== Hamburger nav =====
  const hamburger = document.querySelector('.hamburger');
  const navMobile = document.querySelector('.nav-mobile');

  if (hamburger && navMobile) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.toggle('open');
      navMobile.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navMobile.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ===== Scroll fade-in =====
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(function (el) {
    observer.observe(el);
  });

  // ===== Active nav link =====
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ===== Email form =====
  document.querySelectorAll('.lead-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var btn = form.querySelector('.btn');
      if (!input || !input.value.includes('@')) return;
      btn.textContent = 'Done. Check your inbox.';
      btn.style.backgroundColor = 'transparent';
      btn.style.color = 'var(--accent)';
      btn.style.border = '1px solid var(--accent)';
      input.disabled = true;
      btn.disabled = true;
    });
  });

});
