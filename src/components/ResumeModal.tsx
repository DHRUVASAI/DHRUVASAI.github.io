import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { X, Printer, Github, Linkedin, Mail, Phone, ExternalLink, Check, Copy, Award, BookOpen, Briefcase, Code, GraduationCap, CheckCircle2 } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'official' | 'expanded'>('official');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const resumePlainText = `VUDATHA DHRUVA SAI
+91 80741 42645 | dhruvasai1706@gmail.com | 500090 Hyderabad, India
GitHub: https://github.com/DHRUVASAI | LinkedIn: https://www.linkedin.com/in/vudatha-dhruva-sai-500217315/

SUMMARY
Computer Science undergraduate with hands-on experience building AI-powered systems and cloud-based applications. Developed JanSahayak, a multilingual voice-enabled welfare assistant recognized in the AWS AI for Bharat Hackathon. Passionate about AI, cloud computing, cybersecurity, and building technology that solves real-world problems.

EDUCATION
B.Tech – Computer Science and Engineering | 2024 – 2028 (Expected)
Koneru Lakshmaiah Education Foundation, Hyderabad, Telangana | CGPA: 9.33/10.0
Higher Secondary Certification (HSC) | 2024
Vinjee, Hyderabad, Telangana | Score: 90%

TECHNICAL SKILLS
Programming Languages: Python, Java, C
Frontend Development: React.js, Next.js, HTML5, CSS3
Cloud Platforms: AWS, Microsoft Azure, Google Cloud Platform, IBM Cloud
Databases and Tools: MySQL, Git, GitHub
Core Computer Science: Data Structures, Algorithms, OOP, Machine Learning, Compiler Design

PROJECTS
JanSahayak – AI Government Welfare Assistant | Python, AWS, Selenium
• Built a multilingual voice-enabled WhatsApp and Telegram assistant supporting 9 Indian languages for government welfare access.
• Integrated Amazon Bedrock, Textract, Transcribe, DynamoDB, SNS, and Selenium-based RPA for end-to-end application automation.
• Automated Aadhaar OCR, eligibility assessment, form filling, and SMS-based status notifications.
• Recognized in the AWS AI for Bharat Hackathon for improving digital accessibility in rural India.

GARUDA – Network Security Analysis Platform | Python, Flask, Network Security
• Developed a cybersecurity platform for network monitoring, device discovery, and security assessment using Ping Sweep, ARP analysis, and OS-native networking tools.
• Built network topology visualization, device identification, encryption analysis, and vulnerability assessment modules.
• Added real-time dashboards, threat scoring, and cross-platform deployment support for network awareness.

VibeVerse – Entertainment Discovery Platform | React.js, Node.js, TMDb API
• Developed a mood-based entertainment recommendation platform for movies and music, integrating TMDb, YouTube, iTunes, and OTT provider APIs.
• Implemented trailer/music playback, OTT availability tracking, mood journaling, and personalized recommendations.

EXPERIENCE
IBM SkillsBuild – AI & Cloud Internship | Virtual, Jun 2026 – Jul 2026
• Completed hands-on training in AI and Cloud Computing; built an AI-based project applying machine learning and cloud concepts through mentor-guided sessions.

ServiceNow University – Virtual Internship Program | Jun 2026 – Jul 2026
• Completed hands-on learning on the ServiceNow platform (ITSM, Service Catalog, Workflow Studio, Platform Analytics) and enterprise automation use cases.

ACHIEVEMENTS
• Shortlisted for AI for Bharat Hackathon by AWS and awarded an official AWS badge for building JanSahayak.
• Earned Microsoft Certified: Azure AI Fundamentals (AI-900) – globally recognized certification.
• Received a college award for achieving a 2-Star rating on CodeChef through consistent competitive programming.
• Achieved B2 level on the Cambridge English Linguaskill proficiency test.

CERTIFICATIONS
• Google Cloud Gen AI Academy 2.0 (Google Cloud)
• Data Analytics Essentials (Cisco Networking Academy)
• Aviatrix Certified Engineer – Multicloud Network Associate (Aviatrix)`;

    navigator.clipboard.writeText(resumePlainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/75 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-neutral-100 dark:bg-[#12141c] border border-neutral-300 dark:border-white/10 rounded-[28px] sm:rounded-[32px] w-full max-w-4xl max-h-[94vh] flex flex-col shadow-2xl relative overflow-hidden transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-white dark:bg-[#181b26] border-b border-neutral-200 dark:border-white/10 transition-colors">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-semibold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
              {PERSONAL_INFO.fullName} — RESUME
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 rounded-xl border border-neutral-300 dark:border-white/15 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-medium flex items-center gap-1.5 transition-colors text-neutral-700 dark:text-neutral-300"
              title="Copy Resume Plaintext"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-300">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 hover:bg-black dark:hover:bg-neutral-100 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center transition-colors text-neutral-600 dark:text-neutral-300"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-10 bg-neutral-100 dark:bg-[#0b0c11] transition-colors">
          {/* Paper Sheet container */}
          <div className="max-w-[780px] mx-auto bg-white border border-neutral-300/80 shadow-md rounded-2xl p-6 sm:p-10 text-neutral-900 font-sans print:shadow-none print:border-none print:p-0">
            
            {/* Header: Exact PDF match with Dhruva Sai's Official Portrait */}
            <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-6 pb-6 border-b border-neutral-300">
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 uppercase font-serif">
                  {PERSONAL_INFO.fullName}
                </h1>
                
                <p className="text-xs sm:text-sm text-neutral-600 font-medium mt-1.5">
                  {PERSONAL_INFO.formattedPhone} &nbsp;|&nbsp;{' '}
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-neutral-900 hover:underline">
                    {PERSONAL_INFO.email}
                  </a>{' '}
                  &nbsp;|&nbsp; {PERSONAL_INFO.location}
                </p>

                <div className="flex items-center justify-center sm:justify-start gap-4 mt-2 text-xs font-semibold text-neutral-800">
                  <a
                    href={PERSONAL_INFO.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </a>
                  <span className="text-neutral-300">|</span>
                  <a
                    href={PERSONAL_INFO.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </a>
                </div>
              </div>

              {/* DHRUVA SAI'S ATTACHED PHOTO */}
              <div className="relative group shrink-0">
                <div className="w-24 h-28 sm:w-28 sm:h-34 rounded-xl overflow-hidden border-2 border-neutral-900 shadow-md bg-neutral-950">
                  <img
                    src={PERSONAL_INFO.portraitUrl || '/dhruva-portrait.png'}
                    alt="Vudatha Dhruva Sai"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 bg-neutral-900 text-white text-[9px] font-mono px-1.5 py-0.5 rounded shadow">
                  Dhruva
                </div>
              </div>
            </div>

            {/* SECTION: SUMMARY */}
            <div className="mt-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-1 font-serif">
                Summary
              </h2>
              <p className="text-xs sm:text-[13px] text-neutral-800 leading-relaxed mt-2 text-justify">
                {PERSONAL_INFO.resumeSummary}
              </p>
            </div>

            {/* SECTION: EDUCATION */}
            <div className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-1 font-serif">
                Education
              </h2>
              <div className="mt-2 space-y-2.5 text-xs sm:text-[13px]">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-0.5">
                  <div>
                    <div className="font-bold text-neutral-950">
                      B.Tech – Computer Science and Engineering
                    </div>
                    <div className="text-neutral-700">
                      Koneru Lakshmaiah Education Foundation, Hyderabad, Telangana
                    </div>
                  </div>
                  <div className="sm:text-right font-medium text-neutral-800">
                    <div>2024 – 2028 (Expected)</div>
                    <div className="font-bold text-neutral-950">CGPA: 9.33/10.0</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-0.5 pt-1.5 border-t border-neutral-100">
                  <div>
                    <div className="font-bold text-neutral-950">
                      Higher Secondary Certification (HSC)
                    </div>
                    <div className="text-neutral-700">
                      Vinjee, Hyderabad, Telangana
                    </div>
                  </div>
                  <div className="sm:text-right font-medium text-neutral-800">
                    <div>2024</div>
                    <div className="font-bold text-neutral-950">Score: 90%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION: TECHNICAL SKILLS */}
            <div className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-1 font-serif">
                Technical Skills
              </h2>
              <div className="mt-2 space-y-1 text-xs sm:text-[13px] leading-relaxed">
                <div>
                  <span className="font-bold text-neutral-950">Programming Languages: </span>
                  <span className="text-neutral-800">{PERSONAL_INFO.technicalSkills.programming}</span>
                </div>
                <div>
                  <span className="font-bold text-neutral-950">Frontend Development: </span>
                  <span className="text-neutral-800">{PERSONAL_INFO.technicalSkills.frontend}</span>
                </div>
                <div>
                  <span className="font-bold text-neutral-950">Cloud Platforms: </span>
                  <span className="text-neutral-800">{PERSONAL_INFO.technicalSkills.cloud}</span>
                </div>
                <div>
                  <span className="font-bold text-neutral-950">Databases and Tools: </span>
                  <span className="text-neutral-800">{PERSONAL_INFO.technicalSkills.databases}</span>
                </div>
                <div>
                  <span className="font-bold text-neutral-950">Core Computer Science: </span>
                  <span className="text-neutral-800">{PERSONAL_INFO.technicalSkills.coreCS}</span>
                </div>
              </div>
            </div>

            {/* SECTION: PROJECTS */}
            <div className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-1 font-serif">
                Projects
              </h2>

              <div className="mt-2.5 space-y-4 text-xs sm:text-[13px]">
                {/* Project 1: JanSahayak */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="font-bold text-neutral-950 flex items-center gap-1.5 flex-wrap">
                      <span>JanSahayak – AI Government Welfare Assistant</span>
                      <span className="text-neutral-400">|</span>
                      <a
                        href="https://github.com/DHRUVASAI/JanSahayak-"
                        target="_blank"
                        rel="noreferrer"
                        className="text-neutral-600 hover:text-black underline font-normal text-xs"
                      >
                        GitHub
                      </a>
                    </div>
                    <div className="italic text-neutral-700 text-xs sm:text-right font-serif">
                      Python, AWS, Selenium
                    </div>
                  </div>
                  <ul className="mt-1 space-y-0.5 list-disc list-outside ml-4 text-neutral-800 leading-relaxed">
                    <li>Built a multilingual voice-enabled WhatsApp and Telegram assistant supporting 9 Indian languages for government welfare access.</li>
                    <li>Integrated Amazon Bedrock, Textract, Transcribe, DynamoDB, SNS, and Selenium-based RPA for end-to-end application automation.</li>
                    <li>Automated Aadhaar OCR, eligibility assessment, form filling, and SMS-based status notifications.</li>
                    <li>Recognized in the AWS AI for Bharat Hackathon for improving digital accessibility in rural India.</li>
                  </ul>
                </div>

                {/* Project 2: GARUDA */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="font-bold text-neutral-950 flex items-center gap-1.5 flex-wrap">
                      <span>GARUDA – Network Security Analysis Platform</span>
                      <span className="text-neutral-400">|</span>
                      <a
                        href="https://github.com/DHRUVASAI/GARUDA-"
                        target="_blank"
                        rel="noreferrer"
                        className="text-neutral-600 hover:text-black underline font-normal text-xs"
                      >
                        GitHub
                      </a>
                    </div>
                    <div className="italic text-neutral-700 text-xs sm:text-right font-serif">
                      Python, Flask, Network Security
                    </div>
                  </div>
                  <ul className="mt-1 space-y-0.5 list-disc list-outside ml-4 text-neutral-800 leading-relaxed">
                    <li>Developed a cybersecurity platform for network monitoring, device discovery, and security assessment using Ping Sweep, ARP analysis, and OS-native networking tools.</li>
                    <li>Built network topology visualization, device identification, encryption analysis, and vulnerability assessment modules.</li>
                    <li>Added real-time dashboards, threat scoring, and cross-platform deployment support for network awareness.</li>
                  </ul>
                </div>

                {/* Project 3: VibeVerse */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="font-bold text-neutral-950 flex items-center gap-1.5 flex-wrap">
                      <span>VibeVerse – Entertainment Discovery Platform</span>
                      <span className="text-neutral-400">|</span>
                      <a
                        href="https://github.com/DHRUVASAI/VibeVerse-master"
                        target="_blank"
                        rel="noreferrer"
                        className="text-neutral-600 hover:text-black underline font-normal text-xs"
                      >
                        GitHub
                      </a>
                    </div>
                    <div className="italic text-neutral-700 text-xs sm:text-right font-serif">
                      React.js, Node.js, TMDb API
                    </div>
                  </div>
                  <ul className="mt-1 space-y-0.5 list-disc list-outside ml-4 text-neutral-800 leading-relaxed">
                    <li>Developed a mood-based entertainment recommendation platform for movies and music, integrating TMDb, YouTube, iTunes, and OTT provider APIs.</li>
                    <li>Implemented trailer/music playback, OTT availability tracking, mood journaling, and personalized recommendations.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* SECTION: EXPERIENCE */}
            <div className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-1 font-serif">
                Experience
              </h2>

              <div className="mt-2.5 space-y-3 text-xs sm:text-[13px]">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                    <div className="font-bold text-neutral-950">
                      IBM SkillsBuild – AI & Cloud Internship
                    </div>
                    <div className="italic text-neutral-700 sm:text-right font-serif">
                      Virtual, Jun 2026 – Jul 2026
                    </div>
                  </div>
                  <ul className="mt-1 space-y-0.5 list-disc list-outside ml-4 text-neutral-800 leading-relaxed">
                    <li>Completed hands-on training in AI and Cloud Computing; built an AI-based project applying machine learning and cloud concepts through mentor-guided sessions.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                    <div className="font-bold text-neutral-950">
                      ServiceNow University – Virtual Internship Program
                    </div>
                    <div className="italic text-neutral-700 sm:text-right font-serif">
                      Jun 2026 – Jul 2026
                    </div>
                  </div>
                  <ul className="mt-1 space-y-0.5 list-disc list-outside ml-4 text-neutral-800 leading-relaxed">
                    <li>Completed hands-on learning on the ServiceNow platform (ITSM, Service Catalog, Workflow Studio, Platform Analytics) and enterprise automation use cases.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* SECTION: ACHIEVEMENTS */}
            <div className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-1 font-serif">
                Achievements
              </h2>
              <ul className="mt-2 space-y-1 list-disc list-outside ml-4 text-xs sm:text-[13px] text-neutral-800 leading-relaxed">
                <li>Shortlisted for AI for Bharat Hackathon by AWS and awarded an official AWS badge for building JanSahayak.</li>
                <li>Earned Microsoft Certified: Azure AI Fundamentals (AI-900) – globally recognized certification.</li>
                <li>Received a college award for achieving a 2-Star rating on CodeChef through consistent competitive programming.</li>
                <li>Achieved B2 level on the Cambridge English Linguaskill proficiency test.</li>
              </ul>
            </div>

            {/* SECTION: CERTIFICATIONS */}
            <div className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-1 font-serif">
                Certifications
              </h2>
              <p className="mt-2 text-xs sm:text-[13px] text-neutral-800 leading-relaxed">
                Google Cloud Gen AI Academy 2.0 (Google Cloud) &nbsp;|&nbsp; Data Analytics Essentials (Cisco Networking Academy) &nbsp;|&nbsp; Aviatrix Certified Engineer – Multicloud Network Associate (Aviatrix)
              </p>
            </div>

          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-3 bg-white dark:bg-[#181b26] border-t border-neutral-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-neutral-600 dark:text-neutral-400 transition-colors">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Exact replica of Vudatha Dhruva Sai's verified resume PDF with portrait photo</span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 hover:bg-black dark:hover:bg-neutral-100 font-semibold transition-colors shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
