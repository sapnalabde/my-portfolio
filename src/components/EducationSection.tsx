import React from 'react';
import { GraduationCap, CheckCircle2 } from 'lucide-react';
import { EDUCATION } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-20 border-t border-slate-800/80 bg-[#07080d] text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            Academic Foundation
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Education & Core Foundations
          </h2>
          <p className="mt-3 text-base text-slate-400">
            A rigorous engineering background in electronics, signals, and microprocessors bridging the gap between embedded hardware data and high-performance browser interfaces.
          </p>
        </div>

        <div className="rounded-2xl border border-amber-500/20 bg-[#10131d] p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-slate-800/80 pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
                <GraduationCap className="w-4 h-4" />
                <span>Undergraduate Degree</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {EDUCATION.degree}
              </h3>
              <p className="text-sm font-medium text-slate-300">
                {EDUCATION.institution} · {EDUCATION.location}
              </p>
            </div>

            <div className="shrink-0 text-left md:text-right">
              <span className="text-sm font-bold text-amber-300 font-mono bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-lg">
                Class of {EDUCATION.graduationYear}
              </span>
            </div>
          </div>

          <div className="pt-6 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Cross-Disciplinary Engineering Impact
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {EDUCATION.highlights.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#090b12] border border-amber-500/10 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
