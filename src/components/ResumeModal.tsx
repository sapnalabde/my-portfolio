import React, { useEffect, useState } from 'react';
import { X, Printer, Copy, Check, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const plainText = `
SAPNA LABDE
Pune, Maharashtra, India | sapnal1997@gmail.com | +91-8600825135 | linkedin.com/in/sapna-labde

SUMMARY
Frontend Developer with 4+ years of experience building scalable, real-time, and high-performance web applications using React.js and modern JavaScript ecosystems. Strong expertise in state management (Redux), real-time communication (Socket.io), REST APIs, authentication systems, and performance optimization. Experienced in product environments delivering responsive, production-grade applications handling live data streams. Passionate about clean architecture, reusable components, and delivering seamless user experiences at scale.

EXPERIENCE
Frontend Developer | Starkenn Technologies Pvt Ltd | April 2023 - February 2026, Pune, India
• Engineered and deployed Front End solutions for a dashboard project serving 1,000+ users, utilizing React.js and TypeScript over 12 months to maintain 99.8% uptime and boost UI load speed by 38% through code-splitting, Vite, and Webpack optimizations while ensuring cross-browser compatibility and fully responsive UI across devices.
• Spearheaded migration of legacy UI to React.js for a multi-module web application over 18 months, achieving 44% reduction in technical debt, 27% faster feature delivery cadence, and consistent component library integration using TypeScript.
• Directed end-to-end implementation of a feature-rich analytics dashboard using React.js, TypeScript, and Redux Toolkit over 9 months, increasing user engagement by 23% and supporting seamless integration with third-party APIs for real-time insights.
• Implemented version control strategies using Git, streamlining code collaboration for a 6-member team and reducing merge conflicts by 68% over 18 months, ensuring efficient CI/CD pipeline integration via GitHub Actions for all and integrated AWS services including S3, SES, and CodePipeline.
• Diagnosed and resolved complex frontend issues through advanced debugging in Chrome DevTools and React Developer Tools, decreasing critical bug resolution time by 63% across 14 releases over an 18-month project lifecycle.

Full Stack Developer | Cloudstrats Pvt Ltd | January 2022 - March 2023
• Delivered full stack web solutions by connecting React.js user interfaces with Django and Flask servers, supporting consistent state management and reliable cross-layer integration.
• Designed and deployed REST APIs while redesigning database structures in Django and Flask, reinforcing data consistency and streamlining transactions between client and server.
• Integrated secure authentication workflows and granular role-based access control (RBAC) mechanisms to safeguard user data and enforce permissions across full stack applications.
• Developed interactive wireframes using Figma for 4 web projects over 12 months, enabling client approval within one week on 90% of deliverables and accelerating front-end React.js implementation by 30%.

PROJECTS
ADAS Portal – Version 3
• Enhanced ADAS Portal with advanced real-time features including live notifications, geofencing, reporting dashboards, and integrated chat support.
• Implemented socket-based real-time communication for instant alerts and live telemetry updates.
• Architected Redux-based state management for efficient data flow across complex modules.
• Developed geofencing functionality enabling location-based vehicle monitoring and alerts.

ADAS Portal – Version 2
• Developed live data monitoring system enabling real-time vehicle telemetry tracking.
• Converted UI/UX designs into pixel-perfect production-ready code.
• Built fully responsive application supporting desktop, tablet, and mobile devices.
• Optimized frontend performance for handling continuous telemetry streams with minimal latency.
• Collaborated cross-functionally to deliver scalable product features.

EDUCATION
Bachelor's Degree in Electronics and Communication | RTMNU, Nagpur • 2018

SKILLS
Languages: JavaScript, TypeScript, Python
Frontend: React.js, Redux, Context API, Tailwind CSS, Material UI, SCSS, Figma, Vite, Webpack
Real-Time: Socket.io
Backend: Django, Flask
Cloud: AWS (S3, SES, CodePipeline)
`.trim();

    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-2xl border border-amber-500/25 bg-[#0f121b] shadow-2xl text-left overflow-hidden my-4 max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Actions Toolbar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-800 bg-[#121522] shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white" id="resume-dialog-title">
              Sapna Labde — Verified Resume
            </span>
            <span className="hidden sm:inline-block text-xs text-amber-400 font-mono">
              (Updated 2026)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              title="Copy plain-text resume"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-amber-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-xl transition-all cursor-pointer shadow-md"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer ml-1"
              aria-label="Close resume viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable/Scrollable Resume Document Container */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-white text-slate-900 font-sans print:p-0 print:m-0 selection:bg-amber-100">
          
          {/* Header */}
          <div className="border-b border-slate-300 pb-5 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Sapna Labde
            </h1>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-700">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-500" />
                Pune, Maharashtra, India
              </span>
              <span>·</span>
              <a href="mailto:sapnal1997@gmail.com" className="flex items-center gap-1 text-amber-700 hover:underline">
                <Mail className="w-3 h-3 text-slate-500" />
                sapnal1997@gmail.com
              </a>
              <span>·</span>
              <a href="tel:+918600825135" className="flex items-center gap-1 text-slate-800 hover:underline">
                <Phone className="w-3 h-3 text-slate-500" />
                +91-8600825135
              </a>
              <span>·</span>
              <a href="https://www.linkedin.com/in/sapna-labde" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-amber-700 hover:underline">
                <ExternalLink className="w-3 h-3 text-slate-500" />
                in/sapna-labde
              </a>
            </div>
          </div>

          {/* Summary Section */}
          <div className="py-4 border-b border-slate-300">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">
              Summary
            </h2>
            <p className="text-xs text-slate-800 leading-relaxed text-justify">
              Frontend Developer with 4+ years of experience building scalable, real-time, and high-performance web applications using React.js and modern JavaScript ecosystems. Strong expertise in state management (Redux), real-time communication (Socket.io), REST APIs, authentication systems, and performance optimization. Experienced in product environments delivering responsive, production-grade applications handling live data streams. Passionate about clean architecture, reusable components, and delivering seamless user experiences at scale.
            </p>
          </div>

          {/* Experience Section */}
          <div className="py-4 border-b border-slate-300 space-y-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Experience
            </h2>

            {/* Starkenn */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs font-semibold text-slate-900">
                <span className="text-sm">Frontend Developer</span>
                <span className="text-slate-600 font-normal">April 2023 – February 2026, Pune, India</span>
              </div>
              <div className="text-xs font-medium text-slate-700 italic mb-2">
                Starkenn Technologies Pvt Ltd
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs text-slate-800 leading-relaxed">
                <li>Engineered and deployed Front End solutions for a dashboard project serving 1,000+ users, utilizing React.js and TypeScript over 12 months to maintain 99.8% uptime and boost UI load speed by 38% through code-splitting, Vite, and Webpack optimizations while ensuring cross-browser compatibility and fully responsive UI across devices.</li>
                <li>Spearheaded migration of legacy UI to React.js for a multi-module web application over 18 months, achieving 44% reduction in technical debt, 27% faster feature delivery cadence, and consistent component library integration using TypeScript.</li>
                <li>Directed end-to-end implementation of a feature-rich analytics dashboard using React.js, TypeScript, and Redux Toolkit over 9 months, increasing user engagement by 23% and supporting seamless integration with third-party APIs for real-time insights.</li>
                <li>Implemented version control strategies using Git, streamlining code collaboration for a 6-member team and reducing merge conflicts by 68% over 18 months, ensuring efficient CI/CD pipeline integration via GitHub Actions for all and integrated AWS services including S3, SES, and CodePipeline.</li>
                <li>Diagnosed and resolved complex frontend issues through advanced debugging in Chrome DevTools and React Developer Tools, decreasing critical bug resolution time by 63% across 14 releases over an 18-month project lifecycle.</li>
              </ul>
            </div>

            {/* Cloudstrats */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs font-semibold text-slate-900">
                <span className="text-sm">Full Stack Developer</span>
                <span className="text-slate-600 font-normal">January 2022 – March 2023</span>
              </div>
              <div className="text-xs font-medium text-slate-700 italic mb-2">
                Cloudstrats Pvt Ltd
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs text-slate-800 leading-relaxed">
                <li>Delivered full stack web solutions by connecting React.js user interfaces with Django and Flask servers, supporting consistent state management and reliable cross-layer integration.</li>
                <li>Designed and deployed REST APIs while redesigning database structures in Django and Flask, reinforcing data consistency and streamlining transactions between client and server.</li>
                <li>Integrated secure authentication workflows and granular role-based access control (RBAC) mechanisms to safeguard user data and enforce permissions across full stack applications.</li>
                <li>Developed interactive wireframes using Figma for 4 web projects over 12 months, enabling client approval within one week on 90% of deliverables and accelerating front-end React.js implementation by 30%.</li>
              </ul>
            </div>
          </div>

          {/* Projects Section */}
          <div className="py-4 border-b border-slate-300 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Projects
            </h2>

            {/* ADAS v3 */}
            <div>
              <div className="text-xs font-bold text-slate-900 mb-1">
                ADAS Portal – Version 3
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-800 leading-relaxed">
                <li>Enhanced ADAS Portal with advanced real-time features including live notifications, geofencing, reporting dashboards, and integrated chat support.</li>
                <li>Implemented socket-based real-time communication for instant alerts and live telemetry updates.</li>
                <li>Architected Redux-based state management for efficient data flow across complex modules.</li>
                <li>Developed geofencing functionality enabling location-based vehicle monitoring and alerts.</li>
              </ul>
            </div>

            {/* ADAS v2 */}
            <div>
              <div className="text-xs font-bold text-slate-900 mb-1">
                ADAS Portal – Version 2
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-800 leading-relaxed">
                <li>Developed live data monitoring system enabling real-time vehicle telemetry tracking.</li>
                <li>Converted UI/UX designs into pixel-perfect production-ready code.</li>
                <li>Built fully responsive application supporting desktop, tablet, and mobile devices.</li>
                <li>Optimized frontend performance for handling continuous telemetry streams with minimal latency.</li>
                <li>Collaborated cross-functionally to deliver scalable product features.</li>
              </ul>
            </div>
          </div>

          {/* Education Section */}
          <div className="py-4 border-b border-slate-300">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">
              Education
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs text-slate-800">
              <span className="font-semibold">Bachelor's Degree in Electronics and Communication</span>
              <span className="text-slate-600">RTMNU, Nagpur • 2018</span>
            </div>
          </div>

          {/* Skills Section */}
          <div className="pt-4 text-xs text-slate-800 space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
              Skills
            </h2>
            <p><strong>Languages:</strong> JavaScript, TypeScript, Python</p>
            <p><strong>Frontend:</strong> React.js, Redux, Context API, Tailwind CSS, Material UI, SCSS, Figma, Vite, Webpack</p>
            <p><strong>Real-Time:</strong> Socket.io</p>
            <p><strong>Backend:</strong> Django, Flask</p>
            <p><strong>Cloud:</strong> AWS (S3, SES, CodePipeline)</p>
          </div>

        </div>

        {/* Modal Bottom Close Button */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#121522] flex justify-end print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
