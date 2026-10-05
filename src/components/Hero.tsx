import React, { useState } from 'react';
import { Download, Mail, ExternalLink, Github, Linkedin, Twitter, Sparkles } from 'lucide-react';
import { motion, type Variants } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onExploreProjects: () => void;
  onOpenTelemetryLab: () => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProjects,
  onOpenTelemetryLab,
  onOpenResume
}) => {
  const [imgLoaded, setImgLoaded] = useState(true);

  // Stagger variants for the hero text side
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const socialLinks = [
    {
      icon: <Linkedin className="w-4 h-4" />,
      href: PERSONAL_INFO.linkedinUrl,
      bg: 'bg-gradient-to-tr from-rose-500 to-purple-600',
      label: 'LinkedIn'
    },
    {
      icon: <Twitter className="w-4 h-4" />,
      href: 'https://twitter.com',
      bg: 'bg-gradient-to-tr from-slate-900 to-cyan-700',
      label: 'Twitter'
    },
    {
      icon: <Github className="w-4 h-4" />,
      href: PERSONAL_INFO.githubUrl,
      bg: 'bg-slate-800 border border-slate-700',
      label: 'GitHub'
    },
    {
      icon: <Mail className="w-4 h-4" />,
      href: `mailto:${PERSONAL_INFO.email}`,
      bg: 'bg-gradient-to-tr from-red-600 to-amber-600',
      label: 'Email'
    }
  ];

  return (
    <section id="hero" className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-[#0a0e17]">
      
      {/* Animated subtle background glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.18, 0.1]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-1/4 w-[480px] h-[480px] bg-orange-500/15 blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Socials, Headline, Bio, and Pill Action Buttons (col-span-7) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-left"
          >
            
            {/* 4 Colorful Social Icon Buttons */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-9 h-9 rounded-xl ${social.bg} flex items-center justify-center text-white shadow-md transition-shadow hover:shadow-orange-500/20`}
                  title={social.label}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>

            {/* Main Headline with subtle animated reveal */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Hi, I'm <span className="text-white">Sapna Labde</span>
              </h1>
            </motion.div>

            {/* Bio Prose (Resume Data Intact) */}
            <motion.p variants={itemVariants} className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Frontend Developer with 4+ years of experience building scalable, real-time, and high-performance web applications using React.js and modern JavaScript ecosystems. Strong expertise in Redux, Socket.io, TypeScript, REST APIs, and performance optimization.
            </motion.p>

            {/* Pill Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenResume}
                className="flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:brightness-110 rounded-full shadow-lg shadow-orange-500/30 transition-all cursor-pointer whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, borderColor: "rgba(249, 115, 22, 0.8)", backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const contactEl = document.getElementById('contact');
                  if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-slate-200 border border-slate-600 hover:text-white rounded-full transition-all cursor-pointer whitespace-nowrap"
              >
                <Mail className="w-4 h-4 text-orange-400" />
                <span>Contact Me</span>
              </motion.button>
            </motion.div>

          </motion.div>

          {/* Right Column: 3D Developer Character with Floating Animation (col-span-5) */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              
              {/* Back subtle orange circular glow pulse */}
              <motion.div 
                animate={{
                  scale: [0.95, 1.05, 0.95],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-orange-500/25 via-amber-500/15 to-transparent blur-2xl" 
              />

              {imgLoaded ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [-10, 8, -10]
                  }}
                  transition={{
                    opacity: { duration: 0.8 },
                    scale: { duration: 0.8 },
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <img
                    src={PERSONAL_INFO.hero3DImage}
                    alt="Sapna Labde - 3D Developer Character"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain filter drop-shadow-2xl relative z-10 rounded-3xl"
                    onError={() => setImgLoaded(false)}
                  />
                </motion.div>
              ) : (
                <div className="w-72 h-72 rounded-3xl bg-slate-800/80 border border-orange-500/30 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-20 h-20 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-2xl mb-2">
                    SL
                  </div>
                  <span className="text-white font-bold">Sapna Labde</span>
                  <span className="text-xs text-slate-400">Frontend Developer</span>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
