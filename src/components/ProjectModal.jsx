import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, Lightbulb, Code2, Layers } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl glass-panel rounded-3xl border border-slate-800 shadow-2xl overflow-hidden z-10 my-8 text-slate-100"
        >
          {/* Header Image with Gradient */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/60 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono border border-blue-500/30">
                {project.category}
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
                {project.title}
              </h3>
              <p className="text-slate-300 text-sm font-mono mt-1">
                {project.subtitle}
              </p>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            
            {/* Description */}
            <div>
              <h4 className="text-xs font-mono uppercase text-blue-400 tracking-wider mb-2">Overview</h4>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Problem Solved */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h4 className="text-xs font-mono uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                Problem Solved
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-xs font-mono uppercase text-emerald-400 tracking-wider mb-3">Key Features</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-xs font-mono uppercase text-purple-400 tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                Architecture & Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 text-blue-300 text-xs font-mono border border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Challenges & What I Learned */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <h5 className="text-xs font-mono text-purple-400 uppercase tracking-wider mb-2">Technical Challenges</h5>
                <p className="text-slate-300 text-xs leading-relaxed">{project.challenges}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <h5 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5" />
                  What I Learned
                </h5>
                <p className="text-slate-300 text-xs leading-relaxed">{project.learned}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 hover:border-slate-500 transition-all"
              >
                <Github className="w-4 h-4 text-blue-400" />
                <span>View Source Code</span>
              </a>

              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-xs shadow-lg hover:scale-105 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Interactive Demo</span>
              </a>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
