(function () {
  const savedLang = localStorage.getItem('lang') || 'ar';

  function applyLang(lang) {
    const t = translations[lang];
    if (!t) return;

    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        el.innerHTML = t[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) {
        el.setAttribute('placeholder', t[key]);
      }
    });

    document.querySelectorAll('.lang-toggle-text').forEach(function (el) {
      el.textContent = t['lang-toggle'];
    });

    localStorage.setItem('lang', lang);
  }

  applyLang(savedLang);

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.lang-toggle-btn');
    if (!btn) return;
    var currentLang = localStorage.getItem('lang') || 'ar';
    var newLang = currentLang === 'ar' ? 'en' : 'ar';
    applyLang(newLang);
  });
})();
