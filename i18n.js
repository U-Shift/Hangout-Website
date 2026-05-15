const translations = { en, pt, es, nl, da, no };
let currentLang = '';

function switchLanguage(lang) {
    if (currentLang === lang) return;
    currentLang = lang;

    // Update active state of buttons
    document.querySelectorAll('.flag-btn').forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Translate all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        } else if (translations['en'] && translations['en'][key]) {
            // Fallback to English
            el.innerHTML = translations['en'][key];
        }
    });
}

// Initialize default language
window.addEventListener('DOMContentLoaded', () => {
    switchLanguage('en');
});
