import React from 'react';
import { AuthorProfile, MetricStat } from '../types/portfolio';
import { FileText, ArrowDownRight, Calendar, Building2, MapPin, Sparkles } from 'lucide-react';

interface HeroProps {
  profile: AuthorProfile;
  stats: MetricStat[];
  onOpenCustomizer: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, stats, onOpenCustomizer }) => {
  return (
    <section className="relative pt-12 pb-16 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Split Screen 2-Column Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch mb-16">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2">
            <div>
              {/* Unboxed editorial kicker with subtle dot separators */}
              <div className="flex items-center gap-2.5 text-xs font-semibold tracking-wider uppercase text-stone-500 mb-4">
                <span>Formal Resignation</span>
                <span aria-hidden="true">·</span>
                <span>Impact Portfolio</span>
                <span aria-hidden="true">·</span>
                <span>{profile.startDate.slice(-4)} — {profile.lastWorkingDay.slice(-4)}</span>
              </div>

              {/* Headline with text-wrap balance */}
              <h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-stone-900 font-serif-editorial leading-[1.12] mb-6"
                style={{ textWrap: 'balance' }}
              >
                Stepping down with gratitude, leaving a legacy of craft.
              </h1>

              {/* Lead copy */}
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mb-8">
                After 3 transformative years as <span className="text-stone-900 font-medium">{profile.role}</span> at <span className="text-stone-900 font-medium">{profile.company}</span>, I have formally submitted my notice to {profile.managerName}. This portfolio documents the systems we built, the operational handoff plan, and sincere gratitude to my team.
              </p>

              {/* Unboxed Metadata Strip */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-stone-500 mb-8 border-y border-stone-200 py-3">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-stone-400" />
                  <span className="text-stone-800 font-medium">{profile.company}</span>
                </div>
                <span aria-hidden="true" className="text-stone-300">/</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  <span>Effective Last Day: <strong className="text-stone-900 font-semibold">{profile.lastWorkingDay}</strong></span>
                </div>
                <span aria-hidden="true" className="text-stone-300">/</span>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#letter"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
              >
                <FileText className="w-4 h-4" />
                <span>Read Formal Letter</span>
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <span>Explore Projects & Repos</span>
                <ArrowDownRight className="w-4 h-4 text-stone-500" />
              </a>

              <button
                onClick={onOpenCustomizer}
                className="text-xs font-medium text-stone-500 hover:text-stone-900 underline underline-offset-4 ml-auto transition-colors"
              >
                Edit details & dates
              </button>
            </div>
          </div>

          {/* Right Column: High-Resolution Author Showcase Container */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-sm flex-1 min-h-[380px] lg:min-h-full flex flex-col justify-end">
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-top"
                onError={(e) => {
                  // Fallback container ensures zero broken image frames
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              {/* Resilient fallback if image fails to load */}
              <div 
                style={{ display: 'none' }}
                className="absolute inset-0 bg-stone-900 text-stone-100 flex-col items-center justify-center p-8 text-center"
              >
                <div className="w-20 h-20 rounded-full border border-stone-700 flex items-center justify-center text-3xl font-serif-editorial mb-4">
                  {profile.fullName.charAt(0)}
                </div>
                <h3 className="text-xl font-medium">{profile.fullName}</h3>
                <p className="text-xs text-stone-400 mt-1">{profile.role}</p>
              </div>

              {/* Scrim overlay with clean caption info */}
              <div className="relative z-10 p-6 bg-gradient-to-t from-stone-950/85 via-stone-950/40 to-transparent text-white pt-16">
                <div className="text-xs tracking-wider uppercase text-stone-300 font-mono-code mb-1">
                  Author & Signee
                </div>
                <h2 className="text-2xl font-serif-editorial font-medium tracking-tight text-white">
                  {profile.fullName}
                </h2>
                <div className="flex items-center gap-2 text-xs text-stone-300 mt-1">
                  <span>{profile.role}</span>
                  <span aria-hidden="true">·</span>
                  <span>{profile.department}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column KPI Metric Strip below hero split */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-stone-200">
          {stats.map((stat) => (
            <div 
              key={stat.id}
              className="p-5 bg-white border border-stone-200 rounded-xl"
            >
              <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900 font-mono-code tabular-nums mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-stone-900">
                {stat.label}
              </div>
              <div className="text-xs text-stone-500 mt-0.5 line-clamp-1">
                {stat.context}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
