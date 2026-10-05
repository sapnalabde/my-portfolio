import React, { useState, useEffect } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['hero', 'about', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <div className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex items-center justify-between w-full max-w-4xl bg-[#141b2d]/90 backdrop-blur-xl border border-slate-700/60 rounded-full px-5 sm:px-7 py-2.5 shadow-2xl shadow-black/80"
      >
        {/* Left: Brand "Portfolio." */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleLinkClick('hero')}
          className="text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded-full shrink-0 group"
          aria-label="Sapna Portfolio"
        >
          <span className="text-base sm:text-lg font-extrabold tracking-tight text-white">
            Portfolio<span className="text-orange-500">.</span>
          </span>
        </motion.button>

        {/* Center: Clean nav links with animated pill indicators */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`relative py-1 transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded-sm ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Round icon button + Animated Orange pill "Hire Me" button */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 12 }}
            whileTap={{ scale: 0.9 }}
            onClick={onOpenResume}
            className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700 hover:border-orange-500/50 flex items-center justify-center text-slate-300 hover:text-orange-400 transition-colors cursor-pointer"
            title="View Resume / CV"
            aria-label="View Resume"
          >
            <FileText className="w-3.5 h-3.5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleLinkClick('contact')}
            className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:brightness-110 rounded-full shadow-lg shadow-orange-500/30 transition-all cursor-pointer whitespace-nowrap"
          >
            Hire Me
          </motion.button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 text-slate-300 hover:text-white focus-visible:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </motion.header>

      {/* Mobile Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden pointer-events-auto fixed top-20 left-4 right-4 bg-[#141b2d]/95 backdrop-blur-xl border border-slate-700 rounded-2xl p-5 shadow-2xl space-y-3"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="text-left px-3 py-2 text-sm font-medium text-slate-200 hover:text-orange-400 hover:bg-slate-800/50 rounded-lg transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-2.5 text-xs font-semibold text-slate-200 border border-slate-700 rounded-full hover:bg-slate-800 flex items-center justify-center gap-2"
              >
                <FileText className="w-3.5 h-3.5 text-orange-400" />
                <span>View Full Resume</span>
              </button>
              <button
                onClick={() => handleLinkClick('contact')}
                className="w-full py-2.5 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
