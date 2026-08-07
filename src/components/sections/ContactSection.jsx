import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Github, Linkedin, Sparkles, Clock, Globe } from 'lucide-react';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import { resumeData } from '../../data/resumeData';

const CONTACT_EMAIL = 'vinit.praja689@gmail.com';
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim(),
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim(),
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim()
};

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const { serviceId, templateId, publicKey } = EMAILJS_CONFIG;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EMAILJS_NOT_CONFIGURED');
      }

      const senderName = formData.name.trim();
      const senderEmail = formData.email.trim();
      const subject = formData.subject.trim() || 'New portfolio contact inquiry';
      const message = formData.message.trim();

      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          to_name: 'Vinit Prajapati',
          to_email: CONTACT_EMAIL,
          from_name: senderName,
          from_email: senderEmail,
          reply_to: senderEmail,
          subject,
          message
        },
        {
          publicKey,
          limitRate: {
            id: 'portfolio-contact-form',
            throttle: 1000
          }
        }
      );

      if (result.status < 200 || result.status >= 300) {
        throw new Error('EMAILJS_SEND_FAILED');
      }

      setSubmitted(true);
      triggerConfetti();
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitted(false);
      setErrorMessage(
        error instanceof Error && error.message === 'EMAILJS_NOT_CONFIGURED'
          ? `Email delivery is not configured yet. Please email me directly at ${CONTACT_EMAIL}.`
          : `Your message could not be sent right now. Please try again or email me directly at ${CONTACT_EMAIL}.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <Mail className="w-3.5 h-3.5" />
            <span>Initiate Communication</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-slate-400 text-base">
            Have an engineering role, project inquiry, or technical collaboration? Send me a message below.
          </p>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Contact Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Status Card */}
            <div className="group relative h-36 overflow-hidden glass-panel p-4 rounded-3xl border border-slate-800/90 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-emerald-400/35 hover:shadow-[0_18px_45px_-26px_rgba(16,185,129,0.65)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-14 h-32 w-32 rounded-full bg-emerald-400/10 blur-3xl transition-opacity duration-300 group-hover:opacity-90"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-px rounded-[22px] border border-white/[0.035]"
              />

              <div className="relative flex h-full flex-col">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="relative flex h-3 w-3 shrink-0" aria-label="Online and available">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-30" />
                      <span className="relative inline-flex h-3 w-3 rounded-full border border-emerald-200/60 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.65)]" />
                    </span>
                    <h3 className="truncate text-sm font-bold tracking-tight text-white">
                      Operational Status
                    </h3>
                  </div>

                  <span className="shrink-0 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.18em] text-emerald-300">
                    Online
                  </span>
                </div>

                <p className="mt-2 text-[10px] leading-[14px] text-slate-300 sm:text-[11px] sm:leading-[15px]">
                  Open to Full-Stack Development, AI/ML, Data Analytics Internships, Freelance Projects, and Startup Collaborations.
                </p>

                <div className="mt-auto flex items-center justify-between gap-3 rounded-xl border border-slate-700/60 bg-slate-950/35 px-3 py-1.5">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-blue-400/15 bg-blue-400/[0.08]">
                      <Clock className="h-3.5 w-3.5 text-blue-300" />
                    </span>
                    <span className="truncate text-[9px] font-mono uppercase tracking-[0.12em] text-slate-400">
                      Typical response
                    </span>
                  </div>
                  <span className="shrink-0 text-[10px] font-semibold text-slate-200">Under 4 hours</span>
                </div>
              </div>
            </div>

            {/* Direct Details */}
            <div className="space-y-4">
              <a
                href={`mailto:${resumeData.personalInfo.email}`}
                className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all flex items-center gap-4 group"
              >
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-slate-400">Direct Email</p>
                  <p className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">
                    {resumeData.personalInfo.email}
                  </p>
                </div>
              </a>

              <a
                href={`tel:${resumeData.personalInfo.phone}`}
                className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all flex items-center gap-4 group"
              >
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-slate-400">Phone Number</p>
                  <p className="font-bold text-white text-sm group-hover:text-purple-400 transition-colors">
                    {resumeData.personalInfo.phone}
                  </p>
                </div>
              </a>

              <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-slate-400">Location Base</p>
                  <p className="font-bold text-white text-sm">
                    {resumeData.personalInfo.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-around">
              <a
                href={resumeData.personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-blue-400 text-xs font-mono transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <span className="text-slate-800">|</span>
              <a
                href={resumeData.personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-blue-400 text-xs font-mono transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>

          </motion.div>

          {/* Right EmailJS Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="glass-panel p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Dispatched!</h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto">
                    Thank you for contacting me. Your message has been received and I will reply to your email shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    <span>Send a Direct Message</span>
                  </h3>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. sarah@google.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Full-Stack Engineering Role Inquiry"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Message *</label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message or project details here..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 text-white font-bold text-sm shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Dispatching Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message Now</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
