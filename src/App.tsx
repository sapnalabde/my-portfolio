/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutMeSection } from './components/AboutMeSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-100 flex flex-col font-sans selection:bg-orange-500/30 selection:text-orange-200">
      {/* Floating Pill Dock Navigation Bar (matching reference) */}
      <Navbar
        onOpenResume={() => setIsResumeModalOpen(true)}
        onNavigate={scrollToSection}
      />

      <main className="flex-grow">
        {/* Hero Section: Socials, "Hi, I'm Sapna Labde", Buttons, 3D Character */}
        <Hero
          onExploreProjects={() => scrollToSection('projects')}
          onOpenResume={() => setIsResumeModalOpen(true)}
        />

        {/* About Me Section: 3D Character with Star Backdrop, Stats, Bio, Learn More */}
        <AboutMeSection
          onLearnMore={() => scrollToSection('experience')}
        />

        {/* My Skills Section: 8-Card Proficiency Grid with Progress Bars */}
        <SkillsSection />

        {/* Work Experience Section */}
        <ExperienceSection />

        {/* My Projects Section */}
        <ProjectsSection />

        {/* Academic Foundations & Education */}
        <EducationSection />

        {/* Contact Me Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenResume={() => setIsResumeModalOpen(true)}
        onNavigate={scrollToSection}
      />

      {/* Verified Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}
