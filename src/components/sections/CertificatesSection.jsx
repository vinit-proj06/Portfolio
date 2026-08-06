import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, BookOpen, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { resumeData } from '../../data/resumeData';

export default function CertificatesSection() {
  const icons = [
    <Trophy className="w-6 h-6 text-amber-400" />,
    <BookOpen className="w-6 h-6 text-purple-400" />,
    <Award className="w-6 h-6 text-blue-400" />,
    <ShieldCheck className="w-6 h-6 text-emerald-400" />
  ];

  return (
    <section id="certificates" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
            <Trophy className="w-3.5 h-3.5" />
            <span>Honors & Achievements</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Certificates <span className="text-gradient">& Recognition</span>
          </h2>
          <p className="text-slate-400 text-base">
            Academic honors, research publications, campus leadership awards, and internship certifications.
          </p>
        </div>

        {/* Certificate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resumeData.certificates.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-amber-500/40 transition-all hover:-translate-y-1.5 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/15 transition-all" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                    {icons[idx % icons.length]}
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-[10px] font-mono border border-slate-700">
                    {cert.date}
                  </span>
                </div>

                <span className="text-[11px] font-mono text-amber-400 tracking-wider uppercase font-semibold">
                  {cert.badge}
                </span>

                <h3 className="text-lg font-bold text-white mt-1 mb-2 group-hover:text-amber-400 transition-colors">
                  {cert.title}
                </h3>

                <p className="text-slate-400 text-xs font-mono mb-3">
                  Issuer: {cert.issuer}
                </p>

                <p className="text-slate-300 text-xs leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Verified Honor
                </span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
