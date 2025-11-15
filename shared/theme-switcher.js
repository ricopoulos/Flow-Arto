// Flow Studio - Reusable Theme Switcher Component
// Inject theme switcher UI into any page

function createThemeSwitcher() {
  // Check if THEMES is available
  if (!window.THEMES) {
    console.error('Flow Studio: THEMES object not found. Please load themes.js before theme-switcher.js');
    return;
  }

  // Create theme switcher HTML
  const switcherHTML = `
    <!-- Theme Toggle Button -->
    <button class="theme-toggle-btn" id="themeToggleBtn" aria-label="Toggle theme selector">
      🎨
    </button>

    <!-- Theme Switcher Panel -->
    <div class="theme-switcher hidden" id="themeSwitcher" role="dialog" aria-label="Theme selector">
      <div class="theme-switcher__header">
        <span class="theme-switcher__title">2025 Styles</span>
        <button class="theme-switcher__close" id="themeSwitcherClose" aria-label="Close theme selector">×</button>
      </div>
      <div class="theme-switcher__grid">
        ${Object.entries(window.THEMES).map(([id, theme]) => `
          <button class="theme-option" data-theme="${id}" aria-label="Switch to ${theme.name} theme">
            <span class="theme-option__name">${theme.name}</span>
            <span class="theme-option__desc">${theme.description}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;

  // Inject into page
  document.body.insertAdjacentHTML('beforeend', switcherHTML);

  // Get elements
  const toggleBtn = document.getElementById('themeToggleBtn');
  const switcher = document.getElementById('themeSwitcher');
  const closeBtn = document.getElementById('themeSwitcherClose');
  const themeOptions = document.querySelectorAll('.theme-option');

  // Toggle theme switcher visibility
  function toggleThemeSwitcher() {
    switcher.classList.toggle('hidden');
  }

  // Close theme switcher
  function closeThemeSwitcher() {
    switcher.classList.add('hidden');
  }

  // Event listeners
  toggleBtn.addEventListener('click', toggleThemeSwitcher);
  closeBtn.addEventListener('click', closeThemeSwitcher);

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.theme-switcher') && !e.target.closest('.theme-toggle-btn')) {
      closeThemeSwitcher();
    }
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !switcher.classList.contains('hidden')) {
      closeThemeSwitcher();
    }
  });

  // Theme selection
  themeOptions.forEach(option => {
    option.addEventListener('click', () => {
      const themeId = option.dataset.theme;
      if (window.applyTheme) {
        window.applyTheme(themeId);
        closeThemeSwitcher();
      } else {
        console.error('Flow Studio: applyTheme function not found');
      }
    });
  });

  // Update active theme on load
  function updateActiveTheme() {
    const savedTheme = localStorage.getItem('flowStudioTheme') || 'token-pure';
    themeOptions.forEach(option => {
      if (option.dataset.theme === savedTheme) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
  }

  updateActiveTheme();

  // Export functions to window for inline onclick handlers (backward compatibility)
  window.toggleThemeSwitcher = toggleThemeSwitcher;
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createThemeSwitcher);
} else {
  createThemeSwitcher();
}

// Export for manual initialization if needed
if (typeof window !== 'undefined') {
  window.createThemeSwitcher = createThemeSwitcher;
}
