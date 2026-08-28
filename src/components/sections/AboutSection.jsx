import React from 'react';
import { motion } from 'framer-motion';
import { Brain, BriefcaseBusiness, Compass, GraduationCap, MapPin, Sparkles, UserRound, Zap } from 'lucide-react';
import { resumeData } from '../../data/resumeData';

export default function AboutSection() {
  const storyTags = ['Next.js', 'TypeScript', 'React.js', 'Node.js', 'MongoDB', 'AI & RAG', 'Power BI'];

  const profileCards = [
    {
      icon: GraduationCap,
      title: 'Education',
      value: 'Final Year B.Tech CSE',
      detail: '9.24 CGPA (up to 6th semester)',
      meta: 'Viva Institute of Technology · 2023–2027',
      iconColor: 'text-blue-400',
      iconSurface: 'bg-blue-500/10 border-blue-500/20',
      accent: 'group-hover:border-blue-500/40'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Mumbai, India',
      detail: 'Maharashtra',
      meta: 'Open to Remote & Hybrid',
      iconColor: 'text-purple-400',
      iconSurface: 'bg-purple-500/10 border-purple-500/20',
      accent: 'group-hover:border-purple-500/40'
    },
    {
      icon: BriefcaseBusiness,
      title: 'Looking For',
      items: [
        'Full-Stack Development',
        'AI/ML & RAG Roles',
        'Data Analytics Internships',
        'Freelance & Startup Projects'
      ],
      iconColor: 'text-emerald-400',
      iconSurface: 'bg-emerald-500/10 border-emerald-500/20',
      dotColor: 'bg-emerald-400',
      accent: 'group-hover:border-emerald-500/40'
    },
    {
      icon: Zap,
      title: 'Strengths',
      items: [
        'React & Next.js Interfaces',
        'Node.js APIs & Backend',
        'AI/RAG Integrations',
        'SQL & Power BI Analytics'
      ],
      iconColor: 'text-amber-400',
      iconSurface: 'bg-amber-500/10 border-amber-500/20',
      dotColor: 'bg-amber-400',
      accent: 'group-hover:border-amber-500/40'
    }
  ];

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover My Background</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About <span className="text-gradient">Vinit Prajapati</span>
          </h2>
          <p className="text-slate-400 text-base">
            Bridging academic rigor, enterprise data analytics, and modern AI application engineering.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          
          {/* Left Column: Story Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 min-w-0 space-y-6"
          >
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />

              <div className="relative flex items-center gap-3.5">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <UserRound className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500">
                    Engineer Profile
                  </p>
                  <h3 className="mt-1 text-xl sm:text-2xl font-extrabold text-gradient tracking-tight">
                    {resumeData.personalInfo.name}
                  </h3>
                </div>
              </div>

              <p className="relative text-slate-300 text-sm sm:text-base leading-relaxed">
                <span className="font-semibold text-white">Final Year B.Tech CSE student</span> at Viva Institute of
                Technology with a <span className="font-semibold text-white">9.24 CGPA</span> up to the sixth semester.
                Currently building production-ready full-stack applications at Digitrix Agency while exploring AI/RAG
                and data analytics to solve practical problems.
              </p>

              <div className="relative pt-1 flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.16em] text-blue-400">
                <Compass className="w-4 h-4" />
                My Software Engineering Journey
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {resumeData.about.journey}
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {resumeData.about.passion}
              </p>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-xs font-mono uppercase text-purple-400 tracking-wider flex items-center gap-1.5">
                  <Brain className="w-4 h-4" />
                  AI & RAG Innovation Focus
                </span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {resumeData.about.aiInterest}
                </p>
              </div>

              <div className="pt-2">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Career Objective</h4>
                <p className="text-slate-300 text-sm italic border-l-2 border-blue-500 pl-4 py-1">
                  "{resumeData.about.careerObjective}"
                </p>
              </div>

              <div className="pt-1">
                <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.16em] mb-3">
                  Core Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2" aria-label="Core technology stack">
                  {storyTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] sm:text-xs font-medium text-slate-300 transition-colors hover:border-slate-700 hover:text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Profile Snapshot */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 min-w-0 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 self-start"
          >
            {profileCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className={`glass-panel p-5 rounded-2xl border border-slate-800/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/20 group ${card.accent}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-11 h-11 shrink-0 rounded-xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${card.iconSurface}`}>
                      <Icon className={`w-5 h-5 ${card.iconColor}`} />
                    </div>
                    <h4 className="text-xs font-mono font-semibold uppercase tracking-[0.16em] text-slate-400">
                      {card.title}
                    </h4>
                  </div>

                  {card.items ? (
                    <ul className="space-y-2.5" aria-label={card.title}>
                      {card.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300 leading-snug">
                          <span className={`mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full ${card.dotColor}`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>
                      <p className="text-base font-bold text-white leading-snug">
                        {card.value}
                      </p>
                      <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                        {card.detail}
                      </p>
                      <p className="mt-2 text-xs font-mono text-slate-500 leading-relaxed">
                        {card.meta}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
