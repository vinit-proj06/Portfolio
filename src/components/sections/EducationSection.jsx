import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, BookOpen, CheckCircle2 } from 'lucide-react';
import { resumeData } from '../../data/resumeData';

export default function EducationSection() {
  return (
    <section id="education" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Education <span className="text-gradient">& Background</span>
          </h2>
          <p className="text-slate-400 text-base">
            Consistent top-tier academic achievements from high school distinction to B.Tech Computer Science honors.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resumeData.education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-emerald-500/50 transition-all hover:-translate-y-2 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/15 transition-all" />

              <div>
                {/* Top Badge & Date */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {edu.period}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 font-mono text-[10px] uppercase tracking-wider font-bold">
                    {edu.badge}
                  </span>
                </div>

                {/* Degree & College */}
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-1">
                  {edu.degree}
                </h3>
                
                <p className="text-slate-300 text-sm font-medium mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <span>{edu.institution}</span>
                </p>

                {/* Score Banner */}
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 mb-5 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">{edu.scoreLabel}</span>
                  <span className="text-lg font-extrabold text-gradient-blue font-mono">{edu.score}</span>
                </div>

                {/* Highlights */}
                <div className="space-y-2">
                  {edu.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-slate-300 text-xs leading-normal">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Verified Academic Record</span>
                <Award className="w-4 h-4 text-amber-400" />
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
