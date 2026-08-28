import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Moon,
  Menu,
  X,
  FileText,
  UserRound,
  BriefcaseBusiness,
  Code2,
  Award,
  Github,
  FolderGit2,
  Mail
} from 'lucide-react';
import { resumeData } from '../../data/resumeData';

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navLinks = [
    { name: 'About', href: '#about', icon: UserRound },
    { name: 'Experience', href: '#experience', icon: BriefcaseBusiness },
    { name: 'Skills', href: '#skills', icon: Code2 },
    { name: 'Certs', href: '#certificates', icon: Award },
    { name: 'GitHub', href: '#github', icon: Github },
    { name: 'Projects', href: '#projects', icon: FolderGit2 },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0);

      setScrolled(currentScroll > 40);

      // Section tracking
      const sections = ['hero', 'about', 'experience', 'skills', 'certificates', 'projects', 'github', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      {/* Top Scroll Progress Bar */}
      <div className="w-full h-1 bg-slate-800/40 dark:bg-slate-900/60 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-400"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav className={`transition-all duration-300 ${scrolled ? 'glass-panel py-3 shadow-xl border-b border-slate-800/60' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 xl:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-11 h-11 shrink-0 rounded-full overflow-hidden bg-white border border-blue-400/50 p-0.5 shadow-lg shadow-blue-500/15 group-hover:border-cyan-300/80 group-hover:scale-105 transition-all duration-300">
              <img
                src="/vp-logo.png"
                alt="Vinit Prajapati logo"
                width="44"
                height="44"
                className="w-full h-full rounded-full object-contain"
              />
            </div>
            <div className="flex flex-col lg:hidden xl:flex">
              <span className="font-bold text-slate-100 dark:text-slate-100 text-lg tracking-tight group-hover:text-blue-400 transition-colors">
                Vinit Prajapati
              </span>
              <span className="text-[10px] text-blue-400 font-mono tracking-widest uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Full-Stack & AI
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1 p-1.5 rounded-full border border-slate-200/80 dark:border-purple-500/20 bg-white/75 dark:bg-[#160f35]/80 shadow-lg shadow-slate-900/5 dark:shadow-purple-950/30 backdrop-blur-xl">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const sectionId = link.external ? null : link.href.replace('#', '');
              const isActive = !link.external && activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                  className={`relative isolate flex items-center gap-2 px-3.5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'theme-inverse text-white shadow-[0_0_20px_rgba(99,102,241,0.35)]'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/80 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 ring-1 ring-white/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-blue-500 dark:text-slate-400'}`} />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </div>

          {/* Right Action Group */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-slate-800/60 dark:bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/60 hover:border-blue-500/50 transition-all hover:scale-105"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            {/* Resume Action */}
            <a
              href={resumeData.personalInfo.resumeUrl}
              download="Vinit_Prajapati_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="h-10 inline-flex items-center justify-center gap-2 px-5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold whitespace-nowrap shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105 transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-800/60 text-slate-300"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-800/80 text-slate-200 border border-slate-700/60"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            id="mobile-navigation"
            className="lg:hidden glass-panel border-b border-slate-800 px-6 py-6 space-y-2"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const sectionId = link.external ? null : link.href.replace('#', '');
              const isActive = !link.external && activeSection === sectionId;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'theme-inverse text-white bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{link.name}</span>
                </a>
              );
            })}
            <div className="pt-3 border-t border-slate-800">
              <a
                href={resumeData.personalInfo.resumeUrl}
                download="Vinit_Prajapati_Resume.pdf"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm shadow-lg"
              >
                <FileText className="w-4 h-4" />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
