import React, { useState } from 'react';
import { Mail, Phone, MapPin, ExternalLink, Copy, Check, Send, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formState.name.trim()) errors.name = 'Please provide your name';
    if (!formState.email.trim() || !/\S+@\S+\.\S+/.test(formState.email)) errors.email = 'Please provide a valid email';
    if (!formState.message.trim()) errors.message = 'Please provide a message';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-[#0a0e17] text-left">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mb-12 space-y-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-orange-500 tracking-tight">
            Contact Me
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Open to senior frontend, real-time web architecture, and full-stack engineering opportunities. Let's discuss your next project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Direct Contact Cards (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <div className="p-5 rounded-2xl border border-amber-500/15 bg-[#10131d] flex items-center justify-between shadow-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>Direct Email</span>
                </div>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-base font-semibold text-white hover:text-amber-300 transition-colors"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-2 text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 rounded-xl border border-slate-700/60 transition-colors cursor-pointer"
                title="Copy email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-amber-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-5 rounded-2xl border border-amber-500/15 bg-[#10131d] flex items-center justify-between shadow-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Phone className="w-4 h-4 text-yellow-400" />
                  <span>Phone / WhatsApp</span>
                </div>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="text-base font-semibold text-white hover:text-amber-300 transition-colors font-mono tabular-nums"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>
              <button
                onClick={handleCopyPhone}
                className="p-2 text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 rounded-xl border border-slate-700/60 transition-colors cursor-pointer"
                title="Copy phone number"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-amber-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* LinkedIn Card */}
            <div className="p-5 rounded-2xl border border-amber-500/15 bg-[#10131d] flex items-center justify-between shadow-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ExternalLink className="w-4 h-4 text-amber-400" />
                  <span>Professional Profile</span>
                </div>
                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-base font-semibold text-white hover:text-amber-300 transition-colors"
                >
                  linkedin.com/{PERSONAL_INFO.linkedinDisplay}
                </a>
              </div>
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 rounded-xl border border-slate-700/60 transition-colors"
                title="Open LinkedIn"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Location Card */}
            <div className="p-5 rounded-2xl border border-amber-500/15 bg-[#10131d] flex items-center justify-between shadow-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <MapPin className="w-4 h-4 text-yellow-500" />
                  <span>Location</span>
                </div>
                <div className="text-base font-semibold text-white">
                  {PERSONAL_INFO.location}
                </div>
              </div>
            </div>

          </div>

          {/* Message Form (lg:col-span-7) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-amber-500/20 bg-[#10131d] p-6 sm:p-8 shadow-2xl">
              
              {isSubmitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto text-amber-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out, {formState.name}. Sapna will review your message and reply via <span className="text-amber-300 font-medium">{formState.email}</span> shortly.
                  </p>
                  <div className="pt-4 flex items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormState({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formState.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(formState.message)}`}
                      className="px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-xl transition-all"
                    >
                      Open Email App
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-2">
                    Send a Direct Note
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-slate-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#090b12] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors ${
                          formErrors.name ? 'border-rose-500' : 'border-amber-500/20'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-[11px] text-rose-400 mt-1">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g. alex@company.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#090b12] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors ${
                          formErrors.email ? 'border-rose-500' : 'border-amber-500/20'
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-[11px] text-rose-400 mt-1">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Subject / Role Discussion
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="e.g. Frontend Engineering Opportunity / Telemetry Architecture"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090b12] border border-amber-500/20 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Hi Sapna, we were impressed by your ADAS telemetry and React optimization work..."
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#090b12] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors resize-none ${
                        formErrors.message ? 'border-rose-500' : 'border-amber-500/20'
                      }`}
                    />
                    {formErrors.message && (
                      <p className="text-[11px] text-rose-400 mt-1">{formErrors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Sapna</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
