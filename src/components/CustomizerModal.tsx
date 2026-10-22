import React, { useState } from 'react';
import { AuthorProfile } from '../types/portfolio';
import { DEFAULT_PROFILES } from '../data/defaultData';
import { X, Check, User, Building, Calendar, Sparkles } from 'lucide-react';

interface CustomizerModalProps {
  currentProfile: AuthorProfile;
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (profile: AuthorProfile) => void;
  onSelectPreset: (presetKey: string) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  currentProfile,
  isOpen,
  onClose,
  onSaveProfile,
  onSelectPreset,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<AuthorProfile>({ ...currentProfile });

  const handleChange = (field: keyof AuthorProfile, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/60 backdrop-blur-sm animate-in fade-in">
      <div 
        className="relative bg-white border border-stone-200 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-serif-editorial font-medium text-stone-900">
              Customize Your Resignation Portfolio
            </h3>
            <p className="text-xs text-stone-500">
              Tailor the employee name, company, manager, dates, and future chapter.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Preset Buttons */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
              Load Preset Archetypes
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  onSelectPreset('aria');
                  setFormData(DEFAULT_PROFILES.aria);
                }}
                className={`p-3 rounded-xl border text-left text-xs transition-colors ${
                  formData.fullName === 'Aria Chen'
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                }`}
              >
                <div className="font-semibold">Aria Chen</div>
                <div className="opacity-80 text-[11px]">Staff Software Engineer</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectPreset('ritesh');
                  setFormData(DEFAULT_PROFILES.ritesh);
                }}
                className={`p-3 rounded-xl border text-left text-xs transition-colors ${
                  formData.fullName === 'Ritesh Gautam'
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                }`}
              >
                <div className="font-semibold">Ritesh Gautam</div>
                <div className="opacity-80 text-[11px]">Lead Architect & Senior Eng</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectPreset('julian');
                  setFormData(DEFAULT_PROFILES.julian);
                }}
                className={`p-3 rounded-xl border text-left text-xs transition-colors ${
                  formData.fullName === 'Julian Vance'
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                }`}
              >
                <div className="font-semibold">Julian Vance</div>
                <div className="opacity-80 text-[11px]">Principal Product Designer</div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Your Job Title</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Manager's Name</label>
                <input
                  type="text"
                  required
                  value={formData.managerName}
                  onChange={(e) => handleChange('managerName', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Manager's Role</label>
                <input
                  type="text"
                  value={formData.managerRole}
                  onChange={(e) => handleChange('managerRole', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Start Date</label>
                <input
                  type="text"
                  value={formData.startDate}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Submission Date</label>
                <input
                  type="text"
                  value={formData.submissionDate}
                  onChange={(e) => handleChange('submissionDate', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Last Working Day</label>
                <input
                  type="text"
                  value={formData.lastWorkingDay}
                  onChange={(e) => handleChange('lastWorkingDay', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">What's Next Headline</label>
              <input
                type="text"
                value={formData.nextChapterHeadline}
                onChange={(e) => handleChange('nextChapterHeadline', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Personal Contact Email</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
