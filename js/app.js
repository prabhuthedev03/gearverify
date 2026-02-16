/*
  GearVerify Dynamic Content Engine
*/

document.addEventListener('DOMContentLoaded', () => {
    fetchAndPopulateGuides();
});

let currentSlide = 0;
let slideInterval;

async function fetchAndPopulateGuides() {
    const sliderContainer = document.getElementById('guides-slider-container');
    const gridContainer = document.getElementById('guides-grid-container');

    if (!sliderContainer && !gridContainer) return;

    try {
        const dataSource = sliderContainer ? '/latest-guides.json' : '/content.json';
        const response = await fetch(dataSource);

        if (!response.ok) throw new Error('Lab report synchronization failed.');
        const data = await response.json();
        const guides = data.articles;

        const sortedGuides = guides.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (sliderContainer) {
            sliderContainer.innerHTML = '';
            sortedGuides.forEach((guide, index) => {
                const card = createGuideCard(guide, true);
                card.style.width = '100%';
                card.style.flexShrink = '0';
                sliderContainer.appendChild(card);
            });
            initSlider(sortedGuides.length);
        }

        if (gridContainer) {
            gridContainer.innerHTML = '';
            sortedGuides.forEach(guide => {
                gridContainer.appendChild(createGuideCard(guide, false));
            });
        }
    } catch (error) {
        console.error('Laboratory Error:', error);
        const errorMsg = '<div style="text-align: center; color: var(--text-secondary); padding: 4rem; width: 100%;">Error synchronizing guide data.</div>';
        if (sliderContainer) sliderContainer.innerHTML = errorMsg;
        if (gridContainer) gridContainer.innerHTML = errorMsg;
    }
}

function getCategoryStyles(category) {
    const themes = {
        'GPU': { bg: '#93A0D8', text: '#FFFFFF', accent: '#E3F2FD' },
        'Apple': { bg: '#AA91D6', text: '#FFFFFF', accent: '#F3E5F5' },
        'Display': { bg: '#7FCFE6', text: '#1A1A1A', accent: '#E0F7FA' },
        'RAM': { bg: '#C09DD6', text: '#FFFFFF', accent: '#F3E5F5' },
        'Compute': { bg: '#E8817F', text: '#FFFFFF', accent: '#FFEBEE' },
        'Safety': { bg: '#F7DD74', text: '#1A1A1A', accent: '#FFFDE7' },
        'Storage': { bg: '#81C784', text: '#FFFFFF', accent: '#E8F5E9' },
        'Performance': { bg: '#93A0D8', text: '#FFFFFF', accent: '#E3F2FD' }
    };
    return themes[category] || { bg: '#FFFFFF', text: '#1A1A1A', accent: '#F5F5F5' };
}

function createGuideCard(guide, isSlider) {
    const theme = getCategoryStyles(guide.category);
    const article = document.createElement('article');
    article.className = 'guide-card';

    // Base styles
    article.style.cssText = `
        background: ${theme.bg};
        color: ${theme.text};
        border-radius: 12px;
        padding: ${isSlider ? '3rem 2.5rem' : '1.5rem'};
        display: flex;
        flex-direction: column;
        gap: 1rem;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        position: relative;
        text-align: left;
        min-height: ${isSlider ? '220px' : 'auto'};
        border: 1px solid rgba(0,0,0,0.05);
    `;

    // New Badge
    let newBadge = '';
    if (guide.is_new) {
        newBadge = `<span style="
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            background: rgba(255,255,255,0.25);
            color: ${theme.text};
            font-size: 0.7rem;
            font-weight: 700;
            padding: 2px 8px;
            border-radius: 4px;
            text-transform: uppercase;
            backdrop-filter: blur(4px);
            letter-spacing: 0.05em;">New</span>`;
    }

    const icon = getIconSvg(guide.icon_type);

    article.innerHTML = `
        ${newBadge}
        <div class="card-icon" style="width: 32px; height: 32px; color: ${theme.text}; opacity: 0.9;">${icon}</div>
        <h3 style="margin: 0; font-size: ${isSlider ? '1.5rem' : '1.15rem'}; color: ${theme.text}; font-weight: 700; line-height: 1.2;">${guide.title}</h3>
        <p style="margin: 0; color: ${theme.text}; opacity: 0.85; font-size: 0.95rem; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; max-width: 600px;">${guide.excerpt}</p>
        <a href="${guide.slug}" style="margin-top: auto; color: ${theme.text}; font-weight: 700; text-decoration: none; font-size: 1rem; display: inline-flex; align-items: center; gap: 6px; border-bottom: 2px solid rgba(255,255,255,0.3); width: fit-content; padding-bottom: 2px;">
            Read Guide <span style="font-size: 1.2rem;">&rarr;</span>
        </a>
    `;

    if (!isSlider) {
        article.addEventListener('mouseenter', () => {
            article.style.transform = 'translateY(-4px)';
            article.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
        });
        article.addEventListener('mouseleave', () => {
            article.style.transform = 'translateY(0)';
            article.style.boxShadow = 'none';
        });
    }

    return article;
}

function initSlider(count) {
    const container = document.getElementById('guides-slider-container');
    const dotsContainer = document.getElementById('slider-dots');
    if (!container || !dotsContainer) return;

    // Create dots
    dotsContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('button');
        dot.style.cssText = `
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: none;
            background: rgba(0,0,0,0.1);
            cursor: pointer;
            padding: 0;
            transition: all 0.3s ease;
        `;
        if (i === 0) dot.style.background = '#0052FF';
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    startAutoSlide(count);
}

function startAutoSlide(count) {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % count;
        updateSlider();
    }, 5000);
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
    const count = document.getElementById('slider-dots').children.length;
    startAutoSlide(count);
}

function updateSlider() {
    const container = document.getElementById('guides-slider-container');
    const dots = document.getElementById('slider-dots').children;
    if (!container) return;

    container.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].style.background = (i === currentSlide) ? '#0052FF' : 'rgba(0,0,0,0.1)';
        dots[i].style.width = (i === currentSlide) ? '24px' : '10px';
        dots[i].style.borderRadius = (i === currentSlide) ? '5px' : '50%';
    }
}

function getIconSvg(type) {
    const icons = {
        spy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
        apple: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.94c1.88 0 3.05-1.12 3.05-2.73 0-1.46-.96-2.52-2.31-2.52-1.3 0-2.31.84-2.31 1.94 0 1.25 1 2.3 2.1 2.3 1.1 0 1.63-.5 1.63-.5"></path><path d="M12 2A10 10 0 1 0 22 12 10 10 0 0 0 12 2Z"></path></svg>`,
        fire: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.5 4 6.5 2 2 3 5.5 3 8.5a7 7 0 0 1-14 0c0-1.15.3-2.35 1-3.5 0 2.5 1.5 3.5 2.5 3.5z"></path></svg>`,
        monitor: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="13" rx="2" ry="2"></rect><path d="M8 21h8"></path><path d="M12 17v4"></path></svg>`,
        chip: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`,
        ghost: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 10h.01"></path><path d="M15 10h.01"></path><path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"></path></svg>`,
        memory: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="10" rx="2" ry="2"></rect><line x1="6" y1="21" x2="6" y2="17"></line><line x1="10" y1="21" x2="10" y2="17"></line><line x1="14" y1="21" x2="14" y2="17"></line><line x1="18" y1="21" x2="18" y2="17"></line></svg>`,
        shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
        storage: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`,
        extension: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="21 12 16.5 14.6 16.5 19.79"></polyline><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
        globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
        target: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
        test: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
        warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
        bolt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polyline></svg>`,
        performance: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>`,
        diamond: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 12L2 9l4-6z"></path></svg>`
    };
    return icons[type] || `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;
}
