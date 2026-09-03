// Immediately block transitions during initial document load / refresh (eliminates opening swipe/flash)
document.documentElement.classList.add('marp-preload-no-transition');

function enableSlideTransitions() {
  setTimeout(() => {
    document.documentElement.classList.remove('marp-preload-no-transition');
  }, 280);
}

if (document.readyState === 'complete') {
  enableSlideTransitions();
} else {
  window.addEventListener('load', enableSlideTransitions);
}

console.log('Thomas More Marp scripts.js loaded.');

/**
 * 1. Copy Code Feature for Code Blocks
 */
function initCopyButtons() {
  const isEn = document.documentElement.lang.startsWith('en') || 
               (document.querySelector('header') && document.querySelector('header').innerText.includes('English'));
  const copyLabel = isEn ? 'Copy' : 'Kopieer';
  const copiedLabel = isEn ? 'Copied!' : 'Gekopieerd!';

  document.querySelectorAll('pre').forEach((block) => {
    if (block.querySelector('.copy-code-btn')) return;

    const btn = document.createElement('button');
    btn.className = 'copy-code-btn';
    btn.innerText = copyLabel;
    btn.setAttribute('aria-label', copyLabel);

    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      e.preventDefault();

      const codeElement = block.querySelector('code');
      const code = codeElement ? codeElement.innerText : block.innerText;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(code);
        } else {
          const textarea = document.createElement('textarea');
          textarea.value = code;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }
        btn.innerText = copiedLabel;
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerText = copyLabel;
          btn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Copy failed:', err);
      }
    });

    block.style.position = 'relative';
    block.appendChild(btn);
  });
}

/**
 * 2. Lightbox Modal for Images in Slides
 */
function initLightbox() {
  // Inject Lightbox styles once if not already present
  if (!document.getElementById('marp-lightbox-styles')) {
    const style = document.createElement('style');
    style.id = 'marp-lightbox-styles';
    style.textContent = `
      .marp-lightbox-overlay {
        position: fixed;
        inset: 0;
        z-index: 99999;
        background: rgba(10, 14, 20, 0.88);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.25s ease, visibility 0.25s ease;
        padding: 24px;
        box-sizing: border-box;
      }
      .marp-lightbox-overlay.active {
        opacity: 1;
        visibility: visible;
      }
      .marp-lightbox-content {
        position: relative;
        max-width: 90vw;
        max-height: 85vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .marp-lightbox-img {
        max-width: 90vw;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(232, 78, 16, 0.3);
        transform: scale(0.95);
        transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .marp-lightbox-overlay.active .marp-lightbox-img {
        transform: scale(1);
      }
      .marp-lightbox-caption {
        margin-top: 12px;
        color: #e6edf3;
        font-family: 'Outfit', sans-serif;
        font-size: 15px;
        text-align: center;
        background: rgba(24, 31, 42, 0.85);
        border: 1px solid #2c3647;
        padding: 6px 16px;
        border-radius: 6px;
      }
      .marp-lightbox-close {
        position: absolute;
        top: 20px;
        right: 24px;
        width: 40px;
        height: 40px;
        background: rgba(24, 31, 42, 0.85);
        border: 1px solid #2c3647;
        border-radius: 50%;
        color: #ffffff;
        font-size: 24px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
      }
      .marp-lightbox-close:hover {
        background: #e84e10;
        border-color: #e84e10;
        transform: scale(1.08);
      }
      /* Clickable slide images indicator */
      section img:not([data-marp-twemoji]) {
        cursor: zoom-in;
        transition: transform 0.2s ease, opacity 0.2s ease;
      }
      section img:not([data-marp-twemoji]):hover {
        opacity: 0.92;
        transform: scale(1.01);
      }
    `;
    document.head.appendChild(style);
  }

  // Create modal container if missing
  let overlay = document.querySelector('.marp-lightbox-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'marp-lightbox-overlay';
    overlay.innerHTML = `
      <button class="marp-lightbox-close" aria-label="Sluiten">&times;</button>
      <div class="marp-lightbox-content">
        <img class="marp-lightbox-img" src="" alt="">
        <div class="marp-lightbox-caption" style="display: none;"></div>
      </div>
    `;
    document.body.appendChild(overlay);

    const closeBtn = overlay.querySelector('.marp-lightbox-close');
    const lightboxImg = overlay.querySelector('.marp-lightbox-img');
    const captionEl = overlay.querySelector('.marp-lightbox-caption');

    const closeLightbox = () => {
      overlay.classList.remove('active');
    };

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });

    overlay.addEventListener('click', (e) => {
      if (e.target !== lightboxImg) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        e.stopPropagation();
        closeLightbox();
      }
    });
  }

  const lightboxImg = overlay.querySelector('.marp-lightbox-img');
  const captionEl = overlay.querySelector('.marp-lightbox-caption');

  // Attach click listener to all slide images
  document.querySelectorAll('section img:not([data-marp-twemoji])').forEach((img) => {
    if (img.dataset.lightboxAttached) return;
    img.dataset.lightboxAttached = 'true';

    img.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();

      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt || 'Slide image';

      if (img.alt && img.alt.trim() !== '') {
        captionEl.innerText = img.alt;
        captionEl.style.display = 'block';
      } else {
        captionEl.style.display = 'none';
      }

      overlay.classList.add('active');
    });
  });
}

/**
 * 3. Dynamic Favicon Injection
 */
function initFavicon() {
  if (document.querySelector('link[rel*="icon"]')) return;

  let faviconUrl = '/presentations/assets/favicon.svg';

  // Resolve favicon relative to scripts.js location
  const scriptTag = document.currentScript || document.querySelector('script[src*="scripts.js"]');
  if (scriptTag && scriptTag.src) {
    try {
      faviconUrl = new URL('../assets/favicon.svg', scriptTag.src).href;
    } catch (e) {}
  }

  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  link.href = faviconUrl;
  document.head.appendChild(link);
}

/**
 * 4. Presentation Top Progress Bar
 */
function initProgressBar() {
  if (document.getElementById('marp-top-progress-bar')) return;

  // Insert styles if not already present
  if (!document.getElementById('marp-progress-bar-styles')) {
    const style = document.createElement('style');
    style.id = 'marp-progress-bar-styles';
    style.textContent = `
      #marp-top-progress-bar {
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        width: 0%;
        background: linear-gradient(90deg, #e84e10 0%, #ff753a 65%, #009cab 100%);
        box-shadow: 0 0 10px rgba(232, 78, 16, 0.45);
        z-index: 999999;
        transition: width 0.28s cubic-bezier(0.25, 1, 0.5, 1);
        pointer-events: none;
      }
      @media print {
        #marp-top-progress-bar {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  const progressBar = document.createElement('div');
  progressBar.id = 'marp-top-progress-bar';
  progressBar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progressBar);

  function updateProgress() {
    const slideElements = document.querySelectorAll('.bespoke-marp-slide').length > 0 
      ? Array.from(document.querySelectorAll('.bespoke-marp-slide'))
      : Array.from(document.querySelectorAll('svg[data-marpit-svg]'));

    const total = slideElements.length || document.querySelectorAll('section').length || 1;
    let currentIndex = 0;

    // 1. Check for active bespoke slide class
    const activeSlide = document.querySelector('.bespoke-marp-active');
    if (activeSlide && slideElements.length > 0) {
      const idx = slideElements.indexOf(activeSlide);
      if (idx !== -1) currentIndex = idx;
    } else if (window.location.hash) {
      // 2. Fallback to URL hash (#1, #2, etc.)
      const match = window.location.hash.match(/^#(\d+)/);
      if (match) {
        currentIndex = Math.max(0, parseInt(match[1], 10) - 1);
      }
    }

    const percent = Math.min(100, Math.max(0, Math.round(((currentIndex + 1) / total) * 100)));
    progressBar.style.width = percent + '%';
  }

  // Initial update
  updateProgress();

  // Listen for hash changes
  window.addEventListener('hashchange', updateProgress);

  // Listen for navigation keys
  window.addEventListener('keydown', () => {
    requestAnimationFrame(updateProgress);
    setTimeout(updateProgress, 80);
  });

  // Observe DOM changes on bespoke parent
  const parent = document.querySelector('.bespoke-marp-parent') || document.body;
  const observer = new MutationObserver(() => {
    updateProgress();
  });

  observer.observe(parent, {
    attributes: true,
    attributeFilter: ['class'],
    subtree: true
  });
}

/**
 * 5. Settings Modal (Theme Mode Toggle: Dark / Light)
 */
function applyTheme(mode) {
  const isLight = mode === 'light';
  document.documentElement.classList.toggle('theme-light', isLight);
  document.body.classList.toggle('theme-light', isLight);

  // Apply to all slide sections directly (matches section.theme-light in thomasmore.css)
  document.querySelectorAll('section').forEach((sec) => {
    sec.classList.toggle('theme-light', isLight);
  });

  localStorage.setItem('marp_theme_mode', isLight ? 'light' : 'dark');

  // Update modal buttons if modal exists
  const darkBtn = document.querySelector('.marp-theme-btn[data-theme="dark"]');
  const lightBtn = document.querySelector('.marp-theme-btn[data-theme="light"]');
  if (darkBtn && lightBtn) {
    darkBtn.classList.toggle('active', !isLight);
    lightBtn.classList.toggle('active', isLight);
  }
}

function initSettingsModal() {
  // Load settings.css stylesheet if not present
  if (!document.getElementById('marp-settings-css')) {
    const link = document.createElement('link');
    link.id = 'marp-settings-css';
    link.rel = 'stylesheet';
    const scriptTag = document.currentScript || document.querySelector('script[src*="scripts.js"]');
    const basePath = scriptTag ? scriptTag.src : window.location.href;
    link.href = new URL('../css/settings.css', basePath).href;
    document.head.appendChild(link);
  }

  // Apply saved theme immediately
  const savedTheme = localStorage.getItem('marp_theme_mode') || 'dark';
  applyTheme(savedTheme);

  // 1. Inject slide controls (TOC + Settings gear) on each slide section (bottom-left)
  function injectSlideControls() {
    document.querySelectorAll('section').forEach((sec) => {
      if (sec.querySelector('.marp-slide-controls')) return;

      // Remove any legacy standalone gear buttons
      const oldGear = sec.querySelector('.marp-gear-btn');
      if (oldGear && !oldGear.parentElement.classList.contains('marp-slide-controls')) {
        oldGear.remove();
      }

      const controls = document.createElement('div');
      controls.className = 'marp-slide-controls';

      // 1. Home button (back to overview index)
      const homeBtn = document.createElement('a');
      homeBtn.className = 'marp-home-btn';
      homeBtn.setAttribute('aria-label', 'Home');
      homeBtn.setAttribute('title', 'Overview (h)');
      homeBtn.href = '../../index.html';
      homeBtn.innerHTML = `
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      `;
      controls.appendChild(homeBtn);

      // 2. Table of Contents button
      const tocBtn = document.createElement('button');
      tocBtn.className = 'marp-toc-btn';
      tocBtn.setAttribute('type', 'button');
      tocBtn.setAttribute('aria-label', 'Table of Contents');
      tocBtn.setAttribute('title', 'Table of Contents (t)');
      tocBtn.innerHTML = `
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      `;
      tocBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (window.marpToggleTOC) window.marpToggleTOC();
      });
      controls.appendChild(tocBtn);

      // 3. Settings button
      const gearBtn = document.createElement('button');
      gearBtn.className = 'marp-gear-btn';
      gearBtn.setAttribute('type', 'button');
      gearBtn.setAttribute('aria-label', 'Settings');
      gearBtn.setAttribute('title', 'Settings (s)');
      gearBtn.innerHTML = `
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      `;
      gearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        openSettings();
      });
      controls.appendChild(gearBtn);

      sec.appendChild(controls);
    });
  }

  injectSlideControls();

  // 2. Create Modal Overlay (Universal English)
  let overlay = document.querySelector('.marp-settings-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'marp-settings-overlay';
    overlay.innerHTML = `
      <div class="marp-settings-dialog" role="dialog" aria-modal="true" aria-labelledby="marp-settings-title">
        <div class="marp-settings-header">
          <h3 id="marp-settings-title" class="marp-settings-title">Settings</h3>
          <button class="marp-settings-close" aria-label="Close">&times;</button>
        </div>

        <div class="marp-settings-section-title">Appearance</div>
        <div class="marp-theme-options">
          <button class="marp-theme-btn" data-theme="dark">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            Dark
          </button>
          <button class="marp-theme-btn" data-theme="light">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            Light
          </button>
        </div>

        <div class="marp-settings-section-title">Language / Taal</div>
        <div class="marp-language-options">
          <button class="marp-lang-btn" data-lang="dutch">
            <span class="lang-code">NL</span>
            <span class="lang-label">Nederlands</span>
          </button>
          <button class="marp-lang-btn" data-lang="english">
            <span class="lang-code">EN</span>
            <span class="lang-label">English</span>
          </button>
          <button class="marp-lang-btn" data-lang="french">
            <span class="lang-code">FR</span>
            <span class="lang-label">Français</span>
          </button>
        </div>

        <div class="marp-settings-footer">
          Press Esc or click outside to close
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const darkBtn = overlay.querySelector('[data-theme="dark"]');
    const lightBtn = overlay.querySelector('[data-theme="light"]');
    const closeBtn = overlay.querySelector('.marp-settings-close');

    darkBtn.addEventListener('click', () => applyTheme('dark'));
    lightBtn.addEventListener('click', () => applyTheme('light'));

    closeBtn.addEventListener('click', closeSettings);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeSettings();
    });

    // Language switcher handling (Feature 06)
    function getCurrentLanguage() {
      const metaCur = document.querySelector('meta[name="marp-current-lang"]');
      if (metaCur && metaCur.content) {
        return metaCur.content.toLowerCase().trim();
      }
      const p = (window.location.pathname || '').toLowerCase();
      if (p.includes('english')) return 'english';
      if (p.includes('french')) return 'french';
      return 'dutch';
    }

    function updateLanguageButtons() {
      const currLang = getCurrentLanguage();
      overlay.querySelectorAll('.marp-lang-btn').forEach((btn) => {
        const isCurrent = btn.dataset.lang === currLang;
        btn.classList.toggle('active', isCurrent);
      });
    }

    async function checkAvailableLanguages() {
      const currLang = getCurrentLanguage();
      const currentPath = window.location.pathname;
      const langSection = overlay.querySelector('.marp-language-options');
      const langTitle = langSection ? langSection.previousElementSibling : null;

      // 1. Check if meta tag defines available languages (instant, 0ms latency, 100% reliable on Netlify)
      const metaLangs = document.querySelector('meta[name="marp-languages"]');
      let knownAvailable = null;
      if (metaLangs && metaLangs.content) {
        knownAvailable = metaLangs.content.toLowerCase().split(',').map((s) => s.trim());
      }

      let visibleCount = 0;

      for (const btn of overlay.querySelectorAll('.marp-lang-btn')) {
        const lang = btn.dataset.lang;
        if (lang === currLang) {
          btn.style.display = 'flex';
          visibleCount++;
          continue;
        }

        if (knownAvailable) {
          const isAvail = knownAvailable.includes(lang);
          btn.style.display = isAvail ? 'flex' : 'none';
          if (isAvail) visibleCount++;
          continue;
        }

        // 2. Fallback: check via HEAD request if file exists
        const targetPath = currentPath.replace(new RegExp(currLang + '(\\.html)?$', 'i'), lang + '.html');
        try {
          const resp = await fetch(targetPath, { method: 'HEAD' });
          if (resp.ok) {
            btn.style.display = 'flex';
            visibleCount++;
          } else {
            btn.style.display = 'none';
          }
        } catch {
          btn.style.display = 'none';
        }
      }

      // If only 1 language is available in total, hide the switcher section
      if (visibleCount <= 1) {
        if (langSection) langSection.style.display = 'none';
        if (langTitle) langTitle.style.display = 'none';
      } else {
        if (langSection) langSection.style.display = 'flex';
        if (langTitle) langTitle.style.display = 'block';
      }
    }

    overlay.querySelectorAll('.marp-lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetLang = btn.dataset.lang;
        const currLang = getCurrentLanguage();
        if (targetLang === currLang || btn.style.display === 'none') return;

        const hash = window.location.hash || '';
        const metaModule = document.querySelector('meta[name="marp-module"]')?.content;
        const currentPath = window.location.pathname;

        let newPath;
        if (metaModule) {
          const idx = currentPath.indexOf(metaModule);
          if (idx !== -1) {
            const prefix = currentPath.slice(0, idx + metaModule.length);
            newPath = `${prefix}/${targetLang}.html`;
          } else {
            // Netlify clean short URL (e.g. /basic_html) -> navigate to module path
            newPath = `/${metaModule}/${targetLang}.html`;
          }
        } else {
          // Fallback: replace language token with or without .html
          newPath = currentPath.replace(/(dutch|english|french)(\.html)?$/i, targetLang + '.html');
        }

        window.location.href = newPath + hash;
      });
    });

    updateLanguageButtons();
    checkAvailableLanguages();
  }

  function openSettings() {
    overlay.classList.add('active');
    // Refresh language visibility on open
    const langBtn = overlay.querySelector('.marp-lang-btn');
    if (langBtn) {
      const p = (window.location.pathname || '').toLowerCase();
      const curr = p.includes('english') ? 'english' : (p.includes('french') ? 'french' : 'dutch');
      overlay.querySelectorAll('.marp-lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === curr));
    }
  }

  function closeSettings() {
    overlay.classList.remove('active');
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeSettings();
    } else if ((e.key === 's' || e.key === 'S') && !overlay.classList.contains('active')) {
      const tag = document.activeElement ? document.activeElement.tagName : '';
      if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) {
        // Prevent toggle if TOC is open
        const tocDrawer = document.querySelector('.marp-toc-drawer.active');
        if (!tocDrawer) {
          openSettings();
        }
      }
    } else if ((e.key === 'h' || e.key === 'H') && !overlay.classList.contains('active')) {
      const tag = document.activeElement ? document.activeElement.tagName : '';
      if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) {
        const tocDrawer = document.querySelector('.marp-toc-drawer.active');
        if (!tocDrawer) {
          window.location.href = '../../index.html';
        }
      }
    }
  });

  // Watch for any newly added slides
  const observer = new MutationObserver(() => {
    injectSlideControls();
    if (localStorage.getItem('marp_theme_mode') === 'light') {
      document.querySelectorAll('section:not(.theme-light)').forEach((sec) => {
        sec.classList.add('theme-light');
      });
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

/**
 * 6. Table of Contents (TOC Side Drawer) - Feature 10
 */
function initTableOfContents() {
  let backdrop = document.querySelector('.marp-toc-backdrop');
  let drawer = document.querySelector('.marp-toc-drawer');

  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'marp-toc-backdrop';
    document.body.appendChild(backdrop);
  }

  if (!drawer) {
    drawer = document.createElement('aside');
    drawer.className = 'marp-toc-drawer';
    drawer.setAttribute('role', 'navigation');
    drawer.setAttribute('aria-label', 'Table of Contents');

    const sections = Array.from(document.querySelectorAll('section'));
    const totalSlides = sections.length;

    drawer.innerHTML = `
      <div class="marp-toc-header">
        <div class="marp-toc-title-area">
          <h3 class="marp-toc-title">Table of Contents</h3>
          <span class="marp-toc-count">${totalSlides} slides</span>
        </div>
        <button class="marp-toc-close" aria-label="Close Table of Contents">&times;</button>
      </div>
      <div class="marp-toc-filter-box">
        <input type="text" class="marp-toc-filter-input" placeholder="Search / filter slides..." aria-label="Filter topics">
      </div>
      <ul class="marp-toc-list" role="list"></ul>
      <div class="marp-toc-footer">
        Press <kbd>t</kbd> to toggle &bull; <kbd>Esc</kbd> to close
      </div>
    `;

    document.body.appendChild(drawer);

    const list = drawer.querySelector('.marp-toc-list');
    const filterInput = drawer.querySelector('.marp-toc-filter-input');
    const closeBtn = drawer.querySelector('.marp-toc-close');

    // Build slide items
    sections.forEach((sec, idx) => {
      const slideNum = idx + 1;
      const formattedNum = slideNum < 10 ? '0' + slideNum : '' + slideNum;

      // Find title: search h1, h2, h3, or p
      let title = '';
      const heading = sec.querySelector('h1, h2, h3');
      if (heading) {
        const clone = heading.cloneNode(true);
        clone.querySelectorAll('.badge, .badge-cyan, .badge-outline, .badge-outline-cyan').forEach(b => b.remove());
        title = clone.textContent.replace(/^(\/\/|##|#)\s*/, '').trim();
      }

      if (!title) {
        const firstP = sec.querySelector('p');
        if (firstP) {
          title = firstP.textContent.trim().slice(0, 50);
        }
      }

      if (!title) {
        title = sec.classList.contains('lead') ? 'Overview / Title' : 'Slide ' + slideNum;
      }

      const li = document.createElement('li');
      li.className = 'marp-toc-item';
      li.dataset.slide = slideNum;
      li.dataset.title = title.toLowerCase();
      if (sec.classList.contains('lead')) {
        li.classList.add('is-lead');
      }

      li.innerHTML = `
        <span class="marp-toc-badge">${formattedNum}</span>
        <span class="marp-toc-item-text" title="${title}">${title}</span>
      `;

      li.addEventListener('click', () => {
        window.location.hash = '#' + slideNum;
        closeTOC();
      });

      list.appendChild(li);
    });

    // Realtime filter search
    filterInput.addEventListener('input', () => {
      const q = filterInput.value.trim().toLowerCase();
      drawer.querySelectorAll('.marp-toc-item').forEach((item) => {
        const text = item.dataset.title || '';
        const num = item.dataset.slide || '';
        const matches = !q || text.includes(q) || num === q;
        item.style.display = matches ? 'flex' : 'none';
      });
    });

    closeBtn.addEventListener('click', closeTOC);
    backdrop.addEventListener('click', closeTOC);
  }

  function openTOC() {
    drawer.classList.add('active');
    backdrop.classList.add('active');
    updateActiveTOCItem();
    const input = drawer.querySelector('.marp-toc-filter-input');
    if (input) {
      input.value = '';
      drawer.querySelectorAll('.marp-toc-item').forEach(i => i.style.display = 'flex');
      setTimeout(() => input.focus(), 150);
    }
  }

  function closeTOC() {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
  }

  function toggleTOC() {
    if (drawer.classList.contains('active')) {
      closeTOC();
    } else {
      openTOC();
    }
  }

  function getCurrentSlideIndex() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#')) {
      const num = parseInt(hash.slice(1), 10);
      if (!isNaN(num)) return num;
    }
    const activeSection = document.querySelector('section.bespoke-marp-active');
    if (activeSection) {
      const sections = Array.from(document.querySelectorAll('section'));
      return sections.indexOf(activeSection) + 1;
    }
    return 1;
  }

  function updateActiveTOCItem() {
    const currentNum = getCurrentSlideIndex();
    const items = drawer.querySelectorAll('.marp-toc-item');
    items.forEach((item) => {
      const isCurr = parseInt(item.dataset.slide, 10) === currentNum;
      item.classList.toggle('is-current', isCurr);
      if (isCurr && drawer.classList.contains('active')) {
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    });
  }

  // Keyboard shortcut listener: 't' or 'o' to toggle, Escape to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (drawer && drawer.classList.contains('active')) {
        closeTOC();
        e.stopPropagation();
      }
    } else if ((e.key === 't' || e.key === 'T' || e.key === 'o' || e.key === 'O')) {
      const tag = document.activeElement ? document.activeElement.tagName : '';
      if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) {
        const settingsModal = document.querySelector('.marp-settings-overlay.active');
        if (!settingsModal) {
          e.preventDefault();
          toggleTOC();
        }
      }
    }
  });

  window.addEventListener('hashchange', updateActiveTOCItem);

  // Expose toggleTOC globally for buttons
  window.marpToggleTOC = toggleTOC;
}

// Global initialization function
function initMarpScripts() {
  initFavicon();
  initCopyButtons();
  initLightbox();
  initProgressBar();
  initSettingsModal();
  initTableOfContents();
}

window.copyCode = initCopyButtons;
window.initLightbox = initLightbox;
window.initFavicon = initFavicon;
window.initProgressBar = initProgressBar;
window.initSettingsModal = initSettingsModal;
window.applyTheme = applyTheme;
window.initMarpScripts = initMarpScripts;

// Run favicon immediately if head is ready, plus on ready
initFavicon();

// Apply saved theme immediately on script execution
if (localStorage.getItem('marp_theme_mode') === 'light') {
  document.documentElement.classList.add('theme-light');
  document.body.classList.add('theme-light');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMarpScripts);
} else {
  initMarpScripts();
}




