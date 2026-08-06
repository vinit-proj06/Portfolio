import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart, FileText } from 'lucide-react';
import { resumeData } from '../../data/resumeData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-[#080D1A] border-t border-slate-800/80 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold font-mono text-base">
                VP
              </div>
              <span className="font-bold text-white text-lg tracking-tight">
                Vinit Prajapati
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Full-Stack Software Engineer & AI Specialist. B.Tech CSE (9.24 CGPA). Passionate about high-performance web systems, RAG architecture, and enterprise analytics.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={resumeData.personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-blue-500 transition-all"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={resumeData.personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-blue-500 transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${resumeData.personalInfo.email}`}
                className="p-2.5 rounded-full bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-blue-500 transition-all"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono text-white uppercase tracking-wider">Navigation Links</h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <a href="#about" className="hover:text-blue-400 transition-colors">About Me</a>
              <a href="#experience" className="hover:text-blue-400 transition-colors">Experience</a>
              <a href="#education" className="hover:text-blue-400 transition-colors">Education</a>
              <a href="#skills" className="hover:text-blue-400 transition-colors">Skills</a>
              <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
              <a
                href={resumeData.personalInfo.resumeUrl}
                download="Vinit_Prajapati_Resume.pdf"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Back to top */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-mono border border-slate-800 hover:border-blue-500 transition-all"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform text-blue-400" />
            </button>

            <div className="text-[11px] font-mono text-slate-400 text-left md:text-right mt-6">
              <p>Designed & Engineered by Vinit Prajapati</p>
              <p className="text-slate-400 text-[10px]">Built with React, Tailwind & Framer Motion</p>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-slate-800/60 text-center text-xs font-mono text-slate-400">
          <p>© {new Date().getFullYear()} Vinit Prajapati. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
