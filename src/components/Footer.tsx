import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenResume: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-amber-500/15 bg-[#05060a] py-12 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          {/* Brand & Title */}
          <div className="text-center md:text-left space-y-1">
            <span className="text-base font-bold text-white tracking-tight">
              {PERSONAL_INFO.name}
            </span>
            <p className="text-xs text-slate-400">
              Frontend Developer · Pune, Maharashtra, India
            </p>
          </div>

          {/* Quick Nav Anchors */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <button
              onClick={() => onNavigate('hero')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => onNavigate('experience')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Experience
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Projects
            </button>
            <button
              onClick={() => onNavigate('skills')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Skills
            </button>
            <button
              onClick={onOpenResume}
              className="hover:text-yellow-300 transition-colors cursor-pointer text-amber-400 font-semibold"
            >
              Resume
            </button>
          </nav>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-800 hover:border-amber-400/50 hover:text-amber-300 transition-all cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} Sapna Labde. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-amber-300 transition-colors"
            >
              {PERSONAL_INFO.email}
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-300 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
