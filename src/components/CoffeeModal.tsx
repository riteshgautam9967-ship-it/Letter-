import React, { useState } from 'react';
import { AuthorProfile } from '../types/portfolio';
import { X, Coffee, Calendar, Clock, MapPin, CheckCircle } from 'lucide-react';

interface CoffeeModalProps {
  profile: AuthorProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const CoffeeModal: React.FC<CoffeeModalProps> = ({ profile, isOpen, onClose }) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [topic, setTopic] = useState('Farewell coffee & catch-up');
  const [slot, setSlot] = useState('Tuesday, 3:30 PM');
  const [mode, setMode] = useState<'In-Person Coffee' | 'Zoom / Slack Huddle'>('Zoom / Slack Huddle');
  const [isBooked, setIsBooked] = useState(false);

  const availableSlots = [
    'Monday, 10:30 AM',
    'Tuesday, 2:00 PM',
    'Wednesday, 4:00 PM',
    'Thursday, 11:00 AM',
    'Friday, 3:30 PM'
  ];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/60 backdrop-blur-sm animate-in fade-in">
      <div 
        className="relative bg-white border border-stone-200 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {isBooked ? (
          <div className="text-center py-6 animate-in zoom-in-95">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif-editorial font-medium text-stone-900 mb-2">
              Catch-up Scheduled!
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
              Thanks {name}! A calendar invite for <strong className="text-stone-900">{slot}</strong> ({mode}) has been added to {profile.fullName}'s departure calendar.
            </p>
            <button
              onClick={() => {
                setIsBooked(false);
                onClose();
              }}
              className="px-5 py-2.5 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code text-stone-500 mb-2">
              <Coffee className="w-4 h-4 text-stone-700" />
              <span>FAREWELL CONVERSATION</span>
            </div>

            <h3 className="text-2xl font-serif-editorial font-medium text-stone-900 mb-1">
              Book a 15-min Coffee or Sync
            </h3>
            <p className="text-xs text-stone-600 mb-6 leading-relaxed">
              Grab some 1-on-1 time with {profile.fullName} before their last day on {profile.lastWorkingDay}.
            </p>

            <form onSubmit={handleBook} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya, Kenji, Sarah..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Select Time Slot</label>
                <select
                  value={slot}
                  onChange={(e) => setSlot(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                >
                  {availableSlots.map((s) => (
                    <option key={s} value={s}>{s} (PST)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Location / Format</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {(['Zoom / Slack Huddle', 'In-Person Coffee'] as const).map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setMode(m)}
                      className={`p-2.5 rounded-lg border text-left transition-colors ${
                        mode === m
                          ? 'border-stone-900 bg-stone-900 text-white font-medium'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">What should we chat about?</label>
                <input
                  type="text"
                  placeholder="e.g. Life, future startups, edge mesh questions, or coffee beans"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Confirm Calendar Invite</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
