import React, { useLayoutEffect, useState } from 'react';
import {
  ParticleCanvas,
  CustomCursor,
  Navbar,
  HeroSection,
  AboutSection,
  StatsSection,
  ExperienceSection,
  EducationSection,
  SkillsSection,
  ProjectsSection,
  CertificatesSection,
  GitHubContributionsSection,
  ContactSection,
  Footer
} from './components';

export default function App() {
  const [theme, setTheme] = useState(() => (
    document.documentElement.classList.contains('light') ? 'light' : 'dark'
  ));

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
    root.style.colorScheme = theme;
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch {
      // The selected theme still applies when storage is unavailable.
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden transition-colors duration-300">
      {/* Background Interactive Canvas */}
      <ParticleCanvas />

      {/* Custom Magnetic Follower Cursor */}
      <CustomCursor />

      {/* Glassmorphic Navigation Bar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Portfolio Core Sections */}
      <main className="relative z-10 space-y-8">
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificatesSection />
        <GitHubContributionsSection />
        <ContactSection />
      </main>

      {/* Structural Footer */}
      <Footer />
    </div>
  );
}
