import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, Sparkles, Code, Cpu, Database, Server, Terminal, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { resumeData } from '../../data/resumeData';

export default function HeroSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = resumeData.personalInfo.roles;

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentRole.substring(0, typedText.length + 1));
        if (typedText === currentRole) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setTypedText(currentRole.substring(0, typedText.length - 1));
        if (typedText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentRoleIndex, roles]);

  const floatingBadges = [
    { icon: <Code className="w-4 h-4 text-blue-400" />, label: 'React.js', pos: 'top-10 -left-6 sm:-left-12' },
    { icon: <Server className="w-4 h-4 text-emerald-400" />, label: 'Node.js', pos: 'bottom-20 -left-8 sm:-left-16' },
    { icon: <Sparkles className="w-4 h-4 text-purple-400" />, label: 'AI & RAG', pos: 'top-16 -right-6 sm:-right-12' },
    { icon: <Database className="w-4 h-4 text-amber-400" />, label: 'MongoDB', pos: 'bottom-24 -right-8 sm:-right-14' },
  ];

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-blue-600/20 via-purple-600/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-gradient-radial from-emerald-500/10 via-blue-500/5 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Full-time Roles & Impact Engineering</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h2 className="text-slate-400 text-base sm:text-lg font-mono tracking-wide">
                Hello, I am
              </h2>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
                {resumeData.personalInfo.name}
              </h1>
              
              {/* Dynamic Typing Title */}
              <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start">
                <span className="text-xl sm:text-3xl font-semibold text-gradient-blue font-mono">
                  {typedText}
                </span>
                <span className="w-0.5 h-7 bg-blue-400 ml-1 animate-pulse" />
              </div>
            </div>

            {/* Tagline & Bio */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {resumeData.personalInfo.tagline}
            </p>
            <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {resumeData.personalInfo.bio}
            </p>

            {/* Quick Stats Highlights */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>9.24 CGPA (Viva Tech)</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Rank #2 Department</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>3 Technical Internships</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#projects"
                className="group flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white font-semibold text-sm shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 hover:scale-105 transition-all"
              >
                <span>View Featured Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={resumeData.personalInfo.resumeUrl}
                download="Vinit_Prajapati_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/80 hover:border-slate-500 transition-all hover:scale-105"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>Download Resume</span>
              </a>

              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/40 hover:bg-slate-800/40 text-slate-300 hover:text-white text-sm border border-slate-800 transition-all"
              >
                <Mail className="w-4 h-4 text-purple-400" />
                <span>Contact Me</span>
              </a>
            </div>
          </motion.div>

          {/* Right Image/Avatar Column with Floating Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center relative"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              
              {/* Outer glow aligned with the portrait frame */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-600 via-purple-600 to-emerald-500 opacity-20 blur-2xl animate-pulse-slow" />
              <div className="absolute -inset-4 rounded-[2.5rem] border border-blue-500/20" />

              {/* Central Frame */}
              <div className="w-full h-full rounded-3xl overflow-hidden glass-panel border-2 border-slate-700/80 p-3 shadow-2xl relative group">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-900 relative">
                  <img
                    src={resumeData.personalInfo.avatar}
                    alt={resumeData.personalInfo.name}
                    className="w-full h-full object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-60" />
                  
                  {/* Floating Badge overlay on image */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl glass-panel border border-slate-700/60 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-white">Vinit Prajapati</p>
                      <p className="text-slate-400 font-mono text-[11px]">B.Tech CSE '27 (9.24 CGPA)</p>
                    </div>
                    <div className="px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 font-mono text-[10px]">
                      Rank #2
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Tech Stack Badges */}
              {floatingBadges.map((b, idx) => (
                <motion.div
                  key={idx}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: idx * 0.8 }}
                  className={`absolute ${b.pos} z-20 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl glass-panel border border-slate-700/80 text-slate-200 text-xs font-semibold shadow-xl backdrop-blur-xl`}
                >
                  {b.icon}
                  <span>{b.label}</span>
                </motion.div>
              ))}

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
