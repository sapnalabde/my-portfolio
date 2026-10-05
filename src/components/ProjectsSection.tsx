import React, { useState } from 'react';
import { ArrowUpRight, Activity, Cpu } from 'lucide-react';
import { motion } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { ProjectDetailModal } from './ProjectDetailModal';

interface ProjectsSectionProps {
  onOpenTelemetryLab: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenTelemetryLab }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'Real-Time & ADAS', 'Analytics & Performance', 'Full Stack Architecture'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 bg-[#0a0e17] text-center">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto mb-12 space-y-2"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-orange-500 tracking-tight">
            My Projects
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A showcase of my recent work
          </p>
        </motion.div>

        {/* Filter Tabs in pill style */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25'
                    : 'text-slate-400 hover:text-white bg-[#111726] border border-slate-800'
                }`}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>

        {/* Projects Grid with Staggered Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 text-left">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ 
                y: -8,
                borderColor: 'rgba(249, 115, 22, 0.45)',
                boxShadow: '0 20px 35px -10px rgba(0, 0, 0, 0.6)'
              }}
              className="group rounded-2xl bg-[#111726] border border-slate-800 overflow-hidden transition-colors duration-300 flex flex-col justify-between shadow-2xl cursor-pointer"
              onClick={() => setActiveModalProject(project)}
            >
              {/* Image Preview Slot */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 border-b border-slate-800/80">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111726] via-transparent to-transparent opacity-85" />

                {/* Category badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 text-xs font-semibold text-orange-300 bg-[#0a0e17]/85 backdrop-blur-md px-3 py-1 rounded-full border border-orange-500/30">
                  <Cpu className="w-3.5 h-3.5 text-orange-400" />
                  <span>{project.category}</span>
                </div>

                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-900/80 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:scale-110 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-slate-400 mb-1.5 flex items-center gap-2">
                    <span className="text-orange-400/90 font-medium">{project.company}</span>
                    <span>·</span>
                    <span>{project.period}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-orange-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>
                </div>

                {/* Metrics & Tags */}
                <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    {project.metrics.map((m, mIdx) => (
                      <div key={mIdx}>
                        <div className="text-sm font-bold text-orange-400 font-mono tabular-nums">
                          {m.value}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] text-slate-300 bg-slate-900/80 px-2.5 py-0.5 rounded-full border border-slate-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </motion.div>
          ))}
        </div>

        {/* Live ADAS Telemetry Demonstration Callout with Pulse Animation */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="mt-14 rounded-2xl border border-orange-500/30 bg-gradient-to-r from-orange-950/30 via-[#111726] to-[#0e1424] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-left shadow-2xl"
        >
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-400">
              <Activity className="w-4 h-4 animate-pulse" />
              <span>Interactive Telemetry Demonstration</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Test Real-Time ADAS Socket.io Ingestion Live
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Experience the simulated high-frequency CAN-bus data stream, polygon geofence crossing triggers, and 60fps render latency budget directly in your browser.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenTelemetryLab}
            className="flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 rounded-full transition-all cursor-pointer shrink-0 shadow-lg shadow-orange-500/30 active:scale-95 whitespace-nowrap"
          >
            <span>Open Telemetry Lab</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

      </div>

      {/* Case Study Modal */}
      <ProjectDetailModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        onOpenTelemetryLab={onOpenTelemetryLab}
      />
    </section>
  );
};
