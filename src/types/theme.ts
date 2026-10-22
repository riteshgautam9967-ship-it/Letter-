export interface ColorTheme {
  id: string;
  name: string;
  description: string;
  accent: string;       // Primary interactive color (buttons, active states)
  accentHover: string;
  accentText: string;
  canvasBg: string;     // 60% dominant background
  surfaceBg: string;    // 30% card surfaces
  surfaceHover: string;
  border: string;       // Hairline borders
  textPrimary: string;
  textSecondary: string;
  sealColor: number;    // Hex number for 3D Three.js wax seal
  deskColor: number;    // Hex number for 3D Three.js desk
  paperHex: string;     // Hex for 3D letter paper
  badgeBg: string;
  glowColor: string;
}

export const COLOR_THEMES: Record<string, ColorTheme> = {
  stone: {
    id: 'stone',
    name: 'Executive Ochre',
    description: 'Understated executive editorial with warm stone and deep charcoal.',
    accent: '#1c1917',
    accentHover: '#292524',
    accentText: '#ffffff',
    canvasBg: '#fafaf9',
    surfaceBg: '#ffffff',
    surfaceHover: '#f5f5f4',
    border: '#e7e5e4',
    textPrimary: '#1c1917',
    textSecondary: '#78716c',
    sealColor: 0x991b1b,
    deskColor: 0xeeece8,
    paperHex: '#fafaf9',
    badgeBg: '#f5f5f4',
    glowColor: 'rgba(28, 25, 23, 0.08)',
  },
  emerald: {
    id: 'emerald',
    name: 'Forest & Sage',
    description: 'Refreshing botanical emerald and deep pine, symbolizing renewal and fresh chapters.',
    accent: '#064e3b',
    accentHover: '#047857',
    accentText: '#ffffff',
    canvasBg: '#f4f7f5',
    surfaceBg: '#ffffff',
    surfaceHover: '#ebf2ee',
    border: '#d1e3d7',
    textPrimary: '#062e24',
    textSecondary: '#4b6f63',
    sealColor: 0x065f46,
    deskColor: 0xe2ece5,
    paperHex: '#fcfdfc',
    badgeBg: '#e6f3eb',
    glowColor: 'rgba(6, 78, 59, 0.08)',
  },
  indigo: {
    id: 'indigo',
    name: 'Midnight Cobalt',
    description: 'Deep nautical navy and vibrant royal cobalt, sleek and architecturally confident.',
    accent: '#1e3a8a',
    accentHover: '#1d4ed8',
    accentText: '#ffffff',
    canvasBg: '#f6f8fb',
    surfaceBg: '#ffffff',
    surfaceHover: '#eff4fa',
    border: '#dbeafe',
    textPrimary: '#0f172a',
    textSecondary: '#64748b',
    sealColor: 0x1d4ed8,
    deskColor: 0xe2eaf3,
    paperHex: '#ffffff',
    badgeBg: '#eff6ff',
    glowColor: 'rgba(30, 58, 138, 0.08)',
  },
  burgundy: {
    id: 'burgundy',
    name: 'Imperial Wine',
    description: 'Rich vintage bordeaux and warm blush tones, dignified and memorable.',
    accent: '#701a35',
    accentHover: '#831843',
    accentText: '#ffffff',
    canvasBg: '#faf6f7',
    surfaceBg: '#ffffff',
    surfaceHover: '#f5ebef',
    border: '#f0d9e2',
    textPrimary: '#380d19',
    textSecondary: '#835467',
    sealColor: 0x881337,
    deskColor: 0xeee4e8,
    paperHex: '#fffbfc',
    badgeBg: '#fce7f3',
    glowColor: 'rgba(112, 26, 53, 0.08)',
  },
  terracotta: {
    id: 'terracotta',
    name: 'Sunset Terracotta',
    description: 'Earthy warm amber and terracotta sunset hues, celebrating the journey.',
    accent: '#9a3412',
    accentHover: '#c2410c',
    accentText: '#ffffff',
    canvasBg: '#faf7f5',
    surfaceBg: '#ffffff',
    surfaceHover: '#f5eeea',
    border: '#fed7aa',
    textPrimary: '#431407',
    textSecondary: '#7c5847',
    sealColor: 0xc2410c,
    deskColor: 0xfaeee6,
    paperHex: '#fffdfb',
    badgeBg: '#ffedd5',
    glowColor: 'rgba(154, 52, 18, 0.08)',
  },
  obsidian: {
    id: 'obsidian',
    name: 'Obsidian Monograph',
    description: 'High-contrast dark mode with sleek basalt cards and crisp typography.',
    accent: '#f5f5f4',
    accentHover: '#e7e5e4',
    accentText: '#0c0a09',
    canvasBg: '#0c0a09',
    surfaceBg: '#1c1917',
    surfaceHover: '#292524',
    border: '#292524',
    textPrimary: '#fafaf9',
    textSecondary: '#a8a29e',
    sealColor: 0xe11d48,
    deskColor: 0x171513,
    paperHex: '#1c1917',
    badgeBg: '#292524',
    glowColor: 'rgba(255, 255, 255, 0.06)',
  }
};
