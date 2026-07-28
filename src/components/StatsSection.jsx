import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FolderGit2, Briefcase, Code2, GraduationCap, Award } from 'lucide-react';
import { resumeData } from '../data/resumeData';

function AnimatedCounter({ value, suffix = '', decimals = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseFloat(value);
    const duration = 2000; // ms
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out cubic
      const current = start + (end - start) * (1 - Math.pow(1 - progress, 3));
      
      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(current);
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const icons = [
    <FolderGit2 className="w-6 h-6 text-blue-400" />,
    <Briefcase className="w-6 h-6 text-purple-400" />,
    <Code2 className="w-6 h-6 text-emerald-400" />,
    <GraduationCap className="w-6 h-6 text-amber-400" />,
    <Award className="w-6 h-6 text-pink-400" />
  ];

  return (
    <section className="py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {resumeData.stats.map((stat, idx) => {
            const isFloat = stat.value % 1 !== 0;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-blue-500/40 transition-all hover:-translate-y-1.5 text-center group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/15 transition-all" />

                <div className="inline-flex p-3 rounded-xl bg-slate-900 border border-slate-800 mb-3 group-hover:scale-110 transition-transform">
                  {icons[idx]}
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={isFloat ? 2 : 0} />
                </div>

                <h3 className="text-slate-200 text-xs sm:text-sm font-bold mb-1">
                  {stat.label}
                </h3>

                <p className="text-slate-400 text-[11px]">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
