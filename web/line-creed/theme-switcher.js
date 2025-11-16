/**
 * Line Creed Theme Switcher
 * Dynamically loads and applies all 15 epic themes!
 */

// All 15 Line Creed themes
const THEMES = {
  'power-surge': {
    name: '⚡ Power Surge',
    primary: '#f97316',
    accent: '#2563eb',
    bg: '#ffffff',
    description: 'Classic DBZ energy!'
  },
  'dark-tournament': {
    name: '🌃 Dark Tournament',
    primary: '#fb923c',
    accent: '#60a5fa',
    bg: '#111827',
    description: 'Battle arena mode'
  },
  'pokemon-adventure': {
    name: '🌟 Pokemon Adventure',
    primary: '#3b82f6',
    accent: '#eab308',
    bg: '#eff6ff',
    description: 'Gotta swing \'em all!'
  },
  'legendary-gold': {
    name: '💎 Legendary Gold',
    primary: '#eab308',
    accent: '#f97316',
    bg: '#fefce8',
    description: 'Holographic shimmer!'
  },
  'sunset-blast': {
    name: '🌅 Sunset Blast',
    primary: '#f97316',
    accent: '#facc15',
    bg: '#fff7ed',
    description: 'Power-up energy!'
  },
  'electric-storm': {
    name: '⚡ Electric Storm',
    primary: '#2563eb',
    accent: '#06b6d4',
    bg: '#eff6ff',
    description: 'Kamehameha blast!'
  },
  'mystic-purple': {
    name: '🔮 Mystic Purple',
    primary: '#9333ea',
    accent: '#3b82f6',
    bg: '#faf5ff',
    description: 'Magic & rare items!'
  },
  'victory-green': {
    name: '🏆 Victory Green',
    primary: '#16a34a',
    accent: '#eab308',
    bg: '#f0fdf4',
    description: 'Golf courses & wins!'
  },
  'comic-book': {
    name: '📚 Comic Book',
    primary: '#dc2626',
    accent: '#2563eb',
    bg: '#ffffff',
    description: 'Manga panels!'
  },
  'holographic-rare': {
    name: '🌈 Holographic Rare',
    primary: '#c084fc',
    accent: '#60a5fa',
    bg: '#faf5ff',
    description: '90s trading card!'
  },
  'power-level-max': {
    name: '🔥 Power Level MAX',
    primary: '#dc2626',
    accent: '#facc15',
    bg: '#7f1d1d',
    description: 'OVER 9000!!!'
  },
  'forest-quest': {
    name: '🌲 Forest Quest',
    primary: '#15803d',
    accent: '#854d0e',
    bg: '#f0fdf4',
    description: 'Nature adventure!'
  },
  'cosmic-championship': {
    name: '🌌 Cosmic Championship',
    primary: '#6b21a8',
    accent: '#2563eb',
    bg: '#1e1b4b',
    description: 'Galaxy tournament!'
  },
  'retro-arcade': {
    name: '🕹️ Retro Arcade',
    primary: '#ec4899',
    accent: '#06b6d4',
    bg: '#1f2937',
    description: '90s neon!'
  },
  'championship-gold': {
    name: '🏆 Championship Gold',
    primary: '#ca8a04',
    accent: '#f97316',
    bg: '#fffbeb',
    description: 'Victory celebration!'
  }
};

let themeSwitcherPanel = null;

// Initialize theme switcher
function initThemeSwitcher() {
  const btn = document.getElementById('theme-switcher-btn');

  // Create theme panel
  createThemePanel();

  // Button click
  btn.addEventListener('click', () => {
    themeSwitcherPanel.classList.toggle('active');
  });

  // Load saved theme or default
  const savedTheme = localStorage.getItem('lineCreedTheme') || 'power-surge';
  applyTheme(savedTheme);

  // Click showcase cards to apply theme
  document.querySelectorAll('.showcase-card').forEach(card => {
    card.addEventListener('click', () => {
      const theme = card.dataset.theme;
      if (theme && THEMES[theme]) {
        applyTheme(theme);
        themeSwitcherPanel.classList.remove('active');
      }
    });
  });
}

// Create theme switcher panel
function createThemePanel() {
  themeSwitcherPanel = document.createElement('div');
  themeSwitcherPanel.className = 'theme-panel';
  themeSwitcherPanel.innerHTML = `
    <div class="theme-panel-header">
      <h3>⚡ CHOOSE YOUR THEME!</h3>
      <button class="theme-panel-close" aria-label="Close">✕</button>
    </div>
    <div class="theme-panel-grid">
      ${Object.entries(THEMES).map(([id, theme]) => `
        <button class="theme-option" data-theme="${id}" style="background: ${theme.primary};">
          <span class="theme-option-name">${theme.name}</span>
          <span class="theme-option-desc">${theme.description}</span>
        </button>
      `).join('')}
    </div>
  `;

  document.body.appendChild(themeSwitcherPanel);

  // Inject styles
  injectPanelStyles();

  // Close button
  themeSwitcherPanel.querySelector('.theme-panel-close').addEventListener('click', () => {
    themeSwitcherPanel.classList.remove('active');
  });

  // Theme options
  themeSwitcherPanel.querySelectorAll('.theme-option').forEach(option => {
    option.addEventListener('click', () => {
      const theme = option.dataset.theme;
      applyTheme(theme);
      themeSwitcherPanel.classList.remove('active');
    });
  });

  // Click outside to close
  themeSwitcherPanel.addEventListener('click', (e) => {
    if (e.target === themeSwitcherPanel) {
      themeSwitcherPanel.classList.remove('active');
    }
  });
}

// Apply theme
function applyTheme(themeId) {
  document.body.dataset.theme = themeId;
  localStorage.setItem('lineCreedTheme', themeId);

  // Update active state
  document.querySelectorAll('.theme-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.theme === themeId);
  });

  console.log(`⚡ Theme applied: ${THEMES[themeId]?.name || themeId}`);
}

// Inject panel styles
function injectPanelStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .theme-panel {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(10px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }

    .theme-panel.active {
      opacity: 1;
      pointer-events: all;
    }

    .theme-panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .theme-panel-header h3 {
      font-family: 'Bebas Neue', Impact, sans-serif;
      font-size: 2rem;
      color: white;
      margin: 0;
    }

    .theme-panel-close {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      font-size: 1.5rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .theme-panel-close:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }

    .theme-panel-grid {
      background: white;
      border-radius: 1.5rem;
      padding: 2rem;
      max-width: 900px;
      width: 100%;
      max-height: 80vh;
      overflow-y: auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }

    .theme-option {
      padding: 1.5rem 1rem;
      border-radius: 1rem;
      border: 3px solid transparent;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .theme-option::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%);
      pointer-events: none;
    }

    .theme-option:hover {
      transform: translateY(-4px) scale(1.05);
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.3);
    }

    .theme-option.active {
      border-color: white;
      box-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
    }

    .theme-option-name {
      font-family: 'Fredoka', system-ui, sans-serif;
      font-size: 1.125rem;
      font-weight: 700;
      color: white;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      margin-bottom: 0.5rem;
      position: relative;
    }

    .theme-option-desc {
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.9);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      position: relative;
    }

    @media (max-width: 768px) {
      .theme-panel {
        padding: 1rem;
      }

      .theme-panel-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        padding: 1.5rem;
        gap: 0.75rem;
      }

      .theme-option {
        padding: 1rem 0.75rem;
      }

      .theme-option-name {
        font-size: 1rem;
      }

      .theme-option-desc {
        font-size: 0.75rem;
      }
    }
  `;
  document.head.appendChild(style);
}

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThemeSwitcher);
} else {
  initThemeSwitcher();
}
