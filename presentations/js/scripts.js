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
  const metaLang = document.querySelector('meta[name="marp-current-lang"]');
  const currentLang = metaLang ? metaLang.getAttribute('content') : '';
  const isEn = currentLang === 'english' || 
               (!currentLang && (document.documentElement.lang.startsWith('en') || 
                (document.querySelector('header') && document.querySelector('header').innerText.includes('English'))));
  const tooltipText = isEn ? 'Copy code' : 'Kopieer code';
  const copiedTooltip = isEn ? 'Copied!' : 'Gekopieerd!';

  const copyIconSvg = '<svg class="copy-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
  const checkIconSvg = '<svg class="check-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

  document.querySelectorAll('pre, marp-pre').forEach((block) => {
    // Avoid duplicate processing
    if (block.parentElement && block.parentElement.classList.contains('marp-code-wrapper')) return;
    if (block.querySelector('.copy-code-btn')) return;

    // Wrap block in an outer relative container to guarantee top-right positioning outside Marp auto-scaling SVG
    const wrapper = document.createElement('div');
    wrapper.className = 'marp-code-wrapper';

    const blockStyle = window.getComputedStyle(block);
    if (blockStyle.margin && blockStyle.margin !== '0px') {
      wrapper.style.margin = blockStyle.margin;
    }
    block.style.margin = '0';

    block.parentNode.insertBefore(wrapper, block);
    wrapper.appendChild(block);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-code-btn';
    btn.setAttribute('aria-label', tooltipText);
    // Intentionally do NOT set title attribute to avoid browser default OS tooltip

    btn.innerHTML = `
      <span class="copy-icon-wrap">${copyIconSvg}</span>
      <span class="check-icon-wrap">${checkIconSvg}</span>
      <span class="copy-tooltip">${tooltipText}</span>
    `;

    const tip = btn.querySelector('.copy-tooltip');

    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      e.preventDefault();

      const codeElement = block.querySelector('code');
      let code = codeElement ? codeElement.innerText : '';
      if (!code) {
        const clone = block.cloneNode(true);
        const b = clone.querySelector('.copy-code-btn');
        if (b) b.remove();
        code = clone.innerText;
      }

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
        btn.classList.add('copied');
        if (tip) tip.textContent = copiedTooltip;
        setTimeout(() => {
          btn.classList.remove('copied');
          if (tip) tip.textContent = tooltipText;
        }, 2000);
      } catch (err) {
        console.error('Copy failed:', err);
      }
    });

    wrapper.appendChild(btn);
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

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        closeLightbox();
      }
    }, true);
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

      // Language-aware tooltips (removes native title attribute to prevent ugly browser tooltip)
      const metaLang = document.querySelector('meta[name="marp-current-lang"]')?.content?.toLowerCase() || '';
      const p = (window.location.pathname || '').toLowerCase();
      const isEn = metaLang === 'english' || p.includes('english');
      const isFr = metaLang === 'french' || p.includes('french');
      const isMa = metaLang === 'moroccan' || p.includes('moroccan');

      const tooltips = isMa
        ? { home: 'نظرة عامة (h)', toc: 'جدول المحتويات (t)', zoom: 'تكبير (z / +/-)', settings: 'إعدادات (s)' }
        : (isFr
          ? { home: "Vue d'ensemble (h)", toc: 'Table des matières (t)', zoom: 'Zoom (z / +/-)', settings: 'Paramètres (s)' }
          : (isEn
            ? { home: 'Overview (h)', toc: 'Table of Contents (t)', zoom: 'Zoom (z / +/-)', settings: 'Settings (s)' }
            : { home: 'Overzicht (h)', toc: 'Inhoudsopgave (t)', zoom: 'Zoom (z / +/-)', settings: 'Instellingen (s)' }));

      const controls = document.createElement('div');
      controls.className = 'marp-slide-controls';

      // 1. Home button (back to overview index)
      const homeBtn = document.createElement('a');
      homeBtn.className = 'marp-home-btn';
      homeBtn.setAttribute('aria-label', tooltips.home);
      homeBtn.setAttribute('data-tooltip', tooltips.home);
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
      tocBtn.setAttribute('aria-label', tooltips.toc);
      tocBtn.setAttribute('data-tooltip', tooltips.toc);
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

      // 3. Zoom button
      const zoomBtn = document.createElement('button');
      zoomBtn.className = 'marp-zoom-btn';
      zoomBtn.setAttribute('type', 'button');
      zoomBtn.setAttribute('aria-label', tooltips.zoom);
      zoomBtn.setAttribute('data-tooltip', tooltips.zoom);
      zoomBtn.innerHTML = `
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      `;
      zoomBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (window.marpToggleZoom) window.marpToggleZoom();
      });
      controls.appendChild(zoomBtn);

      // 4. Settings button
      const gearBtn = document.createElement('button');
      gearBtn.className = 'marp-gear-btn';
      gearBtn.setAttribute('type', 'button');
      gearBtn.setAttribute('aria-label', tooltips.settings);
      gearBtn.setAttribute('data-tooltip', tooltips.settings);
      gearBtn.innerHTML = `
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
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
          <button class="marp-lang-btn" data-lang="moroccan">
            <span class="lang-code">MA</span>
            <span class="lang-label">الدارجة</span>
          </button>
        </div>

        <div class="marp-settings-section-title">Shortcuts</div>
        <div class="marp-shortcuts-list">
          <div class="marp-shortcut-item"><kbd>+ / - / 0</kbd> <span>Zoom in / out / reset</span></div>
          <div class="marp-shortcut-item"><kbd>z</kbd> <span>Snelle zoom (focal point)</span></div>
          <div class="marp-shortcut-item"><kbd>t / o</kbd> <span>Inhoudsopgave (TOC)</span></div>
          <div class="marp-shortcut-item"><kbd>s</kbd> <span>Instellingen</span></div>
          <div class="marp-shortcut-item"><kbd>h</kbd> <span>Overzichtspagina</span></div>
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

    // Sync theme buttons immediately upon modal injection
    const activeMode = localStorage.getItem('marp_theme_mode') || 'dark';
    darkBtn.classList.toggle('active', activeMode === 'dark');
    lightBtn.classList.toggle('active', activeMode === 'light');

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
      if (p.includes('moroccan')) return 'moroccan';
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
    const isLight = document.body.classList.contains('theme-light');
    const darkBtn = overlay.querySelector('.marp-theme-btn[data-theme="dark"]');
    const lightBtn = overlay.querySelector('.marp-theme-btn[data-theme="light"]');
    if (darkBtn) darkBtn.classList.toggle('active', !isLight);
    if (lightBtn) lightBtn.classList.toggle('active', isLight);
    updateLanguageButtons();
    checkAvailableLanguages();
  }

  function closeSettings() {
    overlay.classList.remove('active');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
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
  }, true);

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

  // Keyboard shortcut listener: 't' or 'o' to toggle, Escape to close (capture phase)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('active')) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      closeTOC();
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
  }, true);

  window.addEventListener('hashchange', updateActiveTOCItem);

  // Expose toggleTOC globally for buttons
  window.marpToggleTOC = toggleTOC;
}

/**
 * 7. Slide Focal Zoom & Panning (Option A)
 */
function initSlideZoom() {
  let zoomLevel = 1.0;
  const MIN_ZOOM = 1.0;
  const MAX_ZOOM = 3.0;
  const ZOOM_STEP = 0.25;

  let panX = 0;
  let panY = 0;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let initialPanX = 0;
  let initialPanY = 0;

  // Track cursor relative to window (0..1)
  let mouseNormX = 0.5;
  let mouseNormY = 0.5;

  // Language helper
  const isEn = document.documentElement.lang.startsWith('en') ||
               (document.querySelector('header') && document.querySelector('header').innerText.includes('English'));
  const isFr = document.documentElement.lang.startsWith('fr') ||
               (document.querySelector('header') && document.querySelector('header').innerText.includes('French'));

  const txtZoom = 'Zoom';
  const txtDrag = isFr ? 'Glisser pour déplacer' : (isEn ? 'Drag to pan' : 'Sleep om te bewegen');
  const txtReset = isFr ? 'Échap = réinitialiser' : (isEn ? 'Esc to reset' : 'Esc = reset');

  // Create or get HUD element
  let hud = document.getElementById('marp-zoom-hud');
  if (!hud) {
    hud = document.createElement('div');
    hud.id = 'marp-zoom-hud';
    hud.className = 'marp-zoom-hud';
    hud.setAttribute('role', 'status');
    hud.setAttribute('aria-live', 'polite');
    hud.innerHTML = `
      <div class="marp-zoom-hud-text">
        <span>${txtZoom}</span>
        <span class="marp-zoom-hud-badge" id="marp-zoom-val">100%</span>
      </div>
      <button class="marp-zoom-hud-btn" data-action="zoom-in" title="Zoom in (+)">+</button>
      <button class="marp-zoom-hud-btn" data-action="zoom-out" title="Zoom out (-)">-</button>
      <button class="marp-zoom-hud-btn" data-action="zoom-reset" title="Reset (Esc)">Reset</button>
      <span class="marp-zoom-hud-hint">${txtDrag} &bull; ${txtReset}</span>
    `;
    document.body.appendChild(hud);

    hud.querySelector('[data-action="zoom-in"]').addEventListener('click', (e) => {
      e.stopPropagation();
      zoomIn();
    });
    hud.querySelector('[data-action="zoom-out"]').addEventListener('click', (e) => {
      e.stopPropagation();
      zoomOut();
    });
    hud.querySelector('[data-action="zoom-reset"]').addEventListener('click', (e) => {
      e.stopPropagation();
      resetZoom();
    });
  }

  function getActiveSlide() {
    return document.querySelector('svg.bespoke-marp-slide.bespoke-marp-active') ||
           document.querySelector('.bespoke-marp-active') ||
           document.querySelector('section.bespoke-marp-active');
  }

  function clampPan() {
    if (zoomLevel <= 1.0) {
      panX = 0;
      panY = 0;
      return;
    }
    const maxPanX = ((window.innerWidth * (zoomLevel - 1)) / 2) + 60;
    const maxPanY = ((window.innerHeight * (zoomLevel - 1)) / 2) + 60;
    panX = Math.max(-maxPanX, Math.min(maxPanX, panX));
    panY = Math.max(-maxPanY, Math.min(maxPanY, panY));
  }

  function applyTransform() {
    const slide = getActiveSlide();
    const valSpan = document.getElementById('marp-zoom-val');

    if (zoomLevel <= 1.0) {
      zoomLevel = 1.0;
      panX = 0;
      panY = 0;
      document.body.classList.remove('marp-is-zoomed', 'marp-is-dragging');
      hud.classList.remove('active');

      if (slide) {
        slide.style.transform = '';
        slide.style.transformOrigin = '';
      }
      // Clean leftover transforms on any other slides
      document.querySelectorAll('svg.bespoke-marp-slide, section').forEach((s) => {
        if (s !== slide && s.style.transform) {
          s.style.transform = '';
          s.style.transformOrigin = '';
        }
      });
      return;
    }

    clampPan();
    document.body.classList.add('marp-is-zoomed');
    hud.classList.add('active');

    if (valSpan) {
      valSpan.textContent = Math.round(zoomLevel * 100) + '%';
    }

    if (slide) {
      slide.style.transformOrigin = 'center center';
      slide.style.transform = `translate(${Math.round(panX)}px, ${Math.round(panY)}px) scale(${zoomLevel.toFixed(2)})`;
    }
  }

  function zoomIn(focal = true) {
    const prevZoom = zoomLevel;
    zoomLevel = Math.min(MAX_ZOOM, Math.round((zoomLevel + ZOOM_STEP) * 100) / 100);
    if (zoomLevel !== prevZoom) {
      if (focal && prevZoom === 1.0) {
        // Shift focal center towards cursor position
        panX = (0.5 - mouseNormX) * window.innerWidth * (zoomLevel - 1);
        panY = (0.5 - mouseNormY) * window.innerHeight * (zoomLevel - 1);
      } else if (focal && prevZoom > 1.0) {
        const ratio = (zoomLevel - 1) / (prevZoom - 1 || 1);
        panX *= ratio;
        panY *= ratio;
      }
      applyTransform();
    }
  }

  function zoomOut() {
    const prevZoom = zoomLevel;
    zoomLevel = Math.max(MIN_ZOOM, Math.round((zoomLevel - ZOOM_STEP) * 100) / 100);
    if (zoomLevel !== prevZoom) {
      if (zoomLevel <= 1.0) {
        resetZoom();
      } else {
        const ratio = (zoomLevel - 1) / (prevZoom - 1 || 1);
        panX *= ratio;
        panY *= ratio;
        applyTransform();
      }
    }
  }

  function resetZoom() {
    if (zoomLevel === 1.0 && panX === 0 && panY === 0) return;
    zoomLevel = 1.0;
    panX = 0;
    panY = 0;
    applyTransform();
  }

  function toggleZoom() {
    if (zoomLevel > 1.0) {
      resetZoom();
    } else {
      zoomLevel = 1.75;
      panX = (0.5 - mouseNormX) * window.innerWidth * (zoomLevel - 1);
      panY = (0.5 - mouseNormY) * window.innerHeight * (zoomLevel - 1);
      applyTransform();
    }
  }

  // Mouse move listener to track cursor
  window.addEventListener('mousemove', (e) => {
    mouseNormX = e.clientX / window.innerWidth;
    mouseNormY = e.clientY / window.innerHeight;

    if (isDragging) {
      panX = initialPanX + (e.clientX - dragStartX);
      panY = initialPanY + (e.clientY - dragStartY);
      applyTransform();
    }
  });

  // Drag to pan mousedown
  window.addEventListener('mousedown', (e) => {
    if (zoomLevel <= 1.0) return;
    if (e.button !== 0) return; // Left click only
    if (e.target.closest('button, a, input, textarea, select, .marp-settings-overlay, .marp-toc-drawer, .marp-lightbox-overlay, .marp-zoom-hud')) {
      return;
    }
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    initialPanX = panX;
    initialPanY = panY;
    document.body.classList.add('marp-is-dragging');
    e.preventDefault();
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      document.body.classList.remove('marp-is-dragging');
    }
  });

  // Trackpad pinch or Ctrl/Alt/Cmd + Mouse wheel
  window.addEventListener('wheel', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) {
      e.preventDefault();
      if (e.deltaY < 0) {
        zoomIn(true);
      } else {
        zoomOut();
      }
    }
  }, { passive: false });

  // Keyboard shortcuts (Windows & Mac) - capture phase intercepts before Bespoke Marp
  window.addEventListener('keydown', (e) => {
    // 1. Escape key handling: if zoomed, reset zoom and stop propagation so Bespoke overview doesn't open
    if (e.key === 'Escape') {
      if (zoomLevel > 1.0) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        resetZoom();
        return;
      }
      return;
    }

    const tag = document.activeElement ? document.activeElement.tagName : '';
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;

    // Check if modal dialogs are open
    const settingsActive = document.querySelector('.marp-settings-overlay.active');
    const tocActive = document.querySelector('.marp-toc-drawer.active');
    const lightboxActive = document.querySelector('.marp-lightbox-overlay.active');
    if (settingsActive || tocActive || lightboxActive) return;

    const isCmdOrCtrl = e.metaKey || e.ctrlKey;

    // Zoom in: '+' or '=' or Cmd/Ctrl + '+' / '='
    if (e.key === '+' || e.key === '=' || (isCmdOrCtrl && (e.key === '+' || e.key === '=' || e.code === 'NumpadAdd' || e.code === 'Equal'))) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      zoomIn(true);
    }
    // Zoom out: '-' or '_' or Cmd/Ctrl + '-'
    else if (e.key === '-' || e.key === '_' || (isCmdOrCtrl && (e.key === '-' || e.code === 'NumpadSubtract' || e.code === 'Minus'))) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      zoomOut();
    }
    // Reset zoom: '0' or Cmd/Ctrl + '0'
    else if (e.key === '0' || (isCmdOrCtrl && (e.key === '0' || e.code === 'Numpad0' || e.code === 'Digit0'))) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      resetZoom();
    }
    // Quick toggle: 'z' or 'Z' (without Cmd/Ctrl so it does not conflict with Undo)
    else if ((e.key === 'z' || e.key === 'Z') && !isCmdOrCtrl) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      toggleZoom();
    }
  }, true);

  // Auto reset zoom when navigating to another slide
  window.addEventListener('hashchange', resetZoom);
  window.addEventListener('keydown', (e) => {
    const navKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Space'];
    if (navKeys.includes(e.code) && zoomLevel > 1.0) {
      resetZoom();
    }
  });

  // Watch bespoke active slide changes
  const parent = document.querySelector('.bespoke-marp-parent') || document.body;
  let lastActive = getActiveSlide();
  const slideObserver = new MutationObserver(() => {
    const currentActive = getActiveSlide();
    if (currentActive !== lastActive) {
      lastActive = currentActive;
      resetZoom();
    }
  });
  slideObserver.observe(parent, { attributes: true, subtree: true, attributeFilter: ['class'] });

  // Expose methods globally
  window.marpZoomIn = zoomIn;
  window.marpZoomOut = zoomOut;
  window.marpResetZoom = resetZoom;
  window.marpToggleZoom = toggleZoom;
}

/**
 * 8. Overview Quick Look (Spacebar Peek & Top Bar Tip)
 */
function initOverviewQuickLook() {
  const isOverview = document.body.dataset.bespokeView === 'overview' ||
                     new URLSearchParams(window.location.search).get('view') === 'overview';
  if (!isOverview) return;

  // Ensure settings.css stylesheet is loaded
  if (!document.getElementById('marp-settings-css')) {
    const link = document.createElement('link');
    link.id = 'marp-settings-css';
    link.rel = 'stylesheet';
    const scriptTag = document.currentScript || document.querySelector('script[src*="scripts.js"]');
    const basePath = scriptTag ? scriptTag.src : window.location.href;
    link.href = new URL('../css/settings.css', basePath).href;
    document.head.appendChild(link);
  }

  // Language helper
  const metaLang = document.querySelector('meta[name="marp-current-lang"]')?.content?.toLowerCase() || '';
  const isEn = metaLang === 'english' || window.location.pathname.toLowerCase().includes('english');
  const isFr = metaLang === 'french' || window.location.pathname.toLowerCase().includes('french');

  const txtTip = isFr 
    ? { title: 'Quick Look :', hold: 'Maintenez', kbd: 'Espace', desc: 'sur une diapo pour aperçu', click: 'Clic pour ouvrir' }
    : (isEn 
      ? { title: 'Quick Look:', hold: 'Hold', kbd: 'Space', desc: 'over slide for large preview', click: 'Click to open' }
      : { title: 'Quick Look:', hold: 'Houd', kbd: 'Spatie', desc: 'ingedrukt over een slide voor grote preview', click: 'Klik om direct te openen' });

  const txtRelease = isFr ? 'Relâcher Espace pour fermer' : (isEn ? 'Release Space to close' : 'Spatie loslaten om te sluiten');

  // 1. Inject subtle tip into overview header
  function injectHeaderTip() {
    const header = document.querySelector('.bespoke-marp-overview-header');
    if (!header || header.querySelector('.marp-overview-tip')) return;

    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';

    const tip = document.createElement('div');
    tip.className = 'marp-overview-tip';
    tip.innerHTML = `
      <span class="marp-overview-tip-title">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#009cab" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
        ${txtTip.title}
      </span>
      <span>${txtTip.hold}</span>
      <kbd>${txtTip.kbd}</kbd>
      <span>${txtTip.desc}</span>
      <span class="marp-overview-tip-sep">&bull;</span>
      <span>${txtTip.click}</span>
    `;

    header.prepend(tip);
  }

  injectHeaderTip();

  // 2. Inject Quick Look modal overlay (clean frameless presentation)
  let overlay = document.getElementById('marp-overview-preview-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'marp-overview-preview-overlay';
    overlay.className = 'marp-overview-preview-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = `
      <div class="marp-overview-preview-card">
        <div class="marp-quicklook-badge">
          <span class="marp-quicklook-num"></span>
          <span class="marp-quicklook-sep">&bull;</span>
          <span class="marp-quicklook-hint">${txtRelease}</span>
        </div>
        <div class="marp-overview-preview-body" id=":$p"></div>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  const badgeNum = overlay.querySelector('.marp-quicklook-num');
  const body = overlay.querySelector('.marp-overview-preview-body');

  let currentHoveredSlide = null;
  let currentHoveredIndex = 0;
  let isSpaceHeld = false;

  function showQuickLook(slide, index) {
    if (!slide) return;

    const slides = Array.from(document.querySelectorAll('.bespoke-marp-parent svg.bespoke-marp-slide'));
    const total = slides.length;
    const slideNum = index + 1;

    badgeNum.textContent = `Slide ${slideNum} / ${total}`;

    body.innerHTML = '';
    const clone = slide.cloneNode(true);
    clone.style.width = '100%';
    clone.style.height = '100%';
    clone.style.margin = '0';
    clone.style.padding = '0';
    clone.style.backgroundImage = 'none';
    clone.style.filter = 'none';
    clone.style.contentVisibility = 'visible';
    clone.style.opacity = '1';
    clone.style.display = 'block';

    body.appendChild(clone);
    overlay.classList.add('active');
  }

  function hideQuickLook() {
    overlay.classList.remove('active');
  }

  function attachSlideTracking() {
    const slides = document.querySelectorAll('.bespoke-marp-parent svg.bespoke-marp-slide');
    slides.forEach((slide, idx) => {
      if (slide.dataset.quickLookAttached) return;
      slide.dataset.quickLookAttached = 'true';

      slide.addEventListener('mouseenter', () => {
        currentHoveredSlide = slide;
        currentHoveredIndex = idx;
        if (isSpaceHeld) {
          showQuickLook(slide, idx);
        }
      });

      slide.addEventListener('mouseleave', () => {
        if (currentHoveredSlide === slide) {
          currentHoveredSlide = null;
          if (isSpaceHeld) {
            hideQuickLook();
          }
        }
      });
    });
  }

  attachSlideTracking();

  // Watch for dynamic slides or overview header injection
  const observer = new MutationObserver(() => {
    injectHeaderTip();
    attachSlideTracking();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // 3. Spacebar Peek Keyboard Listeners (Capture phase)
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.key === ' ') {
      const tag = document.activeElement ? document.activeElement.tagName : '';
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;

      if (currentHoveredSlide) {
        e.preventDefault();
        e.stopPropagation();
        if (!isSpaceHeld) {
          isSpaceHeld = true;
          showQuickLook(currentHoveredSlide, currentHoveredIndex);
        }
      }
    } else if (e.key === 'Escape' && overlay.classList.contains('active')) {
      e.preventDefault();
      e.stopPropagation();
      isSpaceHeld = false;
      hideQuickLook();
    }
  }, true);

  window.addEventListener('keyup', (e) => {
    if (e.code === 'Space' || e.key === ' ') {
      if (isSpaceHeld) {
        isSpaceHeld = false;
        hideQuickLook();
      }
    }
  }, true);

  window.addEventListener('blur', () => {
    if (isSpaceHeld) {
      isSpaceHeld = false;
      hideQuickLook();
    }
  });

  window.addEventListener('scroll', () => {
    if (isSpaceHeld) {
      isSpaceHeld = false;
      hideQuickLook();
    }
  }, { passive: true });
}

// Global initialization function
function initMarpScripts() {
  initFavicon();
  initCopyButtons();
  initLightbox();
  initProgressBar();
  initSettingsModal();
  initTableOfContents();
  initSlideZoom();
  initOverviewQuickLook();
}

window.copyCode = initCopyButtons;
window.initLightbox = initLightbox;
window.initFavicon = initFavicon;
window.initProgressBar = initProgressBar;
window.initSettingsModal = initSettingsModal;
window.initSlideZoom = initSlideZoom;
window.initOverviewQuickLook = initOverviewQuickLook;
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




