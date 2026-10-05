import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { HIGHLIGHT_SKILLS, SKILL_CATEGORIES } from '../data/portfolioData';
import { 
  Code2, 
  Layers, 
  Radio, 
  Cpu, 
  Wind, 
  Zap, 
  Server, 
  Cloud,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [showAllCategories, setShowAllCategories] = useState(false);

  const getSkillIcon = (name: string) => {
    switch (name) {
      case 'React.js':
        return <Cpu className="w-5 h-5 text-blue-400" />;
      case 'TypeScript':
        return <Code2 className="w-5 h-5 text-sky-400" />;
      case 'Redux Toolkit':
        return <Layers className="w-5 h-5 text-purple-400" />;
      case 'Socket.io':
        return <Radio className="w-5 h-5 text-orange-400" />;
      case 'Tailwind CSS':
        return <Wind className="w-5 h-5 text-cyan-400" />;
      case 'Vite & Webpack':
        return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'Python / Django':
        return <Server className="w-5 h-5 text-emerald-400" />;
      case 'AWS & CI/CD':
        return <Cloud className="w-5 h-5 text-rose-400" />;
      default:
        return <Code2 className="w-5 h-5 text-orange-400" />;
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="skills" className="py-20 bg-[#0a0e17] text-center relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto mb-14 space-y-2"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-orange-500 tracking-tight">
            My Skills
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Technologies and tools I work with to create amazing web experiences
          </p>
        </motion.div>

        {/* 8-Card Proficiency Grid with Framer Motion Stagger & Animated Progress Bars */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left"
        >
          {HIGHLIGHT_SKILLS.map((skill, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ 
                y: -6, 
                scale: 1.02,
                borderColor: 'rgba(249, 115, 22, 0.45)',
                boxShadow: '0 12px 30px -10px rgba(249, 115, 22, 0.15)'
              }}
              className="rounded-2xl bg-[#111726] border border-slate-800 p-5 shadow-xl transition-colors duration-200 flex flex-col justify-between group cursor-default"
            >
              {/* Top row: Icon + Skill Name */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  {getSkillIcon(skill.name)}
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight group-hover:text-orange-300 transition-colors">
                    {skill.name}
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    {skill.tag}
                  </span>
                </div>
              </div>

              {/* Middle row: Proficiency label + Percentage */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Proficiency</span>
                  <span className="font-mono font-bold text-orange-400">
                    {skill.proficiency}%
                  </span>
                </div>

                {/* Bottom row: Dynamically Animated Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.1 + idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className={`h-full rounded-full bg-gradient-to-r ${skill.barColor}`}
                  />
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* Toggle to expand detailed technical domain breakdown */}
        <div className="mt-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-slate-300 hover:text-white border border-slate-700 hover:border-orange-500/50 rounded-full transition-colors cursor-pointer bg-slate-900/50"
          >
            <span>{showAllCategories ? 'Hide Deep Matrix' : 'View Full Technology Breakdown'}</span>
            {showAllCategories ? <ChevronUp className="w-4 h-4 text-orange-400" /> : <ChevronDown className="w-4 h-4 text-orange-400" />}
          </motion.button>
        </div>

        {/* Expanded Detailed Categories with Animation */}
        <AnimatePresence>
          {showAllCategories && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left pt-6 border-t border-slate-800 overflow-hidden"
            >
              {SKILL_CATEGORIES.map((category, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-800 bg-[#111726] p-6 shadow-xl space-y-4"
                >
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-white">
                      {category.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {category.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {category.skills.map((s, sIdx) => (
                      <div key={sIdx} className="space-y-0.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-200">{s.name}</span>
                          <span className="font-mono text-orange-400">{s.level}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-normal">
                          {s.useCase}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
