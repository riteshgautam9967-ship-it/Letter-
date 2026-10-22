import React, { useState, useEffect, useRef } from 'react';
import { AuthorProfile, LetterTone } from '../types/portfolio';
import { LETTER_TEMPLATES } from '../data/defaultData';
import { X, Printer, Copy, Check, FileDown, ShieldCheck, CheckCircle2, Loader2, Sparkles, RefreshCw } from 'lucide-react';

interface ExportModalProps {
  profile: AuthorProfile;
  tone: LetterTone;
  isOpen: boolean;
  onClose: () => void;
}

const GENERATION_STAGES = [
  { label: 'Parsing letterhead & recipient metadata', min: 0, max: 25 },
  { label: 'Embedding digital signature & cryptographic timestamp', min: 25, max: 60 },
  { label: 'Compiling high-resolution executive print layout', min: 60, max: 88 },
  { label: 'Finalizing PDF document & launching print system', min: 88, max: 100 },
];

export const ExportModal: React.FC<ExportModalProps> = ({
  profile,
  tone,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [copiedType, setCopiedType] = useState<'text' | 'markdown' | null>(null);
  const [pdfStatus, setPdfStatus] = useState<'idle' | 'generating' | 'completed'>('idle');
  const [progress, setProgress] = useState(0);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeTemplate = LETTER_TEMPLATES[tone] || LETTER_TEMPLATES.gracious;
  const letterBody = activeTemplate.body(profile);

  // Clean plain text representation
  const fullLetterPlain = `FORMAL NOTICE OF RESIGNATION
==================================================

Date: ${profile.submissionDate}

To:
${profile.managerName}
${profile.managerRole}
${profile.company}

From:
${profile.fullName}
${profile.role}
${profile.department}

SUBJECT: NOTICE OF RESIGNATION — ${profile.fullName.toUpperCase()}

${letterBody}

Sincerely,

${profile.fullName}
${profile.role}
${profile.company}
${profile.contactEmail}
Verified Cryptographic Signature: ${profile.submissionDate} 09:00:00 PST
`;

  // Markdown representation
  const fullLetterMarkdown = `# Formal Notice of Resignation

**Date:** ${profile.submissionDate}  
**To:** ${profile.managerName}, ${profile.managerRole} (${profile.company})  
**From:** ${profile.fullName}, ${profile.role} (${profile.department})  
**Last Working Day:** ${profile.lastWorkingDay}  

---

### Subject: Official Resignation Notice

${letterBody}

Sincerely,  
**${profile.fullName}**  
*${profile.role}*  
*${profile.company}*  
[${profile.contactEmail}](mailto:${profile.contactEmail})
`;

  const copyPlain = () => {
    navigator.clipboard.writeText(fullLetterPlain);
    setCopiedType('text');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(fullLetterMarkdown);
    setCopiedType('markdown');
    setTimeout(() => setCopiedType(null), 2000);
  };

  // Start animated generation progress
  const startPdfGeneration = () => {
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    
    setPdfStatus('generating');
    setProgress(5);
    setActiveStageIndex(0);

    let currentProg = 5;
    progressTimerRef.current = setInterval(() => {
      currentProg += Math.floor(Math.random() * 8) + 5;
      
      if (currentProg >= 100) {
        currentProg = 100;
        if (progressTimerRef.current) clearInterval(progressTimerRef.current);
        setProgress(100);
        setActiveStageIndex(3);
        setPdfStatus('completed');
        
        // Trigger clean print dialog after settling
        setTimeout(() => {
          window.print();
        }, 350);
      } else {
        setProgress(currentProg);
        if (currentProg > 88) setActiveStageIndex(3);
        else if (currentProg > 60) setActiveStageIndex(2);
        else if (currentProg > 25) setActiveStageIndex(1);
        else setActiveStageIndex(0);
      }
    }, 110);
  };

  const handleCancelGeneration = () => {
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    setPdfStatus('idle');
    setProgress(0);
  };

  useEffect(() => {
    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/60 backdrop-blur-sm animate-in fade-in">
      <div 
        className="relative bg-white border border-stone-200 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (hidden in print) */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-stone-100 flex items-center justify-between no-print">
          <div>
            <h3 className="text-xl font-serif-editorial font-medium text-stone-900">
              Export Resignation Letter
            </h3>
            <p className="text-xs text-stone-500">
              High-resolution document generation for HR submission and legal archival.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Progress Indicator Section (Shown when generating or completed) */}
        <div className="no-print">
          {pdfStatus === 'generating' && (
            <div className="p-6 bg-stone-900 text-white border-b border-stone-800 animate-in fade-in">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-stone-300 animate-spin" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-300 font-mono-code">
                    Generating Official PDF Letter...
                  </span>
                </div>
                <span className="text-sm font-bold font-mono-code tabular-nums text-white">
                  {progress}%
                </span>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full h-2.5 bg-stone-800 rounded-full overflow-hidden mb-4 border border-stone-700">
                <div 
                  className="h-full bg-white transition-all duration-150 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Active Stage Label */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-300 font-mono-code">
                  Stage {activeStageIndex + 1}/4: {GENERATION_STAGES[activeStageIndex].label}
                </span>

                <button
                  onClick={handleCancelGeneration}
                  className="text-stone-400 hover:text-white underline underline-offset-2 transition-colors text-[11px]"
                >
                  Cancel
                </button>
              </div>

              {/* Milestone Checkmarks */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-stone-800 text-[11px] text-stone-400">
                {GENERATION_STAGES.map((stg, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 truncate">
                    {idx < activeStageIndex ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    ) : idx === activeStageIndex ? (
                      <div className="w-2 h-2 rounded-full bg-white animate-ping shrink-0" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-stone-700 shrink-0" />
                    )}
                    <span className={idx <= activeStageIndex ? 'text-stone-200' : 'text-stone-600'}>
                      Step {idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {pdfStatus === 'completed' && (
            <div className="p-4 bg-emerald-50 text-emerald-950 border-b border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-emerald-900">
                    PDF Letter Generated & Dispatched
                  </div>
                  <div className="text-[11px] text-emerald-700">
                    Browser print dialog launched. You can save as PDF or print directly.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={startPdfGeneration}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-900 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors whitespace-nowrap"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Print Again</span>
                </button>
              </div>
            </div>
          )}

          {/* Action Toolbar */}
          <div className="p-5 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={startPdfGeneration}
                disabled={pdfStatus === 'generating'}
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 disabled:opacity-50 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>
                  {pdfStatus === 'generating' 
                    ? 'Generating PDF...' 
                    : pdfStatus === 'completed' 
                      ? 'Re-generate & Print PDF' 
                      : 'Generate Official PDF Letter'}
                </span>
              </button>

              <button
                onClick={copyPlain}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors"
              >
                {copiedType === 'text' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied Plain Text!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Email Text</span>
                  </>
                )}
              </button>

              <button
                onClick={copyMarkdown}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors"
              >
                {copiedType === 'markdown' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied Markdown!</span>
                  </>
                ) : (
                  <>
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Copy Markdown</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-xs text-stone-400 font-mono-code">
              Tone: <strong className="text-stone-700 capitalize">{tone}</strong>
            </div>
          </div>
        </div>

        {/* Formal Resignation Letter Document Container (Pure letter for print & review) */}
        <div className="p-8 sm:p-12 bg-white font-serif-editorial text-stone-900 print-resignation-letter-only">
          <div className="max-w-xl mx-auto border border-stone-200 p-8 sm:p-12 rounded-xl shadow-xs text-sm leading-relaxed print:border-none print:shadow-none print:p-0">
            {/* Document Header */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-100 text-xs text-stone-500 font-sans">
              <div>
                <strong className="text-stone-900 font-semibold tracking-wide uppercase font-mono-code">
                  {profile.company}
                </strong>
                <span className="mx-2">·</span>
                <span>{profile.department}</span>
              </div>
              <div className="font-mono-code text-[11px] text-stone-400">
                Official HR Filing
              </div>
            </div>

            {/* Date and Recipient */}
            <div className="mb-6 text-xs text-stone-700 font-sans space-y-1">
              <div className="text-stone-500 font-mono-code mb-3">
                Date: {profile.submissionDate}
              </div>
              <div className="font-bold text-stone-900 text-sm">{profile.managerName}</div>
              <div>{profile.managerRole}</div>
              <div className="text-stone-500">{profile.company}</div>
            </div>

            {/* Subject Line */}
            <div className="font-semibold text-stone-900 mb-6 font-sans text-sm pb-3 border-b border-stone-100">
              Notice of Resignation: {profile.fullName} ({profile.role})
            </div>

            {/* Letter Body Paragraphs */}
            <div className="space-y-4 mb-10 text-stone-800 text-base leading-relaxed">
              {letterBody.split('\n\n').map((para, i) => (
                <p key={i} className="whitespace-pre-line">{para}</p>
              ))}
            </div>

            {/* Formal Sign-off and Digital Signature */}
            <div className="pt-6 border-t border-stone-100">
              <div className="text-xs uppercase tracking-wider text-stone-400 font-sans mb-3">
                Signed by Employee
              </div>

              <div className="text-3xl italic font-semibold text-stone-900 mb-2">
                {profile.signatureText || profile.fullName}
              </div>

              <div className="font-sans text-xs text-stone-900 font-semibold">
                {profile.fullName}
              </div>
              <div className="font-sans text-[11px] text-stone-500">
                {profile.role} · {profile.company}
              </div>
              <div className="font-sans text-[11px] text-stone-500">
                Contact: {profile.contactEmail} · Effective Last Day: {profile.lastWorkingDay}
              </div>

              {/* Cryptographic Timestamp Seal */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-[10px] text-stone-400 font-mono-code font-sans">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Digitally Authenticated: {profile.submissionDate} 09:00:00 PST</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
