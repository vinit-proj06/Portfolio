import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, Building2 } from 'lucide-react';
import { resumeData } from '../../data/resumeData';

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Proven Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-slate-400 text-base">
            Professional internships across Data Analytics, Full-Stack Web Development, and Leadership.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Vertical Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 -translate-x-1/2 opacity-30 hidden sm:block" />

          <div className="space-y-12">
            {resumeData.experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`relative flex flex-col sm:flex-row ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  } items-center`}
                >
                  
                  {/* Center Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-900 border-2 border-blue-500 flex items-center justify-center text-white z-20 shadow-lg shadow-blue-500/30 hidden sm:flex">
                    <span className="w-3 h-3 rounded-full bg-blue-400 animate-ping absolute" />
                    <span className="w-3 h-3 rounded-full bg-blue-500 relative" />
                  </div>

                  {/* Card Content */}
                  <div className="w-full sm:w-[calc(50%-2.5rem)]">
                    <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 hover:border-blue-500/50 transition-all hover:shadow-2xl hover:shadow-blue-500/10 group relative">
                      
                      {/* Top Header Badge Row */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono border border-blue-500/20 flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {exp.period}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-mono border border-slate-700">
                          {exp.type}
                        </span>
                      </div>

                      {/* Title & Company */}
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {exp.role}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mt-1 mb-4">
                        <Building2 className="w-3.5 h-3.5 text-purple-400" />
                        <span className="text-slate-200 font-semibold">{exp.company}</span>
                        <span>•</span>
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span>{exp.location}</span>
                      </div>

                      {/* Brief description */}
                      <p className="text-slate-300 text-xs leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      {/* Key Responsibilities */}
                      <div className="space-y-2 mb-5">
                        {exp.responsibilities.map((resp, rIdx) => (
                          <div key={rIdx} className="flex items-start gap-2 text-slate-300 text-xs leading-normal">
                            <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </div>
                        ))}
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/60">
                        {exp.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 text-[11px] font-mono border border-slate-800 hover:border-slate-700"
                          >
                            #{skill}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
