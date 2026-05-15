
function renderNews(lang) {
    const featuredContainer = document.getElementById('featured-news-container');
    const gridContainer = document.getElementById('standard-news-container');

    if (!featuredContainer || !gridContainer) return;

    // Clear previous articles
    featuredContainer.innerHTML = '';

    // We only clear articles with the class 'dynamic-article' so we don't remove the "More news coming soon" placeholder
    gridContainer.querySelectorAll('.dynamic-article').forEach(el => el.remove());

    newsArticles.forEach(article => {
        // Fallback to English if translation is missing
        const content = article.content[lang] || article.content['en'];

        if (article.featured) {
            featuredContainer.innerHTML += `
            <div class="partner-card news-feature-card" style="gap: 2.5rem; text-align: left; padding: 2rem; max-width: 1000px; margin: 0 auto 3rem; cursor: default; transform: none; height: auto;">
                <div style="border-radius: 12px; overflow: hidden; background: rgba(0,0,0,0.05); aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center;">
                    <img src="${article.image}" alt="${content.title}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.9;">
                </div>
                <div style="display: flex; flex-direction: column; justify-content: center;">
                    <span style="display: inline-block; padding: 0.3rem 0.8rem; background: var(--color-orange); color: white; border-radius: 50px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; margin-bottom: 1rem; width: fit-content;">${content.tag}</span>
                    <h3 style="font-family: var(--font-heading); font-size: 2rem; color: var(--color-navy); margin-bottom: 1rem; line-height: 1.2;">${content.title}</h3>
                    <p style="color: var(--color-text-muted); font-size: 1.1rem; line-height: 1.6; margin-bottom: 1.5rem;">${content.body}</p>
                    <div style="display: flex; align-items: center; gap: 1rem; font-size: 0.9rem; font-weight: 600; color: var(--color-teal);">
                        <span><i class="fa-regular fa-calendar" style="margin-right: 0.3rem;"></i> ${content.dateLabel}</span>
                        <span><i class="fa-regular fa-clock" style="margin-right: 0.3rem;"></i> ${content.readTimeLabel}</span>
                    </div>
                </div>
            </div>`;
        } else {
            gridContainer.insertAdjacentHTML('afterbegin', `
            <div class="partner-card dynamic-article" style="text-align: left; padding: 1.5rem; cursor: default; transform: none; height: auto; display: flex; flex-direction: column;">
                <div style="border-radius: 8px; overflow: hidden; background: rgba(0,0,0,0.05); aspect-ratio: 16/9; margin-bottom: 1rem;">
                    <img src="${article.image}" alt="${content.title}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.9;">
                </div>
                <span style="display: inline-block; padding: 0.2rem 0.6rem; background: var(--color-teal); color: white; border-radius: 50px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.8rem; width: fit-content;">${content.tag}</span>
                <h4 style="font-size: 1.25rem; color: var(--color-navy); margin-bottom: 0.5rem; line-height: 1.3;">${content.title}</h4>
                <p style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.5; margin-bottom: 1rem; flex-grow: 1;">${content.body}</p>
                <div style="display: flex; align-items: center; gap: 1rem; font-size: 0.8rem; font-weight: 600; color: var(--color-teal);">
                    <span><i class="fa-regular fa-calendar" style="margin-right: 0.3rem;"></i> ${content.dateLabel}</span>
                </div>
            </div>`);
        }
    });
}

// Listen for language changes
document.addEventListener('languageChanged', (e) => {
    renderNews(e.detail.lang);
});

// Also trigger an initial render if the language is already set
if (typeof currentLang !== 'undefined' && currentLang) {
    renderNews(currentLang);
}
