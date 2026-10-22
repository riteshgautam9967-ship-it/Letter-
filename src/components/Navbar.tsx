import React from 'react';
import { Download, SlidersHorizontal, Sparkles } from 'lucide-react';
import { ColorTheme } from '../types/theme';
import { ThemeSelectorBar } from './ThemeSelectorBar';

interface NavbarProps {
  onOpenExport: () => void;
  onOpenCustomizer: () => void;
  activePersona: string;
  theme: ColorTheme;
  onSelectTheme: (theme: ColorTheme) => void;
  onCustomColorChange: (hex: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenExport,
  onOpenCustomizer,
  activePersona,
  theme,
  onSelectTheme,
  onCustomColorChange,
}) => {
  return (
    <header 
      className="sticky top-0 z-40 backdrop-blur-md border-b transition-colors no-print"
      style={{
        backgroundColor: `${theme.surfaceBg}e6`,
        borderColor: theme.border,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <a 
          href="#letter" 
          className="text-lg font-bold tracking-tight font-serif-editorial whitespace-nowrap shrink-0 transition-colors"
          style={{ color: theme.textPrimary }}
        >
          The Farewell Portfolio
        </a>

        {/* Zone 2: 4-5 Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium opacity-80" style={{ color: theme.textSecondary }}>
          <a href="#letter" className="hover:opacity-100 transition-opacity whitespace-nowrap shrink-0">
            The Letter
          </a>
          <a href="#projects" className="hover:opacity-100 transition-opacity whitespace-nowrap shrink-0">
            Projects
          </a>
          <a href="#handoff" className="hover:opacity-100 transition-opacity whitespace-nowrap shrink-0">
            Handoff Hub
          </a>
          <a href="#tributes" className="hover:opacity-100 transition-opacity whitespace-nowrap shrink-0">
            Tributes
          </a>
          <a href="#contact" className="hover:opacity-100 transition-opacity whitespace-nowrap shrink-0">
            Next Chapter
          </a>
        </nav>

        {/* Zone 3: Primary Action, Theme Bar & Customizer trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <ThemeSelectorBar
            currentTheme={theme}
            onSelectTheme={onSelectTheme}
            onCustomColorChange={onCustomColorChange}
          />

          <button
            onClick={onOpenCustomizer}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0"
            style={{
              backgroundColor: theme.surfaceHover,
              borderColor: theme.border,
              color: theme.textPrimary,
            }}
            title="Edit Letter & Details"
            aria-label="Customize Profile"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Customize</span>
          </button>

          <button
            onClick={onOpenExport}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            style={{
              backgroundColor: theme.accent,
              color: theme.accentText,
            }}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Letter</span>
          </button>
        </div>
      </div>
    </header>
  );
};
