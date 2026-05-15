const translations = { en, pt, es, nl, da, no };
let currentLang = '';

function switchLanguage(lang) {
    if (currentLang === lang) return;
    currentLang = lang;
    localStorage.setItem('preferredLang', lang);

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

    // Notify other scripts that language has changed
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

function getDefaultLanguage() {
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang && translations[savedLang]) {
        return savedLang;
    }

    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang) {
        const shortLang = browserLang.split('-')[0].toLowerCase();
        if (translations[shortLang]) {
            return shortLang;
        }
    }

    return 'en';
}

// Initialize default language
window.addEventListener('DOMContentLoaded', () => {
    switchLanguage(getDefaultLanguage());
});
