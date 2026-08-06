import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Brain, Code, Sparkles, Compass, Target, Heart } from 'lucide-react';
import { resumeData } from '../../data/resumeData';

export default function AboutSection() {
  const highlights = [
    {
      icon: <GraduationCap className="w-5 h-5 text-blue-400" />,
      title: "Academic Distinction",
      description: "Rank #2 in First Year CSE with an overall 9.24 / 10 CGPA at Viva Institute of Technology."
    },
    {
      icon: <Brain className="w-5 h-5 text-purple-400" />,
      title: "AI & RAG Specialization",
      description: "Building production RAG pipelines combining Pinecone Vector DB, Gemini LLMs, and spaCy NLP."
    },
    {
      icon: <Code className="w-5 h-5 text-emerald-400" />,
      title: "Full-Stack Mastery",
      description: "Experienced across 3 technical internships delivering production MERN stack & REST APIs."
    },
    {
      icon: <Target className="w-5 h-5 text-amber-400" />,
      title: "Data Analytics Impact",
      description: "Spearheaded municipal record analysis and built Power BI dashboards at Mira-Bhayander Corporation."
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Story Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />

              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-blue-400" />
                <span>My Software Engineering Journey</span>
              </h3>

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
            </div>
          </motion.div>

          {/* Right Column: 4 Key Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"
          >
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all hover:-translate-y-1 group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base mb-1 group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
