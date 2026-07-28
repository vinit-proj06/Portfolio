import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Layout, Server, Brain, Database, Wrench, Search, Sparkles } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Skills', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'languages', label: 'Languages', icon: <Code2 className="w-4 h-4" /> },
    { id: 'frontend', label: 'Frontend', icon: <Layout className="w-4 h-4" /> },
    { id: 'backend', label: 'Backend', icon: <Server className="w-4 h-4" /> },
    { id: 'aiMl', label: 'AI & ML', icon: <Brain className="w-4 h-4" /> },
    { id: 'databases', label: 'Databases', icon: <Database className="w-4 h-4" /> },
    { id: 'tools', label: 'Developer Tools', icon: <Wrench className="w-4 h-4" /> },
  ];

  // Helper to compile skills
  const getAllSkills = () => {
    let list = [];
    Object.keys(resumeData.skills).forEach((catKey) => {
      resumeData.skills[catKey].forEach((skill) => {
        list.push({ ...skill, category: catKey });
      });
    });
    return list;
  };

  const allSkills = getAllSkills();

  const filteredSkills = allSkills.filter((skill) => {
    const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
            <Brain className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Skills <span className="text-gradient">& Expertise</span>
          </h2>
          <p className="text-slate-400 text-base">
            Comprehensive tech stack spanning modern full-stack frameworks, AI/RAG architectures, databases, and developer tools.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill (e.g. RAG, React)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

        </div>

        {/* Skill Grid Cards */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredSkills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-blue-500/40 transition-all hover:scale-[1.02] group relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 font-mono text-sm font-bold group-hover:scale-110 transition-transform">
                      {skill.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">
                        {skill.name}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400 capitalize">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-gradient-blue">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress Indicator */}
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-400 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
