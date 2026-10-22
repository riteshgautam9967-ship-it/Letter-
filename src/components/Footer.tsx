import React from 'react';
import { AuthorProfile } from '../types/portfolio';
import { Heart, FileText, ArrowUp } from 'lucide-react';

interface FooterProps {
  profile: AuthorProfile;
  onOpenExport: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenExport }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-stone-200 bg-stone-100/50 text-xs text-stone-500 no-print">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="font-serif-editorial font-bold text-stone-900 text-sm tracking-tight">
            The Farewell Portfolio
          </div>
          <p className="mt-1">
            Official career transition and resignation archive for {profile.fullName} ({profile.role}).
          </p>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={onOpenExport}
            className="hover:text-stone-900 transition-colors"
          >
            Export Document
          </button>
          <span>·</span>
          <a
            href="#projects"
            className="hover:text-stone-900 transition-colors"
          >
            Projects
          </a>
          <span>·</span>
          <a
            href="#handoff"
            className="hover:text-stone-900 transition-colors"
          >
            Handoff Matrix
          </a>
          <span>·</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-stone-900 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
