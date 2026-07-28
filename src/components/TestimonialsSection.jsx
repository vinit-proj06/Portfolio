import React from 'react';
import { motion } from 'framer-motion';
import { Quote, MessageSquare, Info } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            What Mentors & <span className="text-gradient">Leads Say</span>
          </h2>
          <p className="text-slate-400 text-base">
            Feedback from team leads, municipal supervisors, and campus coordinators.
          </p>
        </div>

        {/* Note banner */}
        <div className="mb-10 max-w-2xl mx-auto p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center gap-2 text-xs text-blue-300 font-mono text-center">
          <Info className="w-4 h-4 shrink-0" />
          <span>Note: Recommendations based on internship feedback & leadership roles. Easily customizable later.</span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resumeData.testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass-panel p-8 rounded-3xl border border-slate-800 flex flex-col justify-between relative group hover:border-blue-500/40 transition-all"
            >
              <Quote className="w-10 h-10 text-blue-500/20 mb-4 group-hover:text-blue-500/40 transition-colors" />

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic mb-6">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-11 h-11 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">
                    {t.author}
                  </h4>
                  <p className="text-slate-400 text-[11px] font-mono">
                    {t.role}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
