import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Brain, Layout, Server, Database, BarChart3, ArrowRight } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function ServicesSection() {
  const serviceIcons = {
    Code2: <Code2 className="w-6 h-6 text-blue-400" />,
    Brain: <Brain className="w-6 h-6 text-purple-400" />,
    Layout: <Layout className="w-6 h-6 text-emerald-400" />,
    Server: <Server className="w-6 h-6 text-indigo-400" />,
    Database: <Database className="w-6 h-6 text-amber-400" />,
    BarChart3: <BarChart3 className="w-6 h-6 text-pink-400" />
  };

  return (
    <section id="services" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono">
            <Server className="w-3.5 h-3.5" />
            <span>Core Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Services & <span className="text-gradient">Offerings</span>
          </h2>
          <p className="text-slate-400 text-base">
            High-impact engineering solutions delivered with enterprise-grade quality and sub-second performance.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resumeData.services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel p-8 rounded-3xl border border-slate-800 hover:border-purple-500/50 transition-all hover:-translate-y-2 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/15 transition-all" />

              <div>
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 inline-block mb-6 group-hover:scale-110 transition-transform">
                  {serviceIcons[service.icon]}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {service.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-blue-400 group-hover:text-purple-400 transition-colors">
                <span>Discuss Requirement</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
