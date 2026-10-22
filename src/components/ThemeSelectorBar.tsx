import React, { useState } from 'react';
import { ColorTheme, COLOR_THEMES } from '../types/theme';
import { Palette, Sparkles, Check, Sliders } from 'lucide-react';

interface ThemeSelectorBarProps {
  currentTheme: ColorTheme;
  onSelectTheme: (theme: ColorTheme) => void;
  onCustomColorChange: (hexColor: string) => void;
}

export const ThemeSelectorBar: React.FC<ThemeSelectorBarProps> = ({
  currentTheme,
  onSelectTheme,
  onCustomColorChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customColor, setCustomColor] = useState(currentTheme.accent);

  const handleCustomColorInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    setCustomColor(hex);
    onCustomColorChange(hex);
  };

  return (
    <div className="relative inline-block text-left no-print">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer shadow-2xs"
        style={{
          backgroundColor: currentTheme.surfaceBg,
          borderColor: currentTheme.border,
          color: currentTheme.textPrimary,
        }}
        title="Change application color theme"
        aria-label="Color Palette Selector"
      >
        <span 
          className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs shrink-0" 
          style={{ backgroundColor: currentTheme.accent }}
        />
        <span className="hidden sm:inline font-sans">{currentTheme.name}</span>
        <Palette className="w-3.5 h-3.5 opacity-70" />
      </button>

      {/* Floating Theme Dropdown Panel */}
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-72 p-4 rounded-2xl shadow-xl border z-50 animate-in fade-in zoom-in-95"
          style={{
            backgroundColor: currentTheme.surfaceBg,
            borderColor: currentTheme.border,
            color: currentTheme.textPrimary,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b" style={{ borderColor: currentTheme.border }}>
            <div className="text-xs font-semibold tracking-wide uppercase font-mono-code opacity-80">
              Interactive Palette
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs opacity-60 hover:opacity-100 transition-opacity"
            >
              Close
            </button>
          </div>

          {/* Preset Palettes */}
          <div className="space-y-1.5 mb-4">
            {Object.values(COLOR_THEMES).map((thm) => {
              const isSelected = currentTheme.id === thm.id;
              return (
                <button
                  key={thm.id}
                  onClick={() => {
                    onSelectTheme(thm);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-all hover:scale-[1.01]"
                  style={{
                    backgroundColor: isSelected ? currentTheme.surfaceHover : 'transparent',
                    border: isSelected ? `1px solid ${currentTheme.border}` : '1px solid transparent',
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span 
                      className="w-4 h-4 rounded-full border border-black/15 shadow-xs shrink-0"
                      style={{ backgroundColor: thm.accent }}
                    />
                    <div>
                      <div className="font-medium text-xs leading-none">{thm.name}</div>
                      <div className="text-[10px] opacity-60 mt-0.5 line-clamp-1">{thm.description}</div>
                    </div>
                  </div>

                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Interactive Live Color Wheel / Hex Input */}
          <div className="pt-3 border-t" style={{ borderColor: currentTheme.border }}>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-medium text-[11px] opacity-80">Custom Signature Hue</span>
              <span className="font-mono-code text-[11px] opacity-60">{customColor}</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="color"
                value={customColor}
                onChange={handleCustomColorInput}
                className="w-8 h-8 rounded-lg cursor-pointer border border-stone-300 p-0 bg-transparent"
                title="Choose custom color"
              />
              <span className="text-[11px] opacity-70 leading-tight">
                Pick any color to tint the entire portfolio live.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
