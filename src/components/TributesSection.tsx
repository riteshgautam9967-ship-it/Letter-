import React, { useState } from 'react';
import { ColleagueTribute, GuestbookNote } from '../types/portfolio';
import { Heart, MessageSquarePlus, Send, Smile } from 'lucide-react';

interface TributesSectionProps {
  tributes: ColleagueTribute[];
  guestbookNotes: GuestbookNote[];
  onAddNote: (note: Omit<GuestbookNote, 'id' | 'timestamp'>) => void;
}

export const TributesSection: React.FC<TributesSectionProps> = ({
  tributes,
  guestbookNotes,
  onAddNote,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [roleOrTeam, setRoleOrTeam] = useState('');
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('👋');

  const emojis = ['👋', '🚀', '☕', '❤️', '🌟', '💻', '🎉', '🥂'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    onAddNote({
      authorName: authorName.trim(),
      roleOrTeam: roleOrTeam.trim() || 'Teammate',
      message: message.trim(),
      emoji: selectedEmoji,
    });

    setAuthorName('');
    setRoleOrTeam('');
    setMessage('');
  };

  return (
    <section id="tributes" className="py-20 border-b border-stone-200 bg-stone-50/40">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
            Section 04 · People & Appreciation
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-editorial font-medium text-stone-900">
            Gratitude & The Farewell Wall
          </h2>
          <p className="text-base text-stone-600 mt-2 max-w-2xl leading-relaxed">
            Systems are transient, but the people who stood shoulder-to-shoulder during late deployments leave an indelible mark.
          </p>
        </div>

        {/* 4 Dedicated Gratitude Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {tributes.map((trib) => (
            <div
              key={trib.id}
              className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col justify-between hover:border-stone-300 transition-colors shadow-xs"
            >
              <div>
                <div className="text-xs font-mono-code text-stone-500 uppercase tracking-wider mb-3">
                  {trib.tag}
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic mb-6">
                  "{trib.message}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <div className="text-sm font-semibold text-stone-900 font-serif-editorial">
                  {trib.recipientName}
                </div>
                <div className="text-xs text-stone-500">
                  {trib.recipientRole}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Colleague Farewell Wall / Guestbook */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 sm:p-10 shadow-xs">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Left: Input Form */}
            <div className="lg:w-5/12 w-full">
              <div className="flex items-center gap-2 text-stone-900 font-medium text-lg font-serif-editorial mb-1">
                <MessageSquarePlus className="w-5 h-5 text-stone-700" />
                <span>Leave a Farewell Message</span>
              </div>
              <p className="text-xs text-stone-500 mb-6">
                Are you a teammate, collaborator, or friend? Sign the digital yearbook before my final day.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Lin"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1">Your Role / Team</label>
                    <input
                      type="text"
                      placeholder="e.g. Design Lead"
                      value={roleOrTeam}
                      onChange={(e) => setRoleOrTeam(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Select Reaction</label>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {emojis.map((em) => (
                      <button
                        type="button"
                        key={em}
                        onClick={() => setSelectedEmoji(em)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-transform ${
                          selectedEmoji === em
                            ? 'bg-stone-200 scale-110 shadow-xs'
                            : 'hover:bg-stone-100'
                        }`}
                      >
                        {em}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Message</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Share a memory, parting wish, or inside joke..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Pin Message to Farewell Wall</span>
                </button>
              </form>
            </div>

            {/* Right: Sticky Wall Feed */}
            <div className="lg:w-7/12 w-full">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Farewell Notes ({guestbookNotes.length})
                </span>
                <span className="text-[11px] text-stone-400 font-mono-code">
                  Saved locally to your browser
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[460px] overflow-y-auto pr-1">
                {guestbookNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-4 bg-stone-50 border border-stone-200/80 rounded-xl flex flex-col justify-between hover:bg-stone-100/50 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg">{note.emoji}</span>
                        <span className="text-[10px] text-stone-400 font-mono-code">
                          {note.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-stone-700 leading-relaxed mb-4">
                        {note.message}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-200/60">
                      <div className="text-xs font-medium text-stone-900">
                        {note.authorName}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {note.roleOrTeam}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
