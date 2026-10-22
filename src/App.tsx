/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthorProfile, LetterTone, ProjectCaseStudy, HandoffTask, GuestbookNote } from './types/portfolio';
import { ColorTheme, COLOR_THEMES } from './types/theme';
import { 
  DEFAULT_PROFILES, 
  DEFAULT_STATS, 
  DEFAULT_CASE_STUDIES, 
  DEFAULT_HANDOFF_TASKS, 
  DEFAULT_RUNBOOK_FAQS, 
  DEFAULT_TRIBUTES, 
  INITIAL_GUESTBOOK_NOTES 
} from './data/defaultData';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LetterDocument } from './components/LetterDocument';
import { ProjectsSection } from './components/ProjectsSection';
import { HandoffSection } from './components/HandoffSection';
import { TributesSection } from './components/TributesSection';
import { NextChapterSection } from './components/NextChapterSection';
import { Footer } from './components/Footer';

import { ProjectDetailModal } from './components/ProjectDetailModal';
import { CoffeeModal } from './components/CoffeeModal';
import { CustomizerModal } from './components/CustomizerModal';
import { ExportModal } from './components/ExportModal';

export default function App() {
  // Theme State
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>(() => {
    const saved = localStorage.getItem('farewell_portfolio_theme');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.accent) return parsed;
      } catch (e) {
        return COLOR_THEMES.stone;
      }
    }
    return COLOR_THEMES.stone;
  });

  // Profile State
  const [activePersona, setActivePersona] = useState<string>('aria');
  const [profile, setProfile] = useState<AuthorProfile>(() => {
    const saved = localStorage.getItem('farewell_portfolio_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_PROFILES.aria;
      }
    }
    return DEFAULT_PROFILES.aria;
  });

  // Resignation Tone
  const [tone, setTone] = useState<LetterTone>('gracious');

  // Projects State
  const [projects] = useState<ProjectCaseStudy[]>(DEFAULT_CASE_STUDIES);
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);

  // Handoff Tasks State
  const [tasks, setTasks] = useState<HandoffTask[]>(() => {
    const saved = localStorage.getItem('farewell_portfolio_tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_HANDOFF_TASKS;
      }
    }
    return DEFAULT_HANDOFF_TASKS;
  });

  // Guestbook Notes State
  const [guestbookNotes, setGuestbookNotes] = useState<GuestbookNote[]>(() => {
    const saved = localStorage.getItem('farewell_portfolio_guestbook');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_GUESTBOOK_NOTES;
      }
    }
    return INITIAL_GUESTBOOK_NOTES;
  });

  // Modals
  const [isCoffeeModalOpen, setIsCoffeeModalOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Theme Handlers
  const handleSelectTheme = (theme: ColorTheme) => {
    setCurrentTheme(theme);
    localStorage.setItem('farewell_portfolio_theme', JSON.stringify(theme));
  };

  const handleCustomColorChange = (hex: string) => {
    // Generate a harmonious theme derived from custom hex
    const cleanHex = hex.replace('#', '');
    const num = parseInt(cleanHex, 16);
    
    const custom: ColorTheme = {
      id: 'custom',
      name: 'Custom Signature',
      description: `Tailored theme anchored on ${hex}.`,
      accent: hex,
      accentHover: hex,
      accentText: '#ffffff',
      canvasBg: '#faf9f8',
      surfaceBg: '#ffffff',
      surfaceHover: '#f5f4f2',
      border: '#e8e5e0',
      textPrimary: '#1a1816',
      textSecondary: '#6e6962',
      sealColor: isNaN(num) ? 0x991b1b : num,
      deskColor: 0xeeece8,
      paperHex: '#fdfcfb',
      badgeBg: '#f2eee9',
      glowColor: `${hex}15`,
    };

    setCurrentTheme(custom);
    localStorage.setItem('farewell_portfolio_theme', JSON.stringify(custom));
  };

  // Sync profile changes to localStorage
  const handleSaveProfile = (updatedProfile: AuthorProfile) => {
    setProfile(updatedProfile);
    localStorage.setItem('farewell_portfolio_profile', JSON.stringify(updatedProfile));
  };

  const handleSelectPreset = (presetKey: string) => {
    if (DEFAULT_PROFILES[presetKey]) {
      setActivePersona(presetKey);
      setProfile(DEFAULT_PROFILES[presetKey]);
      localStorage.setItem('farewell_portfolio_profile', JSON.stringify(DEFAULT_PROFILES[presetKey]));
    }
  };

  // Add task handler
  const handleAddTask = (newTask: Omit<HandoffTask, 'id'>) => {
    const taskWithId: HandoffTask = {
      ...newTask,
      id: `task-${Date.now()}`
    };
    const updated = [taskWithId, ...tasks];
    setTasks(updated);
    localStorage.setItem('farewell_portfolio_tasks', JSON.stringify(updated));
  };

  // Toggle task status handler
  const handleToggleTaskStatus = (taskId: string) => {
    const updated = tasks.map((t) => {
      if (t.id === taskId) {
        return {
          ...t,
          status: (t.status === 'Completed' ? 'Ready for Review' : 'Completed') as HandoffTask['status']
        };
      }
      return t;
    });
    setTasks(updated);
    localStorage.setItem('farewell_portfolio_tasks', JSON.stringify(updated));
  };

  // Add guestbook note handler
  const handleAddGuestbookNote = (note: Omit<GuestbookNote, 'id' | 'timestamp'>) => {
    const newNote: GuestbookNote = {
      ...note,
      id: `note-${Date.now()}`,
      timestamp: 'Just now'
    };
    const updated = [newNote, ...guestbookNotes];
    setGuestbookNotes(updated);
    localStorage.setItem('farewell_portfolio_guestbook', JSON.stringify(updated));
  };

  return (
    <div 
      className="min-h-screen transition-colors duration-300 selection:bg-stone-300"
      style={{
        backgroundColor: currentTheme.canvasBg,
        color: currentTheme.textPrimary,
      }}
    >
      {/* 3-Zone Top Bar Navigation with Interactive Theme Palette */}
      <Navbar
        onOpenExport={() => setIsExportModalOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        activePersona={activePersona}
        theme={currentTheme}
        onSelectTheme={handleSelectTheme}
        onCustomColorChange={handleCustomColorChange}
      />

      <main>
        {/* Split-Screen Hero with Editorial Author Visual & 4-Column KPI strip */}
        <Hero
          profile={profile}
          stats={DEFAULT_STATS}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />

        {/* Section 01: Formal Resignation Letter Document + 3D Interactive Scene */}
        <LetterDocument
          profile={profile}
          tone={tone}
          theme={currentTheme}
          onToneChange={setTone}
          onOpenExport={() => setIsExportModalOpen(true)}
        />

        {/* Section 02: Featured Projects & Built Work (with Live Demos & Repositories) */}
        <ProjectsSection
          projects={projects}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        {/* Section 03: Comprehensive Handoff Matrix & Runbook FAQ */}
        <HandoffSection
          tasks={tasks}
          faqs={DEFAULT_RUNBOOK_FAQS}
          onAddTask={handleAddTask}
          onToggleTaskStatus={handleToggleTaskStatus}
        />

        {/* Section 04: Colleague Gratitude & Farewell Wall */}
        <TributesSection
          tributes={DEFAULT_TRIBUTES}
          guestbookNotes={guestbookNotes}
          onAddNote={handleAddGuestbookNote}
        />

        {/* Section 05: Next Chapter & Farewell Coffee */}
        <NextChapterSection
          profile={profile}
          onOpenCoffeeModal={() => setIsCoffeeModalOpen(true)}
        />
      </main>

      {/* Quiet, Compliant Footer */}
      <Footer
        profile={profile}
        onOpenExport={() => setIsExportModalOpen(true)}
      />

      {/* Interactive Modals */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CoffeeModal
        profile={profile}
        isOpen={isCoffeeModalOpen}
        onClose={() => setIsCoffeeModalOpen(false)}
      />

      <CustomizerModal
        currentProfile={profile}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onSaveProfile={handleSaveProfile}
        onSelectPreset={handleSelectPreset}
      />

      <ExportModal
        profile={profile}
        tone={tone}
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
