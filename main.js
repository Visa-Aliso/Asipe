// ============================================================
// Personal Homepage - Main JavaScript
// ============================================================

let config = null;

// ============================================================
// Initialization
// ============================================================
async function init() {
    try {
        // Show loading indicator
        const loading = document.getElementById('loading');

        // Load config.json
        const response = await fetch('config.json');
        if (!response.ok) {
            throw new Error(`Failed to load config.json: ${response.status}`);
        }

        config = await response.json();

        // Set page title
        if (config.pageTitle) {
            document.title = config.pageTitle;
        }

        // Render page
        render();

        // Initialize theme
        initTheme();

        // Hide loading indicator
        setTimeout(() => {
            loading.classList.add('hidden');
        }, 300);

    } catch (error) {
        console.error('Failed to initialize:', error);
        document.body.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif;">
                <div style="text-align: center; max-width: 500px; padding: 20px;">
                    <h2 style="color: #dc2626; margin-bottom: 16px;">⚠️ Failed to Load Configuration</h2>
                    <p style="color: #666; margin-bottom: 16px;">Please make sure <code>config.json</code> exists and is valid JSON.</p>
                    <p style="color: #999; font-size: 14px;">Error: ${error.message}</p>
                </div>
            </div>
        `;
    }
}

// ============================================================
// Theme Management
// ============================================================
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';

    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// ============================================================
// Render Functions
// ============================================================
function render() {
    renderHeader();
    renderMain();
    renderFooter();
    initShowMoreButtons();
}

function renderHeader() {
    const header = document.getElementById('header');

    let html = '';

    // Avatar
    if (config.avatar) {
        html += `
            <div class="profile-avatar">
                <img src="${escapeHtml(config.avatar)}" alt="${escapeHtml(config.name)}" />
            </div>
        `;
    }

    // Name
    html += `<h1 class="profile-name">${escapeHtml(config.name)}</h1>`;

    // Title
    if (config.title) {
        html += `<p class="profile-title">${escapeHtml(config.title)}</p>`;
    }

    // Affiliation
    if (config.affiliation) {
        html += `<p class="profile-affiliation">${escapeHtml(config.affiliation)}</p>`;
    }

    // Bio
    if (config.bio) {
        html += `
            <div class="profile-bio">
                ${renderMarkdown(config.bio)}
            </div>
        `;
    }

    // Links
    if (config.links && config.links.length > 0) {
        html += '<div class="profile-links">';
        config.links.forEach(link => {
            const iconName = link.icon || '';
            const faIcon = getFontAwesomeIcon(iconName);
            html += `
                <a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer" class="profile-link">
                    ${faIcon ? `<i class="${faIcon}"></i>` : ''}
                    <span>${escapeHtml(link.name)}</span>
                </a>
            `;
        });
        html += '</div>';
    }

    header.innerHTML = html;
}

function renderMain() {
    const main = document.getElementById('main');
    let html = '';

    if (config.sections) {
        for (const [key, section] of Object.entries(config.sections)) {
            // Check if section is visible (default to true if not specified)
            const isVisible = section.visible !== false;
            if (isVisible && section.items && section.items.length > 0) {
                html += renderSection(key, section);
            }
        }
    }

    main.innerHTML = html;
}

function renderSection(key, section) {
    const initialShow = section.initialShow || section.items.length;
    const hasMore = section.items.length > initialShow;

    let html = `
        <section class="content-section" data-section="${key}">
            <h2 class="section-title">${escapeHtml(section.title)}</h2>
            <div class="section-items" data-section-key="${key}">
    `;

    section.items.forEach((item, index) => {
        const isHidden = index >= initialShow;
        html += `<div class="section-item ${isHidden ? 'collapsed' : ''}" data-index="${index}">`;
        html += renderItem(key, item, index);
        html += '</div>';
    });

    html += `</div>`;

    if (hasMore) {
        html += `
            <button class="show-more-btn" data-section="${key}" data-initial="${initialShow}" data-expanded="false">
                Show More
            </button>
        `;
    }

    html += `</section>`;

    return html;
}

function renderItem(sectionKey, item, index) {
    // Education section
    if (sectionKey === 'education') {
        return `
            <div class="edu-item">
                ${item.years ? `<div class="edu-years">${item.years.replace(/\n/g, '<br/>')}</div>` : ''}
                ${item.logo ? `
                    <div class="edu-logo">
                        <img src="${escapeHtml(item.logo)}" alt="${escapeHtml(item.school || '')}" onerror="this.style.display='none'" />
                    </div>
                ` : ''}
                <div class="edu-content">
                    ${item.school ? `<div class="edu-school">${
                        item.schoolUrl
                            ? `<a href="${escapeHtml(item.schoolUrl)}" target="_blank" rel="noopener noreferrer">${renderMarkdown(item.school)}</a>`
                            : renderMarkdown(item.school)
                    }</div>` : ''}
                    ${item.dept ? `<div class="edu-dept">${renderMarkdown(item.dept)}</div>` : ''}
                    ${item.degree ? `<div class="edu-degree">${renderMarkdown(item.degree)}</div>` : ''}
                </div>
            </div>
        `;
    }

    // Publications section
    if (sectionKey === 'publications') {
        let html = '<div class="pub-item">';

        // Title
        if (item.title) {
            html += `<div class="pub-title">${escapeHtml(item.title)}</div>`;
        }

        // Authors
        if (item.authors) {
            html += `<div class="pub-authors">${renderMarkdown(item.authors)}</div>`;
        }

        // Venue
        if (item.venue) {
            html += `<div class="pub-venue">`;
            if (item.type) {
                html += `<span class="pub-type">${escapeHtml(item.type)}</span>`;
            }
            html += `<span class="venue-name">${escapeHtml(item.venue)}</span>`;
            html += `</div>`;
        }

        // Links
        if (item.links && item.links.length > 0) {
            html += '<div class="pub-links">';
            item.links.forEach(link => {
                html += `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer" class="pub-link">[${escapeHtml(link.name)}]</a>`;
            });
            html += '</div>';
        }

        // Award
        if (item.award) {
            html += `<div class="pub-award">🏆 ${escapeHtml(item.award)}</div>`;
        }

        html += '</div>';
        return html;
    }

    // Projects section
    if (sectionKey === 'projects') {
        let html = '<div class="project-item">';

        if (item.title) {
            if (item.url) {
                html += `<div class="project-title"><a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.title)}</a></div>`;
            } else {
                html += `<div class="project-title">${escapeHtml(item.title)}</div>`;
            }
        }

        if (item.description) {
            html += `<div class="project-desc">${escapeHtml(item.description)}</div>`;
        }

        html += '</div>';
        return html;
    }

    // Awards section
    if (sectionKey === 'awards') {
        let html = '<div class="pub-item">';

        if (item.title) {
            html += `<div class="pub-title">${escapeHtml(item.title)}</div>`;
        }

        if (item.organization || item.year) {
            html += '<div class="pub-venue">';
            if (item.organization) {
                html += `<span class="venue-name">${escapeHtml(item.organization)}</span>`;
            }
            if (item.year) {
                html += `<span style="color: var(--text-light); font-size: 14px;">${escapeHtml(item.year)}</span>`;
            }
            html += '</div>';
        }

        if (item.description) {
            html += `<div class="pub-authors">${escapeHtml(item.description)}</div>`;
        }

        html += '</div>';
        return html;
    }

    // Open Source section
    if (sectionKey === 'opensource') {
        let html = '<div class="pub-item">';

        if (item.title) {
            if (item.url) {
                html += `<div class="pub-title"><a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" style="color: var(--text); text-decoration: none;">${escapeHtml(item.title)}</a></div>`;
            } else {
                html += `<div class="pub-title">${escapeHtml(item.title)}</div>`;
            }
        }

        if (item.organization || item.year) {
            html += '<div class="pub-venue">';
            if (item.organization) {
                html += `<span class="venue-name">${escapeHtml(item.organization)}</span>`;
            }
            if (item.year) {
                html += `<span style="color: var(--text-light); font-size: 14px;">${escapeHtml(item.year)}</span>`;
            }
            html += '</div>';
        }

        if (item.description) {
            html += `<div class="pub-authors">${escapeHtml(item.description)}</div>`;
        }

        html += '</div>';
        return html;
    }

    // Default item rendering
    return `
        <div class="item">
            ${item.title ? `<div class="item-title">${escapeHtml(item.title)}</div>` : ''}
            ${item.description ? `<div class="item-desc">${escapeHtml(item.description)}</div>` : ''}
        </div>
    `;
}

function renderFooter() {
    const footer = document.getElementById('footer');
    const year = new Date().getFullYear();
    footer.innerHTML = `<p>© ${year} ${escapeHtml(config.name)}</p>`;
}

// ============================================================
// Show More/Less Functionality
// ============================================================
function initShowMoreButtons() {
    const buttons = document.querySelectorAll('.show-more-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionKey = this.getAttribute('data-section');
            const initialShow = parseInt(this.getAttribute('data-initial'));
            const isExpanded = this.getAttribute('data-expanded') === 'true';
            const sectionItems = document.querySelector(`.section-items[data-section-key="${sectionKey}"]`);
            const items = sectionItems.querySelectorAll('.section-item');

            if (isExpanded) {
                // Collapse: hide items beyond initialShow
                items.forEach((item, index) => {
                    if (index >= initialShow) {
                        setTimeout(() => {
                            item.classList.add('collapsed');
                        }, index * 30);
                    }
                });

                this.textContent = 'Show More';
                this.setAttribute('data-expanded', 'false');
            } else {
                // Expand: show all items
                items.forEach((item, index) => {
                    if (index >= initialShow) {
                        setTimeout(() => {
                            item.classList.remove('collapsed');
                        }, (index - initialShow) * 50);
                    }
                });

                this.textContent = 'Show Less';
                this.setAttribute('data-expanded', 'true');
            }
        });
    });
}

// ============================================================
// Utility Functions
// ============================================================
function getFontAwesomeIcon(iconName) {
    const iconMap = {
        'github': 'fab fa-github',
        'book-open': 'fas fa-book-open',
        'mail': 'fas fa-envelope',
        'linkedin': 'fab fa-linkedin',
        'twitter': 'fab fa-twitter',
        'globe': 'fas fa-globe',
        'file-text': 'fas fa-file-alt',
        'youtube': 'fab fa-youtube',
        'instagram': 'fab fa-instagram',
        'facebook': 'fab fa-facebook'
    };
    return iconMap[iconName] || '';
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function renderMarkdown(text) {
    if (!text) return '';

    return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
        .replace(/`(.+?)`/g, '<code>$1</code>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');
}

// ============================================================
// Start Application
// ============================================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
