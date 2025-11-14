// Flow Studio 2025 - 8 Design Style Variations
// Each theme demonstrates a different 2025 web design trend

const THEMES = {
  'scroll-master': {
    name: 'Scroll Master',
    description: 'Parallax & scroll-triggered animations',
    colors: {
      primary: '#1e40af',
      primaryLight: '#3b82f6',
      primaryDark: '#1e3a8a',
      accent: '#06b6d4',
      accentLight: '#22d3ee',
      background: '#ffffff',
      backgroundAlt: '#f0f9ff',
      text: '#1e293b',
      textLight: '#64748b',
      border: '#cbd5e1'
    },
    fonts: {
      heading: "'Inter', sans-serif",
      body: "'Inter', sans-serif",
      headingWeight: '700',
      bodyWeight: '400'
    },
    spacing: {
      section: '120px',
      cardGap: '32px'
    },
    motion: {
      duration: '0.6s',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    effects: {
      parallax: true,
      scrollReveal: true,
      gradient: 'linear-gradient(135deg, #1e40af 0%, #06b6d4 100%)'
    }
  },

  'micro-magic': {
    name: 'Micro Magic',
    description: 'Micro-animations & smart interactions',
    colors: {
      primary: '#a855f7',
      primaryLight: '#c084fc',
      primaryDark: '#9333ea',
      accent: '#ec4899',
      accentLight: '#f472b6',
      background: '#ffffff',
      backgroundAlt: '#faf5ff',
      text: '#1f2937',
      textLight: '#6b7280',
      border: '#e5e7eb'
    },
    fonts: {
      heading: "'Rounded', 'Inter', sans-serif",
      body: "'Inter', sans-serif",
      headingWeight: '600',
      bodyWeight: '400'
    },
    spacing: {
      section: '96px',
      cardGap: '24px'
    },
    motion: {
      duration: '0.3s',
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
    },
    effects: {
      microAnimations: true,
      hoverEffects: true,
      gradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)'
    }
  },

  '3d-depth': {
    name: '3D Depth',
    description: 'Floating UI & depth effects',
    colors: {
      primary: '#0f172a',
      primaryLight: '#1e293b',
      primaryDark: '#020617',
      accent: '#8b5cf6',
      accentLight: '#a78bfa',
      background: '#0f172a',
      backgroundAlt: '#1e293b',
      text: '#f8fafc',
      textLight: '#cbd5e1',
      border: '#334155'
    },
    fonts: {
      heading: "'Space Grotesk', sans-serif",
      body: "'Inter', sans-serif",
      headingWeight: '700',
      bodyWeight: '400'
    },
    spacing: {
      section: '100px',
      cardGap: '28px'
    },
    motion: {
      duration: '0.4s',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    effects: {
      depth3d: true,
      floating: true,
      gradient: 'linear-gradient(135deg, #1e293b 0%, #8b5cf6 100%)'
    }
  },

  'type-hero': {
    name: 'Type Hero',
    description: 'Bold, kinetic typography',
    colors: {
      primary: '#000000',
      primaryLight: '#1f2937',
      primaryDark: '#000000',
      accent: '#f59e0b',
      accentLight: '#fbbf24',
      background: '#ffffff',
      backgroundAlt: '#fafaf9',
      text: '#000000',
      textLight: '#52525b',
      border: '#e5e5e5'
    },
    fonts: {
      heading: "'Sora', sans-serif",
      body: "'Inter', sans-serif",
      headingWeight: '800',
      bodyWeight: '400'
    },
    spacing: {
      section: '140px',
      cardGap: '40px'
    },
    motion: {
      duration: '0.5s',
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
    },
    effects: {
      kineticType: true,
      boldScale: true,
      gradient: 'linear-gradient(90deg, #000000 0%, #f59e0b 100%)'
    }
  },

  'grid-artist': {
    name: 'Grid Artist',
    description: 'Asymmetric layouts & CSS Grid',
    colors: {
      primary: '#0891b2',
      primaryLight: '#06b6d4',
      primaryDark: '#0e7490',
      accent: '#f43f5e',
      accentLight: '#fb7185',
      background: '#ffffff',
      backgroundAlt: '#f0fdfa',
      text: '#0f172a',
      textLight: '#475569',
      border: '#cbd5e1'
    },
    fonts: {
      heading: "'Space Grotesk', sans-serif",
      body: "'Inter', sans-serif",
      headingWeight: '700',
      bodyWeight: '400'
    },
    spacing: {
      section: '110px',
      cardGap: '30px'
    },
    motion: {
      duration: '0.45s',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    effects: {
      asymmetric: true,
      gridMasonry: true,
      gradient: 'linear-gradient(135deg, #0891b2 0%, #f43f5e 100%)'
    }
  },

  'token-pure': {
    name: 'Token Pure',
    description: 'Design token system showcase',
    colors: {
      primary: '#475569',
      primaryLight: '#64748b',
      primaryDark: '#334155',
      accent: '#2563eb',
      accentLight: '#3b82f6',
      background: '#ffffff',
      backgroundAlt: '#f8fafc',
      text: '#334155',
      textLight: '#64748b',
      border: '#cbd5e1'
    },
    fonts: {
      heading: "'Inter', sans-serif",
      body: "'Inter', sans-serif",
      headingWeight: '600',
      bodyWeight: '400'
    },
    spacing: {
      section: '96px',
      cardGap: '24px'
    },
    motion: {
      duration: '0.25s',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    effects: {
      systematic: true,
      minimal: true,
      gradient: 'linear-gradient(135deg, #475569 0%, #2563eb 100%)'
    }
  },

  'motion-flow': {
    name: 'Motion Flow',
    description: 'Smooth animations & spring physics',
    colors: {
      primary: '#6366f1',
      primaryLight: '#818cf8',
      primaryDark: '#4f46e5',
      accent: '#14b8a6',
      accentLight: '#2dd4bf',
      background: '#ffffff',
      backgroundAlt: '#f5f3ff',
      text: '#1e1b4b',
      textLight: '#6366f1',
      border: '#e0e7ff'
    },
    fonts: {
      heading: "'Sora', sans-serif",
      body: "'Inter', sans-serif",
      headingWeight: '600',
      bodyWeight: '400'
    },
    spacing: {
      section: '100px',
      cardGap: '28px'
    },
    motion: {
      duration: '0.7s',
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
    },
    effects: {
      springPhysics: true,
      smoothTransitions: true,
      gradient: 'linear-gradient(135deg, #6366f1 0%, #14b8a6 100%)'
    }
  },

  'dark-vivid': {
    name: 'Dark Vivid',
    description: 'High-contrast dark mode with bold colors',
    colors: {
      primary: '#10b981',
      primaryLight: '#34d399',
      primaryDark: '#059669',
      accent: '#f59e0b',
      accentLight: '#fbbf24',
      background: '#18181b',
      backgroundAlt: '#27272a',
      text: '#fafaf9',
      textLight: '#a1a1aa',
      border: '#3f3f46'
    },
    fonts: {
      heading: "'Space Grotesk', sans-serif",
      body: "'Inter', sans-serif",
      headingWeight: '700',
      bodyWeight: '400'
    },
    spacing: {
      section: '120px',
      cardGap: '32px'
    },
    motion: {
      duration: '0.35s',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    effects: {
      darkMode: true,
      highContrast: true,
      gradient: 'linear-gradient(135deg, #10b981 0%, #f59e0b 100%)'
    }
  }
};

// Theme application function
function applyTheme(themeId) {
  const theme = THEMES[themeId];
  if (!theme) return;

  const root = document.documentElement;

  // Apply color variables
  root.style.setProperty('--color-primary', theme.colors.primary);
  root.style.setProperty('--color-primary-light', theme.colors.primaryLight);
  root.style.setProperty('--color-primary-dark', theme.colors.primaryDark);
  root.style.setProperty('--color-accent', theme.colors.accent);
  root.style.setProperty('--color-accent-light', theme.colors.accentLight);
  root.style.setProperty('--color-background', theme.colors.background);
  root.style.setProperty('--color-background-alt', theme.colors.backgroundAlt);
  root.style.setProperty('--color-text', theme.colors.text);
  root.style.setProperty('--color-text-light', theme.colors.textLight);
  root.style.setProperty('--color-border', theme.colors.border);

  // Apply typography variables
  root.style.setProperty('--font-heading', theme.fonts.heading);
  root.style.setProperty('--font-body', theme.fonts.body);
  root.style.setProperty('--font-heading-weight', theme.fonts.headingWeight);
  root.style.setProperty('--font-body-weight', theme.fonts.bodyWeight);

  // Apply spacing variables
  root.style.setProperty('--spacing-section', theme.spacing.section);
  root.style.setProperty('--spacing-card-gap', theme.spacing.cardGap);

  // Apply motion variables
  root.style.setProperty('--motion-duration', theme.motion.duration);
  root.style.setProperty('--motion-easing', theme.motion.easing);

  // Apply gradient
  root.style.setProperty('--gradient-hero', theme.effects.gradient);

  // Update body class for theme-specific styles
  document.body.className = `theme-${themeId}`;

  // Store preference
  localStorage.setItem('flowStudioTheme', themeId);

  // Update active state in switcher
  document.querySelectorAll('.theme-option').forEach(option => {
    option.classList.remove('active');
  });
  const activeOption = document.querySelector(`[data-theme="${themeId}"]`);
  if (activeOption) {
    activeOption.classList.add('active');
  }
}

// Initialize theme on page load
function initTheme() {
  // Check for saved preference or default to 'token-pure'
  const savedTheme = localStorage.getItem('flowStudioTheme') || 'token-pure';
  applyTheme(savedTheme);
}

// Export for use in HTML
if (typeof window !== 'undefined') {
  window.THEMES = THEMES;
  window.applyTheme = applyTheme;
  window.initTheme = initTheme;
}
