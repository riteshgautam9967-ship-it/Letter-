import React, { useState, useRef } from 'react';
import { AuthorProfile, LetterTone } from '../types/portfolio';
import { LETTER_TEMPLATES } from '../data/defaultData';
import { Copy, Check, Printer, Edit3, ShieldCheck, Stamp, RefreshCw, Sparkles } from 'lucide-react';
import { ThreeLetterScene } from './ThreeLetterScene';
import { ColorTheme } from '../types/theme';

interface LetterDocumentProps {
  profile: AuthorProfile;
  tone: LetterTone;
  theme: ColorTheme;
  onToneChange: (tone: LetterTone) => void;
  onOpenExport: () => void;
}

export const LetterDocument: React.FC<LetterDocumentProps> = ({
  profile,
  tone,
  theme,
  onToneChange,
  onOpenExport,
}) => {
  const [copied, setCopied] = useState(false);
  const [isManagerAcknowledged, setIsManagerAcknowledged] = useState(false);
  const [isCustomEditing, setIsCustomEditing] = useState(false);
  const [customLetterBody, setCustomLetterBody] = useState<string>('');
  const [show3D, setShow3D] = useState(true);

  const activeTemplate = LETTER_TEMPLATES[tone] || LETTER_TEMPLATES.gracious;
  const letterBody = isCustomEditing && customLetterBody 
    ? customLetterBody 
    : activeTemplate.body(profile);

  const handleCopy = () => {
    const fullText = `Date: ${profile.submissionDate}
To: ${profile.managerName}, ${profile.managerRole}
From: ${profile.fullName}, ${profile.role}
Subject: Formal Notice of Resignation — ${profile.fullName}

${letterBody}

Sincerely,
${profile.fullName}
${profile.role}
${profile.company}
${profile.contactEmail}`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleEdit = () => {
    if (!isCustomEditing) {
      setCustomLetterBody(activeTemplate.body(profile));
    }
    setIsCustomEditing(!isCustomEditing);
  };

  return (
    <section id="letter" className="py-16 border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 no-print">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
              Section 01 · Official Notice
            </div>
            <h2 className="text-3xl font-serif-editorial font-medium text-stone-900">
              The Formal Resignation Letter
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              Choose the narrative tone that best matches your parting voice, or customize the text directly.
            </p>
          </div>

          {/* Tone Selector & 3D Toggle */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShow3D(!show3D)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                show3D
                  ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{show3D ? 'Hide 3D View' : 'Experience in 3D'}</span>
            </button>

            <div className="flex items-center p-1 bg-stone-200/80 rounded-xl">
              {(['gracious', 'direct', 'heartfelt', 'micdrop'] as LetterTone[]).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    onToneChange(t);
                    setIsCustomEditing(false);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all capitalize whitespace-nowrap ${
                    tone === t
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {t === 'micdrop' ? 'Mic Drop' : t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3D Spatial Artifact Experience */}
        {show3D && (
          <div className="no-print animate-in fade-in slide-in-from-top-4 duration-300">
            <ThreeLetterScene profile={profile} tone={tone} theme={theme} />
          </div>
        )}

        {/* Paper Document Container */}
        <div className="relative bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden p-8 sm:p-14 print-container">
          {/* Subtle Document Header Bar */}
          <div className="flex items-center justify-between pb-8 mb-8 border-b border-stone-100 text-xs text-stone-500">
            <div>
              <span className="font-semibold text-stone-800 tracking-wide uppercase font-mono-code">
                {profile.company}
              </span>
              <span className="mx-2">/</span>
              <span>{profile.department}</span>
            </div>
            <div className="font-mono-code tabular-nums">
              Ref: RES-{profile.startDate.slice(-2)}{profile.lastWorkingDay.slice(-2)}-{profile.fullName.slice(0, 2).toUpperCase()}
            </div>
          </div>

          {/* Letter Metadata Block */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm mb-10 pb-8 border-b border-stone-100">
            <div>
              <div className="text-xs uppercase tracking-wider text-stone-400 font-medium mb-1">
                Addressed To
              </div>
              <div className="font-semibold text-stone-900">{profile.managerName}</div>
              <div className="text-stone-600">{profile.managerRole}</div>
              <div className="text-stone-500">{profile.company}</div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-stone-400 font-medium mb-1">
                Submission & Timeline
              </div>
              <div className="text-stone-900">
                <span className="text-stone-500">Submitted:</span> {profile.submissionDate}
              </div>
              <div className="text-stone-900 font-medium mt-0.5">
                <span className="text-stone-500">Final Working Day:</span> {profile.lastWorkingDay}
              </div>
              <div className="text-xs text-stone-500 mt-1">
                Notice Period: {profile.noticePeriodDays} days
              </div>
            </div>
          </div>

          {/* Subject Line */}
          <div className="text-base font-semibold text-stone-900 mb-8 pb-3 border-b border-stone-100">
            Subject: Official Resignation & Career Transition — {profile.fullName} ({profile.role})
          </div>

          {/* Letter Body Text */}
          <div className="text-stone-800 leading-relaxed text-base space-y-4 mb-12">
            {isCustomEditing ? (
              <textarea
                value={customLetterBody}
                onChange={(e) => setCustomLetterBody(e.target.value)}
                rows={10}
                className="w-full p-4 border border-stone-300 rounded-xl text-stone-900 font-sans focus:outline-none focus:ring-2 focus:ring-stone-400"
                placeholder="Write your custom letter here..."
              />
            ) : (
              letterBody.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))
            )}
          </div>

          {/* Signature & Sign-off Block */}
          <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row sm:items-end justify-between gap-8">
            <div>
              <div className="text-xs uppercase tracking-wider text-stone-400 font-medium mb-3">
                Digital Sign-off
              </div>
              
              {/* Handwritten signature rendering */}
              <div className="h-14 flex items-center">
                <span className="text-3xl font-serif-editorial italic text-stone-900 font-semibold tracking-wide">
                  {profile.signatureText || profile.fullName}
                </span>
              </div>

              <div className="mt-1 text-sm font-semibold text-stone-900">
                {profile.fullName}
              </div>
              <div className="text-xs text-stone-500">
                {profile.role} · {profile.contactEmail}
              </div>
              <div className="text-[11px] text-stone-400 font-mono-code mt-1 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Verified cryptographic timestamp: {profile.submissionDate} 09:00:00 PST</span>
              </div>
            </div>

            {/* Manager Acknowledgment Simulation Stamp */}
            <div className="flex flex-col items-start sm:items-end">
              {isManagerAcknowledged ? (
                <div className="border-2 border-dashed border-rose-600 text-rose-700 px-4 py-2 rounded-lg text-center transform -rotate-3 transition-transform animate-in fade-in">
                  <div className="text-[11px] font-mono-code font-bold uppercase tracking-widest">
                    Acknowledged by Leadership
                  </div>
                  <div className="text-xs font-semibold">
                    {profile.managerName} · {profile.managerRole}
                  </div>
                  <div className="text-[10px] text-rose-600 font-mono-code">
                    Status: Approved for Handoff
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsManagerAcknowledged(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors no-print"
                >
                  <Stamp className="w-3.5 h-3.5 text-stone-500" />
                  <span>Simulate Manager Sign-off</span>
                </button>
              )}
            </div>
          </div>

          {/* Letter Bottom Utility Bar */}
          <div className="mt-10 pt-6 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4 no-print">
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Email Body</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Clean Letter</span>
              </button>

              <button
                onClick={toggleEdit}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isCustomEditing ? 'Reset to Preset' : 'Edit Text Directly'}</span>
              </button>
            </div>

            <div className="text-xs text-stone-400">
              Tone: <strong className="text-stone-700 font-medium capitalize">{activeTemplate.title}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
