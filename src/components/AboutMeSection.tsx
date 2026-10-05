import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface AboutMeSectionProps {
  onLearnMore: () => void;
}

export const AboutMeSection: React.FC<AboutMeSectionProps> = ({ onLearnMore }) => {
  const [imgLoaded, setImgLoaded] = useState(true);

  return (
    <section id="about" className="py-20 bg-[#0a0e17] relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.16, 0.08]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-orange-500/10 blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: 3D Developer Character in front of Orange Star with Float Animation */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              
              {/* Warm orange radial backdrop with gentle pulse */}
              <motion.div 
                animate={{ scale: [0.9, 1.05, 0.9] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-[280px] h-[280px] rounded-full bg-gradient-to-tr from-orange-500/25 to-amber-500/10 blur-xl" 
              />

              {imgLoaded ? (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <motion.img
                    animate={{ y: [8, -8, 8] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    src={PERSONAL_INFO.about3DImage}
                    alt="About Sapna Labde - 3D Developer Art"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain filter drop-shadow-2xl relative z-10 rounded-3xl"
                    onError={() => setImgLoaded(false)}
                  />
                </motion.div>
              ) : (
                <div className="w-72 h-72 rounded-3xl bg-slate-800/80 border border-orange-500/30 flex flex-col items-center justify-center text-center p-6">
                  <span className="text-3xl font-extrabold text-orange-400">★</span>
                  <span className="text-white font-bold mt-2">Sapna Labde</span>
                  <span className="text-xs text-slate-400">Engineering scalable interfaces</span>
                </div>
              )}

            </div>
          </div>

          {/* Right Column: About Me Header, Narrative, 3 Stats, and Learn More button */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            
            {/* Section Title in warm orange */}
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-orange-500 tracking-tight"
            >
              About Me
            </motion.h2>

            {/* Narrative text */}
            <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                I am a dedicated Frontend Developer with 4+ years of professional experience building scalable, real-time, and high-performance web applications using React.js and the modern JavaScript ecosystem.
              </p>
              <p>
                At <span className="text-white font-medium">Starkenn Technologies</span>, I engineered telemetry dashboard solutions serving 1,000+ daily users with 99.8% uptime, boosted UI load speed by 38% using Vite and code-splitting, and spearheaded legacy UI migrations that reduced technical debt by 44%.
              </p>
              <p>
                At <span className="text-white font-medium">Cloudstrats</span>, I delivered full stack web solutions connecting React with Django & Flask backends, integrated granular RBAC security workflows, and designed Figma wireframes with a 90% client approval rate in one week.
              </p>
            </div>

            {/* 3 Statistics Row with orange numbers */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-800/80">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="space-y-1 transition-transform"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-orange-500 font-mono tabular-nums">
                  4+
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  Years Experience
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="space-y-1 transition-transform"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-orange-500 font-mono tabular-nums">
                  1,000+
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  Active Users
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="space-y-1 transition-transform"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-orange-500 font-mono tabular-nums">
                  99.8%
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  Production Uptime
                </div>
              </motion.div>
            </div>

            {/* Pill Outline Button */}
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(249, 115, 22, 0.15)", borderColor: "rgba(249, 115, 22, 1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onLearnMore}
                className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-orange-400 border border-orange-500/60 rounded-full transition-all cursor-pointer"
              >
                Learn More
              </motion.button>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
