import React, { useState } from 'react';
import { Calendar, MapPin, Building, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { WORK_EXPERIENCES } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('starkenn');

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-20 bg-[#0a0e17] text-left">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-orange-500 tracking-tight">
            Work Experience
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A track record of engineering scalable frontend architectures, boosting load speeds, and accelerating team delivery cycles.
          </p>
        </div>

        {/* Experience Timeline Cards */}
        <div className="space-y-6">
          {WORK_EXPERIENCES.map((exp) => {
            const isExpanded = expandedId === exp.id;

            return (
              <div
                key={exp.id}
                className="rounded-2xl border border-slate-800 bg-[#111726] p-6 sm:p-8 transition-all hover:border-orange-500/35 shadow-xl text-left"
              >
                {/* Header row */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-800/80 pb-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mb-1.5">
                      <span className="flex items-center gap-1.5 font-semibold text-orange-400">
                        <Building className="w-3.5 h-3.5" />
                        {exp.company}
                      </span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
                      {exp.summary}
                    </p>
                  </div>

                  {/* Toggle button */}
                  <button
                    onClick={() => toggleExpand(exp.id)}
                    className="self-start flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-slate-200 border border-slate-700 hover:border-orange-500/50 rounded-full hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? 'Hide Details' : 'View Achievements'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-orange-400" /> : <ChevronDown className="w-3.5 h-3.5 text-orange-400" />}
                  </button>
                </div>

                {/* Quantitative Impact Highlights Strip */}
                <div className="py-5 grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-slate-800/60">
                  {exp.keyMetrics.map((metric, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <div className="text-lg sm:text-xl font-bold text-orange-400 font-mono tabular-nums">
                        {metric.value}
                      </div>
                      <div className="text-xs text-slate-400">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Expandable Bulleted Achievements */}
                {isExpanded && (
                  <div className="pt-6 space-y-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Key Deliverables & Technical Achievements
                    </h4>
                    <ul className="space-y-3">
                      {exp.achievements.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack Ribbon */}
                <div className="mt-6 pt-5 border-t border-slate-800/60 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
                  <span className="font-semibold text-slate-400">Core Technologies:</span>
                  <div className="flex flex-wrap items-center gap-2">
                    {exp.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-slate-300 bg-slate-900 px-2.5 py-0.5 rounded-full text-xs border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
