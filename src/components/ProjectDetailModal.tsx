import React, { useState } from 'react';
import { ProjectCaseStudy } from '../types/portfolio';
import { X, ExternalLink, GitBranch, CheckCircle2, Play, Terminal, ArrowRight } from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const [simulatingLiveDemo, setSimulatingLiveDemo] = useState(false);
  const [demoOutput, setDemoOutput] = useState<string[]>([]);

  const runLiveSimulation = () => {
    setSimulatingLiveDemo(true);
    setDemoOutput(['Initializing live cluster connection...']);

    setTimeout(() => {
      setDemoOutput(prev => [...prev, '✓ Route mesh healthy across 12 edge nodes.']);
    }, 400);

    setTimeout(() => {
      setDemoOutput(prev => [...prev, `⚡ P99 Latency verified at ${project.metric} under real traffic.`]);
    }, 900);

    setTimeout(() => {
      setDemoOutput(prev => [...prev, '✓ All circuit breakers and tracing traces responding with 200 OK.']);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/60 backdrop-blur-sm animate-in fade-in">
      <div 
        className="relative bg-white border border-stone-200 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-mono-code">
            <span>PROJECT CASE STUDY</span>
            <span>·</span>
            <span>{project.timeframe}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Image / Visual */}
        {project.imageUrl && (
          <div className="relative h-64 sm:h-72 bg-stone-100 overflow-hidden border-b border-stone-100">
            <img
              src={project.imageUrl}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute bottom-4 left-6 bg-stone-950/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg font-mono-code tabular-nums border border-white/10">
              Verified Metric: {project.metric}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-serif-editorial font-medium text-stone-900 mb-2">
            {project.title}
          </h2>
          <p className="text-sm font-medium text-stone-600 mb-6">
            {project.subtitle}
          </p>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-stone-50 border border-stone-200/70 rounded-xl mb-6 text-xs">
            <div>
              <div className="text-stone-400 font-mono-code mb-0.5">My Role</div>
              <div className="font-semibold text-stone-900">{project.role}</div>
            </div>
            <div>
              <div className="text-stone-400 font-mono-code mb-0.5">Timeframe</div>
              <div className="font-semibold text-stone-900">{project.timeframe}</div>
            </div>
            <div>
              <div className="text-stone-400 font-mono-code mb-0.5">Key Metric</div>
              <div className="font-semibold text-stone-900 font-mono-code">{project.metric}</div>
            </div>
            <div>
              <div className="text-stone-400 font-mono-code mb-0.5">Handoff Lead</div>
              <div className="font-semibold text-stone-900">{project.handoffOwner}</div>
            </div>
          </div>

          {/* Full Detailed Description */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
              Architecture & Problem Overview
            </h4>
            <p className="text-stone-700 text-sm leading-relaxed">
              {project.detailedDescription}
            </p>
          </div>

          {/* Impact Bullets */}
          <div className="mb-8">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
              Measurable Deliverables & Results
            </h4>
            <ul className="space-y-2.5">
              {project.impactBullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="mb-8">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
              Technologies & Frameworks
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-xs font-mono-code text-stone-700 bg-stone-100 rounded-md border border-stone-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Live Demo Simulation Section */}
          <div className="p-5 bg-stone-950 text-stone-100 rounded-xl mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-mono-code text-stone-300">
                <Terminal className="w-4 h-4 text-stone-400" />
                <span>LIVE SERVICE DEMO SIMULATOR</span>
              </div>
              {!simulatingLiveDemo && (
                <button
                  onClick={runLiveSimulation}
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-white text-stone-950 rounded-lg hover:bg-stone-200 transition-colors"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Execute Diagnostic Test</span>
                </button>
              )}
            </div>

            {simulatingLiveDemo ? (
              <div className="space-y-1 font-mono-code text-xs text-stone-300">
                {demoOutput.map((out, i) => (
                  <div key={i} className="leading-relaxed">
                    {out}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-400 leading-relaxed">
                Click "Execute Diagnostic Test" to simulate a live telemetry ping against the production architecture verification harness.
              </p>
            )}
          </div>

          {/* Footer Action Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-100">
            <div className="flex items-center gap-3">
              <a
                href={project.handoffDocLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>Open Repository / RFC Spec</span>
              </a>

              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 rounded-lg transition-colors"
              >
                Close View
              </button>
            </div>

            <div className="text-xs text-stone-400 font-mono-code">
              Successor Lead: {project.handoffOwner}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
