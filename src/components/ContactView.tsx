import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { validateContactForm, ContactFormData } from '../utils/portfolio.ts';
import { Check, Copy, Send, Sparkles, Phone, Mail, ArrowUpRight, Github, Linkedin, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ContactViewProps {
  onNavigate: (view: 'home' | 'about' | 'portfolio' | 'contact') => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    projectType: 'Autonomous Agents & AI Systems',
    budget: '$1k – $5k',
    details: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [inquiryId, setInquiryId] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateContactForm(formData);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit inquiry. Please try again or email directly.');
      }

      setInquiryId(data.inquiryId);
      setSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || 'Unable to connect to the contact server. Please try again or use direct email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendViaMailClient = () => {
    const subject = encodeURIComponent(`Project Inquiry: ${formData.projectType} from ${formData.fullName}`);
    const body = encodeURIComponent(
      `Hi Dhruva,\n\nName: ${formData.fullName}\nEmail: ${formData.email}\nFocus Area: ${formData.projectType}\nBudget / Engagement: ${formData.budget}\n\nProject Details:\n${formData.details}\n\nLooking forward to hearing from you!`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="w-full">
      <main className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 pb-16 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-6 flex flex-col justify-between pt-2">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
                  Get in Touch
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.08] font-bold tracking-tight text-[#0a0a0a] dark:text-white max-w-xl transition-colors">
                If you prefer not to fill out forms, feel free to email me directly and let's talk about the next big thing!
              </h1>
            </div>

            {/* Direct Contact Details */}
            <div className="mt-12 sm:mt-20 space-y-8">
              {/* Phone */}
              <div className="p-4 rounded-2xl bg-white/60 dark:bg-neutral-900/70 border border-neutral-300/80 dark:border-white/10 flex items-center justify-between transition-colors">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#6c6b69] dark:text-neutral-400 mb-1">
                    Direct Phone / WhatsApp
                  </p>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-white hover:opacity-75 transition-opacity block"
                  >
                    {PERSONAL_INFO.formattedPhone}
                  </a>
                </div>
                <button
                  onClick={handleCopyPhone}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-medium flex items-center gap-1.5 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all shadow-xs"
                  title="Copy Phone"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Email */}
              <div className="p-4 rounded-2xl bg-white/60 dark:bg-neutral-900/70 border border-neutral-300/80 dark:border-white/10 flex items-center justify-between transition-colors">
                <div className="overflow-hidden pr-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#6c6b69] dark:text-neutral-400 mb-1">
                    Direct Email
                  </p>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-lg sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-white hover:opacity-75 transition-opacity block truncate"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-medium flex items-center gap-1.5 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all shrink-0 shadow-xs"
                  title="Copy Email"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Location Badge */}
              <div className="text-sm text-neutral-600 dark:text-neutral-300 flex items-center gap-2">
                <span className="font-semibold text-neutral-900 dark:text-white">Location:</span>
                <span>{PERSONAL_INFO.location}</span>
                <span className="text-neutral-400">•</span>
                <span className="text-neutral-500 dark:text-neutral-400">Open to Global Remote & On-Site</span>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-6 w-full">
            <section
              className="bg-[#d2d1cd] dark:bg-[#161822] rounded-[28px] p-6 sm:p-10 shadow-sm border border-[#c5c4bf] dark:border-white/10 transition-colors"
              data-purpose="contact-form-card"
            >
              {submitted ? (
                <div className="py-6 sm:py-8 text-center space-y-4 animate-in fade-in duration-500">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      Inquiry Delivered Successfully
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white mt-2">
                      Message Received, {formData.fullName}!
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-md mx-auto leading-relaxed">
                    Your project details have been recorded and dispatched directly to Dhruva Sai's priority inbox (<strong className="text-neutral-900 dark:text-white font-mono">{PERSONAL_INFO.email}</strong>). Dhruva will review your submission and reply shortly.
                  </p>

                  {/* Summary Card */}
                  <div className="bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 rounded-2xl p-4 text-left max-w-md mx-auto space-y-2 text-xs font-mono">
                    <div className="flex justify-between items-center text-neutral-500 dark:text-neutral-400 border-b border-black/5 dark:border-white/5 pb-1.5">
                      <span>Ref ID</span>
                      <span className="text-neutral-800 dark:text-neutral-200">{inquiryId || 'INQ-DISPATCHED'}</span>
                    </div>
                    <div className="flex justify-between items-center text-neutral-500 dark:text-neutral-400 border-b border-black/5 dark:border-white/5 pb-1.5">
                      <span>Focus Area</span>
                      <span className="text-neutral-800 dark:text-neutral-200">{formData.projectType}</span>
                    </div>
                    <div className="flex justify-between items-center text-neutral-500 dark:text-neutral-400 border-b border-black/5 dark:border-white/5 pb-1.5">
                      <span>Budget</span>
                      <span className="text-neutral-800 dark:text-neutral-200">{formData.budget}</span>
                    </div>
                    <div className="flex justify-between items-center text-neutral-500 dark:text-neutral-400">
                      <span>Reply To</span>
                      <span className="text-neutral-800 dark:text-neutral-200 truncate max-w-[200px]">{formData.email}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleSendViaMailClient}
                      className="bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 text-white dark:text-neutral-950 px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Open in Mail Client</span>
                    </button>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setSubmitError(null);
                        setFormData({
                          fullName: '',
                          email: '',
                          projectType: 'Autonomous Agents & AI Systems',
                          budget: '$1k – $5k',
                          details: ''
                        });
                      }}
                      className="bg-white/60 dark:bg-neutral-800 hover:bg-white dark:hover:bg-neutral-700 text-neutral-900 dark:text-white px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all border border-black/5 dark:border-white/10 cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                  {/* Full Name Field */}
                  <div>
                    <label className="block text-[15px] font-medium text-[#111111] dark:text-neutral-200 mb-2" htmlFor="full-name">
                      Full name
                    </label>
                    <input
                      className={`w-full bg-[#c6c5c2] dark:bg-[#202330] placeholder-[#807e7b] dark:placeholder-neutral-500 text-[#111111] dark:text-white text-[15px] rounded-xl border border-transparent dark:border-white/5 focus:ring-2 focus:ring-neutral-700 dark:focus:ring-white/30 px-4 py-3.5 transition-all outline-none ${
                        errors.fullName ? 'ring-2 ring-red-500' : ''
                      }`}
                      id="full-name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="ex. Alex Morgan"
                      type="text"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1 font-medium">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-[15px] font-medium text-[#111111] dark:text-neutral-200 mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      className={`w-full bg-[#c6c5c2] dark:bg-[#202330] placeholder-[#807e7b] dark:placeholder-neutral-500 text-[#111111] dark:text-white text-[15px] rounded-xl border border-transparent dark:border-white/5 focus:ring-2 focus:ring-neutral-700 dark:focus:ring-white/30 px-4 py-3.5 transition-all outline-none ${
                        errors.email ? 'ring-2 ring-red-500' : ''
                      }`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      type="email"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1 font-medium">{errors.email}</p>
                    )}
                  </div>

                  {/* Radio Option Groups */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
                    {/* Project Type */}
                    <div>
                      <span className="block text-[15px] font-medium text-[#111111] dark:text-neutral-200 mb-3">
                        What's Your Project About?
                      </span>
                      <div className="space-y-2.5">
                        {[
                          'Autonomous Agents & AI Systems',
                          'Cybersecurity & Network Defense',
                          'Full-Stack Product Engineering',
                          'Rapid Prototyping & MVP'
                        ].map((type) => (
                          <label
                            key={type}
                            className="flex items-center gap-2.5 cursor-pointer text-[14px] text-[#222] dark:text-neutral-300 select-none"
                          >
                            <input
                              className="custom-radio"
                              name="project_type"
                              type="radio"
                              value={type}
                              checked={formData.projectType === type}
                              onChange={() => setFormData({ ...formData, projectType: type })}
                            />
                            <span>{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Project Budget */}
                    <div>
                      <span className="block text-[15px] font-medium text-[#111111] dark:text-neutral-200 mb-3">
                        Project Budget / Role
                      </span>
                      <div className="space-y-2.5">
                        {['< $1k', '$1k – $5k', '$5k – $10k', '> $10k / Full-Time'].map((budget) => (
                          <label
                            key={budget}
                            className="flex items-center gap-2.5 cursor-pointer text-[14px] text-[#222] dark:text-neutral-300 select-none"
                          >
                            <input
                              className="custom-radio"
                              name="budget"
                              type="radio"
                              value={budget}
                              checked={formData.budget === budget}
                              onChange={() => setFormData({ ...formData, budget })}
                            />
                            <span>{budget}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Details Textarea */}
                  <div className="pt-1">
                    <label className="block text-[15px] font-medium text-[#111111] dark:text-neutral-200 mb-2" htmlFor="project-details">
                      Share More Details
                    </label>
                    <textarea
                      className={`w-full bg-[#c6c5c2] dark:bg-[#202330] placeholder-[#807e7b] dark:placeholder-neutral-500 text-[#111111] dark:text-white text-[15px] rounded-xl border border-transparent dark:border-white/5 focus:ring-2 focus:ring-neutral-700 dark:focus:ring-white/30 px-4 py-3.5 transition-all outline-none resize-y ${
                        errors.details ? 'ring-2 ring-red-500' : ''
                      }`}
                      id="project-details"
                      name="details"
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="Tell me about what you are building, timeline, or key technical challenges..."
                      rows={4}
                    />
                    {errors.details && (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1 font-medium">{errors.details}</p>
                    )}
                  </div>

                  {/* Error Notification Banner */}
                  {submitError && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{submitError}</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleSendViaMailClient}
                        className="underline font-semibold hover:opacity-80 shrink-0 cursor-pointer"
                      >
                        Send via Email App
                      </button>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      className="bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 text-white dark:text-neutral-950 px-8 py-3 rounded-xl font-medium text-[15px] transition-all focus:ring-2 focus:ring-neutral-800 dark:focus:ring-white flex items-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                          <span>Sending Inquiry to Dhruva...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Inquiry</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Live Status Availability Indicator */}
                  <div className="flex items-center gap-2.5 pt-2 text-[14px] text-[#2a2a29] dark:text-neutral-300 font-normal">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
                    </span>
                    <span>Currently available for high-impact AI and systems projects</span>
                  </div>
                </form>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 pb-12 border-t border-[#cbcaa6]/50 dark:border-white/10 mt-12 transition-colors">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="text-xs text-[#6c6b69] dark:text-neutral-400 uppercase font-semibold mb-1">Email</p>
            <a
              className="text-base sm:text-lg font-bold tracking-tight text-neutral-950 dark:text-white hover:opacity-75 transition-opacity block break-words"
              href={`mailto:${PERSONAL_INFO.email}`}
            >
              {PERSONAL_INFO.email}
            </a>
          </div>

          <div>
            <p className="text-xs text-[#6c6b69] dark:text-neutral-400 uppercase font-semibold mb-1">Phone</p>
            <a
              className="text-base sm:text-lg font-bold tracking-tight text-neutral-950 dark:text-white hover:opacity-75 transition-opacity block whitespace-nowrap"
              href={`tel:${PERSONAL_INFO.phone}`}
            >
              {PERSONAL_INFO.formattedPhone}
            </a>
          </div>

          <div>
            <p className="text-xs text-[#6c6b69] dark:text-neutral-400 uppercase font-semibold mb-1">GitHub</p>
            <a
              className="text-base sm:text-lg font-bold tracking-tight text-neutral-950 dark:text-white hover:opacity-75 transition-opacity block"
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/DHRUVASAI
            </a>
          </div>

          <div>
            <p className="text-xs text-[#6c6b69] dark:text-neutral-400 uppercase font-semibold mb-1">LinkedIn</p>
            <a
              className="text-base sm:text-lg font-bold tracking-tight text-neutral-950 dark:text-white hover:opacity-75 transition-opacity block"
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Dhruva Sai
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-10 mt-10 border-t border-neutral-300/60 dark:border-white/10 text-xs text-neutral-500 dark:text-neutral-400">
          <div>© 2026 Dhruva Sai. Hyderabad, India.</div>
          <button
            onClick={() => onNavigate('home')}
            className="text-neutral-900 dark:text-neutral-200 font-semibold hover:underline"
          >
            ← Back to Home
          </button>
        </div>
      </footer>
    </div>
  );
};
