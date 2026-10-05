import React, { useEffect } from 'react';
import { X, CheckCircle2, Activity, Calendar, Building, Layers } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenTelemetryLab?: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onOpenTelemetryLab
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-2xl border border-amber-500/25 bg-[#0f121b] shadow-2xl text-left overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#121522] shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="text-amber-400 font-semibold">{project.category}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1">
              <Building className="w-3.5 h-3.5" />
              {project.company}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {project.period}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label="Close dialog (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          
          {/* Title & Subtitle */}
          <div>
            <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="mt-1 text-base text-slate-300">
              {project.subtitle}
            </p>
          </div>

          {/* Project Preview Image */}
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-amber-500/20 bg-slate-900">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                const target = e.target as HTMLElement;
                target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f121b]/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="text-xs text-amber-300 font-mono">
                Production Artifact · Verified Architecture
              </div>
              {project.id.includes('adas') && onOpenTelemetryLab && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenTelemetryLab();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-lg transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Launch Live Simulation</span>
                </button>
              )}
            </div>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-[#121624] border border-amber-500/15">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="space-y-0.5 text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-bold text-amber-400 font-mono tabular-nums">
                  {m.value}
                </div>
                <div className="text-xs text-slate-400">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* System Overview */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
              System Overview
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              {project.architectureDetails.overview}
            </p>
          </div>

          {/* Deliverables */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Core Deliverables
            </h3>
            <ul className="space-y-2.5">
              {project.bulletPoints.map((bp, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{bp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Challenges & Solutions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800/80">
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <span>Key Engineering Challenges</span>
              </h4>
              <ul className="space-y-2">
                {project.architectureDetails.keyChallenges.map((challenge, idx) => (
                  <li key={idx} className="text-xs text-slate-300 pl-3 border-l border-amber-500/40 leading-relaxed">
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-yellow-300 flex items-center gap-1.5">
                <span>Implemented Solutions</span>
              </h4>
              <ul className="space-y-2">
                {project.architectureDetails.technicalSolutions.map((sol, idx) => (
                  <li key={idx} className="text-xs text-slate-300 pl-3 border-l border-yellow-400/50 leading-relaxed">
                    {sol}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stack details */}
          <div className="pt-4 border-t border-slate-800/80">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Technology Stack & Tooling</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.architectureDetails.stack.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-medium text-amber-200/90 bg-amber-400/5 border border-amber-400/20 rounded-md"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-[#121522] flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
