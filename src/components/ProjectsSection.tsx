import React, { useState } from 'react';
import { ProjectCaseStudy } from '../types/portfolio';
import { ExternalLink, GitBranch, ArrowUpRight, FileCode, CheckCircle2 } from 'lucide-react';

interface ProjectsSectionProps {
  projects: ProjectCaseStudy[];
  onSelectProject: (project: ProjectCaseStudy) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onSelectProject,
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'infra') return p.technologies.some(t => ['Kubernetes', 'Go', 'Distributed Cache', 'Kafka'].includes(t));
    if (filter === 'frontend') return p.technologies.some(t => ['React 19', 'Tailwind CSS', 'Figma API'].includes(t));
    return true;
  });

  const handleCopyProjectLink = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}#project-${id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <section id="projects" className="py-20 border-b border-stone-200 bg-stone-50/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
              Section 02 · Legacy & Built Work
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-editorial font-medium text-stone-900">
              What We Engineered Together
            </h2>
            <p className="text-base text-stone-600 mt-2 max-w-2xl leading-relaxed">
              Every system built during my tenure, complete with verified performance metrics, live interactive links, and repository access for the team.
            </p>
          </div>

          {/* Interactive Filter Tabs (Button segmented controls) */}
          <div className="flex items-center p-1 bg-stone-200/80 rounded-xl shrink-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Work ({projects.length})
            </button>
            <button
              onClick={() => setFilter('infra')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                filter === 'infra'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Core Systems & Infra
            </button>
            <button
              onClick={() => setFilter('frontend')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                filter === 'frontend'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              UI & Design Systems
            </button>
          </div>
        </div>

        {/* Dynamic Bento Grid of Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {filteredProjects.map((project, index) => {
            // Give first 2 projects prominent bento presence
            const isWide = index === 0 || index === 1;

            return (
              <div
                key={project.id}
                id={`project-${project.id}`}
                onClick={() => onSelectProject(project)}
                className={`group cursor-pointer bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-stone-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between ${
                  isWide ? 'lg:col-span-6' : 'lg:col-span-6'
                }`}
              >
                <div>
                  {/* Visual container if present */}
                  {project.imageUrl && (
                    <div className="relative h-56 sm:h-64 bg-stone-100 overflow-hidden border-b border-stone-100">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      {/* Metric sticker badge inside image */}
                      <div className="absolute top-4 right-4 bg-stone-950/85 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg font-mono-code tabular-nums border border-white/10">
                        {project.metric}
                      </div>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-7">
                    {/* Metadata line without pills (clean typography with dot separators) */}
                    <div className="flex items-center gap-2 text-xs text-stone-500 mb-2.5">
                      <span>{project.timeframe}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.role}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-code text-stone-700 font-medium">{project.metric}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-medium text-stone-900 group-hover:text-stone-700 transition-colors mb-2 font-serif-editorial">
                      {project.title}
                    </h3>

                    {/* Brief description */}
                    <p className="text-sm text-stone-600 leading-relaxed mb-5">
                      {project.summary}
                    </p>

                    {/* Impact Highlight */}
                    <div className="text-xs text-stone-500 bg-stone-50 p-3 rounded-lg border border-stone-200/60 mb-5">
                      <span className="font-semibold text-stone-800">Impact: </span>
                      {project.metricContext}
                    </div>

                    {/* Tech Stack (unboxed clean labels) */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500 font-mono-code">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="text-stone-600">
                          #{tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Live Demo & Repository Links */}
                <div 
                  className="px-7 py-4 bg-stone-50 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-4">
                    {/* Live Demo Link */}
                    <button
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1.5 font-medium text-stone-900 hover:text-stone-600 transition-colors"
                      title="Launch interactive case study & demo"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 text-stone-700" />
                      <span>Live Demo & Specs</span>
                    </button>

                    {/* Repository Link */}
                    <a
                      href={project.handoffDocLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-950 transition-colors"
                      title="View code repository / transition docs"
                    >
                      <GitBranch className="w-3.5 h-3.5 text-stone-500" />
                      <span>Repository / RFC</span>
                    </a>
                  </div>

                  <div className="text-stone-500">
                    Handoff to: <strong className="text-stone-800 font-medium">{project.handoffOwner}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 p-6 bg-stone-100/80 border border-stone-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <div>
            <strong className="text-stone-900 font-medium">Looking for codebase access?</strong> All repository admin permissions have been migrated to the successor leads listed on each project.
          </div>
          <a
            href="#handoff"
            className="px-4 py-2 font-medium text-stone-900 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            View Full Handoff Matrix
          </a>
        </div>
      </div>
    </section>
  );
};
